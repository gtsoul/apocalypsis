
jQuery(document).ready(function() {
  var map = new Map(new MapUi('#map', '#viewport', '#tools_wrapper'),
                    new MapAjaxProxy('services/api/'));             
  map.refreshUniverse(2, 15, 7);
});