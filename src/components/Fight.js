import { useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import React from "react";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import styles from "../css/styles.module.css";
import { FallingEmojis } from "falling-emojis";
import Confetti from "react-confetti";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Fight(open) {
  let history = useHistory();

  const classes = useStyles();

  // const [ref, { width }] = useMeasure();

  const location = useLocation();
  const { state } = location;
  const { pokemon, opponent } = state;

  const [ref] = useMeasure();

  const determineWinner = (pokemon, opponent) => {
    const powerPokemon = Math.floor(
      (pokemon.base.HP +
        pokemon.base.Attack +
        pokemon.base.Defense +
        pokemon.base.Speed) *
        Math.random()
    );

    const powerOpponent = Math.floor(
      (opponent.base.HP +
        opponent.base.Attack +
        opponent.base.Defense +
        opponent.base.Speed) *
        Math.random()
    );

    const winnerPlayerScore = Math.max(powerPokemon, powerOpponent);
    const loserPlayerScore = Math.min(powerPokemon, powerOpponent);

    const winnerPlayer =
      winnerPlayerScore === powerPokemon
        ? { ...pokemon, score: winnerPlayerScore }
        : { ...opponent, score: winnerPlayerScore };

    const loserPlayer =
      loserPlayerScore === powerPokemon
        ? { ...pokemon, score: loserPlayerScore }
        : { ...opponent, score: loserPlayerScore };

    return { loser: loserPlayer, winner: winnerPlayer };
  };

  const { loser, winner } = determineWinner(pokemon, opponent);
  console.log(loser);
  const winnerWidth = useSpring({ width: open ? winner.score : 0 });
  const loserWidth = useSpring({ width: open ? loser.score : 0 });
  const handleSubmit = async () => {
    const gameResult = {
      nameFighterOne: pokemon.name.english,
      nameFighterTwo: opponent.name.english,
      winner: winner.name.english,
    };
    console.log(gameResult);
    try {
      await axios({
        method: "post",
        url: "https://pokefight-group4.herokuapp.com/pokemon/game/save",
        data: gameResult,
      });
    } catch (err) {
      console.log(err.message);
    }
    history.push("/");
  };
  return (
    <>
      {winner.name.english === pokemon.name.english ? (
        <Confetti
          width={window.innerWidth || "300"}
          height={window.innerHeight || "200"}
        />
      ) : (
        <>
          <FallingEmojis emoji={"😥🐣"} />
        </>
      )}
      {/* <Confetti
        width={window.innerWidth || "300"}
        height={window.innerHeight || "200"}
      /> */}

      <div className={classes.root}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Box display="flex" flexDirection="column">
        <h1>
          {winner.name.english === pokemon.name.english
            ? `You won with a score of: ${winner.score}!`
            : `${winner.name.english} won with a score of : ${winner.score}!`}
        </h1>
        <div className={styles.container}>
          <div ref={ref} className={styles.main}>
            <animated.div className={styles.fill} style={winnerWidth} />
            <animated.div className={styles.content}>
              {winnerWidth.width.to((x) => x.toFixed(0))}
            </animated.div>
          </div>
          <div>
            <img src={winner.image} alt="" width="300px" height="300px" />
          </div>
        </div>

        <div>
          <h1>
            {loser.name.english === pokemon.name.english
              ? `You lost with a score of: ${loser.score}!`
              : `${loser.name.english} lost with a score of : ${loser.score}!`}
          </h1>
        </div>
        <div className={styles.container}>
          <div ref={ref} className={styles.main}>
            <animated.div className={styles.fill} style={loserWidth} />
            <animated.div className={styles.content}>
              {loserWidth.width.to((x) => x.toFixed(0))}
            </animated.div>
          </div>
          <div>
            <img src={loser.image} alt="" width="150px" height="150px" />
          </div>
        </div>
      </Box>
    </>
  );
  /* <img src={winner.image} alt="winner pokemon image" />*/
}
