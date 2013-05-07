
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.widthPx;
  this.heightPx;  
  this.x;
  this.y;
  this.coords = new Array();
  this.sun;
  this.type = 'system';
  this.image = 'images/apocalypsis/systeme.jpg';
  
	this.init = function() {
    this.widthPx = EntitySystem.prototype.WIDTH_PX;
    this.heightPx = EntitySystem.prototype.HEIGHT_PX;   
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntitySystem.prototype.__loadJson = function (json) {
    var system = this;
    this.pos = json.pos;
    this.width = json.width;
    this.height = json.height;
    this.x = json.x;
    this.y = json.y;
    this.coords = new Array();
    this.sun = undefined;    
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
  
  EntitySystem.prototype.getHtml = function (left, top) {
    var $systemPoint = $('<img class="systemPoint nozoom" src="images/apocalypsis/systeme.jpg"/>');
    var $system = $('<div class="system"></div>');
    $system.attr('id', this.pos);
    $systemPoint.css('left', Math.round(left + this.widthPx/2)+'px');
    $systemPoint.css('top', Math.round(top + this.heightPx/2)+'px');
    $systemPoint.attr('src', this.image);
    $system.append($systemPoint);
    if(this.sun != undefined) {
      $system.append(this.sun.getHtml(
        left + (this.sun.x*this.widthPx/this.width), 
        top + (this.sun.y*this.heightPx/this.height)
      ));
    }
    for(var coordIt in this.coords) {
      var coord = this.coords[coordIt];
      $system.append(coord.getHtml(
        left + (coord.x*this.widthPx/this.width), 
        top + (coord.y*this.heightPx/this.height)      
      ));
    }
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
  
  EntitySystem.prototype.WIDTH_PX = 100;
  EntitySystem.prototype.HEIGHT_PX = 100;

	this.init();	
};