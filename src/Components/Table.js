import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  nameLink: {
    color: 'black',
    '&:link': {
      textDecoration: 'none',
      color: 'black',
    },
    '&:hover': {
      color: '#37003c',
    },
  },
}));

function LeagueTable() {
  const [data, setData] = useState({hits: []});
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://www.thesportsdb.com/api/v1/json/4013017/lookuptable.php?l=4328&s=1920',
      );
      setData(result.data.table);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Club</TableCell>
            <TableCell>Played</TableCell>
            <TableCell>Won</TableCell>
            <TableCell>Drawn</TableCell>
            <TableCell>Lost</TableCell>
            <TableCell>GF</TableCell>
            <TableCell>GA</TableCell>
            <TableCell>GD</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell><a href={'/details/' + data[item].teamid} className={classes.nameLink}>{data[item].name}</a></TableCell>
              <TableCell>{data[item].played}</TableCell>
              <TableCell>{data[item].win}</TableCell>
              <TableCell>{data[item].draw}</TableCell>
              <TableCell>{data[item].loss}</TableCell>
              <TableCell>{data[item].goalsfor}</TableCell>
              <TableCell>{data[item].goalsagainst}</TableCell>
              <TableCell>{data[item].goalsdifference}</TableCell>
              <TableCell>{data[item].total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default LeagueTable;