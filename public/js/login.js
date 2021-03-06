function toggleTab(tabId) {
	console.log(tabId);
	if(tabId == 1){
		var loginTab = document.getElementById("loginTab");
		loginTab.classList.add("active");

		var registerTab = document.getElementById("registerTab");
		registerTab.classList.remove("active");

		document.getElementById("loginForm").style.display = "block";

		document.getElementById("registerForm").style.display = "none";

	} else if(tabId == 2){
		var loginTab = document.getElementById("loginTab");
		loginTab.classList.remove("active");

		var registerTab = document.getElementById("registerTab");
		registerTab.classList.add("active");

		document.getElementById("loginForm").style.display = "none";
		document.getElementById("registerForm").style.display = "block";
	}
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
