import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { refreshUserDetails } from '@actions';
import { validateData } from '@utils/validation';
import { emailRegex } from '@utils/regex';
import { postReq, patchReq, showErrorMessage } from '@utils/apiHandlers';

const useProfile = () => {
  const dispatch = useDispatch();

  const updateProfileDetails = useCallback(
    async (data) => {
      const [valid, error] = await validateData(updateProfileSchema, data);
      if (error) return error;
      if (valid) {
        const response = await patchReq('/users/me', {
          ...data,
          mobile: data.dialCode + data.mobile,
        });
        if (response.status) {
          toast.success('Your profile details has been successfully updated');
          dispatch(refreshUserDetails());
        } else {
          showErrorMessage(response.error.message);
        }
      }
    },
    [dispatch],
  );

  const updateProfileImage = useCallback(
    async (data) => {
      const { data: file } = await postReq('/upload', data);
      const { filename } = file.meta;

      const response = await postReq('/users/me/profile-image', {
        profileImage: filename,
      });
      if (response.status) {
        toast.success('Your profile image has been successfully updated');
        dispatch(refreshUserDetails());
      } else {
        showErrorMessage(response.error.message);
      }
    },
    [dispatch],
  );

  return {
    updateProfileDetails,
    updateProfileImage,
  };
};

const updateProfileSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email address'),
  mobile: yup.string().required('Mobile number is required'),
  dialCode: yup.string().required('Dial code is required'),
  country: yup.string().required('Country is required'),
});

export default useProfile;
