import React, { useState, useEffect, useRef } from 'react';
import useGlobal from '../store';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import NavBar from '../components/NavBar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import FruitTypeList from '../components/FruitTypeList';

const axios = require('axios');

const useStyles = makeStyles(theme => ({
	desktopRoot: {        
		backgroundColor: theme.background,
		minHeight: '100vh',
        padding: '5vh 10vw 5vh 10vw',
        overflow: 'auto',
        '& > *': {
            marginBottom: '12px',
        }
	},
	mobileRoot: {
		backgroundColor: theme.background,
		minHeight: '100vh',
        padding: '25px 15px 15px 15px',
        overflow: 'auto',
        '& > *': {
            marginBottom: '12px',
        }
    },
    mobileButton: {
        margin: '6px', 
        display: 'block', 
        width: '100%'
    },
    desktopButton: {  
        margin: '0 0 12px 6px',
    },
}));

const FruitTypes = () => {    
    const history = useHistory();
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:426px)');
    const scrollRef = useRef(null);
    
    const [fruitTypes, setFruitTypes] = useState([]);
    const [filteredFruitTypes, setFilteredFruitTypes] = useState([]);
    const [userSelection, setUserSelection] = useState({
        "frucht": {}, 
        "geschmackID": {}, 
        "tafelobst": true,        
    });
    const [, globalActions] = useGlobal();
    
    const handleCheck = (event, prefix) => {     
        if (prefix) {            
            let copy = {...userSelection};
            copy[prefix][event.target.name] = event.target.checked;
            setUserSelection(copy);
        } else {
            setUserSelection({...userSelection, [event.target.name]: event.target.checked});
        }                
    };

    const handleSlide = (value, name) => setUserSelection({...userSelection, [name]: value});        

    const binarySelectionFilter = (item, query) => { return item[query] == !!userSelection[query] };

    const valueSelectionFilter = (item, query) => {
        if (!userSelection[query]) return true; // If value 0 or key undefined don't filter
        return item[query] == userSelection[query];        
    }

    const multipleSelectionFilter = (item, query) => {
        let options = [];
        for (const [key, value] of Object.entries(userSelection[query])) if (value) options.push(key);        
        for (let option of options) if (item[query] == option) return true;
    }

    const filterFruitTypes = () => {    
        const filteredTypes = fruitTypes
            .filter(item => { return multipleSelectionFilter(item, "frucht") })
            .filter(item => { return multipleSelectionFilter(item, "geschmackID") })
            .filter(item => { return binarySelectionFilter(item, "tafelobst") })
            .filter(item => { return valueSelectionFilter(item, "lagerfaehigkeit") });
        setFilteredFruitTypes(filteredTypes);           
    }

    const redirectToMapWithFruitTypes = () => {
        let ids = [];
        for (let fruitType of filteredFruitTypes) ids.push(fruitType.id);      
        globalActions.updateState("fruitTypeIds", ids);
        history.push("/karte"); 
    }

	useEffect(() => {
        if (!fruitTypes.length) axios.get("https://swebapi.demo.datexis.com/api/karte/baeume").then(response => setFruitTypes(response.data));
        if (filteredFruitTypes.length > 0) scrollRef.current.scrollIntoView({ behavior: "smooth" });
	}, [filteredFruitTypes]);

	return <React.Fragment>
		<NavBar isSticky />
        <div className={isDesktop ? classes.desktopRoot : classes.mobileRoot}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Lieblingssorte</Typography>
                    <Typography variant="body1">
                        Für <i>Stark wie ein Baum!</i> wurden 42 verschiedene, alte Obstbaumsorten gepflanzt. Viele diese Sorten sind heute vom Aussterben bedroht und man kennt sie nicht mehr. <Link style={{ color: "#ffa436" }} onClick={() => history.push("/sortenliste")}>Hier findet Ihr die komplette Liste</Link>. Um Euch die Auswahl zu erleichtern gibt es unseren Sortenfinder. Hier wählt Ihr einfach Eure Lieblings-Geschmacksrichtung aus und gebt an, wie Ihr die Früchte verwenden möchtet. Der Sortenfinder macht Euch dann Vorschläge. Wenn Ihr dann auf die Sortennamen klickt, erfahrt Ihr mehr über die vorgeschlagenen Sorten.
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Sortenfinder</Typography>                    
                    <Typography variant="body1" style={{paddingTop: '4px'}} gutterBottom>Lieblingsfrucht / früchte:</Typography>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.frucht.Apfel} onChange={e => handleCheck(e, "frucht")} name="Apfel" />}
                            label="Apfel"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.frucht.Pflaume} onChange={e => handleCheck(e, "frucht")} name="Pflaume" />}
                            label="Pflaume"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.frucht.Quitte} onChange={e => handleCheck(e, "frucht")} name="Quitte" />}
                            label="Quitte"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.frucht.Birne} onChange={e => handleCheck(e, "frucht")} name="Birne" />}
                            label="Birne"
                        />
                    </FormGroup>
                </CardContent>
                <CardContent>
                    <Typography variant="body1" gutterBottom>Lieblingsgeschmack / geschmäcker:</Typography>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.geschmackID["1"]} onChange={e => handleCheck(e, "geschmackID")} name="1" />}
                            label="säuerlich-aromatisch"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.geschmackID["2"]} onChange={e => handleCheck(e, "geschmackID")} name="2" />}
                            label="kräftig-würzig"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.geschmackID["3"]} onChange={e => handleCheck(e, "geschmackID")} name="3" />}
                            label="mild bis süßlich"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.geschmackID["4"]} onChange={e => handleCheck(e, "geschmackID")} name="4" />}
                            label="süß-säuerlich"
                        />
                    </FormGroup>                    
                </CardContent>
                <CardContent>
                    <Typography variant="body1" gutterBottom>Das möchte ich vor allem mit meinem Obst machen:</Typography>
                    <FormGroup row>                        
                        <FormControlLabel
                            control={<Checkbox checked={!!userSelection.tafelobst} onChange={e => handleCheck(e)} name="tafelobst" />}
                            label="Frisch essen"
                        />
                        <FormControlLabel
                            control={<Checkbox checked disabled name="essen" />}
                            label="Backen, Einwecken, Kochen"
                        />
                        <FormControlLabel
                            control={<Checkbox checked disabled name="trinken" />}
                            label="Saft, Wein, Obstler"                            
                        />
                    </FormGroup>                    
                </CardContent>
                <CardContent>
                    <FormGroup row>
                        <Typography id="slider">
                            Lagerfähigkeit in Monaten
                        </Typography>
                        <Slider
                            style={{width: '94%', margin: 'auto'}}
                            defaultValue={0}
                            getAriaValueText={text => { return text }}
                            aria-labelledby="slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={15}
                            onChange={(_, value) => handleSlide(value, "lagerfaehigkeit")}
                        />
                    </FormGroup>
                </CardContent>
                <CardActions>                
                    <Button className={isDesktop ? classes.desktopButton : classes.mobileButton} variant="outlined" onClick={filterFruitTypes}>Sorten finden</Button>                    
                </CardActions>
            </Card>                              
            {filteredFruitTypes.length > 0 && <div ref={scrollRef}>
                {filteredFruitTypes.map((fruitType, index) => <FruitTypeList key={index} {...fruitType} />)}
                <div style={{display: 'block'}}>
                    <Button style={{marginTop: '12px', float: 'right', color: 'white', backgroundColor: 'rgb(236, 108, 63)'}} variant="contained" onClick={redirectToMapWithFruitTypes}>Zur Karte</Button>
                </div>
            </div>}                     
        </div>
	</React.Fragment>
}

export default FruitTypes; 
