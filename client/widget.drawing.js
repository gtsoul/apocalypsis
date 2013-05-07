
/* ------------------------------------------------------------------- */
/* -------------------------- UiLine --------------------------------- */
/* ------------------------------------------------------------------- */

var UiLine = function($origin, $end, id, classes) {
  this.id;
  this.origin;
  this.end;
  this.classes;
  this.type ='line';
  
	this.init = function() {
    this.origin = $origin;
    this.end = $end;
    this.classes = classes;
    if(id == undefined) {
      this.id = this.origin.attr('id')+'#'+this.end.attr('id');    
    } else {
      this.id = id;
    }
    if(this.origin != undefined && this.end != undefined) {
      this.draw();
    }
		this.init = function() {};
	}; 
  
  UiLine.prototype.draw = function () {
    // TODO : improve
    var originX = parseFloat(this.origin.css('left')) + this.origin.outerWidth() / 2;
    var originY = parseFloat(this.origin.css('top')) + this.origin.outerHeight() / 2;
    var endX = parseFloat(this.end.css('left')) + this.end.outerWidth() / 2;
    var endY = parseFloat(this.end.css('top')) + this.end.outerHeight() / 2;
    var length = Math.sqrt(Math.pow(endX - originX, 2) + Math.pow(endY - originY, 2));    
    var angle = 180 / 3.1415 * Math.acos((endY - originY) / length);
    if(endX > originX) {
      angle *= -1;    
    }
    if($line.length > 0) {
      $line.remove();
    }
    $line = $('<div class="line" />');
    if(this.classes != undefined) {
      $line.addClass(this.classes);
    }
    $line.css('height', length)
      .css('left', originX+'px')
      .css('top', originY+'px')
      .css('-webkit-transform', 'rotate(' + angle + 'deg)')
      .css('-moz-transform', 'rotate(' + angle + 'deg)')
      .css('-o-transform', 'rotate(' + angle + 'deg)')
      .css('-ms-transform', 'rotate(' + angle + 'deg)')
      .css('transform', 'rotate(' + angle + 'deg)');
    $('#lines').append($line);    
    console.log($line);
  };

	this.init();	
};