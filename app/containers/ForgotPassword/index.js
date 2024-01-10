import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AuthSideSection,
  HeroSection,
  MobileInputField,
  RightSideSection,
} from '@components';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';

import moment from 'moment';

const initialState = {
  emailOrMobile: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
  dialCode: '',
};

let resendCodeInterval;

function ForgotPassword() {
  const [isResetPasswordScreen, setResetPasswordScreen] = useState(false);
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisiblity] =
    useState(false);
  const [error, setError] = useState({});
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [form, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword, sendForgotPasswordCode } = useAuth();
  const [resendTimer, setResendTimer] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendVerificationCode = async () => {
    setIsLoading(true);
    // e.preventDefault();
    setError({});
    const data = {
      mobile: form.emailOrMobile,
      dialCode: form.dialCode,
    };
    const [response, error] = await sendForgotPasswordCode(data);
    setIsLoading(false);
    if (error) {
      setError(error);
    } else if (response) {
      setResetPasswordScreen(true);
      setVerificationResponse(response?.mobile);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    // e.preventDefault();
    const data = {
      mobile: form.emailOrMobile,
      dialCode: form.dialCode,
      code: form.code,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    };
    setError({});
    const [response, error] = await resetPassword(data);
    setIsLoading(false);
    if (error) {
      setError(error);
    } else if (response) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (isResetPasswordScreen && verificationResponse) {
      resendCodeInterval = setInterval(() => {
        // Generate timestamps
        const timestamp = moment(verificationResponse.sentAt).add(
          verificationResponse.timeout,
          'milliseconds',
        );

        // Get remaining time string
        const currentTime = moment();
        let totalSeconds = parseInt(timestamp.diff(currentTime, 'seconds'));
        if (totalSeconds >= 0) {
          totalSeconds %= 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          setResendTimer(
            `${minutes < 10 ? `0${minutes}` : minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`,
          );
        } else {
          setResendTimer(null);
        }
      }, 1000);
    }

    if (!isResetPasswordScreen && verificationResponse) {
      setVerificationResponse(null);
      if (resendCodeInterval) clearInterval(resendCodeInterval);
    }

    return () => {
      if (resendCodeInterval) {
        clearInterval(resendCodeInterval);
      }
    };
  }, [isResetPasswordScreen, verificationResponse]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <div className="h-fit">
          <div
            className="border-[1px] rounded-[8px] shadow-inner border-[#A3A3A3] m-5"
            style={{ boxShadow: '0px 0px 22px -12px #87EBF7 inset' }}
          >
            <div className="grid grid-cols-12 md:p-3">
              <div className="col-span-3 lg:block hidden px-4">
                <AuthSideSection imgHeight="345px" />
              </div>
              <div className="lg:col-span-9 h-[450px] col-span-full bg-[#F4F4F4] border-[1px] rounded-[8px] md:border-[#A3A3A3]">
                {!isResetPasswordScreen ? (
                  <div className="text-center">
                    <div className="text-black mt-2 md:mt-16 mb-5">
                      <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                        Forgotten Your Password
                      </h1>
                      <p className="text-12 text-[#3D3D3D] px-2 md:px-12 font-[400]">
                        Enter the mobile number registered to your Bikosports
                        account and we&apos;ll send you a verification code.
                      </p>
                    </div>
                    <div className="px-2 lg:px-16">
                      <div className="my-2 text-left">
                        <label className="text-gray-900 text-12">
                          Your Mobile Number
                        </label>
                        <MobileInputField
                          onChange={handleChange}
                          selectonChange={handleChange}
                          value={form.emailOrMobile}
                          selectValue={form.dialCode}
                          onKeyDown={(e) => {
                            if (e.code == 'Enter') {
                              handleSendVerificationCode();
                            }
                          }}
                        />
                        {renderError(error.mobile)}
                      </div>
                      <button
                        className={`w-full h-[40px] my-5 xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 ${
                          isLoading
                            ? 'bg-lightgray border-lightgray'
                            : 'bg-yellow border-yellow'
                        } font-[700] mt-3 rounded-[8px]`}
                        onClick={handleSendVerificationCode}
                        disabled={isLoading}
                      >
                        SEND ME VERIFICATION CODE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center ">
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
                        <MobileInputField
                          onChange={handleChange}
                          selectonChange={handleChange}
                          value={form.emailOrMobile}
                          selectValue={form.dialCode}
                          onKeyDown={(e) => {
                            if (e.code == 'Enter') {
                              handleResetPassword();
                            }
                          }}
                        />
                      </div>
                      <div className="text-left">
                        <label className="text-gray-900 text-12">
                          Verification Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          placeholder="Verification Code"
                          onChange={handleChange}
                          className="h-[40px] text-gray-900  text-14 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                        />
                        {renderError(error.code)}
                      </div>
                      <div className="flex justify-end">
                        <p className="my-2 text-gray-900 text-12">
                          Not recieved an code?{' '}
                          <button
                            disabled={resendTimer ? true : false}
                            className="text-primary-yellow ml-1 hover:underline text-gray-900"
                            onClick={handleSendVerificationCode}
                          >
                            {resendTimer ? resendTimer : 'Resend Code'}
                          </button>
                        </p>
                      </div>
                      {verificationResponse &&
                        verificationResponse.attempt > 1 && (
                          <div className="flex justify-end">
                            <p className="text-12 text-gray-900">
                              Remaining retries{' '}
                              <span className="text-primary-yellow ml-1 duration-200">
                                {verificationResponse.maxAttempt -
                                  verificationResponse.attempt}
                              </span>
                            </p>
                          </div>
                        )}
                      <div className="grid grid-cols-2 my-2 w-full">
                        <div className="text-left mr-2">
                          <label className="text-gray-900 text-12">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={isPasswordVisible ? 'text' : 'password'}
                              autoComplete="false"
                              placeholder="New Password"
                              className="h-[40px] text-14 text-gray-900 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                              name="newPassword"
                              value={form.newPassword}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                if (e.code == 'Enter') {
                                  handleResetPassword();
                                }
                              }}
                            />
                            <span
                              className="cursor-pointer ay-center right-3 text-yellow"
                              onClick={() =>
                                setPasswordVisiblity(!isPasswordVisible)
                              }
                            >
                              {isPasswordVisible
                                ? reactIcons.eyes
                                : reactIcons.eyeslash}
                            </span>
                          </div>
                          {renderError(error.newPassword)}
                        </div>
                        <div className="ml-2 text-left">
                          <label className="text-gray-900 text-12">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type={
                                isConfirmPasswordVisible ? 'text' : 'password'
                              }
                              autoComplete="false"
                              placeholder="Confirm Password"
                              className="h-[40px] text-14 text-gray-900 w-full outline-none px-5  border-[1px] border-[#FEAE04] rounded-[8px]"
                              name="confirmPassword"
                              value={form.confirmPassword}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                if (e.code == 'Enter') {
                                  handleResetPassword();
                                }
                              }}
                            />
                            <span
                              className="cursor-pointer ay-center right-3 text-yellow"
                              onClick={() =>
                                setConfirmPasswordVisiblity(
                                  !isConfirmPasswordVisible,
                                )
                              }
                            >
                              {isConfirmPasswordVisible
                                ? reactIcons.eyes
                                : reactIcons.eyeslash}
                            </span>
                          </div>
                          {renderError(error.confirmPassword)}
                        </div>
                      </div>

                      <button
                        className={`w-full  md:my-0 h-[40px] mt-2  xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 ${
                          isLoading
                            ? 'bg-lightgray border-lightgray'
                            : 'bg-yellow border-yellow'
                        }  font-[700] rounded-[8px]`}
                        onClick={handleResetPassword}
                        disabled={isLoading}
                      >
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
      <div className="col-span-4">
        <RightSideSection />
      </div>
    </div>
  );
}

export default ForgotPassword;
