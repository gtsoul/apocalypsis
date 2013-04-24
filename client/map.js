if (typeof console == "undefined") {
  console = {
    log     : function(){},
    info    : function(){},
    warn    : function(){},
    error   : function(){}
  };
};

console.log('Loading map classes');

var Map = function(mapUi) {
	this.conf;
  this.ui = mapUi;
  
	this.init = function() {
    // TODO 
		this.init = function() {};
	}; 
  
	this.init();	
};