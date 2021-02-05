const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector(".js-toDoInput"),
	toDoList = document.querySelector(".js-toDoList"),
	toDoProgressBar = document.querySelector(".js-toDoProgressBar"),
	completed = document.querySelector(".js-completed"),
	empty = toDoForm.querySelector(".js-empty"),
	nothing = document.querySelector(".js-nothing");

const TODOS_LS = "toDos";

let toDos = [];
let previousPercent = 0;

function deleteNothing(){
	nothing.classList.remove(SHOWING_CN);
}

function paintNothing(){
	nothing.classList.add(SHOWING_CN);
}

function paintProgressBar(toDoLength, checkedNum){
	let percent = 0;
	if(toDos.length != 0) {
		percent = Math.round(checkedNum / toDos.length * 100);
	}
	let width = previousPercent;
	if(percent >= previousPercent){
		const id = setInterval(function(){
			if(width >= percent){
				clearInterval(id);
			} else {
				width++;
				toDoProgressBar.style.width = `${width}%`;
				completed.innerText = `${width}% completed`;
			}
		}, 5);
	} else{
		const id = setInterval(function(){
			if(width <= percent){
				clearInterval(id);
			} else {
				width--;
				toDoProgressBar.style.width = `${width}%`;
				completed.innerText = `${width}% completed`;
			}
		}, 5);
	}
	previousPercent = percent;
}

//edit undo
function undo(event){
	const undoBtn = event.target;
	const editBtnSpan = undoBtn.parentNode;
	const editForm = editBtnSpan.parentNode;
	const editInput = editForm.querySelector(".editInput");
	const empty = editForm.querySelector(".empty");
	empty.classList.remove(SHOWING_CN);
	const li = editForm.parentNode;
	editForm.removeChild(editInput);
	li.removeChild(editForm);
	const label = document.createElement("label");
	const checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.setAttribute("class", "todoCheck");
	const span = document.createElement("span");
	span.setAttribute("class", "content");
	const btnSpan = document.createElement("span");
	btnSpan.setAttribute("class", "controlBtns");
	const editBtn = document.createElement("img");
	editBtn.setAttribute("class", "editBtn");
	editBtn.src = "images/edit.png";
	const delBtn = document.createElement("img");
	delBtn.setAttribute("class", "delBtn");
	delBtn.src = "images/delete.png";
	for(var i = 0; i < toDos.length; i++){
		if(toDos[i].id === parseInt(li.id)){
			checkBox.checked = toDos[i].isChecked;
			const text = toDos[i].text;
			span.innerText = `${text}`;
		};
	}
	saveToDos();
	checkBox.addEventListener("change", checkBoxChange);
	editBtn.innerText = "edit";
	editBtn.addEventListener("click", showEdit);
	delBtn.innerText = "delete";
	delBtn.addEventListener("click", deleteToDo);
	li.appendChild(label);
	label.appendChild(checkBox);
	label.appendChild(span);
	li.appendChild(btnSpan);
	btnSpan.appendChild(editBtn);
	btnSpan.appendChild(delBtn);
}

//edit Input + btn
function editToDoBtn(event){
	event.preventDefault();
	const submitBtn = event.target;
	const editBtnspan = submitBtn.parentNode;
	const editForm = editBtnspan.parentNode;
	const editInput = editForm.querySelector(".editInput");
	const empty = editForm.querySelector(".empty");
	const text = editInput.value;
	if(text === ""){
		//nothing written
		empty.classList.add(SHOWING_CN);
	} else {
		//show edited to do list
		empty.classList.remove(SHOWING_CN);
		const li = editForm.parentNode;
		editForm.removeChild(editInput);
		li.removeChild(editForm);
		const label = document.createElement("label");
		const checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.setAttribute("class", "todoCheck");
		const span = document.createElement("span");
		span.setAttribute("class", "content");
		const btnSpan = document.createElement("span");
		btnSpan.setAttribute("class", "controlBtns");
		const editBtn = document.createElement("img");
		editBtn.setAttribute("class", "editBtn");
		editBtn.src = "images/edit.png";
		const delBtn = document.createElement("img");
		delBtn.setAttribute("class", "delBtn");
		delBtn.src = "images/delete.png";
		for(var i = 0; i < toDos.length; i++){
			if(toDos[i].id === parseInt(li.id)){
				checkBox.checked = toDos[i].isChecked;
			};
		}
		checkBox.addEventListener("change", checkBoxChange);
		editBtn.innerText = "edit";
		editBtn.addEventListener("click", showEdit);
		delBtn.innerText = "delete";
		delBtn.addEventListener("click", deleteToDo);
		span.innerText = `${text}`;
		li.appendChild(label);
		label.appendChild(checkBox);
		label.appendChild(span);
		li.appendChild(btnSpan);
		btnSpan.appendChild(editBtn);
		btnSpan.appendChild(delBtn);
		
		//localStorage save 'text'
		for(var i = 0; i < toDos.length; i++){
			if(toDos[i].id === parseInt(li.id)){
				toDos[i].text = text;
			};
		}
		saveToDos();
	}
}

