import React, { useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { Cookies } from "react-cookie";
import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import AlertWithProgressBar from "./AlertWithProgressBar.js"
import { Alert, AlertTitle } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";



import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Input,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";



const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '& .MuiInputBase-inputMultiline': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
});

const CustomInputLabel = styled(InputLabel)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiInputBase-inputMultiline": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
});

InputLabel.defaultProps = {
  style: {
    color: "white",
  },
};


const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "300px",
    flexWrap: "wrap",
    flexDirection: "row",
    border: "2px solid lightgray",
    margin: "20px",
    padding: 4,
    borderRadius: "4px",
    "&> div.containerr": {
      gap: "6px",
      display: "flex",
      flexWrap: "wrap",
    },
    "&> div.containerr > span": {
      padding: "1px 3px",
      borderRadius: "4px",
    },
  },
}));

export default function AddDrink() {

  const cookies = new Cookies();

  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [currValue, setCurrValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // function addDrink(e) {
  //       e.preventDefault();
  //       console.log(e);
  // }

  const addDrink = async (event) => {
    event.preventDefault();
    // console.log(event.target[3]);
    // console.log(values)
    var alcoholic;
    if (event.target[7]?.checked === true) {
      alcoholic = "Alcoholic";
    } else {
      alcoholic = "Non-Alcoholic";
    }

    let reformatedIngridients = [];
    values.forEach((ingredient) =>
      reformatedIngridients.push({
        ingredientId: 0,
        name: ingredient,
        idDrink: "0",
      })
    );

    const requestOption = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer " + cookies.get("userToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addedDrink: {
          addedDrinkID: 0,
          idDrink: "string",
          strDrink: event.target[1].value,
          strCategory: event.target[0].value,
          strAlcoholic: alcoholic,
          strGlass: event.target[4].value,
          strInstructions: event.target[9].value,
          strDrinkThumb:
            "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
        },
        ingredients: reformatedIngridients,
      }),
    };
    const response = await fetch(
      `https://localhost:7090/addDrink`,
      requestOption
    );
    const responseData = await response.json();

    const formData = new FormData();

    console.log(event);
    formData.append("imageFile", event?.target[11]?.files[0]);
    formData.append("idDrink", responseData.message);

    const requestOption2 = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "multipart/form-data",
        Authorization: "Bearer " + cookies.get("userToken"),
      },
      body: formData,
    };

    const response2 = await fetch(
      `https://localhost:7090/addDrinkImage`,
      requestOption2
    );

    const responseData2 = await response2.json();
    console.log(responseData2);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(()=>false)
    },3000)


  };


  const handleKeyUp = (e) => {
    
    if (e.keyCode === 13 && !(e.target.value.replace(/\s/g, "") === "")) {
      e.preventDefault()
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
    if (e.keyCode == 13) {
      e.preventDefault()
    }

  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    console.log(item);
    setValues(arr);
  };

  const [category, setCategory] = React.useState("");

  const handleChangeForm = (event) => {
    setCategory(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <br />
      <br />
      {showAlert && (
        <AlertWithProgressBar
          timeout={2000}
          title="Succes"
          severity="success"
          children="The drink was added"
        />
      )}
      <form onSubmit={addDrink}>
        <Box
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            color: "white",
          }}
          sx={{
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl
            fullWidth
            style={{ width: 400, margin: "10px", color: "white" }}
          >
            <CustomInputLabel id="demo-simple-select-label">
              Category
            </CustomInputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              style={{ color: "white" }}
              label="Category"
              onChange={handleChangeForm}
            >
              <MenuItem value={"Ordinary Drink"}>Ordinary Drink</MenuItem>
              <MenuItem value={"Cocktail"}>Cocktail</MenuItem>
              <MenuItem value={"Shake"}>Shake</MenuItem>
              <MenuItem value={"Other / Unknown"}>Other / Unknown</MenuItem>
              <MenuItem value={"Cocoa"}>Cocoa</MenuItem>
              <MenuItem value={"Shot"}>Shot</MenuItem>
              <MenuItem value={"Coffee / Tea"}>Coffee / Tea</MenuItem>
              <MenuItem value={"Homemade Liqueur"}>Homemade Liqueur</MenuItem>
              <MenuItem value={"Punch / Party Drink"}>
                Punch / Party Drink
              </MenuItem>
              <MenuItem value={"Beer"}>Beer</MenuItem>
              <MenuItem value={"Soft Drink"}>Soft Drink</MenuItem>
            </Select>
          </FormControl>
          <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            label="Name"
            id="Name"
            style={{ width: 400, margin: "10px" }}
            multiline
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
          />

          <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            multiline
            label="Glass Type"
            id="Glass Type"
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            style={{ width: 400, margin: "10px" }}
          />
          <FormControlLabel
            style={{ margin: "10px" }}
            control={<Checkbox defaultChecked />}
            label="Alcoholic"
          />
          <br />

          <div className="App" style={{ fontFamily: "sans-serif" }}>
            <FormControl classes={{ root: classes.formControlRoot }}>
              <Typography variant="h6" gutterBottom>
                Ingredients:
              </Typography>
              <div className={"containerr"}>
                {values.map((item, index) => (
                  <Chip
                    size="small"
                    onDelete={() => handleDelete(item, index)}
                    label={item}
                  />
                ))}
              </div>
              <Input
                value={currValue}
                onChange={handleChange}
                onKeyDown={handleKeyUp}
              />
            </FormControl>
          </div>
          <Textarea
            placeholder="Type your instructions here..."
            minRows={2}
            style={{ width: 400 }}
          />
        </Box>
        <Button variant="contained" component="label">
          Upload Drink Photo
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <br />
        <br />
        <Button variant="contained" type="submit">
          Add Drink
        </Button>
      </form>
    </ThemeProvider>
  );
}

