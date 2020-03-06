import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import StyleIcon from '@material-ui/icons/Style';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles(theme => ({
    score: {
        backgroundColor: '#37003c',
        color: 'white',
    },
    info: {
        backgroundColor: '#F7F9F9',
    },
    yellowCard: {
        color: 'yellow',
    },
    redCard: {
        color: 'red',
    },
}));

function Livescores() {
    const [data, setData] = useState({ hits: [] });
    const [show, setShow] = useState(0);
    const [premierLeague, setPremierLeague] = useState(false);
    let [count, setCount] = useState(0);
    const classes = useStyles();
    console.log(count);
    console.log(data);
    console.log(premierLeague);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://www.thesportsdb.com/api/v1/json/4013017/latestsoccer.php',
            );
            setData(result.data.teams);
        };
        fetchData();
    }, []);

    setInterval(() => {
        setCount(count + 1);
    }, 60000);

    return (
        <div>
            {premierLeague === false &&
                <Typography variant='h6'>Premier League is currently not being played, see fixtures</Typography>
            }
            {data !== undefined ?
                <div>
                    {Object.keys(data).map((item, index) => (
                        <div key={index}>
                            {data[item].League === "English Premier League" ?
                                <React.Fragment>
                                    {premierLeague === false && setPremierLeague(true)}
                                    <Paper onClick={() => { index === show ? setShow(-1) : setShow(index) }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={5} align='right'>
                                                {data[item].HomeTeam}
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Paper className={classes.score}>
                                                    {data[item].HomeGoals}-{data[item].AwayGoals}
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={5} align='left'>
                                                {data[item].AwayTeam}
                                            </Grid>
                                        </Grid>
                                        <Typography paragraph>{data[item].Time}</Typography>
                                        <Divider></Divider>
                                        {show === index ?
                                            <Paper className={classes.info}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].HomeGoalDetails) !== "{}" &&
                                                            <div>
                                                                <SportsSoccerIcon></SportsSoccerIcon>
                                                                {JSON.stringify(data[item].HomeGoalDetails)
                                                                    .substring(1, JSON.stringify(data[item].HomeGoalDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].AwayGoalDetails) !== "{}" &&
                                                            <div>
                                                                <SportsSoccerIcon></SportsSoccerIcon>
                                                                {JSON.stringify(data[item].AwayGoalDetails)
                                                                    .substring(1, JSON.stringify(data[item].AwayGoalDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].HomeTeamYellowCardDetails) !== "{}" &&
                                                            <div>
                                                                <StyleIcon className={classes.yellowCard}></StyleIcon>
                                                                {JSON.stringify(data[item].HomeTeamYellowCardDetails)
                                                                    .substring(1, JSON.stringify(data[item].HomeTeamYellowCardDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].HomeTeamRedCardDetails) !== "{}" &&
                                                            <div>
                                                                <StyleIcon className={classes.redCard}></StyleIcon>
                                                                {JSON.stringify(data[item].HomeTeamRedCardDetails)
                                                                    .substring(1, JSON.stringify(data[item].HomeTeamRedCardDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].AwayTeamYellowCardDetails) !== "{}" &&
                                                            <div>
                                                                <StyleIcon className={classes.yellowCard}></StyleIcon>
                                                                {JSON.stringify(data[item].AwayTeamYellowCardDetails)
                                                                    .substring(1, JSON.stringify(data[item].AwayTeamYellowCardDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].AwayTeamRedCardDetails) !== "{}" &&
                                                            <div>
                                                                <StyleIcon className={classes.redCard}></StyleIcon>
                                                                {JSON.stringify(data[item].AwayTeamRedCardDetails)
                                                                    .substring(1, JSON.stringify(data[item].AwayTeamRedCardDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].HomeSubDetails) !== "{}" &&
                                                            <div>
                                                                <CachedIcon></CachedIcon>
                                                                {JSON.stringify(data[item].HomeSubDetails)
                                                                    .substring(1, JSON.stringify(data[item].HomeSubDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].AwaySubDetails) !== "{}" &&
                                                            <div>
                                                                <CachedIcon></CachedIcon>
                                                                {JSON.stringify(data[item].AwaySubDetails)
                                                                    .substring(1, JSON.stringify(data[item].AwaySubDetails).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                            </div>
                                                        }
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].HomeLineupGoalkeeper) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Goalkeeper</Typography>
                                                                {JSON.stringify(data[item].HomeLineupGoalkeeper)
                                                                    .substring(1, JSON.stringify(data[item].HomeLineupGoalkeeper).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].HomeLineupDefense) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Defence</Typography>
                                                                {JSON.stringify(data[item].HomeLineupDefense)
                                                                    .substring(1, JSON.stringify(data[item].HomeLineupDefense).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].HomeLineupMidfield) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Midfield</Typography>
                                                                {JSON.stringify(data[item].HomeLineupMidfield)
                                                                    .substring(1, JSON.stringify(data[item].HomeLineupMidfield).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].HomeLineupForward) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Forwards</Typography>
                                                                {JSON.stringify(data[item].HomeLineupForward)
                                                                    .substring(1, JSON.stringify(data[item].HomeLineupForward).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].HomeLineupSubstitutes) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Substitutes</Typography>
                                                                {JSON.stringify(data[item].HomeLineupSubstitutes)
                                                                    .substring(1, JSON.stringify(data[item].HomeLineupSubstitutes).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {JSON.stringify(data[item].AwayLineupGoalkeeper) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Goalkeeper</Typography>
                                                                {JSON.stringify(data[item].AwayLineupGoalkeeper)
                                                                    .substring(1, JSON.stringify(data[item].AwayLineupGoalkeeper).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].AwayLineupDefense) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Defence</Typography>
                                                                {JSON.stringify(data[item].AwayLineupDefense)
                                                                    .substring(1, JSON.stringify(data[item].AwayLineupDefense).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].AwayLineupMidfield) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Midfield</Typography>
                                                                {JSON.stringify(data[item].AwayLineupMidfield)
                                                                    .substring(1, JSON.stringify(data[item].AwayLineupMidfield).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].AwayLineupForward) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Forwards</Typography>
                                                                {JSON.stringify(data[item].AwayLineupForward)
                                                                    .substring(1, JSON.stringify(data[item].AwayLineupForward).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {JSON.stringify(data[item].AwayLineupSubstitutes) !== "{}" &&
                                                            <div>
                                                                <Typography variant="overline">Substitutes</Typography>
                                                                {JSON.stringify(data[item].AwayLineupSubstitutes)
                                                                    .substring(1, JSON.stringify(data[item].AwayLineupSubstitutes).length - 1)
                                                                    .split(";")
                                                                    .map((item, index) => (
                                                                        <Typography variant="subtitle2" key={index}>{item}</Typography>
                                                                    ))}
                                                                <br></br>
                                                            </div>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            : null}
                                    </Paper>
                                    <br></br><br></br>
                                </React.Fragment>
                                : null}
                        </div>
                    ))}
                </div> : <Typography>There are currently no matches being played</Typography>
            }
        </div>
    );
}

export default Livescores;