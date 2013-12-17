var layers=[1,1,1,1,1];
var currentLayer=3;
function buildLayers(){
	for(var i=0;i<layers.length;i++){
		var layer=layers.length-i;
		var check=(i%2?'a1':'a2');
		if(layer==currentLayer){
			check+=' active';
		}
		var zindex=layer;
		$('#putLayersHere').append(
		"<div id='layerx' class='"+check+"' onmouseover='console.log("+layer+")' style='z-index:"+zindex+"'></div>");
	}
}
buildLayers();
