import './App.css';
import HomePage from './pages/HomePage/HomePage';
import GenerateMemePage from './pages/GenerateMemePage/GenerateMemePage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/generating" element={<GenerateMemePage/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
