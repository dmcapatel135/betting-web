import React from 'react';
import PropTypes from 'prop-types';

function InputField(props) {
  const { type, inpClass, placeholder, icon, iconClass, onChange, error } =
    props;
  return (
    <div className="relative py-2">
      <input
        type={type}
        placeholder={placeholder}
        className={inpClass}
        onChange={onChange}
      />
      {error && (
        <div className="text-left">
          <span className="text-red-500 text-14">{error}</span>
        </div>
      )}
      {icon && <div>{<img src={icon} alt="icon" className={iconClass} />}</div>}
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string,
  inpClass: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.object,
};
export default InputField;
