export default function Fight({ contenders, fightResult, determineWinner }) {
  console.log(contenders);
  determineWinner(contenders);

  return <h1>{fightResult && fightResult}</h1>;
}
