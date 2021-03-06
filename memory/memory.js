﻿var temp = 0;
var memoryNumber = 0;
var trlines = 0;
var remain = 0;
var hoverable=false;

/*
function initialize(){
  //addMemories();
}
*/

function read_now_account(){

  document.getElementById("overlay").style.width = "100%";
  return new Promise(function(resolve, reject){
    firebase.database().ref('/now_account/now_ID').once('value', function(snapshot){ 
      console.log('read_now\n');
      now_account = snapshot.val().trim();
      if(now_account == ''){
        location.href = "../index.html";
        //window.history.forward(1);
        //location.replace("../index.html");
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
     firebase.database().ref('/data/' + now_account + '/memory/').once('value', 
      function(snapshot) {
        var myValue = snapshot.val();
        if(myValue == null){
          addMemories();
          return;
        }
        var keyList = Object.keys(myValue);
        memoryNumber = keyList.length;
        trlines = parseInt((memoryNumber+1)/4);
        remain = memoryNumber - trlines*4 + 1;
        console.log(trlines);
        console.log(remain);
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
          var title2 = document.getElementById("titles"+(i+2));
          title2.innerHTML = '<h3>'+currentKey+'</h3><p>'+currentDate+'</p>';
      /*
      console.log(title.innerHTML);
      console.log(myValue[currentKey]['Date']);
      console.log(cImp);
      console.log(currentImp);
      console.log(currentKey);
      */
    }
    
  });

     return;
   }

   function addMemories(){
    if(memoryNumber<=3) {
      var tr = document.createElement("tr");
      addPlusMemo(tr);
      for (var i = 0; i < memoryNumber; i++) {
        addWrittenMemo(i, tr);
      }
      for (var i = memoryNumber; i < 3; i++) {
        addUnWrittenMemo(i, tr);
      }
      document.getElementById("memtable").appendChild(tr);
    }
    else {
      var tr = document.createElement("tr");
      addPlusMemo(tr);
      for (var i = 0; i < 3; i++) {
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
    post.innerHTML = '<img id = "memosheet" src="./src/image/memory/memo.png"><div id = "textbox'+(i+2)+'" class="text-block"> <div id = "content'+(i+2)+'" class="contents"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p><br /><p>★ ★ ☆</p></div><div id = "option'+(i+2)+'" class="options" style = "display: none"><div id="delDiv"><a id="delBtn" onclick = "delete_memory(this)"><i class="fas fa-times"></i></a></div><div id="titles'+(i+2)+'"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p></div><div id="viewDiv"><a id="viewBtn" class = "btn" onclick = "go_view_memory(this)">View Memory</a></div><br /><div id="editDiv"><a id="editBtn" class = "btn" onclick = "go_edit_memory(this)">Edit Memory</a></div></div></div>';

    post.addEventListener("mouseleave", function () {
      //leave
      var projectOptions1 = document.getElementById("content"+(i+2));
      var projectOptions2 = document.getElementById("option"+(i+2));

      //console.log("leave\t"+ post.id);
      projectOptions1.style.display = 'block';    
      projectOptions2.style.display = 'none';    
    });
    post.addEventListener("mouseenter", function () {
      //enter
      var projectOptions1 = document.getElementById("content"+(i+2));
      var projectOptions2 = document.getElementById("option"+(i+2));

      //console.log("enter\t"+ post.id);
      projectOptions1.style.display = 'none';    
      projectOptions2.style.display = 'block';  
    });

    td.appendChild(post);
    tr.appendChild(td);  

    temp++;
  }

  function addUnWrittenMemo(i, tr) { 
    var td = document.createElement("td");
    var post = document.createElement("div");
    post.id = "post" + (i+2);
    post.className = "container_inv";
    post.innerHTML = '<img id = "memosheet" src="./src/image/memory/memo.png"><div id = "textbox'+(i+2)+'" class="text-block"> <div id = "content'+(i+2)+'" class="contents"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p><br /><p>★ ★ ☆</p></div><div id = "option'+(i+2)+'" class="options" style = "display: none"><div id="delDiv"><a id="delBtn" onclick = "delete_memory(this)"><i class="fas fa-times"></i></a></div><div id="titles'+(i+2)+'"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p></div><div id="viewDiv"><a id="viewBtn" class = "btn" onclick = "go_view_memory(this)">View Memory</a></div><br /><div id="editDiv"><a id="editBtn" class = "btn" onclick = "go_edit_memory(this)">Edit Memory</a></div></div></div>';

    post.addEventListener("mouseleave", function () {
      //leave
      var projectOptions1 = document.getElementById("content"+(i+2));
      var projectOptions2 = document.getElementById("option"+(i+2));

      console.log("leave\t"+ post.id);
      projectOptions1.style.display = 'block';    
      projectOptions2.style.display = 'none';    
    });
    post.addEventListener("mouseenter", function () {
      //enter
      var projectOptions1 = document.getElementById("content"+(i+2));
      var projectOptions2 = document.getElementById("option"+(i+2));

      console.log("enter\t"+ post.id);
      projectOptions1.style.display = 'none';    
      projectOptions2.style.display = 'block';  
    });

    td.appendChild(post);
    tr.appendChild(td);  

    temp++;
  }

  function addPlusMemo(tr) { 
    var td = document.createElement("td");
    var post = document.createElement("div");
    post.id = "post1";
    post.className = "container";

    post.innerHTML = '<img id = "memosheet" src="./src/image/memory/memo_add.png"><div id = "add" class="text-block" onclick = "go_add_memory()"><div class="contents"><plus>+</plus><p>Add new memory</p></div></div>';
    td.appendChild(post);

    tr.appendChild(td);  
  }

  function go_add_memory(){
    location.href = "./add_new_memory/Add_new_memory.html";
    //window.history.forward(1);
    //location.replace("./add_new_memory/Add_new_memory.html");
  }
//onclick = "go_view_memory(this)"
function go_view_memory(obj){
 var memory_name  = obj.parentElement.parentElement.children[1].children[0].innerHTML;

 console.log(memory_name);
 localStorage.setItem("memory_name", memory_name);
 location.href = "./View_memory/View_memory.html";
 //window.history.forward(1);
 //location.replace("./View_memory/View_memory.html");
}
//onclick = "go_edit_memory(this)"
function go_edit_memory(obj){
 var memory_name  = obj.parentElement.parentElement.children[1].children[0].innerHTML;

 console.log(memory_name);
 localStorage.setItem("memory_name", memory_name);
 location.href = "./Edit_memory/Edit_memory.html";
 //window.history.forward(1);
 //location.replace("./Edit_memory/Edit_memory.html");
}

function delete_memory(obj){
  var memory_name  = obj.parentElement.parentElement.children[1].children[0].innerHTML;

  console.log(memory_name);
  if (confirm('Are you sure you want to Delete? This cannot be undone.')) {
    firebase.database().ref('/data/' + now_account + '/memory/'+memory_name).remove();

  //also delet in flowchart for each projects
  delete_memory_in_flowcharts(memory_name);
} else {
    // Do nothing!
  }
}
function delete_memory_in_flowcharts( memory_title ){
  var projects =  firebase.database().ref("data/testuser1/project");
  if(projects == null){
   console.log('projects is null');
   location.reload();
   return;
 }
 projects.once('value', function(snapshot){
   var myValue = snapshot.val();
   if(myValue == null){
     console.log('project_value is null');
     location.reload();
     return;
   }
   var project_keys = Object.keys(myValue);

   for(var i = 0; i < project_keys.length; i++){
    var target_key;
    var flowchart = myValue[project_keys[i]]['flowchart'];
    if(flowchart == null){
      console.log('flowchart is null');
      location.reload();
      return;
    }
    var memory_keys = Object.keys(flowchart);
    for(var j = 0; j <  memory_keys.length; j++){
     if ( flowchart[memory_keys[j]]['title'].trim() == memory_title.trim()){
      target_key = memory_keys[j];
      console.log(target_key);
            //firebase.database().ref("data/testuser1/project/" + project_keys[i] + "/flowchart/" + target_key).remove();
            break;
          }
        }
        firebase.database().ref("data/testuser1/project/" + project_keys[i] + "/flowchart/" + target_key).remove();
      }
   //window.history.forward(1);
   location.reload();
 });
}


function hover(id) {
  console.log("hover" + id);
}

function add() {

}

//initialize();
