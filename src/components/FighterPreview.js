import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(28),
      height: theme.spacing(56),
    },
  },
}));

export default function FighterPreview({ backendEntryPoint }) {
  const { id } = useParams();

  const [fighterDetail, setFighterDetail] = useState();

  const fetchData = useCallback(async () => {
    try {
      const retrievedPokemon = await axios.get(`${backendEntryPoint}/${id}`);
      setFighterDetail(retrievedPokemon.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [backendEntryPoint, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(fighterDetail);
  const classes = useStyles();

  return (
    <div>
      <NavLink to={`./fight/${id}`}>FIGHT !</NavLink>;
      <div className={classes.root}>
        <Paper elevation={20}>
          <Typography variant="p" component="p">
            {fighterDetail && (
              <>
                <ul style={{ "list-style-type": "none" }}>
                  <li>
                    <h3>Name: {fighterDetail.name.english} </h3>
                    <h4>Type: {fighterDetail.type[0]} </h4>
                  </li>
                  <li>
                    {" "}
                    <img
                      src={fighterDetail.image}
                      alt={fighterDetail.title}
                      width="60%"
                    />
                    <br />
                    <br />
                  </li>
                  <li>Attack : {fighterDetail.base.Attack}</li>
                  <li>Defense : {fighterDetail.base.Defense}</li>
                  <li>Hit Points : {fighterDetail.base.HP}</li>
                  <li>Special Attack : {fighterDetail.base["Sp. Attack"]}</li>
                  <li>Special Defense : {fighterDetail.base["Sp. Attack"]}</li>
                  <li>Speed : {fighterDetail.base.Speed}</li>
                </ul>
              </>
            )}
          </Typography>
        </Paper>

        <Paper>
          <Typography variant="p" component="p">
            The second pokemon comes here after they click on fight
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
