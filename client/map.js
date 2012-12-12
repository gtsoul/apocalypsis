if (typeof console == "undefined") {
  console = {
    log     : function(){},
    info    : function(){},
    warn    : function(){},
    error   : function(){}
  };
};

console.log('Loading map classes');

var Map = function(mapDiv) {
	this.conf;
	this.initX = 0;
	this.initY = 46;
  this.zoom = 1;
	this.mapDiv = mapDiv;

  
	this.init = function() {
    this.enableDrag();
    this.enableZoom();
		this.init = function() {};
	}; 	
  
	Map.prototype.enableDrag = function() {
    jQuery(this.mapDiv).draggable({
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
    jQuery(this.mapDiv).bind('mousewheel', {map: this}, function(event, delta) {
      event.data.map.onZoomChange(event, delta);
    });
    jQuery(this.mapDiv).attr('class', 'zoom1');
  };
  
  // Events

	Map.prototype.onZoomChange = function(event, delta) {
    //console.log(this.zoom+' '+jQuery(this.mapDiv).offset().left+' '+event.clientX); 
    //1 -303 456
    //2 -807 502
    //3 -2183 445
    
    //1 -399 555
    //2 -1652 263
    //3 -3111 714

    var newZoom = Math.round(this.zoom + delta);
    newZoom = Math.min(3, Math.max(1, newZoom));
    
    var mouseX = event.clientX;      
    var mouseY = event.clientY;
    var leftOld = jQuery(this.mapDiv).offset().left;
    var topOld = jQuery(this.mapDiv).offset().top;
    //var leftOld = parseFloat(jQuery(this.mapDiv).css('left').replace('px', ''));
    //var topOld = parseFloat(jQuery(this.mapDiv).css('top').replace('px', ''));         
    var totalWidth = jQuery(this.mapDiv).children().width();
    var totalHeight = jQuery(this.mapDiv).children().width();
    
    var zoomModifierOld = Math.pow(2, this.zoom - 1);
    var percentageX = (mouseX -leftOld) / totalWidth;
    var percentageY = (mouseY - topOld) / totalHeight;    
    
     
      // Constants OK
      //console.log(constantX+' # '+constantY);
          
    
    if(newZoom != this.zoom) {
      console.log('Zoom '+this.zoom+' => '+newZoom+' , '+percentageX+' # '+percentageY);
      

      this.zoom = newZoom;      
      var zoomModifierNew = Math.pow(2, this.zoom - 1);
      var windowWidth = jQuery(this.mapDiv).width()/2;
      var windowHeight = jQuery(this.mapDiv).height()/2;
      var leftNew = /*windowWidth*/ - (totalWidth * percentageX / zoomModifierOld);
      var topNew = /*windowHeight*/ - (totalHeight * percentageY / zoomModifierOld);
      
      jQuery(this.mapDiv).attr('class', 'zoom'+this.zoom); 
      console.log('NEW '+windowWidth+' - '+jQuery(this.mapDiv).children().width() +' * '+percentageX+' = '+leftNew+' / '+topNew);
      
      // TODO : check this
      //function recenter() {
      //jQuery(this.mapDiv).css('left', leftNew+'px');
      //jQuery(this.mapDiv).css('top', topNew+'px');
      jQuery(this.mapDiv).offset({ top: topNew, left: leftNew});
      //alert('center');
      //};
      //setTimeout(recenter, 2000);
    }
  };    
  
	Map.prototype.onDragStart = function() {
  
  };
  
  Map.prototype.onDragStop = function() {
  
  };
  
	this.init();	
};