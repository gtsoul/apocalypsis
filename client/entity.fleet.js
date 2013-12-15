
var EntityFleet = function(json, parent) {
  this.pos;
  this.captainId;
  this.captainName;
  this.spaceElement;
  this.strength;
  this.image;
  this.state; // idle, fly, fight
  
	this.init = function() {
    if(json != undefined) {
      this.__loadJson(json, parent);
    }
		this.init = function() {};
	}; 
  
  EntityFleet.prototype.__loadJson = function (json, parent) {
    this.captainId = json.cap_id;
    this.captainName = json.cap_name;
    this.spaceElement = parent;
    this.pos = this.spaceElement.pos+'_'+this.captainId;    
    this.strength = 100; // TODO : measure fleet strength
    this.state = EntityFleet.prototype.STATE_FLY;
  };
  
  EntityFleet.prototype.getHtmlIdle = function (nbEnnemyFleets, nbFriendFleets) { 
    if(nbEnnemyFleets <= 3) {
      nbFleetsLn = nbEnnemyFleets;
    } else if(nbEnnemyFleets <= 50) {
      nbFleetsLn = Math.max(3, Math.pow(nbEnnemyFleets, 1/2));
    } else {
      nbFleetsLn = Math.max(7, Math.pow(nbEnnemyFleets, 1/3));
    }
    nbFleetsLn = Math.min(20, nbFleetsLn);
    nbFleetsLn += nbFriendFleets;
    var $fleets = $('<div class="fleets"/>'); 
    var $fleet = $('<img class="fleet nozoom fleetStatic" style="width:'+EntityFleet.prototype.WIDTH_PX_DEFAULT+'px;height:'+EntityFleet.prototype.HEIGHT_PX_DEFAULT+'px;"/>');
    $fleet.attr('src', EntityFleet.prototype.IMAGE_ENNEMY);
    var left = Math.round(this.spaceElement.x + this.spaceElement.width/2 - EntityFleet.prototype.WIDTH_PX_DEFAULT/2);
    var top = Math.round(this.spaceElement.y + this.spaceElement.height/2 - EntityFleet.prototype.HEIGHT_PX_DEFAULT/2);    
    $fleet.css({'left': left+'px', 'top': top+'px'});

    for(var it=0; it<nbFleetsLn; it++) {
      var $fleetTmp = $fleet.clone();
      var animSpeed = 2;
      if(it >= nbFleetsLn-nbFriendFleets) {
        $fleetTmp.attr('src', EntityFleet.prototype.IMAGE_FRIEND);
      } else {
        animSpeed = (Math.random()*5+2);
      }
      var compat = ['-moz-', '-webkit-', '-o-', ''];
      var timing = ['linear', 'ease', 'ease-in', 'ease-out'];
      var cssAnim = {};
      var anim = 'travel-function '+animSpeed+'s linear infinite';
      for(var i = compat.length - 1; i; i--) {
        cssAnim[compat[i]+'animation'] = anim;
      }    
      $fleetTmp.css(cssAnim);
      $fleets.append($fleetTmp);
    }
    return $fleets;
  }
  
  EntityFleet.prototype.getHtmlPcExt = function (nbEnnemyFleets, nbFriendFleets) { 
    var $fleets = $('<div class="fleetsNb"/>'); 
    var $friend = $('<span class="friend"/>');
    $friend.html(nbFriendFleets);    
    var $ennemy = $('<span class="ennemy"/>');
    $ennemy.html(nbEnnemyFleets);    
    $fleets.append($friend);
    $fleets.append(" / ");
    $fleets.append($ennemy);    
    return $fleets;
  };
  
  EntityFleet.prototype.WIDTH_PX_DEFAULT = 10;
  EntityFleet.prototype.HEIGHT_PX_DEFAULT = 10;  
  EntityFleet.prototype.INTERVAL_PX = 8;
  EntityFleet.prototype.STATE_IDLE = 'idle';
  EntityFleet.prototype.STATE_FLY = 'fly';
  EntityFleet.prototype.STATE_FIGHT = 'fight';
  EntityFleet.prototype.IMAGE_ENNEMY = 'images/ship/ship_ennemy_picto.png';  
  EntityFleet.prototype.IMAGE_FRIEND = 'images/ship/ship_friend_picto.png';  

	this.init();	
};
