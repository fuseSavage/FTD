import React from 'react'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { Button } from 'react-bootstrap';
import Logout from './Logout';
import { IoCreateSharp } from 'react-icons/io5';
import { RiFileList3Fill, RiFileHistoryFill } from 'react-icons/ri';
import { BiHistory } from 'react-icons/bi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Report() {

    return (
        <div>
            <Divider />
            <List>
                <ListItem>
                    <RiFileList3Fill size={20} /><strong style={{ fontSize: '18px' }}> Create Build Flow </strong>
                </ListItem>
                <ListItem button component="a" href="/rdhro">
                    <IoCreateSharp size={17} /> <a style={{ fontSize: '14px' }}>RDH RO</a>
                </ListItem>
                <ListItem button component="a" href="/rdhsdet">
                    <IoCreateSharp size={17} /> <a style={{ fontSize: '14px' }}>RDH SDET Full Build</a>
                </ListItem>
                <ListItem button component="a" href="/rdhhga">
                    <IoCreateSharp size={17} /><a style={{ fontSize: '14px' }}>RDH HGA Full Build</a>
                </ListItem>
                <ListItem button component="a" href="/amasld">
                    <IoCreateSharp size={17} /><a style={{ fontSize: '14px' }}>AMA L-Slider</a>
                </ListItem>
                <ListItem button component="a" href="/amasdet">
                    <IoCreateSharp size={17} /><a style={{ fontSize: '14px' }}>AMA SDET</a>
                </ListItem>
                <ListItem button component="a" href="/amahga">
                    <IoCreateSharp size={17} /><a style={{ fontSize: '14px' }}>AMA HGA</a>
                </ListItem>
                <ListItem button component="a" href="/sldsdet">
                    <IoCreateSharp size={17} /><a style={{ fontSize: '14px' }}>AMA L-Slider-SDET</a>
                </ListItem>
                <ListItem button component="a" href="/sldhga">
                    <IoCreateSharp size={17} /><a style={{ fontSize: '14px' }}>AMA L-Slider-HGA (no SDET)</a>
                </ListItem>

            </List>
            <Divider />
            <List>
                <ListItem>
                    <RiFileHistoryFill size={20} /><strong> Configurations </strong>
                </ListItem>
                <ListItem button component="a" href="/addimg">
                    <BiHistory size={20} /> <a>Add Image Flow</a>
                </ListItem>
                <ListItem button component="a" href="/chengai">
                    <BiHistory size={20} /> <a>Alert Mail Setting</a>
                </ListItem>
                <ListItem button component="a" href="/set-sw-fw">
                    <BiHistory size={20} /><a>SW/FW Setting</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <BiHistory size={20} /><a>User Manager</a>
                </ListItem>
            </List>
            <Divider />
            <div className='ml-2 mr-2 mt-2 mb-2'>
                <Calendar />
            </div>
            <Divider />
            <Logout />
        </div>

    )
}