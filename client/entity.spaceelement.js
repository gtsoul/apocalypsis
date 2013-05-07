
var EntitySpaceElement = function(json, parent) {
  this.pos;
  this.image;
  this.width;
  this.height;
  this.x;
  this.y;
  this.left;
  this.top;  
  this.known;
  this.parent;
  this.type;
  
	this.init = function() {
    if(json != undefined) {
      this.__loadJson(json, parent);
    }
		this.init = function() {};
	}; 
  
  EntitySpaceElement.prototype.__loadJson = function (json, parent) {
    this.pos = json.pos;
    this.x = json.x;
    this.y = json.y;
    this.width = json.width;
    this.height = json.height;
    this.known = json.known;
    this.image = json.image;
    this.parent = parent;
    if(this.known == undefined) { // sun
      this.known = false;
    }
    if(this.image != undefined) {
      this.image = this.image.replace(/^\//, '');
    }
  };
  
  EntitySpaceElement.prototype.getHtml = function (left, top) { 
    console.warn('undefined function');
  }

	this.init();	
};