import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Splash from './components/Splash';
import RegionSelection from './components/RegionSelection';
import Login from './components/Login';
import VoterDashboard from './components/VoterDashboard';
import BLADashboard from './components/BLADashboard';
import BLODashboard from './components/BLODashboard';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/region" element={<RegionSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/voter-dashboard" element={<VoterDashboard />} />
        <Route path="/bla-dashboard" element={<BLADashboard />} />
        <Route path="/blo-dashboard" element={<BLODashboard />} />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
