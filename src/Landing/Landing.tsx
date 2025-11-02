import React from "react";
import Generator from "../Generator/Generator";
import { Box, Typography } from "@mui/material";
import './Landing.css'
import { CardGroup, Card } from "react-bootstrap";
function Landing() {
    return (
        <div>
            <Typography align="center" variant="h3" gutterBottom>
                Use <span style={{ fontStyle: 'italic', color: 'white' }}>FauxData</span> to generate random data for you.
            </Typography>
            <div className="directions">
                <h5>How to use FauxData:</h5>
                <br />
                <p>1. Enter the name of your table's column.</p>
                <p>2. Select a relevant data type.</p>
                <p>3. Indicate whether or not the column must have a value of the relevant data type.</p>
                <p>4. To add more rows, press the '+ Add Column button. To delete a row, press the red button to the right of the row.</p>
                <p>5. Select the number of rows to generate for you.</p>
                <p>6. Finally, press the 'Generate' button to generate.</p>
                <p>7. After sometime, you will be prompted to submit payment.</p>
                <p>8. Once payment is successful, file will be ready to download.</p>
            </div>
            <br />
            <h4>Starting Prices:</h4>
            <div style={{backgroundColor: 'white'}}>
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>Row Count</Card.Title>
                        <Card.Text>
                            <ul style={{ listStyle: 'none' }}>
                                <li>1,000 Rows: $ 0.00</li>
                                {/* <li>10,000 Rows: $ 3.99</li>
                                <li>50,000 Rows: $ 5.99</li>
                                <li>100,000 Rows: $ 7.99</li>
                                <li>500,000 Rows: $ 9.99</li>
                                <li>1,000,000 Rows: $ 11.99</li> */}
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>File Type</Card.Title>
                        <Card.Text>
                            <ul style={{ listStyle: 'none' }}>
                                <li>MySQL File: $ 0.00</li>
                                <li>Excel File: $ 0.00</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
            </div>

            <br />
        </div>
    )
}

export default Landing;