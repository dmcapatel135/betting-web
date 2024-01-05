import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  limit,
  length,
  error,
  label,
  labelClassName,
  className,
  ...rest
}) => {
  return (
    <div className="flex flex-col  gap-1">
      {label && (
        <div className="flex items-center justify-between">
          <label className={`${labelClassName || 'label-sm'} `} htmlFor={label}>
            {label}
          </label>
          {limit && (
            <span className="text-primary-gray text-12">
              {length || 0}/{limit}
            </span>
          )}
        </div>
      )}
      <textarea
        className={`form-input  h-[150px] py-2 resize-none ${
          error ? 'border-red-500' : 'border-zinc-300'
        } ${className || ''}`}
        {...rest}
      />
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  limit: PropTypes.number,
  length: PropTypes.number,
};

export default TextArea;
