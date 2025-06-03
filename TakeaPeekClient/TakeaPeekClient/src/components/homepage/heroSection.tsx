import  { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';

// Import your logo component or image

// Sample image URLs (replace with your own)
const images = [
  '/img/img1.jpg', // Replace with your image URLs
  '/img/img2.jpg',
  '/img/img3.jpg',
  '/img/img4.jpg',
];

// Sample sentences about photographers
const sentences = [
  'Capturing moments that last a lifetime.',
  'Telling stories through the lens.',
  'Finding beauty in the everyday.',
  'Creating art with light and shadow.',
];

// Styled components for better styling
const HeroContainer = styled(Box)({
  position: 'relative',
  height: '30vh', // Full viewport height
  overflow: 'hidden',
});

const AnimatedBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${images[0]})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  animation: 'fadeImages 15s infinite ease-in-out',
  '@keyframes fadeImages': {
    '0%, 100%': { opacity: 1 },
    '25%': { opacity: 0.8 },
    '50%': { opacity: 0.6 },
    '75%': { opacity: 0.8 },
  }, 
opacity:0.3,
});

const ContentContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white', // Adjust text color as needed
});

const MovingSentence = styled(Typography)({
  marginTop: '20px',
  animation: 'slideSentences 12s infinite linear',
  '@keyframes slideSentences': {
    '0%, 100%': { transform: 'translateY(0)', opacity: 0 },
    '10%, 20%': { transform: 'translateY(-20px)', opacity: 1 },
    '80%, 90%': { transform: 'translateY(20px)', opacity: 1 },
  },
});

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    const sentenceInterval = setInterval(() => {
      setCurrentSentence((prevSentence) => (prevSentence + 1) % sentences.length);
    }, 4000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(sentenceInterval);
    };
  }, []);

  return (
    <HeroContainer >
      <AnimatedBackground
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      <ContentContainer>
        {/* <Logo /> Replace with your logo component */}
        <img src="img/TakeAPeekLogo.png" width={100} height={100}></img>
        <MovingSentence variant="h6">
          {sentences[currentSentence]}
        </MovingSentence>
      </ContentContainer>
    </HeroContainer>
  );
}

export default HeroSection;