/**
 *  leaflet canvas marker를 이용한 marker 그리는 lib
 *  (javascript Class 공부)
 */
//<!--
// (사용 예)
// var rs = dfs_xy_conv("toLL","60","127");
// console.log(rs.lat, rs.lng);
//
// LCC DFS 좌표변환을 위한 기초 자료
//
var RE = 6371.00877; // 지구 반경(km)
var GRID = 5.0; // 격자 간격(km)
var SLAT1 = 30.0; // 투영 위도1(degree)
var SLAT2 = 60.0; // 투영 위도2(degree)
var OLON = 126.0; // 기준점 경도(degree)
var OLAT = 38.0; // 기준점 위도(degree)
var XO = 43; // 기준점 X좌표(GRID)
var YO = 136; // 기1준점 Y좌표(GRID)
//
// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//


function dfs_xy_conv(code, v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs = {};
    if (code == "toXY") {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    }
    else {
        rs['x'] = v1;
        rs['y'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) - ra;
        var alat = Math.pow((re * sf / ra), (1.0 / sn));
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
            theta = 0.0;
        }
        else {
            if (Math.abs(yn) <= 0.0) {
                theta = Math.PI * 0.5;
                if (xn < 0.0) - theta;
            }
            else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
    }
    return rs;
}


var BaseMap = (function(){
	"use strict";	

	function BaseMap_(){
		this.map;
		this.mapId;
		this.baseTime;
		this.baseDate;
		this.data;
		this.weatherLayer;
		this.weatherMarkers;
		this.cloudClearIMG="/image/weather-icon/weather-clear.png";
		this.cloudMuchIMG="/image/weather-icon/weather-clouds.png";
		this.cloudBadIMG="/image/weather-icon/weather-overcast.png";
		
		this.makers;
		

	};
	
	 BaseMap_.prototype = {
			 
			 init : function(mapid){
				this.mapId = mapid; 
				this.map = this._drawBaseMap();
				this.data = [];
				this.weatherLayer;
				this.weatherMarkers = [];
				
				this.makers = [];
				
				return this.map;
			 },
			 
			 _drawBaseMap : function(){
					//OSM
					var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
							//화면 오른쪽 하단 attributors
					});
					
					//Google Map
					var gm = L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=kr&x={x}&y={y}&z={z}', {
						attribution: '&copy; <a target="_blank" href="https://maps.google.com/maps?ll=36.1358642,128.0785804&amp;z=13&amp;t=m&amp;hl=ko-KR&amp;gl=US&amp;mapclient=apiv3" title="Google 지도에서 이 지역을 보려면 클릭하세요." ><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/google4.png" draggable="false"></a>' 
							//화면 오른쪽 하단 attributors
					});

					var lat = 36.1358642; //latitude
					var lng = 128.0785804; //longitude
					var zoom = 7; //zoom Level
					var map = L.map(this.mapId, {
						center: [lat, lng],
						zoom: zoom,
						layers : gm,
						attributionControl :false // attribution hide
					});
					
					
					var baseMaps = {
							"GM" : gm,
							"OSM" : osm,
					};
					var drawnItems = L.featureGroup().addTo(map);
					L.control.layers(
							baseMaps,
							{'drawnlayer':drawnItems},
							{position: 'topleft', collapsed:false}
							).addTo(map);
					
				    map.addControl(new L.Control.Draw({
				        edit: {
				            featureGroup: drawnItems,
				            poly: {
				                allowIntersection: false
				            }
				        },
				        draw: {
				            polygon: {
				                allowIntersection: false,
				                showArea: true
				            }
				        }
				    }));

				    map.on(L.Draw.Event.CREATED, function (event) {
				        var layer = event.layer;
				        drawnItems.addLayer(layer);
				    });

					
					return map;
			},
			
			drawCityDot : function(){
				var stnKoLayer = L.canvasIconLayer({}).addTo(this.map);

				function svgText(txt) {
		 			return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="30"><text x="0" y="30" style="font-size: 14px;">' + txt + '</text></svg>';      
				}

				var icon;
				var img;

				var markers = [];
			    for (var i = 0; i < stnData.length; i++) {

					img = 'data:image/svg+xml,' + encodeURIComponent(svgText(stnData[i].stnKo));
		 			icon = L.icon({
		 			  iconUrl: img,
		 			  iconSize: [50, 50],
		 			  iconAnchor: [25, 25]
		 			});
				  var marker = L.marker([stnData[i].lat, stnData[i].lon], {icon: icon}).on('click', onClick(stnData[i].stnKo));
			      markers.push(marker);
				}
				
				stnKoLayer.addLayers(markers);


				//지점 점 표출
				var stnLayer = L.canvasIconLayer({}).addTo(this.map);

			    var icon = L.icon({
			      iconUrl: '/image/red_dot.png',
			      iconSize: [10, 10],
			      iconAnchor: [5, 5]
			    });

				var markers = [];
				for (var i = 0; i < stnData.length; i++) {
				  var marker = L.marker([stnData[i].lat, stnData[i].lon], {icon: icon}).on('click', onClick(stnData[i].stnKo));
				  markers.push(marker);
				}
				stnLayer.addLayers(markers);

			},
			
			drawWindBarb : function(){
				var self = this;
		    // Here i set up the variables, this is optional
				var icon, marker;
				for (var i = 0; i < stnData.length; i++) {
					icon = L.WindBarb.icon({deg: stnData[i].wd, speed: stnData[i].ws});
		            marker = L.marker([stnData[i].lat,stnData[i].lon], {icon: icon});
		            marker.addTo(self.map);
				}	
			},
			
			
			//동네예보 Data 조회(지점 수 만큼 ajax 반복)
			_getData : function(){
				var self = this;
				
				for(var i=0; i<scatterdRegionInfo.length; i++){
					var regionItem = scatterdRegionInfo[i];

					$.ajax({
						url : "/leaflet/getWeatherData.do",
						data : {
							baseTime : self.baseTime
							, baseDate: self.baseDate
							, x:regionItem.x
							, y:regionItem.y
							},
		                async: false,
					}).done(function(data){
						if(data.response.header.resultCode =="0000"){//data 성공
							console.log(data);
							self.data.push(data.response.body.items.item); 
							/*  
							[{
				            "baseDate": 20191108,
				            "baseTime": "0200",
				            "category": "REH",
				            "fcstDate": 20191108,
				            "fcstTime": "0600",
				            "fcstValue": 65,
				            "nx": 60,
				            "ny": 127
				          	},{},.. 
				          	]
				          */
						}
					})
					.fail(function(e){console.log(e)});
				}
			},
			
