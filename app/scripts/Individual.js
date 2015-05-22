var Individual= Class.extend({
    init: function(pWeigth, pDistance, pWord, pWordRepresentation){
        this._Weigth = pWeigth;
        this._Distance = pDistance;
        this._TotalDistance = 0;
        this._WordRepresentation = pWordRepresentation;//chromosomatic representation
        this._WordString = pWord; //need to creeate the chromosomatic representation
    },
    getWeigth: function(){
    	return this._Weigth;
    },
    setWeigth: function(pWeigth){
    	this._Weigth = pWeigth;
    },
    setDistance: function(pDistance){
    	this._Distance = pDistance;
    },
    getDistance: function(){
    	return this._Distance;
    },
    setTotalDistance: function(pTotalDistance){
    	this._TotalDistance = pTotalDistance;
    },
    getTotalDistance: function(){
    	return this._TotalDistance;
    },
    getWordRepresentation: function(){
    	return this._WordRepresentation;
    },
    setWordRepresentation: function(pWordRepresentation){
    	this._WordRepresentation = pWordRepresentation;
    },
    setWordString: function(pWord){
    	this._WordString = pWord;
    },
    getWordString: function(){
    	return this._WordString;
    }
});



