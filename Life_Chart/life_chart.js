years = [2016, 2017, 2018, 2019]
pins = [{year: 2017, month: 6, date: 30}, {year: 2019, month: 12, date: 3}]
memos = [{text: "Hi", year: 2017, month: 6, date: 30}, {text: "I'm Jeonghun", year: 2019, month: 12, date: 1}]

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

function initialize(){
  var chart = document.getElementById("life-chart");
  
  //Draw years
  for(var i = 0; i < years.length; i++){
    var newYear = document.createElement("div");
    
    newYear.innerHTML = years[i];
    newYear.className = "chart" + (i + 1);
    chart.appendChild(newYear);
  }
  //Fake for pins
  for(var i = 0; i < years.length; i++){
    var newYear = document.createElement("div");
    
    newYear.id = years[i];
    newYear.className = "fake";
    chart.appendChild(newYear);
  }
  
  //Draw pins and memos
  for(var i = 0; i < memos.length; i++){
      var currYear = document.getElementById(memos[i].year);
    
      drawPin(memos[i], currYear, currYear.offsetLeft, currYear.offsetTop, currYear.offsetWidth);
      drawMemo(memos[i]);
  }
  
}
  //console.log(document.getElementById(years[i]).offsetLeft, document.getElementById(years[i]).offsetWidth);
 
function drawPin(pins, currYear, left, top, width){
  var pin = document.createElement("div");
  var frac = Math.round(dateFraction(pins.year, pins.month, pins.date) * 100) / 100;
  
  pin.className = "fas fa-thumbtack";
  pin.id = pins.year.toString() + '.' + pins.month.toString() + '.' + pins.date.toString();
  pin.style.left = (frac * 100 - 57).toString() + "%";
  pin.style.top = "-30px";
  pin.addEventListener("click", turnMemo);
  /*pin.addEventListener("onmouseover", function(e){
    pin.style.fontSize = 24px;
  });*/
  currYear.appendChild(pin);
}

//Absolute
// function drawPin(pins, currYear, left, top, width){
//   var pin = document.createElement("div");
//   var frac = Math.round(dateFraction(pins.year, pins.month, pins.date) * 100) / 100;
  
//   pin.className = "fas fa-thumbtack";
//   pin.id = pins.year.toString() + '.' + pins.month.toString() + '.' + pins.date.toString();
//   pin.style.left = Math.round(left + (width * frac)).toString() + "px";
//   pin.style.top = (top - 10).toString() + "px";
//   pin.addEventListener("click", turnMemo);
//   currYear.appendChild(pin);
// }

function drawMemo(memo){
  var currPin = document.getElementById(memo.year.toString() + '.' + memo.month.toString() + '.' + memo.date.toString());
  var memoDiv = document.createElement("div");
  
  memoDiv.innerHTML = memo.text;
  memoDiv.className = "memosOn";
  currPin.appendChild(memoDiv);
}

function turnMemo(){
  if(this.children[0].className == "memosOn"){
    this.children[0].className = "memosOff";
  }else{
    this.children[0].className = "memosOn";
  }
}

function moveLeft(){
  console.log("hi");
}

function moveRight(){
  console.log("hello");
}

function goUploadQuestion(){
  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("https://jas03006.github.io/525/Add_Questions/Add_Questions.html");
}

function confirm(){
  // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("https://jas03006.github.io/525/Building_Story/Building_Story.html");
}
initialize();


//console.log(document.getElementById("life-chart"));