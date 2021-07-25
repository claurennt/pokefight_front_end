import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

export default function FighterPreview({ pokemonList }) {
  const classes = useStyles();
  let history = useHistory();
  const { id } = useParams();
  console.log(pokemonList);
  const [playerPokemon, setPlayerPokemon] = useState();
  const [opponentPokemon, setOpponentPokemon] = useState();
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [open, toggle] = useState(false);

  // find pokemon like one selected
  const p1 = pokemonList.find((p) => p.id === Number(id));

  const p2 = (pokemonList, id) => {
    let id2 = Math.floor(Math.random() * pokemonList.length);
    if (id2 === Number(id)) {
      id2 = Math.floor(Math.random() * pokemonList.length);
    }
    return pokemonList[id2];
  };
  useEffect(() => {
    setPlayerPokemon(p1);
    setOpponentPokemon(p2(pokemonList, id));
  }, [p1, pokemonList, id]);

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
      {!selectionConfirmed && (
        <div>
          <Button
            onClick={handleBack}
            variant="contained"
            color="primary"
            style={{ marginLeft: "25px" }}
            size="large"
          >
            <BackspaceIcon style={{ marginRight: "10px" }} />
            Back to overview
          </Button>
        </div>
      )}
      <div className={classes.root}>
        <Fade in={true}>
          <Paper elevation={20}>
            {playerPokemon && (
              <div>
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
                      style={{ maxHeight: "140px", maxWidth: "150px" }}
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
                    <Button
                      onClick={handleClick}
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "10px" }}
                      size="large"
                    >
                      <img src={fight} alt="pokeball" width="75px" />
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </Paper>
        </Fade>
        {selectionConfirmed && (
          <Fade in={true}>
            <Paper elevation={20}>
              {opponentPokemon && (
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <h3>Name: {opponentPokemon.name.english} </h3>
                    <h4>Type: {opponentPokemon.type[0]} </h4>
                  </li>
                  <li>
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
                  <li>Special Attack : {opponentPokemon.base["Sp. Attack"]}</li>
                  <li>
                    Special Defense : {opponentPokemon.base["Sp. Attack"]}
                  </li>
                  <li>Speed : {opponentPokemon.base.Speed}</li>
                </ul>
              )}
            </Paper>
          </Fade>
        )}
      </div>
    </div>
  );
}
