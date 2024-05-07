import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthSideSection, HeroSection, MobileInputField } from '@components';
import { useAuth } from '@hooks';
import { reactIcons } from '@utils/icons';
import { renderError } from '@utils/validation';
import { isLoggedIn } from '@utils/apiHandlers';

const initialState = {
  emailOrMobile: '',
  password: '',
  dialCode: '+255',
};

function Login() {
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  // const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  });

  // useEffect(() => {
  //   if (localStorage.getItem('username') && localStorage.getItem('password')) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       emailOrMobile: localStorage.getItem('username'),
  //       password: btoa(localStorage.getItem('password')),
  //     }));
  //     setRemember(true);
  //   }
  // }, []);

  // const handleRemeber = (remember) => {
  //   if (remember) {
  //     localStorage.setItem('username', form.emailOrMobile);
  //     localStorage.setItem('password', atob(form.password));
  //   } else {
  //     localStorage.removeItem('username');
  //     localStorage.removeItem('password');
  //   }
  // };

  const handleSubmit = async () => {
    setIsLoading(true);
    // e.preventDefault();

    const data = {
      emailOrMobile: form.dialCode + form.emailOrMobile,
      password: form.password,
    };
    setError({});
    const error = await login(data);
    // if (!error && remember) {
    //   handleRemeber(remember);
    // } else {
    //   handleRemeber(remember);
    // }
    setIsLoading(false);
    if (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="h-fit">
      <div
        className="border-[1px] rounded-[8px] shadow-inner border-[#A3A3A3] "
        style={{ boxShadow: '0px 0px 22px -12px #87EBF7 inset' }}
      >
        <div className="grid gap-3 grid-cols-12 p-3">
          <div className="hidden lg:block col-span-12 xl:col-span-3 px-0">
            <AuthSideSection bgBtn={true} />
          </div>
          <div className="lg:col-span-12 xl:col-span-9 col-span-full bg-[#F4F4F4] border rounded-lg border-[#A3A3A3]">
            <div className="text-center">
              <div className="text-black mt-10 mb-5">
                <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                  Welcome Back!
                </h1>
                <p className="text-12 2xl:text-16 text-[#3D3D3D] font-[400]">
                  Please enter your details
                </p>
              </div>
              <div className="px-2 pb-2 md:px-6 lg:px-8 xl:px-16">
                <div className="my-2 text-left">
                  <label className="text-gray-900 text-12 2xl:text-14">
                    Your Mobile Number
                  </label>
                  <MobileInputField
                    onChange={handleChange}
                    selectonChange={handleChange}
                    value={form.emailOrMobile}
                    selectValue={form.dialCode}
                    onKeyDown={(e) => {
                      if (e.code == 'Enter') {
                        handleSubmit();
                      }
                    }}
                  />
                  {renderError(error.emailOrMobile)}
                </div>
                <div className="text-left my-2">
                  <label className="text-gray-900 text-12 2xl:text-14">
                    Password
                  </label>
                  <div className="relative text-left">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      autoComplete="false"
                      placeholder="Your Password"
                      className="h-[40px] text-gray-900 text-14 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.code == 'Enter') {
                          handleSubmit();
                        }
                      }}
                    />
                    <span
                      className="cursor-pointer ay-center right-3 text-yellow"
                      onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                    >
                      {isPasswordVisible
                        ? reactIcons.eyes
                        : reactIcons.eyeslash}{' '}
                    </span>
                  </div>
                  <div className="text-left text-[#FF0000]">
                    {renderError(error.password)}
                  </div>
                </div>
                <div className="flex mb-2 justify-end items-center">
                  {/* <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span className="text-gray-900 text-10 md:text-12 cursor-pointer">
                      Remember me
                    </span>
                  </div> */}
                  <span
                    className="text-gray-900 text-10 md:text-12 cursor-pointer"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password?
                  </span>
                </div>
                <button
                  className={`w-full h-[40px] xxl:h-[48px]  lg:w-full xxl:w-[110px] border-[1px] outline-none lg:font-14 xxl:font-18 ${
                    isLoading
                      ? 'bg-lightgray border-lightgray'
                      : 'bg-yellow border-yellow'
                  } border-[#FEAE04] font-[700] rounded-[8px]`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  LOG IN
                </button>
                <div className="text-center my-2">
                  <span className="text-gray-900 text-10 md:text-12 2xl:text-14">
                    Don&apos;t have an Account?{' '}
                    <Link
                      to="/join-now"
                      className="underline hover:text-yellow text-10 md:text-12 2xl:text-14"
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
      <div className="lg:block hidden pt-5">
        <HeroSection />
      </div>
    </div>
  );
}

export default Login;
