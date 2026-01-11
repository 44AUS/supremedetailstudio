import React from 'react'
import { SimpleGrid } from '@mantine/core';
import { Container, Title, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  introGalleryWrapper: {
    maxWidth: '1500px',
    marginBottom: '-127px',
    position: 'relative',
  },
  galleryWrapperList: {
    zIndex: '3',
    width: '100%',
    maxWidth: 'none',
    marginTop: '0',
    marginBottom: '0',
    position: 'relative',
  }
}));
const IntroGalleryWrapper = () => {
    const { classes } = useStyles();

  return (
    <>
    <Container size="xl">
      <div className={classes.introGalleryWrapper}>
        <div className={classes.galleryWrapperList}>
          dsc
        </div>
      </div>
    </Container>
    </>
  )
}

export default IntroGalleryWrapper;