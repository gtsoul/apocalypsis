

// TODO
function SVG(tag, attrs) {
  var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
  if(attrs != undefined) {
    for (var k in attrs) {
      el.setAttribute(k, attrs[k]);
    }
  }
  return el;
}

/* ------------------------------------------------------------------- */
/* -------------------------- UiStar --------------------------------- */
/* ------------------------------------------------------------------- */

/*var UiStar = function(x, y) {
  this.x;
  this.y;
  
	this.init = function() {
    this.x = x;
    this.y = y;
    this.draw();
		this.init = function() {};
	}; 
  
  UiStar.prototype.draw = function () {
    var r = Math.random()*2; 
    var star = $(SVG('circle'))
        .attr('cx', this.x)
        .attr('cy', this.y)
        .attr('r', r)
        .attr('stroke', 'grey')
        .attr('stroke-width', r/2)
        .attr('fill', 'white');
    star.appendTo($('#svgRoot #stars'));       
  };

	this.init();	
};*/

/* ------------------------------------------------------------------- */
/* -------------------------- UiLink --------------------------------- */
/* ------------------------------------------------------------------- */

var UiLink = function($origin, $end, type) {
  this.origin;
  this.end;
  this.type;
  
	this.init = function() {
    this.origin = $origin;
    this.end = $end;
    this.type = type; // line, path ellipse
    if(this.origin != undefined && this.end != undefined) {
      //this.draw();
    }
		this.init = function() {};
	}; 
  
  // TODO : traduire en webgl
  /*UiLink.prototype.draw = function () {
    var originX = parseFloat(this.origin.css('left')) + this.origin.outerWidth() / 2;
    var originY = parseFloat(this.origin.css('top')) + this.origin.outerHeight() / 2;
    var endX = parseFloat(this.end.css('left')) + this.end.outerWidth() / 2;
    var endY = parseFloat(this.end.css('top')) + this.end.outerHeight() / 2;

    if(this.type == 'line') {
      $(SVG('line'))
              .attr('x1', originX)
              .attr('x2', endX)
              .attr('y1', originY)
              .attr('y2', endY)
              .attr('stroke', '#b5f0ff')
              .attr('stroke-width', 0.5)
              .attr('fill', 'none')
              .attr('stroke-dasharray', '0.5,1')
              .attr('stroke-linecap', 'round')
              .appendTo($('#svgRoot #lines'));
    } else if (this.type == 'path') {
      var dX = endX - originX;
      var dY = endY - originY;
      var qX = Math.floor((Math.random()*dX*3) - 1.5*dX); 
      var qY = Math.floor((Math.random()*dY*3) - 1.5*dY); 
      
      $(SVG('path'))
          .attr('d', 'M '+originX+' '+originY+' q '+qX+' '+qY+' '+dX+' '+dY)
          .attr('stroke', '#FFFFCC')
          .attr('stroke-width', 0.5)
          .attr('fill', 'none')
          .attr('stroke-dasharray', '0.5,1')
          .attr('stroke-linecap', 'round')
          .appendTo($('#svgRoot #lines'));  
    }      
  };*/

	this.init();	
};


/* ------------------------------------------------------------------- */
/* -------------------------- UiFleet --------------------------------- */
/* ------------------------------------------------------------------- */

/*var UiFleet = function($origin, $end, nb, state) {
  this.origin;
  this.end;
  this.state;
  
	this.init = function() {
    this.origin = $origin;
    this.end = $end;
    this.nb = nb;
    this.state = state; // idle, fly, fight
    if(this.origin != undefined && this.state != undefined) {
      //this.draw();
    }
		this.init = function() {};
	}; */
  
  // TODO : traduire en webgl
  /*UiFleet.prototype.draw = function () {
    var originX = parseFloat(this.origin.css('left')) + this.origin.outerWidth() / 2;
    var originY = parseFloat(this.origin.css('top')) + this.origin.outerHeight() / 2;

    if(this.state == EntityFleet.prototype.STATE_IDLE) {
    var star = $(SVG('circle'))
        .attr('cx', originX)
        .attr('cy', originY)
        .attr('r', 10)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 3)
        .attr('fill', 'red')
        //.attr('class', 'nozoom')
        .appendTo($('#svgRoot #fleets'));  
    }
  };*/

	/*this.init();	
};*/