import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: Helvetica, sans-serif;
  color: rgba(0,0,0,0.85);
  font-size: 48px;
`;

const App = () => (
  <div>
    <Title>React Starter</Title>
  </div>
);

export default hot(App);
