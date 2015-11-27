
/* ------------------------------------------------------------------- */
/* ---------------------- EntityPlanet ------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPlanet = function(json, parent) {
  
  EntityPlanet.prototype.getHtml = function () {
    var $planet = $('<div class="planet nozoom" style="width:'+EntityPlanet.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityPlanet.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    var $planetImg = $('<img class="planetImg" style="width:'+EntityPlanet.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityPlanet.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    var friendlyClass = 'neutral';
    if(this.capId == globalCaptainId) {
      friendlyClass = 'friend';
    } else if(this.capId != undefined) {
      friendlyClass = 'ennemy';
    }
    var $planetName = $('<div class="name '+friendlyClass+'">'+this.name+'</div>');
    var $planetOverlay = $('<div class="overlay"/>');
    $planet.attr('id', this.pos);
    $planetImg.attr('src', this.image);
    $planet.css('left', Math.round(this.x + this.width/2 - 25)+'px');
    $planet.css('top', Math.round(this.y + this.height/2 - 25)+'px');
    $planet.append($planetImg);
    $planet.append($planetOverlay);
    $planet.append($planetName);   

    return $planet;
  };    
  
  EntityPlanet.prototype.__clickHandler = function() {
    var infoBox = new InfoBoxUI(this);
    infoBox.display();
    globalMap.centerOnEntity(this.pos, EntityPlanet.prototype.TYPE, true, true);
  };   
  
  EntityPlanet.prototype.getFullsizeImage = function() {
    return this.image.replace(EntityPlanet.prototype.FOLDER_ICONS_IMG, EntityPlanet.prototype.FOLDER_LARGE_IMG);
  };  
 
  EntityPlanet.prototype = new EntitySpaceElement(json, parent); 
 
	this.init = function() {
    EntitySpaceElement.prototype.__loadJson.apply(this, [json, parent]);
    this.type = EntityPlanet.prototype.TYPE;
    this.name = json.name;
    this.image = this.image.replace(new RegExp("^.*/([^/]+)\.(?:jpg|png)$"), EntityPlanet.prototype.FOLDER_ICONS_IMG+"\/$1.png");
    this.known = undefined;
    if(json.owner != undefined && json.owner.cap_id != undefined) {
      this.capId = json.owner.cap_id;
      this.capName = json.owner.cap_name;
    }
		this.init = function() {};
	}; 
  
  EntityPlanet.prototype.WIDTH_PX_DEFAULT = 50;
  EntityPlanet.prototype.HEIGHT_PX_DEFAULT = 50;  
  EntityPlanet.prototype.FOLDER_ICONS_IMG = 'images\/universe\/planets_small';  
  EntityPlanet.prototype.FOLDER_LARGE_IMG = 'images\/universe\/planets_large';
  EntityPlanet.prototype.ZOOM_OUT = 4;  
  EntityPlanet.prototype.TYPE = 'planet';
  
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
    this.image = this.image.replace(new RegExp("^.*/([^/]+)\.(?:jpg|png)$"), EntitySun.prototype.FOLDER_IMG+"\/$1.jpg");
    this.type = 'sun';
		this.init = function() {};
	}; 

  EntitySun.prototype.FOLDER_IMG = 'images\/universe\/suns'; 
  EntitySun.prototype.WIDTH_PX_DEFAULT = 510;
  EntitySun.prototype.HEIGHT_PX_DEFAULT = 510;
  
	this.init();
};

/* ------------------------------------------------------------------- */
/* ------------------------- EntityPc -------------------------------- */
/* ------------------------------------------------------------------- */

