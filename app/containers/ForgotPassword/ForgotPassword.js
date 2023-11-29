import React from 'react';
import Template from '../../components/Template/Template';
import ForgotPasswordSection from './ForgotPasswordSection';

function ForgotPassword() {
  return (
    <Template>
      <div className="bg-gradient-to-r from-[#00586A] via-[#023747] via1-[#167A9A] to-[#022e0d]">
        <div className="grid grid-cols-2">
          <div className="pl-20 py-16 hidden md:flex">
            <img src="/images/login_section.png" alt="log_img" />
          </div>
          <div className="md:pr-10 lg:pr-20 px-6 py-16 col-span-full md:col-span-1">
            <ForgotPasswordSection />
          </div>
        </div>
      </div>
    </Template>
  );
}

export default ForgotPassword;
