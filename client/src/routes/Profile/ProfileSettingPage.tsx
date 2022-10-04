import { ImArrowLeft2 } from 'react-icons/im';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import Container from '../../style/style';
import { FiSettings } from 'react-icons/fi';
import { RiPencilFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import SettingPage from './SettingPage';
const ProfileSettingPage = () => {
  const url = useLocation().pathname.split('/')[3];
  const userId = useLocation().pathname.split('/')[2];
  const [settingNow, setSettingNow] = useState(url);
  const [nameEdit, setNameEdit] = useState(false);
  const [user, setUser] = useState(null) as any;
  const [nickname, setNickname] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const syncFunc = async () => {
      await updateUserInfo();
      setSettingNow(url);
      setNameEdit(false);
      setLoading(false);
    };
    syncFunc();
  }, [url]);

  const updateNickname = async () => {
    const URL = '/api/v1/member/nickname';
    try {
      const result = await fetchData.patch(URL, { nickname: nickname });
      return console.log(result);
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateUserInfo = async () => {
    const URL = '/api/v1/member/info';
    try {
      const result = await fetchData.get(URL);
      setUser(() => result.data);
      setNickname(() => result.data.memberNickname);
      return console.log(result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateUserImage = async (profileImg: any) => {
    const option = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(profileImg);
    let formData = new FormData();
    const URL = '/api/v1/member/profileimg';
    formData.append('profileImg', profileImg);
    try {
      const result = await fetchData.patch(URL, formData, option);
      return console.log(result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const ChangeName = () => {
    const syncFunc = async () => {
      await updateNickname();
      await updateUserInfo();
    };
    syncFunc();
    setNameEdit(!nameEdit);
  };

  const getImage = (input: any) => {
    const syncFunc = async () => {
      await updateUserImage(input[0]);
      await updateUserInfo();
    };
    syncFunc();
  };

  const render = () => {
    return (
      <Container>
        <TitleBox>
          <Title>
            <ImArrowLeft2
              size={30}
              onClick={() => {
                navigate(-1);
              }}
            />
          </Title>
        </TitleBox>
        <Profile>
          <PicBox>
            <img src={user.memberProfileUrl} alt="" />
            <PicEdit>
              <label className="profileImageBtn" htmlFor="profileImage" />
              <p>수정</p>
              <RiPencilFill />
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                onChange={(e) => {
                  getImage(e.target.files);
                }}
                style={{ display: 'none' }}
              />
            </PicEdit>
          </PicBox>
          <NameBox>
            {nameEdit ? (
              <textarea
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                defaultValue={user.memberNickname}></textarea>
            ) : (
              <p>{user.memberNickname}</p>
            )}
            <RiPencilFill
              onClick={() => {
                ChangeName();
              }}
            />
          </NameBox>
        </Profile>
        <SettingPage />
      </Container>
    );
  };

  return loading ? null : render();
};

const Profile = styled.div`
  width: 100%;
  height: 210px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;
  z-index: 1;
`;

const PicBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border-radius: 50%;
  border: #b6b3c0 solid 1px;
  overflow: hidden;
  z-index: 3;

  img {
    position: relative;
    width: 120px;
    height: 120px;
    z-index: 1;
  }
`;

const PicEdit = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 120px;
  height: 40px;
  z-index: 2;
  background-color: rgba(221, 221, 221, 0.588);
  svg {
    font-size: 18px;
    padding-bottom: 3px;
  }
  .profileImageBtn {
    position: absolute;
    width: 100%;
    height: 500%;
    cursor: pointer;
  }
`;

const NameBox = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    font-size: 18px;
  }

  textarea {
    height: 40px;
    padding: 5px;
    font-size: 18px;
    resize: none;
  }

  svg {
    font-size: 18px;
    padding-bottom: 3px;
    padding-left: 3px;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }

  p {
    flex-shrink: 1;
    width: 100%;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 700;
  }
`;

export default ProfileSettingPage;
