import React, { Fragment, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  // DashboardLayout,
  OuterLayout,
  // Landing,
  // Dashboard,
  NotFound,
  Login,
  JoinNow,
  ForgotPassword,
  MyBets,
  MyTransactions,
  Batting,
  SingleBetDetails,
  Jackpot,
  HowToPlay,
  MobileBetSlip,
} from '@containers/pageListAsync';
// import ProtectedRoutes from './ProtctedRoutes';
import Deposit from '@containers/Deposit';
import Withdraw from '@containers/Withdraw';
import { useDispatch } from 'react-redux';
import { fetchBetDetailsAction, fetchJackpotDetailsAction } from '@actions';
import { loadStateFromJackpotLocalStorage, loadStateFromLocalStorage } from '.';

function App() {
  const { pathname, hash } = useLocation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    let data = [];
    if (loadStateFromJackpotLocalStorage()?.selectedJackpot) {
      data = loadStateFromJackpotLocalStorage()?.selectedJackpot;
    }
    if (loadStateFromLocalStorage()) {
      dispatch(fetchBetDetailsAction(loadStateFromLocalStorage().selectedBet));
      dispatch(fetchJackpotDetailsAction(data));
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<OuterLayout />}>
          <Route index element={<Batting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join-now" element={<JoinNow />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard/live-now" element={<Batting />} />
          <Route path="/dashboard/upcoming" element={<Batting />} />
          <Route path="/dashboard/popular" element={<Batting />} />
          <Route path="/dashboard/jackpot" element={<Jackpot />} />
          <Route path="/dashboard/how-to-play" element={<HowToPlay />} />
          <Route path="/dashboard/my-bets" element={<MyBets />} />
          <Route path="/dashboard/deposit" element={<Deposit />} />
          <Route path="/dashboard/withdraw" element={<Withdraw />} />
          <Route
            path="/dashboard/single-bets/:eventId"
            element={<SingleBetDetails />}
          />
          <Route
            path="/dashboard/my-transactions"
            element={<MyTransactions />}
          />
          <Route path="/dashboard/bet-slip" element={<MobileBetSlip />} />
          <Route path="/dashboard" element={<Batting />} />
        </Route>

        {/* <Route path="/dashboard" element={<OuterLayout />}>
          <Route index element={<Batting />} />

          <Route index path="/dashboard/:sId/:statusId" element={<Batting />} />
          <Route
            index
            path="/dashboard/:sId/:statusId/:eId"
            element={<Batting />}
          />
          <Route index path="/dashboard/upcoming" element={<Batting />} />
          <Route index path="/dashboard/:eId" element={<Batting />} />
          <Route
            path="/dashboard/single-bets/:sId/:statusId/:eventId/:eventNames"
            element={<SingleBetDetails />}
          />
          <Route path="/dashboard/jackpot" element={<Jackpot />} />
          <Route path="my-bets" element={<MyBets />} />
          <Route
            path="/dashboard/bet-slip/:statusId"
            element={<MobileBetSlip />}
          />
          <Route path="my-transactions" element={<MyTransactions />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route
            path="/dashboard/how-to-play/:statusId"
            element={<HowToPlay />}
          />
        </Route> */}

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
