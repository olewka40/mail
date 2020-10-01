import React, { useContext } from "react";
import styled from "styled-components";
import { FunctionsContext } from "./context/FunctionsContext";
export const Navbar = () => {
  const { account } = useContext(FunctionsContext);
  return (
    <StyledHeader>
      <Text>Current Eth wallet: {account}</Text>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;
  background-color: #9fcdff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
  color: black;
  font-size: 16px;
  margin: 10px;
`;
