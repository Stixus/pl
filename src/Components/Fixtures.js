import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  date: {
    backgroundColor: 'lightgrey',
  },
  score: {
    backgroundColor: '#37003c',
    color: 'white',
  },
  button: {
      outline: 'none !important',
  }
}));

function Fixtures() {
    const [data, setData] = useState({});
    let [round, setRound] = useState(28);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=4328&r=' + round + '&s=1920',
            );
            setData(result.data.events);
        };
        fetchData();
    }, [round]);

    console.log(data);
    console.log(round);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Button className={classes.button} variant="contained" onClick={() => {round > 1 && setRound(round - 1)}}>Previous round</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={classes.button} variant="contained" onClick={() => {round < 29 && setRound(round + 1)}}>Next round</Button>
                </Grid>
            </Grid>
            <br></br>
            <Typography>Round: {round}</Typography>
            <br></br>
            {Object.keys(data).map((item, index) => (
                <Paper key={index}>
            <Grid container spacing={3}> 
                {(index === 0) || (index > 0 && data[item].dateEvent !== data[item - 1].dateEvent) ?
                
                <Grid item xs={12}>
                    <Paper className={classes.date}><Moment format="D MMM YYYY" withTitle>{data[item].dateEvent}</Moment></Paper>
                </Grid>: null}
                <Grid item xs={5} align='right'>
                    {data[item].strHomeTeam}
                </Grid>
                <Grid item xs={2}>
                    {data[item].intHomeScore ?
                    <Paper className={classes.score}>
                        {data[item].intHomeScore}-{data[item].intAwayScore}
                    </Paper> :
                    <Paper className={classes.score}>
                            {data[item].strTime.substring(0, 5)}
                    </Paper>}
                </Grid>
                <Grid item xs={5} align='left'>
                    {data[item].strAwayTeam}
                </Grid>
            </Grid>
            </Paper>
            ))}
        </React.Fragment>
    );
}
export default Fixtures;