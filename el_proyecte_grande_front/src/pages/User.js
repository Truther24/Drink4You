import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";
import "../style/User.css";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Button,
  Modal,
  Card,
  CardHeader,
  CardMedia,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    }
  },
  
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  carousel: {
    width: "70%",
    alignItems: "center",
    left: "15%",
    backgroundColor: "black",
  },
  card: {
    color: "white",
    backgroundColor: "black",
  },
  username: {},
  email: {},
}));

const UserProfile = () => {
  const classes = useStyles();
  const [showNewPassword, setShowNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [oldPassword, setOldPassword] = useState("oldPassword");
  const [newPassword, setNewPassword] = useState("newPassword");
  const [cocktails, setCocktails] = useState([]);
  const cookies = new Cookies();

  

  useEffect(() => {
    const fetchGet = async () => {
      const requestOption = {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer " + cookies.get("userToken"),
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "https://localhost:7090/GetFavoriteDrinks",
        requestOption
      );
      const data = await response.json();
      console.log(data);
      setCocktails(data);
    };
    fetchGet();
    getUserDataFromToken();
  }, []);

  const getUserDataFromToken = () => {
    const token = cookies.get("userToken");
    const decoded = jwtDecode(token);
    setEmail(decoded.Email);
    setUsername(decoded.Username);
    setUserId(
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const navigate = useNavigate();
  function Logout() {
    cookies.remove("userToken");
    cookies.remove("userName");
    navigate("/");
    window.location.reload(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestOption = {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer " + cookies.get("userToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target[0].value,
        email: event.target[1].value,
        oldPassword: event.target[2].value,
        newPassword: event.target[4].value,
      }),
    };
    const response = await fetch(
      `https://localhost:7090/users/update/${userId}`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    Logout();

    handleClose();
  };

  return (
    <div className={classes.root} style={{ color: "white" }}>
      <br />
      <br />
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <br />

      <TextField
        label="Name"
        classes={{ root: classes.root }}
        InputProps={{
          style: { color: "white" },
        }}
        value={username}
      />
      <TextField
        label="Email"
        classes={{ root: classes.root }}
        InputProps={{
          style: { color: "white" },
        }}
        value={email}
      />
      <br />
      <br />

      <Typography variant="h5" gutterBottom>
        Favorite Cocktails
      </Typography>
      <br />
      <br />

      <Carousel className={classes.carousel}>
        {cocktails.map((cocktail) => (
          <Link
            to={`/categories/${
              cocktail.strCategory
            }/${cocktail?.strDrink?.replace("/", "+")}/${cocktail.idDrink}`}
            style={{ cursor: "default" }}
          >
            <Card
              key={cocktail.strDrink}
              className={classes.card}
              style={{
                height: "300px",
                position: "relative",
              }}
            >
              <CardHeader title={cocktail.name} />
              <CardMedia
                image={cocktail.strDrinkThumb}
                style={{
                  position: "absolute",
                  display: "block",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "contain",
                }}
              />
            </Card>
          </Link>
        ))}
      </Carousel>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit Profile
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile"
        aria-describedby="edit-user-information"
      >
        <div className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <br />

            <TextField
              InputLabelProps={{ style: { color: "black" } }}
              id="name"
              label="Name"
              value={username}
              onChange={handleUsernameChange}
            />
            <br />
            <br />
            <TextField
              InputLabelProps={{ style: { color: "black" } }}
              id="email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <br />

            <TextField
              InputLabelProps={{ style: { color: "black" } }}
              id="oldPass"
              label="Old Password"
              type={showOldPassword ? "oldPassword" : "password"}
              onChange={handleOldPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />

            <TextField
              InputLabelProps={{ style: { color: "black" } }}
              id="newPass"
              label="New Password"
              type={showNewPassword ? "newPassword" : "password"}
              onChange={handleNewPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <br />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
