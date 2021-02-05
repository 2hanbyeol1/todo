const greetingForm = document.querySelector(".js-greetingForm"),
	greetingInput = document.querySelector("input"),
	greeting = document.querySelector(".js-greetings"),
	pencil = document.querySelector(".js-pencil");

//localStorage
const USER_LS = "currentUser";
//className
const SHOWING_CN = "showing";
const INLINE_SHOWING_CN = "inline-showing";

function deleteName(){
	localStorage.removeItem(USER_LS);
}

function saveName(text){
	localStorage.setItem(USER_LS, text);
}

function editGreeting(event){
	greetingForm.classList.add(SHOWING_CN);
	greeting.classList.remove(INLINE_SHOWING_CN);
	pencil.classList.remove(INLINE_SHOWING_CN);
	deleteName();
	greetingForm.addEventListener("submit", greetingSubmit);
}

function greetingSubmit(event){
	event.preventDefault();//default behavior: enter>새로고침
	const currentValue = greetingInput.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askForName(){
	greetingForm.classList.add(SHOWING_CN);
	greetingForm.addEventListener("submit", greetingSubmit);
}

function paintGreeting(text){
	greetingForm.classList.remove(SHOWING_CN);
	greeting.classList.add(INLINE_SHOWING_CN);
	greeting.innerText = `HELLO ${text} !`;
	pencil.classList.add(INLINE_SHOWING_CN);
	pencil.addEventListener("click", editGreeting);
}

function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){
		askForName();
	} else {
		paintGreeting(currentUser);
	}
}

function init(){
	loadName();
}

init();