//TODO: 
//  reimplement the 'disabled' switch.
$.get("names.txt", function(data) {_names = data.split(',');loadGame();}); //Grab the names from names.txt when done, load the game
// Data for generating the bar. In the real thing, this will come from the user data. Also, make a better data structure for units, idiot.
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
// number of subclasses per class. Temporary fix for lack of real data.
var types=[3,3,2]; 
// This is just for testing purposes. Like i said, data will be managed by a central script that will call toolbarpopulate() when done
function populateRandomly(){
	for(var i=0;i<player_classes.length;i++){
		for(var e=0;e<types[i];e++){
			player_classes[i].types[e]=[];
			var unitNum=Math.floor((Math.random()*10)+1);
			for(var x=0;x<unitNum;x++){
				if(i==2){ //if D-Class
					player_classes[i].types[e][x]=(Math.floor((Math.random()*89999)+10000)); // Assign random number
				}else{
					player_classes[i].types[e][x]=(_names[Math.floor((Math.random()*1000)+1)]); // Assign random name
				}
			}
		}

	}
}
var toolbarColours=['pred','pgreen','pblue']; // These are class names in CSS
function toolbarInit(){ //builds the toolbar inside class_sel. I did it this way to be more open to change the number of classes/subclasses on the fly
	for(var pclass=0;pclass<player_classes.length;pclass++){ //for classes in datastructure
		$('#class_sel').append("<div id='pclass"+pclass+"' class='pclass "+toolbarColours[pclass]+"'>"+ //Draw classes
				       "<div class='innerp'></div>"+
				       "<div class='pctitle'>"+player_classes[pclass].name+"</div>"+
				       "</div>");
		var subj=$('#pclass'+pclass+' .innerp');
		var subj2=$('#pclass'+pclass);
		for(var subclass=0;subclass<player_classes[pclass].types.length;subclass++){ //for each class
			var id='subclass'+subclass+'_'+pclass;
			var count = player_classes[pclass].types[subclass].length; //draw subclasses
			subj.append("<div id='"+id+"' class='subclass'>"+  //Container
				    "<div id='unitList'></div>"+           //list container
				    "<div id='unitTxt'></div>"+   //Counter
				    "</div>");
			$('#'+id).hover(function(){ // on hover, unhide the div holding all of the units
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
function toolbarPopulate(){ //Fills the toolbar structure generated in toolbarInit() with the data from the data structure
	for(var pclass=0;pclass<player_classes.length;pclass++){ // loop through the classes
		var psub=$("#pclass"+pclass);
		for(var subclass=0;subclass<player_classes[pclass].types.length;subclass++){ //loop through the subclasses
			var spsub=$("#subclass"+subclass+"_"+pclass);
			$(spsub).find("#unitTxt").html(player_classes[pclass].types[subclass].length);
			$(spsub).find('#unitList').html('')
			for(var pUnit=0;pUnit<player_classes[pclass].types[subclass].length;pUnit++){//loop through the units
				var unitClass=(player_classes[pclass].types[subclass].length==1?'only':'unit'); // If there is only one unit in the class, round all the corners, otherwise leave it for css :first-child and :last-child to sort out
				var unitContent="<div id='unit"+subclass+"_"+pclass+"_"+pUnit+ //generate unit with unique id of unit[class]_[subclass]_[unit]. 
								  "' class='"+unitClass+"' onmouseover='unitIn("+pclass+","+subclass+","+pUnit+
								  ")' onmouseout='unitOut();'></div>";



				$(spsub).find('#unitList').append(unitContent)
			}
		}
	}
}
function unitIn(pclass,subclass,unit){ //called by embedded onmouseover event in each 'user' element
	$('#hovered').html(player_classes[pclass].title+player_classes[pclass].types[subclass][unit]); // show the name of the hovered user
}
function unitOut(){
	//save this space for unit out
}
function addPerson(vClass, vSubclass, title){
	player_classes[vClass].types[vSubclass].push(title);
	toolbarPopulate();

}
//Catch any of these busses to get home
//179 178 180 185 151
function loadGame() { // put this into the init() function 
	populateRandomly();
	toolbarInit();
	toolbarPopulate();
};
