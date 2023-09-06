import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import RoadMap from './Pages/RoadMap';
import Templates from './Pages/Templates';
import Resources from './Pages/Resources';
import Playground from './Pages/Playground';
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/roadmap' element={<RoadMap />} />
      <Route path='/resources' element={<Resources />} />
      <Route path='/playground' element={<Playground />} />
      <Route path='/templates' element={<Templates />} />
    </Routes>
  );
}

export default App;
