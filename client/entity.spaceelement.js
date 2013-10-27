
var EntitySpaceElement = function(json, parent) {
  this.pos;
  this.image;
  this.width;
  this.height;
  this.x;
  this.y;
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
    this.x = parseInt(json.capAbsoluteX) * EntitySystem.prototype.X_TO_PX;
    this.y = parseInt(json.capAbsoluteY) * EntitySystem.prototype.Y_TO_PX;
    this.width = parseInt(json.absoluteWidth) * EntitySystem.prototype.X_TO_PX;
    this.height = parseInt(json.absoluteHeight) * EntitySystem.prototype.Y_TO_PX;
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
    console.warn('undefined function getHtml');
  };
  
  EntitySpaceElement.prototype.__clickHandler = function(htmlEl) {
    console.warn('undefined function __clickHandler');
  };    

	this.init();	
};
