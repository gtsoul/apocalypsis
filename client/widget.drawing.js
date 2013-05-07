
/* ------------------------------------------------------------------- */
/* -------------------------- UiLine --------------------------------- */
/* ------------------------------------------------------------------- */

var UiLine = function($end1, $end2, classes) {
  this.id;
  this.end1;
  this.end2;
  this.classes;
  
	this.init = function() {
    this.end1 = $end1;
    this.end2 = $end2;
    this.classes = classes;  
    this.id = 'line#'+this.end1.attr('id')+'#'+this.end2.attr('id');    
    this.draw();
		this.init = function() {};
	}; 
  
  UiLine.prototype.draw = function () {
    
  };

	this.init();	
};