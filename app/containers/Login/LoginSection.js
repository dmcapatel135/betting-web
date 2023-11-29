import React from 'react';
import InputField from '../../components/InputField/InputField';
import ActionButton from '../../components/ActionButton/ActionButton';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import { RenderError } from '../../utils/validation';

function LoginSection({ setLogData, handleLogin, error, setError, logErrMsg }) {
  return (
    <div className="w-full pb-12 pt-5 mt-5 px-12 rounded-xl bg-lightgreen">
      <div className="text-center py-5 ">
        <span>Login to your account</span>
      </div>
      <div className="text-center">
        <ActionButton
          btnClass="border-[1px] border-white  md:text-14 lg:text-16 xl:text-20 bg-lightgreen h:10 md:h-12 md:py-0 py-1 w-full rounded-lg"
          btnName="Login with Google"
          icon="/images/icons/google.png"
          iconClass="absolute  w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8 top-[8px] left-[13%] md:top-[12px] md:left-[13%] lg:top-[12px] lg:left-[20%] xl:top-[8px] xl:left-[23%]"
        />
      </div>
      <div className="my-10 text-center w-full relative">
        <hr></hr>
        <div className="bg-bluewhale w-10 h-10 absolute flex justify-center items-center -top-5  left-[44%]   rounded-full">
          or
        </div>
      </div>
      <div className="text-center">
        <div className="pb-5">
          <span>Login using Email Address</span>
        </div>
        {logErrMsg && (
          <div>
            <Alert severity="error">{logErrMsg}</Alert>
          </div>
        )}
        <InputField
          type="text"
          inpClass="h-8 md:h-12  text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-lightgray"
          placeholder="Enter your email address"
          onChange={(e) => {
            setError((prev) => ({ ...prev, emailErr: '' }));
            setLogData((prev) => ({ ...prev, email: e.target.value }));
          }}
          error={RenderError(error.email)}
        />
        <InputField
          type="password"
          inpClass="md:h-12 h-8  text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-lightgray"
          placeholder="Enter your password"
          onChange={(e) => {
            setError((prev) => ({ ...prev, passwordErr: '' }));
            setLogData((prev) => ({ ...prev, password: e.target.value }));
          }}
          error={RenderError(error.password)}
        />
      </div>
      <div className="lg:flex items-center text-center ">
        <ActionButton
          btnClass="bg-bluewhale w-full px-4 md:px-5 my-2 py-1 md:py-2 text-16 lg:text-20 rounded-lg"
          btnName="Login"
          onClick={handleLogin}
        />
        <a
          href="/forgot_password"
          className="mx-3 text-10 md:text-12 cursor-pointer"
        >
          Forgot your password
        </a>
      </div>
    </div>
  );
}

LoginSection.propTypes = {
  setLogData: PropTypes.object,
  handleLogin: PropTypes.func,
  error: PropTypes.object,
  logErrMsg: PropTypes.string,
  setError: PropTypes.object,
};
export default LoginSection;
