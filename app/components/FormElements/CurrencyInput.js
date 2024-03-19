import React from 'react';
import PropTypes from 'prop-types';
import { default as Input } from 'react-currency-input-field';

const CurrencyInput = ({
  readOnly,
  label,
  labelClassName,
  error,
  className,
  addon,
  addonRight,
  onChange,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className={`${labelClassName || 'label-sm'}`} htmlFor={label}>
            {label}
          </label>
        </div>
      )}
      <div className="relative w-full">
        {addon && (
          <div className="w-16 rounded-l-md h-full ay-center border-r flex-center text-black bg-primary-yellow border-r-primary-yellow">
            {addon}
          </div>
        )}
        {addonRight && (
          <div className="w-12 rounded-r-md h-full ay-center right-0 border-r flex-center text-black bg-primary-yellow border-r-primary-yellow">
            {addonRight}
          </div>
        )}
        <Input
          className={`input-new w-full resize-none  ${
            readOnly ? 'bg-gray-900 text-zinc-500' : ''
          } ${error ? 'border-red-500' : 'border-primary-yellow'}  ${
            addon ? 'pl-[72px] ' : ''
          } ${className || ''}`}
          readOnly={readOnly}
          decimalsLimit={2}
          allowNegativeValue={false}
          onValueChange={(value, name) =>
            onChange({ target: { name, value: value || '' } })
          }
          {...rest}
        />
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};

CurrencyInput.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  addon: PropTypes.node,
  addonRight: PropTypes.node,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CurrencyInput;
