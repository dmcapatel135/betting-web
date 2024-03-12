import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { images } from '@utils/images';

function AuthSideSection({ bgBtn, imgHeight }) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className={`flex justify-left items-center text-12 font-[700]  font-roboto px-3 py-2 rounded-[8px] w-full h-[48px] ${
          !bgBtn
            ? 'bg-gradient-color-3 text-[#3D3D3D]'
            : 'bg-gradient-color-1 text-white'
        }`}
        onClick={() => navigate('/login')}
      >
        <img
          src={
            bgBtn
              ? '/images/bikoicon/passkey.png'
              : '/images/bikoicon/passkeyblack.png'
          }
          alt="icon"
          className="w-5 h-5 mx-2"
        />{' '}
        LOG IN
      </button>
      <button
        className={`flex my-3 justify-left items-center text-12 font-[700] text-[#3D3D3D] font-roboto px-3 py-2 rounded-[8px] w-full h-[48px] ${
          bgBtn
            ? 'bg-gradient-color-3 text-[#3D3D3D]'
            : 'bg-gradient-color-1 text-white'
        }`}
        onClick={() => navigate('/join-now')}
      >
        <img
          src={
            bgBtn
              ? '/images/bikoicon/joinnow.png'
              : '/images/bikoicon/joinnowwhite.png'
          }
          alt="icon"
          className="w-5 h-5 mx-2"
        />{' '}
        JOIN NOW
      </button>
      <div className="rounded-[8px] overflow-hidden h-[345px]">
        <img
          src={images.authside}
          alt="img"
          className={`w-full h-full object-cover ${imgHeight ? '' : ''}`}
        />
      </div>
    </div>
  );
}
AuthSideSection.propTypes = {
  bgBtn: PropTypes.bool,
  imgHeight: PropTypes.string,
};

export default AuthSideSection;
