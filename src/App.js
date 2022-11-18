import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SurveyPage from './pages/SurveyPage';
import RecommendPage from './pages/RecommendPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path='/recommend' element={<RecommendPage />} />
    </Routes>
  );
}

export default App;
