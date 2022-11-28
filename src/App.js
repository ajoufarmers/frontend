import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SurveyPage from './pages/SurveyPage';
import RecommendPage from './pages/RecommendPage';
import CalendarPage from './pages/CalendarPage';
import MyPage from './pages/MyPage';
import WritediaryPage from './pages/WritediaryPage';
import ReadDiaryPage from './pages/ReaddiaryPage';
import DictionaryPage from './pages/DictionaryPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path='/recommend' element={<RecommendPage />} />
      <Route path='/diary' element={<CalendarPage />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/write' element={<WritediaryPage />} />
      <Route path="/read" element={<ReadDiaryPage />} >
        <Route path=":diaryId" element={<ReadDiaryPage />} />
      </Route>
      <Route path="/dictionary" element={<DictionaryPage />} />
      <Route path='/detail' element={<DetailPage />} >
        <Route path=':plantId' element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
