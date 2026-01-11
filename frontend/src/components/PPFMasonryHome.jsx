import React from 'react';
import DoorJamb from '../assets/images/details/model-s.jpg';
import SteamClean from '../assets/images/details/steam-clean.jpg';
import BMW760i from '../assets/images/details/bmw-760i.jpg';
import TeslaRear from '../assets/images/details/tesla-rear.jpg';
import OnyxCoating from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import Tesla from '../assets/images/details/tesla-paint-correction.jpg';
import TeslaSteeringWheel from '../assets/images/details/tesla-steering-wheel.jpg';
import Tesla3Interior from '../assets/images/details/tesla-model-3-interior.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
import BMWDashboard from '../assets/images/details/bmw-dashboard.jpg';
import BMWSteeringWheel from '../assets/images/details/bmw-steering-wheel.jpg';
import BMWDoorJamb from '../assets/images/details/bmw-door-jamb.jpg';
import BackSeat from '../assets/images/details/bmw-back-seats.jpg';
import OPCPestServices from '../assets/images/details/opc-pest.jpg';
import DefenderInterior from '../assets/images/details/land-rover-defender-interior.jpg';
import GraphenePro from '../assets/images/details/graphene-pro.jpg';
import { Container, Title, Text, Button, createStyles } from '@mantine/core';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import PorscheGreen from '../assets/images/ppf/green-ppf.jpg'
// import GlossyCarbon from '../assets/images/ppf/glossy-carbon.jpeg'
import Corvette from '../assets/images/ppf/dynoshield.jpg'

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    position: 'relative',
  },
  h1: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
	  },
  },
  desc: {
    fontFamily: 'SceneProRg',
    color: '#e80200',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: '16px',
      textAlign: 'center',
	  },
  },
}));

const PPFMasonryHome = () => {
  const { classes } = useStyles();

  return (
    <>
    <ResponsiveMasonry
                columnsCountBreakPoints={{350: 2, 750: 2, 900: 1}}
            >
                <Masonry>
                <Zoom>
                <img src={PorscheGreen} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                {/* <Zoom>
                <img src={GlossyCarbon} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom> */}
                <Zoom>
                <img src={BMWSteeringWheel} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                </Masonry>
            </ResponsiveMasonry>
    </>
  )
}

export default PPFMasonryHome;