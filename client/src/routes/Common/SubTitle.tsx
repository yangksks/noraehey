import React from 'react'
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from "react-icons/im";
import styled from 'styled-components';
export type SubTitleType = {
    title: string,
    link: string,
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  p {
    flex-shrink: 1;
    width: 100%;
    padding-left: 25px;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const SubTitle = (props:SubTitleType) => {
    const {title, link} = props;
  return (
    <Title>
      <Link to={link}><ImArrowLeft2 size={30}/></Link>
      <p>{title}</p>
    </Title>
  )
}

export default SubTitle