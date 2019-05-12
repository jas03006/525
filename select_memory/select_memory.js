var temp = 0;
var memoryNumber = 0;
var trlines = 0;
var remain = 0;
var hoverable=false;
var selected = [];
var qkey;

//var currentProject = localStorage.getItem("currentproject");

var Qnum = localStorage.getItem("question_number");
var qNumber = Qnum.substring(1, 2);
var Qcont = localStorage.getItem("question_content");
var pjKey = localStorage.getItem("pjKey");
var currentProject = "test";
console.log(currentProject);

function read_now_account(){
  
  document.getElementById("overlay").style.width = "100%";
  return new Promise(function(resolve, reject){
    firebase.database().ref('/now_account/now_ID').once('value', function(snapshot){ 
                console.log('read_now\n');
                now_account = snapshot.val().trim();
                if(now_account == ''){
                      window.history.forward(1);
                    location.replace("../index.html");
                }else{
                  document.getElementsByClassName("account")[0].getElementsByTagName("a")[0].innerHTML = now_account;
                }
                console.log(now_account);
                document.getElementById("overlay").style.width = "0";
                readFromDatabase();            
                resolve(now_account);
              });
    });
}

function readFromDatabase() {
  /*
     Read comments from the database
     Print all the comments to the table
  */
  document.getElementById("title").innerHTML = currentProject;
  document.getElementById("Description").innerHTML = "Select memories for "+Qnum+Qcont;

  firebase.database().ref('/data/testuser1/project/' + pjKey + '/questions/').once('value', function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        return;
      }
    var pjs = Object.keys(myValue);
    qkey = pjs[qNumber-1];
    var q = myValue[pjs[qNumber-1]];

    for(var i = 0; i < q.memory.length; i++){
      console.log(q.memory[i]);
      selected.push(q.memory[i]);
    }
    //selected = q.memory;
    console.log(selected);

    firebase.database().ref('/data/' + now_account + '/memory/').once('value', 
                                                          function(snapshot) {

        var myValue = snapshot.val();
          if(myValue == null){
          return;
        }
        var keyList = Object.keys(myValue);
        memoryNumber = keyList.length;
        trlines = parseInt((memoryNumber)/4);
        remain = memoryNumber - trlines*4;
        addMemories();

        for(var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          var currentDate = myValue[currentKey]['Date'];
          var cImp = myValue[currentKey]['importance'];

          var currentImp = ""

          switch (cImp){
            case 0 : currentImp = "☆ ☆ ☆"; break;
            case 1 : currentImp = "★ ☆ ☆"; break;
            case 2 : currentImp = "★ ★ ☆"; break;
            default : currentImp = "★ ★ ★";
          }
          
          var title = document.getElementById("content"+(i+2));
          title.innerHTML = '<h3>'+currentKey+'</h3><p>'+currentDate+'</p><br /><p>'+currentImp+'</p>';

          if(selected.includes(currentKey)){
            title.parentElement.parentElement.className = "container_select";
          }
        }
      });
    });
  return;
}

function addMemories(){
  if(memoryNumber<=3) {
    var tr = document.createElement("tr");
    for (var i = 0; i < memoryNumber; i++) {
      addWrittenMemo(i, tr);
    }
    for (var i = memoryNumber; i < 4; i++) {
      addUnWrittenMemo(i, tr);
    }
    document.getElementById("memtable").appendChild(tr);
  }
  else {
      var tr = document.createElement("tr");
    for (var i = 0; i < 4; i++) {
      addWrittenMemo(temp, tr);
    }
    document.getElementById("memtable").appendChild(tr);

    for (var i = 0; i < trlines-1; i++){
      var tr = document.createElement("tr");
      for (var j = 0; j < 4; j++){
        addWrittenMemo(temp, tr);
      }
      document.getElementById("memtable").appendChild(tr);
    }

    var tr = document.createElement("tr");
    for(var i=0; i < remain; i++){
      addWrittenMemo(temp, tr);
    }
    for(var i = remain; i<4; i++) {
      addUnWrittenMemo(temp, tr);
    }
   document.getElementById("memtable").appendChild(tr);
  }
  
  hoverable=true;
}

function addWrittenMemo(i, tr) { 
  var td = document.createElement("td");
  var post = document.createElement("div");
  post.id = "post" + (i+2);
  post.className = "container";
  post.innerHTML = '<img id = "memosheet" src="./../src/image/memory/memo.png"><div id = "textbox'+(i+2)+'" class="text-block" onclick = "select(this)"> <div id = "content'+(i+2)+'" class="contents"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p><br /><p>★ ★ ☆</p></div></div>';

   td.appendChild(post);
   tr.appendChild(td);  

  temp++;
}

function addUnWrittenMemo(i, tr) { 
  var td = document.createElement("td");
  var post = document.createElement("div");
  post.id = "post" + (i+2);
  post.className = "container_inv";
  post.innerHTML = '<img id = "memosheet" src="./../src/image/memory/memo.png"><div id = "textbox'+(i+2)+'" class="text-block"> <div id = "content'+(i+2)+'" class="contents"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p><br /><p>★ ★ ☆</p></div></div>';

   td.appendChild(post);
   tr.appendChild(td);  

  temp++;
}

function select(con) {
  var cls = con.parentElement.className;
  if(cls == "container"){
    con.parentElement.className = "container_select";
    selected.push(con.children[0].children[0].innerHTML);
  }
  else{
    con.parentElement.className = "container";
    var index = selected.indexOf(con.children[0].children[0].innerHTML);
    if (index > -1) {
      selected.splice(index, 1);
    }
  }
  console.log(selected);
}

function confirm(){
  firebase.database().ref('/data/testuser1/project/' + pjKey + '/questions/').once('value', function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        return;
      }
    var pjs = Object.keys(myValue);
    console.log(pjs);
    
    qkey = pjs[qNumber-1];
    var q = myValue[pjs[qNumber-1]];
    console.log(qkey);
    console.log(q);

    var updates = {};
    console.log('/data/testuser1/project/' + pjKey + '/questions/'+qkey+'/memory');
    updates['/data/testuser1/project/' + pjKey + '/questions/'+qkey+'/memory'] = selected;
    firebase.database().ref().update(updates);
    });

   // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("./../Building_Story/Building_Story.html");
}

function hover(id) {
  console.log("hover" + id);
}
