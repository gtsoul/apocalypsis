
/* ------------------------------------------------------------------- */
/* -------------------------- UiLine --------------------------------- */
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
    var $line = $('#'+this.id);
    var originX = parseFloat(this.origin.css('left')) + this.origin.outerWidth() / 2;
    var originY = parseFloat(this.origin.css('top')) + this.origin.outerHeight() / 2;
    var endX = parseFloat(this.end.css('left')) + this.end.outerWidth() / 2;
    var endY = parseFloat(this.end.css('top')) + this.end.outerHeight() / 2;
    
    /* // <path d="M 100 310 q 150 -100 300 70" stroke="red" stroke-width="3" fill="none" stroke-dasharray="3,20" stroke-linecap="round" />
    console.log(originX+'/'+originY+' => '+endX+'/'+endY);
    $(SVG('path'))
        //.attr('d', 'M 100 310 q 150 -100 300 70')
        .attr('d', 'M '+originX+' '+originY+' q 150 -100 '+(endX-originX)+' '+(endY-originY))
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        //.attr('stroke-dasharray', '3,20')
        .attr('stroke-linecap', 'round')
        .appendTo($('#svgRoot #lines'));  */ 
        
    // <line id="xAxis" x1="0" x2="1200" y1="0" y2="0" stroke-width="2"/>
    //console.log(originX+'/'+originY+' => '+endX+'/'+endY);
    $(SVG('line'))
        //.attr('d', 'M 100 310 q 150 -100 300 70')
        .attr('x1', originX)
        .attr('x2', endX)
        .attr('y1', originY)
        .attr('y2', endY)
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        //.attr('stroke-dasharray', '3,20')
        .attr('stroke-linecap', 'round')
        .appendTo($('#svgRoot #lines'));         
  };

	this.init();	
};