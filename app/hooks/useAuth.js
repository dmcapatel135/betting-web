import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { init, cleanup } from '@actions';
import { validateData } from '@utils/validation';
import { passwordRegex } from '@utils/regex';
import {
  postReq,
  removeAuthCookie,
  setAuthCookie,
  setToken,
  showErrorMessage,
} from '@utils/apiHandlers';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    const response = await postReq('/auth/logout');
    if (response.status) {
      removeAuthCookie();
      localStorage.removeItem('is_user_token');
      dispatch(cleanup());
      window.location = '/';
      return true;
    }
  }, [dispatch]);

  const navigateAuthenticatedUser = useCallback(() => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'lastUrl')) {
      // Turned off to enable new auth redirection
      // const lastUrl = localStorage.getItem('lastUrl');
      // localStorage.removeItem('lastUrl');
      // navigate(lastUrl);
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
    localStorage.setItem('newAuth', 'true');
  }, [navigate]);

  const login = useCallback(
    async (data) => {
      const [valid, error] = await validateData(loginSchema, data);
      if (error) return error;
      if (valid) {
        const response = await postReq('/auth/login', data);
        if (response.status) {
          setAuthCookie();
          setToken(response.data.accessToken);
          toast.success(
            'Welcome! You have successfully logged in to the Bikosports Platform',
          );
          dispatch(init());
          navigateAuthenticatedUser();
        } else {
          showErrorMessage(response.error.message);
        }
      }
    },
    [dispatch, navigateAuthenticatedUser],
  );

  const register = useCallback(
    async (data) => {
      const [valid, error] = await validateData(registerSchema, data);
      if (error) return error;
      if (valid) {
        const response = await postReq('/auth/register', {
          ...data,
          mobile: data.dialCode + data.mobile,
        });
        if (response.status) {
          setAuthCookie();
          toast.success(
            'Welcome! You have successfully logged in to the Bikosports Platform',
          );
          dispatch(init());
          navigateAuthenticatedUser();
        } else {
          showErrorMessage(response.error.message);
        }
      }
    },
    [dispatch, navigateAuthenticatedUser],
  );

  const sendRegisterCode = useCallback(async (data) => {
    const [valid, error] = await validateData(registerSchema, data);
    if (error) return [null, error];
    if (valid) {
      const response = await postReq('/auth/send-code', {
        // email: data.email,
        dialCode: data.dialCode,
        mobile: data.dialCode + data.mobile,
        country: data.country,
        type: data.type,
      });
      if (response.status) {
        return [response.data];
      } else {
        showErrorMessage(response.error.message);
      }
    }
    return [null];
  }, []);

  const sendForgotPasswordCode = useCallback(async (data) => {
    const [valid, error] = await validateData(forgotPasswordSchema, {
      mobile: data.dialCode + data.mobile,
    });
    if (error) return [null, error];
    if (valid) {
      const response = await postReq('/auth/forgot-password', {
        mobile: data.dialCode + data.mobile,
      });
      if (response.status) {
        return [response.data];
      } else {
        showErrorMessage(response.error.message);
      }
    }
    return [null];
  }, []);

  const resetPassword = useCallback(async (data) => {
    const [valid, error] = await validateData(resetPasswordSchema, {
      code: data.code,
      mobile: data.mobile,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
    if (error) return [null, error];
    if (valid) {
      const response = await postReq('/auth/reset-password', {
        code: data.code,
        mobile: data.dialCode + data.mobile,
        newPassword: data.newPassword,
      });
      if (response.status) {
        toast.success('You account password is reset successfully');
        return [true];
      } else {
        showErrorMessage(response.error.message);
      }
    }
    return [null];
  }, []);

  return {
    logout,
    login,
    register,
    sendRegisterCode,
    resetPassword,
    sendForgotPasswordCode,
  };
};

const loginSchema = yup.object({
  emailOrMobile: yup.string().required('Mobile number is required'),
  // dialCode: yup.string().required('Dial code is required'),
  password: yup.string().required('Password is required'),
});

const registerSchema = yup.object({
  // firstname: yup.string().required('First name is required'),
  // lastname: yup.string().required('Last name is required'),
  // email: yup
  //   .string()
  //   .required('Email is required')
  //   .matches(emailRegex, 'Invalid email address'),
  mobile: yup.string().required('Mobile number is required'),
  dialCode: yup.string().required('Dial code is required'),
  country: yup.string().required('Country is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must be atleast 8 characters including one uppercase letter, one special character and alphanumeric characters',
    ),
});

const forgotPasswordSchema = yup.object({
  // email: yup
  //   .string()
  //   .required('Email is required')
  //   .matches(emailRegex, 'Invalid email address'),
  mobile: yup.string().required('Mobile number is required'),
});

const resetPasswordSchema = yup.object({
  code: yup.string().required('Verification code is required').length(6),
  // email: yup
  //   .string()
  //   .required('Email is required')
  //   .matches(emailRegex, 'Invalid email address'),
  mobile: yup.string().required('Mobile number is required'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .matches(
      passwordRegex,
      'Password must be atleast 8 characters including one uppercase letter, one special character and alphanumeric characters',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf(
      [yup.ref('newPassword'), null],
      'New Password and confirm password do not match',
    ),
});

export default useAuth;
