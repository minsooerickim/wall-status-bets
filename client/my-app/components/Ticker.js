import React from 'react'
import Axios from 'axios'
import { useCallback, useState, useEffect } from "react";
// import { Line } from 'react-chartjs-2'
import Chart from '../components/Chart'
import Pie from '../components/Pie'
import Counter from '../components/Input'
import styles from '../styles/ticker.module.css'
// import Dropdown from '../components/Dropdown'

export default function App() {
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  //getting userInput into 'ticker' using callbacks
  const[ticker, setTicker] = useState("");
  const callback = useCallback((ticker) => {
    setTicker(ticker);
  }, []);
  
  const arry = [];
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
        
        document.getElementById("mentionsDescription").innerHTML = "";
        var h3 = document.createElement("p");
        var text = document.createTextNode(arry[0] + ' times in the past hour');
        h3.appendChild(text);
        document.getElementById("mentionsDescription").appendChild(h3);

        h3 = document.createElement("p");
        text = document.createTextNode(arry[1] + ' times in the past day');
        h3.appendChild(text);
        document.getElementById("mentionsDescription").appendChild(h3);

        h3 = document.createElement("p");
        text = document.createTextNode(arry[2] + ' times in the past week');
        h3.appendChild(text);
        document.getElementById("mentionsDescription").appendChild(h3);

        h3 = document.createElement("p");
        text = document.createTextNode(arry[3] + ' times in the past month');
        h3.appendChild(text);
        document.getElementById("mentionsDescription").appendChild(h3);

        h3 = document.createElement("p");
        text = document.createTextNode(arry[4] + ' times in the past year');
        h3.appendChild(text);
        document.getElementById("mentionsDescription").appendChild(h3);


        setChartData({
          labels: ['hour', 'day', 'week', 'month', 'year'],
          datasets: [
            {
              label: '# of Mentions',
              data: [arry[0], arry[1], arry[2], arry[3], arry[4]],
              fill: false,
              backgroundColor: '#c3532b',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        })

        setPieData({
          labels: ['hour', 'day', 'week', 'month', 'year'],
          datasets: [
            {
              label: '# of Mentions',
              data: [arry[0], arry[1], arry[2], arry[3], arry[4]],
              backgroundColor: [
                '#c3532b',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)'
              ],
              borderColor: 'rgba(0,0,0)',
            },
          ],
        })
        if (arry[4] != 0) {
          //hiding loading animation once all content loaded
          var x = document.getElementById("loading");
          x.style.display = "none";
          
          //displaying loaded content and previously hidden searchbar
          var x = document.getElementById("hide");
          x.style.display = "block";

          var x = document.getElementById("disappear");
          x.style.display = "block";
        }
      })
  }, [ticker]);

  return (
    <div className="App">
      <Counter parentCallback={callback} />
      {/* <h2>{ticker}</h2> */}
      
      <div id="hide" className={styles.hide}>
        <h2 className={styles.red}>{ticker}</h2>
        <div id="details"></div>
        
        <div className={styles.row}>

          <div className={styles.pie}>
            <Pie className={styles.pie} chartData={pieData} />
          </div>
          
          <div className={styles.description}>
            <p className={styles.codeHeader}>
              <code className={styles.code}>r/wallstreetbets</code>
              {' '} mentioned <span className={styles.red}>{ticker}</span>
            </p>
            <div id="mentionsDescription"></div>
          </div>
          
        </div>

        <div>
          <Chart chartData={chartData} />
        </div>
        
      </div>
    </div>
  );
}