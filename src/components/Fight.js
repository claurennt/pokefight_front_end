import { useLocation } from "react-router-dom";
export default function Fight() {
  const location = useLocation();
  const { state } = location;
  const { pokemon, opponent } = state;

  const determineWinner = (pokemon, opponent) => {
    let powerPokemon = Math.floor(
      (pokemon.base.HP +
        pokemon.base.Attack +
        pokemon.base.Defense +
        pokemon.base.Speed) *
        Math.random()
    );

    let powerOpponent = Math.floor(
      (opponent.base.HP +
        opponent.base.Attack +
        opponent.base.Defense +
        opponent.base.Speed) *
        Math.random()
    );

    let winnerPlayerScore = Math.max(powerPokemon, powerOpponent);

    return winnerPlayerScore === powerPokemon
      ? { ...pokemon, score: winnerPlayerScore }
      : { ...opponent, score: winnerPlayerScore };
  };
  // const { player, opponent } = contenders;
  // const [loser, setLoser] = useState();
  // const [winner, setWinner] = useState();

  // const determineWinner = (player, opponent) => {
  //   let powerplayer =
  //     (player.base.HP +
  //       player.base.Attack +
  //       player.base.Defense +
  //       player.base.Speed) *
  //     Math.random();
  //   let poweropponent =
  //     (opponent.base.HP +
  //       opponent.base.Attack +
  //       opponent.base.Defense +
  //       opponent.base.Speed) *
  //     Math.random();

  //   setWinner(Math.max(powerplayer, poweropponent));
  //   setLoser(Math.min(powerplayer, poweropponent));
  // };

  // console.log(winner);
  // determineWinner(player, opponent);
  const winner = determineWinner(pokemon, opponent);
  console.log(winner);
  return (
    <>
      <div>
        <h1>
          {winner.name.english} won with this score: {winner.score}!
        </h1>

        <img src={winner.image} alt="" />
      </div>
      {/* <div>
        <h1>You Lost!</h1>
        <p>Score:{loser}</p>
        <img src={pokemon.image} alt="" />
      </div> */}
    </>
  );
  /* <img src={winner.image} alt="winner pokemon image" />*/
}
