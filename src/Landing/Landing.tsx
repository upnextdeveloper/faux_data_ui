import React from "react";
import Generator from "../Generator/Generator";
import { Box, Typography } from "@mui/material";
import './Landing.css'
function Landing() {
    return (
        <div>
            <Typography align="center" variant="h3" gutterBottom>
                Use <span style={{ fontStyle: 'italic', color: 'white' }}>FauxData</span> to generate random data for you.
            </Typography>
            <div className="directions">
                <h5>How to use FauxData:</h5>
                <br />
                <p>1. Enter the name of your table's column</p>
                <p>2. Select a relevant data type</p>
                <p>3. Indicate whether or not the column must have a value of the relevant data type</p>
                <p>4. To add more rows, press the '+ Add Column button. To delete a row, press the red button to the right of the row</p>
                <p>5. Select the number of rows to generate for you</p>
                <p>6. Finally, press the 'Submit' button to generate</p>
                </div>
            <br />
        </div>
    )
}

export default Landing;