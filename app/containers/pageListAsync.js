import React from 'react';
import { Loading } from '@components';
import loadable from '@utils/loadable';

// Layouts
export const DashboardLayout = loadable(
  () => import('./Layouts/DashboardLayout'),
  {
    fallback: <Loading />,
  },
);
export const OuterLayout = loadable(() => import('./Layouts/OuterLayout'), {
  fallback: <Loading />,
});

// Static Pages
export const Landing = loadable(() => import('./Landing'), {
  fallback: <Loading />,
});
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});

// Dashboard
export const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});

export const Login = loadable(() => import('./Login'), {
  fallback: <Loading />,
});

export const JoinNow = loadable(() => import('./JoinNow'), {
  fallback: <Loading />,
});

export const ForgotPassword = loadable(() => import('./ForgotPassword'), {
  fallback: <Loading />,
});

export const MyBets = loadable(() => import('./MyBets'), {
  fallback: <Loading />,
});

export const MyTransactions = loadable(() => import('./MyTransactions'), {
  fallback: <Loading />,
});

export const Batting = loadable(() => import('./Batting'), {
  fallback: <Loading />,
});

export const SingleBetDetails = loadable(() => import('./SingleBetDetails'), {
  fallback: <Loading />,
});

export const Jackpot = loadable(() => import('./Jackpot'), {
  fallback: <Loading />,
});

export const Deposit = loadable(() => import('./Deposit'), {
  fallback: <Loading />,
});

export const Withdraw = loadable(() => import('./Withdraw'), {
  fallback: <Loading />,
});

export const HowToPlay = loadable(() => import('./HowToPlay'), {
  fallback: <Loading />,
});

export const MobileBetSlip = loadable(() => import('./MobileBetSlip'), {
  fallback: <Loading />,
});
