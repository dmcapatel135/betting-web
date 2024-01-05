import React from 'react';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';

const Button = ({ isLoading, childrens, className, ...rest }) => {
  return (
    <button
      className={`disabled:opacity-50 relative disabled:cursor-not-allowed ${
        className || ''
      } ${isLoading && 'cursor-not-allowed'}`}
      {...rest}
    >
      {isLoading && (
        <BeatLoader color="#ffffff" className="absolute ax-center z-[1]" />
      )}
      <div className={`btn ${isLoading && 'opacity-0'}`}>{childrens}</div>
    </button>
  );
};

Button.propTypes = {
  childrens: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
