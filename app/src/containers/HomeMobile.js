import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Link, Button } from '@material-ui/core';
import ImageSlider from '../components/ImageSlider'; 
import SectionBackground from '../images/home/mobile/section_background.png'; 
import Spende from '../images/home/mobile/spende.png'; 
import Logo from '../images/logo.png'; 
import LogoStiftung from '../images/logo_stiftung.jpg'; 
import LogoCaritas from '../images/logo_caritas.jpg'; 
import LogoBeuth from '../images/logo_beuth_mobile.png';

const useStyles = makeStyles(theme => ({  
    textSection: {
        padding: '15px',  
        background: theme.background, 
    },       
    mapSection: {
        padding: '15px', 
        textAlign: 'center', 
        background: `url(${SectionBackground}) no-repeat`, 
        backgroundSize: 'cover', 
    }, 
    tree: {
        width: '100%', 
        height: 'auto',  
        objectFit: 'contain', 
    },
    logoSection: {
        padding: '15px',  
        textAlign: 'center', 
        background: theme.background, 
    },
    logo: {
        width: '100%',
        maxWidth: '160px', 
        height: 'auto',
        objectFit: 'contain', 
        padding: '12px 0',
    },   
    footer: {
        padding: '5px 0 5px 0',
        textAlign: 'center', 
        background: 'rgb(139, 181, 142)', 
    }
})); 

const HomeMobile = () => {
    const classes = useStyles();

    return <React.Fragment>
            <ImageSlider />
            <Grid container className={classes.textSection}>
                <Grid item xs={12}>
                    <Typography variant="body1" color="primary">Als Baumpate doppelt Gutes tun!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="secondary" gutterBottom>
                        Helfen Sie Familien mit einem schwer erkrankten Kind oder Jugendlichen. Unterstützen Sie gleichzeitig ein wichtiges Naturschutzprojekt.
                    </Typography> 
                    <Button variant="contained" size="small" component={NavLink} to={() => "/anfrage"} style={{float: 'right', color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Pate werden</Button>
                </Grid>                                
            </Grid>            
            <Grid container className={classes.mapSection}>
                <Grid item xs={3}>
                    <img className={classes.tree} src={Logo} alt="'Stark wie ein Baum' Logo" />
                </Grid>
                <Grid item container xs={9} spacing={1}>     
                    <Grid item>
                        <Typography variant="body1" color="primary">
                            531 Bäume für den guten Zweck
                        </Typography>
                        <Typography variant="body2" color="secondary" gutterBottom>
                            Entdecke auf der Karte die unterschiedlichen Bäume der Sorten Apfel, Birne, Pflaume und Quitte.
                        </Typography>
                        <Button variant="contained" size="small" style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}} component={NavLink} to={() => "/karte"}>Zu den Bäumen</Button>
                    </Grid>               
                </Grid>
            </Grid>  
            <Grid container className={classes.textSection}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="secondary">
                        „Stark wie ein Baum!" ist ein Gemeinschaftsprojekt des Caritas-Kinderhospizdienstes und der Stiftung Hof Grüneberg.
                    </Typography>
                </Grid>                                  
                <Grid item xs={12} style={{padding: '15px'}}>
                    <img src={Spende} style={{width: '100%', height: 'auto', borderRadius: '6px', border: '6px solid white'}} alt="Spendenübersicht" />
                </Grid>
                <Grid item xs={12} style={{'textAlign': 'center'}}>
                    <Link href="https://www.stark-wie-ein-Baum.de">
                        <Button variant="contained" size="small" style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Mehr Infos</Button>
                    </Link>
                </Grid>
            </Grid>  
            <Grid container className={classes.logoSection}>                    
                <Grid item xs={12}>
                    <Link href="https://www.hof-grueneberg.de/">
                        <img className={classes.logo} src={LogoStiftung} alt="Stiftung Logo" />                  
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link href="https://www.caritas-berlin.de/beratungundhilfe/berlin/hospizdienste/kinderhospiz-und-familienbesuchsdienst">
                        <img className={classes.logo} src={LogoCaritas} alt="Caritas Logo" />
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link href="">
                        <img className={classes.logo} src={LogoBeuth} alt="Beuth-Hochschule für Technik Logo" />
                    </Link>
                </Grid>
            </Grid>  
            <Grid container className={classes.footer}>
                <Grid item xs={12}>
                    <Typography variant="caption" color="secondary">
                        <span><Link href="https://www.hof-grueneberg.de/kontakt/kontaktformular/#c1613">Impressum</Link> | <Link href="http://admin.stark-wie-ein-baum.de/">Admin</Link></span>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
}

export default HomeMobile;