//edit Input + enter
function editToDoEnter(event){
	event.preventDefault();
	const editForm = event.target;
	const editInput = editForm.querySelector(".editInput");
	const empty = editForm.querySelector(".empty");
	const text = editInput.value;
	if(text === ""){
		//nothing written
		empty.classList.add(SHOWING_CN);
	} else {
		//show edited to do list
		empty.classList.remove(SHOWING_CN);
		const li = editForm.parentNode;
		editForm.removeChild(editInput);
		li.removeChild(editForm);
		const label = document.createElement("label");
		const checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.setAttribute("class", "todoCheck");
		const span = document.createElement("span");
		span.setAttribute("class", "content");
		const btnSpan = document.createElement("span");
		btnSpan.setAttribute("class", "controlBtns");
		const editBtn = document.createElement("img");
		editBtn.setAttribute("class", "editBtn");
		editBtn.src = "images/edit.png";
		const delBtn = document.createElement("img");
		delBtn.setAttribute("class", "delBtn");
		delBtn.src = "images/delete.png";
		checkBox.addEventListener("change", checkBoxChange);
		editBtn.innerText = "edit";
		editBtn.addEventListener("click", showEdit);
		delBtn.innerText = "delete";
		delBtn.addEventListener("click", deleteToDo);
		span.innerText = `${text}`;
		li.appendChild(label);
		label.appendChild(checkBox);
		label.appendChild(span);
		li.appendChild(btnSpan);
		btnSpan.appendChild(editBtn);
		btnSpan.appendChild(delBtn);
		
		//localStorage save 'text'
		for(var i = 0; i < toDos.length; i++){
			if(toDos[i].id === parseInt(li.id)){
				checkBox.checked = toDos[i].isChecked;
				toDos[i].text = text;
			};
		}
		saveToDos();
	}
}

function showEdit(event){
	//hide to do list (label-checkbox, content, btns-edit,delete)
	const btn = event.target;
	const btnSpan = btn.parentNode;
	const li = btnSpan.parentNode;
	const label = li.querySelector("label");
	const span = li.querySelector(".content");
	li.removeChild(label);
	li.removeChild(btnSpan);
	//show editForm (form, input, btn-undo, submit)
	const editForm = document.createElement("form");
	const editInput = document.createElement("input");
	editInput.setAttribute("type", "text");
	editInput.setAttribute("class", "editInput");
	editInput.setAttribute("placeholder", "EDIT YOUR TO DO!");
	editInput.setAttribute("value", span.innerText);
	const editbtnSpan = document.createElement("span");
	editbtnSpan.setAttribute("class", "controlBtns");
	const undoBtn = document.createElement("img");
	undoBtn.setAttribute("class", "undoBtn");
	undoBtn.src = "images/undo.png";
	const submitBtn = document.createElement("img");
	submitBtn.setAttribute("class", "submitBtn");
	submitBtn.src = "images/submit.png";
	const editEmpty = document.createElement("div");
	editEmpty.setAttribute("class", "empty");
	editEmpty.innerText = "You can't leave this empty."
	li.appendChild(editForm);
	editForm.appendChild(editInput);
	editForm.appendChild(editbtnSpan);
	editbtnSpan.appendChild(undoBtn);
	editbtnSpan.appendChild(submitBtn);
	undoBtn.addEventListener("click", undo);
	submitBtn.addEventListener("click", editToDoBtn);
	editForm.appendChild(editEmpty);
	editForm.addEventListener("submit", editToDoEnter);
}

