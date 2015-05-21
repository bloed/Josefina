var textManager = new TextManager();
var geneticManager = new GeneticManager(textManager);

$("document").ready(function() {//the first to be executed
    $("#BTNLoad").bind("click",loadPhrase);
    document.getElementById('INPfile').addEventListener('change', loadText, false);
    $("#BTNLoad").toggle();
    $("#TXTPhraseToLoad").toggle(); 
    $("#LBLInformation").toggle();
    
    
});
function loadText(evt){
    var file = evt.target.files[0];//gets the file (and only) which was given by the user 
    if (file) {
        textManager.getAllText(file);
        $("#LBLInformation").toggle();
        $("#BTNLoad").toggle();
        $("#TXTPhraseToLoad").toggle();
        $("#INPfile").toggle();
        $('#TXTPhraseToLoad').val("Nuestra cantora");
    } 
    else { 
        alert("Couldnt load the file.");
    }
}
function loadPhrase(){
    var phraseToLoad = $('#TXTPhraseToLoad').val();
    var indexOfPhraseToLoad = textManager.findIndexOfPhrase(phraseToLoad);
    textManager.getNWords(indexOfPhraseToLoad , AMOUNT_OF_WORDS , 1);
    textManager.getNWords(indexOfPhraseToLoad , AMOUNT_OF_WORDS , -1);
    //prueba de calcular disdtancia, distancia total y peso
    //alert(textManager.calculateDistance("josefina"));
    //alert(textManager.calculateAverageOfDistances());
    //alert(textManager.calculateTotalDistance("Josefina"));
    //alert(textManager.calculateWeight("cantora"));
    textManager.calculateAverageOfDistances();
    geneticManager.mainReproduct();

    var threeDScreen= new ThreeDManagement();
    threeDScreen.insertWordsPlane(geneticManager.getPopulation(), geneticManager.getMaxValues());

    
}
/*
function arrayToString(pArray){
    var result="";
    for(var indexOfArray = 0 ; indexOfArray<pArray.length; indexOfArray++){
        result += pArray[indexOfArray];
        result+=" - ";
    }
    return result;
}*/