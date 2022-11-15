import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'nuka-carousel';
import slide0 from '../images/slider/slide0.jpg';
import slide1 from '../images/slider/slide1.jpg';
import slide2 from '../images/slider/slide2.jpg';
import slide3 from '../images/slider/slide3.jpg';
import slide4 from '../images/slider/slide4.jpg';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        zIndex: '-1',
        '& img':{
            width: '100%',
            height: '100%',
        },
    },
});

const ImageSlider = () => {
    const classes = useStyles();
    const backupImages = [slide0, slide1, slide2, slide3, slide4];
    const [imageFetched, setimageFetched] = React.useState(false);
    const [imageLinks, setImageLinks] = React.useState({ images: [] });
    const [error, setError] = React.useState({ failedToLoadImages: false });

    useEffect(() => {
        axios.get("https://swebapi.demo.datexis.com/api/karte/baeume/properties")
        .then(response => {
            setImageLinks({ images: response.data.data })
            setimageFetched(true)
        })
        .catch(() => {
            setError({ failedToLoadImages: true })
        })
    }, []);

    return <Carousel className={classes.root}
        adaptiveHeight
        autoplay
        initialSlideHeightautoplayInterval={5000}
        swiping
        withoutControls
        wrapAround
    >
        {!error.failedToLoadImages && !imageFetched ? imageLinks.images.map(image => {
            return <img src={image} alt="" key={image} />
            }) :
        backupImages.map(image => {
            return <img src={image} alt="" key={image} />
        })}
    </Carousel>
}

export default ImageSlider;
