import React, { useId } from 'react'

function InputCon({
    iLabelName = 'Amount',
    ireadOnly = false,
    iState,
    iSetState,
    sLabelName = 'Choose',
    sState,
    sSetState,
    optionObj = { 'inr': 'indian rupee' },
}) {
    let selectId = useId();
    let inId = useId();
    let optionArr = Object.entries(optionObj);
    let options = optionArr.map(([i, text]) => <option key={i} value={i}>{text}</option>);
    return (
        <div className='w-10/12 h-20 bg-white text-black flex rounded-lg'>
            <div className='w-3/5 flex flex-col'>
                <label htmlFor={inId} className='px-2 pt-0.5 text-slate-500' >{iLabelName}</label>
                <input type='number' value={iState} onChange={(e) => iSetState(e.target.value)} id={inId} className='flex-grow focus:outline-none px-2 rounded-lg read-only:text-slate-600' readOnly={ireadOnly} placeholder={0}></input>
            </div>
            <div className='w-2/5 flex flex-col'>
                <label htmlFor={selectId} className='text-slate-500 px-2 pt-0.5'>{sLabelName}</label>
                <select id={selectId} value={sState} onChange={(e) => sSetState(() => e.target.value)} className='flex-grow focus:outline-none bg-white rounded-lg'>
                    {options}
                </select>
            </div>
        </div>
    )
}

export default InputCon;