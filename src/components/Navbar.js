import React, { useState } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Popover } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Close from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Notifications } from "./Notifications";
export const Navbar = () => {
  const [openNot, setOpenNot] = useState(false);
  const history = useHistory();

  const toProfile = () => {
    history.push("/profile");
  };
  const toHome = () => {
    history.push("/");
  };
  const toggleNotifications = () => {
    setOpenNot(!openNot);
  };
  return (
    <StyledHeader>
      <AppBar position="static">
        <Toolbar>
          <HeaderContent>
            <RightItems>
              <IconButton
                onClick={toHome}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <HomeIcon />
              </IconButton>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </RightItems>
            <LeftItems>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <>
                    <IconButton
                      onClick={toggleNotifications}
                      {...bindTrigger(popupState)}
                      color="inherit"
                    >
                      <NotificationsIcon />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Notifications />
                    </Popover>
                  </>
                )}
              </PopupState>
              <IconButton onClick={toProfile} color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </LeftItems>
          </HeaderContent>
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;
`;
const RightItems = styled.div``;
const LeftItems = styled.div``;
const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
