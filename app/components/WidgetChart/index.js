import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const WidgetChart = ({ eventId }) => {
  useEffect(() => {
    // Create script element
    const scriptCode = `(function(a,b,c,d,e,f,g,h,i){a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
)})(window,document,"script", "https://widgets.sir.sportradar.com/697e93551b60e2cb46fbcaca262ebaf1/widgetloader", "SIR", {
    theme: false, // using custom theme
    language: "en"
})`;
    const script = document.createElement('script');
    script.innerHTML = scriptCode;
    script.src =
      'https://widgets.sir.sportradar.com/697e93551b60e2cb46fbcaca262ebaf1/widgetloader';
    script.async = true;

    // Define onload handler
    script.onload = () => {
      window.SIR('addWidget', '.sr-widget', 'match.lmtPlus', {
        layout: 'double',
        scoreboard: 'disable',
        detailedScoreboard: 'disable',
        tabsPosition: 'top',
        matchId: eventId,
        logo: [
          '/images/bikoicon/matchlogo.png',
          '/images/bikoicon/matchlogo.png',
          '/images/bikoicon/matchlogo.png',
        ],
        pitchLogo: '/images/bikoicon/matchlogo.png',
        // goalBannerImage: '/images/bikoicon/matchlogo.png',
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

WidgetChart.propTypes = {
  eventId: PropTypes.number,
};

export default WidgetChart;