var EntityPc = function(json, parent) {

  EntityPc.prototype.getHtmlPc = function () {
    var $pc = $('<div class="coordPoint pc nozoom" style="width:'+EntityPc.prototype.WIDTH_PX+'px;height:'+EntityPc.prototype.HEIGHT_PX+'px;"/>');
    var $pcImg = $('<img class="coordPointImg" style="width:'+EntityPc.prototype.WIDTH_PX+'px;height:'+EntityPc.prototype.HEIGHT_PX+'px;"/>');
    var $pcOverlay = $('<div class="overlay"/>');
    $pcImg.attr('src', this.image);
    $pc.css('left', Math.round(this.x + this.width/2 - EntityPc.prototype.WIDTH_PX/2)+'px');
    $pc.css('top', Math.round(this.y + this.height/2 - EntityPc.prototype.HEIGHT_PX/2)+'px');
    $pc.append($pcImg);
    $pc.append($pcOverlay);
    return $pc;
  };

  EntityPc.prototype.getHtmlExt = function () {
    var $pc = $('<div class="coordPoint extended nozoom" style="width:'+EntityCoords.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityCoords.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    var $pcImg = $('<img class="coordPointImg" style="width:'+EntityCoords.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityCoords.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    var $canvas = $('<canvas class="pcMeter" width="'+(EntityCoords.prototype.WIDTH_PX_DEFAULT)+'" height="'+(EntityCoords.prototype.HEIGHT_PX_DEFAULT)+'" style="position:absolute;left:0px;top:0px;"/>');  // TODO : à mettre en css
    var $pcOverlay = $('<div class="overlay"/>');
    $pcImg.attr('src', this.image);
    $pc.css('left', Math.round(this.x + this.width/2 - EntityCoords.prototype.WIDTH_PX_DEFAULT/2)+'px');
    $pc.css('top', Math.round(this.y + this.height/2 - EntityCoords.prototype.HEIGHT_PX_DEFAULT/2)+'px');
    $pc.append($pcImg);    
    $pc.append($canvas);  
    $pc.append($pcOverlay);  
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
		this.init = function() {};
	};  

  
  EntityPc.prototype.WIDTH_PX = 50;
  EntityPc.prototype.HEIGHT_PX = 50;  
  EntityPc.prototype.WIDTH_DEFAULT = 4;
  EntityPc.prototype.HEIGHT_DEFAULT = 4;  
  EntityPc.prototype.IMAGE_DEFAULT = 'images/universe/coords/jumper'+Math.floor(Math.random()*4)+'.png';   
 
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
    
    $coordPointExt.find('.coordPointImg').attr('src', this.image);  
    $coords.append($coordPointExt);
    $coords.append($coordPointPc);   
      
    var nbEnnemyFleets = 0;
    var nbFriendFleets = 0;      
    if(this.fleets != undefined) {

      var $fleet;
      for(var fleetId in this.fleets) {
        if(this.fleets[fleetId].captainId == globalCaptainId) {
          nbFriendFleets++;
        } else {
          nbEnnemyFleets++;
        }
        $fleet = this.fleets[fleetId];
      }
      if((nbEnnemyFleets+ nbFriendFleets) > 0) {
        $coords.append($fleet.getHtmlIdle(nbEnnemyFleets, nbFriendFleets));
        $coordPointExt.append($fleet.getHtmlPcExt(nbEnnemyFleets, nbFriendFleets));
      }  
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
    this.__addLoadEvent($coords);
    return $coords;
  };
  
  EntityCoords.prototype.drawCanvas = function () {
    var $canvas = $('#'+this.pos+' .coordPoint canvas.pcMeter');
    if($canvas.length > 0) {
			function addMeter($el, position, colors) { // TODO : put it in drawing
			  var canvas = $el[0];
			  var context = canvas.getContext('2d');
			  var x = canvas.width / 2;
			  var y = canvas.height / 2;
			  var radius = 50;
			  var startAngle;
			  var endAngle;
			  var counterClockwise;
			  if(position == 'left') {
				startAngle = 1.3 * Math.PI;
				endAngle = 0.7 * Math.PI;
				counterClockwise = true;
			  } else if(position == 'right') {
				startAngle = 1.7 * Math.PI;
				endAngle = 0.3 * Math.PI;
				counterClockwise = false;
			  }

			  context.globalAlpha = 0.8;
			  context.beginPath();
			  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
			  context.lineWidth = 5;
			  context.lineCap = 'round';

			  // line color
			  if(colors == undefined) {
          context.strokeStyle = 'black';
			  } else if(typeof(colors) == 'string') {
          console.log(colors);
          context.strokeStyle = colors;
        } else {
				  var grad = context.createLinearGradient(0, 0, 0, canvas.height);
          var totalGrad = 0;
          var percentage = 0;
          var transition = 0.05;
          var prevColor;
          for (var color in colors){
            totalGrad += colors[color];
          }    
          for (var color in colors){
            if(colors[color] > 0 && totalGrad > 0) {
              if(prevColor == undefined) {
                grad.addColorStop(0, color);
              } else {
                grad.addColorStop(Math.max(0, percentage - transition), prevColor);
                grad.addColorStop(Math.min(1, percentage + transition), color);
              }
              percentage += (colors[color]/totalGrad);
              prevColor = color;
            }
          }          
          context.strokeStyle = grad;	          
			  }  
        context.stroke();
			}			

      if(this.fleets != undefined && this.fleets.length > 0) {
        var fleetColors = {"#FF3838":4, "#5593BD":5}; //{};
        /*for(var fleetId in this.fleets) {           
          var color = '5593BD';
          console.log(this.fleets[fleetId].captainId);
          if(this.fleets[fleetId].captainId != globalCaptainId) {
            color = this.fleets[fleetId].captainId;
          }
          fleetColors['#'+color] = 1;
        }*/
        console.log(fleetColors);
        addMeter($canvas, 'right', fleetColors); //{"#FF3838":this.nbEnnemyFleets, "#5593BD":this.nbFriendFleets});
      } 
      addMeter($canvas, 'left', {"#FF3838":Math.floor((Math.random()*3)), "#FFA500":Math.floor((Math.random()*3)), "#5593BD":Math.floor((Math.random()*3))}); // TODO : planetes
    }
    return $canvas;
  };    
  
  EntityCoords.prototype.__addLoadEvent = function(htmlEl) {
    if(this.known == true) {
      // PERFORMANCE : put this on htmlEl.mouseover(function() {
      //htmlEl.mouseover(function() {
        if(!$(this).hasClass('unknown')) {
          //var coord = globalMap.getEntity($(this).attr('id'));
          var coord = globalMap.getEntity(this.pos);
          if(coord != undefined && coord.planets == undefined && coord.fleets == undefined && coord.known == true) {
            coord.planets = new Array();
            coord.fleets = new Array();
            globalMap.refreshCoord(coord);      
          }
        }
      //});
    }
  };  

  EntityCoords.prototype.__addClickEvent = function(htmlEl) {
    htmlEl.find('.coordPoint.pc').click(function() {
      var pc = globalMap.getEntity($(this).parent().attr('id'));
      if(pc != undefined) {
        pc.__clickHandler(true);
      }
    }); 
    htmlEl.find('.coordPoint.extended').click(function() {
      var pc = globalMap.getEntity($(this).parent().attr('id'));
      if(pc != undefined) {
        pc.__clickHandler(false);
      }
    });     
    htmlEl.find('.planets .planet').click(function() {
      var planet = globalMap.getEntity($(this).attr('id'));
      if(planet != undefined) {
        planet.__clickHandler();
      }
    });
  };    
  
  EntityCoords.prototype.__clickHandler = function(zoomIn) {
    var infoBox = new InfoBoxUI(this);
    infoBox.display();
    globalMap.centerOnEntity(this.pos, EntityCoords.prototype.TYPE, (this.known && zoomIn), true);
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

  EntityCoords.prototype.getFullsizeImage = function() {
    return 'images/universe/coords/jumper_big.png';
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
    this.type = EntityCoords.prototype.TYPE;
    this.image = 'images/universe/coords/coords.png';
		this.init = function() {};    
	};  
  
  EntityCoords.prototype.WIDTH_PX_DEFAULT = 150;
  EntityCoords.prototype.HEIGHT_PX_DEFAULT = 110;  
  EntityCoords.prototype.ZOOM_IN = 1.7;  
  EntityCoords.prototype.ZOOM_OUT = 1.7; //0.88;  
  EntityCoords.prototype.TYPE = 'coords';
  
	this.init();	
};