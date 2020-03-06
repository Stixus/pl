import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Image from 'react-bootstrap/Image';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
        '&:hover': {
            backgroundColor: '#37003c',
            color: 'white',
        },
    },
    text: {
        textDecoration: 'inherit',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
        },
    }
}));

function Players(props) {
    const classes = useStyles();
    const [data, setData] = useState(0);
    const param = props.match.params.id;
    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://www.thesportsdb.com/api/v1/json/4013017/lookup_all_players.php?id=' + param,
            );
            setData(result.data.player);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {Object.keys(data).map((item, index) => (
                    <Grid  className={classes.text} item xs={6} sm={3} key={index} component='a' href={'playerdetails/' + data[item].idPlayer}>
                        <Paper className={classes.paper}>
                            {data[item].strCutout ?
                                <Image src={data[item].strCutout} fluid /> :
                                <Image src={data[item].strThumb} fluid />
                            }
                            <Typography variant="h6" paragraph>{data[item].strPlayer}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Players;