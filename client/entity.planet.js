
/* ------------------------------------------------------------------- */
/* ---------------------- EntityPlanet ------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPlanet = function(json, parent) {

  EntityPlanet.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'planet';
		this.init = function() {};
	}; 
  
  EntityPlanet.prototype.getHtml = function (left, top) {
    if(this.left == undefined) { this.left = left};
    if(this.top == undefined) { this.top = top};
    var $planet = $('<img class="planet nozoom" />');
    $planet.attr('id', this.pos);
    $planet.attr('src', this.image);
    $planet.css('left', left+'px');
    $planet.css('top', top+'px');
    return $planet;
  };    

	this.init();	
};

/* ------------------------------------------------------------------- */
/* ------------------------ EntitySun -------------------------------- */
/* ------------------------------------------------------------------- */

var EntitySun = function(json, parent) {

  EntitySun.prototype.getHtml = function (left, top) {
    var $sun = $('<img class="sun nozoom"/>');
    $sun.attr('src', this.image);
    $sun.css('left', Math.round(left)+'px');
    $sun.css('top', Math.round(top)+'px');
    return $sun;
  }; 

  EntitySun.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'sun';
		this.init = function() {};
	}; 
  
	this.init();	
};

/* ------------------------------------------------------------------- */
/* ------------------------- EntityPc -------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPc = function(json, parent) {

  EntityPc.prototype.getHtml = function (left, top) {
    var $pc = $('<img class="coordPoint nozoom" />');
    $pc.attr('src', this.image);
    $pc.css('left', Math.round(left)+'px');
    $pc.css('top', Math.round(top)+'px');
    return $pc;
  }; 

  EntityPc.prototype = new EntitySpaceElement(json, parent);  
  
	this.init = function() {
    this.type = 'pc';
    this.image = 'images/apocalypsis/pc.jpg'
		this.init = function() {};
	}; 
  
	this.init();	
};

/* ------------------------------------------------------------------- */
/* ----------------------- EntityCoords ------------------------------ */
/* ------------------------------------------------------------------- */

var EntityCoords = function(json, parent) {

  EntityCoords.prototype.getHtml = function (left, top) {  
    if(this.left == undefined) { this.left = left};
    if(this.top == undefined) { this.top = top};
    var $coords = $('<div class="coords unloaded" id="2_15_7_1">');
    $coords.attr('id', this.pos);    
    var $planets = $('<div class="planets"/>');
    var $coordPoint = this.pc.getHtml(this.left + this.widthPx/2, this.top + this.widthPx/2);
    $coordPoint.css('left', Math.round(this.left)+'px');
    $coordPoint.css('top', Math.round(this.top)+'px'); 
    var $coordPointPc = $coordPoint.clone();    
    $coordPoint.attr('src', this.image);    
    if(this.planets != undefined) {
      for(var planetId in this.planets) {
        var planet = this.planets[planetId];
        $planets.append(planet.getHtml(this.left + (planet.x*this.widthPx/this.width), this.top + (planet.y*this.widthPx/this.width)));
      }
    }
    $coords.append($coordPoint.addClass('extended'));
    $coords.append($coordPointPc.addClass('pc'));
    $coords.append($planets);
    this.__addEvents($coords);
    // TODO : add fleets
    return $coords;
  };
  
  EntityCoords.prototype.__addEvents = function(htmlEl) {
    if(this.known == true) {
      htmlEl.mouseover(function() {
        var coord = globalMap.getEntity($(this).attr('id'));
        if(coord != undefined && coord.planets == undefined && coord.known == true) {
          coord.planets = new Array();
          globalMap.refreshCoord(coord);      
        }
      });
    }
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
  this.planets = undefined;
  this.fleets = undefined;
  this.pc;
  this.widthPx = 1;
  this.heightPx = 1; 
  
	this.init = function() {
    if(json != undefined) {
      EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
      this.widthPx = this.width * parent.widthPx / parent.width;
      this.heightPx = this.height * parent.heightPx / parent.height;      
      this.pc = new EntityPc(this, [undefined, parent]);
    }  
    this.type = 'coords';
    this.image = 'images/apocalypsis/coords.png';
		this.init = function() {};    
	};
  
	this.init();	
};