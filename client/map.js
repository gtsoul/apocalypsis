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
  this.mapRoot = jQuery(this.mapDiv).children('*:first');
  this.offsetLeft = 0;
  this.offsetTop = 0; 

  
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
    var totalWidth = this.mapRoot.width();
    var totalHeight = this.mapRoot.width();
    
    var zoomModifierOld = Math.pow(2, this.zoom - 1);
    var percentageX = (mouseX -leftOld) / totalWidth;
    var percentageY = (mouseY - topOld) / totalHeight;    
    
     
      // Constants OK
      //console.log(constantX+' # '+constantY);
          
    
    if(newZoom != this.zoom) {
      console.log('Zoom '+this.zoom+' => '+newZoom+' , '+percentageX+' # '+percentageY);
      

      this.zoom = newZoom;                  
      jQuery(this.mapDiv).attr('class', 'zoom'+this.zoom); 
      
      var zoomModifierNew = Math.pow(2, this.zoom - 1);
      /*var windowWidth = jQuery(this.mapDiv).width()/2;
      var windowHeight = jQuery(this.mapDiv).height()/2;
      this.offsetLeft = jQuery(this.mapDiv).offset().left - this.mapRoot.offset().left;
      this.offsetTop = jQuery(this.mapDiv).offset().top - this.mapRoot.offset().top;
      
      var leftNew = this.offsetLeft - zoomModifierNew/zoomModifierOld *(totalWidth * percentageX);// + this.mapRoot.width()/2;
      var topNew = this.offsetTop - zoomModifierNew/zoomModifierOld *(totalHeight * percentageY);// + this.mapRoot.height()/2;
      console.log('NEW '+this.offsetLeft+' : '+this.offsetTop+' = '+(percentageX * 100)+'% *'+totalWidth+' = '+(percentageX*totalWidth)+' : '+(totalHeight * percentageY / zoomModifierOld));
      
      // TODO : check this
      //function recenter() {
      jQuery(this.mapDiv).css('left', parseInt(leftNew)+'px');
      jQuery(this.mapDiv).css('top', parseInt(topNew)+'px');*/
      
      /*var map = jQuery(this.mapDiv);
      
      var old_width = map.width();
      var new_width = 400*Math.pow(2,newZoom);//ui.value;
      var width_change = new_width - old_width;
      var x_offset = ((map.position().left-200))/(old_width/2);
      var y_offset = ((map.position().top-150))/(old_width/2);      
      var css_properties = {
          width: new_width,
          left: (new_width * x_offset /2 ) + 200 + "px", 
          top: (new_width * y_offset /2 ) + 150 + "px"
      };
      map.css(css_properties);*/
    }
  };    
  
	Map.prototype.onDragStart = function() {
  
  };
  
  Map.prototype.onDragStop = function() {
  
  };
  
	this.init();	
};