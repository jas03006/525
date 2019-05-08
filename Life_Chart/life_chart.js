var yearStart = 2016;
var currYear = 2019;
var currPin = -1;
var currMemo = "";
var framePinName = -1;

memos = [{title: "SS internship", year: 2016, month: 1, date: 1, comment: "Hello"}, {title: "AI conference", year: 2017, month: 12, date: 1, comment: ""}, {title: "HCI team project", year: 2019, month: 12, date: 31, comment: ""}]

function findMemo(memoTitle){
  for(var i = 0; i < memos.length; i++){
    if(memos[i].title == memoTitle){
      return memos[i];
    }
  }
  //Fail to find such title
  return -1;
}

function dateFraction(year, month, date){
  var date_in_month = [28, 31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var date_sum = 0;
  var full_date = 365;
  
  for(var i = 0; i < month - 1; i++){
      date_sum += date_in_month[i];
  }
  
  //leap year
  if(year % 4 == 0){
    full_date += 1;
    
    if(month == 1 && date < 29){
      // continue;
    }
    else{
      date_sum += 1;
    }
  }
  
  date_sum += date;
  
  return date_sum / full_date;
}
function drawYear(){
  var chart = document.getElementById("life-chart");
  
  //Draw years
  for(var i = 0; i < 4; i++){
    var newYear = document.createElement("div");
    
    newYear.id = (yearStart + i).toString();
    newYear.className = "year";
    newYear.innerHTML = yearStart + i;
    
    if((yearStart + i) % 2 == 0){
      newYear.style.backgroundColor = "#FFFFFF";
    }else{
      newYear.style.backgroundColor = "#AAAAAA";
    }
    //newYearDiv.appendChild(newYear);
    //newYear.style.top = "-150px";
    chart.appendChild(newYear);
  }
}

function initialize(){
  drawYear();
  var pinNum = memos.length;
  
  //Draw pins and memos
  for(var i = 0; i < pinNum; i++){
    var currYear = document.getElementById(memos[i].year);
    var canvas = document.getElementById("life-chart");
    //console.log(i);
    //console.log(memos[i], relLeft, relTop);
    if(memos[i].year >= yearStart && memos[i].year < (yearStart + 4)){
      var relLeft = currYear.offsetLeft - canvas.offsetLeft;
      var relTop = currYear.offsetTop - canvas.offsetTop;
      drawPin(memos[i], currYear, relLeft, relTop, currYear.offsetWidth);
    }
    //drawMemo(memos[i]);
  }
}
 
function drawPin(pins, currYear, left, top, width){
  var pinDiv = document.createElement("div");
  var pin = document.createElement("span");
  var memo = document.createElement("span");
  var canvas = document.getElementById("life-chart");
  var frac = Math.round(dateFraction(pins.year, pins.month, pins.date) * 100) / 100;
  
  pin.className = "fas fa-pen";
  //pin.id = pins.year.toString() + '.' + pins.month.toString() + '.' + pins.date.toString();
  pin.id = pins.title;
  pinDiv.className = "pinDiv";
  
  pinDiv.style.left = (100 + (frac - 0.5) * width - 8).toString() + "px";
  pinDiv.style.top = "-200%";
  //pinDiv.style.left = (left + frac * width - 6 - i * 200).toString() + "px";
  //pinDiv.style.left = (-14 + frac * 114).toString() + "%";
  //pinDiv.style.top = (top - 80).toString() + "px";
  pin.addEventListener("click", pinPick);
  pin.addEventListener("mouseover", pinIn);
  pin.addEventListener("mouseout", pinOut);
  memo.innerHTML = pins.title;
  memo.className = "memosOff";
  
  
  pinDiv.appendChild(pin);
  pinDiv.appendChild(memo);
  currYear.appendChild(pinDiv);
  //pinDiv.appendChild(pin);
}

function pinIn(){
  var memoClass = this.parentElement.children[1].className;
  var commentDiv = document.getElementById("commentDiv");
  var commentName = document.getElementById("commentName");
  var comment = document.getElementById("comment");
  
  if(memoClass == "memosOff"){
    this.parentElement.children[1].className = "memosOn";
    //if(currPin == -1){
    commentName.innerHTML = this.parentElement.children[1].innerHTML;
    currMemo = comment.value;
    //findMemo(currPin.id).comment = comment.value;
      comment.value = findMemo(this.parentElement.children[1].innerHTML).comment;
    //}
    commentDiv.style.visibility = "visible";
  }
  if(memoClass == "fixedOut"){
    this.parentElement.children[1].className = "fixedOn";
  }
}

function pinOut(){
  var memoClass = this.parentElement.children[1].className;
  var commentDiv = document.getElementById("commentDiv");
  var comment = document.getElementById("comment");
  
  if(memoClass == "memosOn"){
    this.parentElement.children[1].className = "memosOff";
    commentName.innerHTML = currPin.id;
    if(currPin == -1){
      commentDiv.style.visibility = "hidden";
    }
    else{
      //comment.value = findMemo(currPin.id).comment;
      comment.value = currMemo;
      //currMemo = "";
    }
  }
  if(memoClass == "fixedOn"){
    this.parentElement.children[1].className = "fixedOut";
    commentDiv.style.visibility = "visible";
  }
}

function pinPick(){
  var memoClass = this.parentElement.children[1].className;
  
  if(memoClass == "memosOn"){
    this.parentElement.children[1].className = "fixedOn";
  }
  if(memoClass == "fixedOn"){
    this.parentElement.children[1].className = "memosOn";
  }
  turnComment(this);
}

function turnComment(self){
  var comment = document.getElementById("comment");
  
  //No pin picked
  if(currPin == -1){
    //Change current Pin
    currPin = self;
    //Load current Pin comment
    comment.value = findMemo(self.id).comment;
    currMemo = comment.value;
  }
  //New pin is picked
  else if(currPin != self){
    //Save current Pin comment
    findMemo(currPin.id).comment = currMemo;
    //Change current Pin
    currPin.parentElement.children[1].className = "memosOff";
    currPin = self;
    //Load current Pin comment
    comment.value = findMemo(self.id).comment;
    currMemo = comment.value;
  }
  //Same pin picked -> unpick pin
  else{
    //Save current Pin comment
    findMemo(currPin.id).comment = currMemo;
    //Unpick pin
    currPin = -1;
    currMemo = "";
  }
}

function moveLeft(){
  yearStart -= 1;
  var chart = document.getElementById("life-chart");

  
  //If current pin exists, maintain current pin
  if(currPin != -1){
    framePinName = currPin.id;
  }else{
    framePinName = -1;
  }
  
  while (chart.hasChildNodes()){
    chart.removeChild(chart.firstChild);
  }
  initialize();
  
  if(framePinName != -1){
    var maintainPin = document.getElementById(framePinName);
    if(maintainPin != null){
      currPin = maintainPin;
      currPin.parentElement.children[1].className = "fixedOn";
    }
  }
}

function moveRight(){
  var commentDiv = document.getElementById("commentDiv");
  
  if(yearStart != 2016){
    yearStart += 1;
    var chart = document.getElementById("life-chart");
  
    //myMove2();
    if(currPin != -1){
      framePinName = currPin.id;
    }else{
      framePinName = -1;
    }
    
    while (chart.hasChildNodes()){
      chart.removeChild(chart.firstChild);
    }
    initialize();
    
    if(framePinName != -1){
      var maintainPin = document.getElementById(framePinName);
      
      if(maintainPin != null){
        currPin = maintainPin;
        currPin.parentElement.children[1].className = "fixedOn";
      }
    }
  }
}

function deleteButtonShow(){
  document.getElementById("deleteButton").style.visibility = "visible";
}

function deleteButtonHide(){
  document.getElementById("deleteButton").style.visibility = "hidden";
}

function deleteComment(self){
  var comment = document.getElementById("comment").value = "";
  
  findMemo(currPin.id).comment = comment.value;
}

function goUploadQuestion(){
  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("../Add_Questions.html");
}

function confirm(){
  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("../Building_Stroy/Building_Story.html");
}

initialize();


//console.log(document.getElementById("life-chart"));