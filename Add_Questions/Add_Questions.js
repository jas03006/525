var questionNum = 1;

function initialize(){
  
  addQuestionBox();
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

function addQuestionBox(){
  var qDiv = document.createElement("div");
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
  
  //Enter listener
  question.addEventListener('keyup', enterEvent);
  qDiv.innerHTML = "Q" + questionNum + ". ";
  qDiv.appendChild(question);
  qDiv.id = "qDiv" + questionNum;
  qDiv.className = "center";
  
  //Add question to the content
  document.getElementById("paper").appendChild(qDiv);
  
  //Add question button specification
  addButton.innerHTML = "+";
  addButton.className = "addButton";
  
  addButton.addEventListener("click", function (e){
    submit(question);
  });
  
  addQuestionText.innerHTML = "Add Question";
  addQuestionText.style.color = "#3ea99f";
  
  buttonDiv.className = "center";
  buttonDiv.appendChild(addButton);
  buttonDiv.appendChild(addQuestionText);
  buttonDiv.id = "myButton";
  
  confirmButton.id = "confirmButton";
  confirmButton.innerHTML = "Confirm";
  confirmButton.addEventListener("click", confirm);
  confirmDiv.appendChild(confirmButton);
  confirmDiv.id = "confirmDiv";
  
  //Add button to the content
  document.getElementById("paper").appendChild(buttonDiv);
  document.getElementById("paper").appendChild(confirmDiv);
  
  return question;
}

function confirm(){
  for(var i = 0; i < questionNum; i++){
    var questionId = "question" + (i + 1);
    console.log(document.getElementById(questionId).value);
  }
  deleteAll();
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

//version1

/*function submit(questionBox){
  //console.log(question);
  var question = questionBox.value
  var qDiv = document.createElement("div");
  var addedQuestion = document.createElement("div");
  
  //Add question 
  addedQuestion.innerHTML = "Q" + (questionNum + 1) + ". " + question;
  questionNum++;
  addedQuestion.className = "left";
  qDiv.className = "center";
  qDiv.appendChild(addedQuestion);
  document.getElementById("paper").appendChild(qDiv);
  
  //Delete question box and add new one
  questionBox.remove();
  addQuestionBox().focus();
}*/

//version2

function submit(questionBox){
  var question = questionBox.value;
  
  //Remove enter listener
  questionBox.removeEventListener('keyup', enterEvent);


  //Remove add button
  document.getElementById("myButton").remove();
  document.getElementById("confirmDiv").remove();
  questionNum++;

  //Add new questionBox
  addQuestionBox().focus();
}


initialize();


