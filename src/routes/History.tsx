import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DirectionsIcon from '@mui/icons-material/Directions';
import {Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { makeStyles, createStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    card: {
        borderRadius: 6,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 7px 0 rgba(0,0,0,0.04)',
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.primary.contrastText,
        // boxShadow: "none",
        marginBottom: 14,
    },
    pageHeading: {
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 14,
    },
    list: {
        marginLeft: 20,
        marginRight: 20,
    }
}));

export default function History() {

    const historyItems = [
        {
            url: "pastebin.com/123123123",
            date: new Date(),
            passkey: "magic"
        },
        {
            url: "pastebin.com/5454323",
            date: new Date(),
            passkey: "magic"

        },
        {
            url: "pastebin.com/345223123",
            date: new Date(),
            passkey: "magic"

        },
        {
            url: "pastebin.com/6543123",
            date: new Date(),
            passkey: "magic"
        },
    ]

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const classes = useStyles();
    return (
        <>
        {/*<p style={{textAlign: 'left'}}>History</p>*/}
            <Typography variant='h2' className={classes.pageHeading}>History</Typography>
            <List sx={{ width: '100%', maxWidth: 360 }}>
            {historyItems.map((item) => {
                return (

            <ListItem key={item.url}>
                <Button variant="outlined" style={{margin: "6px", textAlign: 'left'}}>
                <ListItemText primary={item.url} secondary={item.date.toLocaleString('en-US')} />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                  <ChevronRight />
                </IconButton>
                </Button>
            </ListItem>
            )
            })}
        </List>
        </>
    );
}

