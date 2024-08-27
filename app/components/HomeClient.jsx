'use client';
import { useState } from 'react';
import Post from './Post';
import AddPostModal from './AddPostModal';
import { Container, Button, Grid, Typography, Switch } from '@mui/material';
import DatePicker from './DatePicker';
import PostFilterSelect from './PostFilterSelect';

export default function HomeClient({ posts }) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDeleted, setShowDeleted] = useState('hide');
  const [darkMode, setDarkMode] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowDeletedChange = (event) => {
    setShowDeleted(event.target.value);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.createdAt);
    const isWithinDateRange = (!startDate || postDate >= new Date(startDate)) &&
                              (!endDate || postDate <= new Date(endDate));
    const isDeleted = post.deleted;

    return (showDeleted === 'show' ? isDeleted : !isDeleted) && isWithinDateRange;
  });

  return (
    <Container sx={{
      backgroundColor: darkMode ? '#1f1f1f' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      minHeight: '100vh',
      padding: '20px'
    }} maxWidth={false}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 4, px: { xs: 2, md: 6 } }}>
        
        <PostFilterSelect showDeleted={showDeleted} handleShowDeletedChange={handleShowDeletedChange} />

        <Grid item>
          <Switch checked={darkMode} onChange={handleThemeChange} />
          <Typography variant="body2">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </Typography>
        </Grid>
      </Grid>
      
      <Grid
        container
        alignItems="center"
        spacing={2}
        sx={{ px: { xs: 2, md: 6 }, mb: 2 }}
      >
        <Grid item xs={12} sm={6}>
          <DatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: 20,
              textTransform: 'none',
              width: '100px',
              paddingTop: '10px',
              paddingBottom: '10px',
              marginRight:'225px',
              marginBottom:'20px'
            }}
            onClick={handleOpen}
          >
            New
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ px: { xs: 2, md: 6 } }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Post
                id={post.id}
                title={post.title}
                content={post.content}
                authorName={post.author ? post.author.name : 'Unknown'}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                deletedAt={post.deletedAt}
              />
            </Grid>
          ))
        ) : (
          <Grid 
            container 
            justifyContent="center" 
            alignItems="center" 
            sx={{ minHeight: '200px', textAlign: 'center' }}
          >
            <Typography variant="h6" color="textSecondary" sx={{ color: darkMode ? "white" : "black" }}>
              No posts available.
            </Typography>
          </Grid>
        )}
      </Grid>

      <AddPostModal open={open} onClose={handleClose} />
    </Container>
  );
}
