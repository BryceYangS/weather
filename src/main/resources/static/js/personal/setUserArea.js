/**
 * 지점 및 영역 개인화
 */
var gm,map,rectangle;


//Google Map
gm = L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=kr&x={x}&y={y}&z={z}', {
	attribution: '&copy; <a target="_blank" href="https://maps.google.com/maps?ll=36.1358642,128.0785804&amp;z=13&amp;t=m&amp;hl=ko-KR&amp;gl=US&amp;mapclient=apiv3" title="Google 지도에서 이 지역을 보려면 클릭하세요." ><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/google4.png" draggable="false"></a>' 
});

map = new L.Map('map', {
	layers: [gm], 
	center: new L.LatLng(36.846792, 127.924211), 
	zoom: 6,
	attributionControl : false,
	});


map.on('moveend', function(){
	document.getElementById('cntLat').value = map.getCenter().lat;
	document.getElementById('cntLon').value = map.getCenter().lng;
	document.getElementById('zoomLvl').value = map.getZoom(); 
});

function drawRectangle(intDstDetail){
	
	console.log("testttttttt!");
	
	if(!(typeof(rectangle) == "undefined")){
		map.removeLayer(rectangle);
	}
	
	rectangle = L.rectangle([
		[intDstDetail.intStnDstTopLat, intDstDetail.intStnDstLeftLon], [intDstDetail.intStnDstBottomLat, intDstDetail.intStnDstRightLon]
		]);

	rectangle.editing.enable();

	map.addLayer(rectangle);

	rectangle.on('edit', function() {
		console.log('rectangle was edited!');
	});
}


//사용자 관심 권역 정보 조회
function selectIntDstDetail(intDstId){
	console.log(intDstId);
	
	$.ajax({
		url:"/personal/selectIntDstDetail.do",
		data: {intDstId : intDstId},
		success:function(data){
			console.log(data);
			
			document.getElementById('intDstName').value = data.intDstName;
			document.getElementById('cntLat').value = data.cntLat;
			document.getElementById('cntLon').value = data.cntLon;
			document.getElementById('zoomLvl').value = data.zoomLvl;
			
			changeMap(data.cntLat, data.cntLon, data.zoomLvl);
			drawRectangle(data);
		}
	});
	
};

function changeMap(cntLat, cntLon, zoomLvl){
	map.setView([cntLat,cntLon], zoomLvl);
}



