import { Button, CardActionArea, CardMedia, Grid2, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './Homepage.css'
import { Card, CardGroup } from "react-bootstrap";
import UseCards from "../UseCards/UseCards";
import IndustryUsage from "../IndustryUsage/IndustryUsage";

function HomePage() {

    return (
        <div>
            <h1>Power Up Your Programming Projects</h1>
            <br/>
            <h4>Demonstrate the validity of your software Projects
                with data.
            </h4>
            <br/>
            <Button className={'to_generator'}>
                <Link className={'to_generator'} to="/generator">Let's Generate!!!</Link>
            </Button>
            <hr />
            <h3>What can this be used for:</h3>
            <br />
            <UseCards/>      
            <hr />
            <h4>Popular Industry Usages:</h4><br/>
            <IndustryUsage/>
            <br />
            <Button className={'to_generator'}>
                <Link className={'to_generator'} to="/generator">Let's Generate!!!</Link>
            </Button>
            <hr />
           
        </div>
    )
}

export default HomePage;