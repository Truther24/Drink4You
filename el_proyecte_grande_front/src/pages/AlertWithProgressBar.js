import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function AlertWithProgressBar(props) {
    return (
      <>
        <Alert
          severity={props.severity}
          style={{
            position: "fixed",
            top: "2%",
            right: "2%",
            width: "12%",
            paddingRight: "50px",
          }}
        >
          <AlertTitle>{props.title}</AlertTitle>
          {props.children}
          <LinearProgress variant="determinate" />
        </Alert>
      </>
    );
}

