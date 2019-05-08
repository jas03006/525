﻿var draftNum = 1;
var questionNumber = 3;
var currentQuestion = 1;
var currentshow = 0; //buildingstory = 0 ; flowchart = 1
var title = "TITLE_NAME";
var question = Array("question1","question2","question3");

function initialize(){

  makeDraft();
}

function deleteAll(){
  for(var i = 0; i < questionNumber; i++){
    var draftDivId = "draftDiv" + (i + 1);
    document.getElementById(draftDivId).remove();
  }
  document.getElementById("downBox").remove();
  draftNum = 1;
  
  initialize();
}

function makeDraft(){


  //title
  document.getElementById("title").innerHTML = "<h1>"+title+"</h1>";

  //question
  setQuestion();

  //bs<->fc change button
  makecb();

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
  document.getElementById("question").innerHTML = "<h2>"+question[currentQuestion-1]+"</h2>";
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
  var bs = document.createElement("textarea");
  bs.className = "draftBox";
  bs.id = "bs" + draftNum;
  bs.placeholder = "building story of Q." + draftNum;
  bsDiv.appendChild(bs);
  bsDiv.id = "bsDiv" + draftNum;
  bsDiv.className = "draft-container";
  document.getElementById("container").appendChild(bsDiv);  
  draftNum++;
}

function makefc() {
  var fcDiv = document.createElement("div");
  var fc = document.createElement("textarea");
  fc.className = "draftBox";
  fc.id = "fc";
  fc.placeholder = "Flow Chart must be here";
  fcDiv.appendChild(fc);
  fcDiv.id = "fcDiv";
  fcDiv.className = "draft-container";
  document.getElementById("container").appendChild(fcDiv);  
}

function make1draft() {
  var draftDiv = document.createElement("div");
  var draft = document.createElement("textarea");
  draft.className = "draftBox";
  draft.id = "draft" + draftNum;
  draft.placeholder = "Write a Draft of Question #" +  draftNum + " here";
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
    document.getElementById("chanButton").innerHTML = "See buildingstory";
  } else {
    currentshow = 0;
    document.getElementById("bsDiv" + currentQuestion).style.display = 'block';
    document.getElementById("fcDiv").style.display = 'none';
    document.getElementById("chanButton").innerHTML = "See FlowChart";
  }
}
function confirm(){
//  deleteAll();
window.history.forward(1);
location.replace("../Draft/Draft.html");
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

