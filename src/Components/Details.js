import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Image from 'react-bootstrap/Image';
import Grid from '@material-ui/core/Grid';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    mediaLink: {
      '&:link': {
        textDecoration: 'none',
        color: 'black',
      },
      '&:hover': {
        color: '#37003c',
      },
    },
  }));

function Details(props) {
    const [data, setData] = useState({ hits: [] });
    const param = props.match.params.id;
    const classes = useStyles();
    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://www.thesportsdb.com/api/v1/json/4013017/lookupteam.php?id=' + param,
            );
            setData(result.data.teams);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {Object.keys(data).map((item, index) => (
                <React.Fragment key={index}>
                    <Image src={data[item].strTeamBanner} fluid />
                    <br></br><br></br>
                    <Typography variant="h3" noWrap >{data[item].strTeam}</Typography>
                    {data[item].strAlternate && <Typography variant="h6" noWrap >"{data[item].strAlternate}"</Typography> }
                    <br></br>
                    <Typography paragraph>{data[item].strDescriptionEN}</Typography>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                                <Image src={data[item].strTeamJersey} fluid />
                        </Grid>
                        <Grid item xs={6}>
                                <Image src={data[item].strTeamBadge} fluid />
                        </Grid>
                    </Grid>
                    <br></br><br></br>
                    <Typography variant="h4" noWrap >Stadium</Typography>
                    <Typography variant="h6" noWrap >{data[item].strStadium}</Typography>
                    <br></br>
                    <Image src={data[item].strStadiumThumb} fluid />
                    <Typography>Capacity: {data[item].intStadiumCapacity}</Typography>
                    <Typography>Location: {data[item].strStadiumLocation}</Typography>
                    <br></br>
                    <Typography paragraph>{data[item].strStadiumDescription}</Typography>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item xs={4} component='a' href={'http://' + data[item].strFacebook} className={classes.mediaLink}>
                                <FacebookIcon fontSize='large'/>
                                <Typography>Facebook</Typography>
                        </Grid>
                        <Grid item xs={4} component='a' href={'http://' + data[item].strInstagram} className={classes.mediaLink}>
                            <InstagramIcon fontSize='large'/>
                            <Typography>Instagram</Typography>
                        </Grid>
                        <Grid item xs={4} component='a' href={'http://' + data[item].strTwitter} className={classes.mediaLink}>
                            <TwitterIcon fontSize='large'/>
                            <Typography>Twitter</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ))}
        </div>
    );
}

export default Details;