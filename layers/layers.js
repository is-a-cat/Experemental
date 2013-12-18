var layers=[1,1,1,1,1];
var currentLayer=2;
function newLayer(){
		layers.push('1');
	buildLayer(layers.length,1);
}
function buildLayer(i,x){
	if(x){

		var check=(i%2?'a2':'a1');
		var layer=layers.length-1;
}else{
		var check=(i%2?'a1':'a2');
		var layer=layers.length-i-1;
}
		console.log(layer)
		var zindex=layer;
		var cont="<div id='layerx' class='layer"+layer+" "+check+"' onmousedown='layerHandler("+layer+")' style='z-index:"+zindex+"'></div>";
		if(x)
		$('#putLayersHere').prepend(cont);
	else
		$('#putLayersHere').append(cont);
		if(layer==currentLayer){
			$('.layer'+layer).addClass('active');
		}
}
function buildLayers(){
	$("#layerNumber").html(currentLayer);
	for(var i=0;i<layers.length;i++){
		buildLayer(i);
	}
}
$('.buttonTest').click(newLayer);
function layerHandler(layer){
	$('.layer'+currentLayer).removeClass('active');
	$('.layer'+layer).addClass('active');
	$("#layerNumber").html(layer);
	currentLayer=layer;
}
buildLayers();
