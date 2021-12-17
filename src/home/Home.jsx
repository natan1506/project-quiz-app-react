import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom'


function Home({ questions }) {

  return (
    <Card sx={{ width: { xs: '300px', md: '450px', lg: '1200px' }, borderRadius: '4px', border: '1px solid #565AE6' }}>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 5, py: 3 }}>
          <Button
            variant="outlined"
            size="small"
          >
            <Link
              to="/create"
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
            Criar Questionario
            </Link>
                
          </Button>

          <Button
            variant="outlined"
            size="small"
          >
            Questionarios
          </Button>
      </CardActions>
    </Card>
  )
}

export default Home