var Vlab = {

    div : null,

    setletiant : function(str){},
    setPreviosSolution: function(str){},
    setMode: function(str){},

    //Инициализация ВЛ
    init : function(){
        this.div = document.getElementById("jsLab");
        // this.div.innerHTML = this.window;
        // document.getElementById("tool").innerHTML = this.tool;

        //получение варианта задания
        let ins = document.getElementById("preGeneratedCode").value + " " + document.getElementById("calculatedCode").value +
            " " + document.getElementById("previousSolution").value;

        this.div.innerHTML = ins;
    },

    getCondition: function(){},
    getResults: function(){ return "results"},
    calculateHandler: function(text, code){},
};

window.onload = function() {
    Vlab.init();
};