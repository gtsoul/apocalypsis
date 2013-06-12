
/* ------------------------------------------------------------------- */
/* ---------------------- EntityPlanet ------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPlanet = function(json, parent) {
  
  EntityPlanet.prototype.getHtml = function () {
    var $planet = $('<img class="planet nozoom" style="width:50px;height:50px;"/>');
    $planet.attr('id', this.pos);
    $planet.attr('src', this.image);
    $planet.css('left', this.x+'px');
    $planet.css('top', this.y+'px');
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

  EntitySun.prototype.getHtml = function () {
    console.log(this);
    var $sun = $('<img class="sun nozoom" style="width:80px;height:80px;"/>');
    $sun.attr('src', this.image);
    $sun.css('left', this.x+'px');
    $sun.css('top', this.y+'px');
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
    $pc.css('left', left+'px');
    $pc.css('top', top+'px');
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

  EntityCoords.prototype.getHtml = function () {  
    var $coords = $('<div class="coords unloaded" style="width:50px;height:50px;"/>');
    $coords.attr('id', this.pos);    
    // coordPoint
    var $coordPoint = this.pc.getHtml(this.x, this.y);
    var $coordPointPc = $coordPoint.clone();    
    $coordPoint.attr('src', this.image);  
    $coords.append($coordPoint.addClass('extended').css('width','150').css('height','110'));
    $coords.append($coordPointPc.addClass('pc'));   
    
    if(this.fleets != undefined) {
      var nbFleets = 0;
      for(var fleetId in this.fleets) {
        nbFleets++;
      }
      $coordPointPc.attr('fleets', nbFleets); // TODO : remove
      //var fleet = new UiFleet($coordPointPc, undefined, nbFleets, EntityFleet.prototype.STATE_IDLE);        
    }
 
    // planets    
    var $planets = $('<div class="planets"/>');
    if(this.planets != undefined) {
      for(var planetId in this.planets) {
        var planet = this.planets[planetId];
        var $planet = planet.getHtml();
        var line = new UiLink($coordPointPc, $planet, 'path', 'coord_to_planet');        
        $planets.append($planet);
      }
    }
    $coords.append($planets);
    this.__addEvents($coords);
    return $coords;
  };
  
  EntityCoords.prototype.__addEvents = function(htmlEl) {
    if(this.known == true) {
      htmlEl.mouseover(function() {
        var coord = globalMap.getEntity($(this).attr('id'));
        if(coord != undefined && coord.planets == undefined && coord.fleets == undefined && coord.known == true) {
          coord.planets = new Array();
          coord.fleets = new Array();
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
  
	this.init = function() {
    if(json != undefined) {
      EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]); 
      this.pc = new EntityPc(this, [undefined, parent]);
    }  
    this.type = 'coords';
    this.image = 'images/apocalypsis/coords.png';
		this.init = function() {};    
	};
  
	this.init();	
};