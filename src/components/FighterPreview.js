import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import React from "react";
import BackspaceIcon from "@material-ui/icons/Backspace";

import fight from "../assets/Fight.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(28),
      height: theme.spacing(58),
    },
  },
}));

export default function FighterPreview({ backendEntryPoint }) {
  let history = useHistory();
  const { id } = useParams();

  const [playerPokemon, setPlayerPokemon] = useState();
  const [opponentPokemon, setOpponentPokemon] = useState();
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [open, toggle] = useState(false);
  // const { player, opponent } = contenders;

  const fetchData = useCallback(async () => {
    try {
      const retrievedUserPokemon = await axios.get(
        `${backendEntryPoint}/${id}`
      );
      setPlayerPokemon(retrievedUserPokemon.data);
      let randomOpponentId = Math.floor(Math.random() * 500);
      const retrievedOpponentPokemon = await axios.get(
        `${backendEntryPoint}/${randomOpponentId}`
      );
      setOpponentPokemon(retrievedOpponentPokemon.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [backendEntryPoint, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(playerPokemon, opponentPokemon);
  const classes = useStyles();
  const handleBack = (e) => {
    history.push("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggle(true);
    setSelectionConfirmed(true);
    // setContenders([playerPokemon, opponentPokemon]);
    setTimeout(() => {
      history.push(`/fight/`, {
        pokemon: playerPokemon,
        opponent: opponentPokemon,
        open: open,
      });
    }, 1250);
  };
  return (
    <div>
      {/* <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button> */}
      {!selectionConfirmed && (
        <>
          <Button
            onClick={handleBack}
            variant="contained"
            color="primary"
            style={{ "margin-left": "25px" }}
            size="large"
          >
            <BackspaceIcon style={{ "margin-right": "10px" }} />
            Back to overview
          </Button>
        </>
      )}
      <div className={classes.root}>
        <Fade in="true">
          <Paper elevation={20}>
            <Typography variant="p" component="p">
              {playerPokemon && (
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <h3>Name: {playerPokemon.name.english} </h3>
                    <h4>Type: {playerPokemon.type[0]} </h4>
                  </li>
                  <li>
                    {" "}
                    <img
                      src={playerPokemon.image}
                      alt={playerPokemon.title}
                      width="60%"
                    />
                    <br />
                    <br />
                  </li>
                  <li>Attack : {playerPokemon.base.Attack}</li>
                  <li>Defense : {playerPokemon.base.Defense}</li>
                  <li>Hit Points : {playerPokemon.base.HP}</li>
                  <li>Special Attack : {playerPokemon.base["Sp. Attack"]}</li>
                  <li>Special Defense : {playerPokemon.base["Sp. Attack"]}</li>
                  <li>Speed : {playerPokemon.base.Speed}</li>
                  <li>
                    {" "}
                    {!selectionConfirmed && (
                      <Button
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        style={{ "margin-top": "10px" }}
                        size="large"
                      >
                        <img src={fight} alt="pokeball" width="75px" />
                      </Button>
                    )}
                  </li>
                </ul>
              )}
            </Typography>
          </Paper>
        </Fade>
        {selectionConfirmed && (
          <Fade in="true">
            <Paper elevation={20}>
              <Typography variant="p" component="p">
                {opponentPokemon && (
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      <h3>Name: {opponentPokemon.name.english} </h3>
                      <h4>Type: {opponentPokemon.type[0]} </h4>
                    </li>
                    <li>
                      {" "}
                      <img
                        src={opponentPokemon.image}
                        alt={opponentPokemon.title}
                        width="60%"
                      />
                      <br />
                      <br />
                    </li>
                    <li>Attack : {opponentPokemon.base.Attack}</li>
                    <li>Defense : {opponentPokemon.base.Defense}</li>
                    <li>Hit Points : {opponentPokemon.base.HP}</li>
                    <li>
                      Special Attack : {opponentPokemon.base["Sp. Attack"]}
                    </li>
                    <li>
                      Special Defense : {opponentPokemon.base["Sp. Attack"]}
                    </li>
                    <li>Speed : {opponentPokemon.base.Speed}</li>
                  </ul>
                )}
              </Typography>
            </Paper>
          </Fade>
        )}
      </div>
    </div>
  );
}
