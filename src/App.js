import logo from './logo.svg';
import './App.css';
import Landing from "./Landing/Landing.tsx"
import { Box, Typography } from '@mui/material';
import HomePage from './HomePage/HomePage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Generator from './Generator/Generator.tsx';
import NavbarMenu from './NavbarMenu/NavbarMenu.js';

function App() {
  return (
    <div className="App">
      <NavbarMenu/>
    </div>
  );
}

export default App;
