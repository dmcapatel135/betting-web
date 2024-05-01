import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const WidgetStatisticsChart = ({ eventId }) => {
  useEffect(() => {
    // Create script element
    const scriptCode = `(function(a,b,c,d,e,f,g,h,i){a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
)})(window,document,"script", "https://widgets.sir.sportradar.com/3ce7b7ceaafea16ca3e9692394b97eda/widgetloader", "SIR", {
    theme: false, // using custom theme
    language: "en"
})`;
    const script = document.createElement('script');
    script.innerHTML = scriptCode;
    script.src =
      'https://widgets.sir.sportradar.com/3ce7b7ceaafea16ca3e9692394b97eda/widgetloader';
    script.async = true;

    // Define onload handler
    script.onload = () => {
      window.SIR('addWidget', '.sr-widget-1', 'headToHead.button', {
        layout: 'inline', // Adjust layout to show the full widget vertically
        disableScoreboard: true,
        components: ['headtohead', 'form', 'teamstats', 'lastmatches'],
        gamePulseBtnEnable: true,
        matchId: eventId,
      });
    };

    // Append script to body
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [eventId]);

  return (
    <div className="widgets">
      <div>
        <div className="sr-widget sr-widget-1"></div>
      </div>
    </div>
  );
};

WidgetStatisticsChart.propTypes = {
  eventId: PropTypes.number,
};

export default WidgetStatisticsChart;
