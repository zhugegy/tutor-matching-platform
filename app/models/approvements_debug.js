var ModelOperationsJFT = require("./approvements")

async function test(){
    console.log("test begin");
    await sleep(3000);

    // test code here

    //测试JFT_add_sample函数
    //let objTmp = await ModelOperationsJFT.addApprovementTutorSelection('{"name":"Dallas Rausch"}','{"name":"Teresa Morissa"}');
    //let objTmp = await ModelOperationsJFT.addApprovementTutorApplication('{"name":"Claudie Cherie"}','{"description":"I want money"}');
    //let objTmp = await ModelOperationsJFT.addApprovemenMentorApplication ('{"name":"Claudie Cherie"}','{"description":"I want more money"}');
    //let objTmp = await ModelOperationsJFT.addApprovemenMentorMatching({"name":"AZ"},{"name":"ZA"});
    //let objTmp = await ModelOperationsJFT.addApprovemenAppointmentProcessing('{"tutorID":"5d99828e30fa00f8517fdc9d", "studentID" : "5d8a04e730fa00f8517db3b7","unitOfStudyID" : "5d997b5930fa00f8517fd7dd","timePointID" : "5da1760d30fa00f851827b94"}')

    // 测试JFT_add_sample函数
    //ModelOperationsJFT.approve_add('{"type":"tutor apply", "status":0}');

    //测试update
    //ModelOperationsJFT.approve_update()

    // 测试JFT_query_sample函数
    //let objTmp = await ModelOperationsJFT.approve_query('{"type":"tutor apply"}');

     // let objTmp = await ModelOperationsJFT.queryApprovement('tutor_selection');
    //let objTmp = await ModelOperationsJFT.adminClickedYes('5d99974230fa00f8517ff75a');
    console.log(objTmp);

    console.log("approvement test end");
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test();