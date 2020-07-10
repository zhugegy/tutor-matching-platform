function button_add_clicked()
{
	// disable the button
	document.getElementById("AddArticleFormButtonAdd").disabled = true;

	// step 1
	validate_user_input();
}

var g_url = null;

function button_download_log_clicked()
{
	// release the memory before reallocate
	if (g_url != null)
	{
		window.URL.revokeObjectURL(g_url);
		g_url = null;
	}

	var objTextarea = document.getElementById("AddArticleFormTextArea");
	if (objTextarea == null)
	{
		return;
	}

	var text = objTextarea.value;
	var data = new Blob([text], {type: 'text/plain'});
	g_url = window.URL.createObjectURL(data);

	document.getElementById('AddArticleFormLinkDownloadLog').href = g_url;

	// simulate the clicking
	document.getElementById('AddArticleFormLinkDownloadLog').click();
}

function validate_user_input()
{
	if (document.getElementById("AddArticleFormTextInputArticleTitle").value.length == 0)
	{
		display_textarea_msg("Error: Please input command!");
		display_textarea_input_waiting_indication();
		return;
	}

	// step 2
	check_if_article_already_exist();
}

//go directly
function check_if_article_already_exist()
{
	display_textarea_msg("Checking our database...");
	var objInputText = document.getElementById("AddArticleFormTextInputArticleTitle");
	var strInput = objInputText.value;

	$.getJSON('/getData?funID=backendConsole&param1=' + strInput, {paramNum: 1}, function(rdata) {
		//alert(rdata.status);

		display_textarea_msg(JSON.stringify(rdata));
		// step 3
		//check_if_article_really_exists(strInput);
		display_textarea_input_waiting_indication();
	});
}

function display_textarea_input_waiting_indication()
{
	// display the UI indicating message:
	var objTextarea = document.getElementById("AddArticleFormTextArea");
	objTextarea.value += "\r\n" + "[" + (new Date()).toString().substr(0, 24) + "] " + "Now waiting for your command...\r\n";
	objTextarea.scrollTop = objTextarea.scrollHeight;

	document.getElementById("AddArticleFormButtonAdd").disabled = false;
}

function display_textarea_msg(strMsg)
{
	// display the UI indicating message:
	var objTextarea = document.getElementById("AddArticleFormTextArea");
	if (objTextarea != null)
	{
		objTextarea.value += "[" + (new Date()).toString().substr(0, 24) + "] " + strMsg;
		objTextarea.value += "\r\n";
		objTextarea.scrollTop = objTextarea.scrollHeight;
	}
}

// entry point
window.onload = function()
{
	// check user session (only signed-in user can add article)
	// $.getJSON('/getData?funID=miscellaneous_get_session_user_stauts', {paramNum: 0}, function(rdata) {
	// 	var objButton = document.getElementById("AddArticleFormButtonAdd");
	//
	// 	//if (rdata["user_status"] == "signed-in")
	// 	{
	// 		objButton.onclick = button_add_clicked;
	// 		display_textarea_input_waiting_indication();
	// 	}
	// 	else
	// 	{
	// 		objButton.disabled = true;
	// 		display_textarea_msg("Error: You must log in first!");
	// 	}
	// });

	var objButtonAdd = document.getElementById("AddArticleFormButtonAdd");
	objButtonAdd.onclick = button_add_clicked;

	var objButtonDownloadLog = document.getElementById("AddArticleFormButtonDownloadLog");
	objButtonDownloadLog.onclick = button_download_log_clicked;

	document.getElementById("AddArticleFormButtonGoBack").onclick = function (){window.history.back();};


	display_textarea_input_waiting_indication();

};