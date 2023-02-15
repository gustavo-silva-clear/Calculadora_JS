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
        console.log("aC")

    }

    cE() {

        this._operation.pop();

    }

    getLastOperation(value) {

        return this._operation[this._operation.length - 1];

    }

    addOperation(value){

        this._operation.push(value);
        console.log(this._operation);

        

    }

    setError(){

        this.displayCalc = "Error";
        
    }

    execBtn(value){

        switch (value) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                
                break;

            case 'subtracao':
                
                break;

            case 'divisao':
                
                break;

            case 'porcento':
                
                break;

            case 'igual':
                
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

