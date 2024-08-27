import { Button } from '@mui/material';

export default function ClearFiltersButton({ onClick }) {
  return (
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={onClick}
          sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: 20,
              textTransform: 'none',
              marginLeft: '120px',
              width: '150px',
              paddingTop: '10px',
              paddingBottom:'10px'
              
          }}
    >
      Clear Filters
    </Button>
  );
}
