import React from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@utils/icons';

const Select = ({ options, error, className, ...rest }) => {
  return (
    <div
      className={`flex items-center border rounded-md bg-white ${
        error ? ' border-red-500 ' : 'border-zinc-200'
      } ${className || ''}`}
    >
      <div className="form-select-custom relative">
        <select {...rest}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="ay-center z-[3] pointer-events-none text-primary-gray text-18 right-2">
          {reactIcons.arrowdown}
        </span>
      </div>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  index: PropTypes.number,
  value: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
