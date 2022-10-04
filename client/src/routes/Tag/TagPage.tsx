import styled, { keyframes } from 'styled-components';
import BubbleUI from 'react-bubble-ui';
import 'react-bubble-ui/dist/index.css';
import image from '../../assets/images/singing.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { fetchData } from '../../utils/api/api';
import { IoClose } from 'react-icons/io5';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tagListState, userInfoState, userTagListState } from '../../Atom';
interface tagType {
  tagId: number;
  tagName: string;
}

const options = {
  size: 100,
  minSize: 20,
  gutter: 12,
  provideProps: false,
  numCols: 7,
  fringeWidth: 160,
  yRadius: 100,
  xRadius: 100,
  cornerRadius: 100,
  showGuides: false,
  compact: true,
  gravitation: 5,
};

const TagPage = () => {
  const [datas, setDatas] = useRecoilState(tagListState);
  const [userTag, setUserTag] = useRecoilState(userTagListState);
  const [temp, setTemp] = useState(0);
  const tagRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  };

  useEffect(() => {
    scrollToBottom();
  }, [temp]);

  const updateTags = () => {
    if (userTag.length >= 5 && userTag.length <= 10) {
      let list: Array<number> = [];
      userTag.forEach((data) => {
        list.push(data.tagId);
      });
      fetchData.patch('/api/v1/member/tag', { tagIdList: list });
      navigate('/');
    } else {
      alert('태그는 5개 이상 10개 이하로 선택해주세요.');
    }
  };

  const getTagButtons = () => {
    return datas.map((data, i) => (
      <div
        className={`child ${
          userTag.map((r: tagType) => r.tagId).includes(data.tagId)
            ? 'pick'
            : ''
        }`}
        key={i}
        onClick={() => {
          if (userTag.map((r: tagType) => r.tagId).includes(data.tagId)) {
            setUserTag(userTag.filter((item) => item.tagId !== data.tagId));
          } else {
            setUserTag([...userTag, data]);
            setTemp(temp + 1);
          }
        }}>
        {data.tagName}
      </div>
    ));
  };

  const getSelectedTags = () => {
    return userTag.map((data, i) => (
      <li
        key={data.tagId}
        onClick={() => {
          setUserTag(userTag.filter((item) => item.tagId !== data.tagId));
        }}>
        #{data.tagName} <IoClose size={15} color={'#fff'} />
      </li>
    ));
  };

  return (
    <TagContainer image={image}>
      <>
        <BtnBox>
          <button
            disabled={
              userTag.length >= 5 && userTag.length <= 10 ? false : true
            }
            onClick={() => {
              updateTags();
            }}>
            다음 <BsArrowRight size={20} />
          </button>
        </BtnBox>
        <Title>
          <p>부르고 싶은</p>
          <p>음악의 분위기</p>
          <p>를 골라주세요</p>
        </Title>
        <BubbleUI options={options} className="myBubbleUI">
          {getTagButtons()}
        </BubbleUI>
        <MyTagList>
          <p>
            내가 고른 태그<span>(5~10개)</span>
          </p>
          <ul ref={scrollRef}>{getSelectedTags()}</ul>
        </MyTagList>
      </>
    </TagContainer>
  );
};

const TagContainer = styled.div<{ image: string }>`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: ${(props) => props.theme.colors.gradientPurpleToYellow};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .myBubbleUI {
    width: 100%;
    height: 50%;
    /* border-radius: 150px; */
    /* width: 300px; */
    /* height: 300px; */
    max-width: 1000px;
    /* flex-shrink: 1; */
    border-radius: 100px;
    padding-top: 10px;
    background: url(${({ image }) => image}) no-repeat;
    background-size: 400px;
    background-position: center center;
    /* margin: 80px 0; */
    /* border: 10px solid black; */
    overflow: hidden;

    .child {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 4px solid transparent;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, #c792ef 0%, #ef92c5 100%);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      opacity: 1;
      transition: 0.5s;
    }
    .pick {
      opacity: 0.5;
    }
  }
`;

const Title = styled.div`
  position: relative;
  height: 15%;
  max-width: 420px;
  font-size: 20px;
  font-family: 'omni035';
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 10px;
  p {
    position: relative;
    &:first-child {
      animation: fadeIn 1s ease-in;
      align-self: flex-start;
    }
    &:nth-child(2) {
      top: -10px;
      font-size: 50px;
      animation: fadeIn 1.5s ease-in forwards;
    }
    &:last-child {
      animation: fadeIn 1s ease-in;
      align-self: flex-end;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      top: 0px;
      opacity: 1;
    }
  }
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MyTagList = styled.div`
  width: 100%;
  height: 25%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 20px;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
    color: #fff;
    padding-bottom: 10px;
    font-weight: 700;
    & > span {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow: auto;
    padding-bottom: 15px;

    &::-webkit-scrollbar {
      display: none;
    }
    li {
      font-size: 14px;
      position: relative;
      height: 30px;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 15px;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, #c792ef 0%, #ef92c5 100%);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      animation: ${boxFade} 0.5s;
      margin-top: 6px;
      svg {
        position: absolute;
        right: -6px;
        top: -6px;
        overflow: visible;
        background-color: #f47373;
        /* border: 1px solid red; */
        border-radius: 50%;
        padding: 2px;
      }
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  padding: 5px;
  justify-content: flex-end;
  align-items: end;
  button {
    border: none;
    width: 100px;
    height: 40px;
    /* border-radius: 20px; */
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    /* background-color: #fff; */
    background-color: transparent;
  }
`;
export default TagPage;
