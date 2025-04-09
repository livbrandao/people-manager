import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/step2" element={<ComingSoonPage />} />
        <Route path="/step3" element={<ComingSoonPage />} />
        <Route path="/step4" element={<ComingSoonPage />} />
        <Route path="/step5" element={<ComingSoonPage />} />
        <Route path="/step6" element={<ComingSoonPage />} />
        <Route path="/step7" element={<ComingSoonPage />} />
        <Route path="/step8" element={<ComingSoonPage />} />
        <Route path="/step9" element={<ComingSoonPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
