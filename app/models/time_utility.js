
module.exports.getOutputTimeString = async function (objISOTimeStamp){

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
        hour12: false };

    let strTimeStringRaw = objISOTimeStamp.toLocaleString('en-AU', options);

    let aryStringRaw = strTimeStringRaw.split(',');

    let aryStringNew = [];

    aryStringNew.push(aryStringRaw[0]);
    aryStringNew.push(aryStringRaw[1] + aryStringRaw[2]);
    aryStringNew.push(aryStringRaw[3]);

    return aryStringNew.join(",");
};

