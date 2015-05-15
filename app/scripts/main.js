var textManager = new TextManager();
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
    } 
    else { 
        alert("Couldnt load the file.");
    }
}
function loadPhrase(){
    textManager.setText(caca);
    var phraseToLoad = $('#TXTPhraseToLoad').val();
    var indexOfPhraseToLoad = textManager.getText().indexOf(phraseToLoad);
    var listOfWords = [];
    textManager.getNWords(listOfWords , indexOfPhraseToLoad , AMOUNT_OF_WORDS , 1);
    alert("Get next :");
    alert (arrayToString(listOfWords) + "con un total de "  + listOfWords.length + " palabras");
    textManager.getNWords(listOfWords , indexOfPhraseToLoad , AMOUNT_OF_WORDS , -1);
    alert("Get before + Get next");
    alert (arrayToString(listOfWords) + "con un total de "  + listOfWords.length + " palabras");
}
function arrayToString(pArray){
    var result="";
    for(var indexOfArray = 0 ; indexOfArray<pArray.length; indexOfArray++){
        result += pArray[indexOfArray];
        result+=" - ";
    }
    return result;
}