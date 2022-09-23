import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './routes/Admin/AdminPage';
import MagazineCreatePage from './routes/Admin/MagazineCreatePage';
import MagazineUpdatePage from './routes/Admin/MagazineUpdatePage';
import LandingPage from './routes/Landing/LandingPage';
import TagPage from './routes/Tag/TagPage';
import HighNotePage from './routes/HighNote/HighNotePage';
import HomePage from './routes/Home/HomePage';
import ProfilePage from './routes/Profile/ProfilePage';
import MagazineDetailPage from './routes/Magazine/MagazineDetailPage';
import ShortsDetailPage from './routes/Shorts/ShortsDetailPage';
import SongsDetailPage from './routes/Songs/SongsDetailPage';
import SearchPage from './routes/Search/SearchPage';
import SettingPage from './routes/Profile/SettingPage';
import NavBar from './routes/Common/NavBar';
import Header from './routes/Common/Header';
import KakaoRedirectHandler from './routes/Landing/KakaoRedirectHandler';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route
          path="/kakao/callback"
          element={<KakaoRedirectHandler />}
        />
        <Route path="/tag" element={<TagPage />} />
        <Route path="/voice" element={<HighNotePage />} />
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
      <NavBar />
    </BrowserRouter>
  );
};
export default Router;
