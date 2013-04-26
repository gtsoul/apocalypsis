
var EntitySpaceElement = function(json) {
  this.pos;
  this.image;
  this.x;
  this.y;
  this.known;
  this.parent;
  this.type;
  
	this.init = function() {
    if(json != undefined) {
      this.__loadJson(json);
    }
		this.init = function() {};
	}; 
  
  EntitySpaceElement.prototype.__loadJson = function (json, parent) {
    this.pos = json.pos;
    this.x = json.x;
    this.y = json.y;
    this.known = json.known;
    this.image = json.image;
    this.parent = parent;
    if(this.known == undefined) { // sun
      this.known = false;
    }
    if(this.image == undefined) {
      this.image = 'desertique_fg2.jpg'; // TODO
    }
  };

	this.init();	
};