// import { Box } from "@mui/material";
// import HeroSection from "./heroSection";

// function HomePage() {
//     return (
//       <Box sx={{width:"100%"}}>
//         homePage
//         <HeroSection></HeroSection>
//       </Box>
      
//     );
//   }
  
//   export default HomePage;

import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  const images = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg",
    "img/img6.jpg",
    "img/img7.jpg",
  ];

  const texts = [
    "Photography is the story I fail to put into words. – Destin Sparks",
    "A good photographer is one that can capture the soul behind the smile.",
    "In photography, there is a reality so subtle that it becomes more real than reality. – Alfred Stieglitz",
    "A camera is a save button for the mind’s eye. – Roger Kingston",
    "Every picture tells a story, but the best ones let you feel it.",
    "Photography takes an instant out of time, altering life by holding it still. – Dorothea Lange",
    "The best thing about a picture is that it never changes, even when the people in it do. – Andy Warhol",
    "A great photograph is a full expression of what one feels about what is being photographed. – Ansel Adams",
    "Life is like a camera: focus on the good times, develop from the negatives, and if things don’t work out, take another shot.",
    "We take photos as a return ticket to a moment otherwise gone.",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 4500);

    return () => {
      clearInterval(imageInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "black",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.img
        key={currentImage}
        src={images[currentImage]}
        alt="Background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.6,
        }}
      />
      <motion.div
        key={currentText}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ position: "absolute", top: "80%", width: "90%", zIndex: 2 }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#ffffff" }}>
          {texts[currentText]}
        </Typography>
      </motion.div>
      <motion.img
        src="img/TakeAPeelLogo.png"
        alt="Take a Peek"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: "300px", zIndex: 2 }}
      />
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          sx={{ mt: 4, zIndex: 2 }}
          href="/register"
        >
          Get Started
        </Button>
      </motion.div>
    </Box>
  );
};
const FeaturesSection = () => {
    const features = [
      { title: "AI Sorting", description: "Automatically categorize your photos with AI." },
      { title: "Bulk Uploads", description: "Drag and drop hundreds of photos instantly." },
      { title: "Smart Filters", description: "Find the best shots with our advanced filtering options." },
    ];
  
    return (
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          component={motion.div}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Take a Peek?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                  textAlign: "center",
                  p: 3,
                  background: `linear-gradient(135deg, ${index === 0 ? '#FF6F61' : index === 1 ? '#4A90E2' : '#50E3C2'}, ${index === 0 ? '#FF3E30' : index === 1 ? '#5B8CFF' : '#00B8A9'})`,
                  color: "white",
                  boxShadow: 3,
                  borderRadius: "20px",
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1,
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    zIndex: -1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{feature.title}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };

const Testimonials = () => {
  const testimonials = [
    { name: "John Doe", text: "Take a Peek changed the way I organize my photos. Amazing experience!" },
    { name: "Jane Smith", text: "I love the AI sorting. It saves me hours of work!" },
    { name: "Michael Brown", text: "The bulk upload feature is a game changer. Highly recommend!" },
  ];

  return (
    <Container sx={{ py: 10 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        component={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        What Our Users Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              sx={{
                p: 3,
                background: "#f5f5f5",
                boxShadow: 3,
                borderRadius: "30px",
                transformOrigin: "center",
                transition: "transform 0.3s",
              }}
            >
              <Typography variant="h6" fontWeight="bold" textAlign="center">
                "{testimonial.text}"
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
                - {testimonial.name}
              </Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Footer = () => {
  return (
    <Box sx={{ py: 6, textAlign: "center", bgcolor: "#222", color: "white" }}>
      <Typography variant="body1" fontWeight="bold">
        Take a Peek | Revolutionizing Photography
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ display: "inline-block", mr: 3 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" sx={{ display: "inline-block", mr: 3 }}>
          Terms of Service
        </Typography>
        <Typography variant="body2" sx={{ display: "inline-block", mr: 3 }}>
          Contact Us
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        © 2025 Take a Peek. All rights reserved.
      </Typography>
    </Box>
  );
};

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
