import { Language, NotificationsNone, Settings } from '@material-ui/icons';
import React, { useContext } from 'react';
import './topbar.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';

const Topbar = () => {
  const {dispatch} = useContext(AuthContext);
  return (
    <div className='topbar'>
       <div className="topbarWrapper">
        <div className="topLeft">
           <span className="logo">sakadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="/images/saksham.jpg" alt="" className="topAvatar" onClick={()=>{console.log("Hello"); dispatch(logout())}}/>
        </div>
       </div>
    </div>
  );
}

export default Topbar;
