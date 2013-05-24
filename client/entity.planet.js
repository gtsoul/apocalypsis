
/* ------------------------------------------------------------------- */
/* ---------------------- EntityPlanet ------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPlanet = function(json, parent) {
  
  EntityPlanet.prototype.getHtml = function (left, top) {
    if(this.left == undefined) { this.left = left};
    if(this.top == undefined) { this.top = top};
    var $planet = $('<img class="planet nozoom" style="width:50px;height:50px;"/>');
    $planet.attr('id', this.pos);
    $planet.attr('src', this.image);
    $planet.css('left', left+'px');
    $planet.css('top', top+'px');
    return $planet;
  };    
 
  EntityPlanet.prototype = new EntitySpaceElement(json, parent); 
 
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    this.type = 'planet';
		this.init = function() {};
	}; 
  
	this.init();	
};

/* ------------------------------------------------------------------- */
/* ------------------------ EntitySun -------------------------------- */
/* ------------------------------------------------------------------- */

var EntitySun = function(json, parent) {

  EntitySun.prototype.getHtml = function (left, top) {
    var $sun = $('<img class="sun nozoom" style="width:80px;height:80px;"/>');
    $sun.attr('src', this.image);
    $sun.css('left', Math.round(left)+'px');
    $sun.css('top', Math.round(top)+'px');
    return $sun;
  }; 

    
  EntitySun.prototype = new EntitySpaceElement(json, parent);
  
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
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
    var $pc = $('<img class="coordPoint nozoom" style="width:80px;height:80px;"/>');
    $pc.attr('src', this.image);
    $pc.css('left', Math.round(left)+'px');
    $pc.css('top', Math.round(top)+'px');
    return $pc;
  };   
  
  EntityPc.prototype = new EntitySpaceElement(json, parent);
  
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
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
    var $coords = $('<div class="coords unloaded" style="width:50px;height:50px;"/>');
    $coords.attr('id', this.pos);    
    // coordPoint
    var $coordPoint = this.pc.getHtml(this.left + this.widthPx/2, this.top + this.widthPx/2);
    $coordPoint.css('left', Math.round(this.left)+'px');
    $coordPoint.css('top', Math.round(this.top)+'px'); 
    var $coordPointPc = $coordPoint.clone();    
    $coordPoint.attr('src', this.image);  
    $coords.append($coordPoint.addClass('extended').css('width','150').css('height','110'));
    $coords.append($coordPointPc.addClass('pc'));    
    // planets    
    var $planets = $('<div class="planets"/>');
    if(this.planets != undefined) {
      for(var planetId in this.planets) {
        var planet = this.planets[planetId];
        var $planet = planet.getHtml(this.left + (planet.x*this.widthPx/this.width), this.top + (planet.y*this.widthPx/this.width))
        var line = new UiLink($coordPointPc, $planet, /*this.pos+'#'+planet.pos,*/ 'path', 'coord_to_planet');        
        $planets.append($planet);
      }
    }
    $coords.append($planets);
    // TODO : add fleets    
    this.__addEvents($coords);
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
      this.widthPx = this.width * parent.widthPx / parent.width * 0.5;
      this.heightPx = this.height * parent.heightPx / parent.height * 0.5;      
      this.pc = new EntityPc(this, [undefined, parent]);
    }  
    this.type = 'coords';
    this.image = 'images/apocalypsis/coords.png';
		this.init = function() {};    
	};
  
	this.init();	
};