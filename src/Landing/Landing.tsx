import React from "react";
import Generator from "../Generator/Generator";

function Landing() {
    return (
        <div>
            <h2>Use FauxData to generate random data for you.</h2>
            <h5>How to use Faux Data:</h5>
            <br/>
            <p>1. Enter the name of your table's column</p>
            <p>2. Select a relevant data type</p>
            <p>3. Indicate whether or not the column must have a value of the relevant data type</p>
            <p>4. To add more rows, press the '+ Add Column button. To delete a row, press the red button to the right of the row</p>
            <p>5. Select the number of rows to generate for you</p>
            <p>6. Finally, press the 'Submit' button to generate</p>
            <hr/>
            <Generator/>
            <br/>
        </div>
    )
}

export default Landing;