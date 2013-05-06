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
  
  Map.prototype.refreshUniverse = function (galaxy, sector, system) {
    var map = this;
    this.proxy.getUniverseKnowledge(galaxy, sector, system, function () {
      console.log('data updated, '+galaxy+', '+sector+', '+system);
      map.ui.repaintSystem(map.proxy.getSystem(galaxy, sector, system), map.proxy.sSystems);
      console.log('repaint updated '+galaxy+', '+sector+', '+system);
    });
  };
  
	this.init();	
};