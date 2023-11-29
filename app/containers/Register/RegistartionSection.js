import React from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputField from '../../components/InputField/InputField';
import PropTypes from 'prop-types';
import SelectField from '../../components/SelectField/SelectField';
import { countryList, dialCodeList } from '../../utils/constant';
import { RenderError } from '../../utils/validation';

function RegistartionSection({ setRegData, error, handleRegister, setError }) {
  return (
    <div className="w-full pb-12 pt-5 mt-5 px-12 rounded-xl bg-lightgreen">
      <div className="text-center py-5 ">
        <span>Create to your account</span>
      </div>
      <div className="text-center">
        <ActionButton
          btnClass="border-[1px] border-white  pl-8 md:text-14 lg:text-16 xl:text-20 bg-lightgreen h:10 md:h-12 md:py-0 py-1 w-full rounded-lg"
          btnName="Sign up using Google"
          icon="/images/icons/google.png"
          iconClass="absolute  w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8 top-[8px] left-[13%] md:top-[12px] md:left-[12%] lg:top-[12px] lg:left-[22%] xl:top-[8px] xl:left-[23%]"
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
          <span>Sign up using Email Address</span>
        </div>
        <div className="flex justify-between mb-3">
          <InputField
            type="text"
            inpClass="h-8 md:h-12 text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-black"
            placeholder="First Name"
            onChange={(e) => {
              setError((prev) => ({
                ...prev,
                firstnameErr: '',
              }));
              setRegData((prev) => ({ ...prev, firstname: e.target.value }));
            }}
            error={RenderError(error.firstname)}
          />
          <InputField
            type="text"
            inpClass="h-8 md:h-12 text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-black"
            placeholder="Last Name"
            onChange={(e) => {
              setError((prev) => ({
                ...prev,
                lastnameErr: '',
              }));
              setRegData((prev) => ({ ...prev, lastname: e.target.value }));
            }}
            error={RenderError(error.lastname)}
          />
        </div>
        <InputField
          type="text"
          inpClass="h-8 md:h-12 text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-black"
          placeholder="Enter your email address"
          onChange={(e) =>
            setRegData((prev) => ({ ...prev, email: e.target.value }))
          }
          error={RenderError(error.email)}
        />
        <div className="flex my-1 w-full">
          <SelectField
            type="text"
            selectClass="h-8 md:h-12  w-16  md:mr-0 md:w-16 text-12 md:text-16 bg-lightgreen  rounded-lg border-[1px] outline-none px-2 text-black"
            placeholder="+91"
            list={dialCodeList}
            onChange={(e) => {
              setRegData((prev) => ({ ...prev, dialCode: e.target.value }));
            }}
          />
          <InputField
            type="phone"
            inpClass="h-8 md:h-12 text-12 ml-6 md:text-16 bg-lightgreen w-32 md:w-44 lg:w-64 xl:w-96  rounded-lg border-[1px] outline-none px-2 text-black"
            placeholder="9614624623"
            onChange={(e) => {
              setError((prev) => ({
                ...prev,
                mobileErr: '',
              }));
              setRegData((prev) => ({ ...prev, mobile: e.target.value }));
            }}
            error={RenderError(error.mobile)}
          />
        </div>
        <SelectField
          selectClass="h-8 md:h-12 my-2 text-12 md:text-16 bg-lightgreen w-full rounded-lg border-[1px] outline-none px-2 text-black"
          list={countryList}
          onChange={(e) => {
            setError((prev) => ({
              ...prev,
              firstnameErr: '',
            }));
            setRegData((prev) => ({ ...prev, country: e.target.value }));
          }}
          error={RenderError(error.country)}
        />
        <InputField
          type="password"
          inpClass="md:h-12 h-8 mb-1 text-12 md:text-16 bg-lightgreen w-full rounded-lg border-[1px] outline-none px-2 text-black"
          placeholder="Enter your password"
          icon="/images/icons/show_icon.png"
          iconClass="absolute top-5 md:top-7 right-3"
          onChange={(e) => {
            setError((prev) => ({
              ...prev,
              passwordErr: '',
            }));
            setRegData((prev) => ({ ...prev, password: e.target.value }));
          }}
          error={RenderError(error.password)}
        />
        <InputField
          type="password"
          inpClass="md:h-12 h-8 mb-3 text-12 md:text-16 bg-lightgreen w-[100%] rounded-lg border-[1px] outline-none px-2 text-black"
          placeholder="Enter your confirm password"
          icon="/images/icons/show_icon.png"
          iconClass="absolute top-2 md:top-4 right-3"
          onChange={(e) => {
            setError((prev) => ({
              ...prev,
              confPasswordErr: '',
            }));
            setRegData((prev) => ({ ...prev, confPassword: e.target.value }));
          }}
          error={RenderError(error.password)}
        />
      </div>
      <div className="lg:flex  items-center text-center">
        <ActionButton
          btnClass="bg-bluewhale w-full px-4 md:px-8 py-1 md:py-2 text-14 lg:text-20 rounded-lg"
          btnName="Sign up"
          onClick={handleRegister}
        />
        <a href="/login" className="mx-3 text-10 md:text-12 cursor-pointer">
          Already a member? Login Here.
        </a>
      </div>
    </div>
  );
}

RegistartionSection.propTypes = {
  regData: PropTypes.object,
  error: PropTypes.object,
  setError: PropTypes.object,
  handleRegister: PropTypes.func,
  setRegData: PropTypes.object,
};

export default RegistartionSection;
