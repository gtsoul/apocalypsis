

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

var UiStar = function(x, y) {
  this.x;
  this.y;
  
	this.init = function() {
    this.x = x;
    this.y = y;
    this.draw();
		this.init = function() {};
	}; 
  
  UiStar.prototype.draw = function () {
  
  /*
              <circle cx="200" cy="50" r="7" stroke="black" stroke-width="2" fill="grey">
                <animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="12s" begin="3s" repeatCount="indefinite" />
                <animate attributeType="XML" attributeName="r" from="10" to="0" dur="3s" begin="0s" repeatCount="indefinite" />
              </circle>
              <circle cx="150" cy="120" r="5" stroke="black" stroke-width="2" fill="grey">
                <animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="8s" begin="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="180" cy="80" r="3" stroke="black" stroke-width="2" fill="grey">
                <animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="16s" begin="1s" repeatCount="indefinite" />
              </circle>    */
    var r = Math.random()*4;
    var opacity = $(SVG('animate', {
          'attributeType': 'CSS',
          'attributeName': 'opacity',
          'repeatCount': 'indefinite',
        }))
        .attr('from', 1)
        .attr('to', 0)
        .attr('dur', Math.floor(Math.random()*20+10)+'s')
        .attr('begin', Math.floor(Math.random()*5)+'s');
    var size = $(SVG('animate', {
          'attributeType': 'XML',
          'attributeName': 'r',
          'repeatCount': 'indefinite',
        }))
        .attr('from', r)
        .attr('to', 0)
        .attr('dur', Math.floor(Math.random()*20+10)+'s')
        .attr('begin', Math.floor(Math.random()*5)+'s');        
    var star = $(SVG('circle'))
        .attr('cx', this.x)
        .attr('cy', this.y)
        .attr('r', r)
        .attr('stroke', 'grey')
        .attr('stroke-width', r/2)
        .attr('fill', 'white');
    if(size > 2) {
      size.appendTo(star);
    }
    opacity.appendTo(star);
    star.appendTo($('#svgRoot #stars'));       
  };

	this.init();	
};

/* ------------------------------------------------------------------- */
/* -------------------------- UiLink --------------------------------- */
/* ------------------------------------------------------------------- */

var UiLink = function($origin, $end, /*id,*/ type, classes) {
  //this.id;
  this.origin;
  this.end;
  this.classes;
  this.type;
  
	this.init = function() {
    this.origin = $origin;
    this.end = $end;
    this.type = type; // line, path ellipse
    this.classes = classes;
    /*if(id == undefined) {
      this.id = this.origin.attr('id')+'#'+this.end.attr('id');    
    } else {
      this.id = id;
    }*/
    if(this.origin != undefined && this.end != undefined) {
      this.draw();
    }
		this.init = function() {};
	}; 
  
  UiLink.prototype.draw = function () {
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
              .attr('stroke-width', 0.2)
              .attr('fill', 'none')
              .attr('stroke-dasharray', '0.2,1,0.4,0.8')
              .attr('stroke-linecap', 'round')
              .appendTo($('#svgRoot #lines'));
    } else if (this.type == 'path') {
      var dX = endX - originX;
      var dY = endY - originY;
      var qX = Math.floor((Math.random()*dX*3) - 1.5*dX); 
      var qY = Math.floor((Math.random()*dY*3) - 1.5*dY); 
      
      $(SVG('path'))
          .attr('d', 'M '+originX+' '+originY+' q '+qX+' '+qY+' '+dX+' '+dY)
          .attr('stroke', '#b5f0ff')
          .attr('stroke-width', 0.2)
          .attr('fill', 'none')
          .attr('stroke-dasharray', '0.2,1,0.4,0.8')
          .attr('stroke-linecap', 'round')
          .appendTo($('#svgRoot #lines'));  
    }      
  };

	this.init();	
};