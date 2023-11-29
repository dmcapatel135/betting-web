import React from 'react';
import PropTypes from 'prop-types';

function SelectField(props) {
  const { selectClass, list, onChange, error } = props;
  return (
    <div className="py-2">
      <select className={selectClass} onChange={onChange}>
        {list?.map((item, index) => {
          return (
            <option key={index}>
              {item.dial_code ? item.dial_code : item.name}
            </option>
          );
        })}
        <option>English</option>
      </select>
      {error && (
        <div className="text-left">
          <span className="text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}

SelectField.propTypes = {
  selectClass: PropTypes.string,
  list: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default SelectField;
