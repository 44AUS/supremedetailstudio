import React from 'react';
import { createStyles, Container, Text, Button, Group } from '@mantine/core';
import { IconTruckDelivery } from '@tabler/icons-react';

const useStyles = createStyles(() => ({
  bar: {
    backgroundColor: '#e80200', // matches screenshot blue
    padding: '18px 0',
  },

  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,

    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },

  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },

  icon: {
    color: '#fff',
  },

  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },

  button: {
    borderColor: 'rgba(255,255,255,0.7)',
    color: '#fff',
    fontWeight: 600,
    letterSpacing: '2px',
    paddingLeft: 26,
    paddingRight: 26,

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
}));

const PickUpDeliveryService = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.bar}>
      <Container size="xl">
        <div className={classes.inner}>
          {/* LEFT */}
          <div className={classes.left}>
            <IconTruckDelivery size={22} className={classes.icon} />
            <Text className={classes.text}>
              Pickup & Delivery Service Starts at $50
            </Text>
          </div>

          {/* RIGHT */}
          <Button
            variant="outline"
            radius="md"
            className={classes.button}
          >
            Learn More
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default PickUpDeliveryService;