function deleteToDo(event){
	const btn = event.target;
	const btnSpan = btn.parentNode;
	const li = btnSpan.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
	if(toDos.length === 0){
		paintNothing();
	}
	let checkedNum = 0;
	for(var i = 0; i < toDos.length; i++){
		//localStorage select the number of 'isChecked'
		if(toDos[i].isChecked === true){
			checkedNum = checkedNum + 1;
		}
	}
	paintProgressBar(toDos.length, checkedNum);
}

function saveToDos(){
	//localStorage only save as String type
	//JSON(JS Object Notation)
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
	deleteNothing();
}

//checkbox clicked
function checkBoxChange(event){
	const checkBox = event.target;
	const label = checkBox.parentNode;
	const li = label.parentNode;
	let checkedNum = 0;
	const isChecked = checkBox.checked;
	for(var i = 0; i < toDos.length; i++){
		//localStorage save 'checkBox.checked'
		if(toDos[i].id === parseInt(li.id)){
			toDos[i].isChecked = isChecked;
		};
		//localStorage select the number of 'isChecked'
		if(toDos[i].isChecked === true){
			checkedNum = checkedNum + 1;
		}
	}
	saveToDos();
	paintProgressBar(toDos.length, checkedNum);
}

//show to do
function paintToDo(text, isChecked){
	const newId = toDos.length + 1;
	const li = document.createElement("li");
	const label = document.createElement("label");
	const checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.setAttribute("class", "todoCheck");
	checkBox.checked = isChecked;
	const span = document.createElement("span");
	span.setAttribute("class", "content");
	const btnSpan = document.createElement("span");
	btnSpan.setAttribute("class", "controlBtns");
	const editBtn = document.createElement("img");
	editBtn.setAttribute("class", "editBtn");
	editBtn.src = "images/edit.png";
	const delBtn = document.createElement("img");
	delBtn.setAttribute("class", "delBtn");
	delBtn.src = "images/delete.png";
	checkBox.addEventListener("change", checkBoxChange);
	editBtn.innerText = "edit";
	editBtn.addEventListener("click", showEdit);
	delBtn.innerText = "delete";
	delBtn.addEventListener("click", deleteToDo);
	span.innerText = `${text}`;
	li.appendChild(label);
	label.appendChild(checkBox);
	label.appendChild(span);
	li.appendChild(btnSpan);
	btnSpan.appendChild(editBtn);
	btnSpan.appendChild(delBtn);
	li.id = newId;
	toDoList.appendChild(li);
	const toDoObj = {
			text: text,
			id: newId,
			isChecked: isChecked
	};
	toDos.push(toDoObj);
	saveToDos();
}

//to do Input + enter
function toDoSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	if(currentValue === ""){
		empty.classList.add(SHOWING_CN);
	} else {
		empty.classList.remove(SHOWING_CN);
		paintToDo(currentValue, false);
		let checkedNum = 0;
		for(var i = 0; i < toDos.length; i++){
			if(toDos[i].isChecked === true){
				checkedNum = checkedNum + 1;
			}
		}
		paintProgressBar(toDos.length, checkedNum);
		toDoInput.value = "";
	}
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	let checkedNum = 0;
	if(loadedToDos !== null){
		const parsedToDos = JSON.parse(loadedToDos);
		if(parsedToDos.length === 0){
			paintNothing();
		} else {
			parsedToDos.forEach(function(toDo){
				paintToDo(toDo.text, toDo.isChecked);
				//localStorage select the number of 'isChecked'
				if(toDo.isChecked === true){
					checkedNum = checkedNum + 1;
				}
			});
		}
		paintProgressBar(toDos.length, checkedNum);
	} else {
		paintNothing();
	}
}

function init(){
	loadToDos();
	toDoForm.addEventListener("submit", toDoSubmit);
}

init();