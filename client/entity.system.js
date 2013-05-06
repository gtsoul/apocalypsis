
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.x;
  this.y;
  this.coords = new Array();
  this.sun;
  this.type = 'system';
  this.image = 'images/apocalypsis/systeme.jpg';
  
	this.init = function() {
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
          console.log(coord);
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
    $systemPoint.css('left', Math.round(left + EntitySystem.prototype.WIDTH_PX/2)+'px');
    $systemPoint.css('top', Math.round(top + EntitySystem.prototype.HEIGHT_PX/2)+'px');
    $systemPoint.attr('src', this.image);
    $system.append($systemPoint);
    if(this.sun != undefined) {
      $system.append(this.sun.getHtml(
        left + (this.sun.x*EntitySystem.prototype.WIDTH_PX/this.width), 
        top + (this.sun.y*EntitySystem.prototype.HEIGHT_PX/this.height)
      ));
    }
    for(var coordIt in this.coords) {
      var coord = this.coords[coordIt];
      $system.append(coord.getHtml(
        left + (coord.x*EntitySystem.prototype.WIDTH_PX/this.width), 
        top + (coord.y*EntitySystem.prototype.HEIGHT_PX/this.height)      
      ));
    }
    return $system;
  };
  
  EntitySystem.prototype.WIDTH_PX = 100;
  EntitySystem.prototype.HEIGHT_PX = 100;

	this.init();	
};