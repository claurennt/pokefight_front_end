import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import React from "react";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";

import styles from "../css/styles.module.css";

export default function Fight({ open }) {
  // const [ref, { width }] = useMeasure();

  const location = useLocation();
  const { state } = location;
  const { pokemon, opponent } = state;
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

  const winnerWidth = useSpring({ width: open ? winner.score : 0 });
  const loserWidth = useSpring({ width: open ? loser.score : 0 });

  return (
    <Box display="flex" flexDirection="column">
      <div className={styles.container}>
        <div ref={ref} className={styles.main}>
          <animated.div className={styles.fill} style={winnerWidth} />
          <animated.div className={styles.content}>
            {winnerWidth.width.to((x) => x.toFixed(0))}
          </animated.div>
        </div>
        <div ref={ref} className={styles.main}>
          <animated.div className={styles.fill} style={loserWidth} />
          <animated.div className={styles.content}>
            {loserWidth.width.to((x) => x.toFixed(0))}
          </animated.div>
        </div>
      </div>
      <div>
        <h1>
          {winner.name.english} won with this score: {winner.score}!
        </h1>

        <img src={winner.image} alt="" />
      </div>
      <div>
        <h1>You Lost!</h1>
        <p>Score:{loser.score}</p>
        <img src={loser.image} alt="" />
      </div>
    </Box>
  );
  /* <img src={winner.image} alt="winner pokemon image" />*/
}
