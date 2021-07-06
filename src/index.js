import React from 'react';
import ReactDOM from 'react-dom';

function TemperatureInput(props){

    return(
        <label>
            {props.escala === 'c' ? 'Celsius' : 'Fahrenheit'}
                <input  type="text" 
                        name={props.escala} 
                        value={props.temperatura} 
                        onChange={props.onChange}/>
        </label>
    );
}

class Calculator extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            escalas: {
                fahrenheit: {
                    escala: 'f',
                    temperatura: '95'
                },
                celsius: {
                    escala: 'c',
                    temperatura: '35'
                }
            }
        };
        this.handleTemperaturaChange = this.handleTemperaturaChange.bind(this);
    }

    toCelsius(fahrenheit)
    {
        return (fahrenheit-32) *5/9;
    }

    toFahrenheit(celsius){
        return (celsius *9/5) + 32;
    }

    tryConvert(temperatura, conversor){
        const input = parseFloat(temperatura);
        
        if(isNaN(input)){
            return '';
        }

        const output = conversor(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    } 

    handleTemperaturaChange(e){
        if(e.target.name === 'c'){
            this.setState(
                {
                    escalas: {
                        fahrenheit: {
                            escala: 'f',
                            temperatura: this.tryConvert(e.target.value, this.toFahrenheit)
                        },
                        celsius: {
                            escala: 'c',
                            temperatura: e.target.value
                        }
                    }
                });
        }
        else if(e.target.name === 'f'){
            this.setState(
                {
                    escalas: {
                        fahrenheit: {
                            escala: 'f',
                            temperatura: e.target.value
                        },
                        celsius: {
                            escala: 'c',
                            temperatura: this.tryConvert(e.target.value, this.toCelsius)
                        }
                    }
                });
        }
    }

    render(){
        const escalas = this.state.escalas;
        return Object.keys(escalas).map((key, index)=> <TemperatureInput temperatura={escalas[key].temperatura} escala={escalas[key].escala} onChange={this.handleTemperaturaChange}/>);
    };

}

ReactDOM.render(
                    <Calculator/>, 
                    document.getElementById('root'
                ));