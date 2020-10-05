import React, { useContext } from "react";
import styled from "styled-components";
import { FunctionsContext } from "../context/FunctionsContext";
import ListOfMails from "../ListOfMails";
export const Profile = () => {
  const { account, mails } = useContext(FunctionsContext);
  const mySendedMails = mails.filter((e) => e.mailsender === account);
  const myPulledMails = mails.filter((e) => e.mailreceiver === account);

  return (
    <StyledProfilePage>
      <Text>Исходящие поссылки</Text>
      <ListOfMails mails={mySendedMails} />
      <Text>Входящие поссылки</Text>
      <ListOfMails mails={myPulledMails} />
    </StyledProfilePage>
  );
};

const StyledProfilePage = styled.div`
  width: 100%;
  height: 100%;
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
