
var EntityFleet = function(json, parent) {
  this.pos;
  this.captainId;
  this.captainName;
  this.spaceElement;
  this.strength;
  this.image;
  this.state; // idle, fly, fight
  
	this.init = function() {
    if(json != undefined) {
      this.__loadJson(json, parent);
    }
		this.init = function() {};
	}; 
  
  EntityFleet.prototype.__loadJson = function (json, parent) {
    this.captainId = json.cap_id;
    this.captainName = json.cap_name;
    this.spaceElement = parent;
    this.pos = this.spaceElement.pos+'_'+this.captainId;    
    this.strength = 100; // TODO : measure fleet strength
    //this.image = 'images/fleet/fleet'+(Math.ceil(Math.random()*9))+'.png';
    this.image = 'images/ship/ship_picto.png';
    this.state = EntityFleet.prototype.STATE_FLY;
  };
  
  EntityFleet.prototype.getHtmlIdle = function (nbFleets) { 
    nbFleetsLn = Math.min(16, Math.pow(nbFleets, 1/3));
    var $fleets = $('<div class="fleets"/>'); 
    var $fleet = $('<img class="fleet nozoom fleetStatic" style="width:'+EntityFleet.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityFleet.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    $fleet.attr('src', this.image);
    //var left = Math.round(this.spaceElement.x + this.spaceElement.width/2 - EntityFleet.prototype.WIDTH_PX_DEFAULT/2);
    //var top = Math.round(this.spaceElement.y + this.spaceElement.height/2 - EntityFleet.prototype.HEIGHT_PX_DEFAULT/2);    
    //var left = Math.round(this.spaceElement.x + this.spaceElement.width/2);// - EntityFleet.prototype.WIDTH_PX_DEFAULT/2);
    //var top = Math.round(this.spaceElement.y + this.spaceElement.height/2);// - EntityFleet.prototype.HEIGHT_PX_DEFAULT/2);
    var left = Math.round(this.spaceElement.x + this.spaceElement.width/2 - EntityFleet.prototype.WIDTH_PX_DEFAULT/2);
    var top = Math.round(this.spaceElement.y + this.spaceElement.height/2 - EntityFleet.prototype.HEIGHT_PX_DEFAULT/2);    
    var side = Math.ceil(Math.sqrt(nbFleetsLn));
    console.log(left+' / '+top+' / '+side);

    
    left -= (EntityFleet.prototype.INTERVAL_PX/2 * side);
    top -= (EntityFleet.prototype.INTERVAL_PX/2 * side);
    
    for(var ity=0; ity<side; ity++) {
      var itx = 0;
      while(itx<side) {
        var it = ity*side+itx;      
        if(it<nbFleetsLn) {
          var $fleetTmp = $fleet.clone();
          $fleetTmp.css('left', Math.round(left + EntityFleet.prototype.INTERVAL_PX*itx)+'px');
          $fleetTmp.css('top', Math.round(top + EntityFleet.prototype.INTERVAL_PX*ity)+'px'); 
          $fleets.append($fleetTmp);
        }
        itx++;
      }
    }
    return $fleets;
  }
  
  EntityFleet.prototype.WIDTH_PX_DEFAULT = 10;
  EntityFleet.prototype.HEIGHT_PX_DEFAULT = 10;  
  EntityFleet.prototype.INTERVAL_PX = 1;
  EntityFleet.prototype.STATE_IDLE = 'idle';
  EntityFleet.prototype.STATE_FLY = 'fly';
  EntityFleet.prototype.STATE_FIGHT = 'fight';

	this.init();	
};
