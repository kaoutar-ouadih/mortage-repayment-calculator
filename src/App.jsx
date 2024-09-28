import { useState } from 'react'
import './App.css'

function App() {
const [mortageAmount, setMortageAmount] = useState('');
const [mortageTerm, setMortageTerm] = useState('');
const [interestRate, setInterestRate] = useState('');
const [mortageType, setMortageType] = useState('');
const [isSubmited, setIsSubmited] = useState(false);
const [validForm, setValidForm] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    setIsSubmited(true);
    if(mortageAmount && mortageTerm && interestRate && mortageType){
      setValidForm(true);
    }
  }

  function calculateMortage(amount, term, interestRate, type){
    let r = interestRate / (100 * 12);
    if(type === 'repayment'){ 
      let n = term * 12;
      return ((amount * r * (1 + r) ** n) / ((1 + r) ** n - 1)).toFixed(2);
    }
    else if(type == 'interest only'){
      return (amount * r).toFixed(2);
    }
  }

  function calculateTotalOverTerm(amount, term, interestRate, type){
    if(type === 'repayment'){
      return (calculateMortage(mortageAmount, mortageTerm, interestRate, mortageType) * term *12).toFixed(2);
    }
    else if( type === 'interest only'){
      let result = (calculateMortage(mortageAmount, mortageTerm, interestRate, mortageType) * term * 12) + +amount;
      return result.toFixed(2);
    }
  }

  function clearAll(){
    setMortageAmount('');
    setMortageTerm('');
    setInterestRate('');
    setMortageType('');
    setIsSubmited(false);
    setValidForm(false);
  }

  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center bg-slate100'>
      <div className='flex-col w-full tablet:w-[850px] bg-white flex tablet:flex-row rounded-2xl tablet:overflow-hidden'>
        <form className='flex-1 p-8' onSubmit={(e)=>handleSubmit(e)} noValidate>
          <div className='flex justify-between items-center mb-7'>
            <h1 className='text-2xl font-bold text-slate-700'>Mortgage Calculator</h1>
            <button onClick={clearAll} type='button' className='underline text-slate700'>Clear All</button>
          </div>
          {/* mortage amount */}
          <label htmlFor="mortage-amount" className='text-slate700 font-semibold block'>Mortgage Amount</label>
          <div className='mt-1 mb-5 group focus-within'>
            <div className='relative mb-2 '>
              <input id='mortage-amount' 
                  type="text" 
                  value={mortageAmount}
                  onChange={(e)=>setMortageAmount(e.target.value)}
                  required 
                  className={`w-full border  rounded-md h-10 pl-12 font-semibold text-slate700 hover:border-[1.5px] hover:cursor-pointer  focus:border-lime focus:border-[1.5px] outline-none ${(isSubmited && !mortageAmount) ? 'border-[1.5px] border-red': 'border-slate700'}`} />
              <span className={`absolute text-slate700 font-semibold left-[0.5px] top-[0.8px] w-10 h-[96%] flex justify-center items-center rounded-l-md group-focus-within:bg-lime ${isSubmited && !mortageAmount ? 'bg-red text-white' : 'bg-slate100'}`}>€</span>
            </div>
            {isSubmited && !mortageAmount && <span className='text-red font-semibold text-sm'>This field is required</span>}
          </div>
          {/* mortage term */}
          <div className='flex gap-4'>
            <div>
              <label htmlFor="mortage-term" className='text-slate700 font-semibold block'>Mortgage Term</label>
              <div className='mt-1 mb-5 group focus-within'>
                <div className='relative mb-2'>
                  <input id='mortage-term' 
                  type="text" 
                  value={mortageTerm}
                  onChange={(e)=>setMortageTerm(e.target.value)}
                  required 
                  className={`w-full border rounded-md h-10 p-3 font-semibold text-slate700 hover:border-[1.5px] hover:cursor-pointer focus:border-lime focus:border-[1.5px] outline-none ${isSubmited && !mortageTerm ? 'border-[1.5px] border-red': 'border-slate700'}`} />
                  <span className={`absolute text-slate700 font-semibold right-[0.7px] top-[0.8px] w-16 h-[96%] flex justify-center items-center rounded-r-md group-focus-within:bg-lime ${isSubmited && !mortageTerm ? 'bg-red text-white' : 'bg-slate100' }`}>years</span>
                </div>
                {isSubmited && !mortageTerm && <span className='text-red font-semibold text-sm'>This field is required</span>}
              </div>
            </div>
            {/* interest rate */}
            <div>
              <label htmlFor="interest-rate" className='text-slate700 font-semibold block'>Interest Rate</label>
              <div className='mt-1 mb-5 group focus-within'>
                <div className='relative mb-2'>
                  <input id='interest-rate' 
                    type="text" 
                    value={interestRate}
                    onChange={(e)=>setInterestRate(e.target.value)}
                    required 
                    className={`w-full border  rounded-md h-10 p-3 font-semibold text-slate700 hover:border-[1.5px] hover:cursor-pointer focus:border-lime focus:border-[1.5px] outline-none ${isSubmited && !interestRate ? 'border-[1.5px] border-red': 'border-slate700'}`}/>
                  <span className={`absolute text-slate700 font-semibold right-[0.7px] top-[0.8px] w-10 h-[96%]  flex justify-center items-center rounded-r-md group-focus-within:bg-lime ${isSubmited && !interestRate ? 'bg-red text-white' : 'bg-slate100' }`} >%</span>
                </div>
                {isSubmited && !interestRate && <span className='text-red font-semibold text-sm'>This field is required</span>}
              </div>
            </div>
          </div>
          {/* mortage type */}
          <span className='text-slate700 font-semibold block'>Mortgage Type</span>
          <div className='mb-6'>
            <div className={`border  rounded-md h-10 p-2 mb-2 mt-2 group hover:border-[1.5px] hover:cursor-pointer hover:border-lime ${mortageType === 'repayment'? 'bg-veryLightLime border-lime border-[1.5px]':'bg-white border-slate700'}`}>
              <input 
                type="radio" 
                id='repayment' 
                name='mortage-type'
                checked ={mortageType === 'repayment'}
                value='repayment'
                onChange={(e)=> setMortageType(e.target.value)} /> <label htmlFor="repayment"  className='text-slate-700 font-semibold ml-2'>Repayment</label>
            </div>
            <div className={`border  rounded-md mb-2 h-10 p-2 hover:border-[1.5px] hover:cursor-pointer hover:border-lime ${mortageType === 'interest only'? 'bg-veryLightLime border-lime border-[1.5px]':'bg-white border-slate700'}`}>
              <input 
              type="radio" 
              id='interest-only' 
              name='mortage-type'
              value='interest only'
              checked ={mortageType === 'interest only'}
              onChange={(e)=> setMortageType(e.target.value)} /> <label htmlFor="interest-only" className='text-slate-700 font-semibold ml-2'>Interest Only</label>
            </div>
            {isSubmited && !mortageType && <span className='text-red font-semibold text-sm'>This field is required</span>}
          </div>
           
          
          {/* submit btn */}
          <button aria-labelledby='calculate-btn' type='submit' className='bg-lime flex gap-2 py-3 px-7 rounded-full hover:bg-lightLime'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#133041" d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"/></svg>
            <span className='font-semibold' id='calculate-btn'>Calculate Repayments</span>
          </button>
        </form>
        {/* section 2 */}
        <div className='bg-slate900 flex-1 p-8  text-white tablet:rounded-bl-[70px]'>
          {!validForm && <div className='flex justify-center items-center flex-col h-full'>
            <img src="./assets/illustration-empty.svg" alt="" />
            <h4 className='text-2xl font-bold mb-3'>Results shown here</h4>
            <p className='text-center text-sm text-slate500'>
              Complete the form and click “calculate repayments” to see what 
              your monthly repayments would be.
            </p>
          </div>}
          {validForm && 
            <div>
               <h4 className='text-xl font-bold mb-2'>Your results</h4>
               <p className='text-sm text-slate500 mb-6'>Your results are shown below based on the information you provided. 
               To adjust the results, edit the form and click “calculate repayments” again.
               </p>
               <div className='bg-slate750 rounded-md p-6 flex flex-col'>
                <span className='text-sm text-slate500 mb-3'>Your monthly {mortageType === 'repayment'? 'repayments': 'interests'}</span>
                <span className='text-5xl text-lime font-semibold mb-6'>€{calculateMortage(mortageAmount, mortageTerm, interestRate, mortageType)}</span>
                <hr  />
                <span className='mt-6 text-sm text-slate500 mb-1'>Total you'll repay over the term</span>
                <span className='text-xl font-semibold'>€{calculateTotalOverTerm(mortageAmount, mortageTerm, interestRate, mortageType)}</span>
               </div>
            </div>
          }
          
        </div>

      </div>
    </div>
  )
}

export default App
 