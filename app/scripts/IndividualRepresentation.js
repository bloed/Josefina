var IndividualRepresentation= Class.extend({

    init: function(){
        this._ChromosomaticRepresentation = []; 
        //{ word: '', minValue: 0, maxValue: 0 }
    },
    calculateChromosomaticRepresentation: function(pListOfIndividuals){

        var totalValues = 0;
        var arrayLength = pListOfIndividuals.length;

    	for (var index = 0; index < arrayLength; index++) {
                totalValues += pListOfIndividuals[index].getWeigth()+pListOfIndividuals[index].getDistance();
            }

    	var minRange = 0;
    	var maxRange = 0;
    	var bitsMaxNumber = Math.pow(2, AMOUNT_OF_BITS)-1;

    	for(var index = 0; index < arrayLength-1; index++){
            var individual=pListOfIndividuals[index];

            maxRange = Math.floor((individual.getWeigth()+individual.getDistance())*bitsMaxNumber/totalValues);

            this._ChromosomaticRepresentation.push({word: individual.getWordString(), minValue: minRange, maxValue: (minRange+maxRange)});

            minRange += maxRange+1;
    	}

        var lastIndividual = pListOfIndividuals[pListOfIndividuals.length-1];

        this._ChromosomaticRepresentation.push({word: lastIndividual.getWordString(), minValue: minRange, maxValue: bitsMaxNumber});

    },
    getIndividual: function(pNumIndividual){
		
    	for(var indexChromosome = 0; indexChromosome < this._ChromosomaticRepresentation.length; indexChromosome++){
            var chromosome = this._ChromosomaticRepresentation[indexChromosome];

            if(pNumIndividual >= chromosome.minValue && pNumIndividual <= chromosome.maxValue){
                return chromosome.word;
            }
        }
    },
    getRepresentation: function(pWord){

        for( var indexChromosome = 0; indexChromosome < this._ChromosomaticRepresentation.length; indexChromosome++){
            var chromosome = this._ChromosomaticRepresentation[indexChromosome];

            if(chromosome.word===pWord){
                var maximumRange = chromosome.maxValue - chromosome.minValue;
                var actualRange = Math.floor(Math.random() * (maximumRange + 1));
                return (chromosome.minValue + actualRange);
            }
        }   
    },
    getChromosomaticRepresentation: function(){
        
    	return this._ChromosomaticRepresentation;
    }
});





