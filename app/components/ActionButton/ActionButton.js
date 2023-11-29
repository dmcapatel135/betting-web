import React from 'react';
import PropTypes from 'prop-types';

function ActionButton(props) {
  const { btnName, btnClass, onClick, icon, iconClass } = props;
  return (
    <div className="relative">
      <button className={btnClass} onClick={onClick}>
        {btnName}
      </button>
      {icon && <img src={icon} alt="google" className={iconClass} />}
    </div>
  );
}
ActionButton.propTypes = {
  btnName: PropTypes.string,
  btnClass: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
};
export default ActionButton;
