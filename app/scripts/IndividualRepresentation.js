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
        this._AllWeigth = 0;
        this._AllDistance = 0; 
        //{ word: '', minValue: 0, maxValue: 0 }
    },
    calculateRepresentations: function(pListOfIndividuals){
        this.calculateMaxValues(pListOfIndividuals);

        this.calculateWordRepresentation( pListOfIndividuals);
        this.calculateAttributeRepresentation(this._distancePercentages, 'distance', this._TotalDistance, this._DistanceRepresentation);
        this.calculateAttributeRepresentation(this._weigthsPercentages, 'weigth', this._TotalWeigth, this._WeigthRepresentation);
        
        var string = "";
        for(var index=0; index<this._WordRepresentation.length; index++){
            string += this._WordRepresentation[index].attribute + " " +this._WordRepresentation[index].maxValue+" \n";
        }
        alert(string);
        string = "";
        for(var index=0; index<this._WeigthRepresentation.length; index++){
            string += this._WeigthRepresentation[index].attribute + " " +this._WeigthRepresentation[index].maxValue+" \n";
        }
        alert(string);
        string = "";
        for(var index=0; index<this._DistanceRepresentation.length; index++){
            string += this._DistanceRepresentation[index].attribute + " " +this._DistanceRepresentation[index].maxValue+" \n";
        }
        alert(string);
        /*for(var index=0; index<this._weigthsPercentages.length; index++){
            string += this._weigthsPercentages[index].attribute + " " +this._weigthsPercentages[index].percentage+" \n";
        } alert(string);*/
        
    },
    calculateWordRepresentation: function(pListOfIndividuals){
    	var minValue = 0; //word - distance - weigth
        var maxValue = 0; //word - distance - weigth
        
    	for(var index = 0; index < pListOfIndividuals.length-1; index++){
            var individual=pListOfIndividuals[index];

            maxValue = individual.getWeigth()*WEIGTH_PERCENTAGE/this._AllWeigth + individual.getDistance()*DISTANCE_PERCENTAGE/this._AllDistance
            maxValue= Math.floor(maxValue*MAX_VALUE_BITS/100);

            this._WordRepresentation.push({attribute: individual.getWordString(), minValue: minValue, maxValue: (minValue+maxValue)});
            minValue += maxValue+1;
    	}

        var lastIndividual = pListOfIndividuals[pListOfIndividuals.length-1];

        this._WordRepresentation.push({attribute: lastIndividual.getWordString(), minValue: minValue, maxValue: MAX_VALUE_BITS});
    },
    getIndividual: function(pNumIndividual){
		
    	for(var indexChromosome = 0; indexChromosome < this._WordRepresentation.length; indexChromosome++){
            var chromosome = this._WordRepresentation[indexChromosome];

            if(pNumIndividual >= chromosome.minValue && pNumIndividual <= chromosome.maxValue){
                return chromosome.word;
            }
        }
    },
    getAttribute: function(pRepresentation, pArray){
        for(var indexChromosome = 0; indexChromosome < pArray.length; indexChromosome++){
            var chromosome = pArray[indexChromosome];

            if(pRepresentation >= chromosome.minValue && pRepresentation <= chromosome.maxValue){
                return chromosome.attribute;
            }
        }
    },
    getRepresentation: function(pAttribute, pArray){

        for( var indexChromosome = 0; indexChromosome < pArray.length; indexChromosome++){
            var chromosome = pArray[indexChromosome];

            if(chromosome.attribute===pAttribute){
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
            this._AllDistance+= selection.getDistance();
            this._AllWeigth += selection.getWeigth();

            if(arrayDistanceProcessed.indexOf(selection.getDistance()) === -1){
                this._TotalDistance += selection.getDistance();
                arrayDistanceProcessed.push(selection.getDistance());
            }
            if(arrayWeigthProcessed.indexOf(selection.getWeigth()) === -1){
                this._TotalWeigth += selection.getWeigth();
                arrayWeigthProcessed.push(selection.getWeigth());
            }
            this._TotalValues += pListOfIndividuals[index].getWeigth() + pListOfIndividuals[index].getDistance();
        }

        //gets percentage for every type of distance
        var distancePercentage = 0;

        for (var index = 0; index < arrayDistanceProcessed.length; index++){
            var percentage = (arrayDistanceProcessed[index]/this._TotalDistance)*100
            this._distancePercentages.push({attribute: arrayDistanceProcessed[index], percentage: percentage});
        }
        for (var index = 0; index < arrayWeigthProcessed.length; index++){
             var percentage = (arrayWeigthProcessed[index]/this._TotalWeigth)*100
            this._weigthsPercentages.push({attribute: arrayWeigthProcessed[index], percentage: percentage});
        }

        sortingAttribute = function compare(AttributeA,AttributeB){
            if (AttributeA.percentage < AttributeB.percentage)
                return -1;
            if (AttributeA.percentage > AttributeB.percentage)
                return 1;
            return 0;
            }

        this._distancePercentages.sort(sortingAttribute);
        this._weigthsPercentages.sort(sortingAttribute);

    },
    calculateAttributeRepresentation: function (pArrayAttributes, pAttribute, pTotalAttribute, pArrayRepresentation){
        var percentage = Math.floor(pArrayAttributes[0].percentage/10)*10+10;
        var percentageRange = 0;
        var currentNumber = 0
        var maxValue = 0;
        var minValue = 0;

        for(var index = 0; index < pArrayAttributes.length; index++){
            
            if(Math.floor(pArrayAttributes[index].percentage/10)*10 < percentage){
                percentageRange += pArrayAttributes[index].percentage;
            }else{
                var numberMaxValue = Math.floor((percentage-1)*pTotalAttribute/100);
                maxValue = Math.floor(percentageRange*NUMBER_BITS_ATTRIBUTES/100);
                var increment = Math.floor(maxValue/(numberMaxValue - currentNumber+1));
                
                for(var chromosome = currentNumber; chromosome <= numberMaxValue; chromosome++){
                    pArrayRepresentation.push({attribute: chromosome, minValue: minValue, maxValue: minValue+increment});
                    minValue += increment +1;
                    currentNumber = chromosome;
                }
                currentNumber++;
                percentage = Math.floor(pArrayAttributes[index].percentage/10)*10+10;
                percentageRange = 0;
                index--;
            }
        }

        var numberMaxValue = pArrayAttributes[pArrayAttributes.length-1].attribute;
        maxValue = Math.floor(percentageRange*NUMBER_BITS_ATTRIBUTES/100);
        var increment = Math.floor(maxValue/(numberMaxValue - currentNumber+1));

        for(var chromosome = currentNumber; chromosome <= numberMaxValue; chromosome++){

            if( minValue+increment > NUMBER_BITS_ATTRIBUTES)
                minValue=NUMBER_BITS_ATTRIBUTES-increment;

            pArrayRepresentation.push({attribute: chromosome, minValue: minValue, maxValue: minValue+increment});
            minValue += increment +1;
        }
    },
    getWordChromosomes: function(){
        return this._WordRepresentation;
    },
    getDistanceChromosomes: function(){
        return this._DistanceRepresentation;
    },
    getWeigthChromosomes: function(){
        return this._WeigthRepresentation;
    }
});





