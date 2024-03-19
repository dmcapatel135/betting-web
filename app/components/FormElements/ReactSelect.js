import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { reactIcons } from '@utils/icons';

const ReactSelect = ({
  options,
  style,
  error,
  maxMenuHeight,
  label,
  labelClassName,
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
      <div className="relative w-full ">
        <Select
          options={options}
          className="basic-multi-select"
          classNamePrefix="react-select"
          selectProps="any"
          styles={styles(style)}
          maxMenuHeight={maxMenuHeight ? 200 : 400}
          isOptionDisabled={(option) => option.disabled}
          {...rest}
        />
        <span className="ay-center z-[3] pointer-events-none text-primary-yellow text-18 right-2">
          {reactIcons.arrowdownFill}
        </span>
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};

ReactSelect.propTypes = {
  options: PropTypes.array.isRequired,
  style: PropTypes.object,
  maxMenuHeight: PropTypes.bool,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

const styles = (style) => {
  return {
    control: (base) => ({
      ...base,
      border: !style?.borderNone ? '1px solid  #F3BA2C' : 0,
      paddingLeft: style?.paddingLeft || '8px',
      paddingRight: style?.paddingRight || '16px',
      background: style?.background || 'transparent',
      color: '#fff',
      outline: 'none',
      borderRadius: style?.borderRadius || '6px',
      height: style?.height || '48px',
      width: '100%',
      boxShadow: 'none',
      '&:hover': {
        border: !style?.borderNone ? '1px solid #fde047 !important' : 0,
      },
      '&:focus': {
        border: !style?.borderNone ? '1px solid #fde047 !important' : 0,
      },
    }),
    menuList: (styles) => ({
      ...styles,
      background: '#242424',
      color: 'white',
      padding: 0,
      borderRadius: '4px',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      display: 'none',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#fff',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#fff',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    option: (styles, { isSelected, isDisabled }) => ({
      ...styles,
      cursor: 'pointer',
      color: isSelected ? '#fff' : '#fff',
      background: isSelected ? '#F3BA2C' : '#242424',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#F3BA2C'
            : '#fde047'
          : undefined,
        color: !isDisabled ? (isSelected ? '#fff' : '#fff') : undefined,
      },
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
      background: '#242424',
    }),
  };
};

export default ReactSelect;
