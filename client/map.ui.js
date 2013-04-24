
console.log('Loading map ui classes');

var MapUi = function(mapContainer, viewport, tools) {
  this.zoom = 1;
	this.mapContainer = jQuery(mapContainer);
	this.viewport = jQuery(viewport);
	this.tools = jQuery(tools);
  this.mapRoot = this.mapContainer.children('*:first');
  this.zoomConfig = {minZoom : 0.1, maxZoom : 20, zoomFactor : 0.2, moveSmooth : 0.5};

  
	this.init = function() {
    this.enableDrag();
    this.enableZoom(this.tools.find('.zoom'));
		this.init = function() {};
	}; 	
  
	MapUi.prototype.enableDrag = function() {
    this.mapContainer.draggable({
      cursor: "move", 
      /*scroll: true,
      distance: 50,
      start: function() {

      },
      drag: function() {

      },
      stop: function(event) {
      }*/
    });
    console.log('done');
  };
  
	MapUi.prototype.enableZoom = function(zoomSlider) {
    var m = this;
    var viewPortHeight = 480,
        viewPortWidth = 640;
    var ratio = 1;
    m.mapRoot.css({
        'height': viewPortHeight * ratio + 'px',
        'width': viewPortWidth * ratio + 'px'
    });
    var currentScale = 1, currentLocation = {x: 180, y: 135}, mouseLocation = {x: 180, y: 135};
    var zoomFactorInvertLog = 1 / Math.log(m.zoomConfig.zoomFactor);   
    
    m.viewport.on('mousewheel', function(e, delta) {
        var cOffset = m.viewport.offset();
        mouseLocation.x = e.pageX - cOffset.left;
        mouseLocation.y = e.pageY - cOffset.top;
        m.zoom = Math.max(m.zoomConfig.minZoom, Math.min(m.zoomConfig.maxZoom, currentScale * (1 + delta * m.zoomConfig.zoomFactor)));
        var sliderVal = Math.log(m.zoom) * zoomFactorInvertLog;
        if(slidInvert) sliderVal = slidMin + slidMax - sliderVal;
        zoomSlider.slider('value', sliderVal);
        zoom();
    });
    var slidMin = Math.log(m.zoomConfig.minZoom) * zoomFactorInvertLog, slidMax = Math.log(m.zoomConfig.maxZoom) * zoomFactorInvertLog;
    var slidInvert = (slidMin > slidMax);
    zoomSlider.slider({
        orientation: 'vertical',
        min: Math.min(slidMin, slidMax),
        max: Math.max(slidMin, slidMax),
        step: Math.abs(slidMin - slidMax) / 20,
        value: slidMin + slidMax
    }).on('slide slidechange', function (event, ui) {
        var v = slidInvert ? slidMin + slidMax - ui.value : ui.value;
        m.zoom = Math.pow(m.zoomConfig.zoomFactor, v);
        zoom();
    });
    function zoom()
    {
      var scale = m.zoom;
      var imgScale = 1/m.zoom;
      if(m.zoom <= 1)
      {
        currentLocation.x = m.mapRoot.width() / 2;
        currentLocation.y = m.mapRoot.height() / 2;
      }
      else
      {
          currentLocation.x += m.zoomConfig.moveSmooth * (mouseLocation.x - currentLocation.x) / currentScale;
          currentLocation.y += m.zoomConfig.moveSmooth * (mouseLocation.y - currentLocation.y) / currentScale;
      }
      var compat = ['-moz-', '-webkit-', '-o-', ''];
      var newCss = {};
      var newCssImage = {};
      for(var i = compat.length - 1; i; i--)
      {
          newCss[compat[i]+'transform'] = 'scale('+m.zoom+')';
          newCssImage[compat[i]+'transform'] = 'scale('+imgScale+')';
          newCss[compat[i]+'transform-origin'] = currentLocation.x + 'px ' + currentLocation.y + 'px';
      }
      m.mapRoot.css(newCss);
      m.mapRoot.find('.planets img').css(newCssImage);
      currentScale = m.zoom;
    }
  };
  
  // Events
 
	MapUi.prototype.onDragStart = function() {
  
  };
  
  MapUi.prototype.onDragStop = function() {
  
  };
  
	this.init();	
};