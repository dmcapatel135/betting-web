import React from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import OTPInput from 'react-otp-input';
import PropTypes from 'prop-types';

function OtpVerifySection({ regData, setRegData, handleRegister }) {
  return (
    <div className="w-full pb-12 pt-5 mt-5 px-12 rounded-xl bg-lightgreen">
      <div className="text-center py-5 ">
        <span>Email Verification</span>
      </div>
      <div className="text-center">
        <div className="pb-5">
          <span>Sign up using Email Address</span>
        </div>
        <div>
          <OTPInput
            value={regData.emailVerificationCode}
            onChange={(value) =>
              setRegData((prev) => ({ ...prev, emailVerificationCode: value }))
            }
            numInputs={6}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: '50px',
              height: '50px',
              textAlign: 'center',
              margin: '20px 12px',
              border: '1px solid gray',
              background: 'rgba(217, 217, 217, 0.20)',
              borderRadius: '10px',
            }}
          />
        </div>
        <div className="text-center">
          <ActionButton
            btnClass="bg-bluewhale w-full px-4 md:px-8 py-1 md:py-2 text-14 lg:text-20 rounded-lg"
            btnName="Continue"
            onClick={handleRegister}
          />
          <p className="mx-3 mt-5 text-10 md:text-12 cursor-pointer">
            Didn&apos;t receive an email?{' '}
            <span className="text-bluewhale font-extrabold">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
}

OtpVerifySection.propTypes = {
  regData: PropTypes.object,
  handleRegister: PropTypes.func,
  setRegData: PropTypes.object,
};

export default OtpVerifySection;
