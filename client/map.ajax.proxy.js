
console.log('Loading map ajax proxy classes');

var MapAjaxProxy = function(servicesContext) {
  this.context = servicesContext;
  this.services = {'universe-knowledge' : 'universe-knowledge.php'};
  
	this.init = function() {
    // TODO 
		this.init = function() {};
	}; 
  
  MapAjaxProxy.prototype.getUniverseKnowledge = function (galaxy, sector, system) {
    var json = this.__ajaxGet('universe-knowledge', this.__getUniverseKnowledgeCB);
  };
  
  MapAjaxProxy.prototype.__getUniverseKnowledgeCB = function (data) {
    console.log(data);
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