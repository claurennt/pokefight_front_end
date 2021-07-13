import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Leaderboard() {
  function createData(nameFighterOne, nameFighterTwo, winner) {
    return { nameFighterOne, nameFighterTwo, winner };
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });
  const [leaderboard, setLeaderboard] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const fetchData = useCallback(async () => {
    try {
      const retrieveLeaderboard = await axios.get(
        `https://pokefight-group4.herokuapp.com/pokemon/game/leaderboard `
      );
      let rows = [];
      //console.log(retrieveLeaderboard.data);
      for (let fight of retrieveLeaderboard.data) {
        rows.unshift(
          createData(fight.nameFighterOne, fight.nameFighterTwo, fight.winner)
        );
      }
      setLeaderboard(rows);
      setIsFetching(false);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>nameFighterOne</StyledTableCell>
            <StyledTableCell align="center">nameFighterTwo</StyledTableCell>
            <StyledTableCell align="right">winner</StyledTableCell>
          </TableRow>
        </TableHead>
        {!isFetching && (
          <TableBody>
            {leaderboard.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.nameFighterOne}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.nameFighterTwo}
                </StyledTableCell>
                <StyledTableCell align="right">{row.winner}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
