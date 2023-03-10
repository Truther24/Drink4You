import React from "react";
import "../style/Modal.css";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Cookies } from "react-cookie";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Grid, Divider, Paper } from "@material-ui/core";

export default function Comments(props) {
    const cookies = new Cookies();

    const [comments, setComments] = useState(props?.comments);
    const [fetchCount, setFetchCount] = useState(0);

  
  useEffect(() => {
    setComments(props?.comments)
  },[props?.comments])
  
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
                `https://localhost:7090/getAllCommentsBasedOnDrink/${props?.id}`,
                requestOption
            );
          const responseData = await response.json();
            console.log("went in comments component")
           setComments(responseData);
        };
        fetcher();
    }, [fetchCount]);

    const getParent = (element, desired) => {
        if (element.nodeName.toLowerCase() === desired) return element;
        return getParent(element.parentNode, desired);
    };
    const deleteComment = (e) => {
        // console.log("went in delete comment")
        e.preventDefault();
        const text = getParent(e.target, "button").previousElementSibling;
        // .innerText;
        return fetcher(text.id);
    };
    const fetcher = async (id) => {
        const requestOption = {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                Authorization: "Bearer " + cookies.get("userToken"),
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(
            `https://localhost:7090/deleteComment/${id}`,
            requestOption
        );
        const data = await response.json();
        // comments = [...comments].filter((c) => c.id !== id);
        console.log(data);
        setFetchCount(fetchCount+1);
    };

    return (
        <>
            {/* {console.log(props?.comments)} */}
            {comments.map((comment, index) => (
                <div key={index}>
                    <Paper
                        style={{
                            padding: "50px 20px",
                            width: "50%",
                            marginLeft: "25%",
                            backgroundColor: "rgba(0, 0, 0, 0.754)",
                        }}
                    >
                        <Grid container id="comment" wrap="nowrap" spacing={2}>
                            <Grid
                                justifyContent="flex-start"
                                item
                                xs
                                zeroMinWidth
                            >
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

                                <div
                                    style={{
                                        textAlign: "left",
                                        color: "white",
                                    }}
                                >
                                    <Grid
                                        container
                                        justifyContent="flex-start"
                                        sx={{ color: "text.primary" }}
                                    >
                                        <span id={comment.commentID}>
                                            {comment.message}
                                        </span>
                                        <button
                                            style={{ marginLeft: "auto" }}
                                            onClick={deleteComment}
                                        >
                                            <DeleteOutlinedIcon />
                                        </button>
                                    </Grid>
                                </div>
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
                </div>
            ))}
        </>
    );
}
