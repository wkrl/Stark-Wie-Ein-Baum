import React from 'react';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FruitTypeList = props => {
    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
        <Typography>{props.sorte}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            {props.beschreibung + "\n"}
            {props.geschmack}
        </Typography>
        </AccordionDetails>
    </Accordion>
}

export default FruitTypeList; 
