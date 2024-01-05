import React, { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';
import moment from 'moment';
import { useAuth } from '@hooks';
import { countryList } from '@api/country';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  dialCode: '',
  country: 'Estonia',
  mobile: '+372',
  mobileVerificationCode: '000000',
  emailVerificationCode: '',
};

let resendCodeInterval;

const Register = () => {
  const [isOtpScreen, setOtpScreen] = useState(false);
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const [resendTimer, setResendTimer] = useState(null);
  const [verificationResponse, setVerificationResponse] = useState(null);
  const { register, sendRegisterCode } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendRegisterCode = async (e) => {
    e.preventDefault();
    setError({});
    const [response, error] = await sendRegisterCode(form);
    if (error) {
      setError(error);
      return;
    }
    if (response) {
      setOtpScreen(true);
      setVerificationResponse(response);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(error);
    const error = await register(form);
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
    if (isOtpScreen && verificationResponse) {
      resendCodeInterval = setInterval(() => {
        // Generate timestamps
        const timestamp = moment(verificationResponse.email.sentAt).add(
          verificationResponse.email.timeout,
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

    if (!isOtpScreen && verificationResponse) {
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
    <>
      {!isOtpScreen && (
        <div className="pt-[30px] min-h-[600px]">
          <p className="para-24 text-center">Register</p>
          <p className="text-16 text-center text-primary-yellow pt-[30px]">
            Please enter your details to register{' '}
          </p>
          <form
            onSubmit={handleSendRegisterCode}
            className="pt-[30px] grid grid-cols-2 gap-5"
          >
            {' '}
            <div className="col-span-1">
              <input
                type="text"
                placeholder="First Name"
                className="input-new"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
              />
              {renderError(error.firstname)}
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Last Name"
                className="input-new col-span-1"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
              />
              {renderError(error.lastname)}
            </div>
            <div className="col-span-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="input-new"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {renderError(error.email)}
            </div>
            <div className="col-span-2">
              <select
                name="country"
                className=" input-new"
                value={form.country}
                onChange={handleChange}
              >
                <option className="text-black" key="" value="">
                  Your Country
                </option>
                {countryList.map((item, index) => {
                  return (
                    <option
                      className="text-black"
                      key={index}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {renderError(error.country)}
            </div>
            <div className="col-span-2">
              <div className="flex relative items-start gap-1">
                <div className="w-20">
                  <input
                    className="input-new"
                    value={form.dialCode || ''}
                    readOnly
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="input-new"
                    name="mobile"
                    autoComplete="phone-number"
                    value={form.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {renderError(error.mobile)}
            </div>
            <div className="col-span-2">
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className="input-new"
                  name="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                  className="cursor-pointer ay-center right-3"
                  onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                >
                  {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}{' '}
                </span>
              </div>
              {renderError(error.password)}
            </div>
            <button
              type="submit"
              className="btn-lg bg-primary-yellow w-full col-span-2"
            >
              Register
            </button>
          </form>
        </div>
      )}
      {isOtpScreen && (
        <form onSubmit={handleRegister}>
          <div className="basis-full lg:basis-1/3 flex-center">
            <div className="max-w-[400px] p-3  mx-auto w-full">
              <div className="text-center">
                <h6 className="py-4">Verfiy your email ownership.</h6>
                <p className="text-primary-yellow text-sm">
                  We have sent you a 6 digit code, please enter to verify
                </p>
                <div className="flex justify-center gap-2 py-4">
                  <PinInput
                    length={6}
                    initialValue=""
                    type="numeric"
                    inputMode="number"
                    onComplete={(value) => {
                      handleChange({
                        target: { name: 'emailVerificationCode', value },
                      });
                    }}
                    autoSelect={true}
                    regexCriteria={/^[0-9]*$/}
                  />
                </div>
                <p className="text-sm mb-2">
                  Not recieved an code?{' '}
                  <button
                    disabled={resendTimer ? true : false}
                    className="text-primary-yellow ml-1 hover:underline"
                    onClick={handleSendRegisterCode}
                  >
                    {resendTimer ? resendTimer : 'Resend Code'}
                  </button>
                </p>
                {verificationResponse &&
                  verificationResponse.email.attempt > 1 && (
                    <p className="text-sm mb-2">
                      Remaining retries{' '}
                      <span className="text-primary-yellow ml-1 duration-200">
                        {' '}
                        {verificationResponse.email.maxAttempt -
                          verificationResponse.email.attempt}{' '}
                      </span>
                    </p>
                  )}

                <button
                  type="submit"
                  className="btn w-full text-base"
                  disabled={
                    form.emailVerificationCode.length !== 6 ||
                    form.mobileVerificationCode.length !== 6
                  }
                >
                  Verify Email
                </button>
                <button
                  className="btn btn-secondary w-full text-base mt-2"
                  onClick={() => setOtpScreen(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Register;
