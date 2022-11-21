import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

export default function InsetDividers({ socket }) {
  const [usersList, setUsersList] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    async function fetchUsersHandler(params) {
      const friendListResponse = await axios.get(
        `https://60d5a2c2943aa60017768b01.mockapi.io/candidate`
      );
      if (friendListResponse.statusText == "OK") {
        const friendList = friendListResponse.data;
        setUsersList(friendList);
      }
    }
    fetchUsersHandler();
  }, [setUsersList]);
  function handleLogout(params) {
    localStorage.removeItem('usm_user');
    navigate('/');
  }
  function UserListLoaderHandle(params) {
    if (usersList.length > 0) {
      return usersList.map((item, index) => {
        return (
          <div key={index}>
            <ListItem className="Btn">
              <ListItemAvatar>
                <Avatar>
                  <img className="avatarImg" src="#" />
                </Avatar>
              </ListItemAvatar>
              <Link to={`/candidate/${item.id}`}><ListItemText primary={item.name} secondary={item.username}  /></Link>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="userSidebar">
      <div className="addUserbtn">
      <Link to="/candidate/new"><PersonAddAltIcon /></Link>
      <Link to="/candidate/new"><div className="adduserText">Add User</div></Link>
      <LogoutOutlinedIcon className="logoutbtn" onClick={()=>handleLogout()}/>
      </div>
      
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
         
        }}
      >
        {usersList ? <UserListLoaderHandle /> : <div></div>}
      </List>
    </div>
  );
}
