
/* ------------------------------------------------------------------- */
/* ---------------------- EntityPlanet ------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPlanet = function(json, parent) {
  
  EntityPlanet.prototype.getHtml = function () {
    var $planet = $('<img class="planet nozoom" style="width:'+EntityPlanet.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityPlanet.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    $planet.attr('id', this.pos);
    $planet.attr('src', this.image);
    $planet.css('left', Math.round(this.x + this.width/2 - 25)+'px');
    $planet.css('top', Math.round(this.y + this.height/2 - 25)+'px');
    var $name = $('<div class="name nozoom">'+this.name+'</div>')
    return $planet;
  };    
 
  EntityPlanet.prototype = new EntitySpaceElement(json, parent); 
 
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    this.type = 'planet';
		this.init = function() {};
	}; 
  
  EntityPlanet.prototype.WIDTH_PX_DEFAULT = 50;
  EntityPlanet.prototype.HEIGHT_PX_DEFAULT = 50;  
  
	this.init();	
};

/* ------------------------------------------------------------------- */
/* ------------------------ EntitySun -------------------------------- */
/* ------------------------------------------------------------------- */

var EntitySun = function(json, parent) {

  EntitySun.prototype.getHtml = function () {
    var $sun = $('<img class="sun nozoom" style="width:'+EntitySun.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntitySun.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    $sun.attr('src', this.image);
    $sun.css('left', Math.round(this.x + this.width/2 - EntitySun.prototype.WIDTH_PX_DEFAULT/2)+'px');
    $sun.css('top', Math.round(this.y + this.height/2 - EntitySun.prototype.HEIGHT_PX_DEFAULT/2)+'px');
    return $sun;
  }; 
    
  EntitySun.prototype = new EntitySpaceElement(json, parent);
  
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    this.type = 'sun';
		this.init = function() {};
	}; 
  
  EntitySun.prototype.WIDTH_PX_DEFAULT = 80;
  EntitySun.prototype.HEIGHT_PX_DEFAULT = 80;
  
	this.init();
};

/* ------------------------------------------------------------------- */
/* ------------------------- EntityPc -------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPc = function(json, parent) {

  EntityPc.prototype.getHtmlPc = function () {
    var $pc = $('<img class="coordPoint pc nozoom" style="width:'+EntityPc.prototype.WIDTH_PX+'px;height:'+EntityPc.prototype.HEIGHT_PX+'px;"/>');
    $pc.attr('src', this.image);
    $pc.css('left', Math.round(this.x + this.width/2 - EntityPc.prototype.WIDTH_PX/2)+'px');
    $pc.css('top', Math.round(this.y + this.height/2 - EntityPc.prototype.HEIGHT_PX/2)+'px');
    return $pc;
  };

  EntityPc.prototype.getHtmlExt = function () {
    var $pc = $('<img class="coordPoint extended nozoom" style="width:'+EntityCoords.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityCoords.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    $pc.attr('src', this.image);
    $pc.css('left', Math.round(this.x + this.width/2 - EntityCoords.prototype.WIDTH_PX_DEFAULT/2)+'px');
    $pc.css('top', Math.round(this.y + this.height/2 - EntityCoords.prototype.HEIGHT_PX_DEFAULT/2)+'px');

    return $pc;
  };    
  
  EntityPc.prototype = new EntitySpaceElement(json, parent);
  
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    // json is the parent Coords
    if(isNaN(this.x) || isNaN(this.y)) {
      this.x = Math.round(json.x + json.width/2);
      this.y = Math.round(json.y + json.height/2);
      this.width = EntityPc.prototype.WIDTH_DEFAULT;
      this.height = EntityPc.prototype.HEIGHT_DEFAULT;
    }
    this.type = 'pc';
    this.image = EntityPc.prototype.IMAGE_DEFAULT;
    console.log(json);
		this.init = function() {};
	};  

  
  EntityPc.prototype.WIDTH_PX = 50;
  EntityPc.prototype.HEIGHT_PX = 50;  
  EntityPc.prototype.WIDTH_DEFAULT = 4;
  EntityPc.prototype.HEIGHT_DEFAULT = 4;  
  EntityPc.prototype.IMAGE_DEFAULT = 'images/apocalypsis/pc.jpg';   
 
	this.init();	
};

/* ------------------------------------------------------------------- */
/* ----------------------- EntityCoords ------------------------------ */
/* ------------------------------------------------------------------- */

var EntityCoords = function(json, parent) {

  EntityCoords.prototype.getHtml = function () {  
    var $coords;
    if(this.known) {
      $coords = $('<div class="coords unloaded" />');
    } else {
      $coords = $('<div class="coords unknown" />');
    }
    $coords.attr('id', this.pos);    
    // coordPoint
    var $coordPointExt = this.pc.getHtmlExt();
    var $coordPointPc = this.pc.getHtmlPc();
    
    $coordPointExt.attr('src', this.image);  
    $coords.append($coordPointExt);
    $coords.append($coordPointPc);   
      
    if(this.fleets != undefined) {
      var nbFleets = 0;
      var $fleet;
      for(var fleetId in this.fleets) {
        nbFleets++;
        $fleet = this.fleets[fleetId];
      }
      if(nbFleets > 0) {
        $coords.append($fleet.getHtmlIdle(nbFleets));
      }
      $coordPointPc.attr('fleets', nbFleets); // TODO : remove      
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
        if(!$(this).hasClass('unknown')) {
          var coord = globalMap.getEntity($(this).attr('id'));
          if(coord != undefined && coord.planets == undefined && coord.fleets == undefined && coord.known == true) {
            coord.planets = new Array();
            coord.fleets = new Array();
            globalMap.refreshCoord(coord);      
          }
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

  EntityCoords.prototype.setKnown = function(bool) {
    this.known = bool;
    var el = $('#'+this.pos);
    if(bool == true) {
      el.removeClass('unknown');
    } else {
      el.addClass('unknown');
      el.removeClass('unloaded');
    }
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
    console.log(this);
		this.init = function() {};    
	};  
  
  EntityCoords.prototype.WIDTH_PX_DEFAULT = 150;
  EntityCoords.prototype.HEIGHT_PX_DEFAULT = 110;     
  
	this.init();	
};