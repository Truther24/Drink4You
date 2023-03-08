import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    TextField,
    Button,
    Modal,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
            color: "white",
        },
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
    const [showNewPassword, setShowNewPassword] = useState("newPassword");
    const [showOldPassword, setShowOldPassword] = useState("oldPassword");
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
    console.log(decoded)
    setEmail(decoded.Email)
    setUsername(decoded.Username);

  }
  
  
  
  
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update user information here
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
                className={classes.username}
                value={username}
            />
            <TextField label="Email" className={classes.email} value={email} />
            <br />
            <br />

            <Typography variant="h5" gutterBottom>
                Favorite Cocktails
            </Typography>
            <br />
            <br />

            <Carousel className={classes.carousel}>
                {cocktails.map((cocktail) => (
                    <Card key={cocktail.strDrink} className={classes.card}>
                        <CardHeader title={cocktail.name}  />
                        <CardMedia
                            
                            image={cocktail.strDrinkThumb}
                            style={{ height: "200px" }}
                        />
                    </Card>
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
                            label="Name"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <br />
                        <br />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <br />
                        <br />

                        <TextField
                            label="Old Password"
                            type={showOldPassword ? "oldPassword" : "password"}
                            onChange={handleOldPasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
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
                            label="New Password"
                            type={showNewPassword ? "newPassword" : "password"}
                            onChange={handleNewPasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
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

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default UserProfile;
