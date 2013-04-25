
var EntityPlanet = function(json) {
  this.pos;
  //this.width;
  //this.height;
  this.image;
  this.x;
  this.y;
  this.known;
  this.disabled;
  this.parent;
  
	this.init = function() {
    this.__loadJson(json);
		this.init = function() {};
	}; 
  
  EntityPlanet.prototype.__loadJson = function (json, parent) {
    this.pos = json.pos;
    this.x = json.x;
    this.y = json.y;
    this.known = json.known;
    this.image = json.image;
    this.parent = parent;
    if(this.known == undefined) { // sun
      this.known = false;
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    if(this.image == undefined) {
      this.image = 'desertique_fg2.jpg'; // TODO
    }
  };

	this.init();	
};