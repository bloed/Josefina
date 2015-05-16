var GeneticManager= Class.extend({
    init: function(){
        this._Population = []; 
        this._KeepReproducing = true;
        this._IndividualRepresentation = new IndividualRepresentation();
        this._GeneticOperator = new GeneticOperator();
    },
    createInitialPopultaion: function(pListOfWords){
        //creates new Individuals 
        //needs to call calculateChromosomatic Representation
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





