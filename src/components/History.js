import React from "react";
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

export default function History({ leaderboard }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User selection</StyledTableCell>
            <StyledTableCell align="center">Opponent</StyledTableCell>
            <StyledTableCell align="right">Winner</StyledTableCell>
          </TableRow>
        </TableHead>
        {leaderboard && (
          <TableBody>
            {leaderboard.map((el, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {el.nameFighterOne}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {el.nameFighterTwo}
                </StyledTableCell>
                <StyledTableCell align="right">{el.winner}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
