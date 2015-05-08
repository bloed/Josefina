/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var caca = "sin inicializar";
var TextManager = Class.extend({
    init: function(){
        this._Text = "No current text.";
    },
    getText: function(){
        return this._Text;
    },
    setText: function(pText){
        this._Text = pText;
    },
    getAllText: function(file){
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) { 
	    var contents = e.target.result;
            alert( "Got the file!");
            caca= contents.toString();
        };
    }
});

