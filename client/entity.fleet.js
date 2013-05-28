
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
    this.image = 'images/fleet/fleet'+(Math.ceil(Math.random()*9))+'.png';
    this.state = EntityFleet.prototype.STATE_FLY;
  };
  
  EntityFleet.prototype.getHtml = function (left, top) { 
    console.warn('undefined function');
  }
  
  
  EntityFleet.prototype.STATE_IDLE = 'idle';
  EntityFleet.prototype.STATE_FLY = 'fly';
  EntityFleet.prototype.STATE_FIGHT = 'fight';

	this.init();	
};
