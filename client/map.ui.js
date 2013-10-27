
console.log('Loading map ui classes');

var MapUi = function(mapContainer, viewport, tools) {
  this.zoom = 1;
  this.newCss = {};
  this.newCssNozoom = {};  
	this.mapContainer = jQuery(mapContainer);
	this.viewport = jQuery(viewport);
	this.tools = jQuery(tools);
  this.mapRoot = this.mapContainer.children('*:first');
  this.zoomConfig = {minZoom : 0.5, maxZoom : 30, zoomFactor : 0.15, moveSmooth : 1, zoomOnPlanet : 4, zoomOnCoords : 3.5};

	this.init = function() {
    this.enableDrag();
    this.enableZoom(this.tools.find('.zoom'));
		this.init = function() {};
	}; 	
  
	MapUi.prototype.enableDrag = function() {
    this.mapContainer.draggable({
      cursor: "move", 
      distance: 5,
      scroll: true
      /*distance: 50,
      start: function() {

      },
      drag: function() {

      },
      stop: function(event) {
      }*/
    });
    console.log('done');
  };
  
  MapUi.prototype.centerOnElement = function($element, zoom) {
    if($element.length > 0) {
      this.applyZoomOnMap();
      this.zoomTo(zoom);    
      // TODO : corriger le centrage en cas de zoom > 1
      this.mapContainer.css('left', this.viewport.width()/2 - parseFloat($element.css('left')) - parseFloat($element.css('width'))/2 + 'px');
      this.mapContainer.css('top', this.viewport.height()/2 - parseFloat($element.css('top')) - parseFloat($element.css('height'))/2 + 'px');

    }
  };
  
  MapUi.prototype.repaintSystem = function(system) {
    if(system != undefined) {
      var $oldSystem = $('#'+system.pos+'.system');
      var left = system.x;
      var top = system.y;
      var $newSystem = system.getHtml();
      var nbStars = Math.min(system.width*system.height / 700, MapUi.prototype.NB_MAX_STARS); // TODO � diviser par le nb total de syst�me avec un max
      if(!system.known)  {
        nbStars = 0;
      }
      for(var i=0; i<nbStars; i++) {
        var star = new UiStar(Math.floor((Math.random()*3*(system.width)) + left - 1*system.width), 
                              Math.floor((Math.random()*3*(system.height)) + top - 1*system.height));                              
      }
      if($oldSystem.length > 0) {
        $oldSystem.remove();
      }      
      if(system.loaded) {
        $newSystem.removeClass('unloaded');
      }
      this.mapRoot.append($newSystem);
    }  
  };
  
  MapUi.prototype.repaintCoord = function(coord) {
    if(coord != undefined) {
      var $oldCoord = $('#'+coord.pos+'.coords');
      var left = parseFloat($oldCoord.css('left'));
      var top = parseFloat($oldCoord.css('top'));
      if($oldCoord.length > 0) {
        var $newCoord = coord.getHtml();      
        $oldCoord.html($newCoord.html());
        $oldCoord.removeClass('unloaded');
      }   
      this.applyZoomOnMap();
      coord.__addClickEvent($oldCoord);
    }  
  };  
  
  MapUi.prototype.zoomTo = function(zoomValue) {
    $('.zoom_hidden').val(zoomValue).change();
  };
  
	MapUi.prototype.enableZoom = function(zoomSlider) {
    var m = this;
    var viewPortHeight = 600; //window.innerHeight; //600,
        viewPortWidth = 800; //window.innerWidth; //800;
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
    
    $('.zoom_hidden').change(function() {
        m.zoom = Math.max(m.zoomConfig.minZoom, Math.min(m.zoomConfig.maxZoom, $(this).val()));
        var vOffset = m.viewport.offset();
        var cOffset = m.mapRoot.offset();
        var cOffset = m.mapRoot.offset();      
        mouseLocation.x = (viewPortWidth / 2 - cOffset.left) / currentScale;          
        mouseLocation.y = (viewPortHeight / 2 - cOffset.top) / currentScale;                
        var sliderVal = Math.log(m.zoom) * zoomFactorInvertLog;
        if(slidInvert) sliderVal = slidMin + slidMax - sliderVal;
        zoomMutex = true;
        zoomSlider.slider('value', sliderVal);        
        zoom();
        zoomMutex = false;
    });
    
    function zoom() {
      var scale = m.zoom;
      if(scale != currentScale) {
        var imgScale = 1/m.zoom;
        if(m.zoom <= m.zoomConfig.zoomOnCoords) {
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
        m.newCss = {};
        m.newCssNozoom = {};
        for(var i = compat.length - 1; i; i--) {
            m.newCss[compat[i]+'transform'] = 'scale('+m.zoom+')';
            m.newCssNozoom[compat[i]+'transform'] = 'scale('+imgScale+')';
            m.newCss[compat[i]+'transform-origin'] = currentLocation.x + 'px ' + currentLocation.y + 'px'; // TODO
        }
        currentScale = m.zoom;
        m.applyZoomOnMap();
      }
    }
  };

  MapUi.prototype.applyZoomOnMap = function() {
    this.mapRoot.css(this.newCss);
    this.mapRoot.find('.nozoom').css(this.newCssNozoom);

    
    // TODO : adjust these zoom values
    this.mapRoot.removeClass('zoomOnPlanet').removeClass('zoomOnCoords').removeClass('zoomOnSystem').removeClass('zoomOnSector');   
    if(this.zoom >= this.zoomConfig.zoomOnPlanet) {
      this.mapRoot.addClass('zoomOnPlanet');
    } else if(this.zoom >= this.zoomConfig.zoomOnCoords) {
      this.mapRoot.addClass('zoomOnCoords');
    } else /*if(this.zoom >= 0.08)*/ {
      this.mapRoot.addClass('zoomOnSystem');
    } 
  };
  
  // Events
 
	MapUi.prototype.onDragStart = function() {
  
  };
  
  MapUi.prototype.onDragStop = function() {
  
  };
  
  MapUi.prototype.NB_MAX_STARS = 20; // TODO partager les �toiles
  
	this.init();	
};