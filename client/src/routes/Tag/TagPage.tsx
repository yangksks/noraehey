import styled from 'styled-components';
import BubbleUI from 'react-bubble-ui';
import 'react-bubble-ui/dist/index.css';
import { useState } from 'react';
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

  const [datas, setDatas] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [userTag, setUserTag] = useState([1]);
  return (
    <TagContainer>
      <BubbleUI options={options} className="myBubbleUI">
        {datas.map((data, i) => (
          <div
            className="child"
            key={i}
            onClick={() => {
              setDatas(datas.filter((item) => item !== data));
              setUserTag([...userTag, data]);
            }}>
            {data}
          </div>
        ))}
      </BubbleUI>
      <MyTagList>
        <ul>
          {userTag.map((data, i) => (
            <li
              key="i"
              onClick={() => {
                setDatas([...datas, data]);
                setUserTag(userTag.filter((item) => item !== data));
              }}>
              {data}
            </li>
          ))}
        </ul>
      </MyTagList>
    </TagContainer>
  );
};

const TagContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: ${(props) => props.theme.colors.gradientPurpleToYellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .myBubbleUI {
    width: 100%;
    max-width: 1000px;
    height: 400px;
    border-radius: 50px;
    .child {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid ${(props) => props.theme.colors.mainPurple};
    }
  }
`;

const MyTagList = styled.div`
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      padding: 10px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
`;

export default TagPage;
