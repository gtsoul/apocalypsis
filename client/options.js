console.log('Loading options');

var OptionDto = function(data) {
  var localStoragePrefix = "apocalypsis-map-options-";
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
  
  OptionDto.prototype.load = function () {
    this.value = sessionStorage.getItem(localStoragePrefix+this.key);
    console.log("Option "+this.key+" = "+this.val());
  };  
  
  OptionDto.prototype.save = function (newValue) {
    this.value = newValue;
    if (this.value != undefined && this.value != this.defaultValue) {      
      sessionStorage.setItem(localStoragePrefix+this.key, this.value);
    } else if (this.value == undefined) {
      sessionStorage.removeItem(localStoragePrefix+this.key);
    }
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
      this.datas[option.key] = option;
    }
  };  
  
  Options.prototype.__loadFromStorage = function () {
    for(var key in this.datas) {
      this.datas[key].load();
    }
  };   
  
  Options.prototype.get = function (key) {
    if (this.datas[key] != undefined) {
      return this.datas[key].val();
    } else {
      console.warn("option "+key+" inconnue");
      return "";
    }
  }; 
  
  Options.prototype.set = function (key, value) {
    if (this.datas[key] != undefined) {
      return this.datas[key].save(value);
    } else {
      console.warn("option "+key+" inconnue");
      return "";
    }
  };   
  
	this.init();	
};
