import React, { useState } from 'react';
import PasswordChangeSuccess from './PasswordChangeSuccess';
import OtpSection from './OtpSection';
import ForgotEmailSection from './ForgotEmailSection';

function ForgotPasswordSection() {
  const [step, setStep] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = () => {
    setSubmitSuccess(true);
  };
  return (
    <div className="w-full pb-14 pt-16 mt-5 px-6 md:px-8  lg:px-12 rounded-xl bg-lightgreen">
      {!submitSuccess && (
        <div>
          <div className="text-center py-5 ">
            <p className="text-16 md:text-20">
              Forgot your Password? No Worries
            </p>
            <span className="text-12">
              Just in simple 2 steps, you can change your password.
            </span>
          </div>
          <div className="mx-10 md:mx-12 lg:mx-20 my-8 relative">
            <hr></hr>
            <div className="bg-bluewhale w-10 h-10 absolute flex justify-center items-center -top-5  left-0   rounded-full">
              1
            </div>
            <div
              className={`${
                step ? 'bg-bluewhalelight' : 'bg-bluewhale'
              } w-10 h-10 absolute flex justify-center items-center -top-5  right-0   rounded-full `}
            >
              2
            </div>
          </div>
          {step ? (
            <ForgotEmailSection setStep={setStep} />
          ) : (
            <OtpSection handleSubmit={handleSubmit} />
          )}
        </div>
      )}
      {submitSuccess && <PasswordChangeSuccess />}
    </div>
  );
}

export default ForgotPasswordSection;
