import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './user.css'
const User = () => {
  return (
    <div className='user'>
      <div className="userTitleContainer">
        <h1 className="userTitle">
           Edit User 
        </h1>
        <Link to='/newUser'>
        <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
             <img src="/images/saksham.jpg" alt="" className='userShowImg'/>
             <div className="userShowTopTitle">
                <span className="userShowUsername">Saksham Hans</span>
                <span className="userShowUserTitle">Software Engineer</span>
             </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
            <PermIdentity className='userShowIcon'/>
            <span className="userShowInfoTitle">sak28hans</span>
            </div>
            <div className="userShowInfo">
            <CalendarToday className='userShowIcon'/>
            <span className="userShowInfoTitle">28.07.1997</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
            <PhoneAndroid className='userShowIcon'/>
            <span className="userShowInfoTitle">+91 9871637282</span>
            </div>
            <div className="userShowInfo">
            <MailOutline className='userShowIcon'/>
            <span className="userShowInfoTitle">saksham28hans@gmail.com</span>
            </div>
            <div className="userShowInfo">
            <LocationSearching className='userShowIcon'/>
            <span className="userShowInfoTitle">New Delhi | India</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
           <span className="userUpdateTitle">Edit</span>
           <form className='userUpdateForm'>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input type="text" placeholder='sak28hans' className='userUpdateInput'/>
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input type="text" placeholder='Saksham Hans' className='userUpdateInput'/>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input type="email" placeholder='saksham28hans@gmail.com' className='userUpdateInput'/>
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input type="text" placeholder='+91 9871637282' className='userUpdateInput'/>
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input type="text" placeholder='New Delhi | India' className='userUpdateInput'/>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img src="/images/saksham.jpg" alt="" className='userUpdateImg'/>
                <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                <input type="file" id='file' style={{display : 'none'}}/>
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
           </form>
        </div>
      </div>
    </div>
  );
}

export default User;
