import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './routes/Admin/AdminPage';
import MagazineCreatePage from './routes/Admin/MagazineCreatePage';
import MagazineUpdatePage from './routes/Admin/MagazineUpdatePage';
import LoginPage from './routes/Login/LoginPage';
import TagPage from './routes/Tag/TagPage';
import HighNotePage from './routes/HighNote/HighNotePage';
import HomePage from './routes/Home/HomePage';
import ProfilePage from './routes/Profile/ProfilePage';
import MagazineDetailPage from './routes/Magazine/MagazineDetailPage';
import ShortsDetailPage from './routes/Shorts/ShortsDetailPage';
import SongsDetailPage from './routes/Songs/SongsDetailPage';
import SearchPage from './routes/Search/SearchPage';
import SettingPage from './routes/Profile/SettingPage';
import LikePage from './routes/Like/LikePage';
import LikeShortsPage from './routes/Like/LikeShortsPage';
import LikeSongPage from './routes/Like/LikeSongPage';
import KakaoRedirectHandler from './routes/Login/KakaoRedirectHandler';
import Protection from './routes/Common/Protection';
import LoggedInProtection from './routes/Common/LoggedInProtection';
import ShortsCreatePage from './routes/Shorts/ShortsCreatePage';
import LoadingSpiner from './routes/Common/LoadingSpiner';
import RandomShorts from './routes/Shorts/RandomShorts';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedInProtection />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/kakao/callback" element={<KakaoRedirectHandler />} />
        </Route>
        <Route element={<LoadingSpiner />}>
          <Route element={<Protection />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tag" element={<TagPage />} />
            <Route path="/voice" element={<HighNotePage />} />
            <Route path="/shorts/random" element={<RandomShorts />} />
            <Route path="/shorts/:shortsId" element={<ShortsDetailPage />} />
            <Route
              path="/create/shorts/:songsId"
              element={<ShortsCreatePage />}
            />

            <Route path="/search/*" element={<SearchPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />}>
              <Route path="setting" element={<SettingPage />} />
            </Route>
            <Route path="/songs/:songId" element={<SongsDetailPage />} />
            <Route path="/like/*" element={<LikePage />}>
              <Route path="songlist" element={<LikeSongPage />} />
              <Route path="shortslist" element={<LikeShortsPage />} />
            </Route>
            <Route
              path="/magazine/:magazineId"
              element={<MagazineDetailPage />}
            />
            <Route path="/admin" element={<AdminPage />}>
              <Route path="magazine/create" element={<MagazineCreatePage />} />
              <Route
                path="magazine/:magazineId"
                element={<MagazineDetailPage />}
              />
              <Route
                path="magazine/:magazineId/update"
                element={<MagazineUpdatePage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
