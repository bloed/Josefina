var IndividualRepresentation= Class.extend({

    init: function(){
        this._WordRepresentation = [];
        this._DistanceRepresentation = [];
        this._WeigthRepresentation = [];
        this._TotalValues = 0;
        this._TotalDistance = 0;
        this._TotalWeigth = 0;
        this._distancePercentages = [];
        this._weigthsPercentages = []; 
        //{ word: '', minValue: 0, maxValue: 0 }
    },
    calculateRepresentations: function(pListOfIndividuals){
        this.calculateMaxValues(pListOfIndividuals);
        this.calculateWordRepresentation( pListOfIndividuals);
        this.calculateAttributeRepresentation(this._distancePercentages, 'distance', this._TotalDistance, this._DistanceRepresentation);
        this.calculateAttributeRepresentation(this._weigthsPercentages, 'weigth', this._TotalWeigth, this._WeigthRepresentation);
    }.
    calculateWordRepresentation: function(pListOfIndividuals){
    	var minValue = 0; //word - distance - weigth
        var maxValue = 0; //word - distance - weigth
        
    	for(var index = 0; index < arrayLength-1; index++){
            var individual=pListOfIndividuals[index];

            maxValue = Math.floor((individual.getWeigth()+individual.getDistance())*MAX_VALUE_BITS/this._TotalValues);
            this._WordRepresentation.push({word: individual.getWordString(), minValue: minValue, maxValue: (minValue+maxValue)});
            minValue += maxValue+1;
    	}

        var lastIndividual = pListOfIndividuals[pListOfIndividuals.length-1];

        this._WordRepresentation.push({word: lastIndividual.getWordString(), minValue: minRange, maxValue: MAX_VALUE_BITS});
    },
    getIndividual: function(pNumIndividual){
		
    	for(var indexChromosome = 0; indexChromosome < this._WordRepresentation.length; indexChromosome++){
            var chromosome = this._WordRepresentation[indexChromosome];

            if(pNumIndividual >= chromosome.minValue && pNumIndividual <= chromosome.maxValue){
                return chromosome.word;
            }
        }
    },
    getRepresentation: function(pWord){

        for( var indexChromosome = 0; indexChromosome < this._WordRepresentation.length; indexChromosome++){
            var chromosome = this._WordRepresentation[indexChromosome];

            if(chromosome.word===pWord){
                var maximumRange = chromosome.maxValue - chromosome.minValue;
                var actualRange = Math.floor(Math.random() * (maximumRange + 1));
                return (chromosome.minValue + actualRange);
            }
        }   
    },
    getWordRepresentation: function(){
        
    	return this._WordRepresentation;
    },
    calculateMaxValues: function(pListOfIndividuals){
        var arrayLength = pListOfIndividuals.length;
        var arrayDistanceProcessed = [];
        var arrayWeigthProcessed = [];

        //gets the max values of the non repetitive distances and weigths
        for (var index = 0; index < arrayLength; index++) {
            var selection = pListOfIndividuals[index];
            this._TotalValues += selection.getWeigth() + selection.getDistance(); //REVISAR!!!
            if(arrayDistanceProcessed.indexOf(selection.getDistance())===-1){
                this._TotalDistance += selection.getDistance();
                arrayDistanceProcessed.push(selection.getDistance());
            }
            if(arrayWeigthProcessed.indexOf(selection.getWeigth() === -1)){
                this._TotalWeigth += selection.getWeigth();
                arrayWeigthProcessed.push(selection.getWeigth());
            }
        }

        //gets percentage for every type of distance
        var distancePercentage = 0;

        for (var index = 0; index < arrayDistanceProcessed.length; index++){
            var percentage = Math.round((arrayDistanceProcessed[index]/this._TotalDistance)*100)
            this._distancePercentages.push({distance: arrayDistanceProcessed[index], percentage: percentage});
        }
        for (var index = 0; index < arrayWeigthProcessed.length; index++){
             var percentage = Math.round((arrayWeigthProcessed[index]/this._TotalWeigth)*100)
            this._weigthsPercentages.push(weigth: arrayWeigthProcessed[index], percentage: percentage});
        }

        sortingAttribute = function compare(AttributeA,AttributeB){
            if (AttributeA.percentage < AttributeB.percentage)
                return 1;
            if (AttributeA.percentage > AttributeB.percentage)
                return -1;
            return 0;
            }

        this._distancePercentages.sort(sortingAttribute);
        this._weigthsPercentages.sort(sortingAttribute);

    },
    calculateAttributeRepresentation: function (pArrayAttributes, pAttribute, pTotalAttribute, pArrayRepresentation){
        var percentage = 10;
        var percentageRange = 0;
        var currentNumber = 0;
        var maxValue = 0;
        var minValue = 0;

        for(var index = 0; index < pArrayAttributes.length; index++){
            if(Math.floor(pArrayAttributes[index].percentage/10)*10 < percentage){
                percentageRange += pArrayAttributes[index].percentage;
            }else{
                var numberMaxValue = Math.floor((percentage-1)*pTotalAttribute/100);
                maxValue = Math.floor(percentageRange*MAX_VALUE_BITS/100);
                var increment = Math.floor(maxValue/(numberMaxValue - currentNumber));
                for(var chromosome = currentNumber; chromosome <= numberMaxValue; chromosome++){

                    pArrayRepresentation.push({attribute: chromosome, minValue: minValue, maxValue: minValue+increment});
                    minValue += increment +1;
                }
                minValue += increment + 1;
                currentNumber += numberMaxValue+1;
                percentage += 10;
                percentageRange = 0;
            }
        }

        var currentMaxValue = Math.floor((percentage-1)*pTotalAttribute/100);
        maxValue = Math.floor(percentageRange*MAX_VALUE_BITS/100);
        for(var chromosome = currentNumber; chromosome <= currentMaxValue; chromosome++){
            pArrayRepresentation.push({attribute: chromosome, minValue: minValue, maxValue: minValue+maxValue});
        }
    }
});





