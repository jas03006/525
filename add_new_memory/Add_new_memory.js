

function change_star(event){
	var x = event.clientX;
	if( x >= 465 ){
		var width = (x-465); ///2.05;
		var num_star = 0;
		while(width>=0){
			width = width - 20.5;
			num_star += 0.5;
		}
		document.getElementById("star").children[0].children[0].style = 'width:' + (num_star * 20) +'%';
		//document.getElementById("star").innerHTML += x;
	}
}

$(input).on('keydown', function(e){
    var value = $(input).val();
  $(body).append('<div id="virtual_dom">' + value + '</div>'); 

    var inputWidth =  $('#virtual_dom').width() + 10; 

    $(input).css('width', inputWidth); 
  $('#virtual_dom').remove();
});