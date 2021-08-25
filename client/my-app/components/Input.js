import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Input() {
    const [tickerList, setTickerList] = useState([]);
    const [nasdaqList, setNasdaqList] = useState([]);
    const[Input, setInput] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:3001/read').then((response) => {
            setTickerList(response.data)
        })
    }, []);
    useEffect(() => {
        Axios.get('http://localhost:3001/nasdaq').then((response) => {
            setNasdaqList(response.data)
        })
    }, []);
    
    const handleChange = (e) => {
        setInput({
            ...Input,
            [e.target.name]: e.target.value.trim()
        })
    }
    const handleSubmit = (e) => {
        Axios.get("http://localhost:3001/nasdaq", Input).catch(function (err) {
            console.log(err);
        })
        var check = 0;
        var inputVal = Input;

        for (var index = 0; index < nasdaqList.length; ++index) {

            var animal = nasdaqList[index];
            // console.log(animal.Symbol);
            if(animal.Symbol == Input.ticker){
               check = 1;
            }
           }
           if (check == 1) {
               console.log("FOUND");
           }
           else {
               alert("Please enter a valid ticker!");
           }
        if (check) {
            Axios.post("http://localhost:3001/insert", Input);
            
            window.location = '/searchResult';
        }
    };
    return (
        <div>
            <label>
                Ticker:
                <input name="ticker" onChange={handleChange} placeholder="TSLA"/>
            </label>
            <button onClick={handleSubmit}>Rate</button>

            <h1>Wall-Status-Bets.io Trending</h1>

            {tickerList.map((val, key) => {
                return (
                    <div key={key}>
                        <h1> {val.ticker}</h1>
                    </div>
                )
            })}

        </div>
    )
}