
console.log('Loading map ui classes');

var MapUi = function(mapContainer, viewport, tools) {
  this.zoom = 1;
	this.mapContainer = jQuery(mapContainer);
	this.viewport = jQuery(viewport);
	this.tools = jQuery(tools);
  this.mapRoot = this.mapContainer.children('*:first');
  this.zoomConfig = {minZoom : 0.05, maxZoom : 20, zoomFactor : 0.2, moveSmooth : 0.75};

  
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
  
  MapUi.prototype.repaintSystem = function(system) {
    if(system != undefined) {
      var $oldSystem = $('#'+system.pos+'.system');
      var left = system.x * EntitySystem.prototype.WIDTH_PX;
      var top = system.y * EntitySystem.prototype.HEIGHT_PX;
      var $newSystem = system.getHtml(left, top);
      if($oldSystem.length > 0) {
        $oldSystem.remove();
      }      
      this.mapRoot.append($newSystem);
    }  
  };
  
	MapUi.prototype.enableZoom = function(zoomSlider) {
    var m = this;
    var viewPortHeight = 600,
        viewPortWidth = 800;
    var ratio = 1;
    m.mapRoot.css({
        'height': viewPortHeight * ratio + 'px',
        'width': viewPortWidth * ratio + 'px'
    });
    var currentScale = 1, currentLocation = {x: viewPortWidth/2, y: viewPortHeight/2}, mouseLocation = {x: viewPortWidth/2, y: viewPortHeight/2};
    var zoomFactorInvertLog = 1 / Math.log(m.zoomConfig.zoomFactor);  
    var zoomMutex = false;
    
    m.viewport.on('mousewheel', function(e, delta) {
        m.zoom = Math.max(m.zoomConfig.minZoom, Math.min(m.zoomConfig.maxZoom, currentScale * (1 + delta * m.zoomConfig.zoomFactor)));
        var vOffset = m.viewport.offset();
        var cOffset = m.mapRoot.offset();
        mouseLocation.x = (e.pageX - (vOffset.left + cOffset.left)) / currentScale;
        mouseLocation.y = (e.pageY - (vOffset.top + cOffset.top)) / currentScale;        
        var sliderVal = Math.log(m.zoom) * zoomFactorInvertLog;
        if(slidInvert) sliderVal = slidMin + slidMax - sliderVal;
        zoomMutex = true;
        zoomSlider.slider('value', sliderVal);        
        zoom();
        zoomMutex = false;
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
        if(!zoomMutex) {
          var cOffset = m.mapRoot.offset();      
          mouseLocation.x = (viewPortWidth / 2 - cOffset.left) / currentScale;          
          mouseLocation.y = (viewPortHeight / 2 - cOffset.top) / currentScale;        
          zoom();           
        }      
    });
    function zoom() {
      var scale = m.zoom;
      if(scale != currentScale) {
        var imgScale = 1/m.zoom;
        if(m.zoom <= 1 && false) { // TODO : test it
          var cOffset = m.mapRoot.offset();       
          currentLocation.x = (m.mapRoot.width() / 2 - cOffset.left) / currentScale;
          currentLocation.y = (m.mapRoot.height() / 2 - cOffset.top) / currentScale;
        } else {
          currentLocation.x = (m.zoomConfig.moveSmooth * (mouseLocation.x) + (1 - m.zoomConfig.moveSmooth) * currentLocation.x);
          currentLocation.y = (m.zoomConfig.moveSmooth * (mouseLocation.y) + (1 - m.zoomConfig.moveSmooth) * currentLocation.y);
        }
        $('#target').css('left', (currentLocation.x-24)+'px');
        $('#target').css('top', (currentLocation.y-24)+'px');          
        var compat = ['-moz-', '-webkit-', '-o-', ''];
        var newCss = {};
        var newCssNozoom = {};
        for(var i = compat.length - 1; i; i--) {
            newCss[compat[i]+'transform'] = 'scale('+m.zoom+')';
            newCssNozoom[compat[i]+'transform'] = 'scale('+imgScale+')';
            newCss[compat[i]+'transform-origin'] = currentLocation.x + 'px ' + currentLocation.y + 'px'; // TODO
        }
        m.mapRoot.css(newCss);
        m.mapRoot.find('.nozoom').css(newCssNozoom);
        currentScale = m.zoom;
        
        // TODO : adjust these zoom values
        m.mapRoot.removeClass('zoomOnPlanet').removeClass('zoomOnCoords').removeClass('zoomOnSystem').removeClass('zoomOnSector');   
        if(m.zoom >= 1.1) {
          m.mapRoot.addClass('zoomOnPlanet');
        } else if(m.zoom >= 0.2) {
          m.mapRoot.addClass('zoomOnCoords');
        } else /*if(m.zoom >= 0.08)*/ {
          m.mapRoot.addClass('zoomOnSystem');
        }  
      }
    }
  };

  
  // Events
 
	MapUi.prototype.onDragStart = function() {
  
  };
  
  MapUi.prototype.onDragStop = function() {
  
  };
  
	this.init();	
};