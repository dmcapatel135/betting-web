import React from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputField from '../../components/InputField/InputField';
import PropTypes from 'prop-types';

function ForgotEmailSection({ setStep }) {
  return (
    <div>
      <div className="text-center">
        <InputField
          type="text"
          inpClass="h-8 md:h-12 text-12 my-5  md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-lightgray"
          placeholder="Enter your email address"
        />
      </div>
      <div className="lg:flex items-center pb-20 text-center ">
        <ActionButton
          btnClass="bg-bluewhale w-full px-4 md:px-5 py-1 md:py-2 text-16 lg:text-20 rounded-lg"
          btnName="Next"
          onClick={() => setStep(false)}
        />
      </div>
    </div>
  );
}
ForgotEmailSection.propTypes = {
  setStep: PropTypes.object,
};

export default ForgotEmailSection;
