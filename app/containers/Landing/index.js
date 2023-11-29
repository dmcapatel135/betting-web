import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setNotif } from 'Actions';
import Template from '../../components/Template/Template';
import HeroSection from './HeroSection';
import CoinSection from './CoinSection';
import Resources from './Resources';

function Landing(props) {
  const { t } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotif({ message: t('MSG001'), variant: 'success' }));
  }, []);

  return (
    <Template>
      <HeroSection />
      <CoinSection />
      <Resources />
    </Template>
  );
}

Landing.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Landing);
