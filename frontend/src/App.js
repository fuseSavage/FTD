import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawers from './component/layouts/Drawers';
// import Main from './component/pages/Main';
import Home from './component/pages/Home';
import Footer from './component/layouts/Footer';
import { AppBar, IconButton, Toolbar, Typography, Drawer, Hidden } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { BiMenu } from 'react-icons/bi'
import CssBaseline from '@material-ui/core/CssBaseline';
import RDH_RO from './component/pages/RDH_RO';
import Flow_RDH_RO from './component/pages/Flow_RDH_RO';
import RDH_SDET from './component/pages/RDH_SDET';
import RDH_HGA from './component/pages/RDH_HGA';
import AMA_SDET from './component/pages/AMA_SDET';
import AMA_HGA from './component/pages/AMA_HGA';
import AMA_L_Slider from './component/pages/AMA_L_Slider';
import L_Slider_SDET from './component/pages/L_Slider_SDET';
import L_Slider_HGA from './component/pages/L_Slider_HGA';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 3,

    },
  },
  appBar: {
    backgroundColor: '#303f9f',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: '#303f9f'
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

function App(props) {
  
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [datalist, setDataList] = useState('');
  // const [status, setStatus] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:3001/user`, {
          headers: { 'content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json()
        // console.log(content.message)
        if (!content.message) {
          setDataList(content[0].name)
          // console.log(datalist)
        }
      }
    )();
  });

  const container = window !== undefined ? () => window().document.body : undefined;

return (
  <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <BiMenu />
          </IconButton>
          <Button variant="default" href="/home">
            <Typography variant="h6" style={{ color: 'white' }}>
              RHT Automated Buildflow
              </Typography>
          </Button>
        </Toolbar>
      </AppBar>


      <nav className={classes.drawer} aria-label="mailbox folders">
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
            <Drawers datalist={datalist} />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Drawers datalist={datalist} />
          </Drawer>
        </Hidden>
      </nav>
      {/* <Login /> */}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/home' exact component={() => <Home datalist={datalist} />}></Route>
          <Route path='/rdhro' exact component={() => <RDH_RO datalist={datalist} />}></Route>
          <Route path='/rdhsdet' exact component={() => <RDH_SDET datalist={datalist} />}></Route>
          <Route path='/rdhhga' exact component={() => <RDH_HGA datalist={datalist} />}></Route>
          <Route path='/amasdet' exact component={() => <AMA_SDET datalist={datalist} />}></Route>
          <Route path='/amahga' exact component={() => <AMA_HGA datalist={datalist} />}></Route>
          <Route path='/amasld' exact component={() => <AMA_L_Slider datalist={datalist} />}></Route>
          <Route path='/sldsdet' exact component={() => <L_Slider_SDET datalist={datalist} />}></Route>
          <Route path='/sldhga' exact component={() => <L_Slider_HGA datalist={datalist} />}></Route>

          <Route path='/flowro' exact component={() => <Flow_RDH_RO />}></Route>
        </Switch>
        <Footer />
      </main>
    </div>
    
  </Router>
);
}

export default App;
