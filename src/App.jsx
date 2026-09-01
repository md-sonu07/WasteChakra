import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SystemProcess from './pages/SystemProcess';
import TheProblem from './pages/TheProblem';
import AdaptiveIntelligence from './pages/AdaptiveIntelligence';
import InnovationValue from './pages/InnovationValue';
import Impact from './pages/Impact';
import Team from './pages/Team';
import FinalCTA from './pages/FinalCTA';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="system" element={<SystemProcess />} />
          <Route path="process" element={<AdaptiveIntelligence />} />
          <Route path="innovation" element={<InnovationValue />} />
          <Route path="impact" element={<Impact />} />
          <Route path="team" element={<Team />} />
          <Route path="problem" element={<TheProblem />} />
          <Route path="final" element={<FinalCTA />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
