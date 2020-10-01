import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@material-ui/core";
import AddAdmin from "./AddAdmin";
import AddWorker from "./AddWorker";
import UserRegister from "./UserRegister";
import CreateMail from "./CreateMail";
import CreateTranzitPoint from "./CreateTranzitPoint";
import UserNotification from "./UserNotification";
import NotReceived from "./NotReceived";
import styled from "styled-components";
import ListOfMails from "./ListOfMails";

const Main = memo(() => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="AddAdmin" />
        <Tab label="AddWorker" />
        <Tab label="UserRegister" />
        <Tab label="CreateMail" />
        <Tab label="CreateTranzitPoint" />
        <Tab label="UserNotification" />
        <Tab label="NotReceived" />
        <Tab label="ListOfMails" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddAdmin />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddWorker />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserRegister />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CreateMail />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CreateTranzitPoint />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <UserNotification />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <NotReceived />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ListOfMails />
      </TabPanel>
    </Container>
  );
});

export default Main;

const Container = styled.div`
  height: calc(100vh - 86px);
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      // style={{ height: 100 }}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
