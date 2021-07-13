import { NavLink } from "react-router-dom";
import React from "react";
import pic from "./assets/PokeFight.png";
import pokeBall from "./assets/pokeball.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Navigation() {
  //console.log(pic);
  const classes = useStyles();
  return (
    <NavLink to="/">
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <img src={pokeBall} alt="pokeball" width="150px" />
          </Grid>
          <Grid item>
            <img src={pic} alt="POKEFIGHT" width="400px" />
          </Grid>
        </Grid>
      </div>
    </NavLink>
  );
}
