import ChatIcon from '@mui/icons-material/Chat';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import PersonAdd from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import { ListItemIcon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { debounce } from "lodash";
import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { logout } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import ImageIcon from '@mui/icons-material/Image';
import "./topbar.css";

export default function Topbar() {
 const { user } = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchChange, setSearchChange] = useState("")
  // const [data, setData] = useState("")
  const [searchUser, setSearchUser] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState("")
  const [value, setValue] = useState("")
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = (e) => {
    logout(
      { email: email.null, password: password.null },
      dispatch
    );
  };
 
 
  const handleSearch = debounce(async (event) => {
      let term = event.target.value
          if(term) {
            const search = await axios.get("/users/search/" + term)
          setSearchUser(search.data)
          console.log("check search:", search)
          } else{
            setSearchUser()
          }
          
  })


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social NetWork</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
          onChange={(event) => handleSearch(event)}
            placeholder="Search for friend, post or video"
            className="searchInput"
            name='name'
          />
        </div>
        {/* <Dialog onClose={handleCloseModal} open={showModal} >
        <List sx={{ pt: 0 }}>
        {searchUser && searchUser.length > 0 && 
         searchUser.map((user, index) => {
          return (
          <ListItem key={`user-${index}`}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
          )
        })}
        </List>

     
    </Dialog> */}
    {searchUser && searchUser.length > 0 &&
      <List
      sx={{
        width: '100%',
        maxWidth: 495,
        bgcolor: 'background.paper',
        marginX: 3,
        marginY: 0,
        position: 'absolute',
        borderRadius: 2,
        cursor: "pointer"
      }}
    >
     {searchUser && searchUser.length > 0 && 
      searchUser.map((user,index) => {
        return(
      <ListItem key={`user-${index}`}>
        <Link to={`/profile/${user.username}`}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.username} secondary="Jan 9, 2014" />
        </Link>
      </ListItem>
        )
      })
     }
    </List>
    }
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link to={'/messenger'} style={{color: "white"}}>
            <ChatIcon />
          </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        
        </div>
        {/* <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link> */}
        <div>
         <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
         </Box>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Link to={`/profile/${user.username}`}  className="profile">
              <MenuItem>
                <Avatar />
                <span >Profile</span>
              </MenuItem>
            </Link>
            {/* <MenuItem>
              <Avatar /> 
            </MenuItem> */}
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
         </div>
      </div>
    </div>
  );
}
