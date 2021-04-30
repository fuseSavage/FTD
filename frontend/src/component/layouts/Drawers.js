import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import logo from '../../assets/img/seagate-logo2.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Report from './Report';
import Login from './Login';

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
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },

    // necessary for content to be below app bar
}));

export default function Drawers(props) {
    const { datalist } = props;
    const classes = useStyles();
    // const theme = useTheme();

    let menu;
    if (datalist === '') {
        menu = (
            <Login />
        )
    } else {
        menu = (
            <Report />
        )

    }

    return (
        <div>
            <div className={classes.toolbar} />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <a href="https://www.seagate.com/as/en/" style={{ height: '60px' }}>
                    <img src={logo} alt="www.google.com" style={{ height: '65px' }} />
                </a>

                <Divider />
                {menu}
                <Divider />
            </Drawer>

        </div>
    )
}