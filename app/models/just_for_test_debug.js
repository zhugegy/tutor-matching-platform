var ModelOperationsJFT = require("./just_for_test")

async function test(){
    console.log("test begin");
    await sleep(3000);

    // test code here

    // 测试JFT_add_sample函数
    //ModelOperationsJFT.JFT_add_sample('{"name":"00910", "age":12}');

    // 测试JFT_query_sample函数
    let objTmp = await ModelOperationsJFT.JFT_query_sample('{"name":"00910"}');
    console.log(objTmp);

    console.log("test end");
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test();