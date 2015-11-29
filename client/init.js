

var globalMap;
var globalCaptainId;
jQuery(document).ready(function() {
  globalCaptainId = 6186; // TODO : demander a mac qu'il le mette dans le WS
  globalMap = new Map(new MapUi('#map', '#viewport', '#tools_wrapper'),
                    new MapAjaxProxy('services/api/'));             
  //globalMap.refreshUniverse(2, 17, 1);
  //globalMap.refreshUniverse(3, 3);
  //globalMap.refreshUniverse(3, 15);
  //globalMap.refreshUniverse(2, 0);
  globalMap.refreshUniverse(7, 0);
});