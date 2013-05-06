
var EntitySystem = function(json) {
  this.pos;
  this.width;
  this.height;
  this.coords = new Array();
  this.sun;
  this.type = 'system';
  this.image = 'systeme.jpg';
  
	this.init = function() {
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntitySystem.prototype.__loadJson = function (json) {
    var system = this;
    this.pos = json.pos;
    this.width = json.width;
    this.height = json.height;
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
  
  EntitySystem.prototype.getHtml = function () {
    // TODO : complete
    var $systemPoint = $('<img class="systemPoint nozoom" style="top:50px;left:50px;" src="images/apocalypsis/systeme.jpg"/>');
    var $system = $('<div class="system"></div>');
    $system.attr('id', this.pos);
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

	this.init();	
};