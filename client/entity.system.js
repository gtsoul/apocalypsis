
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.x;
  this.y;
  this.known;
  this.loaded = false;
  this.coords = new Array();
  this.sun;
  this.type = EntitySystem.prototype.TYPE;
  this.image = 'images/universe/system_fg'+(Math.round(Math.random()*3))+'.jpg';
  
	this.init = function() { 
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntitySystem.prototype.__loadJson = function (json) {
    var system = this;
    this.pos = json.pos;
    this.x = parseInt(json.capAbsoluteX) * EntitySystem.prototype.X_TO_PX;
    this.y = parseInt(json.capAbsoluteY) * EntitySystem.prototype.Y_TO_PX;
    this.width = parseInt(json.absoluteWidth) * EntitySystem.prototype.X_TO_PX;
    this.height = parseInt(json.absoluteHeight) * EntitySystem.prototype.Y_TO_PX; 
    this.sun = undefined;  
    if(typeof(json.known) == 'undefined' || json.known != false) {
      this.known = true;
    } else {
      this.known = false;
    }
    if(typeof(json.image) != 'undefined') {
      this.image = json.image.replace(/^\//, '');
    }
    if(json.subElements != undefined) {
      $.each(json.subElements.coords, function(key, datum) {    
        var coord = new EntityCoords(datum, system);   
        if(coord != undefined && coord.pos != undefined) {
          system.coords[coord.pos] = coord;
        }
      });
      if(json.subElements.sun != undefined) {
        this.sun = new EntitySun(json.subElements.sun, system);    
      }
    }
  };
  
  EntitySystem.prototype.getHtml = function () {
    var $systemPoint = $('<div class="systemPoint nozoom"  style="height:'+EntitySystem.prototype.WIDTH_PX+'px;width: '+EntitySystem.prototype.HEIGHT_PX+'px;"/>');
    var $systemPointImg = $('<img class="systemPointImg" style="height:'+EntitySystem.prototype.WIDTH_PX+'px;width: '+EntitySystem.prototype.HEIGHT_PX+'px;"/>');
    var $systemPointOverlay = $('<div class="overlay"/>');
    var $system = $('<div class="system"></div>');
    if(!this.known) {
      $system.addClass('unknown');
    } else if(!this.loaded) {
      $system.addClass('unloaded');
    }    
    $system.attr('id', this.pos);
    $systemPoint.css('left', Math.round(this.x + this.width/2 - EntitySystem.prototype.WIDTH_PX/2)+'px');
    $systemPoint.css('top', Math.round(this.y + this.height/2 - EntitySystem.prototype.HEIGHT_PX/2)+'px');
    $systemPointImg.attr('src', this.image);
    $systemPoint.append($systemPointImg);
    $systemPoint.append($systemPointOverlay);        
    $system.append($systemPoint);
    if(this.sun != undefined) {
      $system.append(this.sun.getHtml());
    }
    for(var coordIt in this.coords) {
      var coord = this.coords[coordIt];
      $system.append(coord.getHtml());
    }
    this.__addLoadEvent($systemPoint);
    this.__addClickEvent($systemPoint);
    return $system;
  };
  
  EntitySystem.prototype.getCoord = function(coordId) {
    var coordKey = coordId;
    if(coordKey.indexOf('_') < 0) {
      coordKey = this.pos+'_'+coordId;
    }
    if(this.coords != undefined && typeof(this.coords[coordKey]) != 'undefined') {
      return this.coords[coordKey];
    } 
    return undefined;    
  }; 
  
  EntitySystem.prototype.__addLoadEvent = function(htmlEl) {
    if(this.known == true) {
      htmlEl.mouseover(function() { 
        if(!$(this).hasClass('unknown')) { 
          var system = globalMap.getEntity($(this).parent().attr('id'));    
          if(system != undefined && system.known == true && system.loaded == false) { 
            globalMap.refreshUniverse(system.pos);  
          }
        }
      });
    }
  };

  EntitySystem.prototype.__addClickEvent = function(htmlEl) {
    var me = this;
    htmlEl.click(function() { 
      var infoBox = new InfoBoxUI(me);
      infoBox.display();
      globalMap.centerOnEntity(me.pos, EntitySystem.prototype.TYPE, me.known);
    }); 
    if(this.known == true) {

    }
  };  
  
  EntitySystem.prototype.WIDTH_PX = 110;
  EntitySystem.prototype.HEIGHT_PX = 130;
  EntitySystem.prototype.X_TO_PX = 2;
  EntitySystem.prototype.Y_TO_PX = 2;
  EntitySystem.prototype.TYPE = 'system';
  EntitySystem.prototype.ZOOM_IN = 5;
  EntitySystem.prototype.ZOOM_OUT = 2;
  
	this.init();	
};