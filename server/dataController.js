// const connectDB = require('./db');

// async function fetchLatestData() {
//     const mongoClient = await connectDB();

//     try {
//         const data = await mongoClient.db().collection('plcdata').find().sort({ DateAndTime: -1 }).limit(1).toArray();
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }

// async function fetchDataRange(startTime, endTime) {
//     const mongoClient = await connectDB();

//     try {
//         const data = await mongoClient.db().collection('plcdata').find({ DateAndTime: { $gte: startTime, $lte: endTime } }).toArray();
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }
// async function fetchAllData() {
//     const mongoClient = await connectDB();
//     try {
//         const data = await mongoClient.db().collection('plcdata')
//             .find({})
//             .sort({DateAndTime: -1})
//             .limit(20)
//             .toArray();
//         return data.reverse();
//     } catch (error) {
//         throw error;
//     }
// }
// module.exports = {
//     fetchLatestData,
//     fetchDataRange,
//     fetchAllData
// };
const connectDB = require('./db');

async function fetchLatestData() {
    const mongoClient = await connectDB();

    try {
        const data = await mongoClient.db().collection('plcdata').find().sort({ DateAndTime: -1 }).limit(1).toArray();
        return data;
    } catch (error) {
        throw error;
    }
}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function fetchDataRange(startTime, endTime) {
    const mongoClient = await connectDB();

    const start = formatDate(startTime);
    const end = formatDate(endTime);

    try {
        const data = await mongoClient
            .db()
            .collection('plcdata')
            .find({ DateAndTime: { $gte: start, $lte: end } })
            .toArray();
        return data;
    } catch (error) {
        throw error;
    }
}

async function fetchAllData() {
    const mongoClient = await connectDB();
    try {
        const data = await mongoClient.db().collection('plcdata')
            .find({})
            .sort({DateAndTime: -1})
            .limit(20)
            .toArray();
        return data.reverse();
    } catch (error) {
        throw error;
    }
}
module.exports = {
    fetchLatestData,
    fetchDataRange,
    fetchAllData
};
