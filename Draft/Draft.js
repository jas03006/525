var currentkey;
var draftNum = 1;
var questionNumber;
var currentQuestion = 1;
var currentshow = 0; //buildingstory = 0 ; flowchart = 1
var title;
var question = new Array();
var buildingstory = new Array();
var Draft = new Array();
var ref;
var keys;
var data;

function initialize(){
  setTimeout(function() {
    currentkey = localStorage.getItem("currentkey");
    ref = firebase.database().ref('/data/' + 'testuser1' + '/project/' + currentkey);
    var a = ref.once('value', function(snapshot){ 
      data = snapshot.val();
      keys = Object.keys(data['questions']);
      title = data['title'];
      questionNumber = keys.length;
      for (var i = 0; i < keys.length; i++) {
        question[data['questions'][keys[i]]['num']-1] = data['questions'][keys[i]]['question'];
        buildingstory[data['questions'][keys[i]]['num']-1] = data['questions'][keys[i]]['layout'];
        Draft[data['questions'][keys[i]]['num']-1] = data['questions'][keys[i]]['draft'];
      }
    });
    setTimeout(function() {
      makeDraft();
    },1000);
  },100);
}


function makeDraft(){


  //title
  document.getElementById("title").innerHTML = "<h1>"+title+"</h1>";

  //question
  setQuestion();

  //bs<->fc change button
  //makecb();

  //building story
  for (var i = 0; i < questionNumber; i++) {
    make1bs();      
    document.getElementById("bsDiv" + (i+1)).style.display = 'none';
  }
  document.getElementById("bsDiv" + currentQuestion).style.display = 'block';
  draftNum=1;


  //flow chart
  makefc();
  document.getElementById("fcDiv").style.display = 'none';

  var aboutdraft = document.createElement("div");
  aboutdraft.innerHTML="<h2>Write your draft</h2>";
  aboutdraft.id = "aboutdraft";
  document.getElementById("container").appendChild(aboutdraft);
  //draft
  for (var i = 0; i < questionNumber; i++) {
    make1draft();      
    document.getElementById("draftDiv" + (i+1)).style.display = 'none';
  }
  document.getElementById("draftDiv" + currentQuestion).style.display = 'block';
  draftNum = 1;
  //downbox
  makedownbox();


}

function setQuestion() {
  document.getElementById("question").innerHTML = "<h2>Q."+(currentQuestion) +" " +question[currentQuestion-1]+"</h2>";
}

function makecb() {
  var chanDiv = document.createElement("div");
  var chanButton = document.createElement("a");
  chanButton.id = "chanButton";
  chanButton.innerHTML = "See FlowChart";
  chanButton.addEventListener("click", chan);
  chanDiv.appendChild(chanButton);
  chanDiv.id = "chanDiv";
  document.getElementById("paper").appendChild(chanDiv);

}

function make1bs() {
  var bsDiv = document.createElement("div");
  bsDiv.innerHTML = '<textarea class="bsfcBox" id = "bs'+draftNum+'" readonly="readonly" disabled>' +(buildingstory[draftNum-1] != ""?String(buildingstory[draftNum-1]):"") + '</textarea>';
  bsDiv.id = "bsDiv" + draftNum;
  bsDiv.className = "draft-container";
  document.getElementById("container").appendChild(bsDiv);  
  draftNum++;
}

function makefc() {
  var fcDiv = document.createElement("div");
  fcDiv.id = "fcDiv";
  fcDiv.innerHTML = '<div id = "life-chart-container">    <i class="fas fa-chevron-left fa-3x" style = "display: inline-block; cursor: pointer;" onclick = "moveLeft()"></i>    <span id = "life-chart">    </span>    <i class="fas fa-chevron-right fa-3x" style = "display: inline-block; cursor: pointer;" onclick = "moveRight()"></i>    <div id = "commentDiv" onmouseover = "deleteButtonShow()" onmouseout = "deleteButtonHide()">      <div id = "commentName">My comment for this memory: </div>      <textarea id = "comment" placeholder = "Write your comment here"></textarea>      <div class = deleteHelper><i class="far fa-times-circle" id = "deleteButton" onclick = "deleteComment(this)"></i></div>    </div>  </div>  ';
  document.getElementById("container").appendChild(fcDiv);
}
/*
function makefc() {
  var fcDiv = document.createElement("div");
  var fc = document.createElement("textarea");
  fc.className = "bsfcBox";
  fc.id = "fc";
  fc.placeholder = "Flow Chart must be here";
  fcDiv.appendChild(fc);
  fcDiv.id = "fcDiv";
  fcDiv.className = "draft-container";
  document.getElementById("container").appendChild(fcDiv);  
}
*/
function make1draft() {
  var draftDiv = document.createElement("div");
  var draft = document.createElement("textarea");
  draft.className = "draftBox";
  draft.id = "draft" + draftNum;
  draft.placeholder = "Write a Draft of Question #" +  draftNum + " here";
  if(draft[draftNum-1] != "") {
    draft.innerHTML = Draft[draftNum-1];
  }
  draftDiv.appendChild(draft);
  draftDiv.id = "draftDiv" + draftNum;
  draftDiv.className = "draft-container";
  document.getElementById("container").appendChild(draftDiv);  
  draftNum++;
}

