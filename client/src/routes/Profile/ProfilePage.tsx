import { ImArrowLeft2 } from 'react-icons/im';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import Container from '../../style/style';
import { FiSettings } from 'react-icons/fi';
import { RiPencilFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
const ProfilePage = () => {
  const user = useRecoilValue(userInfoState);
  const url = useLocation().pathname.split('/')[3];
  const [settingNow, setSettingNow] = useState(url);
  const [nameEdit, setNameEdit] = useState(false);
  const [nickName, setNickName] = useState(user.nickName);
  const navigate = useNavigate();

  useEffect(() => {
    setSettingNow(url);
  }, [url]);

  const updateNickname = async () => {
    const URL = '/api/v1/member/nickname';
    console.log(nickName);
    try {
      const result = await fetchData.patch(URL, { nickName: nickName });
      return console.log(result);
    } catch (err: any) {
      console.log(err);
    }
  };

  const ChangeName = () => {
    if (nameEdit) {
      updateNickname();
    }
    setNameEdit(!nameEdit);
  };

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
        {settingNow !== 'setting' ? (
          <SettingButton
            onClick={() => {
              navigate('setting');
            }}>
            <FiSettings />
          </SettingButton>
        ) : null}
      </TitleBox>
      <Profile>
        <PicBox>
          <img src={user.profileUrl} alt="" />
          {settingNow !== 'setting' ? null : (
            <PicEdit>
              <p>수정</p>
              <RiPencilFill />
            </PicEdit>
          )}
        </PicBox>
        <NameBox>
          {nameEdit ? (
            <textarea
              onChange={(e) => {
                setNickName(e.target.value);
              }}>
              {user.nickName}
            </textarea>
          ) : (
            <p>{user.nickName}</p>
          )}
          {settingNow !== 'setting' ? null : (
            <RiPencilFill
              onClick={() => {
                settingNow !== 'setting' ? null : ChangeName();
              }}
            />
          )}
        </NameBox>
      </Profile>
      <Outlet></Outlet>
    </Container>
  );
};

const Profile = styled.div`
  width: 100%;
  height: 50%;
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
    width: 100%;
    padding: 13px;
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
