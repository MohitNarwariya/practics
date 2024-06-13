import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Link,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const FeaturedNewsCard = ({ title, date, link }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {date}
        </Typography>
      </CardContent>
      <Button variant="outlined" sx={{ ml: 1, mb: 1 }}>
        <StyledLink href={link}>Read More</StyledLink>
      </Button>
    </Card>
  );
};

const BigStoryCard = ({ title, date, imageSrc }) => {
  return (
    <Card sx={{ mt: 2, maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={imageSrc}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};


const Header =()=>{
    return(<div>
 <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: red[500] }}>
                <Typography variant="h6" component="span">
                  K
                </Typography>
              </Avatar>
              <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                KollegeApply
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="University">
                <IconButton>
                  <Typography variant="body1" component="span">
                    University
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Colleges">
                <IconButton>
                  <Typography variant="body1" component="span">
                    Colleges
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Exams">
                <IconButton>
                  <Typography variant="body1" component="span">
                    Exams
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Courses">
                <IconButton>
                  <Typography variant="body1" component="span">
                    Courses
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="News">
                <IconButton>
                  <Typography variant="body1" component="span">
                    News
                  </Typography>
                </IconButton>
              </Tooltip>
              
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <TextField id="outlined-basic" placeholder='Search for Colleges, Exams, Courses & more...' variant="outlined" />
                
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <img
                src="/assets/18.png "
                alt="Chitkara University Campus"
                style={{ width: '80%', height: '80%', objectFit: 'cover' }}
              />
              <Typography variant="h4" component="div" sx={{ mt: 2, mb: 1 }}>
                Chitkara University MBA Admission Open;
              </Typography>
              <div>
                <img src='/assets/1111.png'/>
              </div>
              <Typography variant="body1" component="div">
                Check Direct List...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                20 Sep 2023, 8:00pm
              </Typography>
              <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                New Delhi: The State Common Entrance Test Cell, Government of Maharashtra, has issued the admit
                cards for the MArch, MHMCT, BED, MEd, and MPEd Courses on February 27, 2024. To download the
                document...
                <StyledLink href="#">READ</StyledLink>
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              THE BIG STORIES
            </Typography>
            <BigStoryCard
              title="What is the latest program that you are offering in your institute..."
              date="27 Dec 2020"
              imageSrc="/assets/11.png"
            />
            <BigStoryCard
              title="NMIMS LAT, MST and CET 2024 Registration to Close on March 10"
              date="27 Dec 2020"
              imageSrc="/assets/12.png"            />
            <BigStoryCard
              title="What is the latest program that you are offering in your institute..."
              date="27 Dec 2020"
              imageSrc="/assets/13.png"            />
            <BigStoryCard
              title="What is the latest program that you are offering in your institute..."
              date="27 Dec 2020"
              imageSrc="/assets/14.png"            />
          </Grid>
        </Grid>
        <Container  sx={{ mt: 4 }}>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            FEATURED NEWS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FeaturedNewsCard
                title="What is the latest program that you are offering in your institute..."
                date="27 Dec 2020"
                link="#"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FeaturedNewsCard
                title="What is the latest program that you are offering in your institute..."
                date="27 Dec 2020"
                link="#"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FeaturedNewsCard
                title="What is the latest program that you are offering in your institute..."
                date="27 Dec 2020"
                link="#"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FeaturedNewsCard
                title="What is the latest program that you are offering in your institute..."
                date="27 Dec 2020"
                link="#"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
    </div>)
}

const InterShala = () => {
  return (
    <div> 
   {Header()}
   </div>
  );
};

export default InterShala;


