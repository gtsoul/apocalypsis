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
    // Support parameters as galaxy_sector_system ou galaxy,sector,system
    if(typeof(galaxy) == 'string' && galaxy.indexOf('_') > 0 && sector == undefined &&  system == undefined) {
      var pos = galaxy.split('_');
      galaxy = undefined;
      sector = undefined;
      system = undefined;
      if(pos.length >= 3) {      
        galaxy = pos[0];
        sector = pos[1];
        system = pos[2];
      } else if(pos.length == 2) {
        galaxy = pos[0];
        sector = pos[1];
      } else if(pos.length == 1) {
        galaxy = pos[0];
      }
    }
    
    this.proxy.getUniverseKnowledge(galaxy, sector, system, function () {
      var newSystem = map.proxy.getSystem(galaxy, sector, system);
      if(newSystem != undefined) {
        console.log('data updated, '+galaxy+', '+sector+', '+system);
        newSystem.loaded = true;
        map.ui.repaintSystem(newSystem);
        console.log('repaint updated '+galaxy+', '+sector+', '+system);
        map.ui.applyZoomOnMap();
      }
    });
  };
  
  Map.prototype.getEntity = function (entityId) {
    return this.proxy.getEntity(entityId);
  }; 

  Map.prototype.centerOnEntity = function(entityPos, entityType) {
    // definir des zooms
    if(entityType != undefined) {
      if(entityType == EntitySystem.prototype.TYPE) {
        this.ui.centerOnElement($('#'+entityPos+'.system .systemPoint'), 1);
      } else if(entityType == EntityCoords.prototype.TYPE) {
        this.ui.centerOnElement($('#'+entityPos+'.coords .coordPoint'), 2);
      } else if(entityType == EntityPlanet.prototype.TYPE) {
        this.ui.centerOnElement($('#'+entityPos+'.planet'), 6);
      }
    }
  };  
  
	this.init();	
};