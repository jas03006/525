var temp = 0;
var memoryNumber = 26;
var trlines = parseInt((memoryNumber+1)/4);
var remain = memoryNumber - trlines*4 + 1;
console.log(trlines);
console.log(remain);
var hoverable=false;

function initialize(){
  addMemories();
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
  post.innerHTML = '<img id = "memosheet" src="./src/image/memory/memo.png"><div id = "textbox'+(i+2)+'" class="text-block"> <div id = "content'+(i+2)+'" class="contents"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p><br /><p>★ ★ ☆</p></div><div id = "option'+(i+2)+'" class="options" style = "display: none"><div id="titles"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p></div><div id="viewDiv"><a id="viewBtn" class = "btn" href="#">View Memory</a></div><br /><div id="editDiv"><a id="editBtn" class = "btn" href="#">Edit Memory</a></div><div id="delDiv"><a id="delBtn" href="#"><i class="fas fa-times"></i></a></div></div></div>';

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

function addUnWrittenMemo(i, tr) { 
  var td = document.createElement("td");
  var post = document.createElement("div");
  post.id = "post" + (i+2);
  post.className = "container_inv";
  post.innerHTML = '<img id = "memosheet" src="./src/image/memory/memo.png"><div id = "textbox'+(i+2)+'" class="text-block"> <div id = "content'+(i+2)+'" class="contents"><h3>Test_memory'+(i+1)+'</h3><p>2019.05.09</p><br /><p>★ ★ ☆</p></div><div id = "option'+(i+2)+'" class="options" style = "display: none"><div class = "btn"><a href="#"><img id = "memosheet" src="./src/image/button/Btn_view_memory.png"></a></div><br /><div class = "btn"><a href="#"><img id = "memosheet" class = "btn" src="./src/image/button/Btn_edit_memory.png"></a></div><br /><a href="#">DELETE MEMORY</a></div></div>';

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

    post.innerHTML = '<img id = "memosheet" src="./src/image/memory/memo.png"><div id = "add" class="text-block" onclick = "go_add_memory()"><div class="contents"><plus>+</plus><p>Add new memory</p></div></div>';
    td.appendChild(post);

   tr.appendChild(td);  
}

function go_add_memory(){
  // 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("./add_new_memory/Add_new_memory.html");
}

function hover(id) {
  console.log("hover" + id);
}

function add() {

}
initialize();