import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import './App.css';
import "./errorboundaries/styles.css";
import useStyles from "./components/styles";
import ErrorBoundary from "./errorboundaries/ErrorBoundary";

function App() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography>
            <a href="../components/PersonalInformation.js">
              <img
                src="https://images.ctfassets.net/lzny33ho1g45/4ODoWVyzgicvbcb6J9ZZZ5/c0333ef44af8588fee18c1e6ed403fc7/Group_12549.jpg"
                height={"80px"}
                width={"130px"}
                alt="no images found"
              />
            </a>
          </Typography>
          <Typography variant="h2" className={classes.header}>
            Multi Step Form
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Container maxWidth="lg">
        <ErrorBoundary className="error-boundary">
          <Form />
        </ErrorBoundary>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
