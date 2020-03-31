import React, { useEffect } from 'react';  
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'nuka-carousel';
import slide0 from '../images/slider/slide0.jpg'; 
import slide1 from '../images/slider/slide1.jpg'; 
import slide2 from '../images/slider/slide2.jpg'; 
import slide3 from '../images/slider/slide3.jpg'; 
import slide4 from '../images/slider/slide4.jpg'; 

const axios = require('axios');

const useStyles = makeStyles({
    root: {
        zIndex: '-1', 
    } 
}); 

const ImageSlider = (props) => {
    const classes = useStyles();
    const backupImages = [slide0, slide1, slide2, slide3, slide4]; 

    const [imageLinks, setImageLinks] = React.useState({
        images: [],
    });
    const [error, setError] = React.useState({
        failedToLoadImages: false,
    }); 

    useEffect(() => {
        axios.get("https://swebapi.demo.datexis.com/api/karte/baeume/properties")
        .then(response => {            
            setImageLinks({ images: response.data.data })
        })
        .catch(e => {
            setError({ failedToLoadImages: true })
        })              
    }, []); 

    return <Carousel className={classes.root} autoplay heightMode="current" initialSlideHeightautoplayInterval={5000} swiping withoutControls wrapAround> 
        { !error.failedToLoadImages ? imageLinks.images.map(image => {
            return <img src={image} alt="" key={image} />
            }) : 
        backupImages.map(image => {
            return <img src={image} alt="" key={image} />
        })}        
    </Carousel>
}

export default ImageSlider; 
