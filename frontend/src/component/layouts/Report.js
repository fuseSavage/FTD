import React from 'react'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { Button } from 'react-bootstrap';
import Logout from './Logout';
import { IoCreateSharp } from 'react-icons/io5';
import { RiFileList3Fill, RiFileHistoryFill } from 'react-icons/ri';
import { BiHistory } from 'react-icons/bi';

export default function Report() {

    return (
        <div>
            <Divider />
            <List>
                <ListItem>
                    <RiFileList3Fill size={20} /><strong> Create Build Flow </strong>
                </ListItem>
                <ListItem button component="a" href="/flow">
                    <IoCreateSharp size={20} /> <a>RDH RO</a>
                </ListItem>
                <ListItem button component="a" href="/chengai">
                    <IoCreateSharp size={20} /> <a>RDH SDET Full Build</a>
                </ListItem>
                <ListItem button component="a" href="/ro">
                    <IoCreateSharp size={20} /><a>RDH HGA Full Build</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <IoCreateSharp size={20} /><a>AMA L-Slider-SDET</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <IoCreateSharp size={20} /><a>AMA L-Slider-HGA (no SDET)</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <IoCreateSharp size={20} /><a>AMA SDET</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <IoCreateSharp size={20} /><a>AMA HGA</a>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <RiFileHistoryFill size={20} /><strong> History </strong>
                </ListItem>
                <ListItem button component="a" href="/dataflow">
                    <BiHistory size={20} /> <a>Build Flow</a>
                </ListItem>
                <ListItem button component="a" href="/chengai">
                    <BiHistory size={20} /> <a>Build Flow Chengai</a>
                </ListItem>
                <ListItem button component="a" href="/ro">
                    <BiHistory size={20} /><a>Build Flow RO</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <BiHistory size={20} /><a>Build Flow RO Skybolt</a>
                </ListItem>
            </List>
            <Divider />
            <Logout />
        </div>

    )
}