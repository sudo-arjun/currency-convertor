import { useState, useEffect } from 'react';

function useApi() {
    const [cur, setCur] = useState();
    const [rates, setRates] = useState();

    useEffect(() => {
        //check if data exits in local storage and is up to date
        //if not then get the data and set to local storage
        let curObj = JSON.parse(localStorage.getItem('cur'));
        let ratesObj = JSON.parse(localStorage.getItem('rates'));
        if (curObj) 
            setCur(() => curObj)
        else {
            fetch(`https://openexchangerates.org/api/currencies.json?app_id=${import.meta.env.VITE_CUR_KEY}`)
                .then((res) => res.json())
                .then((obj) => {
                    curObj = obj;
                    setCur(() => curObj)
                    localStorage.setItem('cur', JSON.stringify(curObj));
                })
                .catch((e) => console.log(e))
        }

        if (ratesObj){
            // ratesObj.timestamp contains time in sec, so converted currentTime to sec.
            let currentTime = Date.now() / 1000;
            if((currentTime - ratesObj.timestamp) > 24*60*60){
                //fetch new rates
                console.log('new data fetched')
                 fetch(`https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_CUR_KEY}`)
                .then((res) => res.json())
                .then((obj) => {
                    ratesObj = obj;
                    // setRates(() => ratesObj.rates);
                    localStorage.setItem('rates', JSON.stringify(ratesObj));
                })
                .catch((e) => console.log(e))
            }
            setRates(ratesObj.rates)
        }
        else {
            fetch(`https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_CUR_KEY}`)
                .then((res) => res.json())
                .then((obj) => {
                    ratesObj = obj;
                    setRates(() => ratesObj.rates);
                    localStorage.setItem('rates', JSON.stringify(ratesObj));
                })
                .catch((e) => console.log(e))
        }
    }, [])

    return [cur, rates];
}
export default useApi;


/*
import { useState, useEffect } from 'react';

function useApi() {
    const [cur, setCur] = useState();
    const [rates, setRates] = useState();
    const curUrl = 'https://openexchangerates.org/api/currencies.json?app_id=b9063577d64e4a18b23c9106c8582c82';
    const rateUrl = 'https://openexchangerates.org/api/latest.json?app_id=b9063577d64e4a18b23c9106c8582c82';
    useEffect(() => {
        async () => {
            //check if data exits in local storage and is up to date
            //if not then get the data and set to local storage
            let curObj = JSON.parse(localStorage.getItem('cur'));
            let ratesObj = JSON.parse(localStorage.getItem('rates'));
            if (curObj)
                setCur(() => curObj)
            else {
                curObj = await myFetch(curUrl);
                setCur(() => curObj)
                localStorage.setItem('cur', JSON.stringify(curObj));
            }

            if (ratesObj) {
                // ratesObj.timestamp contains time in sec, so converted currentTime to sec.
                let currentTime = Date.now() / 1000;
                if ((currentTime - ratesObj.timestamp) > 24 * 60 * 60) {
                    //fetch new rates
                    ratesObj = await myFetch(rateUrl);
                    localStorage.setItem('rates', JSON.stringify(ratesObj));
                }
                setRates(ratesObj.rates)
            }
            else {
                ratesObj = await myFetch(rateUrl);
                setRates(() => ratesObj.rates);
                localStorage.setItem('rates', JSON.stringify(ratesObj));
            }
        }
    }, [])


    return [cur, rates];
}
export default useApi;

async function myFetch(url) {
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((obj) => {
    //         return obj;
    //     })
    //     .catch((e) => console.log(e))
    try {
        let res = await fetch(url);
        let obj = await res.json();
        return obj;
    }
    catch (e) {
        console.log(e);
    }

}
*/