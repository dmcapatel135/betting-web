import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AuthSideSection,
  HeroSection,
  MobileInputField,
  RightSideSection,
} from '@components';
import { useAuth } from '@hooks';
import { countryList } from '@api/country';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';

import moment from 'moment';
import PinInput from 'react-pin-input';

const initialState = {
  password: '',
  dialCode: '+91',
  country: 'India',
  emailOrMobile: '',
  mobileVerificationCode: '000000',
  termsAndCondition: '',
};
let resendCodeInterval;

function JoinNow() {
  const [isOtpScreen, setOtpScreen] = useState(true);
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const [resendTimer, setResendTimer] = useState(null);
  const [verificationResponse, setVerificationResponse] = useState(null);
  const { register, sendRegisterCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function findCountryNameByDialCode(dialCode) {
    const country = countryList.find((c) => c.dial_code === dialCode);
    return country ? country.name : null;
  }

  const handleChange = (e) => {
    if (e.target.name === 'dialCode') {
      setFormData({
        ...form,
        country: findCountryNameByDialCode(e.target.value),
      });
    } else {
      setFormData({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSendRegisterCode = async () => {
    setIsLoading(true);
    const data = {
      dialCode: form.dialCode,
      mobile: form.emailOrMobile,
      country: form.country,
      password: form.password,
      type: 'register',
    };
    setError({});
    const [response, error] = await sendRegisterCode(data);
    setIsLoading(false);
    if (error) {
      setError(error);
      return;
    }
    if (response) {
      setOtpScreen(false);
      setVerificationResponse(response);
    }
  };

  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      dialCode: form.dialCode,
      mobile: form.emailOrMobile,
      country: form.country,
      password: form.password,
      mobileVerificationCode: form.mobileVerificationCode,
    };
    setError(error);
    const error = await register(data);
    setIsLoading(false);
    if (error) {
      setOtpScreen(false);
      setVerificationResponse(null);
    }
  };

  useEffect(() => {
    if (form.country) {
      const country = countryList.find(({ name }) => name == form.country);
      if (country)
        setFormData((prevState) => ({
          ...prevState,
          dialCode: country.dial_code,
          mobile: '',
        }));
    }
  }, [form.country]);

  useEffect(() => {
    if (!isOtpScreen && verificationResponse) {
      resendCodeInterval = setInterval(() => {
        // Generate timestamps
        const timestamp = moment(verificationResponse.mobile.sentAt).add(
          verificationResponse.mobile.timeout,
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
    if (isOtpScreen && verificationResponse) {
      setVerificationResponse(null);
      if (resendCodeInterval) clearInterval(resendCodeInterval);
    }

    return () => {
      if (resendCodeInterval) {
        clearInterval(resendCodeInterval);
      }
    };
  }, [isOtpScreen, verificationResponse]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-8">
        <div className="h-fit">
          <div
            className="border-[1px] rounded-[8px] shadow-inner border-[#A3A3A3] m-5"
            style={{ boxShadow: '0px 0px 22px -12px #87EBF7 inset' }}
          >
            <div className="grid grid-cols-12 md:p-3">
              <div className="col-span-3 lg:block hidden pr-4">
                <AuthSideSection />
              </div>
              <div className="lg:col-span-9 col-span-full bg-[#F4F4F4] border-[1px] rounded-[8px] md:border-[#A3A3A3]">
                {isOtpScreen ? (
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
                        <MobileInputField
                          onChange={handleChange}
                          selectonChange={handleChange}
                          value={form.emailOrMobile}
                          selectValue={form.dialCode}
                          onKeyDown={(e) => {
                            if (e.code == 'Enter') {
                              handleSendRegisterCode();
                            }
                          }}
                        />
                        {renderError(error?.mobile)}
                      </div>
                      <div className="text-left my-2">
                        <label className="text-gray-900 text-12">
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
                                handleSendRegisterCode();
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
                              : reactIcons.eyeslash}{' '}
                          </span>
                        </div>
                        <div className="text-left text-[#FF0000]">
                          {renderError(error?.password)}
                        </div>
                      </div>
                      <button
                        className={`w-full  h-[40px] xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 outline-none ${
                          isLoading
                            ? 'bg-lightgray border-lightgray'
                            : 'bg-yellow border-yellow'
                        }  font-[700] rounded-[8px]`}
                        onClick={handleSendRegisterCode}
                        disabled={isLoading}
                      >
                        JOIN NOW
                      </button>
                      <div className="container_main text-left my-2">
                        <input
                          type="checkbox"
                          name="termsAndCondition"
                          checked
                          onClick={(e) => {
                            setFormData({
                              ...form,
                              country: findCountryNameByDialCode(
                                e.target.checked,
                              ),
                            });
                          }}
                        />
                        <span className="checkmark top-[5px] left-[-20px] md:left-[-5px] lg:left-[-12px]"></span>
                        <span className="text-gray-900 text-10 md:text-12 md:ml-4 lg:ml-2 ">
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
                ) : (
                  <form onSubmit={handleRegister}>
                    <div className="basis-full lg:basis-1/3 flex-center">
                      <div className="max-w-[400px] p-3  mx-auto w-full">
                        <div className="text-center">
                          <h1 className="text-[24px] md:text-[32px] py-2 text-[#3D3D3D] font-[700]">
                            Verify your mobile!
                          </h1>
                          <p className="text-gray-900 text-sm">
                            We have sent you a 6 digit code, please enter to
                            verify
                          </p>
                          <div className="flex justify-center gap-2 py-4">
                            <PinInput
                              length={6}
                              initialValue=""
                              type="numeric"
                              inputMode="number"
                              inputStyle={{
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                margin: 'auto 4px',
                                border: '1px solid #FEAE04',
                                background: 'rgba(217, 217, 217, 0.20)',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                fontSize: '20px',
                                color: '#3D3D3D',
                              }}
                              onComplete={(value) => {
                                handleChange({
                                  target: {
                                    name: 'mobileVerificationCode',
                                    value,
                                  },
                                });
                              }}
                              autoSelect={true}
                              regexCriteria={/^[0-9]*$/}
                            />
                          </div>
                          <p className="text-sm my-2 text-gray-900">
                            Not recieved an code?{' '}
                            <button
                              disabled={resendTimer ? true : false}
                              className="text-gray-900 ml-1 hover:underline"
                              onClick={handleSendRegisterCode}
                            >
                              {resendTimer ? resendTimer : 'Resend Code'}
                            </button>
                          </p>
                          {verificationResponse &&
                            verificationResponse.mobile.attempt > 1 && (
                              <p className="text-12 text-gray-900 mb-2">
                                Remaining retries{' '}
                                <span className="text-primary-yellow ml-1 duration-200">
                                  {' '}
                                  {verificationResponse.mobile.maxAttempt -
                                    verificationResponse.mobile.attempt}{' '}
                                </span>
                              </p>
                            )}

                          <button
                            type="submit"
                            onClick={handleRegister}
                            className="w-full  h-[40px] xxl:h-[48px] lg:w-full xxl:w-[110px] border-[1px] lg:font-14 xxl:font-18 bg-[#FEAE04] border-[#FEAE04] font-[700] rounded-[8px]"
                            disabled={
                              form.mobileVerificationCode.length !== 6 ||
                              form.mobileVerificationCode.length !== 6
                            }
                          >
                            Verify Mobile
                          </button>
                          <span
                            className="text-10 text-gray-900 md:text-12 hover:text-yellow cursor-pointer"
                            onClick={() => setOtpScreen(true)}
                          >
                            Back
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="md:block hidden">
            <HeroSection />
          </div>
        </div>
      </div>
      <div className="col-span-4 md:block hidden">
        <RightSideSection />
      </div>
    </div>
  );
}

export default JoinNow;
