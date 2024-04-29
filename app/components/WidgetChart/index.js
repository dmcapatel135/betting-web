import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const WidgetChart = ({ eventId }) => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://widgets.sir.sportradar.com/sportradar/widgetloader';
    script.async = true;

    // Define onload handler
    script.onload = () => {
      window.SIR(
        'addWidget',
        '#sr-widget',
        'match.lmtPlus',
        // {
        // matchId: 26109428,
        // onItemClick: function (type, obj) {
        //   alert('teamId:' + obj.teamId + '\nplayerId: ' + obj.playerId);
        // },
        // }
        // {
        //   theme: false, // using custom theme
        //   language: 'en',
        // },
        {
          branding: {
            tabs: {
              option: 'iconText',
              iconPosition: 'start',
              variant: 'fullWidth',
            },
          },
          layout: 'double',
          collapseTo: 'scoreboard',
          tabsPosition: 'top',
          matchId: eventId,
        },
      );
    };

    // Append script to body
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [eventId]);

  return <div id="sr-widget" className="bg-black"></div>;
};

WidgetChart.propTypes = {
  eventId: PropTypes.number,
};

export default WidgetChart;
