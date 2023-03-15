import "./style/App.css";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Category from "./pages/Category";

import { Route, Routes } from "react-router-dom";
import Drink from "./pages/Drink";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import AddDrink from "./pages/AddDrink";
import Logout from "./pages/Logout";

import { green, brown } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./pages/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
      <>
          <ThemeProvider theme={theme}>
              <Navbar />
          </ThemeProvider>
          <div className="container">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:category" element={<Category />} />
                  <Route
                      path="/categories/:category/:drinkName/:drinkId"
                      element={<Drink />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/addDrink" element={<AddDrink />}></Route>
                  <Route path="/logout" element={<Logout />}></Route>
              </Routes>
      </div>
      <Footer/>
      </>
  );
}

export default App;
