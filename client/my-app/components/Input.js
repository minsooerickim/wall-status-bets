import Axios from 'axios'
import React, { useState, useEffect } from "react";

import Loading from '../components/Loading'

import styles from '../styles/Input.module.css'

export default function Input({parentCallback}) {
    const [tickerList, setTickerList] = useState([]);
    const [nasdaqList, setNasdaqList] = useState([]);
    const[Input, setInput] = useState("");
    const[ticker, setTicker] = useState("");

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
        setTicker(Input.ticker)
        parentCallback(Input.ticker);

        var check = 0;

        for (var index = 0; index < nasdaqList.length; ++index) {

            var animal = nasdaqList[index];
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
            //loading animation
            var x = document.getElementById("loading");
            x.style.display = "flex";

            //hiding previous content and search bar while loading
            var x = document.getElementById("disappear");
            x.style.display = "none";
            var x = document.getElementById("hide");
            x.style.display = "none";

            Axios.post("http://localhost:3001/insert", Input).then((response) => {
                console.log(response.data);
                if (response.data === 'update') {
                    Axios.put('http://localhost:3001/updateCount', Input).then((response) => {
                        console.log('path taken');
                        console.log(response.data);
                    })
                }
            })

            {
                var div = '<h1>test</h1>';
                var dom = document.getElementsByClassName('resultBox');
                dom.innerHTML += div;
            }
        }
    };

    return (
        <div>
            <label className={styles.white}>
                Ticker{' '}:{' '}
                <input className={styles.white}name="ticker" onChange={handleChange} placeholder="TSLA"/>
            </label>
            <button id="submitButton" className={styles.white} onClick={handleSubmit}>Rate</button>

            {/* <div className={styles.resultBox}>
                <h3>{Input.ticker}</h3>
            </div> */}
            <div>
                <searchResult ticker={Input}/>
            </div>
            {/* wall status bets trending page */}
            {/* {tickerList.map((val, key) => {
                return (
                    <div key={key}>
                        <h1> {val.ticker}</h1>
                    </div>
                )
            })} */}

        </div>
    )
}