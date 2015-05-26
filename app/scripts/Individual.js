//This class contains the individuals in the genetic algorithm.
var Individual= Class.extend({
    init: function(pWeigth, pDistance, pWord){
        this._Weigth = pWeigth;
        this._Distance = pDistance;
        this._WordString = pWord;
        this._TotalDistance = 0;
        this._WordRepresentation = 0;//chromosomatic representation of the word.
        this._DistanceRepresentation = 0;//distance chromosome.
        this._WeigthRepresentation = 0; //weight chromosome.
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
    setWordString: function(pWord){
    	this._WordString = pWord;
    },
    getWordString: function(){
    	return this._WordString;
    },
    getDistanceRepresentation: function(){
        return this._DistanceRepresentation;
    },
    getWeigthRepresentation: function(){
        return this._WeigthRepresentation;
    },
    setRepresentations: function(pWord, pDistance, pWeigth){
        this._WordRepresentation = pWord;
        this._DistanceRepresentation = pDistance;
        this._WeigthRepresentation = pWeigth;
    }
});



