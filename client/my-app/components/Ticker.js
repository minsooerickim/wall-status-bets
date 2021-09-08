import React from 'react'
import Axios from 'axios'
import { useCallback, useState, useEffect } from "react";
// import { Line } from 'react-chartjs-2'
import Chart from '../components/Chart'

import Counter from '../components/Input'

export default function App() {
  const [chartData, setChartData] = useState({});
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
      //search for comments
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


        setChartData({
          labels: ['hour', 'day', 'week', 'month', 'year'],
          datasets: [
            {
              labels: '# of Mentions',
              data: [arry[0], arry[1], arry[2], arry[3], arry[4]],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        })
      })

  }, [ticker]);
  


  return (
    <div className="App">
      <Counter parentCallback={callback} />
      <h2>{ticker}</h2>
      <div id="details"></div>
      

      <Chart chartData={chartData} />
    </div>
  );
}