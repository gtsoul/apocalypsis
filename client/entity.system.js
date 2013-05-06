
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.coords = new Array();
  this.sun;
  this.type = 'system';
  
	this.init = function() {
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntitySystem.prototype.__loadJson = function (json) {
    var system = this;
    this.pos = json.pos;
    this.width = json.width;
    this.height = json.height;
    this.coords = new Array();
    this.sun = undefined;    
    if(json.subElements != undefined) {
      $.each(json.subElements.coords, function(key, datum) {    
        var coord = new EntityCoords(datum, system);   
        if(coord != undefined && coord.pos != undefined) {
          system.coords[coord.pos] = coord;
        }
      });
      if(json.subElements.sun != undefined) {
        this.sun = new EntitySun(json.subElements.sun, system);    
      }
    }
  };

	this.init();	
};