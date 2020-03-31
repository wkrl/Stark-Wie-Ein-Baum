import React, { useEffect } from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green, red } from '@material-ui/core/colors';
import useGlobal from "../store";

const useStyles = makeStyles( theme => ({
    success: {
        backgroundColor: green[600],
      },
      error: {
        backgroundColor: red[700],
      },
      requestError: {
        backgroundColor: red[700],
      },
      mapError: {
        backgroundColor: red[700],
      },
      warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
        paddingRight: "10px",
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
}))

const Message = (props) => {
    const classes = useStyles(); 
    const [open, setOpen] = React.useState(false);
    
    const variantText = {
        "success": "Nachricht gesendet!",
        "warning": "Bitte Angaben überprüfen!",
        "error": "Ein Fehler ist aufgetreten.",
        "requestError": "Zu viele Requests!",
        "mapError": "Karte konnte nicht geladen werden!"
    }

    const variantIcon = {
        "success": CheckCircleIcon,
        "warning": WarningIcon,
        "error": ErrorIcon,
        "requestError": ErrorIcon,
        "mapError": ErrorIcon,
    };

    const Icon = variantIcon[props.value];

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };


    return  <div>
        <Snackbar
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}>
            <SnackbarContent 
                className={classes[props.value]}
                message={<span id="message-id" className={classes.message}>
                        <Icon className={classes.icon} />
                        {variantText[props.value]}
                    </span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
            />                
        </Snackbar>
    </div>
}

export default Message;