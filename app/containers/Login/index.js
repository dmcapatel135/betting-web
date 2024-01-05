import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthSideSection, HeroSection, MobileInputField } from '@components';

function Login() {
  const navigate = useNavigate();
  return (
    <div className="h-fit">
      <div
        className="border-[1px] rounded-[8px] shadow-inner border-[#A3A3A3] m-5"
        style={{ boxShadow: '0px 0px 22px -12px #87EBF7 inset' }}
      >
        <div className="grid grid-cols-12 md:p-3">
          <div className="hidden lg:block md:col-span-3  px-0 md:px-4">
            <AuthSideSection bgBtn={true} />
          </div>
          <div className="lg:col-span-9 col-span-full bg-[#F4F4F4]  md:border-[1px] rounded-[8px] md:border-[#A3A3A3]">
            <div className="text-center">
              <div className="text-black mt-10 mb-5">
                <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                  Welcome Back!
                </h1>
                <p className="text-12 text-[#3D3D3D] font-[400]">
                  Please enter your details
                </p>
              </div>
              <div className="px-2 md:px-16">
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
                    className="h-[40px] text-gray-900 text-14 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                  />
                </div>
                <div className="flex mb-2 justify-between">
                  <span className="text-gray-900 text-10 md:text-12">
                    Min. 4 Characters
                  </span>
                  <span
                    className="text-gray-900 text-10 md:text-12 cursor-pointer"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password?
                  </span>
                </div>
                <button className="w-full h-[40px] xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 bg-[#FEAE04] border-[#FEAE04] font-[700] rounded-[8px]">
                  LOG IN
                </button>
                <div className="text-center my-2">
                  <span className="text-gray-900 text-10 md:text-12">
                    Don&apos;t have an Account?{' '}
                    <Link
                      to="/join-now"
                      className="underline hover:text-yellow text-10 md:text-12"
                    >
                      JOIN NOW
                    </Link>
                  </span>
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
  );
}

export default Login;
