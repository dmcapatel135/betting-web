import React, { useState } from 'react';
import Template from '../../components/Template/Template';
import LoginSection from './LoginSection';
import { SET_NOTIF } from '../../redux/actions/actionConstants';
import { postApiReq } from '../../helpers/ApiHandler';
import { USER_LOGIN } from '../../utils/endpoints';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isYupError, parseYupError } from '../../utils/Yup';
import { UserSignInValidation } from '../../utils/validation';

function Login() {
  const [logData, setLogData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailErr: '',
    passwordErr: '',
  });
  const [logErrMsg, setLogErrMsg] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!logData.email) {
      setError((prev) => ({ ...prev, emailErr: 'This field is required.' }));
    }
    if (!logData.password) {
      setError((prev) => ({ ...prev, passwordErr: 'This field is required.' }));
    }

    try {
      setError({});
      // let data = {
      //   ...form,
      //   isPrivacyAndTermAccept,
      //   dialCode: mobileCode,
      // };
      await UserSignInValidation.validate(logData, {
        abortEarly: false,
      });

      if (logData.email && logData.password) {
        postApiReq(USER_LOGIN, logData)
          .then((res) => {
            console.log('-----response ', res);
            if (res.status) {
              navigate('/dashboard');
              dispatch();
              Cookies.set('userDetails', res.data);
            } else {
              console.log('------error message ---', res);
              setLogErrMsg(res.error.message);
              dispatch(
                SET_NOTIF({ variant: 'error', message: res.error.message }),
              );
            }
          })
          .catch((e) => console.log(e));
      }
    } catch (error) {
      if (isYupError(error)) {
        setError(parseYupError(error));
        // setIsLoading(false);
      } else {
        console.log('Error : ', error);
      }
    }
  };

  return (
    <Template>
      <div className="bg-gradient-to-r from-[#00586A] via-[#023747] via1-[#167A9A] to-[#022e0d]">
        <div className="grid grid-cols-2">
          <div className="pl-20 py-16 hidden md:flex">
            <img src="/images/login_section.png" alt="log_img" />
          </div>
          <div className="md:pr-10 lg:pr-20 px-6 py-16 col-span-full md:col-span-1">
            <LoginSection
              logData={logData}
              setLogData={setLogData}
              handleLogin={handleLogin}
              error={error}
              setError={setError}
              logErrMsg={logErrMsg}
            />
          </div>
        </div>
      </div>
    </Template>
  );
}

export default Login;
