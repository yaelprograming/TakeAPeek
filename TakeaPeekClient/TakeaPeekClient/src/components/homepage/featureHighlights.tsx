// import { Box, Typography, Grid, CardContent } from "@mui/material";
// import { ImageIcon, ShareIcon, CloudUploadIcon } from "lucide-react";

// function FeatureHighlights() {
//   const features = [
//     {
//       icon: <ImageIcon />,
//       title: 'AI Organization',
//       description: 'Intelligent library management with AI tagging.',
//     },
//     {
//       icon: <FilterListIcon />,
//       title: 'Smart Filters',
//       description: 'AI-driven filters to find perfect shots instantly.',
//     },
//     {
//       icon: <ViewComfyIcon />,
//       title: 'Collage AI',
//       description: 'Automated collage creation with AI composition.',
//     },
//     {
//       icon: <ShareIcon />,
//       title: 'AI Sharing',
//       description: 'Smart sharing with AI-recommended recipients.',
//     },
//     {
//       icon: <CloudUploadIcon />,
//       title: 'Cloud AI Sync',
//       description: 'AI-optimized cloud sync for seamless access.',
//     },
//     {
//       icon: <ViewModuleIcon />,
//       title: 'Bulk AI Edit',
//       description: 'AI-powered bulk editing and processing.',
//     },
//   ];

//   return (
//     <Box sx={{ padding: '40px 20px' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         AI Feature Highlights
//       </Typography>
//       <Grid container spacing={3}>
//         {features.map((feature, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <FeatureCard>
//               <CardContent>
//                 {feature.icon}
//                 <FeatureTitle variant="h6">{feature.title}</FeatureTitle>
//                 <Typography variant="body2">{feature.description}</Typography>
//               </CardContent>
//             </FeatureCard>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }