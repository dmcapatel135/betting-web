import React, { useState } from 'react';

import { AuthSideSection, HeroSection, MobileInputField } from '@components';

function ForgotPassword() {
  const [isOtpScreen, setIsOtpScreen] = useState(true);
  return (
    <div>
      <div className="h-fit">
        <div
          className="border-[1px] rounded-[8px] shadow-inner border-[#A3A3A3] m-5"
          style={{ boxShadow: '0px 0px 22px -12px #87EBF7 inset' }}
        >
          <div className="grid grid-cols-12 md:p-3">
            <div className="col-span-3 lg:block hidden px-4">
              <AuthSideSection />
            </div>
            <div className="lg:col-span-9 col-span-full bg-[#F4F4F4] border-[1px] rounded-[8px] md:border-[#A3A3A3]">
              {isOtpScreen ? (
                <div className="text-center">
                  <div className="text-black mt-2 md:mt-16 mb-5">
                    <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                      Forgotten Your Password
                    </h1>
                    <p className="text-12 text-[#3D3D3D] px-2 md:px-12 font-[400]">
                      Enter the mobile number registered to your betPawa account
                      and we&apos;ll send you a verification code.
                    </p>
                  </div>
                  <div className="px-2 lg:px-16">
                    <div className="my-2 text-left">
                      <label className="text-gray-900 text-12">
                        Your Mobile Number
                      </label>
                      <MobileInputField />
                    </div>
                    <button
                      className="w-full h-[40px] my-5 xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 bg-[#FEAE04] border-[#FEAE04] font-[700] mt-3 rounded-[8px]"
                      onClick={() => setIsOtpScreen(!isOtpScreen)}
                    >
                      SEND ME VERIFICATION CODE
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-black mt-3 mb-0">
                    <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                      Enter Your Verification Code{' '}
                    </h1>
                    <p className="text-12 text-[#3D3D3D] font-[400]">
                      To continue, enter the verification code sent to your
                      mobile number.{' '}
                    </p>
                  </div>
                  <div className="px-2 md:px-4 lg:px-16">
                    <div className="my-2 text-left">
                      <label className="text-gray-900 text-12">
                        Your Mobile Number
                      </label>
                      <MobileInputField />
                    </div>
                    <div className="flex  justify-end">
                      <span className="text-gray-900 text-10 md:text-12 cursor-pointer">
                        Change Number?
                      </span>
                    </div>
                    <div className="text-left">
                      <label className="text-gray-900 text-12">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        placeholder="Verification Code"
                        className="h-[40px] text-gray-900  text-14 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                      />
                    </div>
                    <div className="flex mb-2 justify-end">
                      <span className="text-gray-900 text-10 md:text-12 cursor-pointer">
                        Resend OTP?
                      </span>
                    </div>
                    <div className="grid grid-cols-2 my-2 w-full">
                      <div className="text-left mr-2">
                        <label className="text-gray-900 text-12">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Password"
                          className="h-[40px] text-14 text-gray-900 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                        />
                      </div>
                      <div className="ml-2 text-left">
                        <label className="text-gray-900 text-12">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          className="h-[40px] text-14 text-gray-900 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                        />
                      </div>
                    </div>

                    <button className="w-full my-5 md:my-0 h-[40px] xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18  bg-[#FEAE04] border-[#FEAE04] font-[700] rounded-[8px]">
                      VERIFY ACCOUNT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <HeroSection />
      </div>
    </div>
  );
}

export default ForgotPassword;
