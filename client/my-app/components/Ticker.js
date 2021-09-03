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
        console.log('inn')
        for (var index = 0; index < nasdaqList.length; ++index) {
          var animal = nasdaqList[index];
          // console.log(animal.Symbol);
          if (animal.Symbol === ticker){
            var p = document.createElement("p");
            var text = document.createTextNode(animal.Name);
            p.appendChild(text);
            document.getElementById('details').appendChild(p);
            
            var a = document.createElement("p");
            text = document.createTextNode('Last Sale : ' + animal["Last Sale"] + "  |  " + "% Change: " + animal["% Change"] + ' | ' + ' Volume: ' + animal.Volume);
            a.appendChild(text);
            document.getElementById('details').appendChild(a);

            break;
          }
      }
    }, [ticker]);


    return (
      <div className="App">
        <Counter parentCallback={callback} />
        <h2>{ticker}</h2>
        <div id="details">

        </div>
      </div>
    );
  }