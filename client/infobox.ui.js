
var InfoBoxUI = function(entity) {

  this.title;
  this.longTitle;
  this.entity;

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
    var $left = $('<img src="images/apocalypsis/left.png" class="prevEntity" curPos="'+this.entity.pos+'" type="'+this.entity.type+'"/>');
    $box.append($left);
    var $titleWrap = $('<span class="titleWrap"></span>');    
    var $title = $('<span class="title">'+this.title+'</span>');
    $box.append($titleWrap);
    $titleWrap.append($title);
    var $right = $('<img src="images/apocalypsis/right.png" class="nextEntity" curPos="'+this.entity.pos+'" type="'+this.entity.type+'"/>');    
    $box.append($right);
    if (this.longTitle != this.title) {
      var $longTitle = $('<div class="longTitle">'+this.longTitle+'</div>');
      $titleWrap.append($longTitle); 
      $title.append('<span class="showLongTitle">...</span>');
    }  
    if(this.entity.type != EntitySystem.prototype.TYPE) {
      var parentType;
      if(this.entity.type == EntityCoords.prototype.TYPE) {
        parentType = EntitySystem.prototype.TYPE;
      } else {
        parentType = EntityCoords.prototype.TYPE;
      }
      var $up = $('<img src="images/apocalypsis/up.png" class="parentEntity" curPos="'+this.entity.pos+'" type="'+parentType+'"/>');    
      $box.append($up);
    }
    return $box.html();   
  };    
  
  InfoBoxUI.prototype.__getHtmlForEntity = function() {
    var $box = $('<div/>');
    if(typeof(this.entity.known) != 'undefined' && this.entity.known == false) {
      $box.append('<div class="alert">Vous n\'avez pas encore exploré cet endroit.</div>');
    }
    var $entityImageWrapper = $('<div class="entityImageWrapper"/>')
    var $entityImage = $('<img class="entityImage" width="50%"/>');
    $entityImage.attr({'width': '50%', 'height': '50%'});
    $entityImageWrapper.append($entityImage);
    $box.append($entityImageWrapper); 
    
    if(this.entity.type == EntitySystem.prototype.TYPE) {
      $entityImage.attr('src', this.entity.image);
    } else if(this.entity.type == EntityCoords.prototype.TYPE) {
       $entityImage.attr('src', this.entity.getFullsizeImage());
    } else if(this.entity.type == EntityPlanet.prototype.TYPE) {
      $entityImage.attr('src', this.entity.getFullsizeImage());
    }      
    return $box.html();
  };  
  
  InfoBoxUI.prototype.__getTitleForEntity = function() {
    if(this.entity.type == EntitySystem.prototype.TYPE) {
      return "Système "+this.entity.pos;
    } else if(this.entity.type == EntityCoords.prototype.TYPE) {
      return "Coordonnées "+this.entity.pos;       
    } else if(this.entity.type == EntityPlanet.prototype.TYPE) {
      return this.entity.name;  
    }   
    return "";
  };   
  
  InfoBoxUI.prototype.__cropTitle = function(title, maxLength) {
    var replacements = {"Système": "Syst", "Syst": "S.", "Coordonnées": "Coords", "Coords": "C."};
    var hasReplace = false;
    while (title.length > maxLength) {
      for (var key in replacements) {
        if (title.contains(key) && !hasReplace) {
          title = title.replace(key, replacements[key]);
          hasReplace = true;
        }
      }
      if (!hasReplace) {
        title = title.substring(0, title.length - 1);        
        hasReplace = true;
      }
      hasReplace = false;
    }    
    return title;
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
    htmlEl.find('#cboxTitle .parentEntity').click(function() { 
      var parentEntity = globalMap.getParentEntity($(this).attr('curPos'));
      var type = $(this).attr('type');
      if(parentEntity != undefined) {
        var infoBox = new InfoBoxUI(parentEntity);
        infoBox.display();
        globalMap.centerOnEntity(parentEntity.pos, type, false, true);
      }
    });
    if (this.longTitle != this.title) {
      htmlEl.find('#cboxTitle .titleWrap').hover(function() { 
        if ($(this).find('.showLongTitle')) {
          $(this).find('.title').hide();
          $(this).parent().find('img').hide();
          $(this).find('.longTitle').show();
        }
      }, function() {
        if ($(this).find('.showLongTitle')) {
          $(this).find('.title').show();        
          $(this).parent().find('img').show();        
          $(this).find('.longTitle').hide();
        }
      }); 
    } 
  };  
  
	this.init = function() {
    this.entity = entity;
    this.longTitle = this.__getTitleForEntity();
    this.title = this.__cropTitle(this.longTitle, 16);
		this.init = function() {};
	}; 	  
  
  InfoBoxUI.prototype.BOX_CLASS = 'popininfo';
  
	this.init();	
};