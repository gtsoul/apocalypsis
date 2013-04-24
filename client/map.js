if (typeof console == "undefined") {
  console = {
    log     : function(){},
    info    : function(){},
    warn    : function(){},
    error   : function(){}
  };
};

console.log('Loading map classes');

var Map = function(mapContainer, viewport, tools) {
	this.conf;
	this.initX = 0;
	this.initY = 46;
  this.zoom = 1;
	this.mapContainer = mapContainer;
  this.mapRoot = jQuery(this.mapContainer).children('*:first');
  this.zoomConfig = {minZoom : 0.1, maxZoom : 20, zoomFactor : 0.2, moveSmooth : 0.5};

  
	this.init = function() {
    this.enableDrag();
    this.enableZoom();
		this.init = function() {};
	}; 	
  
	Map.prototype.enableDrag = function() {
    jQuery(this.mapContainer).draggable({
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
  
	Map.prototype.enableZoom = function() {
    var c = $('#viewport'),  z = $('#zoom'), m = this;
    var viewPortHeight = 480,
        viewPortWidth = 640;
    var ratio = 1;
    m.mapRoot.css({
        'height': viewPortHeight * ratio + 'px',
        'width': viewPortWidth * ratio + 'px'
    });
    var currentScale = 1, currentLocation = {x: 180, y: 135}, mouseLocation = {x: 180, y: 135};
    //var minZoom = 0.1, maxZoom = 20, zoomFactor = 0.2, moveSmooth = 0.2;
    //Increase moveSmooth for more moving intensity when zooming
    //When moveSmooth = 1, pointed point is centered at every mousewheel impulsion
    var zoomFactorInvertLog = 1 / Math.log(m.zoomConfig.zoomFactor);
    
    
    c.on('mousewheel', function(e, delta) {
        var cOffset = c.offset();
        mouseLocation.x = e.pageX - cOffset.left;
        mouseLocation.y = e.pageY - cOffset.top;
        m.zoom = Math.max(m.zoomConfig.minZoom, Math.min(m.zoomConfig.maxZoom, currentScale * (1 + delta * m.zoomConfig.zoomFactor)));
        var sliderVal = Math.log(m.zoom) * zoomFactorInvertLog;
        if(slidInvert) sliderVal = slidMin + slidMax - sliderVal;
        z.slider('value', sliderVal);
        //m.onZoomChange(currentLocation, mouseLocation);
        zoom();
    });
    var slidMin = Math.log(m.zoomConfig.minZoom) * zoomFactorInvertLog, slidMax = Math.log(m.zoomConfig.maxZoom) * zoomFactorInvertLog;
    var slidInvert = (slidMin > slidMax);
    z.slider({
        orientation: 'vertical',
        min: Math.min(slidMin, slidMax),
        max: Math.max(slidMin, slidMax),
        step: Math.abs(slidMin - slidMax) / 20,
        value: slidMin + slidMax
    }).on('slide slidechange', function (event, ui) {
        var v = slidInvert ? slidMin + slidMax - ui.value : ui.value;
        m.zoom = Math.pow(m.zoomConfig.zoomFactor, v);
        //m.onZoomChange(currentLocation, mouseLocation);
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

	Map.prototype.onZoomChange = function() {
    var scale = this.zoom;
    var imgScale = 1/scale;
    if(scale <= 1)
    {
      currentLocation.x = wr.width() / 2;
      currentLocation.y = wr.height() / 2;
    }
    else
    {
        currentLocation.x += moveSmooth * (mouseLocation.x - currentLocation.x) / currentScale;
        currentLocation.y += moveSmooth * (mouseLocation.y - currentLocation.y) / currentScale;
    }
    var compat = ['-moz-', '-webkit-', '-o-', ''];
    var newCss = {};
    var newCssImage = {};
    for(var i = compat.length - 1; i; i--)
    {
        newCss[compat[i]+'transform'] = 'scale('+scale+')';
        newCssImage[compat[i]+'transform'] = 'scale('+imgScale+')';
        newCss[compat[i]+'transform-origin'] = currentLocation.x + 'px ' + currentLocation.y + 'px';
    }
    wr.css(newCss);
    wr.find('.planets img').css(newCssImage);
    currentScale = scale;
  };    
  
	Map.prototype.onDragStart = function() {
  
  };
  
  Map.prototype.onDragStop = function() {
  
  };
  
	this.init();	
};