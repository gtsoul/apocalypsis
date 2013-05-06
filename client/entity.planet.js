
var EntityPlanet = function(json, parent) {

  EntityPlanet.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'planet';
		this.init = function() {};
	}; 
  
  // TODO : complete
  EntityPlanet.prototype.getHtml = function () {
    var $planet = $('<img class="planet nozoom" style="top:200px;left:200px;" />');
    $planet.attr('id', this.pos);
    $planet.attr('src', this.image);
    return $planet;
  };    

	this.init();	
};

var EntitySun = function(json, parent) {

  // TODO : complete
  EntitySun.prototype.getHtml = function () {
    var $sun = $('<img class="sun nozoom" style="top:200px;left:200px;" />');
    $sun.attr('src', this.image);
    return $sun;
  }; 

  EntityPlanet.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'sun';
		this.init = function() {};
	}; 
  
	this.init();	
};

var EntityCoords = function(json, parent) {

  // TODO : complete
  EntityCoords.prototype.getHtml = function () {  
    var $coords = $('<div class="coords" id="2_15_7_1">');
    $coords.attr('id', this.pos);    
    var $planets = $('<div class="planets"/>');
    var $coordPoint = $('<img class="coordPoint nozoom" style="top:50px;left:50px;" />');
    $coordPoint.attr('src', this.image);
    $coords.append($coordPoint);
    $coords.append($planets);
    return $coords;
  };

  EntityCoords.prototype = new EntitySpaceElement(json, parent);
  this.planets = new Array();
  
	this.init = function() {
    if(json != undefined) {
      EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    }  
    this.type = 'coords';
    this.image = 'images/apocalypsis/coords.png';
		this.init = function() {};    
	};
  
	this.init();	
};