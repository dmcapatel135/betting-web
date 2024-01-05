import React, { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';

const initialState = {
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
};

let resendCodeInterval;

const ForgotPassword = ({ closeForgotPasswordScreen }) => {
  const [isResetPasswordScreen, setResetPasswordScreen] = useState(false);
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisiblity] =
    useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const [resendTimer, setResendTimer] = useState(null);
  const [verificationResponse, setVerificationResponse] = useState(null);
  const { resetPassword, sendForgotPasswordCode } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    setError({});
    const [response, error] = await sendForgotPasswordCode(form);
    if (error) {
      setError(error);
    } else if (response) {
      setResetPasswordScreen(true);
      setVerificationResponse(response);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError({});
    const [response, error] = await resetPassword(form);
    if (error) {
      setError(error);
    } else if (response) {
      closeForgotPasswordScreen();
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
    <>
      {!isResetPasswordScreen && (
        <div className="pt-[30px] min-h-[600px]">
          <p className="para-24 text-center">Forget Password</p>
          <p className="text-16 text-center text-primary-yellow pt-[30px]">
            Please enter your email address to receive the verification code
          </p>
          <form
            onSubmit={handleSendVerificationCode}
            className="pt-[30px] grid grid-cols-2 gap-5"
          >
            {' '}
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
            <button
              type="submit"
              className="btn-lg bg-primary-yellow w-full col-span-2"
            >
              Send Verification Code
            </button>
            <button
              className="btn-lg btn-secondary w-full col-span-2"
              onClick={closeForgotPasswordScreen}
            >
              Back to Log In
            </button>
          </form>
        </div>
      )}
      {isResetPasswordScreen && (
        <div className="pt-[30px] min-h-[600px]">
          <p className="para-24 text-center">Set your new password</p>
          <p className="text-16 text-center text-primary-yellow pt-[30px]">
            We have sent you a 6 digit code, please enter new password and
            verification code
          </p>
          <form
            onSubmit={handleResetPassword}
            className="pt-[30px] grid grid-cols-2 gap-5"
          >
            {' '}
            <div className="col-span-2">
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="false"
                  placeholder="New Password"
                  className="border rounded-[8px] py-2 px-3 h-[48px] w-full bg-transparent "
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                />
                <span
                  className="cursor-pointer ay-center right-3"
                  onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                >
                  {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}
                </span>
              </div>
              {renderError(error.newPassword)}
            </div>
            <div className="col-span-2">
              <div className="relative">
                <input
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  autoComplete="false"
                  placeholder="Confirm Password"
                  className="border rounded-[8px] py-2 px-3 h-[48px] w-full bg-transparent "
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="cursor-pointer ay-center right-3"
                  onClick={() =>
                    setConfirmPasswordVisiblity(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible
                    ? reactIcons.eyes
                    : reactIcons.eyeslash}
                </span>
              </div>
              {renderError(error.confirmPassword)}
            </div>
            <div className="col-span-2 forgot-pin-input">
              <PinInput
                length={6}
                initialValue=""
                type="numeric"
                inputMode="number"
                onComplete={(value) => {
                  handleChange({
                    target: { name: 'code', value },
                  });
                }}
                autoSelect={true}
                regexCriteria={/^[0-9]*$/}
              />
              {renderError(error.code)}
            </div>
            <div className="col-span-2">
              <p className="text-sm mb-2">
                Not recieved an code?{' '}
                <button
                  disabled={resendTimer ? true : false}
                  className="text-primary-yellow ml-1 hover:underline"
                  onClick={handleSendVerificationCode}
                >
                  {resendTimer ? resendTimer : 'Resend Code'}
                </button>
              </p>
              {verificationResponse && verificationResponse.attempt > 1 && (
                <p className="text-sm mb-2">
                  Remaining retries{' '}
                  <span className="text-primary-yellow ml-1 duration-200">
                    {verificationResponse.maxAttempt -
                      verificationResponse.attempt}
                  </span>
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn-lg bg-primary-yellow w-full col-span-2"
            >
              Reset Password
            </button>
            <button
              className="btn-lg btn-secondary w-full col-span-2"
              onClick={() => setResetPasswordScreen(false)}
            >
              Back
            </button>
          </form>
        </div>
      )}
    </>
  );
};

ForgotPassword.propTypes = {
  closeForgotPasswordScreen: PropTypes.func.isRequired,
};

export default ForgotPassword;
