import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import FruitTypeList from '../components/FruitTypeList';
import useGlobal from "../store";
import  { Redirect } from 'react-router-dom';

const axios = require('axios');

const FruitTypes = () => {    
    const [fruitTypes, setFruitTypes] = useState([]);
    const [filteredFruitTypes, setFilteredFruitTypes] = useState([]);
    const [userSelection, setUserSelection] = useState({
        "frucht": {}, 
        "geschmackID": {}, 
        "tafelobst": false,        
    });
    const [, globalActions] = useGlobal();
    const [redirect, setRedirect] = useState(false);
    
    const handleCheck = (event, prefix) => {     
        if (prefix) {            
            let copy = {...userSelection};
            copy[prefix][event.target.name] = event.target.checked;
            setUserSelection(copy);
        } else {
            setUserSelection({...userSelection, [event.target.name]: event.target.checked});
        }                
    };

    const handleSlide = (value, name) => {
        setUserSelection({...userSelection, [name]: value});        
    }

    const binarySelectionFilter = (item, query) => {        
        return item[query] == userSelection[query] ? 1 : 0;
    }

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
        setRedirect(true);        
    }

	useEffect(() => {
        axios.get("https://swebapi.demo.datexis.com/api/karte/baeume")
            .then(response => setFruitTypes(response.data));
	}, []);

	return <React.Fragment>
		<NavBar isSticky />
        <FormGroup row>
            {/* Lieblingsfrucht / früchte */}
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
        <FormGroup row>
            {/* Lieblingsgeschmack / geschmäcker */}
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
        <FormGroup row>
            {/* Sofort essen */}
            <FormControlLabel
                control={<Checkbox checked={!!userSelection.tafelobst} onChange={e => handleCheck(e)} name="tafelobst" />}
                label="Tafelobst"
            />            
        </FormGroup>
        <FormGroup row>
            {/* Backen, Einwecken, Kochen */}
            <FormControlLabel
                control={<Checkbox checked disabled name="essen" />}
                label="Backen, Einwecken, Kochen"
            />            
        </FormGroup>
        <FormGroup row>
            {/* Saft, Wein, Brand */}
            <FormControlLabel
                control={<Checkbox checked disabled name="trinken" />}
                label="Saft, Wein, Obstler"
            />            
        </FormGroup>
        <FormGroup row>
            {/* So viele Monate möchte ich mein Obst lagern */}
            <Typography id="slider">
                Lagerfähigkeit in Monaten
            </Typography>
            <Slider
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
        <Button variant="outlined" onClick={filterFruitTypes}>Sorten finden</Button>
        {filteredFruitTypes.length > 0 && <div>
            <p>Das sind die Sorten, die zu Dir passen:</p>
            {filteredFruitTypes.map((fruitType, index) => <FruitTypeList key={index} {...fruitType} />)}
            <Button variant="outlined" onClick={redirectToMapWithFruitTypes}>Zur Karte</Button>
            {redirect && <Redirect to='/karte' />}
        </div>}
	</React.Fragment>
}

export default FruitTypes; 
