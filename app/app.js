import React, { Fragment, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  // DashboardLayout,
  OuterLayout,
  Landing,
  // Dashboard,
  NotFound,
  Login,
  JoinNow,
  ForgotPassword,
  MyBets,
  MyTransactions,
  Batting,
} from '@containers/pageListAsync';
import ProtectedRoutes from './ProtctedRoutes';

function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on url change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Scroll to element on hash change
    const element = document.getElementById(hash.replace('#', ''));
    if (element) {
      element.scrollIntoView(true);
    }
  }, [hash]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<OuterLayout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join-now" element={<JoinNow />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="my-bets" element={<MyBets />} />
          <Route path="my-transactions" element={<MyTransactions />} />
        </Route>

        <Route path="/dashboard" element={<OuterLayout />}>
          <Route
            index
            element={
              <ProtectedRoutes>
                <Batting />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </Fragment>
  );
}

export default App;
