
var EntityPlanet = function(json) {

  EntityPlanet.prototype = new EntitySpaceElement(json);
  
	this.init = function() {
    this.type = 'planet';
		this.init = function() {};
	}; 

	this.init();	
};

var EntitySun = function(json) {

  EntityPlanet.prototype = new EntitySpaceElement(json);
  
	this.init = function() {
    this.type = 'sun';
		this.init = function() {};
	}; 

	this.init();	
};

var EntityCoords = function(json) {

  EntityPlanet.prototype = new EntitySpaceElement(json);
  this.planets = new Array();
  
	this.init = function() {
    this.type = 'coords';
		this.init = function() {};
	}; 

	this.init();	
};