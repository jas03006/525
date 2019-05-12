var yearStart = 2016;
var currYear = 2019;
var currPin = -1;
var currMemo = "";
var framePinName = -1;
var yearNum = [];
var deleteShowing = 0;
/*var config = {
      apiKey: "AIzaSyDAB7VdqDpWJ9-LPG9rT5H7dWR6m8EaGrQ",
    databaseURL: "https://hci525.firebaseio.com/"
    };
firebase.initializeApp(config);
*/
var currentProject = localStorage.getItem("currentproject");
var projects = firebase.database().ref("data/testuser1/project");
var memoRef = firebase.database().ref("data/testuser1/memory");
var tableHis;
var memos = [];
//memos = [{title: "1", year: 2018, month: 5, date: 1, comment: "Hello", importance: 2}, {title: "2", year: 2018, month: 5, date: 5, comment: "", importance: 2}, {title: "3", year: 2018, month: 5, date: 3, comment: "", importance: 1}, {title: "4", year: 2015, month: 5, date: 4, comment: "", importance: 2}, {title: "5", year: 2018, month: 12, date: 31, comment: "", importance: 1}];

function parseDate(date){
  var dates = date.split("-");
  for(var i = 0; i < dates.length; i++){
    dates[i] = parseInt(dates[i]);
  }
  return dates;
}
function memoSort(){
  var temp = memos;
  var result = [];
  var min = 0;
  //console.log(temp);
  while(temp.length != 0){
    min = 0;
    for(var j = 0; j < temp.length; j++){
      //console.log(temp[j]);
      if(temp[min].date > temp[j].date){
        min = j;
      }
    }
    result.push(temp[min]);
    temp.splice(min, 1);
  }
  temp = result;
  result = [];
  while(temp.length != 0){
    min = 0;
    for(var j = 0; j < temp.length; j++){
      //console.log(temp[j]);
      if(temp[min].month > temp[j].month){
        min = j;
      }
    }
    result.push(temp[min]);
    temp.splice(min, 1);
    
  }
  temp = result;
  result = [];
  while(temp.length != 0){
    min = 0;
    for(var j = 0; j < temp.length; j++){
      //console.log(temp[j]);
      if(temp[min].year > temp[j].year){
        min = j;
      }
    }
    result.push(temp[min]);
    temp.splice(min, 1);
    
  }
  memos = result;
  //console.log(memos);
}
function loadMemos(){
  
    tableHis.once('value', function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        memoRef.once('value', function(snapshot){
          var myValue = snapshot.val();
          if(myValue == null){
            return;
          }
        var questions = Object.keys(myValue);
        //console.log(questions);
        for(var i = 0; i < questions.length; i++){
          var q = myValue[questions[i]];
          var dates = parseDate(q.Date);
          var dic = {
            title: questions[i],
            year: dates[0],
            month: dates[1],
            date: dates[2],
            importance: q.importance,
            comment: ""
          }

          memos.push(dic);
        }
        //console.log(memos.length);
        memoSort();
        drawOnce();
      });
        return;
      }
    var questions = Object.keys(myValue);
    //console.log(questions);
    for(var i = 0; i < questions.length; i++){
      var q = myValue[questions[i]];
      var dic = {
        title: q.title,
        year: q.year,
        month: q.month,
        date: q.date,
        importance: q.importance,
        comment: q.comment
      }
      
      memos.push(dic);
    }
    //console.log(memos.length);
    memoSort();
    drawOnce();
  });
    
}
function saveMemosDB(){
  console.log("here");
  tableHis.remove();
  for(var i = 0; i < memos.length; i++){
    var q = memos[i];
    var dic = {
        title: q.title,
        year: q.year,
        month: q.month,
        date: q.date,
        importance: q.importance,
        comment: q.comment
      };
    console.log(tableHis);
    tableHis.push(dic);
  }
}
function countYear(year){
  var len = yearNum.length;
  
  for(var i = 0; i < len; i++){
    if(yearNum[i].year.toString() == year){
      yearNum[i].count += 1;
      return yearNum[i].count;
    }
  }
  
  yearNum.push({year: year, count: 0});
  return 0;
}

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
function drawOnce(){
  drawYear();
  var pinNum = memos.length;
  
  //Draw pins and memos
  yearNum = [];
  for(var i = 0; i < pinNum; i++){
    var currYear = document.getElementById(memos[i].year);
    var canvas = document.getElementById("life-chart");
    //console.log(i);
    //console.log(memos[i], relLeft, relTop);
    if(memos[i].year >= yearStart && memos[i].year < (yearStart + 4)){
      var relLeft = currYear.offsetLeft - canvas.offsetLeft;
      var relTop = currYear.offsetTop - canvas.offsetTop;
      //console.log(currYear.id);
      drawPin(memos[i], currYear, relLeft, relTop, currYear.offsetWidth);
    }
    //drawMemo(memos[i]);
  }
}
function initialize(){
  document.getElementById("project_name").innerHTML = currentProject;
  tableHis = firebase.database().ref("data/testuser1/project/" + localStorage.getItem("currentkey") + "/flowchart");
  loadMemos();
  /*projects.once('value', function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        return;
      }
    var questions = Object.keys(myValue);
    
    for(var i = 0; i < questions.length; i++){
      var q = myValue[questions[i]];
      //console.log(q.title, currentProject);
      if(q.title == currentProject){
        tableHis = firebase.database().ref("data/testuser1/project/" + questions[i] + "/flowchart");
        //console.log("data/testuser1/project/" + questions[i] + "/flowchart");
      }
    }
    loadMemos();
  });*/
}
 
