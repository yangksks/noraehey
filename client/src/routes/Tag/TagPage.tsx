import styled from 'styled-components';
import BubbleUI from 'react-bubble-ui';
import 'react-bubble-ui/dist/index.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
const TagPage = () => {
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

  const [datas, setDatas] = useState<string[]>([
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
    '행복한',
    '슬픈',
    '우울',
    '몽글몽글',
    '여행',
    '신나는',
  ]);
  const [userTag, setUserTag] = useState<string[]>([]);
  const [temp, setTemp] = useState(0);
  const navigate = useNavigate();
  const scrollRef = useRef(null as any);
  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ left: scrollRef.current.scrollWidth });
  };

  useEffect(() => {
    scrollToBottom();
  }, [temp]);

  return (
    <TagContainer>
      <Title>
        <p>부르고 싶은</p>
        <p>음악의 분위기</p>
        <p>를 골라주세요</p>
      </Title>
      <BubbleUI options={options} className="myBubbleUI">
        {datas.map((data, i) => (
          <div
            className="child"
            key={i}
            onClick={() => {
              setDatas(datas.filter((item) => item !== data));
              setUserTag([...userTag, data]);
              setTemp(temp + 1);
            }}>
            #{data}
          </div>
        ))}
      </BubbleUI>
      <MyTagList>
        <p>내가 고른 태그</p>
        <ul ref={scrollRef}>
          {userTag.map((data, i) => (
            <li
              key={data}
              onClick={() => {
                setDatas([...datas, data]);
                setUserTag(userTag.filter((item) => item !== data));
              }}>
              #{data}
            </li>
          ))}
        </ul>
      </MyTagList>
      <BtnBox>
        <button
          disabled={userTag.length == 0 ? true : false}
          onClick={() => {
            navigate('/voice');
          }}>
          다음 <BsArrowRight size={20} />
        </button>
      </BtnBox>
    </TagContainer>
  );
};

const TagContainer = styled.div`
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
    max-width: 1000px;
    height: 50%;
    border-radius: 50px;
    padding: 10px 0;
    /* background: url('https://clouddevs.com/3dbay/files/preview/1280x1066/116312928305gazily43lrk8sqedqvrh8w02gojtsu7fi70s3qgroisr0dk4zn80uxdaep3pthggsnk5gzxe8cyuilrbnnvrvbv02dcv0mfrkkp.png')
      no-repeat;
    background-size: 100%;
    background-position: center center; */
    .child {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 2px solid transparent;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, #c792ef 0%, #ef92c5 100%);
      background-origin: border-box;
      background-clip: padding-box, border-box;
    }
  }
`;

const Title = styled.div`
  position: relative;
  height: 25%;
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
const MyTagList = styled.div`
  width: 100%;
  height: 20%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 20px;
    color: #fff;
    padding-bottom: 10px;
    font-weight: 700;
  }
  ul {
    width: 100%;
    display: flex;
    /* flex-wrap: wrap; */
    gap: 10px;
    overflow: auto;
    padding-bottom: 15px;

    &::-webkit-scrollbar {
      display: none;
    }
    li {
      font-size: 14px;
      position: relative;
      height: 40px;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 15px;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, #c792ef 0%, #ef92c5 100%);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      flex-shrink: 0;
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px 20px;
  justify-content: flex-end;
  button {
    padding: 10px;
    border: none;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: #fff;
  }
`;
export default TagPage;
