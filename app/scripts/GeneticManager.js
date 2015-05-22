var GeneticManager= Class.extend({
    init: function(pTextManager){
        this._Population = []; 
        this._KeepReproducing = true;
        this._IndividualRepresentation = new IndividualRepresentation();
        this._GeneticOperator = new GeneticOperator();
        this._TextManager = pTextManager;
        this._MaxWeigth = 0;
        this._MaxDistance = 0;
        this._MaxTotalDistance = 0; //needed for methods to calculate values of words, it may go somehwere else though
    },
    createInitialPopulation: function(pListOfWords){

        for(var indexOfArray=0; indexOfArray<pListOfWords.length; indexOfArray++){
            var selection= pListOfWords[indexOfArray];

            var individual= new Individual(this._TextManager.calculateWeight(selection), this._TextManager.calculateDistance(selection),
             selection, 0);

            this._Population.push(individual); 
        }

        this._IndividualRepresentation.calculateChromosomaticRepresentation(this._Population);

        this.setRepresentationForInitialPopulation();//creates chromosomes for the first population

    },
    replaceCurrentPopulation: function (pListOfIndividuals){

        this._Population = pListOfIndividuals;
    },
    stop : function(){

        this._KeepReproducing = false;
    },
    verifyStop : function(){

        //verifies if there are 10 different types of individuals and a given number of indivuals
        var listOfDifferentIndividuals = [];

        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            if (listOfDifferentIndividuals.indexOf(this._Population[indexOfArray].getWordString())===-1){//if the element had not been added
                listOfDifferentIndividuals.push(this._Population[indexOfArray].getWordString());
            }
        }
        
        if ((this._Population.length > MIN_AMOUNT_OF_INDIVIDUALS && listOfDifferentIndividuals.length > MIN_DIFFERENT_TYPE_OF_INDIVIDUALS)
        ||(this._Population.length>2000)){
            return true;
        }
        else{
            return false;
        }
        
    },
    createNewGenerations: function(){
        
        var fitList = [];//list of individuals considered fit
        
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            if(this.isFit(this._Population[indexOfArray])){
                
                fitList.push(this._Population[indexOfArray]);
            }
        }
        
        var newIndividuals=[];
        
        for(var reproductedIndividuals = 0; reproductedIndividuals < INDIVIDUALS_PER_REPRODUCTION; reproductedIndividuals++){

            var father=fitList[Math.floor(Math.random()*(fitList.length-1))];
            var mother=fitList[Math.floor(Math.random()*(fitList.length-1))];

            var individualNumber = this._GeneticOperator.cross(father.getWordRepresentation(), mother.getWordRepresentation(), AMOUNT_OF_BITS);
            
            var bits = this._GeneticOperator.getBitsForAttributes(father.getDistance(), mother.getDistance());
            var individualDistance = this._GeneticOperator.cross(father.getDistance(), mother.getDistance(), bits);
            
            bits = this._GeneticOperator.getBitsForAttributes(father.getWeigth(), mother.getWeigth());
            var individualWeigth = this._GeneticOperator.cross(father.getWeigth(), mother.getWeigth(), bits);

            var newBorn = new Individual(individualWeigth, individualDistance, this._IndividualRepresentation.getIndividual(individualNumber), individualNumber);
            newIndividuals.push(newBorn);
            
        }
        
        return fitList.concat(newIndividuals);


    },
    isFit : function(pIndividual){

        //true if its fit, false if it isn´t
        if(pIndividual){

            var percentage = (pIndividual.getWeigth()*WEIGTH_PERCENTAGE/this._MaxWeigth)+
            (pIndividual.getDistance()*DISTANCE_PERCENTAGE/this._MaxDistance);

            if(percentage >= FITNESS_PERCENTAGE)
                return true;
            else
                return false;
        }
        else
            return false;
    },
    mainReproduct : function(){

        this.createInitialPopulation(this._TextManager.getListOfWords());

        while(this._KeepReproducing){
            if(this.verifyStop()){
                this.stop();
            }
            else{
                //create new generation, replace, cross, etc.
                this.replaceCurrentPopulation(this.createNewGenerations());
            }
        }
        this.getFinalIndividuals();
    },
    getFinalIndividuals: function(){

        var listOfWords = [];
        var finalIndividuals = [];
        var processedWords = [];
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            listOfWords.push(this._Population[indexOfArray].getWordString());
        }
        this._TextManager.setListOfWords(listOfWords);
        
        for(var indexOfArray=0; indexOfArray<listOfWords.length; indexOfArray++){
            var selection=listOfWords[indexOfArray];
            if (processedWords.indexOf(selection) === -1){
                var individual= new Individual(this._TextManager.calculateWeight(selection), this._TextManager.calculateDistance(selection),
                this._TextManager.calculateTotalDistance(selection), selection,0);
                finalIndividuals.push(individual); 
                processedWords.push(selection);
            }
        }
        
        finalIndividuals.sort(function compare(indivudalA,individualB){
            if (indivudalA.getDistance() < individualB.getDistance())
                return 1;
            if (indivudalA.getDistance() > individualB.getDistance())
                return -1;
            return 0;
            }
        );
        var result = "";
        for(var indexOfArray=0; indexOfArray<finalIndividuals.length; indexOfArray++){
            result +=finalIndividuals[indexOfArray].getWordString() + " peso = " + finalIndividuals[indexOfArray].getWeigth() + " distancia = "
            + finalIndividuals[indexOfArray].getDistance() + " distancia total = " + finalIndividuals[indexOfArray].getTotalDistance() + " -- ";
        }
        alert(result);
        
        
        
        /*var listOfIndividuals = [];

        /*var result="";
        for(var indexOfArray = 0 ; indexOfArray<this._Population.length; indexOfArray++){
            result += this._Population[indexOfArray].getWordString();
            result+=" - ";
        }
        alert(result);*/ //print poblacion final

        /*var listOfIndividuals = [];
        var individualFound= false;
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            for(var indexSecondArray = 0; indexSecondArray< listOfIndividuals.length; indexSecondArray++){
                if(this._Population[indexOfArray].getWordString()===listOfIndividuals[indexSecondArray].individual.getWordString()){
                    listOfIndividuals[indexSecondArray].amount++;
                    individualFound=true;
                    break;
                }
            }
            if(individualFound){
                individualFound=false;
            }else{//only happens for the first appearance
                listOfIndividuals.push({individual: this._Population[indexOfArray], amount: 1});
            }
        }

        listOfIndividuals.sort(function compare(indivudalA,individualB){
            if (indivudalA.amount < individualB.amount)
                return 1;
            if (indivudalA.amount > individualB.amount)
                return -1;
            return 0;
            }
        );

        this._Population=[];
        var result = "";
        for(var indexOfArray = 0 ; indexOfArray < 10; indexOfArray++){
            result += listOfIndividuals[indexOfArray].individual.getWordString()+ "  " + listOfIndividuals[indexOfArray].amount;
            result+=" - ";
            this._Population.push(listOfIndividuals[indexOfArray].individual);
        }
        alert(result);*/
    },
    calculateMaxValues: function(){

        this._MaxWeigth = 0;
        this._MaxDistance = 0;

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){ //values for fitness//este for me suena que es un metodo aparte, par aque se vea mas bonito jaja
            if(this._Population[indexOfArray].getWeigth()>this._MaxWeigth){

                this._MaxWeigth=this._Population[indexOfArray].getWeigth();
            }
            if(this._Population[indexOfArray].getDistance()>this._MaxDistance){

                this._MaxDistance=this._Population[indexOfArray].getDistance();
            }
        }
    },
    calculateMaxTotalDistance: function(){

        this._MaxTotalDistance=0;

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){ //values for fitness//este for me suena que es un metodo aparte, par aque se vea mas bonito jaja
            if(this._Population[indexOfArray].getTotalDistance()>this._MaxTotalDistance){

                this._MaxTotalDistance=this._Population[indexOfArray].getTotalDistance();
            }
        }
    },
    getMaxValues: function(){

        this.calculateMaxValues();
        this.calculateMaxTotalDistance();

        var arrayValues= [this._MaxWeigth, this._MaxDistance, this._MaxTotalDistance];

        return arrayValues;
    },
    getPopulation: function(){

        return this._Population;
    },
    setRepresentationForInitialPopulation : function(){

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            
            var individual = this._Population[indexOfArray];
            individual.setWordRepresentation(this._IndividualRepresentation.getRepresentation(individual.getWordString()));
        }
    }
});





