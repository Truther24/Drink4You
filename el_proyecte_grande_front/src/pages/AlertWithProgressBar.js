import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function AlertWithProgressBar(props) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, props.timeout / 100);

    return () => {
      clearInterval(timer);
    };
  }, [props.timeout]);

    return (
      <>
        {console.log("went in ")}
        <Alert severity={props.severity}>
          <AlertTitle>{props.title}</AlertTitle>
          {props.children}
          <LinearProgress variant="determinate" value={progress} />
        </Alert>
      </>
    );
}

