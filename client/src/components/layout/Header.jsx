import React, { Suspense, useState, lazy } from "react";
import { orange } from "../constants/color";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Backdrop
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon
} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'

const SearchDialog = lazy(() => import('../specific/Search'))
const NotificationDialog = lazy(() => import('../specific/Notification'))
const NewGroupDialog = lazy(() => import('../specific/NewGroup'))

const Header = () => {
  const navigate = useNavigate()
  
  const [isMobile, setIsMobile] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isNewGroup, setIsNewGroup] = useState(false)
  const [isNotification, setIsNotification] = useState(false)

  const handleMobile = () => {
    console.log("first");
  };
  const openSearch = () => {
    setIsSearch((prev)=>!prev)
  };
  const openNewGroup = () => {
    console.log("first");
  };
  const openNotification = () =>{
    console.log('first')
  }
  const navigateToGroup = () => navigate('/group');
  const logOutHandler = () => {
    console.log('first')
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Pager
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
              title={'Search'}
              icon={<SearchIcon/>}
              onClick={openSearch}
              />
              <IconBtn
              title={'New Group'}
              icon={<AddIcon/>}
              onClick={openNewGroup}
              />
              <IconBtn
              title={'Manage group'}
              icon={<GroupIcon/>}
              onClick={navigateToGroup}
              />
                <IconBtn
              title={'Notifications'}
              icon={<NotificationIcon/>}
              onClick={openNotification}
              />
              <IconBtn
              title={'Logout'}
              icon={<LogoutIcon/>}
              onClick={logOutHandler}
              />
             
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {
        isSearch && (
            <Suspense fallback={<Backdrop open/>}>
                <SearchDialog/>
            </Suspense>
        )
      }
      {
        isNotification && (
            <Suspense fallback={<Backdrop open/>}>
                <NotificationDialog/>
            </Suspense>
        )
      }
      {
        isNewGroup && (
            <Suspense fallback={<Backdrop open/>}>
                <NewGroupDialog/>
            </Suspense>
        )
      }
    </>
  );
};

const IconBtn = ({title, icon, onClick}) => {
    return (
    <Tooltip title={title}>
        <IconButton color='inherit' size='large' onClick={onClick}>
            {icon}
        </IconButton>
    </Tooltip>
    )
}
export default Header;
