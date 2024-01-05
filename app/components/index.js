import React from 'react';
import loadable from '@utils/loadable';
import Loading from './Loading';

// Loading - No need to lazy load this component
export { default as Loading } from './Loading';

// Layout
export const Footer = loadable(() => import('./Footer'), {
  fallback: <Loading />,
});
export const Navbar = loadable(() => import('./Navbar'), {
  fallback: <Loading />,
});

// Form Elements
export const Button = loadable(() => import('./FormElements/Button'), {
  fallback: <Loading />,
});
export const DatePicker = loadable(() => import('./FormElements/DatePicker'), {
  fallback: <Loading />,
});
export const DateRangePicker = loadable(
  () => import('./FormElements/DateRangePicker'),
  {
    fallback: <Loading />,
  },
);
export const Input = loadable(() => import('./FormElements/Input'), {
  fallback: <Loading />,
});
export const CurrencyInput = loadable(
  () => import('./FormElements/CurrencyInput'),
  {
    fallback: <Loading />,
  },
);
export const ReactSelect = loadable(
  () => import('./FormElements/ReactSelect'),
  {
    fallback: <Loading />,
  },
);
export const Select = loadable(() => import('./FormElements/Select'), {
  fallback: <Loading />,
});
export const TextArea = loadable(() => import('./FormElements/TextArea'), {
  fallback: <Loading />,
});

// Forms
export const Login = loadable(() => import('./Forms/Login'), {
  fallback: <Loading />,
});
export const Register = loadable(() => import('./Forms/Register'), {
  fallback: <Loading />,
});
export const ForgotPassword = loadable(() => import('./Forms/ForgotPassword'), {
  fallback: <Loading />,
});

// Common
export const Loader = loadable(() => import('./Loader'), {
  fallback: <Loading />,
});
export const Pagination = loadable(() => import('./Pagination'), {
  fallback: <Loading />,
});

export const BetWallet = loadable(() => import('./BetWallet'), {
  fallback: <Loading />,
});

export const BetDetailCard = loadable(() => import('./BetDetailCard'), {
  fallback: <Loading />,
});

export const Balance = loadable(() => import('./Balance'), {
  fallback: <Loading />,
});

export const MobileInputField = loadable(() => import('./MobileInputField'), {
  fallback: <Loading />,
});

export const AuthSideSection = loadable(() => import('./AuthSideSection'), {
  fallback: <Loading />,
});

export const CompanyContact = loadable(() => import('./CompanyContact'), {
  fallback: <Loading />,
});

export const CustomerCareContact = loadable(
  () => import('./CustomerCareContact'),
  {
    fallback: <Loading />,
  },
);

export const BetCard = loadable(() => import('./BetCard'), {
  fallback: <Loading />,
});

export const HeroSection = loadable(() => import('./HeroSection'), {
  fallback: <Loading />,
});
