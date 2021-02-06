const settingBtn = document.querySelector(".js-how"),
	container = document.querySelector(".js-howToUse-container"),
	exitBtn = document.querySelector(".js-exit"),
	lanBtn = document.querySelector(".js-language"),
	engContent = document.querySelector(".js-howToUse-content-eng"),
	korContent = document.querySelector(".js-howToUse-content-kor");
	

function setLanguage(event){
	const lanBtn = event.target;
	//한국어버튼
	if(lanBtn.innerText === "한국어"){
		korContent.classList.add(SHOWING_CN);
		engContent.classList.remove(SHOWING_CN);
		lanBtn.innerText = "ENG";
	} else {
		engContent.classList.add(SHOWING_CN);
		korContent.classList.remove(SHOWING_CN);
		lanBtn.innerText = "한국어";
	}
}

function hideHow(){
	container.classList.remove(SHOWING_CN);
}
	
function showHow(){
	container.classList.add(SHOWING_CN);
}

function init(){
	settingBtn.addEventListener("click", showHow);
	exitBtn.addEventListener("click", hideHow);
	lanBtn.addEventListener("click", setLanguage);
}

init();
