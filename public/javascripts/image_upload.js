

window.onload = function()
{
	alert("hello");

	var form = document.forms.namedItem("myForm");
	form.addEventListener('submit', function(ev) {

		var myFile = document.getElementById('myFile').files[0];

		var oData = new FormData(form);

		var oReq = new XMLHttpRequest();
		oReq.open("POST", "/myAction", true);

		oReq.onload = function(oEvent) {
			if (oReq.status === 200) {  } else {  }
		};

		oReq.send(oData);
		ev.preventDefault();

	}, false);
};