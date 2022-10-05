import { ImArrowLeft2 } from 'react-icons/im';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import Container from '../../style/style';
import { RiPencilFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import SettingPage from './SettingPage';
import _ from 'lodash';
const ProfileSettingPage = () => {
  const url = useLocation().pathname.split('/')[3];
  const [nameEdit, setNameEdit] = useState(false);
  const [user, setUser] = useRecoilState(userInfoState);
  const [nickname, setNickname] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const syncFunc = async () => {
      await updateUserInfo();
      setNameEdit(false);
      setLoading(false);
    };
    syncFunc();
  }, [url]);

  const updateNickname = async () => {
    const URL = '/api/v1/member/nickname';
    try {
      const result = await fetchData.patch(URL, { nickname: nickname });
      return result.data;
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
      return result.data;
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
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const changeName = () => {
    const syncFunc = async () => {
      await updateNickname();
      await updateUserInfo();
    };
    if (msg) {
      syncFunc();
    }
    setNameEdit(!nameEdit);
  };

  const getImage = (input: any) => {
    const syncFunc = async () => {
      await updateUserImage(input[0]);
      await updateUserInfo();
    };
    syncFunc();
  };

  const nameValidate = async (e: string) => {
    const URL = `/api/v1/member/nickname/${e}`;
    setNickname(e);
    try {
      await fetchData.get(URL);
      setMsg(true);
    } catch (err: any) {
      setMsg(false);
    }
  };

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      changeName();
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
              <input
                type="text"
                maxLength={6}
                onChange={(e) => {
                  nameValidate(e.target.value);
                }}
                onKeyPress={onKeyPress}
                defaultValue={user.memberNickname}></input>
            ) : (
              <p>{user.memberNickname}</p>
            )}
            <RiPencilFill
              onClick={() => {
                changeName();
              }}
            />
          </NameBox>
          {nameEdit ? (
            msg ? (
              <p className="validate">사용 가능한 닉네임입니다.</p>
            ) : (
              <p className="banned">사용 중인 닉네임 입니다.</p>
            )
          ) : null}
        </Profile>
        <SettingPage />
      </Container>
    );
  };

  return loading ? null : render();
};

const Profile = styled.div`
  width: 100%;
  height: 220px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  z-index: 1;
  .validate {
    font-size: 10px;
    padding-right: 14px;
    padding-top: 5px;
    color: #5ca535;
  }
  .banned {
    font-size: 10px;
    padding-right: 14px;
    padding-top: 5px;
    color: #d53958;
  }
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
  width: 100%;
  padding: 20px 0 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    font-size: 18px;
  }

  input {
    width: 40%;
    height: 35px;
    padding: 5px;
    font-size: 16px;
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
