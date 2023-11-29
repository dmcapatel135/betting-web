import React from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputField from '../../components/InputField/InputField';
import PropsType from 'prop-types';

function OtpSection({ handleSubmit }) {
  return (
    <div>
      <InputField
        type="text"
        inpClass="h-8 md:h-12 text-12 my-1  md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-lightgray"
        placeholder="Enter OTP"
      />
      <InputField
        type="password"
        inpClass="md:h-12 h-8 my-3 text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-lightgray"
        placeholder="Enter your password"
        icon="/images/icons/show_icon.png"
        iconClass="absolute top-5 md:top-7 right-3"
      />
      <InputField
        type="password"
        inpClass="md:h-12 h-8 mb-3 text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-lightgray"
        placeholder="Enter your confirm password"
        icon="/images/icons/show_icon.png"
        iconClass="absolute top-2 md:top-4 right-3"
      />
      <div className="lg:flex items-center pb-20 text-center ">
        <ActionButton
          btnClass="bg-bluewhale w-full px-4 md:px-5 py-1 md:py-2 text-16 lg:text-20 rounded-lg"
          btnName="Submit"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

OtpSection.propTypes = {
  handleSubmit: PropsType.func,
};

export default OtpSection;
