import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Recommend from './Recommend';

const Survey = () => {
    const [step, setStep] = useState(1);
    const [arr, setArr] = useState([]);
    const [checkList1, setCheckList1] = useState([false, false, false, false, false, false]);
    const [checkList2, setCheckList2] = useState([false, false, false]);
    const [checkList3, setCheckList3] = useState([false, false, false]);
    const [checkList4, setCheckList4] = useState([false, false, false, false]);
    const [checkList5, setCheckList5] = useState([false, false, false]);


    // const changeInput = (id) => {
    //     const {value, name} = id.target
    //     setForm({
    //         ...form,
    //         [name] : value
    //     })
    // }
    const nextSteps = () => {
        setStep(step+1);
    }
    const prevSteps = () => {
        setStep(step-1);
    }

    return (
        <div className='wrap'>
            {
                step === 1 &&
                <Step1 checkList={checkList1} arr={arr} nextSteps={nextSteps} />
            }
            {
                step === 2 &&
                <Step2 checkList={checkList2} arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 3 &&
                <Step3 checkList={checkList3} arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 4 &&
                <Step4 checkList={checkList4} arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 5 &&
                <Step5 checkList={checkList5} arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 6 &&
                <Recommend prevSteps={prevSteps}/>
            }
        </div>
    )
}

export default Survey;