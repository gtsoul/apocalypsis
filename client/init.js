
jQuery(document).ready(function() {
  var map = new Map(new MapUi('#map', '#viewport', '#tools_wrapper'),
                    new MapAjaxProxy('services/api/'));
  map.refreshUniverse(0, 0, 0);
});