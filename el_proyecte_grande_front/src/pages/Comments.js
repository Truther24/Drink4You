import React from 'react'
import "../style/Modal.css";
import { useEffect, useState } from "react";


export default function Comments(props) {
    return (
        <>
            {props.comments?.map((comment) =>

                <div id="commentsContainer">
                    {comment.message}
                </div>
            )}
        </>
    )
}
