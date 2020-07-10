var ModelOperationsJFT = require("./notification")

async function test(){
    console.log("test begin");
    await sleep(3000);

    // test code here

    // 测试JFT_add_sample函数
    //ModelOperationsJFT.approve_add('{"type":"tutor apply", "status":0}');

    //测试update
    //ModelOperationsJFT.approve_update()

    // 测试JFT_query_sample函数
    //let objTmp = await ModelOperationsJFT.approve_query('{"type":"tutor apply"}');

    //let objTmp = await ModelOperationsJFT.getCurrentUserNotificationsActionable ('Actionable');
    //let objTmp = await ModelOperationsJFT.adminClickedYes('5d99974230fa00f8517ff75a');
    console.log(objTmp);

    console.log("notification test end");
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test();