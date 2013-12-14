
console.log('Loading map ui classes');

var InfoBoxUI = function(entity) {

  var title;
  var entity;

  InfoBoxUI.prototype.display = function() {
    var boxClass = InfoBoxUI.prototype.BOX_CLASS;
    $.colorbox({html:this.__getHtmlForEntity(this.entity), title:this.title, className:boxClass, width:'40%', height:'90%', fixed:true, right:'5%'});
    $('.'+boxClass).addClass('loading');
    setTimeout(function() {
      $('.'+boxClass).removeClass('loading');
    }, 500);
  };  
  
  InfoBoxUI.prototype.__getHtmlForEntity = function() {
    // TODO : faire un switch sur le type de l'entity
    return 'Welcome';
  };  
  
  InfoBoxUI.prototype.__getTitleForEntity = function() {
    if(this.entity.type == EntitySystem.prototype.TYPE) {
      return "Système "+this.entity.pos;
    } else if(this.entity.type == EntityCoords.prototype.TYPE) {
      return "Coordonées "+this.entity.pos;       
    } else if(this.entity.type == EntityPlanet.prototype.TYPE) {
      return this.entity.name;  
    }   
    return "";
  };   
  
	this.init = function() {
    this.entity = entity;
    this.title = this.__getTitleForEntity();
		this.init = function() {};
	}; 	  
  
  InfoBoxUI.prototype.BOX_CLASS = 'popininfo';
  
	this.init();	
};