function makedownbox() {
  var downBox = document.createElement("div");
  var confirmDiv = document.createElement("div");
  var prevDiv = document.createElement("div");
  var nextDiv = document.createElement("div");
  var confirmButton = document.createElement("a");
  var prevButton = document.createElement("a");
  var nextButton = document.createElement("a");

  //downbox
  prevButton.id = "prevButton";
  prevButton.innerHTML = "Prev";
  prevButton.addEventListener("click", prev);
  prevDiv.appendChild(prevButton);
  prevDiv.id = "prevDiv";

  confirmButton.id = "confirmButton";
  confirmButton.innerHTML = "confirm";
  confirmButton.addEventListener("click", confirm);
  confirmDiv.appendChild(confirmButton);
  confirmDiv.id = "confirmDiv";

  nextButton.id = "nextButton";
  nextButton.innerHTML = "Next";
  nextButton.addEventListener("click", next);
  nextDiv.appendChild(nextButton);
  nextDiv.id = "nextDiv";

  downBox.id = "downBox";
  downBox.appendChild(prevDiv);
  downBox.appendChild(confirmDiv);
  downBox.appendChild(nextDiv);

  //Add button to the content
  document.getElementById("paper").appendChild(downBox);
}

function chan(){
  if (currentshow == 0) {
    currentshow = 1;
    document.getElementById("bsDiv" + currentQuestion).style.display = 'none';
    document.getElementById("fcDiv").style.display = 'block';
    document.getElementById("currentstate").innerHTML = "<h2>Life Chart</h2>";
    document.getElementById("chanButton").innerHTML = "See Build Your Story";
  } else {
    currentshow = 0;
    document.getElementById("bsDiv" + currentQuestion).style.display = 'block';
    document.getElementById("fcDiv").style.display = 'none';
    document.getElementById("currentstate").innerHTML = "<h2>Build Your Story</h2>";
    document.getElementById("chanButton").innerHTML = "See Life Chart";
  }
}
function confirm(){
  var update = {};
  for(var i = 0; i < questionNumber; i++) {
    var a = document.getElementById("draft"+( data['questions'][keys[i]]['num']) ).value;
    update['/data/' + 'testuser1' + '/project/' + currentkey + '/questions/' + keys[i] + '/draft'] = a;
  }
  firebase.database().ref().update(update);
  saveMemosDB();
  location.replace("../project.html");
}
function prev(){
  document.getElementById("draftDiv" + currentQuestion).style.display = 'none';
  document.getElementById("bsDiv" + currentQuestion).style.display = 'none';
  currentQuestion--;
  if (currentQuestion==0) currentQuestion+=questionNumber;
  document.getElementById("draftDiv" + currentQuestion).style.display = 'block';
  if (currentshow == 0) {
    document.getElementById("bsDiv" + currentQuestion).style.display = 'block';    
  }
  setQuestion();
}
function next(){
  document.getElementById("draftDiv" + currentQuestion).style.display = 'none';
  document.getElementById("bsDiv" + currentQuestion).style.display = 'none';
  currentQuestion++;
  if (currentQuestion==questionNumber+1) currentQuestion=1;
  document.getElementById("draftDiv" + currentQuestion).style.display = 'block';
  if (currentshow == 0) {
    document.getElementById("bsDiv" + currentQuestion).style.display = 'block';    
  }
  setQuestion();
}


initialize();


