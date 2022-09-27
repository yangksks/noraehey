import styled from 'styled-components';
import BubbleUI from 'react-bubble-ui';
import 'react-bubble-ui/dist/index.css';
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

  const datas = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '민서',
    '재호',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '민서',
    '재호',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '민서',
    '재호',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '민서',
    '재호',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '민서',
    '재호',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '민서',
    '재호',
  ];

  const children = datas.map((data, i) => {
    return (
      <div className="child" key={i}>
        {data}
      </div>
    );
  });
  console.log('zz');
  return (
    <TagContainer>
      <BubbleUI options={options} className="myBubbleUI">
        {children}
        {/* {datas.map((data, i) => (
          <div className="child" key={i}>
            {data}
          </div>
        ))} */}
      </BubbleUI>
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
      /* display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s linear; */
    }
  }
`;

export default TagPage;
