import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  MdOutlineSentimentVerySatisfied,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentVeryDissatisfied,
} from 'react-icons/md';
import { fetchData } from '../../utils/api/api';

const SongBtnList = (props: any) => {
  const { myEval, refetchFunc } = props;
  const { songId } = useParams();
  const [evalToggle, setEvalToggle] = useState(false);
  const [nowEval, setNowEval] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setNowEval(myEval);
  }, [props]);
  const evalFnc = (num: number) => {
    fetchData
      .post('/api/v1/song/level', {
        songId: songId,
        songLevel: num,
      })
      .then(() => {
        fetchData.get(`/api/v1/song/info/${songId}`).then((res) => {
          setNowEval(res.data.myEval);
          refetchFunc();
        });
      });
  };
  return (
    <>
      <BtnList>
        <button
          onClick={() => {
            setEvalToggle(!evalToggle);
          }}>
          평가
        </button>
        <button
          onClick={() => {
            navigate(`/create/shorts/${songId}`);
          }}>
          쇼츠 등록
        </button>
      </BtnList>
      <Evaluation evalToggle={evalToggle} eval={nowEval}>
        <ul>
          <li
            onClick={() => {
              evalFnc(1);
            }}>
            <MdOutlineSentimentVerySatisfied
              size={40}
              color={nowEval == 1 ? 'green' : 'gray'}
            />
            <p style={{ color: nowEval == 1 ? 'green' : 'gray' }}>Easy</p>
          </li>
          <li
            onClick={() => {
              evalFnc(2);
            }}>
            <MdOutlineSentimentSatisfied
              size={40}
              color={nowEval == 2 ? 'yellowgreen' : 'gray'}
            />
            <p style={{ color: nowEval == 2 ? 'yellowgreen' : 'gray' }}>Good</p>
          </li>
          <li
            onClick={() => {
              evalFnc(3);
            }}>
            <MdOutlineSentimentDissatisfied
              size={40}
              color={nowEval == 3 ? 'orange' : 'gray'}
            />
            <p style={{ color: nowEval == 3 ? 'orange' : 'gray' }}>Hard</p>
          </li>
          <li
            onClick={() => {
              evalFnc(4);
            }}>
            <MdOutlineSentimentVeryDissatisfied
              size={40}
              color={nowEval == 4 ? '#e23a3a' : 'gray'}
            />
            <p style={{ color: nowEval == 4 ? '#e23a3a' : 'gray' }}>Hell</p>
          </li>
        </ul>
      </Evaluation>
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
    &:active {
      scale: 0.95;
      opacity: 0.8;
    }
  }
  button:first-child {
    background-color: #ffc978;
  }
  button:last-child {
    background-color: #ef92a8;
  }
`;

const Evaluation = styled.div<{ evalToggle: boolean; eval: number }>`
  height: ${(props) => (props.evalToggle ? '100px' : '0px')};
  overflow: hidden;
  transition: 0.2s ease-in-out;
  width: 100%;
  padding: 0 20px;
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      &:active {
        scale: 0.95;
        opacity: 0.8;
      }
      gap: 2px;
      p {
        font-size: 14px;
      }
    }
  }
`;
export default SongBtnList;
