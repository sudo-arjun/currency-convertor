import React, { useState, useEffect } from 'react'
import arrowImg from './assets/up-and-down-arrow.png'
import InputCon from './components/InputCon'
import useApi from './hooks/useApi';
function CurConvertor() {
    const [fromAmount, setFromAmount] = useState();
    const [fromCur, setFromCur] = useState('INR');
    const [toCur, setToCur] = useState('USD');
    const [toAmount, setToAmount] = useState();
    const [options,exchangeRates={'INR':80}] = useApi();
   console.log(options,exchangeRates)
    function calculate() {
        // console.log(fromAmount,fromCur,exchangeRates,toCur)
        let usd = fromAmount / exchangeRates[fromCur];
        let result = (usd * exchangeRates[toCur]).toFixed(2);
        setToAmount(() => result);
    }
    useEffect(() => {
        calculate();
        // console.log('calculated')
    }, [fromAmount, toCur, fromCur])

    function swap(){
        setFromAmount(toAmount);
        setToAmount(fromAmount)
        setFromCur(()=>toCur);
        setToCur(()=>fromCur);
    }
    return (
        <div className='h-screen w-screen bg-cover bg-img-sm lg:bg-img-wide flex justify-center items-center' >
            <div className='rounded-xl shadow-md flex flex-col justify-evenly items-center w-9/12 h-96 sm:h-[330px] sm:w-[450px] backdrop-blur-md bg-white/30 '>
                <InputCon iState={fromAmount} iSetState={setFromAmount} iLabelName='From' sLabelName='currency' sState={fromCur} sSetState={setFromCur} optionObj={options}></InputCon>
                <button onClick={swap} className=' -m-12 h-12 w-12 p-1.5 rounded-xl hover:shadow-lg transition ease-out duration-200 delay-75 hover:bg-white/10 flex justify-center items-center'>
                    <img src={arrowImg} alt="swap" className='w-11/12 drop-shadow-md' />
                </button>
                <InputCon iState={toAmount} iSetState={setToAmount} iLabelName='To' sLabelName='currency' sState={toCur} sSetState={setToCur} optionObj={options} ireadOnly={true}></InputCon>
            </div>
        </div>
    )
}

export default CurConvertor