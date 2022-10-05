import { ImArrowLeft2 } from 'react-icons/im';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../../style/style';
import { FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import { userInfoState } from '../../Atom';
import { useRecoilValue } from 'recoil';
import UserShorts from './UserShorts';
import { keyList } from '../../utils/constants/constants';
import { IoMdMusicalNote } from 'react-icons/io';
const ProfilePage = () => {
  const userId = useLocation().pathname.split('/')[2];
  const [itsMe, setItsMe] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [user, setUser] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const me = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  useEffect(() => {
    const syncFunc = async () => {
      await getUserInfo();
      setItsMe(false);
      isItMe();
      setNameEdit(false);
      setLoading(false);
    };
    syncFunc();
  }, [userId]);

  const getUserInfo = async () => {
    const URL = `/api/v1/member/info/${userId}`;
    try {
      const result = await fetchData.get(URL);
      setUser(() => result.data);
      return console.log(result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const isItMe = () => {
    if (me.memberId === +userId) {
      setItsMe(true);
    }
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
          {itsMe ? (
            <SettingButton
              onClick={() => {
                navigate('/profile/setting');
              }}>
              <FiSettings />
            </SettingButton>
          ) : null}
        </TitleBox>
        <Profile>
          <PicBox>
            <img src={user.memberProfileUrl} alt="" />
          </PicBox>
          <NameBox>
            <p>{user.memberNickname}</p>
            <p className="highPitch">{keyList[user.memberHighPitch]}</p>
          </NameBox>
        </Profile>
        <UserShorts />
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

const NameBox = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  p {
    font-size: 18px;
  }
  .highPitch {
    display: flex;
    align-items: center;

    font-size: 12px;
    color: ${(props) => props.theme.colors.textGray};
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

const SettingButton = styled.div`
  font-size: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #3e3e3e;
`;
export default ProfilePage;
