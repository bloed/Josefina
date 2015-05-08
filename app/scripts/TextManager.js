/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TextManager = Class.extend({
    init: function(pathName){
        this._PathName = pathName;
    },
    setPathName: function(pPathName){
        this._PathName = pPathName;
    },
    getPathName: function(){
        return this._PathName;
    }
});

