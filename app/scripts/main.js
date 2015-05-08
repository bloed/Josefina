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
    alert("loading prhase");
    textManager.setText(caca);
    var phraseToLoad = $('#TXTPhraseToLoad').val();
    document.write(phraseToLoad);
    document.write(textManager.getText());
}