var questionNum = 1;
var showing = 0;

var currentProject = localStorage.getItem("currentproject");
var projects = firebase.database().ref('/data/testuser1/project/');
var tableHis;
//= firebase.database().ref("data/testuser1/project/asdfasdf/questions");
var currQuestions = [];

function initialize(){
  document.getElementById("project_title").innerHTML = currentProject;
    projects.once('value', function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        return;
      }
    var questions = Object.keys(myValue);
    
    for(var i = 0; i < questions.length; i++){
      var q = myValue[questions[i]];
      
      if(q.title == currentProject){
        console.log(q.title);
        tableHis = firebase.database().ref('/data/testuser1/project/' + questions[i] + '/questions/');
        addQuestionBox("");
        tableLoadQuestions();
      }
    }
  });
}

//Write current questions into currQuestions array
function writeQuestions(){
  //console.log(currQuestions.length, questionNum);
  for(var i = 0; i < currQuestions.length; i++){
    //console.log(document.getElementById((i + 1)));
    currQuestions[i].layout = document.getElementById("question2_" + (i + 1)).value;
  }
}

//Save currentQuestions array to DB
function tableSaveQuestions(){
  //console.log("here");
  writeQuestions();
  tableHis.remove();
  
  for(var i = 0; i < currQuestions.length; i++){
    var questionId = i + 1;
    //console.log(tableHis.child(questionId).draft);
    
    tableHis.push({
      num: questionId,
      draft: currQuestions[i].draft,
      layout: currQuestions[i].layout,
      memory: currQuestions[i].memory,
      question: currQuestions[i].question
    });
    
    //console.log(document.getElementById(questionId).value);
  }
}

function tableLoadQuestions(){
  tableHis.once('value', function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        return;
      }
    var questions = Object.keys(myValue);
    
    for(var i = 0; i < questions.length; i++){
      var q = myValue[questions[i]];
      
      currQuestions.push({
        draft: q.draft,
        layout: q.layout,
        memory: q.memory,
        question: q.question
      });
      
      if(i == 0){
        document.getElementById("question1").innerHTML = q.question;
        document.getElementById("question2_1").innerHTML = q.layout;
      }else if(i > 0){
        submit((document.getElementById("question" + questionNum)));
        document.getElementById("question" + questionNum).innerHTML = q.question;
        document.getElementById("question2_" + questionNum).innerHTML = q.layout;

      }

    }
  });
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
  var mDiv = document.createElement("div");
  var cDiv = document.createElement("div");
  var memories = document.createElement("div");
  var comments = document.createElement("textarea");
  var confirmDiv = document.createElement("div");
  var confirmButton = document.createElement("a");
  
  //Question box specification
  //Text area specification
  memories.className = "memoryBox";
  memories.id = "question1_" + questionNum;
  memories.innerHTML = '<table id="memotable"><tr><td class="element"><div class="container"><img id = memosheet src = "./../src/image/memory/post_it.png"><div id = "add" class="text-block"><div class="contents"><plus>+</plus></div></div></div></td><td class="element"><div class="container"><img id = memosheet src = "./../src/image/memory/post_it.png"><div class="text-block"><div class="contents"><h3>Test_memory</h3><p>2019.05.09</p></div></div></div></td></tr></table>';

  comments.className = "commentBox";
  comments.id = "question2_" + questionNum;
  comments.placeholder = "Write Comments of Q" +  questionNum + " here";

  //Enter listener
  //memories.addEventListener('keyup', enterEvent);
  //comments.addEventListener('keyup', enterEvent);
  qDiv.innerHTML = '<h2>Q' + questionNum + '. </h2><qst id="question'+questionNum+'">Sample Question</qst>';
  mDiv.innerHTML = "Memories<br />"
  cDiv.innerHTML = "Comments<br />"
  mDiv.appendChild(memories);
  //memories.appendChild(mImgs);
  cDiv.appendChild(comments);
  qDiv.appendChild(mDiv);
  qDiv.appendChild(cDiv);
  qDiv.id = "qDiv" + questionNum;
  mDiv.id = "mDiv" + questionNum;
  cDiv.id = "cDiv" + questionNum;
  qDiv.className = "left";
  mDiv.className = "left";
  cDiv.className = "left";
  
  //Add question to the content
  document.getElementById("paper").appendChild(qDiv);
  
  confirmButton.id = "confirmButton";
  confirmButton.innerHTML = "Confirm";
  confirmButton.addEventListener("click", confirm);
  confirmDiv.appendChild(confirmButton);
  confirmDiv.id = "confirmDiv";
  
  //Add button to the content
  document.getElementById("paper").appendChild(confirmDiv);
  
  return comments;
}

function confirm(){
   writeQuestions();
  for(var i = 0; i < currQuestions.length; i++){
    //console.log(currQuestions[i]);
    if(currQuestions[i].layout == ""){
      alert("Please fill out all the questions.");
      return;
    }
  }
  tableSaveQuestions();
  /*
  for(var i = 0; i < questionNum; i++){
    var question1Id = "question1_" + (i + 1);
    console.log(document.getElementById(question1Id).value);
    var question2Id = "question2_" + (i + 1);
    console.log(document.getElementById(question2Id).value);
  }
  deleteAll();
*/
   // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("../project.html");
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
  document.getElementById("confirmDiv").remove();
  questionNum++;

  //Add new questionBox
  addQuestionBox().focus();
}


function goUploadQuestion(){
  // µÚ·Î°¡±â ´©¸£¸é ´Ù½Ã ¾ÕÆäÀÌÁö·Î ÀÌµ¿
  window.history.forward(2);
  // ±âÁ¸ ÆäÀÌÁö¸¦ »õ·Î¿î ÆäÀÌÁö·Î º¯°æ
  location.replace("../Add_Questions/Add_Questions.html");
}


function goLifeChart(){
  // µÚ·Î°¡±â ´©¸£¸é ´Ù½Ã ¾ÕÆäÀÌÁö·Î ÀÌµ¿
  window.history.forward(1);
  // ±âÁ¸ ÆäÀÌÁö¸¦ »õ·Î¿î ÆäÀÌÁö·Î º¯°æ
  location.replace("../Life_Chart/life_chart.html");
}



initialize();
