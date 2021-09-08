import React from 'react'
import Axios from 'axios'
import { useCallback, useState, useEffect } from "react";
import { Line } from 'react-chartjs-2'

import Counter from '../components/Input'

export default function App() {
  //getting userInput into 'ticker' using callbacks
  const[ticker, setTicker] = useState("");
  const callback = useCallback((ticker) => {
    setTicker(ticker);
  }, []);
  
  var arry = [];
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
        for (var i = 0; i < response.data.length; ++i) {
          var tmp = response.data[i];
          arry.push(+tmp);
        }

        console.log(arry);
        var h3 = document.createElement("h3");
        var text = document.createTextNode('wsb mentioned ' + ticker + ' ' + response.data + ' times');
        h3.appendChild(text);
        document.getElementById("details").appendChild(h3);
      })

  }, [ticker]);

  //data for the chart
  var dataPoints = { 
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    labels: ['hour', 'day', 'week', 'month', 'year', 'all'],
    datasets: [
        {
            labels: '# of Mentions',
            data: [arry[2]],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
  };

  var options = {
      scales: {
          yAxes: {
              beginAtZero: true,
          }
      }
  }
  
  return (
    <div className="App">
      <Counter parentCallback={callback} />
      <h2>{ticker}</h2>
      <div id="details"></div>
      <Line id='line' data={dataPoints} options={options}/>
      {/* <Chart data={dataPoints} onChildClick={clickAlert}/> */}
    </div>
  );
}