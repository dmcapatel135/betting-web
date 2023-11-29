import React, { useState } from 'react';
import Template from '../../components/Template/Template';
import RegistartionSection from './RegistartionSection';
import OtpVerifySection from './OtpVerifySection';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postApiReq } from '../../helpers/ApiHandler';
import { SEND_OTP, USER_REGISTRATION } from '../../utils/endpoints';
import { SET_NOTIF } from '../../redux/actions/actionConstants';
import { UserSignupValidation } from '../../utils/validation';
import { isYupError, parseYupError } from '../../utils/Yup';

function Register() {
  const [optSection, setOtpSection] = useState(false);
  const [regData, setRegData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confPassword: '',
    dialCode: '',
    mobile: '',
    country: '',
    emailVerificationCode: '',
  });
  const [error, setError] = useState({
    firstnameErr: '',
    lastnameErr: '',
    emailErr: '',
    passwordErr: '',
    confPasswordErr: '',
    mobileErr: '',
    countryErr: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    try {
      setError({});
      // let data = {
      //   ...form,
      //   isPrivacyAndTermAccept,
      //   dialCode: mobileCode,
      // };
      await UserSignupValidation.validate(regData, {
        abortEarly: false,
      });

      const rdata = {
        // mobile: regData.mobile,
        email: regData.email,
        country: regData.country,
        type: 'register',
      };
      console.log('------enter this is');

      postApiReq(SEND_OTP, rdata)
        .then((res) => {
          console.log('-----response ', res);
          if (res.status) {
            setOtpSection(true);
            // navigate('/dashboard');
          } else {
            console.log('------error message ---', res);
            dispatch(
              SET_NOTIF({ variant: 'error', message: res.error.message }),
            );
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      if (isYupError(error)) {
        setError(parseYupError(error));
        // setIsLoading(false);
      } else {
        console.log('Error :', error);
      }
    }
  };

  const handleRegister = () => {
    const rdata = {
      // mobile: regData.mobile,
      firstname: regData.firstname,
      lastname: regData.lastname,
      password: regData.password,
      email: regData.email,
      country: regData.country,
      emailVerificationCode: regData.emailVerificationCode,
      // type: 'register',
    };
    postApiReq(USER_REGISTRATION, rdata)
      .then((res) => {
        console.log('-----response ', res);
        if (res.status) {
          navigate('/login');
        } else {
          console.log('------error message ---', res);
          dispatch(SET_NOTIF({ variant: 'error', message: res.error.message }));
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Template>
      <div className="bg-gradient-to-r from-[#00586A] via-[#023747] via1-[#167A9A] to-[#022e0d]">
        <div className="grid grid-cols-2">
          <div className="pl-20 py-16 hidden md:flex">
            <img src="/images/reg_section.png" alt="log_img" />
          </div>
          <div className="md:pr-5 lg:pr-10 xl:pr-10 px-8 py-16 col-span-full md:col-span-1">
            {optSection ? (
              <OtpVerifySection
                handleRegister={handleRegister}
                regData={regData}
                setRegData={setRegData}
              />
            ) : (
              <RegistartionSection
                handleRegister={handleSendOtp}
                regData={regData}
                setRegData={setRegData}
                error={error}
                setError={setError}
              />
            )}
          </div>
        </div>
      </div>
    </Template>
  );
}

export default Register;
