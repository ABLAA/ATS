import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#8aafb5"
  }
}));
export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit">
          <img
            src={require("../assets/ats.png")}
            style={{ width: "20%" }}
            alt="not found"
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
