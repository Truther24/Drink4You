import React from 'react'
import "../style/Modal.css";
import { useEffect, useState } from "react";
import {
  Grid,
  Divider,
  Paper
} from "@material-ui/core";


export default function Comments(props) {
    return (
      <>
        {props.comments?.map((comment) => (
          <>
            <Paper
              style={{
                padding: "50px 20px",
                width: "50%",
                marginLeft: "25%",
                backgroundColor: "rgba(0, 0, 0, 0.754)",
              }}
            >
              <Grid container id="comment" wrap="nowrap" spacing={2}>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4
                    style={{
                      margin: 0,
                      textAlign: "left",
                      lineHeight: "28px",
                      color: "white",
                    }}
                  >
                    {comment.authorName}
                  </h4>

                  <p style={{ textAlign: "left", color: "white" }}>
                    {comment.message}{" "}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      color: "gray",
                      lineHeight: "28px",
                    }}
                  >
                    posted 1 minute ago
                  </p>
                </Grid>
              </Grid>
            </Paper>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </>
        ))}
      </>
    );
}
