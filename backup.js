var player_classes = [{
	name:'Researchers',
	types:[['one','two','three','four'],['two'],['three'],['four']],
	enabled:[1,1,1,1],
},{
	name:'Agents',
	types:[['one','two'],['two'],['three']],
	enabled:[1,0,0],
},{
	name:'D-Class',
	types:[['one','two'],['two'],['three']],
	enabled:[1,1,1],
}];
function pclassHandler(subj){
	console.log(subj)
}
//Classes
for(var pclass=0;pclass<player_classes.length;pclass++){
	$('#class_sel').append("<div id='pclass"+pclass+"' class='pclass'>"+
			       "<div class='innerp'></div>"+
			       "<div class='pctitle'>"+player_classes[pclass].name+"</div>"+
			       "</div>");
	var subj=$('#pclass'+pclass+' .innerp');
	var subj2=$('#pclass'+pclass);
	//subj2.hover(function(){pclassHandler(this)});
	// Subclasses
	for(var subclass=0;subclass<player_classes[pclass].types.length;subclass++){
		var id='subclass'+subclass+'_'+pclass;
		var count = player_classes[pclass].types[subclass].length;
		var type=(player_classes[pclass].enabled[subclass]);
		if(type==0){
			count='X';
		}
		subj.append("<div id='"+id+"' class='subclass'>"+  //Container
			    "<div id='unitList'></div>"+           //list container
			    "<div id='unitTxt'>"+count+"</div>"+   //Counter
			    "</div>");

		if(type==0){
			$('#'+id).css('opacity',0.5);
		}else{
			//Units
			var id2=pclass+"_"+subclass;
			updateClass(player_classes[pclass].types[subclass].length,id,id2)
		}
	}
}
function updateClass(length,target,id){
	$("#"+target).find('#unitList').html('');
	for(var pUnit=0;pUnit<length;pUnit++){
		$("#"+target).find('#unitList').append("<div id='"+id+"_"+pUnit+"' class='unit'></div>")
	}
	$('#'+target).hover(function(){
		$(this).find( '#unitList' ).show();
	},function(){
		$(this).find( '#unitList' ).hide();
	});
}
