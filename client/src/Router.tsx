import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './routes/Admin/AdminPage';
import MagazineCreatePage from './routes/Admin/MagazineCreatePage';
import MagazineUpdatePage from './routes/Admin/MagazineUpdatePage';
import LandingPage from './routes/Landing/LandingPage';
import TagPage from './routes/Common/TagPage';
import VoicePage from './routes/Common/VoicePage';
import HomePage from './routes/Home/HomePage';
import ProfilePage from './routes/Profile/ProfilePage';
import MagazineDetailPage from './routes/Magazine/MagazineDetailPage';
import ShortsDetailPage from './routes/Shorts/ShortsDetailPage';
import SongsDetailPage from './routes/Songs/SongsDetailPage';
import SearchPage from './routes/Search/SearchPage';
import SettingPage from './routes/Profile/SettingPage';

const Router = () => {
  const userId = '0000';
  const songId = '0000';
  const shortsId = '0000';
  const magazineId = '0000';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<LandingPage />} />
        <Route path="/tag" element={<TagPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/shorts/:shortsId" element={<ShortsDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />}>
          <Route path="setting" element={<SettingPage />} />
        </Route>
        <Route path="/songs/:songId" element={<SongsDetailPage />} />
        <Route path="/magazine/:magazineId" element={<MagazineDetailPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="magazine/create" element={<MagazineCreatePage />} />
          <Route path="magazine/:magazineId" element={<MagazineDetailPage />} />
          <Route
            path="magazine/:magazineId/update"
            element={<MagazineUpdatePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
