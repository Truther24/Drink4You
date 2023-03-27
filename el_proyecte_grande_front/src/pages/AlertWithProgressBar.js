import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  alert: {
    transition: "transform 0.5s ease-in-out",
  },
  progress: {
    transition: "transform 0.5s ease-in-out",
  },
}));

export default function AlertWithProgressBar(props) {
  const classes = useStyles();
  const [timeLeft, setTimeLeft] = useState(props.time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 2);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === -100) {
      props.onClose(false);
    }
  }, [timeLeft]);

  return (
    <>
      <Alert
        className={classes.alert}
        severity={props.severity}
        style={{
          position: "fixed",
          top: "15%",
          right: "2%",
          width: "12%",
          paddingRight: "50px",
        }}
      >
        <AlertTitle>{props.title}</AlertTitle>

        {props.children}
        <br />
        <br />
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={(timeLeft / props.time) * 100}
        />
      </Alert>
    </>
  );
}
