import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routing from './Routing';
import Image from 'react-bootstrap/Image';
import Logo from '../Images/logo.png';

//icons
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import InfoIcon from '@material-ui/icons/Info';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import BugReportIcon from '@material-ui/icons/BugReport';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('xs')]: {
      backgroundColor: '#37003c',
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: '#37003c',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#02894e',
    color: 'white',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: 'white',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#37003c'
    },
    '&:visited': {
      textDecoration: 'none',
      color: 'white',
    },
    '&:link': {
      textDecoration: 'none',
      color: 'white',
    },
    '&:active': {
      textDecoration: 'none',
      color: 'white',
    },
  },
  logo: {
    marginTop: '-25%',
    marginBottom: '3%',
  },
}));

function Menu(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <Image className={classes.logo} src={Logo} fluid></Image>
      <Divider />
      <List>
        <ListItem className={classes.listItem} button component='a' href='/'>
          <ListItemIcon><HomeIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem className={classes.listItem} button component='a' href='/livescores'>
          <ListItemIcon><SportsSoccerIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='Livescores' />
        </ListItem>
        <ListItem className={classes.listItem} button component='a' href='/table'>
          <ListItemIcon><FormatListNumberedIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='League Table' />
        </ListItem>
        <ListItem className={classes.listItem} button component='a' href='/teams'>
          <ListItemIcon><GroupIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='Squad' />
        </ListItem>
        <ListItem className={classes.listItem} button component='a' href='/fixtures'>
          <ListItemIcon><EventIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='Fixtures' />
        </ListItem>
        <ListItem className={classes.listItem} button component='a' href='/teamsinfo'>
          <ListItemIcon><InfoIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='Team Info' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className={classes.listItem} button component='a' href='/issue'>
          <ListItemIcon><BugReportIcon className={classes.icon} /></ListItemIcon>
          <ListItemText primary='Report issues' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline></CssBaseline>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Powered by thesportsdb.com
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routing></Routing>
      </main>
    </div>
  );
}

Menu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default Menu;