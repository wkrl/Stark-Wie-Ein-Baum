import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import NavBar from '../components/NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FruitTypeList from '../components/FruitTypeList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
	desktopRoot: {
		backgroundColor: theme.background,
		minHeight: '100vh',
		padding: '5vh 10vw 5vh 10vw',
		'& > *': {
            marginBottom: '12px',
        }
	},
	mobileRoot: {
		backgroundColor: theme.background,
		minHeight: '100vh',
		padding: '25px 15px 15px 15px',
		'& > *': {
            marginBottom: '12px',
        }
	},
	inputContainer: {
		display: 'block',
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

	const [selectedFruit, setSelectedFruit] = useState({value: ''});
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
				const {frucht, sorte} = type;
				let copy = {...fruitData};
				copy[frucht].push({[sorte]: type})
				setFruitData(copy);
			})
		})
		.then(() => sortFruitData());
	}, []);

	return <React.Fragment>
		<NavBar isSticky />
		<div className={isDesktop ? classes.desktopRoot : classes.mobileRoot}>
			<Card>
				<CardContent>
					<Typography variant="h6" style={{paddingBottom: '14px'}}>Sortenliste</Typography>
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
				</CardContent>
			</Card>
			<div>
				{selectedFruit.value && fruitData[selectedFruit.value].map(type => {
					const fruitType = {...type[Object.keys(type)[0]], sorte: Object.keys(type)[0]}
					return <FruitTypeList key={fruitType.sorte} {...fruitType} />
				})}
			</div>
		</div>
	</React.Fragment>
}

export default FruitTypes; 
