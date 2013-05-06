
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

  EntitySun.prototype.getHtml = function (left, top) {
    var $sun = $('<img class="sun nozoom" style="top:200px;left:200px;" />');
    $sun.attr('src', this.image);
    $sun.css('left', Math.round(left)+'px');
    $sun.css('top', Math.round(top)+'px');
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
  EntityCoords.prototype.getHtml = function (left, top) {  
    var $coords = $('<div class="coords unloaded" id="2_15_7_1">');
    $coords.attr('id', this.pos);    
    var $planets = $('<div class="planets"/>');
    var $coordPoint = $('<img class="coordPoint nozoom" />');
    $coordPoint.attr('src', this.image);
    $coordPoint.css('left', Math.round(left)+'px');
    $coordPoint.css('top', Math.round(top)+'px');    
    $coords.append($coordPoint);
    $coords.append($planets);
    $coords.hover(function() {
      var coord = globalMap.getEntity($(this).attr('id'));
      if(coord != undefined && coord.planets == undefined) {
        globalMap.proxy.getPlanetsInCoord(coord.pos);      
      }
    });
    return $coords;
  };
  
  EntityCoords.prototype.getPlanet = function(planetId) {
    var planetKey = planetId;
    if(planetKey.indexOf('_') < 0) {
      planetKey = this.pos+'_'+planetId;
    }
    if(this.planets != undefined && typeof(this.planets[planetKey]) != 'undefined') {
      return this.planets[planetKey];
    } 
    return undefined;    
  };    

  EntityCoords.prototype = new EntitySpaceElement(json, parent);
  this.planets;// = new Array();
  
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