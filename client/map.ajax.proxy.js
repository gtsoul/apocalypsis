
console.log('Loading map ajax proxy classes');

var MapAjaxProxy = function(servicesContext) {
  this.context = servicesContext;
  this.services = {'universe-knowledge' : 'universe-knowledge.php'};
  this.sSystems = new Array();
  
	this.init = function() {
    // TODO 
		this.init = function() {};
	}; 
  
  MapAjaxProxy.prototype.getEntity = function (entityId) {
    var entityIds = entityId.split('_');
    if(entityIds.length >= 3) {
      var system = this.getSystem(entityIds[0], entityIds[1], entityIds[2]);
      if(system != undefined) {
        if(entityIds.length == 3) {
          return system;
        } else {
          var coord = system.getCoord(entityIds[3]);
          if(coord != undefined) {
            if(entityIds.length == 4) {
              return coord;
            } else {
              var planet = system.getPlanet(entityIds[4]);
              if(planet != undefined) {
                return planet;
              }
            }
          }
        }
      }
    }
    return undefined;
  };  
  
  MapAjaxProxy.prototype.getCoordKnowledge = function (coordIt, callback) {
    var json = this.__ajaxGet('universe-knowledge', 
                              this.__getCoordKnowledgeCB, 
                              {'z_pos':coordIt, 'callback':callback});
  }; 

  MapAjaxProxy.prototype.__getCoordKnowledgeCB = function (data, parameters) {
    var proxy = parameters.context;
    var coord = proxy.getEntity(parameters.z_pos);
    coord.planets = new Array();
    coord.fleets = new Array();

    if(data.coord != undefined && data.coord.subElements != undefined && data.coord.subElements.pc != undefined) {
      coord.pc = new EntityPc(data.coord.subElements.pc, coord);    
    }    
    if(data.coord != undefined && data.coord.fleets != undefined) {
      $.each(data.coord.fleets, function(key, datum) {
        // TODO : save the fleets
        //console.log(datum);
      });
    }
    if(data.coord != undefined && data.coord.subElements != undefined && data.coord.subElements.planets != undefined) {
      $.each(data.coord.subElements.planets, function(key, datum) {
        var planet = new EntityPlanet(datum);
        if(planet != undefined && planet.pos != undefined) {
          coord.planets[planet.pos] = planet;
        }
      });
    }    
    if(typeof(parameters.callback) != 'undefined') {
      parameters.callback();
    }
  };
  
  MapAjaxProxy.prototype.getUniverseKnowledge = function (galaxy, sector, system, callback) {
    var json = this.__ajaxGet('universe-knowledge', 
                              this.__getUniverseKnowledgeCB, 
                              {'z_pos':galaxy+'_'+sector+'_'+system, 'callback':callback});
  };
  
  MapAjaxProxy.prototype.__getUniverseKnowledgeCB = function (data, parameters) {
    var proxy = parameters.context;
    $.each(data, function(key, datum) {
      if(key == 'system') {
        var system = new EntitySystem(datum);
        if(system != undefined && system.pos != undefined) {
          proxy.sSystems[system.pos] = system;
        }
      }
    });   
    if(typeof(parameters.callback) != 'undefined') {
      parameters.callback();
    }
  };
  
  MapAjaxProxy.prototype.__ajaxGet = function(serviceName, callback, parameters) {
    var proxy = this;
    if(this.services[serviceName] == undefined) {
      console.warn('Unknown service '+serviceName);
    }
    jQuery.ajax({
      dataType: "json",
      //cache: true, // TODO : test cache
      url: this.context + this.services[serviceName],
      data: parameters
    }).done(function(data, textStatus, jqXHR) {
      if(callback != undefined) {
        parameters.context = proxy;
        callback(data, parameters);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.warn('Error in service '+serviceName+" : "+errorThrown);
    });
  };
  
  
  MapAjaxProxy.prototype.getSystem = function(galaxy, sector, system) {
    var systemKey = galaxy+'_'+sector+'_'+system;
    if(this.sSystems != undefined && typeof(this.sSystems[systemKey]) != 'undefined') {
      return this.sSystems[systemKey];
    } 
    return undefined;    
  };  
  
	this.init();	
};