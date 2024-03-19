import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ showForgotPasswordScreen }) => {
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const error = await login(form);
    if (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-[30px] min-h-[600px]">
      <p className="para-24 text-center">Login</p>
      <p className="text-16 text-center text-primary-yellow pt-[30px]">
        Please enter your credentials to login{' '}
      </p>
      <form onSubmit={handleSubmit} className="pt-[30px] space-y-5">
        <input
          type="text"
          autoComplete="false"
          placeholder="Your Email Address"
          className="border rounded-[8px] py-2 px-3 h-[48px] w-full bg-transparent"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {renderError(error.email)}
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete="false"
            placeholder="Your Password"
            className="border rounded-[8px] py-2 px-3 h-[48px] w-full bg-transparent "
            name="password"
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
        <div className="flex items-center justify-between gap-2">
          <Link
            className="text-primary-yellow"
            onClick={showForgotPasswordScreen}
          >
            Forget Password ?
          </Link>
        </div>
        <button type="submit" className="btn-lg w-full">
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  showForgotPasswordScreen: PropTypes.func.isRequired,
};

export default Login;
