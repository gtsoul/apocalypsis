
console.log('Loading map ajax proxy classes');

var MapAjaxProxy = function(servicesContext) {
  this.context = servicesContext;
  this.services = {'universe-knowledge' : 'universe-knowledge.php'};
  this.systems = {};
  
	this.init = function() {
    // TODO 
		this.init = function() {};
	}; 
  
  MapAjaxProxy.prototype.getUniverseKnowledge = function (galaxy, sector, system) {
    var json = this.__ajaxGet('universe-knowledge', this.__getUniverseKnowledgeCB);
  };
  
  MapAjaxProxy.prototype.__getUniverseKnowledgeCB = function (data) {
    var proxy = this;
    $.each(data, function(key, datum) {
      if(key == 'system') {
        var system = new EntitySystem(datum);
      }
    });
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
        callback(data);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      log.warning('Error in service '+serviceName+" : "+errorThrown);
    });
  };
  
	this.init();	
};