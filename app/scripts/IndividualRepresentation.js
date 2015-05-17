var IndividualRepresentation= Class.extend({
    init: function(){
        this._ChromosomaticRepresentation = []; 
        //{ word: '', minValue: 0, maxValue: 0 }
    },
    calculateChromosomaticRepresentation: function(pListOfIndividuals){
         var totalValues=0;
         var arrayLength = pListOfIndividuals.length;
		 for (var index = 0; index < arrayLength; index++) {
		 	totalValues+=pListOfIndividuals[index].weigth+pListOfIndividuals[index].distance;
		 }
		 var minRange=0;
		 var maxRange=0;
		 var bitsMaxNumber=Math.pow(2, AMOUNT_OF_BITS)-1;
		 for(var index =0; index <arrayLength-1; index++){
		 	maxRange=Math.floor((pListOfIndividuals[index].weigth+pListOfIndividuals[index].distance)*bitsMaxNumber/totalValues);
		 	this._ChromosomaticRepresentation.push( {word: pListOfIndividuals[index].word, minValue: minRange,
		 	maxValue: (minRange+maxRange)})
		 	minRange+=maxRange+1;
		 }

		  	this._ChromosomaticRepresentation.push( {word: pListOfIndividuals[pListOfIndividuals.length-1].word, 
		  		minValue: minRange, maxValue: bitsMaxNumber})

		 /*for(var index=0; index<this._ChromosomaticRepresentation.length;index++){
		 	alert(this._ChromosomaticRepresentation[index].word + this._ChromosomaticRepresentation[index].minValue + "-" +
		 		this._ChromosomaticRepresentation[index].maxValue);
		 }  PRINT DE VISUALIZACION, SE QUITA */
	},
	getWordString: function(){
		//return the string of the new individual
	}
});





