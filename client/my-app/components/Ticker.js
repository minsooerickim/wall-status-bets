import React from 'react'
import Axios from 'axios'
import { useCallback, useState, useEffect } from "react";
import Counter from '../components/Input'

export default function App() {
    //getting userInput into 'ticker' using callbacks
    const[ticker, setTicker] = useState("");
    const callback = useCallback((ticker) => {
      setTicker(ticker);
    }, []);
    

    const [nasdaqList, setNasdaqList] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3001/nasdaq').then((response) => {
            setNasdaqList(response.data)
        })
    }, []);

    for (var index = 0; index < nasdaqList.length; ++index) {

        var animal = nasdaqList[index];
        // console.log(animal.Symbol);
        if(animal.Symbol == ticker){
           console.log(animal.Symbol)
           console.log(animal.Name);
           console.log(animal["Last Sale"]);
           console.log(animal["Net Change"]);
           console.log(animal["% Change"]);
           console.log(animal["Market Cap"]);
           console.log(animal.Country);
           console.log(animal["IPO Year"]);
           console.log(animal.Volume);
           console.log(animal.Sector)
           console.log(animal.Industry);
           
        }
    }

    return (
      <div className="App">
        <Counter parentCallback={callback} />
        <h2>{ticker}</h2>
        {/* <p>{animal.Name}</p> */}
      </div>
    );
  }