function drawPin(pins, currYear, left, top, width){
  var pinDiv = document.createElement("div");
  var pin = document.createElement("span");
  var memo = document.createElement("span");
  var canvas = document.getElementById("life-chart");
  var frac = Math.round(dateFraction(pins.year, pins.month, pins.date) * 100) / 100;
  var yearCount = countYear(pins.year);

  
  
  pin.className = "fas fa-pen";
  //pin.id = pins.year.toString() + '.' + pins.month.toString() + '.' + pins.date.toString();
  pin.id = pins.title;
  pinDiv.className = "pinDiv";

  if(pins.importance == 3){
    pin.style.color = "#FF0000";
    pin.style.fontSize = "30px";
    pinDiv.style.top = (-47 - yearCount * 30).toString() + "px";
  }
  else if(pins.importance == 2){
    pin.style.color = "#992222";
    pin.style.fontSize = "25px";
    //console.log(pins, -200 - yearCount * 146);
    pinDiv.style.top = (-47 - yearCount * 30).toString() + "px";
  }
  else if(pins.importance == 1){
    pin.style.color = "#776666";
    pin.style.fontSize = "25px";
    //console.log(pins, -200 - yearCount * 146);
    pinDiv.style.top = (-47 - yearCount * 30).toString() + "px";
  }
  //console.log(pinDiv, pinDiv.style.top);
  //console.log(pins.title, yearCount, pins.year, pins.month);
  //pinDiv.style.left = (100 + (frac - 0.5) * width - 8 + yearCount * 13).toString() + "px";
  //pinDiv.style.left = (100 + (frac - 0.5) * width - 8).toString() + "px";
  //console.log(pins.title, frac, width, yearCount, pinDiv.style.left);
  //pinDiv.style.left = (left + frac * width - 6 - i * 200).toString() + "px";
  pinDiv.style.left = (-12 + frac * 112).toString() + "%";
  //pinDiv.style.top = (top - 80).toString() + "px";
  pin.addEventListener("click", pinPick);
  pin.addEventListener("mouseover", pinIn);
  pin.addEventListener("mouseout", pinOut);
  if(pins.title.length > 10){
    memo.innerHTML = pins.title.substring(0, 10) + "..";
  }
  else{
    memo.innerHTML = pins.title;
  }
  //memo.innerHTML = pins.title;
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
    commentName.innerHTML = this.id;
    currMemo = comment.value;
    //findMemo(currPin.id).comment = comment.value;
      comment.value = findMemo(this.id).comment;
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
  drawOnce();
  
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
    drawOnce();
    
    if(framePinName != -1){
      var maintainPin = document.getElementById(framePinName);
      
      if(maintainPin != null){
        currPin = maintainPin;
        currPin.parentElement.children[1].className = "fixedOn";
      }
    }
  }
}

function myMoveLeft(elem) {
  var pos = 25;
  
  var id = setInterval(function() {
    if (pos == 0) {
      clearInterval(id);
      elem.style.visibility = "hidden";
    } else {
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
    } else {
      if(pos == 0){
        elem.style.visibility = "visible";
      }
      elem.style.left = (pos + 850) + 'px';
      elem.style.opacity = (pos + 24) * 0.04;
      pos++;
    }
  }, 1);
  
}

function deleteButtonShow(){
  var del = document.getElementById("deleteButton");
  
  del.style.visibility = "visible";
}

function deleteButtonHide(){
  var del = document.getElementById("deleteButton");
  
  del.style.visibility = "hidden";
}

function deleteComment(self){
  var comment = document.getElementById("comment").value = "";
  
  findMemo(currPin.id).comment = comment.value;
}

function goUploadQuestion(){
  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("../Add_Questions/Add_Questions.html");
}

function confirm(){
  findMemo(currPin.id).comment = document.getElementById("comment").value;
  saveMemosDB();
  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("../Building_Story/Building_Story.html");
}

initialize();


//console.log(document.getElementById("life-chart"));