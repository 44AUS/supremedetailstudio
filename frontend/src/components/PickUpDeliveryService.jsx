import React from 'react';
import { Container, Title, createStyles } from '@mantine/core';
import TeslaSteeringWheel from '../assets/images/details/tesla-steering-wheel.jpg';

const useStyles = createStyles((theme) => ({
    bgBody: {
      backgroundColor: '#111',
      backgroundImage: 'linear-gradient(45deg, #000, #2e2e2e)',
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
    h1Why: {
      marginTop: 0,
      fontFamily: 'SceneProUltBlkIt',
      textAlign: 'center',
      color: '#fff',
      fontSize: '22px',
      textTransform: 'uppercase',
      lineHeight: 1.2,
      fontWeight: 800,
      animation: 'fadein 1s',
      '@media (max-width: 520px)': {
        fontSize: 20,
        textAlign: 'center',
        },
    },
    WhyDesc: {
      fontFamily: `SceneProRg`,
      color: '#fff',
      fontSize: '18px',
      lineHeight: 1.8,
      fontWeight: 500,
      textAlign: 'center',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
      animation: 'fadein 1s',
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
    benefitIcon: {
      fontFamily: `SceneProRg`, 
      fontSize: '16px',
      fontWeight: 800,
      color: '#FFF',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      display: 'flex',
      width: '48px',
      height: '48px',
      border: '2px solid #fff',
      borderRadius: '100%',
      marginBottom: '24px',
      '@media (max-width: 520px)': {
        width: '38px',
        height: '38px',
        },
    },
  }));

const PickUpDeliveryService = () => {

    const { classes } = useStyles();


  return (
    <></>
    // <div>
    // <div className="service-deal-container">
    //     <div className="service-deal-bg-wrapper">
    //         <img src={TeslaSteeringWheel} loading="lazy" className="service-deal-bg-image" />
    //         <div className="service-deal-bg-overlay">
    //             </div>
    //             </div>
    //             <div className="service-deal-text-container">
    //                 <div id="w-node-_7f056b17-781e-f801-4f1d-df54f297b887-2931ecf3" className="service-deal-heading-container">
    //                     <div id="w-node-_7f056b17-781e-f801-4f1d-df54f297b888-2931ecf3" className="subheading light">FREE PICKUP & DELIVERY SERVICE!</div>
    //                     </div>
    //                     <div id="w-node-_7f056b17-781e-f801-4f1d-df54f297b88c-2931ecf3" className="service-deal-paragraph-container">
    //                         <p className="service-deal-paragraph w-dyn-bind-empty"></p>
    //                         <div className="service-deal-link-container">
    //                             <div className="service-deal-expiry-wrapper">
    //                                 <div className="service-deal-expiry-text w-dyn-bind-empty"></div></div>
    //                                 <a href="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=jNZXrboI02c1kUC4sBcJ&sku=kTaQ0re3Re8KXkmKeIuZ" target="_blank" className="service-deal-link">Learn More</a></div></div></div></div></div>
  )
}

export default PickUpDeliveryService;