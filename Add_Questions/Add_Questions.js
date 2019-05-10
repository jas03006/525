var questionNum = 1;
var showing = 0;

function initialize(){
  
  addQuestionBox("");
}

function deleteAll(){
  for(var i = 0; i < questionNum; i++){
    var qDivId = "qDiv" + (i + 1);
    document.getElementById(qDivId).remove();
  }
  document.getElementById("myButton").remove();
  document.getElementById("confirmDiv").remove();
  questionNum = 1;
  
  initialize();
}

function addQuestionBox(textline){
  var qDiv = document.createElement("div");
  var numDiv = document.createElement("div");
  var num = document.createElement("div");
  var helpDiv = document.createElement("div");
  var arrowDiv = document.createElement("div");
  var deleteButton = document.createElement("div");
  var question = document.createElement("textarea");
  var buttonDiv = document.createElement("div");
  var addButton = document.createElement("a");
  var addQuestionText = document.createElement("div");
  var confirmDiv = document.createElement("div");
  var confirmButton = document.createElement("a");
  
  //Question box specification
  //Text area specification
  question.className = "questionBox";
  question.id = "question" + questionNum;
  question.placeholder = "Write question #" +  questionNum + " here";
  if(textline != ""){
    question.value = textline;
  }
  //Enter listener
  question.addEventListener('keyup', enterEvent);
  arrowDiv.className = "fas fa-caret-left";
  
  num.innerHTML = "Q" + questionNum + ". ";
  num.appendChild(arrowDiv);
  num.className = "num";
  numDiv.className = "numDiv";
  num.addEventListener('click', numberClick);
  num.addEventListener('mouseover', numberHover);
  num.addEventListener('mouseout', numberHoverOut);
  helpDiv.className = "helper";
  helpDiv.appendChild(deleteButton);
  deleteButton.className = "fas fa-minus-circle";
  num.id = questionNum;
  deleteButton.addEventListener('click', questionDelete);
  
  numDiv.appendChild(num);
  numDiv.appendChild(helpDiv);
  
  qDiv.appendChild(numDiv);
  qDiv.appendChild(question);
  qDiv.id = "qDiv" + questionNum;
  qDiv.className = "question-container";
  
  //Add question to the content
  document.getElementById("container").appendChild(qDiv);
  
  //Add question button specification
  addButton.innerHTML = "+";
  addButton.className = "addButton";
  
  addButton.addEventListener("click", function (e){
    submit(question);
  });
  
  addQuestionText.innerHTML = "Add Question";
  addQuestionText.className = "addButtonText";
  buttonDiv.className = "center";
  buttonDiv.appendChild(addButton);
  buttonDiv.appendChild(addQuestionText);
  addButton.addEventListener('mouseover', addButtonHover);
  addButton.addEventListener('mouseout', addButtonHoverOut);
  buttonDiv.id = "myButton";
  
  confirmButton.id = "confirmButton";
  //confirmButton.class = "btn btn-success";
  confirmButton.innerHTML = "Next";
  confirmButton.addEventListener("click", confirm);
  confirmDiv.appendChild(confirmButton);
  confirmDiv.id = "confirmDiv";
  
  //Add button to the content
  document.getElementById("paper").appendChild(buttonDiv);
  document.getElementById("paper").appendChild(confirmDiv);
  
  return question;
}

function myMoveLeft(elem) {
  var pos = 25;
  
  var id = setInterval(function() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      if(pos == 25){
        elem.style.visibility = "visible";
      }
      elem.style.left = (pos - 10) + 'px';
      elem.style.opacity = (25 - pos) * 0.04;
      pos--;
    }
  }, 1);
  
}

function myMoveRight(elem) {
  var pos = 0;
  
  var id = setInterval(function() {
    if (pos == 25) {
      clearInterval(id);
      elem.style.visibility = "hidden";
    } else {
      elem.style.left = (pos - 10) + 'px';
      elem.style.opacity = (24 - pos) * 0.04;
      pos++;
    }
  }, 1);
  
}

