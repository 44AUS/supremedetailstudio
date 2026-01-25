import React from 'react';
import { createStyles, Container, Text, Group } from '@mantine/core';
import { IconTruckDelivery } from '@tabler/icons-react';

const useStyles = createStyles(() => ({
  wrapper: {
    background: 'linear-gradient(135deg, #0b1020, #1b2a4a)',
    borderRadius: '18px',
    padding: '32px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 0 40px rgba(0,0,0,0.6)',
    color: '#fff',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '24px',
      textAlign: 'center',
    },
  },

  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #4da3ff, #6be1ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 25px rgba(77,163,255,0.45)',
  },

  title: {
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '0.3px',
  },

  subtitle: {
    fontSize: '16px',
    color: '#c7d6ff',
    marginTop: '4px',
  },

  right: {
    textAlign: 'right',
    '@media (max-width: 768px)': {
      textAlign: 'center',
    },
  },

  small: {
    fontSize: '14px',
    color: '#9bb6ff',
  },

  price: {
    fontSize: '34px',
    fontWeight: 800,
    color: '#5da9ff',
    lineHeight: 1.1,
  },

  serviceText: {
    fontSize: '14px',
    color: '#9bb6ff',
  },
}));

const PickUpDeliveryService = () => {
  const { classes } = useStyles();

  return (
    <Container size="xl" my="xl">
      <div className={classes.wrapper}>
        {/* LEFT */}
        <div className={classes.left}>
          <div className={classes.iconBox}>
            <IconTruckDelivery size={28} color="#fff" />
          </div>
          <div>
            <Text className={classes.title}>FREE Pickup & Delivery Service</Text>
            <Text className={classes.subtitle}>Convenient, fast, and contactless service for your vehicle</Text>
          </div>
        </div>

        {/* RIGHT */}
        {/* <div className={classes.right}>
          <Text className={classes.small}>Starting at</Text>
          <Text className={classes.price}>$59/mo</Text>
          <Text className={classes.serviceText}>for a $350 service</Text>
        </div> */}
      </div>
    </Container>
  );
};

export default PickUpDeliveryService;
