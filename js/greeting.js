const greetingForm = document.querySelector(".js-greetingForm"),
	greetingInput = document.querySelector("input"),
	greeting = document.querySelector(".js-greetings"),
	pencil = document.querySelector(".js-pencil");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const INLINE_SHOWING_CN = "inline-showing";

function deleteName(){
	localStorage.removeItem(USER_LS);
}

function saveName(text){
	localStorage.setItem(USER_LS, text);
}

//localStorage에서 기존에 저장된 currentUser 삭제 후 새로 이름 작성
function editGreeting(event){
	greetingForm.classList.add(SHOWING_CN);
	greeting.classList.remove(INLINE_SHOWING_CN);
	pencil.classList.remove(INLINE_SHOWING_CN);
	deleteName();
	greetingForm.addEventListener("submit", greetingSubmit);
}

//input value 가져와서 보여주고 localStorage에 저장
function greetingSubmit(event){
	event.preventDefault();
	const currentValue = greetingInput.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

//form을 보여줌
function askForName(){
	greetingForm.classList.add(SHOWING_CN);
	//이름 작성
	greetingForm.addEventListener("submit", greetingSubmit);
}

//form을 지우고 greeting, pencil을 보여줌
function paintGreeting(text){
	greetingForm.classList.remove(SHOWING_CN);
	greeting.classList.add(INLINE_SHOWING_CN);
	greeting.innerText = `HELLO ${text} !`;
	pencil.classList.add(INLINE_SHOWING_CN);
	pencil.addEventListener("click", editGreeting);
}

//localStorage에서 이름 가져오기
function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){ //저장된 이름 없음 → input
		askForName();
	} else { //저장된 이름 있음 → 인사
		paintGreeting(currentUser);
	}
}

function init(){
	loadName();
}

init();
