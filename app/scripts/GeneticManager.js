var GeneticManager= Class.extend({
    init: function(pTextManager){
        this._Population = []; 
        this._KeepReproducing = true;
        this._IndividualRepresentation = new IndividualRepresentation();
        this._GeneticOperator = new GeneticOperator();
        this._TextManager= pTextManager; //needed for methods to calculate values of words, it may go somehwere else though
    },
    createInitialPopulation: function(pListOfWords){
        for(var indexOfArray=0; indexOfArray<pListOfWords.length; indexOfArray++){
            var individual= new Individual(this._TextManager.calculateWeight(pListOfWords[indexOfArray]),
                this._TextManager.calculateDistance(pListOfWords[indexOfArray]),
                this._TextManager.calculateTotalDistance(pListOfWords[indexOfArray]), pListOfWords[indexOfArray]);
            this._Population.push(individual);
            
        }
        this._IndividualRepresentation.calculateChromosomaticRepresentation(this._Population); 
    },
    replaceCurrentPopulation: function (pListOfIndividuals){
        this._Population = pListOfIndividuals;
    },
    stop : function(){
        this._KeepReproducing = false;
    },
    verifyStop : function(){
        //verifies if there are 10 different types of individuals and a given number of indivuals
    },
    createNewGenerations: function(){
        //calls isFit, cross and mutation, and replace the current generation
    },
    isFit : function(pIndividual){
        //true if its fit, false if it isn´t
    }
});





