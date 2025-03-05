import React, { useState } from "react";
import './Generator.css'
import axios from "axios";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function Generator() {

    // states
    const [dataEntry, setDataEntry] = useState({});
    const [tableName, setTableName] = useState('');
    const [inputFields, setInputFields] = useState([
        { columnName: '', datatype: '', isRequired: 'Y' }
    ])
    const [rowCount, setRowCount] = useState(0)
    const [fileType, setFileType] = useState('')

    const client = axios.create({
        baseURL: "http://localhost:8080/api/v1/entry"
    })

    const submitDataEntry = (inputFields: any, rowCount: number) => {
        client
            .post('', {
                inputFields: inputFields,
                rowCount: rowCount,
                fileType: fileType,
                tableName: tableName
            })
            .then((response) => {
                setDataEntry([response.data])
            })
    }

    const handleFormChange = (index: any, event: any) => {
        let data = [...inputFields];
        data[index].columnName = event.target.value;
        setInputFields(data);
    }

    const handleDataTypeChange = (index: any, event: any) => {
        let data = [...inputFields];
        data[index].datatype = event.target.value;
        setInputFields(data);
    }

    const handleIsRequiredChange = (index: any, event: any) => {
        let data = [...inputFields];
        data[index].isRequired = event.target.value;
        setInputFields(data);
    }

    const handleRowCountChange = (event: any) => {
        setRowCount(event.target.value);
    }

    const handleFileTypeChange = (event: any) => {
        setFileType(event.target.value);
    }

    const handleTableNameChange = (event: any) => {
        setTableName(event.target.value);
    }

    const addFields = () => {
        let newField = { columnName: '', datatype: '', isRequired: 'Y' };
        setInputFields([...inputFields, newField]);
    }

    const removeField = (index: number) => {
        let newField = [...inputFields];
        newField.splice(index, 1);
        setInputFields(newField);
    }

    const submit = (e: any) => {
        if (rowCount < 10 || rowCount.toString() === '-') {
            alert("Invalid Inputs. Please ensure that the ROW COUNT is not blank.")
        } else if (fileType === "-") {
            alert("Invalid Inputs. Please ensure that the EXPORT FILE TYPE is not blank.")
        } else if (!tableName) {
            alert("Invalid Inputs. Please ensure that the TABLE NAME is not blank.")
        } else if (!validateColumnInputs()) {
            alert("Invalid Inputs. Please ensure all data points are not blank.")
        } else {
            e.preventDefault();
            console.log(inputFields);
            submitDataEntry(inputFields, rowCount);
            alert("Generation Successful. File will be ready shortly")
        }
    }

    const validateColumnInputs = () => {
        let isInputValid = true;
        for (let i = 0; i < inputFields.length; i++) {
            let colName = inputFields[i]['columnName'];
            let dataType = inputFields[i]['datatype']
            if (colName.trim() === "" || dataType.trim() === "-") {
                isInputValid = false;
                break;
            } else {
                isInputValid = true;
            }
        }
        return isInputValid;
    }

    return (
        <div>
            {inputFields.length == 0 && <h3>Click 'Add' to create your first row</h3>}
            <InputLabel id="demo-simple-select-label">Table Name</InputLabel>
            <br />
            <TextField type="text"
                placeholder="Table Name"
                name="tableName"
                onChange={(e) => handleTableNameChange(e)}
                id="outlined-basic"
                label="Table Name"
                variant="outlined" />
            <br />

            <label htmlFor="columnName" className="columntitles_name">Column Name</label>
            <label htmlFor="dataType" className="columntitles_datatype">Data Type</label>
            <label htmlFor="isRequired" className="columntitles_required">Is Required?</label>
            <form onSubmit={submit}>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <h6 className={'datainputrowcount'}>{index + 1}</h6>
                            {/* <input className={'datainputrow'}
                                id="columnName"
                                name='columnName'
                                placeholder='Name'
                                value={input.columnName}
                                onChange={(e) => handleFormChange(index, e)}
                            /> */}
                            <TextField className={'datainputrow'} type="text"
                                value={input.columnName}
                                placeholder="Column Name"
                                name="Column Name"
                                onChange={(e) => handleFormChange(index, e)}
                                id="outlined-basic"
                                label="Column Name"
                                variant="filled" />
                            <Select
                                value={input.datatype}
                                name="datatype"
                                onChange={(e) => handleDataTypeChange(index, e)}
                                labelId="demo-simple-select-label"
                                className={'datainputrow'}
                            >
                                <MenuItem value={'-'}>-</MenuItem>
                                <MenuItem value={'Identification Number'}>Identification Number</MenuItem>
                                <MenuItem value={'First Name'}>First Name</MenuItem>
                                <MenuItem value={'Middle Name'}>Middle Name</MenuItem>
                                <MenuItem value={'Last Name'}>Last Name</MenuItem>
                                <MenuItem value={'Full Name'}>Full Name</MenuItem>
                                <MenuItem value={'Full Name with Middle'}>Full Name with Middle</MenuItem>
                                <MenuItem value={'Age'}>Age</MenuItem>
                                <MenuItem value={'Username'}>Username</MenuItem>
                                <MenuItem value={'Email'}>Email</MenuItem>
                                <MenuItem value={'Phone Number'}>Phone Number</MenuItem>
                                <MenuItem value={'Past Date - Up to 50 Years'}>Past Date - Up to 50 Years</MenuItem>
                                <MenuItem value={'Future Date - Up to 50 Years'}>Future Date - Up to 50 Years</MenuItem>
                                <MenuItem value={'Street'}>Street</MenuItem>
                                <MenuItem value={'City'}>City - US</MenuItem>
                                <MenuItem value={'State'}>State - US</MenuItem>
                                <MenuItem value={'State Abbreviation'}>State Abbreviation</MenuItem>
                                <MenuItem value={'Zip Code'}>Zip Code</MenuItem>
                                <MenuItem value={'True/False'}>True/False</MenuItem>
                                <MenuItem value={'Gender'}>Gender</MenuItem>
                                <MenuItem value={'Birthday'}>Birthday</MenuItem>
                                <MenuItem value={'Money - Positive Only'}>Money - Positive Only</MenuItem>
                                <MenuItem value={'Money - Positive/Negative'}>Money - Positive/Negative</MenuItem>
                                <MenuItem value={'Positive Numbers'}>Positive Numbers</MenuItem>
                                <MenuItem value={'Race'}>Race</MenuItem>
                                <MenuItem value={'Marital Status'}>Marital Status</MenuItem>
                                <MenuItem value={'Current Education'}>Current Education</MenuItem>
                            </Select>
                            {/* <select id="dataType" value={input.datatype} name="datatype" onChange={(e) => handleDataTypeChange(index, e)} className={'datainputrow'}>
                                <option>-</option>
                                <option>Identification Number</option>
                                <option>First Name</option>
                                <option>Middle Name</option>
                                <option>Last Name</option>
                                <option>Full Name</option>
                                <option>Full Name with Middle</option>
                                <option>Age</option>
                                <option>Username</option>
                                <option>Email</option>
                                <option>Phone Number</option>
                                <option>Past Date - Up to 50 Years</option>
                                <option>Future Date - Up to 50 Years</option>
                                <option>Street</option>
                                <option>City</option>
                                <option>State</option>
                                <option>State Abbreviation</option>
                                <option>Zip Code</option>
                                <option>True/False</option>
                                <option>Gender</option>
                                <option>Birthday</option>
                                <option>Money - Positive Only</option>
                                <option>Money - Positive/Negative</option>
                                <option>Positive Numbers</option>
                                <option>Race</option>
                                <option>Marital Status</option>
                                <option>Current Education</option>
                            </select> */}
                            <Select
                                id="isRequired"
                                defaultValue={"Y"}
                                value={input.isRequired}
                                name="isRequired"
                                onChange={(e) => handleIsRequiredChange(index, e)}
                                className={'datarequiredinput'}
                            >
                                <MenuItem value={'Y'}>Yes</MenuItem>
                                <MenuItem value={'N'}>No</MenuItem>
                            </Select>

                            <Button variant="contained" color="error" className={'removeButton'} onClick={() => removeField(index)}>-</Button>
                        </div>
                    )
                })}
                <br />
                <Button variant="contained" className={'addButton'} onClick={addFields}>+ Column</Button><br /><br />

                <br />
                {inputFields.length != 0
                    &&
                    <div>
                        <InputLabel id="demo-simple-select-label"># of Rows</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rowCount}
                            label="Row Count"
                            onChange={(e) => handleRowCountChange(e)}
                        >
                            <MenuItem value={10}>Ten (10)</MenuItem>
                            <MenuItem value={100}>One Hundred (100)</MenuItem>
                            <MenuItem value={1000}>One Thousand (1000)</MenuItem>
                            <MenuItem value={10000}>Ten Thousand (10000)</MenuItem>
                            <MenuItem value={100000}>One Hundred Thousand (100000)</MenuItem>
                            <MenuItem value={1000000}>One Million (1000000)</MenuItem>
                        </Select>
                        <br /><br />
                        <InputLabel id="demo-simple-select-label">Export File Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={fileType}
                            label="Age"
                            onChange={(e) => handleFileTypeChange(e)}
                        >
                            <MenuItem value={'Excel File'}>Excel File</MenuItem>
                            <MenuItem value={'MySQL File'}>MySQL File</MenuItem>
                        </Select>
                    </div>

                }
                <br />
                {inputFields.length > 0 && <Button variant="contained" color="success" onClick={submit} className={'submitButton'}>Submit</Button>}
                <br />
            </form>
        </div>
    )
}

export default Generator;