function numberClick(){
    // if (this.className != event.target.className)
    //   return;
    
  if(this.className == "num"){
    var del = this.parentElement.children[1].children[0];
    this.style.fontWeight = "900";
    
    this.className = "numPick"
    this.children[0].className = "fas fa-caret-right";
    myMoveLeft(del);
  }
  else if(this.className == "numPick"){
    var del = this.parentElement.children[1].children[0];
    
    this.style.fontWeight = "normal";
    this.className = "num"
    this.children[0].className = "fas fa-caret-left";
    myMoveRight(del);
  }
}
function myBright(elem) {
  var l = 100;
  
  var id = setInterval(function() {
    if (l == 70) {
      clearInterval(id);
    } else {
      elem.style.backgroundColor = "hsl(0, 0%, " + l + "%)";
      l--;
    }
  }, 6);
}

function myDark(elem) {
  var l = 70;
  
  var id = setInterval(function() {
    if (l == 100) {
      clearInterval(id);
    } else {
      elem.style.backgroundColor = "hsl(0, 0%, " + l + "%)";
      l++;
    }
  }, 6);
}

function numberHover(){
  var arrow = this.children[0];
  arrow.style.left = "5px";
  //arrow.className = "fas fa-caret-right";
  //myBright(this);
}

function numberHoverOut(){
  var arrow = this.children[0];
  arrow.style.left = "8px";
  //arrow.className = "fas fa-caret-left";
}
function myMoveDown(elem) {
  var pos = -25;
  var id = setInterval(function() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      if(pos == -25){
        elem.style.visibility = "visible";
      }
      elem.style.top = pos + 'px';
      elem.style.opacity = (25 + pos) * 0.04;
      pos++;
    }
  }, 1);
  
}
function myMoveUp(elem) {
  var pos = 0;
  var id = setInterval(function() {
    if (pos == -25) {
      clearInterval(id);
    } else {
      if(pos == 0){
        elem.style.visibility = "hidden";
      }
      elem.style.top = pos + 'px';
      elem.style.opacity = (25 + pos) * 0.04;
      pos--;
    }
  }, 1);
  
}
function addButtonHover(){
  if (this != event.target)
      return;
  var text = this.parentElement.children[1];
  myMoveDown(text);
  
}

function addButtonHoverOut(){
  if (this != event.target)
      return;
  var text = this.parentElement.children[1];
  myMoveUp(text);
}

function questionDelete(){
  var num = questionNum;
  var qid = this.parentElement.parentElement.children[0];
  qid.parentElement.parentElement.remove();
  //console.log(qid.id, num);
  
  for(var i = parseInt(qid.id); i < num; i++){
    var question = document.getElementById(i + 1);
    //console.log(question);
    if(question != null){
      var arrow = document.createElement("div");

      arrow.className = "fas fa-caret-left";
      question.id = i;
      question.innerHTML = "Q" + i + ". ";
      question.appendChild(arrow);
      question.parentElement.parentElement.children[1].placeholder = "Write question #" + i + " here";
    }
  }
  questionNum--;
}

function confirm(){
  for(var i = 0; i < questionNum; i++){
    var questionId = "question" + (i + 1);
    console.log(document.getElementById(questionId).value);
  }
  deleteAll();

  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("../Life_Chart/life_chart.html");
}

function enterEvent(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      this.value = this.value.replace(/(\r\n|\n|\r)/gm, "");
      if(this.value != ""){
        submit(this);
        return;
      }
    }
}

function submit(questionBox){
  var question = questionBox.value;
  
  //Remove enter listener
  questionBox.removeEventListener('keyup', enterEvent);


  //Remove add button
  document.getElementById("myButton").remove();
  document.getElementById("confirmDiv").remove();
  questionNum++;

  //Add new questionBox
  addQuestionBox("").focus();
}

initialize();


