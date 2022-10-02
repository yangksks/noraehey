import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const SongBtnList = () => {
  const { songId } = useParams();
  const [evalToggle, setEvalToggle] = useState(false);
  return (
    <>
      <BtnList>
        <button
          onClick={() => {
            setEvalToggle(!evalToggle);
          }}>
          평가
        </button>
        <button>
          <Link to={`/create/shorts/${songId}`}>쇼츠 등록</Link>
        </button>
      </BtnList>
      <Evaluation evalToggle={evalToggle}></Evaluation>
    </>
  );
};

const BtnList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    color: white;
  }
  button:first-child {
    background-color: #ffc978;
  }
  button:last-child {
    background-color: #ef92a8;
  }
`;

const Evaluation = styled.div<{ evalToggle: boolean }>`
  height: ${(props) => (props.evalToggle ? '100px' : '0px')};
  overflow: hidden;
  transition: 0.5s;
`;
export default SongBtnList;
