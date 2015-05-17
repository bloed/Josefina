var GeneticOperator= Class.extend({
    init: function(){
        
    },
    mutation: function(pIndividual){
        //not of a bit
        var mutationNumber = Math.floor(Math.random()*100);
        if(mutationNumber<MUTATION_PROBABILITY){   //it exists in th minority
        	var mutationPoint=Math.floor(Math.random()*(AMOUNT_OF_BITS-1));
        	var bitMask= 1<<mutationPoint;
        	pIndividual=pIndividual^bitMask;
        }
        return pIndividual;
    },
    cross:function (pFather, pMother){
        //variable point
        var crossPoint=Math.floor((Math.random()*(AMOUNT_OF_BITS-1))+1);
        alert(crossPoint);
        pFather=pFather>>>(AMOUNT_OF_BITS-crossPoint);
        pFather= pFather<<(AMOUNT_OF_BITS-crossPoint);
        var motherMask=pMother>>>(AMOUNT_OF_BITS-crossPoint);
        motherMask=motherMask<<(AMOUNT_OF_BITS-crossPoint);
        pMother=pMother^motherMask;
        this.mutation(pFather+pMother);
    }
});



