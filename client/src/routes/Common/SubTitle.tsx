import { ImArrowLeft2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export interface SubTitleType {
  title: string;
}

const SubTitle = (props: SubTitleType) => {
  const { title } = props;
  const navigate = useNavigate();
  return (
    <Title>
      <ImArrowLeft2
        size={30}
        onClick={() => {
          navigate(-1);
        }}
      />
      <p>{title}</p>
    </Title>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px 10px;

  p {
    flex-shrink: 1;
    width: 100%;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 700;
  }
`;

export default SubTitle;
