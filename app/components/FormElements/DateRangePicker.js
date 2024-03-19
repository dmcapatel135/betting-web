import 'react-datepicker/dist/react-datepicker.css';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { reactIcons } from '@utils/icons';

const CustomInput = forwardRef(function CustomInput({ value, onClick }, ref) {
  return (
    <button
      className="flex text-center w-full pr-4 text-16 md:text-11 xl:text-16 xl2:text-15"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  );
});

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const DateRangePicker = ({
  startDate,
  endDate,
  error,
  className,
  icon,
  dateFormat = 'MMM d, yyyy',
  onChange,
  ...rest
}) => {
  return (
    <>
      <div
        className={`flex items-center px-4 border  border-primary-yellow relative rounded-md h-[45px] date-sm w-full ${
          error ? ' border-red-500 ' : 'border-primary-yellow'
        } ${className || ''}`}
      >
        <ReactDatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={([start, end]) => {
            start = moment(start).toDate();
            end = end ? moment(end).endOf('date').toDate() : null;
            onChange([start, end]);
          }}
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
                className="flex-center w-9 h-9 bg-primary-yellow rounded-full text-16 text-white"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {reactIcons.arrowleft}
              </button>
              <div>
                <h6 className="text-16 font-semibold leading-[1]">
                  {moment(date).format('MMM')}
                </h6>
              </div>

              <button
                className="flex-center w-9 h-9 bg-primary-yellow rounded-full text-16 text-white"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {reactIcons.arrowright}
              </button>
            </div>
          )}
          {...rest}
        />
        {icon && (
          <>
            <span className="ay-center z-[3] pointer-events-none text-primary-yellow text-18 right-2">
              {reactIcons.arrowdownFill}
            </span>
          </>
        )}
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </>
  );
};

DateRangePicker.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  icon: PropTypes.bool,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
