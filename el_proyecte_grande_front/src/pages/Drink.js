import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useParams, useLocation } from "react-router-dom";
import Modal from "./Modal";
import "../style/Drink.css";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import Comments from "./Comments";

export default function Drink() {
  const { drinkId } = useParams();
  const cookies = new Cookies();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [afterPost, setAfterPost] = useState(0);

  const addComment = async (event) => {
    const requestOption = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer " + cookies.get("userToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idDrink: `${drinkId}`,
        message: `${event}`,
      }),
    };

    const response = await fetch(
      `https://localhost:7090/postComment`,
      requestOption
    );
    const responseData = await response.json();
    console.log("went in fetch postComment");
    setAfterPost(afterPost + 1);
    setComments(responseData.comments);
    event.target.reset();
  };

  useEffect(() => {
    const fetcher = async () => {
      const requestOption = {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer " + cookies.get("userToken"),
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://localhost:7090/getAllCommentsBasedOnDrink/${drinkId}`,
        requestOption
      );
      const responseData = await response.json();
      console.log(responseData);
      setComments(responseData);
    };
    fetcher();
  }, [afterPost]);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const requestOption = {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer " + cookies.get("userToken"),
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://localhost:7090/drink/${drinkId}`,
        requestOption
      );
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  return (
      <Box
          className="drink-page-container-image"
          style={{
              position: "relative",
              zIndex: "-2"
          }}
      >
      <Box
        
              style={{
                  position: "fixed",
                  inset: "0",
                  display: "block",
                  backgroundRepeat: "no-repeat",
                  width: "100vw",
                  overflow: "hidden",
                  height: "100vh",
                  backgroundSize: "cover",
                  zIndex: "0",
                  backgroundImage: `url(${data?.drink?.strDrinkThumb})`,
                  filter: "brightness(40%) ",
              }}
          ></Box>
          <Box
              className="drink-page-container"
              style={{
                  filter: "brightness(80%) ",
              }}
          >
              {isLoading ? (
                  <>
                      <br />
                      <br />
                      <br />
                      <CircularProgress />
                  </>
              ) : (
                  <>
                      <br />
                      <br />

                      <Box
                          className="drink-image-container"
                          style={{ maxWidth: "100%", height: "auto" }}
                      >
                          <img
                              className="drink-image"
                              src={data?.drink?.strDrinkThumb}
                              alt={data?.drink?.strDrink}
                              style={{ maxWidth: "100%", height: "auto" }}
                          />
                      </Box>
                      <br />

                      <Box className="drink-details-container">
                          <Typography variant="h2">
                              {data?.drink?.strDrink}
                          </Typography>
                          <Typography variant="subtitle1">
                              Type of Glass: {data?.drink?.strGlass}
                          </Typography>
                          <br />
                          <Typography variant="h3">Instructions:</Typography>
                          <Typography variant="body1">
                              {data?.drink?.strInstructions}
                          </Typography>

                          <br />
                          <br />
                          <Typography variant="h3">Ingredients:</Typography>
                          <List className="ingredient-list">
                              {data?.drink?.strIngredients?.map(
                                  (ingredient, index) =>
                                      ingredient !== null ? (
                                          <>
                                              <ListItem
                                                  key={index}
                                                  className="ingredient"
                                              >
                                                  <ListItemText
                                                      key={index}
                                                      primary={ingredient}
                                                  />
                                              </ListItem>
                                          </>
                                      ) : (
                                          <></>
                                      )
                              )}
                          </List>
                          <Box className="drink-comments-container">
                              <Box className="new-comment-container">
                                  <Modal
                                      className="new-comment"
                                      drinkId={drinkId}
                                      addComment={addComment}
                                  />
                              </Box>
                          </Box>
                          <Typography variant="h3" style={{ top: "100px" }}>
                              Comments:{" "}
                          </Typography>
                          <br />
                          <br />
                          <Comments comments={comments} id={drinkId} />
                      </Box>
                  </>
              )}
          </Box>
      </Box>
  );
}
