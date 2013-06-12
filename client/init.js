

var globalMap;
jQuery(document).ready(function() {
  globalMap = new Map(new MapUi('#map', '#viewport', '#tools_wrapper'),
                    new MapAjaxProxy('services/api/'));             
  globalMap.refreshUniverse(2, 17, 1);
});