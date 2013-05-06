
var EntityPlanet = function(json, parent) {

  EntityPlanet.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'planet';
		this.init = function() {};
	}; 

	this.init();	
};

var EntitySun = function(json, parent) {

  EntityPlanet.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'sun';
		this.init = function() {};
	}; 

	this.init();	
};

var EntityCoords = function(json, parent) {

  EntityPlanet.prototype = new EntitySpaceElement(json, parent);
  this.planets = new Array();
  
	this.init = function() {
    if(json != undefined) {
      EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    }  
    this.type = 'coords';
		this.init = function() {};
    this.image = 'coordonnee_small.jpg';
	}; 

	this.init();	
};