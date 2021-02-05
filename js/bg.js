const body = document.querySelector("body");

//the number of image
const IMG_NUMBER = 3;
const BG_CN = "bgImage"

function paintImage(imgNumber){
	const image = new Image();
	image.src = `images/${imgNumber + 1}.jpg`;
	image.classList.add(BG_CN);
	body.appendChild(image);
}

//generate Random
function genRandom(){
	const number = Math.floor(Math.random() * IMG_NUMBER);
	return number;
}

function init(){
	const randomNumber = genRandom();
	paintImage(randomNumber);
}

init();