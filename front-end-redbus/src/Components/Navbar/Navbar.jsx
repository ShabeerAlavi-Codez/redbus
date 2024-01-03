import React from "react";
import styles from "./Navbar.module.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
///import { GoogleLogin } from "react-google-login";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  logout,
  addCustomerMongo,
} from "../../Redux/auth/actions";
import ComingSoonModal from "../../Elements/ComingSoonModal";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  //const { OAuth2Client } = require('google-auth-library');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [ user, setUser ] = React.useState([]);
  const [ profile, setProfile ] = React.useState([]);
  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json'
          }
      })
      .then((res) => {
           dispatch(loginSuccess(res.data));
          dispatch(addCustomerMongo(res.data ));
      })
      },
      onError: (error) => console.log('Login Failed:', error)
  });
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  const setIsOpen = (bool) => {
    setIsModelOpen(bool);
  };
  console.log("Here: ", isLoggedIn, currentCustomer);
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setIsOpen(true);
    setAnchorEl(null);
  };
  
async function verify(client_id, jwtToken) {
  //const client = new OAuth2Client(client_id);
  // Call the verifyIdToken to
  // varify and decode it
  // const ticket = await client.verifyIdToken({
  //     idToken: jwtToken,
  //     audience: client_id,
  // });
  // Get the JSON with all the user info
  //const payload = ticket.getPayload();
  // This is a JSON object that contains
  // all the user info
 // return payload;
}

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <div className={styles.Navbar}>
      <ComingSoonModal isOpen={isModelOpen} setIsOpen={setIsModelOpen} />
      <div className={styles.leftSide_header}>
        <img
          src="https://www.redbus.in/i/59538b35953097248522a65b4b79650e.png"
          alt="logo"
          onClick={() => {
            history.push("/");
          }}
        />
        <ul className={styles.Navbar__listOne}>
          <li>
            <Link to="/">BUS TICKETS</Link>
          </li>
          <li onClick={() => setIsOpen(true)}>
            rPool<sup>New</sup>
          </li>
          <li>
            <Link to="/bus-hire">BUS HIRE</Link>
          </li>
        </ul>
      </div>
      <ul className={styles.Navbar__listTwo}>
        <div className={styles.rightSide_header}>
          {/* <li onClick={() => setIsOpen(true)}>HELP</li> */}
          <li onClick={() => setIsOpen(true)}>MANAGE BOOKING</li>
          <li>
            <div>
              <RiArrowDropDownLine
                className={styles.icons}
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={() => setIsOpen(true)}
              >
                <MenuItem onClick={handleClose}>Bus Ticket</MenuItem>
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
                <MenuItem onClick={handleClose}>Reschedule</MenuItem>
                <MenuItem onClick={handleClose}>Show My Ticket</MenuItem>
                <MenuItem onClick={handleClose}>Email / SMS</MenuItem>
              </Menu>
            </div>
          </li>
          <li>
            <MdAccountCircle
              className={styles.icons}
              style={{ fontSize: "30px" }}
            />
          </li>
          <li>
            <div>
              <RiArrowDropDownLine
                className={styles.icons}
                onClick={handleClick2}
              />

              {isLoggedIn && currentCustomer ? (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                >
                  <MenuItem
                    onClick={handleClose2}
                    //onClick={() => setIsOpen(true)}
                  >
                    My Trips
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose2}
                    //onClick={() => setIsOpen(true)}
                  >
                    Wallet/Cards
                  </MenuItem>
                  <MenuItem onClick={handleClose2}>
                    <Link
                      to="/my-profile"
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      My Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose2}
                    //onClick={() => setIsOpen(true)}
                  >
                    Wallet
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>SignOut</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                >
                  <MenuItem onClick={handleClose2}>
                  <button onClick={() => login()}>Sign in with Google 🚀 </button>
                    {/* < GoogleLogin
                     // clientId="338803464375-n2h6tvo0svapakc335g6mqar5u4a90ru.apps.googleusercontent.com"
                      scope= "profile,email"
                      onSuccess={async (response) => {
              // const resp = await verify("338803464375-n2h6tvo0svapakc335g6mqar5u4a90ru.apps.googleusercontent.com",response.credential);
      //    const email = response.profileObj.email;
      // const name = response.profileObj.name;

      axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.credential}`, {
          headers: {
              Authorization: `Bearer ${response.credential}`,
              Accept: 'application/json'
          }
      })
      .then((res) => {
          alert(JSON.stringify(res.data));
           dispatch(loginSuccess(res.data));
          dispatch(addCustomerMongo(res.data ));
      })
                        
                       
                       // dispatch(loginSuccess(resp));
                       // dispatch(addCustomerMongo(response.profileObj));
                      }}
                      onFailure={(response) => {
                        dispatch(loginFailure(response));
                      }}
                      cookiePolicy={"single_host_origin"}
                    /> */}
                  </MenuItem>
                </Menu>
              )}
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
