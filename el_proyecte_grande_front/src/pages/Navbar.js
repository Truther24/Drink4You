import jwtDecode from "jwt-decode";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [
  { name: "Categories", route: "/categories" },
  { name: "About", route: "/about" },
];
const settings = [
  { name: "Register", route: "/register" },
  { name: "Login", route: "/login" },
  { name: "Profile", route: "/user" },
];

const settingsLoggedInUser = [
  { name: "Profile", route: "/user" },
  { name: "Logout", route: "/logout" },
];

const settingsLoggedInAdmin = [
  { name: "Profile", route: "/user" },
  { name: "Add Drink", route: "/addDrink" },
  { name: "Logout", route: "/logout" },
];

const settingsLoggedOut = [
  { name: "Register", route: "/register" },
  { name: "Login", route: "/login" },
];

function Navbar() {
  const [username, setUserName] = useState("User")
  const [leftOptions, setLeftOptions] = useState(pages);
  const [loggedInAs, setLoggedInAs] = useState("");
  const [rightOptions, setRightOptions] = useState(settingsLoggedOut);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    setLeftOptions(pages);

    if (!(cookies.get("userToken") == undefined)) {
      const token = cookies.get("userToken");
      const decoded = jwtDecode(token);

      if (
        Array.isArray(
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ]
        )
      ) {
        setRightOptions(settingsLoggedInAdmin);
      } else {
        setRightOptions(settingsLoggedInUser);
      }

      setLoggedInAs(`Logged in as ${decoded.Username}`);
      setUserName(decoded.Username.toUpperCase());
    } else {
      setRightOptions(settingsLoggedOut);
    }
  }, []);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Drink4You
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {leftOptions.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(page.route);
                  }}
                >
                  <Typography
                    textAlign="center"
                    
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Drink4You
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {leftOptions.map((page) => (
              <Button
                key={page.name}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(page.route);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Typography>{loggedInAs}&nbsp;</Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={`${username}`} src="/static/images/avatar/3.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {rightOptions.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(setting.route);
                  }}
                >
                  <Typography textAlign="center">{setting.name} </Typography>
                  <br />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
