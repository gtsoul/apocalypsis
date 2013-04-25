
console.log('Loading map ajax proxy classes');

var MapAjaxProxy = function(servicesContext) {
  this.context = servicesContext;
  this.services = {'universe-knowledge' : 'universe-knowledge.php'};
  this.sSystems = new Array();
  
	this.init = function() {
    // TODO 
		this.init = function() {};
	}; 
  
  MapAjaxProxy.prototype.getUniverseKnowledge = function (galaxy, sector, system, callback) {
    var json = this.__ajaxGet('universe-knowledge', 
                              this.__getUniverseKnowledgeCB, 
                              {'galaxy':galaxy, 'sector':sector, 'system':system, 'callback':callback});
  };
  
  MapAjaxProxy.prototype.__getUniverseKnowledgeCB = function (data, parameters) {
    var proxy = this;
    $.each(data, function(key, datum) {
      if(key == 'system') {
        var system = new EntitySystem(datum);
        if(system != undefined && system.pos != undefined) {
        console.log(proxy.sSystems);
          proxy.sSystems[system.pos] = system;
        }
      }
    });
    
    console.log(parameters);
  };
  
  MapAjaxProxy.prototype.__ajaxGet = function(serviceName, callback, parameters) {
    if(this.services[serviceName] == undefined) {
      log.warning('Unknown service '+serviceName);
    }
    jQuery.ajax({
      dataType: "json",
      //cache: true, // TODO : test cache
      url: this.context + this.services[serviceName],
      data: parameters
    }).done(function(data, textStatus, jqXHR) {
      if(callback != undefined) {
        callback(data, parameters);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      log.warning('Error in service '+serviceName+" : "+errorThrown);
    });
  };
  
	this.init();	
};