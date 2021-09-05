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
          if (animal.Symbol === ticker) {
            //clear previous searches
            document.getElementById('details').innerHTML = "";

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
        //search for comments CHECK IF THIS WORKS
        var JSONobject = {"ticker": ticker};
        Axios.post('http://localhost:3001/search', JSONobject).then((response) => {
          console.log(response.data);
          var h3 = document.createElement("h3");
          var text = document.createTextNode('wsb mentioned ' + ticker + ' ' + response.data + ' times');
          h3.appendChild(text);
          document.getElementById("details").appendChild(h3);
        })
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