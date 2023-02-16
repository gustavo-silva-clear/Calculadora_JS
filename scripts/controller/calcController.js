//puxa do HTML os id's e define todos os atributos em que serão modificadas as informações e mostradas ao usuario
class CalcController {

    constructor() {
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this._operation = [];



    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);// atualiza a hora a cada 1000 milisegundos
    }
    // metodo pra definir todos os parametros de data e hora

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false)

        });

    }

    aC() {

        this._operation = [];

    }

    cE() {

        this._operation.pop();

    }

    getLastOperation(value) {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;


    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)

    }

    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3)
        {
           

            this.calc();

            console.log(this._operation);

        }


    }

    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result , last];
        
        this.setLastNunberToDisplay();


    }


    setLastNunberToDisplay(){

    let lastNumber;

    for(let n  = this._operation.length - 1; n >= 0 ;n--)
    {
        
        if(!this.isOperator(this._operation[n]))
        {
        lastNumber = this._operation[n];
        break; 

        }

    }

    this.displayCalc = lastNumber;

    }

    addOperation(value) {

       // console.log("A" ,value ,isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())) 
        {

                if (this.isOperator(value)) 
                {

                  this.setLastOperation(value);

                }
                else if (isNaN(value)) 
                {

                    console.log("other" , value);

                }

                else 
                {

                    this.pushOperation(value);
                    this.setLastNunberToDisplay();

                }
        }

        else 
        {

            if(this.isOperator(value))
            {

               this.pushOperation(value);
                
            }

            else
            {
            //Nunber
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);

            this.setLastNunberToDisplay();
            }
        }
 

        //console.log(this._operation);
    }

    setError() {

        this.displayCalc = "Error";

    }

    execBtn(value) {

        switch (value) {

            case 'ac':
                this.aC();
                break;

            case 'ce':
                this.cE();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    }


    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g , #parts > g ");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");
                //console.log(textBtn)
                this.execBtn(textBtn);

            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        });


    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {

            day: "2-digit",
            month: "short",
            year: "numeric"

        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {

        return this._timeEl.innerHTML;

    }

    set displayTime(value) {

        return this._timeEl.innerHTML = value;

    }

    get displayDate() {

        return this._dateEl.innerHTML;
    }

    set displayDate(value) {

        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;

    }
}

