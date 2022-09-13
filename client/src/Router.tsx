import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './Routes/Admin/AdminPage';
import MagazineCreatePage from './Routes/Admin/MagazineCreatePage';
import MagazineUpdatePage from './Routes/Admin/MagazineUpdatePage';
import LandingPage from './Routes/Landing/LandingPage';
import TagPage from './Routes/Common/TagPage';
import VoicePage from './Routes/Common/VoicePage';
import HomePage from './Routes/Home/HomePage';
import ProfilePage from './Routes/Profile/ProfilePage';
import MagazineDetailPage from './Routes/Magazine/MagazineDetailPage';
import ShortsDetailPage from './Routes/Shorts/ShortsDetailPage';
import SongsDetailPage from './Routes/Songs/SongsDetailPage';
import SearchPage from './Routes/Search/SearchPage';
import SettingPage from './Routes/Profile/SettingPage';

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
