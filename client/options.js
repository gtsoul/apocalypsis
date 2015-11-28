console.log('Loading options');

var OptionDto = function(data) {
	this.key;
  this.value;
  this.defaultValue;
  this.description;
  
	this.init = function() {
    this.__loadJson(data);
		this.init = function() {};
	}; 
  
  OptionDto.prototype.__loadJson = function (json) {
    this.key = json.key;
    this.defaultValue = json.defaultValue;
    this.description = json.description;
  };
  
  OptionDto.prototype.val = function () {
    if (this.value == undefined) {
      return this.defaultValue;
    }
    return this.value;
  };    
  
	this.init();	
};

var Options = function(jsonOptions) {
	this.datas = {};
  
	this.init = function() {    
    this.__loadOptionList(jsonOptions);
    this.__loadFromStorage();
		this.init = function() {};
	}; 
  
  Options.prototype.__loadOptionList = function (json) {
    for(var it in json) {
      var option = new OptionDto(json[it]);
      console.log(option.key);
      this.datas[option.key] = option;
    }
  };  
  
  Options.prototype.__loadFromStorage = function () {
    
  };   
  
  Options.prototype.get = function (key) {
    if (this.datas[key] != undefined) {
      return this.datas[key].val();
    } else {
      console.warn("option "+key+" inconnue");
      return "";
    }
  }; 
  
	this.init();	
};
