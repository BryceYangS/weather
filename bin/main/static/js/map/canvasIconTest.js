/**
 *  leaflet canvas marker를 이용한 marker 그리는 lib
 *  (javascript Class 공부)
 */
var BaseMap = (function(){
	"use strict";	

	function BaseMap_(){
		this.map;
		this.mapId;
		
		this.data;
		
		this.layerGroup;
		this.canvasLayer;
		
		this.markers4;
		this.markers5;
		this.markers6;
	};
	
	 BaseMap_.prototype = {
			 
			 init : function(mapid){
				this.mapId = mapid; 
				this.map = this._drawBaseMap();
				this.data = [];
				this.layerGroup;
				this.canvasLayer;

				this.markers4 = [];
				this.markers5 = [];
				this.markers6 = [];

				return this.map;
			 },
			 
			 _drawBaseMap : function(){
				 	var self = this;
				 	
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
					var map = L.map(this.mapId, {
						center: [39.97607951658739, 115.8372920595234],
						zoom: 4,
						minZoom:4,
						maxZoom:6,
						layers : gm,
						attributionControl :true // attribution hide
					});
					
					
					map.on("zoomend",function(){
						self._changeMarker(map.getZoom());
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
			
			_getData : function(){
				var self = this;
				self.data = customLayerTestData;
			},
			
			//받아온 데이터 기준 Marker 만듦
			_makeMarker : function(){
				var self = this;
				this._getData();
				
				for(var i=0; i<self.data.length;i++){
//				for(var i=0; i<10;i++){
					var item = self.data[i];
					
					var icon = L.icon({
					      iconUrl: '/image/red_dot.png',
					      iconSize: [4, 4],
					      iconAnchor: [2, 2]
					    });
					
					var marker4 = L.marker([item.lat, item.lon], {icon:icon})
						.bindTooltip("<span>줌레벨: " + 4 + "℃</span>");
					var marker5 = L.marker([item.lat, item.lon], {icon:icon})
						.bindTooltip("<span>줌레벨: " + 5 + "℃</span>");
					var marker6 = L.marker([item.lat, item.lon], {icon:icon})
						.bindTooltip("<span>줌레벨: " + 6 + "℃</span>");
					self.markers4.push(marker4);
					self.markers5.push(marker5);
					self.markers6.push(marker6);
				}
			},
			
			_changeMarker : function(zoomLvl){
				var self = this;
				
				//marker, event 초기화 (이벤트는 clear하지 못하는 문제 발견)
				self.canvasLayer.clearLayers();
				self.canvasLayer._onClickListeners = [];

				switch (zoomLvl) {
				case 4:
					self.canvasLayer.addMarkers(self.markers4);
					break;
				case 5:
					self.canvasLayer.addMarkers(self.markers5);
					break;
				case 6:
					self.canvasLayer.addMarkers(self.markers6);
					break;
				}
				self.canvasLayer.addOnClickListener(function(t,e){
					alert("zoomLvl " + zoomLvl + " click!!");
					console.log("T",t,"e",e);
				});
			},
			
			makeLayer : function(){
				var self = this;
				
				self._makeMarker();
				
//				self.layerGroup = L.layerGroup().addTo(self.map);
				self.canvasLayer = L.canvasIconLayer({}).addTo(self.map);
//				self.layerGroup.addLayer(self.canvasLayer);
				self.map.fire("zoomend");
			},
	 }
	
	return BaseMap_;
})();
