import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';

function Template({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.any,
};
export default Template;
