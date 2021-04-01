import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import NavBar from '../components/NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const axios = require('axios');

const useStyles = makeStyles(theme => ({
	desktopRoot: {
		backgroundColor: theme.background,
		minHeight: '100vh',
		padding: '5vh 10vw 5vh 10vw',
	},
	mobileRoot: {
		backgroundColor: theme.background,
		minHeight: '100vh',
		padding: '25px 15px 15px 15px',
	},
	inputContainer: {
		display: 'block',
		paddingBottom: '15px',
	},	
	inputLabel: { 
		marginTop: '-4px',
		paddingLeft: '18px',		
	}, 
	input: {
		width: '100%',		
	},		
}));

const FruitTypes = () => {	
	const classes = useStyles();
	const isDesktop = useMediaQuery('(min-width:426px)'); 

	const [selectedFruit, setSelectedFruit] = useState({value: null});
	const [fruitData, setFruitData] = useState({"Apfel": [], "Birne": [], "Quitte": [], "Pflaume": []});

	const compareFruitTypes = (a, b) => {
		if (Object.keys(a)[0] < Object.keys(b)[0]) return -1;		
		if (Object.keys(a)[0] > Object.keys(b)[0]) return 1;
		return 0;
	}

	const sortFruitData = () => {
		Object.keys(fruitData).forEach(fruit => fruitData[fruit].sort(compareFruitTypes));		
	}

	useEffect(() => {
		axios.get("https://swebapi.demo.datexis.com/api/karte/baeume")		
		.then(response => {
			response.data.forEach(type => {
				const {sorte, beschreibung, geschmack, frucht} = type;
				let copy = {...fruitData};
				copy[frucht].push({[sorte]: { beschreibung, geschmack }})
				setFruitData(copy);
			})
		})
		.then(() => sortFruitData());
	}, []);

	return <React.Fragment>
		<NavBar isSticky />
		<div className={isDesktop ? classes.desktopRoot : classes.mobileRoot}>
			<FormControl className={classes.inputContainer}>				
				<InputLabel className={classes.inputLabel} id="demo-simple-select-outlined-label">Frucht</InputLabel>
				<Select
					className={classes.input}
					label="Frucht"
					variant="outlined"
					labelId="select-helper-label"
					id="select-helper"
					onChange={(event) => setSelectedFruit({value: event.target.value})}
				>
					{Object.keys(fruitData).map((fruit, i) => <MenuItem key={i} value={fruit}>{fruit}</MenuItem>)}
				</Select>
				<FormHelperText>Wähle eine Frucht aus, um Sorten zu sehen.</FormHelperText>				
			</FormControl>
			{selectedFruit.value && fruitData[selectedFruit.value].map(type => <Accordion>
				<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				>
				<Typography>{Object.keys(type)[0]}</Typography>
				</AccordionSummary>
				<AccordionDetails>
				<Typography>
					{type[Object.keys(type)[0]].beschreibung + "\n"}
					{type[Object.keys(type)[0]].geschmack}
				</Typography>
				</AccordionDetails>
			</Accordion>
			)}
		</div>
	</React.Fragment>
}

export default FruitTypes; 
