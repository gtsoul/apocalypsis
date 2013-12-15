
console.log('Loading map ui classes');

var InfoBoxUI = function(entity) {

  var title;
  var entity;

  InfoBoxUI.prototype.display = function() {
    var me = this;
    var boxClass = InfoBoxUI.prototype.BOX_CLASS;
    var title = this.__getTitleBoxForEntity();
    var html = this.__getHtmlForEntity();
    $.colorbox({html:html, title:title, className:boxClass, width:'40%', height:'90%', fixed:true, right:'5%'});
    $('.'+boxClass).addClass('loading');
    setTimeout(function() {
      me.__addClickEvent($('.'+InfoBoxUI.prototype.BOX_CLASS));
      $('.'+boxClass).removeClass('loading');
    }, 500);
  };  
  
  InfoBoxUI.prototype.__getTitleBoxForEntity = function() {
    var $box = $('<div/>');     
    $box.html('<img src="images/apocalypsis/left.png" class="prevEntity" curPos="'+this.entity.pos+'" type="'+this.entity.type+'"/><span class="title">'+this.title+'</span><img src="images/apocalypsis/right.png" class="nextEntity" curPos="'+this.entity.pos+'" type="'+this.entity.type+'"/>');
    return $box.html();   
  };    
  
  InfoBoxUI.prototype.__getHtmlForEntity = function() {
    var $box = $('<div/>');
    $box.html('Welcome');
    return $box.html();
  };  
  
  InfoBoxUI.prototype.__getTitleForEntity = function() {
    if(this.entity.type == EntitySystem.prototype.TYPE) {
      return "Système "+this.entity.pos;
    } else if(this.entity.type == EntityCoords.prototype.TYPE) {
      return "Coords "+this.entity.pos;       
    } else if(this.entity.type == EntityPlanet.prototype.TYPE) {
      return this.entity.name;  
    }   
    return "";
  };   
  
  InfoBoxUI.prototype.__addClickEvent = function(htmlEl) {
    htmlEl.find('#cboxTitle .prevEntity').click(function() { 
      var prevEntity = globalMap.getPrevEntity($(this).attr('curPos'));
      var type = $(this).attr('type');
      if(prevEntity != undefined) {
        var infoBox = new InfoBoxUI(prevEntity);
        infoBox.display();
        globalMap.centerOnEntity(prevEntity.pos, type, false, true);
      }
    }); 
    htmlEl.find('#cboxTitle .nextEntity').click(function() { 
      var nextEntity = globalMap.getNextEntity($(this).attr('curPos'));
      var type = $(this).attr('type');
      if(nextEntity != undefined) {
        var infoBox = new InfoBoxUI(nextEntity);
        infoBox.display();
        globalMap.centerOnEntity(nextEntity.pos, type, false, true);
      }
    });     
  };  
  
	this.init = function() {
    this.entity = entity;
    this.title = this.__getTitleForEntity();
		this.init = function() {};
	}; 	  
  
  InfoBoxUI.prototype.BOX_CLASS = 'popininfo';
  
	this.init();	
};