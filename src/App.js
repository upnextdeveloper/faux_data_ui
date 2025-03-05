import logo from './logo.svg';
import './App.css';
import Landing from "./Landing/Landing.tsx"
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Typography variant="h2">
          <span style={{fontStyle: 'italic', color:'yellow'}}>FauxData</span> - Random Data Generator
        </Typography>
      </Box>
      <Landing />
    </div>
  );
}

export default App;
