import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const Survey = () => {
    const [step, setStep] = useState(1);
    const [arr, setArr] = useState([]);

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
                <Step1 arr={arr} nextSteps={nextSteps} />
            }
            {
                step === 2 &&
                <Step2 arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 3 &&
                <Step3 arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 4 &&
                <Step4 arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
            {
                step === 5 &&
                <Step5 arr={arr} prevSteps={prevSteps} nextSteps={nextSteps} />
            }
        </div>
    )
}

export default Survey;