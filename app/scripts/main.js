var textManager = new TextManager();
//var ThreeDScreen= new ThreeDManagement();
$("document").ready(function() {//the first to be executed
    $("#BTNLoad").bind("click",loadPhrase);
    document.getElementById('INPfile').addEventListener('change', loadText, false);
    $("#BTNLoad").toggle();
    $("#TXTPhraseToLoad").toggle(); 
    $("#LBLInformation").toggle();
    //ThreeDScreen.addWord("Hello World", 2.5, 2.5, 2.5, 10, 0xff3300);
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
    textManager.getNWords(indexOfPhraseToLoad , AMOUNT_OF_WORDS , 1);
    alert("Get next :");
    alert (arrayToString(textManager.getListOfWords()));
    textManager.getNWords(indexOfPhraseToLoad , AMOUNT_OF_WORDS , -1);
    alert("Get before + Get next");
    alert (arrayToString(textManager.getListOfWords()));
}
function arrayToString(pArray){
    var result="";
    for(var indexOfArray = 0 ; indexOfArray<pArray.length; indexOfArray++){
        result += pArray[indexOfArray];
        result+=" - ";
    }
    return result;
}