import React from 'react';
import { Link } from 'react-router-dom';
import { AuthSideSection, HeroSection, MobileInputField } from '@components';

function JoinNow() {
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
              <div className="text-center">
                <div className="text-black mt-10 mb-5">
                  <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                    Join Now!
                  </h1>
                  <p className="text-12 text-[#3D3D3D] font-[400]">
                    Please enter your details
                  </p>
                </div>
                <div className="px-2 md:px-4 lg:px-16">
                  <div className="my-2 text-left">
                    <label className="text-gray-900 text-12">
                      Your Mobile Number
                    </label>
                    <MobileInputField />
                  </div>
                  <div className="text-left my-2">
                    <label className="text-gray-900 text-12">Password</label>
                    <input
                      type="password"
                      placeholder="password"
                      className="h-[40px] text-gray-900 text-14 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                    />
                  </div>
                  <div className="flex mb-2 justify-between">
                    <span className="text-gray-900 text-10 md:text-12">
                      Min. 4 Characters
                    </span>
                  </div>
                  <button className="w-full  h-[40px] xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 bg-[#FEAE04] border-[#FEAE04] font-[700] rounded-[8px]">
                    JOIN NOW
                  </button>
                  <div className="container_main text-left my-2">
                    <input type="checkbox" checked />
                    <span className="checkmark top-[5px] left-[-20px] md:left-[-5px] lg:left-[-28px]"></span>
                    <span className="text-gray-900 text-10 md:text-12 md:ml-4 lg:ml-0 ">
                      By creating an account you accept the{' '}
                      <Link className="underline hover:text-yellow">
                        Terms and Conditions
                      </Link>
                    </span>
                    <div className="text-center">
                      <p className="text-gray-900 text-10 md:text-12">
                        Alerady have an account?{' '}
                        <Link
                          to="/login"
                          className="underline hover:text-yellow text-10 md:text-12"
                        >
                          LOG IN
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:block hidden">
          <HeroSection />
        </div>
      </div>
    </div>
  );
}

export default JoinNow;
