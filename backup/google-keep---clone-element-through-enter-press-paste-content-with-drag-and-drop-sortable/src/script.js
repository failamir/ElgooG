$( "#sortable" ).sortable();
// NOTE: remove clone elem
function removeClone(id){
	if(id == '1'){
		$('#remove-'+id).prev().css('background','green');
	}else{
		$("#"+id).parent().remove();
	}
}

function cloneFunc(id, value, event){
	var flag = true;
	var incId = (parseInt(id)+1); // NOTE: increment current id
	if(value.length == 1 && value != ""){ // NOTE: check user enter atleast one char
		$('.desc-cls').each(function(){
			if($(this).val().trim() == ''){
				flag = false;
				return false;
			}
		});
		if(flag){
			$('#desc-'+id).clone() // NOTE: cloning
			.attr('id','desc-'+incId)
			.appendTo('.desc-container');
			$('#desc-'+incId+' textarea').val('');
			$('#desc-'+incId+' textarea').attr('id',incId); // NOTE: assign inc ID into input type text
			if($('#desc-'+(incId-1)+' .remove-des').val != ""){ // NOTE: show remove btn when user type atleast one char
				//$('#desc-'+(incId-1)+' .remove-des').css('display','inline-block');
			}
			$('#desc-'+incId+' .remove-des').attr('id','remove-'+incId); // NOTE: assign id into remove btn
			$('#desc-'+incId+' .desc-cls').attr('tabindex', +incId); // NOTE:  assign tabindex into type text
		}
		//$('.cloneBtn').attr('id',incId);
	}
	var key = event.which;
	if(key == 13 && value != ""){
		$('#desc-'+incId+' textarea').focus();
	}
}

function cloneFuncPaste(id, value, event){
	var incId = (parseInt(id)+1); // NOTE: increment current id
	if(value == ""){
		$('#desc-'+id).clone() // NOTE: cloning
		.attr('id','desc-'+incId)
		.appendTo('.desc-container');
		$('#desc-'+incId+' textarea').val('');
		$('#desc-'+incId+' textarea').attr('id',incId); // NOTE: assign inc ID into input type text
		if($('#desc-'+(incId-1)+' .remove-des').val != ""){ // NOTE: show remove btn when user type atleast one char
			//$('#desc-'+(incId-1)+' .remove-des').css('display','inline-block');
		}
		$('#desc-'+incId+' a').attr('id','remove-'+incId); // NOTE: assign tabindex into type text
		$('#desc-'+incId+' .desc-cls').attr('tabindex', +incId); // NOTE:  assign tabindex into type text
		//$('.cloneBtn').attr('id',incId);
		//$('#desc-'+incId+' input').focus();
		var key = event.which;
		if(key == 13 && value != ""){
			$('#desc-'+incId+' textarea').focus();
		}
	}
}

function mouseOverRemove(id){
	getVal = $("#"+id + " .desc-cls").val();
	if(getVal != ""){
		$("#"+id + " .remove-des").css('display', 'block');
		$("#"+id + " .glyphicon-sort-container .glyphicon-sort").css('display', 'block');
	}
}

function mouseLeaveRemove(){
		$(".remove-des").css('display', 'none');
		$(".glyphicon-sort-container .glyphicon-sort").css('display', 'none')
}

function focusElem(id){
	$('#'+id).find('textarea').focus();
}