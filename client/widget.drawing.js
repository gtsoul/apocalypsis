
/* ------------------------------------------------------------------- */
/* -------------------------- UiLink --------------------------------- */
/* ------------------------------------------------------------------- */


/*function drawIntro() { 
    var svg = $('#svgload').svg('get');
    console.log('Svg loaded');
    console.log(svg);
    svg.circle(75, 75, 50, 
        {fill: 'none', stroke: 'red', strokeWidth: 3}); 
    var g = svg.group({stroke: 'black', strokeWidth: 2}); 
    svg.line(g, 15, 75, 135, 75); 
    svg.line(g, 75, 15, 75, 135); 
}

$('#svgload').svg({
  'onLoad': function(svg) {
    alert('plop');
  }
});*/

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

$(document).ready(function() {
 
  $(SVG('circle'))
      .attr('cx', 130)
      .attr('cy', 75)
      .attr('r', 50)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 3)
      .appendTo($('#svgRoot #lines'));
});

var UiLink = function($origin, $end, id, type, classes) {
  this.id;
  this.origin;
  this.end;
  this.classes;
  this.type;
  
	this.init = function() {
    this.origin = $origin;
    this.end = $end;
    this.type = type; // line, path ellipse
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
  
  UiLink.prototype.draw = function () {
    var $line = $('#'+this.id);
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
              .attr('stroke', 'red')
              .attr('stroke-width', 0.1)
              .attr('fill', 'none')
              .attr('stroke-dasharray', '0.1,0.5,0.2,0.4')
              .attr('stroke-linecap', 'round')
              .appendTo($('#svgRoot #lines'));
    } else if (this.type == 'path') {
      var dX = endX - originX;
      var dY = endY - originY;
      var qX = Math.floor((Math.random()*dX*3) - 1.5*dX); 
      var qY = Math.floor((Math.random()*dY*3) - 1.5*dY); 
      
      $(SVG('path'))
          .attr('d', 'M '+originX+' '+originY+' q '+qX+' '+qY+' '+dX+' '+dY)
          .attr('stroke', 'red')
          .attr('stroke-width', 0.1)
          .attr('fill', 'none')
          .attr('stroke-dasharray', '0.1,0.5,0.2,0.4')
          .attr('stroke-linecap', 'round')
          .appendTo($('#svgRoot #lines'));  
    }      
  };

	this.init();	
};