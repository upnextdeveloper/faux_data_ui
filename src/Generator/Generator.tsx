import React, { useState } from "react";
import './Generator.css'
import axios from "axios";
import { Box, Button, CircularProgress, colors, Divider, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import Landing from "../Landing/Landing";

function Generator() {

    // states
    const [dataEntry, setDataEntry] = useState({});
    const [tableName, setTableName] = useState('');
    const [isRequired, setisRequired] = useState('');
    const [inputFields, setInputFields] = useState([
        { columnName: '', datatype: '', isRequired: '' }
    ])
    const [rowCount, setRowCount] = useState(0)
    const [fileType, setFileType] = useState('')
    const [generationLoading, setGenerationLoading] = useState(false);
    const [generationSuccessFul, setGenerationSuccessFul] = useState(false);
    const [generationFailed, setGenerationFailed] = useState(false);

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
                setGenerationSuccessFul(true);
                setGenerationFailed(false);
            }).catch(
                function (error) {
                    setGenerationSuccessFul(false);
                    setGenerationFailed(true);
                }
            ).finally(
                function completeAction() {
                    setGenerationLoading(false);
                }
            )
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
        if (event.target.value === 'Y') {
            setisRequired(event.target.value)
        } else {
            setisRequired(event.target.value)
        }
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
        let newField = { columnName: '', datatype: '', isRequired: '' };
        setInputFields([...inputFields, newField]);
    }

    const removeField = (index: number) => {
        let newField = [...inputFields];
        newField.splice(index, 1);
        setInputFields(newField);
    }

    const submit = (e: any) => {
        setGenerationSuccessFul(false);
        setGenerationFailed(false);
        if (rowCount < 10 || rowCount.toString() === '-') {
            alert("Invalid Inputs. Please ensure that the ROW COUNT is not blank.")
        } else if (fileType === "-") {
            alert("Invalid Inputs. Please ensure that the EXPORT FILE TYPE is not blank.")
        } else if (!tableName) {
            alert("Invalid Inputs. Please ensure that the TABLE NAME is not blank.")
        } else if (tableName.trim() === "") {
            alert("Invalid Inputs. Please ensure that the TABLE NAME is not blank.")
        } else if (isRequired.trim() === "") {
            alert("Invalid Inputs. Please ensure that the 'Is Required' is not blank.")
        } else if (!validateColumnInputs()) {
            alert("Invalid Inputs. Please ensure all data points are not blank.")
        } else {
            setTableName(tableName.trim());
            e.preventDefault();
            console.log(inputFields);
            setGenerationLoading(true);
            submitDataEntry(inputFields, rowCount);
        }
    }

    const validateColumnInputs = () => {
        let isInputValid = true;
        for (let i = 0; i < inputFields.length; i++) {
            let colName = inputFields[i]['columnName'];
            let dataType = inputFields[i]['datatype']
            let isReq = inputFields[i]['isRequired']
            if (colName.trim() === "" || dataType.trim() === "" || isReq.trim() === "") {
                isInputValid = false;
                break;
            } else {
                isInputValid = true;
            }
        }
        return isInputValid;
    }

    return (
        <div className={'backdrop'}>
            <Typography align="center" variant="h2" gutterBottom>
                <span style={{ fontStyle: 'italic', color: 'white' }}>FauxData</span> - Random Data Generator
            </Typography>
            <Landing />
            {inputFields.length == 0 && <h3>Click 'Add' to create your first row</h3>}
            <InputLabel id="demo-simple-select-label">Table Name</InputLabel>
            <br />
            <TextField type="text"
                placeholder="Table Name"
                name="tableName"
                onChange={(e) => handleTableNameChange(e)}
                id="outlined-basic"
                label="Table Name"
                variant="outlined"
            />
            <br />
            <br />
            <br />
            <form onSubmit={submit}>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <hr />
                            <br />
                            <h6 className={'datainputrowcount'}>{index + 1}</h6>
                            <TextField className={'datainputrow'} type="text"
                                value={input.columnName}
                                placeholder="Column Name"
                                name="Column Name"
                                onChange={(e) => handleFormChange(index, e)}
                                id="outlined-basic"
                                label="Column Name"
                                variant="filled" />
                            <span className="sep_span"></span>
                            <Select
                                value={input.datatype}
                                name="datatype"
                                displayEmpty
                                onChange={(e) => handleDataTypeChange(index, e)}
                                labelId="demo-simple-select-label"
                                className={'datainputrow'}
                                label="Data Type"
                            >
                                <MenuItem disabled value="">
                                    <em>Data Type</em>
                                </MenuItem>
                                <optgroup label="Identification"></optgroup>
                                <MenuItem value={'Identification Number'}>Identification Number</MenuItem>
                                <MenuItem value={'Username'}>Username</MenuItem>
                                <hr />
                                <optgroup label="Person"></optgroup>
                                <MenuItem value={'First Name'}>First Name</MenuItem>
                                <MenuItem value={'Middle Name'}>Middle Name</MenuItem>
                                <MenuItem value={'Last Name'}>Last Name</MenuItem>
                                <MenuItem value={'Age'}>Age</MenuItem>
                                <MenuItem value={'Gender'}>Gender</MenuItem>
                                <MenuItem value={'Birthday'}>Birthday</MenuItem>
                                <MenuItem value={'Race'}>Race</MenuItem>
                                <MenuItem value={'Marital Status'}>Marital Status</MenuItem>
                                <MenuItem value={'Current Education'}>Current Education</MenuItem>
                                <MenuItem value={'Email'}>Email</MenuItem>
                                <MenuItem value={'Phone Number'}>Phone Number</MenuItem>
                                <hr />
                                <optgroup label="Location"></optgroup>
                                <MenuItem value={'Street'}>Street</MenuItem>
                                <MenuItem value={'City'}>City - US</MenuItem>
                                <MenuItem value={'State'}>State - US</MenuItem>
                                <MenuItem value={'State Abbreviation'}>State Abbreviation - US</MenuItem>
                                <MenuItem value={'Zip Code'}>Zip Code</MenuItem>
                                {/* To implement soon */}
                                {/* <MenuItem value={'Latitude'}>Latitude</MenuItem>
                                <MenuItem value={'Longitude'}>Longitude</MenuItem> */}
                                <hr />
                                <optgroup label="Date - Past"></optgroup>
                                <MenuItem value={'Past Date - Up to 2 Days'}>Past Date - Up to 2 Days</MenuItem>
                                <MenuItem value={'Past Date - Up to 1 Week'}>Past Date - Up to 1 Week</MenuItem>
                                <MenuItem value={'Past Date - Up to 1 Month'}>Past Date - Up to 1 Month</MenuItem>
                                <MenuItem value={'Past Date - Up to 6 Months'}>Past Date - Up to 6 Months</MenuItem>
                                <MenuItem value={'Past Date - Up to 1 Year'}>Past Date - Up to 1 Year</MenuItem>
                                <MenuItem value={'Past Date - Up to 10 Years'}>Past Date - Up to 10 Years</MenuItem>
                                <MenuItem value={'Past Date - Up to 25 Years'}>Past Date - Up to 25 Years</MenuItem>
                                <MenuItem value={'Past Date - Up to 50 Years'}>Past Date - Up to 50 Years</MenuItem>
                                <hr/>
                                <optgroup label="Date - Future"></optgroup>
                                <MenuItem value={'Future Date - Up to 2 Days'}>Future Date - Up to 2 Days</MenuItem>
                                <MenuItem value={'Future Date - Up to 1 Week'}>Future Date - Up to 1 Week</MenuItem>
                                <MenuItem value={'Future Date - Up to 1 Month'}>Future Date - Up to 1 Month</MenuItem>
                                <MenuItem value={'Future Date - Up to 6 Months'}>Future Date - Up to 6 Months</MenuItem>
                                <MenuItem value={'Future Date - Up to 1 Year'}>Future Date - Up to 1 Year</MenuItem>
                                <MenuItem value={'Future Date - Up to 10 Years'}>Future Date - Up to 10 Years</MenuItem>
                                <MenuItem value={'Future Date - Up to 25 Years'}>Future Date - Up to 25 Years</MenuItem>
                                <MenuItem value={'Future Date - Up to 50 Years'}>Future Date - Up to 50 Years</MenuItem>
                                <hr />
                                <optgroup label="Finances"></optgroup>
                                <MenuItem value={'Money - Positive Only'}>Money - Positive Only</MenuItem>
                                <MenuItem value={'Money - Positive/Negative'}>Money - Positive/Negative</MenuItem>
                                <hr />
                                <optgroup label="Numbers"></optgroup>
                                <MenuItem value={'Positive Numbers'}>Positive Numbers</MenuItem>
                                <hr />
                                <optgroup label="Boolean"></optgroup>
                                <MenuItem value={'True'}>True</MenuItem>
                                <MenuItem value={'False'}>False</MenuItem>
                                <MenuItem value={'True/False'}>True/False</MenuItem>
                            </Select>

                            <Select
                                id="isRequired"
                                displayEmpty
                                value={input.isRequired}
                                name="isRequired"
                                onChange={(e) => handleIsRequiredChange(index, e)}
                                className={'datarequiredinput'}
                                label="Required?"
                            >
                                <MenuItem disabled value="">
                                    <em>Required?</em>
                                </MenuItem>
                                <MenuItem value={'Y'}>Yes</MenuItem>
                                <MenuItem value={'N'}>No</MenuItem>
                            </Select>

                            <Button variant="contained" color="error" className={'removeButton'} onClick={() => removeField(index)}>-</Button>
                            <br />
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
                            {/* <MenuItem value={10}>Ten (10)</MenuItem>
                            <MenuItem value={100}>One Hundred (100)</MenuItem> */}
                            <MenuItem value={1000}>One Thousand (1000)</MenuItem>
                            <MenuItem value={10000}>Ten Thousand (10000)</MenuItem>
                            <MenuItem value={50000}>Fifty Thousand (50000)</MenuItem>
                            <MenuItem value={100000}>One Hundred Thousand (100000)</MenuItem>
                            <MenuItem value={500000}>Five Hundred Thousand (500000)</MenuItem>
                            <MenuItem value={1000000}>One Million (1000000)</MenuItem>
                        </Select>
                        <br /><br />
                        <InputLabel id="demo-simple-select-label">Export File Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={fileType}
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
                {generationLoading &&
                    <CircularProgress />
                }
                <br />
                {generationSuccessFul &&
                    <h3 className={'successful_generation'}>Your {fileType} has generated successfully.</h3>
                }
                {
                    generationFailed &&
                    <h3 className={'failed_generation'}>We could not generate your {fileType}. Please contact the IT Department.</h3>
                }
                <br />
            </form>
            <hr />
        </div>
    )
}

export default Generator;