
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.planets = new Array();
  this.sun;
  
	this.init = function() {
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntitySystem.prototype.__loadJson = function (json) {
    var system = this;
    this.pos = json.pos;
    this.width = json.width;
    this.height = json.height;
    this.planets = new Array();
    this.sun = undefined;    
    if(json.subElements != undefined) {
      $.each(json.subElements.coords, function(key, datum) {    
        var planet = new EntityPlanet(datum, system);
        if(planet != undefined && planet.pos != undefined) {
          system.planets[planet.pos] = planet;
        }
      });
      if(json.subElements.sun != undefined) {
        this.sun = new EntityPlanet(json.subElements.sun, this);    
      }
    }
  };

	this.init();	
};