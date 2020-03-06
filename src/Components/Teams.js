import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Image from 'react-bootstrap/Image';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      '&:hover': {
        backgroundColor: '#37003c',
        },
    },
  }));

function Teams() {
    const classes = useStyles();
    const [data, setData] = useState({ hits: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://www.thesportsdb.com/api/v1/json/4013017/search_all_teams.php?l=English%20Premier%20League',
            );
            setData(result.data.teams);
        };
        fetchData();
    }, []);

    console.log(data);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {Object.keys(data).map((item, index) => (
                <Grid item xs={6} sm={3} key={index} component='a' href={'players/' + data[item].idTeam}>
                    <Paper className={classes.paper}>
                        <Image src={data[item].strTeamBadge} fluid />
                    </Paper>
                </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Teams;