import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/step2" element={<HomePage />} />
        <Route path="/step3" element={<HomePage />} />
        <Route path="/step4" element={<HomePage />} />
        <Route path="/step5" element={<HomePage />} />
        <Route path="/step6" element={<HomePage />} />
        <Route path="/step7" element={<HomePage />} />
        <Route path="/step8" element={<HomePage />} />
        <Route path="/step9" element={<HomePage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
