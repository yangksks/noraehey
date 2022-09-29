import BubbleUI from 'react-bubble-ui';
import 'react-bubble-ui/dist/index.css';
import './myComponent.css';

const MyComponent = () => {
  const options = {
    size: 180,
    minSize: 20,
    gutter: 8,
    provideProps: true,
    numCols: 6,
    fringeWidth: 160,
    yRadius: 130,
    xRadius: 220,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  const datas = [1, 2, 3, 4, 5, 6, 7, 8, '민서', '재호'];

  const children = datas.map((data, i) => {
    return (
      <div className="child" key={i}>
        {data}
      </div>
    );
  });

  return (
    <BubbleUI options={options} className="myBubbleUI">
      {children}
    </BubbleUI>
  );
};

export default MyComponent;
