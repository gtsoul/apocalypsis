if (typeof console == "undefined") {
  console = {
    log     : function(){},
    info    : function(){},
    warn    : function(){},
    error   : function(){}
  };
};

console.log('Loading map classes');

var Map = function(mapUi, mapAjaxProxy) {
	this.conf;
  this.ui = mapUi;
  this.proxy = mapAjaxProxy;
  
	this.init = function() {
    // TODO 
		this.init = function() {};
	}; 
  
  Map.prototype.refreshCoord = function (coord) {
    var map = this;
    this.proxy.getCoordKnowledge(coord.pos, function () {
      console.log('coord updated, '+coord.pos);
      map.ui.repaintCoord(coord);
      console.log('repaint updated '+coord.pos);
    });
  };  
  
  Map.prototype.refreshUniverse = function (galaxy, sector, system) {
    var map = this;
    this.proxy.getUniverseKnowledge(galaxy, sector, system, function () {
      var newSystem = map.proxy.getSystem(galaxy, sector, system);
      if(newSystem != undefined) {
        console.log('data updated, '+galaxy+', '+sector+', '+system);
        map.ui.repaintSystem(newSystem);
        console.log('repaint updated '+galaxy+', '+sector+', '+system);
        map.ui.centerOn($('#'+newSystem.pos+'.system .systemPoint'));
        map.ui.applyZoomOnMap();
      }
    });
  };
  
  Map.prototype.getEntity = function (entityId) {
    return this.proxy.getEntity(entityId);
  };  
  
	this.init();	
};