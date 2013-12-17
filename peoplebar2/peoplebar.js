$.get("names.txt", function(data) {_names = data.split(',');loadGame();});
var player_classes = [{
	name:'<i class="icon-researcher"></i>',
	title:'Dr ',
	types:[],
	enabled:[1,1,1,1],
},{
	name:'<i class="icon-agent"></i>',
	title:'Agent ',
	types:[],
	enabled:[1,0,0],
},{
	name:'<i class="icon-dclass"></i>',
	title:'D-',
	types:[],
	enabled:[1,1,1],
}];
var types=[3,5,2];
function populateRandomly(){
	for(var i=0;i<player_classes.length;i++){
		for(var e=0;e<types[i];e++){
			player_classes[i].types[e]=[];
			for(var x=0;x<Math.floor((Math.random()*10)+1);x++){
				if(i==2){
					player_classes[i].types[e][x]=(Math.floor((Math.random()*89999)+10000));
				}else{
					player_classes[i].types[e][x]=(_names[Math.floor((Math.random()*1000)+1)]);
				}
			}
		}

	}

}
var toolbarColours=['pred','pgreen','pblue'];
function toolbarInit(){
	for(var pclass=0;pclass<player_classes.length;pclass++){
		$('#class_sel').append("<div id='pclass"+pclass+"' class='pclass "+toolbarColours[pclass]+"'>"+
				       "<div class='innerp'></div>"+
				       "<div class='pctitle'>"+player_classes[pclass].name+"</div>"+
				       "</div>");
		var subj=$('#pclass'+pclass+' .innerp');
		var subj2=$('#pclass'+pclass);
		for(var subclass=0;subclass<player_classes[pclass].types.length;subclass++){
			var id='subclass'+subclass+'_'+pclass;
			var count = player_classes[pclass].types[subclass].length;
			subj.append("<div id='"+id+"' class='subclass'>"+  //Container
				    "<div id='unitList'></div>"+           //list container
				    "<div id='unitTxt'></div>"+   //Counter
				    "</div>");
			$('#'+id).hover(function(){
				$(this).find( '#unitList' ).fadeIn(0);
			},function(){
				$(this).find( '#unitList' ).fadeOut(900);
			});

		}
	}
}
function testt(a){
	console.log(a);
}
function hoverHandler(outer,inner,user,subject){
	console.log('call');
	$(subject).find('#unitList').hover(function(){
		var name=player_classes[outer].types[inner][user];
		console.log(name);
	});
}
function toolbarPopulate(){
	for(var pclass=0;pclass<player_classes.length;pclass++){
		var psub=$("#pclass"+pclass);
		for(var subclass=0;subclass<player_classes[pclass].types.length;subclass++){
			var spsub=$("#subclass"+subclass+"_"+pclass);
			$(spsub).find("#unitTxt").html(player_classes[pclass].types[subclass].length);
			$(spsub).find('#unitList').html('')
			for(var pUnit=0;pUnit<player_classes[pclass].types[subclass].length;pUnit++){
				$(spsub).find('#unitList').append("<div id='unit"+subclass+"_"+pclass+"_"+pUnit+
								  "' onmouseover='unitIn("+pclass+","+subclass+","+pUnit+
								  ")' onmouseout='unitOut();' class='unit'></div>")
				$(spsub).find('#unitList').blah='aa';

								  //"' onmouseover=\"$('#hovered').html('"+player_classes[pclass].title+player_classes[pclass].types[subclass][pUnit]+
			}
		}
	}
}
function unitIn(pclass,subclass,unit){
	$('#hovered').html(player_classes[pclass].title+player_classes[pclass].types[subclass][unit]);
}
function unitOut(){
//$('#hovered').html('nothing');
}
function addPerson(vClass, vSubclass, title){
	player_classes[vClass].types[vSubclass].push(title);
	toolbarPopulate();

}
//179 178 180 185 151
function loadGame() {
	populateRandomly();
	toolbarInit();
	toolbarPopulate();
};
