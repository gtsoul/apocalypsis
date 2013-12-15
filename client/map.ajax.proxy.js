
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
      // TODO : ajax load if unloaded
      if(system != undefined) {
        if(entityIds.length == 3) {
          return system;
        } else {
          var coord = system.getCoord(entityIds[3]);
          // TODO : ajax load if unloaded
          if(coord != undefined) {
            if(entityIds.length == 4) {
              return coord;
            } else {
              var planet = coord.getPlanet(entityIds[4]);
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
  
  MapAjaxProxy.prototype.getParentEntity = function (entityId) {
    var entityIds = entityId.split('_');
    if(entityIds.length > 3) {
      entityIds.pop();
      var parentEntityId = entityIds.join('_');
      return this.getEntity(parentEntityId);
    }
    return undefined;
  };
  
  MapAjaxProxy.prototype.getPrevNextEntityId = function (curEntityId, prevOrNext) {
    var entityIds = curEntityId.split('_');
    var entityList = [];
    if(entityIds.length > 3) {
      var parentEntity = this.getParentEntity(curEntityId);
      if (parentEntity == undefined) {
        console.error('Parent is undefined');
      } else if(parentEntity.type == EntitySystem.prototype.TYPE) {
        entityList = parentEntity.coords;
      } else if(parentEntity.type == EntityCoords.prototype.TYPE) {
        entityList = parentEntity.planets;
      } else {
        console.error('Unknown parent type '+parentEntity.type);
      }
    } else {
      entityList = this.sSystems;
    }
    var tmpEntity;
    for(var entityId in entityList) {
      if(prevOrNext == 'prev') {
        if(entityId == curEntityId) {
          if(tmpEntity == undefined) {
            // get the last one
            for(var entityId in entityList) {
              tmpEntity = entityId;
            }
          }
          return tmpEntity;           
        } else {
          tmpEntity = entityId;
        }
      } else if(prevOrNext == 'next') {
        if(tmpEntity != undefined) {
          return entityId;
        } else if(entityId == curEntityId) {
          tmpEntity = entityId;
        }
      }
    }
    if(prevOrNext == 'next') {
      // get the first one
      for(var entityId in entityList) {
        return entityId;
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
    var myCoord = proxy.getEntity(parameters.z_pos);
    myCoord.planets = new Array();
    myCoord.fleets = new Array();  

    if(data.error != undefined) {
      console.warn(data.error);
      myCoord.setKnown(false);
    }
	
    if(data.coord != undefined && data.coord.subElements != undefined && data.coord.subElements.pc != undefined) {
      myCoord.pc = new EntityPc(data.coord.subElements.pc, myCoord);    
    }    
    if(data.coord != undefined && data.coord.fleets != undefined) {
      $.each(data.coord.fleets, function(key, datum) {
        var fleet = new EntityFleet(datum, myCoord.pc);
        if(fleet != undefined && fleet.pos != undefined) {
          myCoord.fleets[fleet.pos] = fleet;
        }        
      });
    }

    if(data.coord != undefined && data.coord.subElements != undefined && data.coord.subElements.planets != undefined) {
      $.each(data.coord.subElements.planets, function(key, datum) {
        var planet = new EntityPlanet(datum);
        if(planet != undefined && planet.pos != undefined) {
          myCoord.planets[planet.pos] = planet;        }
      });
    }    

    if(typeof(parameters.callback) != 'undefined' && typeof(data.error) == 'undefined') {
      parameters.callback();
    }
  };
  
  MapAjaxProxy.prototype.getUniverseKnowledge = function (galaxy, sector, system, callback) {
    if(galaxy != undefined && sector != undefined && system != undefined) {
      var json = this.__ajaxGet('universe-knowledge', 
                                this.__getSystemKnowledgeCB, 
                                {'z_pos':galaxy+'_'+sector+'_'+system, 'callback':callback});
    } else if(galaxy != undefined && sector != undefined) {
      var json = this.__ajaxGet('universe-knowledge', 
                                this.__getSectorKnowledgeCB, 
                                {'z_pos':galaxy+'_'+sector, 'callback':callback});
    } else if(galaxy != undefined) {
      var json = this.__ajaxGet('universe-knowledge', 
                                this.__getGalaxyKnowledgeCB, // TODO
                                {'z_pos':galaxy, 'callback':callback});
    } else {
      var json = this.__ajaxGet('universe-knowledge', 
                                this.__getUniverseKnowledgeCB, // TODO
                                {'z_pos': 'universe', 'callback':callback});
    }
  };  

  MapAjaxProxy.prototype.__getUniverseKnowledgeCB = function (data, parameters) {
    console.warn('__getUniverseKnowledgeCB not implemented');
  };  
  
  MapAjaxProxy.prototype.__getGalaxyKnowledgeCB = function (data, parameters) {
    console.warn('__getGalaxyKnowledgeCB not implemented');
  };  
  
  MapAjaxProxy.prototype.__getSectorKnowledgeCB = function (data, parameters) {
    var proxy = parameters.context;
    
    var sectorWidth = 2000;
    var sectorHeight = 2000;
   
    if(data != undefined && data.sector != undefined && data.sector.subElements != undefined && data.sector.subElements.systems != undefined) {
      $.each(data.sector.subElements.systems, function(key, datum) {
        if(datum.pos != undefined) {
          var systemBlank = new EntitySystem(datum);
          if(systemBlank != undefined && systemBlank.pos != undefined) {
            systemBlank.loaded = false;
            proxy.sSystems[systemBlank.pos] = systemBlank;
            globalMap.ui.repaintSystem(systemBlank);
          }
        }

      });
      
      if(data.cap != undefined && data.cap.absoluteGrid != undefined && data.cap.absoluteGrid.width != undefined && data.cap.absoluteGrid.height != undefined) {
        sectorWidth = (data.cap.absoluteGrid.width*EntitySystem.prototype.X_TO_PX);
        sectorHeight = (data.cap.absoluteGrid.height*EntitySystem.prototype.Y_TO_PX);
        console.log("map  size :"+sectorWidth+" / "+sectorHeight);
      }
    } 
   
    if(typeof(parameters.callback) != 'undefined') {
      parameters.callback(sectorWidth, sectorHeight);
    }
  };  
 
  MapAjaxProxy.prototype.__getSystemKnowledgeCB = function (data, parameters) {
    var proxy = parameters.context;
    $.each(data, function(key, datum) {
      if(key == EntitySystem.prototype.TYPE) {
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