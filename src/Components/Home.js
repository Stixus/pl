import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
    '&:active': {
      color: 'black',
    },
    '&:visited': {
      color: 'black',
    },
  },
}));

function Home() {
  const classes = useStyles();

  const [data, setData] = useState({ hits: [] });
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4328',
      );
      setData(result.data.leagues);
    };
    fetchData();
  }, []);

  return (
    <div>
      {Object.keys(data).map((item, index) => (
        <React.Fragment key={index}>
          <Carousel controls={false} interval='4000'>
            <Carousel.Item>
              <a href="/table">
                <Image src={data[item].strFanart1} fluid></Image>
                <Carousel.Caption>
                  <h3>League Table</h3>
                </Carousel.Caption>
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href="/livescores">
                <Image src={data[item].strFanart2} fluid></Image>
                <Carousel.Caption>
                  <h3>Livescores</h3>
                </Carousel.Caption>
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href="/livescores">
                <Image src={data[item].strFanart3} fluid></Image>
                <Carousel.Caption>
                  <h3>Fixtures</h3>
                </Carousel.Caption>
              </a>
            </Carousel.Item>
          </Carousel>
          <br></br><br></br>
          <Grid container spacing={3}>
            <Grid item xs={4} component='a' href={'http://' + data[item].strFacebook} className={classes.mediaLink}>
              <FacebookIcon fontSize='large' />
              <Typography>Facebook</Typography>
            </Grid>
            <Grid item xs={4} component='a' href={'http://' + data[item].strInstagram} className={classes.mediaLink}>
              <InstagramIcon fontSize='large' />
              <Typography>Instagram</Typography>
            </Grid>
            <Grid item xs={4} component='a' href={'http://' + data[item].strTwitter} className={classes.mediaLink}>
              <TwitterIcon fontSize='large' />
              <Typography>Twitter</Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Home;