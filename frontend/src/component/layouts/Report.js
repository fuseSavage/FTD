import React from 'react'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { Button } from 'react-bootstrap';
import Logout from './Logout';
import { IoCreateSharp } from 'react-icons/io5';
import { RiFileList3Fill } from 'react-icons/ri';

export default function Report() {

    return (
        <div>
            <Divider />
            <List>
                <ListItem>
                    <RiFileList3Fill size={20} /><strong> Report </strong>
                </ListItem>
                <ListItem button component="a" href="/flow">
                    <IoCreateSharp size={20} /> <a>Create Build Flow</a>
                </ListItem>
                <ListItem button component="a" href="/chengai">
                    <IoCreateSharp size={20} /> <a>Create Build Flow Chengai</a>
                </ListItem>
                <ListItem button component="a" href="/ro">
                    <IoCreateSharp size={20} /><a>Create Build Flow RO</a>
                </ListItem>
                <ListItem button component="a" href="/skybolt">
                    <IoCreateSharp size={20} /><a>Create Build Flow RO Skybolt</a>
                </ListItem>
            </List>
            <Divider />
            <Logout />
        </div>

    )
}