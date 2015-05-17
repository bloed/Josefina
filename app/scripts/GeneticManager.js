var GeneticManager= Class.extend({
    init: function(pTextManager){
        this._Population = []; 
        this._KeepReproducing = true;
        this._IndividualRepresentation = new IndividualRepresentation();
        this._GeneticOperator = new GeneticOperator();
        this._TextManager = pTextManager; //needed for methods to calculate values of words, it may go somehwere else though
    },
    createInitialPopulation: function(pListOfWords){
        for(var indexOfArray=0; indexOfArray<pListOfWords.length; indexOfArray++){
            var individual= new Individual(this._TextManager.calculateWeight(pListOfWords[indexOfArray]),
                this._TextManager.calculateDistance(pListOfWords[indexOfArray]),
                this._TextManager.calculateTotalDistance(pListOfWords[indexOfArray]), pListOfWords[indexOfArray]);
            this._Population.push(individual);
            
        }
        this._IndividualRepresentation.calculateChromosomaticRepresentation(this._Population);
        //this.mainReproduct();//main de la vara
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
        if (this._Population.length > MIN_AMOUNT_OF_INDIVIDUALS && listOfDifferentIndividuals.length > MIN_DIFFERENT_TYPE_OF_INDIVIDUALS){
            return true;
        }
        else{
            return false;
        }
        
    },
    createNewGenerations: function(){
        //calls isFit, cross and mutation, and replace the current generation
        var maxWeigth=0;
        var maxDistance=0;
        var fitList = [];//list of individuals considered fit

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){ //values for fitness//este for me suena que es un metodo aparte, par aque se vea mas bonito jaja
            if(this._Population[indexOfArray].getWeigth()>maxWeigth){
                maxWeigth=this._Population[indexOfArray].getWeigth();
            }
            if(this._Population[indexOfArray].getDistance()>maxDistance){
                maxDistance=this._Population[indexOfArray].getDistance();
            }
        }

        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            if(this.isFit(this._Population[indexOfArray], maxWeigth, maxDistance)){
                //Yo diria agregarlos a una lista de fits para la siguiente generacion, respcto al cruce 
                //no tengo idea de cuantos cruces hacer y con que criterio (random, lineal, todos con todos?)
                fitList.push(this._Population[indexOfArray]);
            }
        }

    },
    isFit : function(pIndividual, pMaxWeigth, pMaxDistance){
        //true if its fit, false if it isn´t
        if(pIndividual && pMaxWeigth && pMaxDistance){
            var percentage=(pIndividual.getWeigth()*WEIGTH_PERCENTAGE/pMaxWeigth)+
            (pIndividual.getDistance()*DISTANCE_PERCENTAGE/pMaxDistance);
            if(percentage > FITNESS_PERCENTAGE)
                return true;
            else
                return false;
        }
        else
            return false;
    },
    mainReproduct : function(){
        while(this._KeepReproducing){
            if(this.verifyStop()){
                this.stop();
            }
            else{
                //create new generation, replace, cross, etc.
            }
        }
    }
});





