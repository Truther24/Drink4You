import React, { useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { Cookies } from "react-cookie";
import {  useNavigate } from "react-router-dom";


import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Input,
    FormControlLabel,
    Checkbox,
    makeStyles,
  Button,
    Typography
} from "@material-ui/core";
import { object } from "prop-types";

export default function AddDrink() {

        const navigate = useNavigate();

  const cookies = new Cookies();


  
    const classes = useStyles();
    const [values, setValues] = useState([]);
    const [currValue, setCurrValue] = useState("");

  // function addDrink(e) {
  //       e.preventDefault();
  //       console.log(e);
  // }
  

  const addDrink = async (event) => {
    event.preventDefault();
    // console.log(event.target[3]);
    // console.log(values)
    var alcoholic;
    if (event.target[3].checked === true) {
      alcoholic="Alcoholic"
    }
    else {
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
                strGlass: event.target[2].value,
                strInstructions: event.target[5].value,
                strDrinkThumb:
                    "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
          },
            ingredients: reformatedIngridients
        }),
    };
console.log("before fetch")
    const response = await fetch(`https://localhost:7090/addDrink`, requestOption);
      const responseData = await response.json();
        navigate("/");
      

};


////


  const handleKeyUp = (e) => {
      console.log(e.keyCode)
        if (e.keyCode == 18 && !(e.target.value.replace(/\s/g, "") === "")) {
            setValues((oldState) => [...oldState, e.target.value]);
            setCurrValue("");
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
        <>
            <br />
            <br />
            <form onSubmit={addDrink}>
                <Box
                    style={{ fontFamily: "sans-serif", textAlign: "center" }}
                    sx={{
                        color: "white",
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
                        <InputLabel id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChangeForm}
                        >
                            <MenuItem value={"Ordinary Drink"}>
                                Ordinary Drink
                            </MenuItem>
                            <MenuItem value={"Cocktail"}>Cocktail</MenuItem>
                            <MenuItem value={"Shake"}>Shake</MenuItem>
                            <MenuItem value={"Other / Unknown"}>
                                Other / Unknown
                            </MenuItem>
                            <MenuItem value={"Cocoa"}>Cocoa</MenuItem>
                            <MenuItem value={"Shot"}>Shot</MenuItem>
                            <MenuItem value={"Coffee / Tea"}>
                                Coffee / Tea
                            </MenuItem>
                            <MenuItem value={"Homemade Liqueur"}>
                                Homemade Liqueur
                            </MenuItem>
                            <MenuItem value={"Punch / Party Drink"}>
                                Punch / Party Drink
                            </MenuItem>
                            <MenuItem value={"Beer"}>Beer</MenuItem>
                            <MenuItem value={"Soft Drink"}>Soft Drink</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <TextField
                        inputProps={{ style: { color: "white" } }}
                        fullWidth
                        label="Name"
                        id="Name"
                        style={{ width: 400, margin: "10px" }}
                    />

                    <br />
                    <TextField
                        fullWidth
                        label="Glass Type"
                        id="Glass Type"
                        style={{ width: 400, margin: "10px" }}
                    />
                    <FormControlLabel
                        style={{ margin: "10px" }}
                        control={<Checkbox defaultChecked />}
                        label="Alcoholic"
                    />
                    <br />

                    <div className="App" style={{ fontFamily: "sans-serif" }}>
                        <FormControl
                            classes={{ root: classes.formControlRoot }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Ingredients:
                            </Typography>
                            <div className={"containerr"}>
                                {values.map((item, index) => (
                                    <Chip
                                        size="small"
                                        onDelete={() =>
                                            handleDelete(item, index)
                                        }
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
                        color="warning"
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
        </>
    );
}
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
            backgroundColor: "gray",
            padding: "1px 3px",
            borderRadius: "4px",
        },
    },
}));
