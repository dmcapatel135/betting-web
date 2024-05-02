/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { reactIcons } from '@utils/icons';
const DateRangePickerCustom = ({
  error,
  className,
  date,
  onChange,
  dateFormat = 'MMM d, yyyy',
  startDate,
  endDate,
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex justify-between w-full pr-4 md:pr-8 h-full items-center text-12 md:text-14"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  return (
    <div className="">
      <div
        className={`flex items-center px-2 md:px-4 border-c relative rounded-sm h-8 date-sm w-full ${
          error ? ' border-red-500 ' : 'border-c'
        } ${className}`}
      >
        <ReactDatePicker
          selectsRange
          onChange={onChange}
          selected={date || new Date()}
          startDate={startDate}
          endDate={endDate}
          dateFormat={dateFormat}
          showPopperArrow={false}
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                rootBoundary: 'viewport',
                tether: false,
                altAxis: true,
              },
            },
          ]}
          customInput={<CustomInput />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex justify-between items-center gap-6 px-2 py-1">
              <button
                className="flex-center w-9 h-9 bg-blue rounded-full text-16 text-white"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {reactIcons.arrowleft}
              </button>
              <div>
                <h6 className="text-16 font-semibold leading-[1]">
                  {moment(date).format('MMMM')}
                </h6>
              </div>

              <button
                className="flex-center w-9 h-9 bg-blue rounded-full text-16 text-white"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {reactIcons.arrowright}
              </button>
            </div>
          )}
        />
        <span className="ay-center z-[3] pointer-events-none text-black text-18 right-2">
          {reactIcons.arrowdown}
        </span>
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};
DateRangePickerCustom.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  dateFormat: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  date: PropTypes.any,
  icon: PropTypes.bool,
  isCustomIcon: PropTypes.bool,
  onChange: PropTypes.func,
  handleCustomIcon: PropTypes.func,
};
export default DateRangePickerCustom;
