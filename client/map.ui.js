
console.log('Loading map ui classes');

var lastUpdateReperesTime = 0;
var lastUpdateReperesTimeout;
var lastUpdateReperesDelay = 500;

var MapUi = function(mapContainer, viewport, tools) {
  this.zoom = 1;
  this.newCss = {};
  this.newCssNozoom = {};  
	this.mapContainer = jQuery(mapContainer);
	this.viewport = jQuery(viewport);
	this.tools = jQuery(tools);
  this.mapRoot = this.mapContainer.children('*:first');
  this.zoomConfig = {minZoom : 0.5, maxZoom : 5, zoomFactor : 0.15, zoomOnCoords : 0.5, zoomOnPlanet : 1.1};
  this.fluxLayer;

	this.init = function() {
    //this.enableSlider(this.tools.find('.zoom'));
		this.init = function() {};
	}; 	
  
	MapUi.prototype.enableScroller = function(sectorWidth, sectorHeight) {  
    // TODO : passer les variables/fonctions en global
		contentWidth = sectorWidth;
		contentHeight = sectorHeight;
    // TODO : enlever a terme
    //$('#svgRoot').attr({width:sectorWidth, height:sectorHeight});
    
		// Initialize layout
		//var container = viewport[0];
		//var content = mapContainer[0];
    var ui = this;
    
    this.mapContainer.bind('zooming', function(event) {
      if(typeof(event.detail) == 'undefined') {
        event = event.originalEvent;
      }
      ui.__afterZoom(event.detail.zoom);
      ui.__updateReperes();
    });
    this.mapContainer.bind('scrolling', function(event) {
      /*if(typeof(event.detail) == 'undefined') {
        event = event.originalEvent;
      }*/
      ui.__updateReperes();
    });    
    
    reflow();
    
    var ratioX = this.viewport.width()/sectorWidth;
    var ratioY = this.viewport.height()/sectorHeight;
    var zoomInit = Math.max(0.1, Math.min(ratioX, ratioY)*1.5);    
    getScroller().options.minZoom = Math.min(this.zoomConfig.maxZoom, zoomInit);
    getScroller().options.maxZoom = this.zoomConfig.maxZoom;    
    this.__zoomTo(zoomInit);  
    if(zoomInit < EntitySystem.prototype.ZOOM_OUT*0.5) {
      $('.reperes:first').click();
      getScroller().zoomBy(zoomInit, true, sectorWidth/2, sectorHeight/2);
    }    
    this.__initThree(sectorWidth, sectorHeight);
    console.log('map ui initialized');
    return zoomInit;
  };
  

	MapUi.prototype.__initThree = function(sectorWidth, sectorHeight) {  
    this.fluxLayer = new FluxLayer(sectorWidth, sectorHeight, $('#containerThree'));
  };  
  
  MapUi.prototype.__scrollTo = function(left, top) {
    zoom = getScroller().getValues().zoom;
    if(left != undefined && top != undefined) {
      getScroller().scrollTo(zoom*left, zoom*top, true);
      // PERFORMANCE : set animate to false    
    }
  };
  
  MapUi.prototype.__zoomTo = function(zoom) {
    if(zoom != undefined) {
      getScroller().zoomTo(zoom);
    }
  };  
  
  MapUi.prototype.__afterZoom = function(zoom) {
    this.zoom = zoom;
    var compat = ['-moz-', '-webkit-', '-o-', ''];
    this.newCssNozoom = {};
    for(var i = compat.length - 1; i; i--) {
      this.newCssNozoom[compat[i]+'transform'] = 'scale('+(1/zoom)+')';
    }  
    this.applyZoomOnMap();
  }; 

  MapUi.prototype.__updateReperes = function() {
    var now = (new Date().getTime()); 
    if(now - lastUpdateReperesTime >= lastUpdateReperesDelay) {
      lastUpdateReperesTime = now;
      clearTimeout(lastUpdateReperesTimeout);
      // TODO : mettre les reperes Hors carte
      var vwidth = this.viewport.width();
      var vheight = this.viewport.height();
      var xmin = getScroller().getValues().left / this.zoom;
      var ymin = getScroller().getValues().top / this.zoom;
      var xmax = xmin + (vwidth / this.zoom);
      var ymax = ymin + (vheight / this.zoom);
      var dx = (EntitySystem.prototype.WIDTH_PX/2);// * this.zoom;
      var dy = (EntitySystem.prototype.HEIGHT_PX/2);// * this.zoom;  
      var vox = this.viewport.offset().left;
      var voy = this.viewport.offset().top;
      $('.reperes').remove();
      var $systems = this.mapContainer.find('.system:not(.unknown) .systemPoint').each(function(it) {
        var x = parseFloat($(this).css('left')) + dx;
        var y = parseFloat($(this).css('top')) + dy;
        var spos = $(this).parent().attr('id');
        if(xmin <= x && x <= xmax && ymin <= y && y <= ymax) {
          //console.log(spos+' est visible'); // TODO : rectifier les formules
        } else {
          if(xmin > x) {
            x = 0;
          } else if(x > xmax) {
            x = vwidth;
          } else {
            x = (x - xmin) / (xmax - xmin) * vwidth;
          }
          if(ymin > y) {
            y = 0;
          } else if(y > ymax) {
            y = vheight;
          } else {
            y = (y - ymin) / (ymax - ymin) * vheight;
          }        
          x += vox;
          y += voy;
          x = Math.min(x, vwidth-5);
          y = Math.min(y, vheight-5);
          var $div = $('<div class="reperes" spos="'+spos+'" style="color:red;font-size=35px;position:absolute;cursor:pointer;"><img src="'+$(this).find('.systemPointImg').attr('src')+'" style="width:30px;height:30px;"/></div>');
          $div.css({'left':x+'px', 'top': y+'px'});   
          $('body').append($div);
        }
      });
      $('.reperes').click(function() {
        globalMap.centerOnEntity($(this).attr('spos'), EntitySystem.prototype.TYPE, false, false);
      });
    } else {
      clearTimeout(lastUpdateReperesTimeout);
      lastUpdateReperesTimeout = setTimeout(function() {
        globalMap.ui.__updateReperes();
      }, lastUpdateReperesDelay);
    }
    //this.__updateParallax();
  };  
  
   
  
  MapUi.prototype.addParallax = function() {
    var dx = 600;
    var dy = 600;
    var $bgWrap = $('#backgroundWrap');
    var $bg = $('#backgroundImage');
    var $viewport = $('#viewport');
    $bgWrap.css({'width': $viewport.outerWidth()+'px', 'height': $viewport.outerHeight()+'px', 'left': $viewport.css('left'), 'top': $viewport.css('top')});
    $bg.css({'width': $viewport.outerWidth()+dx*1.1+'px', 'height': $viewport.outerHeight()+dy*1.1+'px'});
    MapUi.prototype.__updateParallax = function() {
      /*var vwidth = this.viewport.width();
      var vheight = this.viewport.height();
      var xmin = getScroller().getValues().left / this.zoom;
      var ymin = getScroller().getValues().top / this.zoom;*/
      var px = xmin / contentWidth;
      var py = ymin / contentHeight;
      px = 1-px;
      py = 1-py;
      var bgleft = dx*px - 1.1*dx;
      var bgtop = dy*py - 1.1*dy;
      $bg.css({'left': bgleft+'px', 'top': bgtop+'px'});
    }; 
  };

  
  MapUi.prototype.centerOnElement = function($element, zoom, infobox) {
    if($element.length > 0) {
      //this.applyZoomOnMap();
      this.__zoomTo(zoom);    
      var left = parseFloat($element.css('left'));
      var top = parseFloat($element.css('top'));      
      var vleft = (this.viewport.width()/2)/zoom;
      var vtop = (this.viewport.height()/2)/zoom;
      var wleft = (parseFloat($element.css('width'))/2);
      var htop = (parseFloat($element.css('height'))/2);
      
      if(infobox) {
        vleft *= 0.7; // TODO : ne pas utiliser de valeurs fixes
      }
      
      // TODO : ne pas utiliser scrollTO
      this.__scrollTo(left-vleft+wleft, top-vtop+htop);
    }
  };
  
  MapUi.prototype.repaintSystem = function(system) {
    if(system != undefined) {
      var $oldSystem = $('#'+system.pos+'.system');
      //var left = system.x;
      //var top = system.y;
      var $newSystem = system.getHtml();
      /*var nbStars = Math.min(system.width*system.height / 700, MapUi.prototype.NB_MAX_STARS); // TODO � diviser par le nb total de syst�me avec un max
      if(!system.known)  {
        nbStars = 0;
      }
      for(var i=0; i<nbStars; i++) {
        var star = new UiStar(Math.floor((Math.random()*3*(system.width)) + left - 1*system.width), 
                              Math.floor((Math.random()*3*(system.height)) + top - 1*system.height));                              
      }*/
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
        if(coord.fleets != undefined && coord.fleets.length > 0) {
          coord.drawCanvas();
        }
        $oldCoord.removeClass('unloaded');
      }   
      this.applyZoomOnMap();
      coord.__addClickEvent($oldCoord);
    }  
  };  
  
	MapUi.prototype.enableSlider = function(zoomSlider) {
    /*var m = this;
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
        // TODO action de zoom
    });*/
    
  };

  MapUi.prototype.applyZoomOnMap = function() {
    // TODO : apply this ? this.mapRoot.css(this.newCss);
    this.mapRoot.find('.nozoom').css(this.newCssNozoom);

    this.mapRoot.removeClass('zoomOnPlanet').removeClass('zoomOnCoords').removeClass('zoomOnSystem').removeClass('zoomOnSector');   
    this.mapRoot.addClass(this.getZoomLvl());
  };
  
  MapUi.prototype.getZoomLvl = function() {
    if(this.zoom >= this.zoomConfig.zoomOnPlanet) {
      return 'zoomOnPlanet';
    } else if(this.zoom >= this.zoomConfig.zoomOnCoords) {
      return 'zoomOnCoords';
    } else {
      return 'zoomOnSystem';
    } 
  };  
  
	MapUi.prototype.getInfoBox = function() {
    return $("."+InfoBoxUI.prototype.BOX_CLASS+":first");  
  };   
  
  // Events
 
	MapUi.prototype.onDragStart = function() {
  
  };
  
  MapUi.prototype.onDragStop = function() {
  
  };
  
  MapUi.prototype.NB_MAX_STARS = 0; // TODO partager les etoiles
  
	this.init();	
};
