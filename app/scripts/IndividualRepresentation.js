var IndividualRepresentation= Class.extend({
    init: function(){
        this._ChromosomaticRepresentation = []; 
        //{ word: '', minValue: 0, maxValue: 0 }
    },
    calculateChromosomaticRepresentation: function(pListOfIndividuals){
        var totalValues=0;
        var arrayLength = pListOfIndividuals.length;
	for (var index = 0; index < arrayLength; index++) {
            totalValues+=pListOfIndividuals[index].getWeigth()+pListOfIndividuals[index].getDistance();
        }
	var minRange=0;
	var maxRange=0;
	var bitsMaxNumber=Math.pow(2, AMOUNT_OF_BITS)-1;
	for(var index =0; index <arrayLength-1; index++){
            maxRange=Math.floor((pListOfIndividuals[index].getWeigth()+pListOfIndividuals[index].getDistance())*bitsMaxNumber/totalValues);
            this._ChromosomaticRepresentation.push( {word: pListOfIndividuals[index].getWordString(), minValue: minRange,
            maxValue: (minRange+maxRange), weigth: pListOfIndividuals[index].getWeigth(), distance: pListOfIndividuals[index].getDistance(),
            totaldistance: pListOfIndividuals[index].getTotalDistance()});
            minRange+=maxRange+1;
	}
        this._ChromosomaticRepresentation.push( {word: pListOfIndividuals[pListOfIndividuals.length-1].getWordString(),
            minValue: minRange, maxValue: bitsMaxNumber, weigth: pListOfIndividuals[pListOfIndividuals.length-1].getWeigth(), 
            distance: pListOfIndividuals[pListOfIndividuals.length-1].getDistance(), 
            totaldistance: pListOfIndividuals[pListOfIndividuals.length-1].getTotalDistance()});

    },
    getIndividual: function(pNumIndividual){
		//alert("num"+ pNumIndividual);
	for(var indexChromosome=0; indexChromosome<this._ChromosomaticRepresentation.length; indexChromosome++){
            if(pNumIndividual>=this._ChromosomaticRepresentation[indexChromosome].minValue &&
                    pNumIndividual<=this._ChromosomaticRepresentation[indexChromosome].maxValue){
                var chromosome=this._ChromosomaticRepresentation[indexChromosome];
                var baby=new Individual(chromosome.weigth, chromosome.distance, chromosome.totaldistance, chromosome.word,pNumIndividual);
                return baby;
            }
	}
    },
    getRepresentation: function(pWord){
        for( var indexChromosome = 0; indexChromosome<this._ChromosomaticRepresentation.length; indexChromosome++){
            if(this._ChromosomaticRepresentation[indexChromosome].word===pWord){
                var maximumRange = this._ChromosomaticRepresentation[indexChromosome].maxValue - 
                        this._ChromosomaticRepresentation[indexChromosome].minValue;
                var actualRange = Math.floor(Math.random() * (maximumRange + 1));
                //alert(this._ChromosomaticRepresentation[indexChromosome].minValue + actualRange);
                return (this._ChromosomaticRepresentation[indexChromosome].minValue + actualRange);
            }
        }   
    },
    getChromosomaticRepresentation: function(){
    	return this._ChromosomaticRepresentation;
    }
});





