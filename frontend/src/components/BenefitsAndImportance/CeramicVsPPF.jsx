import React from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '30px',
    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    fontFamily: 'SceneProBold, sans-serif',
    fontSize: '18px',
    color: '#fff',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontFamily: 'SceneProRg, sans-serif',
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '14px',
    lineHeight: 1.8,
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative',
    '&::before': {
      content: '"✓"',
      position: 'absolute',
      left: 0,
      color: '#e80200',
    },
  },
  ceramicCard: {
    borderLeft: '4px solid #fff',
  },
  ppfCard: {
    borderLeft: '4px solid #e80200',
  },
}));

const CeramicVsPPF = () => {
  const { classes } = useStyles();

  const ceramicBenefits = [
    'Enhanced gloss and shine',
    'Hydrophobic properties',
    'UV protection',
    'Chemical resistance',
    'Easier cleaning',
    'Long-lasting protection',
  ];

  const ppfBenefits = [
    'Self-healing technology',
    'Impact protection',
    'Rock chip resistance',
    'Scratch protection',
    'UV protection',
    'Preserves paint finish',
  ];

  return (
    <div className={classes.container}>
      <div className={`${classes.card} ${classes.ceramicCard}`}>
        <h3 className={classes.cardTitle}>Ceramic Coating</h3>
        <ul className={classes.list}>
          {ceramicBenefits.map((benefit, index) => (
            <li key={index} className={classes.listItem}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div className={`${classes.card} ${classes.ppfCard}`}>
        <h3 className={classes.cardTitle}>Paint Protection Film</h3>
        <ul className={classes.list}>
          {ppfBenefits.map((benefit, index) => (
            <li key={index} className={classes.listItem}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CeramicVsPPF;
