import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
	fruitLabel: {        
        color: 'gray',
        paddingLeft: '12px',
    },	  
}));

const FruitTypeList = props => {
    const classes = useStyles();
    const [moreInfo, setMoreInfo] = useState(false);

    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Grid container>                
                <Typography>{props.sorte}</Typography>
                <Typography variant="body1" className={classes.fruitLabel}>{props.frucht}</Typography>
            </Grid>                                    
        </AccordionSummary>
        <AccordionDetails>
            <Typography variant="body1">{props.geschmack}</Typography>
        </AccordionDetails>
        {!moreInfo && <AccordionDetails>
            <Button onClick={() => setMoreInfo(!moreInfo)}>Mehr Infos</Button>        
        </AccordionDetails>}
        {moreInfo && <div>           
            <AccordionDetails>        
                <Grid item xs={5} lg={2}>
                    <Typography variant="body1">Verwendung</Typography>            
                </Grid>    
                <Grid item xs={7} lg={10}>
                    <Typography variant="body2">{props.verwendung}</Typography>
                </Grid>                                  
            </AccordionDetails>
            <AccordionDetails>        
                <Grid item xs={5} lg={2}>                    
                    <Typography variant="body1">Früchte und Baumwuchs</Typography>            
                </Grid>    
                <Grid item xs={7} lg={10}>
                    <Typography variant="body2">{props.beschreibung} {props.groesse}</Typography>
                </Grid>                                  
            </AccordionDetails>
            <AccordionDetails>        
                <Grid item xs={5} lg={2}>                 
                    <Typography variant="body1">Reifezeit und Lagerfähigkeit</Typography>            
                </Grid>    
                <Grid item xs={7} lg={10}>
                    <Typography variant="body2">{props.reifezeit} Die Lagerzeit beträgt {props.lagerfaehigkeit} {props.lagerfaehigkeit > 1 ? "Monate" : props.lagerfaehigkeit === 0 ? "weniger als einen Monat" : "Monat"}.</Typography>
                </Grid>                                  
            </AccordionDetails>
            <AccordionDetails>        
                <Grid item xs={5} lg={2}>
                    <Typography variant="body1">Andere Namen</Typography>            
                </Grid>    
                <Grid item xs={7} lg={10}>
                    <Typography variant="body2">{props.andereNamen}</Typography>
                </Grid>                                  
            </AccordionDetails>
            <AccordionDetails>        
                <Grid item xs={5} lg={2}>
                    <Typography variant="body1">Herkunft</Typography>            
                </Grid>    
                <Grid item xs={7} lg={10}>
                    <Typography variant="body2">{props.herkunft}</Typography>
                </Grid>                                  
            </AccordionDetails>        
            <AccordionDetails>        
                <Grid item xs={5} lg={2}>
                    <Typography variant="body1">Verbreitung</Typography>            
                </Grid>    
                <Grid item xs={7} lg={10}>
                    <Typography variant="body2">{props.verbreitung}</Typography>
                </Grid>                                  
            </AccordionDetails>                
            <AccordionDetails>
                <Button onClick={() => setMoreInfo(!moreInfo)}>Weniger Infos</Button>        
            </AccordionDetails>
        </div>}   
    </Accordion>
}

export default FruitTypeList; 
