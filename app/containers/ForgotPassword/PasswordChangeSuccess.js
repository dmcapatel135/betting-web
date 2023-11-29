import React from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';

function PasswordChangeSuccess() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="text-center">
        <h1 className="text-24 font-extrabold">
          Password recovered successfully.
        </h1>
        <div className="flex justify-center pl-6">
          <img src="/images/success_fire.png" alt="success" className="" />
        </div>
        <h1 className="text-24 font-extrabold">Congratulations!</h1>
        <p>
          Your account password has been reset successfully! Now you can login
          into account with new password
        </p>
        <div className="mt-5">
          <ActionButton
            btnName="Login to your account"
            btnClass="bg-bluewhale px-4 px-5 py-1 md:py-2 text-16 lg:text-20 rounded-lg"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordChangeSuccess;
