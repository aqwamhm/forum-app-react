import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Leaderboards from './pages/Leaderboards.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ThreadDetail from './pages/ThreadDetail.jsx';
import CreateThread from './pages/CreateThread.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const { isPreload = false, authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/threads/:threadId"
            element={<ThreadDetail />}
          />
          <Route
            path="/create"
            element={
              authUser ? (
                <CreateThread />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
