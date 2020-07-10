var ModelOperationsAppointment = require("./appointment")

async function test(){
    console.log("appointment test begin");
    await sleep(3000);

    // test code here

    // 测试JFT_add_sample函数
    //ModelOperationsJFT.JFT_add_sample('{"name":"00910", "age":12}');

    // 测试JFT_query_sample函数


    //let objTmp = await ModelOperationsAppointment.editAppointmentStatus_student("5daea0a2b2386b2704efd948");
    let d1= new Date();
    let nowDate = (new Date(d1)).getTime();
    let startTime = (new Date("2019-10-25T14:34:12.101Z")).getTime();
    if (nowDate > startTime){
        console.log("sucess");
    }
    //console.log(objTmp);

    /*if (objTmp.isTutor == true)
    {
        console.log("tutor")
    }
    else
    {
        console.log("not tutor")
    }
*/
    console.log("test end");
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test();