//			POP	강수확률	%
//			PTY	강수형태	코드값
//			R06	6시간 강수량	범주 (1 mm)
//			REH	습도	%
//			S06	6시간 신적설	범주(1 cm)
//			SKY	하늘상태	코드값
//			T3H	3시간 기온	℃
//			TMN	아침 최저기온	℃
//			TMX	낮 최고기온	℃
//			UUU	풍속(동서성분)	m/s
//			VVV	풍속(남북성분)	m/s
//			WAV	파고	M
//			VEC	풍향	m/s
//			WSD	풍속	1
			
			//받아온 데이터 기준 Marker 만듦
			_makeMarker : function(){
				var self = this;
				this._getData();
				
				for(var i=0; i<self.data.length;i++){
					var weatherItem = self.data[i];
					var html = [];
					var temp;
					
					for(var j=0; j<weatherItem.length; j++){
						var weatherElement = weatherItem[j];
						var category = weatherElement.category;
						var value = weatherElement.fcstValue;
						
						if(category == "SKY"){
							if(value <= 5){
								html.push("<img src='"+self.cloudClearIMG+"' class='weatherIcon'/>")
							}else if(value <= 8){
								html.push("<img src='"+self.cloudMuchIMG+"' class='weatherIcon'/>")
							}else if(value <= 10){
								html.push("<img src='"+self.cloudBadIMG+"' class='weatherIcon'/>")
							}
						}else if(category == "T3H"){
							temp = value;
						}
					}

					var divIcon = L.divIcon({className:'',html:html.join("")});
					
					var latLng = dfs_xy_conv("toLL",weatherItem[0].nx,weatherItem[0].ny);
					
					var marker = L.marker([latLng.lat, latLng.lng], {icon:divIcon})
										.bindTooltip("<span class='weatherInfo'>3시간 기온 : " + temp + "℃</span>");
					self.weatherMarkers.push(marker);
				}
			},
			
			onInit : function(){
			    this.context = document.createElement("div");
			    
			    for(var i=0; i < customLayerTestData.length; i++){
			    	var maker = document.createElement("div");
			    	maker.appendChild(document.createTextNode(customLayerTestData[i].stnId));
			    	Object.assign(maker.style, {
			    		position: "absolute",
			    		top: "0",
			    		left: "0",
			    		width: "30px",
			    		height: "20px",
			    		background: "rgba(0, 200, 200, 0.8)"
			    	});
			    	this.context.appendChild(maker);
			    	this.getContainer().appendChild(this.context);
			    	
			    	self.markers.push(marker);
			    }

			  },
			  
			  onRender : function(){
			    this.setFullLayerBounds();
			    var size = this._map.getSize();
			    var self = this;
			    
			    for(var i=0; i < customLayerTestData.length; i++){
			    	Object.assign(self.context.style, {
			    		position: "relative",
			    		top: "0",
			    		left: "0",
			    		width: size.x + "px",
			    		height: size.y + "px"
			    	});
			    	
			    	let point = map.latLngToContainerPoint({
			    		lat: customLayerTestData[i].lat,
			    		lng: customLayerTestData[i].lon
			    	});
			    	
			    	Object.assign(self.makers[i].style, {
			    		top: point.y + "px",
			    		left: point.x + "px"
			    	});
			    	
			    }
			  },
			  
			_makeWeatherLayer : function(){
				this._makeMarker();
				this.weatherLayer = L.featureGroup(this.weatherMarkers).addTo(this.map);
				var self = this;
				
				customLayerTestData
				  
				  //divMarker
				this.onInit();
				
				  var divLayer = L.customLayer({
				    container: document.createElement("div"), // DomElement
				    padding: 0,
				    minZoom: 3,
				    maxZoom: 16,
				    opacity: 1,
				    visible: true,
				    zIndex: 120
				  });
	
				  divLayer.on("layer-beforemount", function() {
				    console.log("layer-beforemount");
				  });
	
				  divLayer.on("layer-mounted", function() {
				    console.log("layer-mounted");
				    onInit.bind(this)();
				  });
	
				  divLayer.on("layer-render", function() {
				    console.log("layer-render");
				    onRender.bind(this)();
				  });
	
				  divLayer.on("layer-beforedestroy", function() {
				    console.log("layer-beforedestroy");
				  });
	
				  divLayer.on("layer-destroyed", function() {
				    console.log("layer-destroyed");
				  });
	
				  divLayer.addTo(this.map);
				
				
				
				
				
				
				
			},
			
			//조회시간 변경 시
			refresh : function(baseDate, baseTime){
				if(this.baseDate == baseDate && this.baseTime == baseTime){
					return;
				}
				this.baseDate = baseDate;
				this.baseTime = baseTime;
				
				if(this.weatherLayer){
					this.weatherLayer.clearLayers();
				}
				
				this._makeWeatherLayer();
			},
			
	 }
	
	return BaseMap_;
})();
