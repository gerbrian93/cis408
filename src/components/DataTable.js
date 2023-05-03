// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const DataTable = () => {
//   const [sensorData, setSensorData] = useState([]);

//   const fetchSensorData = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/get-data');
//       const results = await response.json();
//       results.data = results.data.reverse();
//       setSensorData(results);
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   function fixTime(d) {
//     var leng = d.length;
//     var hour = d.slice(0,2);
//     var rest = d.slice(2, leng);
//      if (parseInt(hour) > 12) {
//        hour = parseInt(hour) - 12;
//        return hour.toString()+rest+" PM";
//      } else if (parseInt(hour) === 12){
//        return hour+rest+" PM";
//      } else {
//        return d+" AM";
//      }
//    }

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       fetchSensorData();
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [sensorData]);

 
//   return(
//     <table className="tabledata" class="table table-striped table-bordered scrollable">
//       <thead>
//         <tr>
//           <td className="headRow"><b>Date</b></td>
//           <td className="headRow"><b>Time</b></td>
//           <td className="headRow"><b>Humidity</b></td>
//           <td className="headRow"><b>PH Level</b></td>
//           <td className="headRow"><b>Nutrients</b></td>
//           <td className="headRow"><b>Temperature</b></td>
//         </tr>
//       </thead>
//       <tbody>
//       {Array.isArray(sensorData.data) && sensorData.data.map((result) => (
//     <tr key={result._id}>
//     <td>{result.DateAndTime.slice(0,10)}</td>
    
//     <td>{fixTime(result.DateAndTime.slice(11,19))}</td>
//     <td>&nbsp;{result.PLC_Humidity_Value}</td>
//     <td>{result.PLC_pH_Value}</td>
//     <td>{result.PLC_TDS_Value}</td>
//     <td>{result.PLC_Temperature_Value}</td>
//   </tr>
// ))}
//       </tbody>
//     </table>
//   )
   
// };

// export default DataTable;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateSubmit = (submittedStartDate, submittedEndDate) => {
    setStartDate(submittedStartDate);
    setEndDate(submittedEndDate);
  };

  const fetchSensorData = async () => {
    try {
      if (!startDate || !endDate) return;
      const startTime = startDate;
      const endTime = endDate;
      const response = await fetch(`/api/get-data-range?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`);
      const results = await response.json();
      results.data = results.data.reverse();
      setSensorData(results);
      console.log(endDate.toString(),startDate.toString())
    } catch (error) {
      console.error('Error', error);
    }
  };

  function fixTime(d) {
    var leng = d.length;
    var hour = d.slice(0,2);
    var rest = d.slice(2, leng);
    if (parseInt(hour) > 12) {
      hour = parseInt(hour) - 12;
      return hour.toString()+rest+" PM";
    } else if (parseInt(hour) === 12){
      return hour+rest+" PM";
    } else {
      return d+" AM";
    }
  }

  useEffect(() => {
    fetchSensorData();
  }, [startDate, endDate]);

  return (
      <>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleDateSubmit(e.target.startDate.value, e.target.endDate.value);
        }}>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <table className="tabledata" class="table table-striped table-bordered">
          <thead>
          <tr>
            <td className="headRow"><b>Date</b></td>
            <td className="headRow"><b>Time</b></td>
            <td className="headRow"><b>Humidity</b></td>
            <td className="headRow"><b>PH Level</b></td>
            <td className="headRow"><b>Nutrients</b></td>
            <td className="headRow"><b>Temperature</b></td>
          </tr>
          </thead>
          <tbody>
          {Array.isArray(sensorData.data) && sensorData.data.map((result) => (
              <tr key={result._id}>
                <td>{result.DateAndTime.slice(0,10)}</td>
                <td>{fixTime(result.DateAndTime.slice(11,19))}</td>
                <td>&nbsp;{result.PLC_Humidity_Value}</td>
                <td>{result.PLC_pH_Value}</td>
                <td>{result.PLC_TDS_Value}</td>
                <td>{result.PLC_Temperature_Value}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </>
  );
};
export default DataTable;