
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.x;
  this.y;
  this.coords = new Array();
  this.sun;
  this.type = 'system';
  this.image = 'images/universe/system_fg'+(Math.round(Math.random()*3))+'.jpg';
  
	this.init = function() { 
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntitySystem.prototype.__loadJson = function (json) {
    var system = this;
    this.pos = json.pos;
    this.width = parseInt(json.absoluteWidth);
    this.height = parseInt(json.absoluteHeight);
    this.x = parseInt(json.capAbsoluteX);
    this.y = parseInt(json.capAbsoluteY);
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
    console.log(this);
  };
  
  EntitySystem.prototype.getHtml = function () {
    var $systemPoint = $('<img class="systemPoint nozoom" style="height:'+EntitySystem.prototype.WIDTH_PX+'px;width: '+EntitySystem.prototype.HEIGHT_PX+'px;"/>');
    var $system = $('<div class="system"></div>');
    $system.attr('id', this.pos);
    $systemPoint.css('left', Math.round(this.x + this.width/2 - EntitySystem.prototype.WIDTH_PX/2)+'px');
    $systemPoint.css('top', Math.round(this.y + this.height/2 - EntitySystem.prototype.HEIGHT_PX/2)+'px');
    $systemPoint.attr('src', this.image);
    $system.append($systemPoint);
    if(this.sun != undefined) {
      $system.append(this.sun.getHtml());
    }
    for(var coordIt in this.coords) {
      var coord = this.coords[coordIt];
      $system.append(coord.getHtml());    
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
  
  EntitySystem.prototype.WIDTH_PX = 110;
  EntitySystem.prototype.HEIGHT_PX = 130;

	this.init();	
};