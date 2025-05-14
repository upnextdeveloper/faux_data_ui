import React, { useState } from "react";
import './Generator.css'
import axios from "axios";
import { Box, Button, CircularProgress, colors, Divider, FormHelperText, Input, InputLabel, List, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import Landing from "../Landing/Landing";
import { saveAs } from "file-saver"
import Downloader from "../Downloader/Downloader";

function Generator() {

    // states
    const [dataEntry, setDataEntry] = useState({});
    const [tableName, setTableName] = useState('');
    const [isRequired, setisRequired] = useState('');
    const [inputFields, setInputFields] = useState([
        { columnName: '', datatype: '', isRequired: '' }
    ])
    const [rowCount, setRowCount] = useState(0);
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');
    const [cost, setCost] = useState(0.00);
    const [generationLoading, setGenerationLoading] = useState(false);
    const [generationSuccessFul, setGenerationSuccessFul] = useState(false);
    const [generationFailed, setGenerationFailed] = useState(false);

    const localFauxDataLocation = "C:\\Programming_Projects\\my_projects\\faux_data_app\\faux_data_files\\";

    const client = axios.create({
        baseURL: "http://localhost:8080/api/v1/entry"
    })

    const FILETYPE = {
        excel: 'Excel File',
        MySQL: 'MySQL File'

    }

    const ROWCOUNT = {
        thousand: 1000,
        tenthousand: 10000,
        fifthousand: 50000,
        hunthousand: 100000,
        fivehunthousand: 500000,
        million: 1000000
    }

    const submitDataEntry = (inputFields: any, rowCount: number) => {
        client
            .post('', {
                inputFields: inputFields,
                rowCount: rowCount,
                fileType: fileType,
                tableName: tableName,
                fileName: createFileName()
            })
            .then((response) => {
                setDataEntry([response.data])
                setGenerationSuccessFul(true);
                setGenerationFailed(false);
                calculateCost(fileType, rowCount);
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

    const calculateCost = (fileType: String, rowCount: Number) => {
        let cost = 0;
        if (fileType == FILETYPE.MySQL) {
            cost = cost + 0.10
        } else if (fileType == FILETYPE.excel) {
            cost = cost + 0.15
        }

        if (rowCount == ROWCOUNT.thousand) {
            cost = cost + 1.99
        } else if (rowCount == ROWCOUNT.tenthousand) {
            cost = cost + 3.99
        } else if (rowCount == ROWCOUNT.fifthousand) {
            cost = cost + 5.99
        } else if (rowCount == ROWCOUNT.hunthousand) {
            cost = cost + 7.99
        } else if (rowCount == ROWCOUNT.fivehunthousand) {
            cost = cost + 9.99
        } else if (rowCount == ROWCOUNT.million) {
            cost = cost + 11.99
        }

        cost = Math.round(cost * 100) / 100

        setCost(cost);

    }

    const handleFormChange = (index: any, event: any) => {
        let data = [...inputFields];
        data[index].columnName = event.target.value;
        setInputFields(data);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
    }

    const handleDataTypeChange = (index: any, event: any) => {
        let data = [...inputFields];
        data[index].datatype = event.target.value;
        setInputFields(data);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
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
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
    }

    const handleRowCountChange = (event: any) => {
        setRowCount(event.target.value);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
    }

    const handleFileTypeChange = (event: any) => {
        setFileType(event.target.value);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
    }

    const handleTableNameChange = (event: any) => {
        setTableName(event.target.value);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
    }

    const addFields = () => {
        let newField = { columnName: '', datatype: '', isRequired: '' };
        setInputFields([...inputFields, newField]);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
    }

    const removeField = (index: number) => {
        let newField = [...inputFields];
        newField.splice(index, 1);
        setInputFields(newField);
        setGenerationFailed(false);
        setGenerationSuccessFul(false);
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
            createFileName();
            e.preventDefault();
            console.log(inputFields);
            setGenerationLoading(true);
            submitDataEntry(inputFields, rowCount);
        }
    }

    const createFileName = () => {
        let file: string = '';
        let extension: string = '';
        if (fileType.includes("Excel")) {
            file = "EXCEL-SHEET";
            extension = "xlsx"
        } else if (fileType.includes("MySQL")) {
            file = "MySQL";
            extension = "sql"
        }
        let currentMillesconds = Date.now();
        currentMillesconds = currentMillesconds + Math.floor(Math.random() * (1000 - 1 + 1) + 1)

        const generatedFileName = ("faux-data-" + tableName + "_" + file + "_" + currentMillesconds.toString() + "." + extension);
        setFileName(generatedFileName);
        return generatedFileName;
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
        <>
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
                                    <optgroup label="Dates"></optgroup>
                                    <MenuItem value={'Past Date - Up to 2 Days'}>Past Date - Up to 2 Days</MenuItem>
                                    <MenuItem value={'Past Date - Up to 1 Week'}>Past Date - Up to 1 Week</MenuItem>
                                    <MenuItem value={'Past Date - Up to 1 Month'}>Past Date - Up to 1 Month</MenuItem>
                                    <MenuItem value={'Past Date - Up to 6 Months'}>Past Date - Up to 6 Months</MenuItem>
                                    <MenuItem value={'Past Date - Up to 1 Year'}>Past Date - Up to 1 Year</MenuItem>
                                    <MenuItem value={'Past Date - Up to 10 Years'}>Past Date - Up to 10 Years</MenuItem>
                                    <MenuItem value={'Past Date - Up to 25 Years'}>Past Date - Up to 25 Years</MenuItem>
                                    <MenuItem value={'Past Date - Up to 50 Years'}>Past Date - Up to 50 Years</MenuItem>
                                    {/* <MenuItem value={'Present Day'}>Present Day</MenuItem> */}
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

                                    {/* // need to implement below */}
                                    {/* <MenuItem value={'CCNumber'}>Credit Card Number</MenuItem>
                                <MenuItem value={'CCExpDate'}>Credit Card Exp Date</MenuItem>
                                <MenuItem value={'BIC'}>BIC</MenuItem>
                                <MenuItem value={"CreditScore"}>Credit Score</MenuItem>
                                <MenuItem>Stock Name</MenuItem>
                                <MenuItem>Stock Price</MenuItem>
                                <MenuItem>Stock Symbol</MenuItem>
                                <hr />
                                <optgroup label="Financial Transactions"></optgroup>
                                <MenuItem>Type (Deposit/Withdrawl)</MenuItem>
                                <MenuItem>Account Type</MenuItem>
                                <MenuItem>Purchase Category</MenuItem>
                                <MenuItem>Payment Method</MenuItem>
                                <MenuItem>Transaction Note</MenuItem>
                                <MenuItem>Account Name</MenuItem>
                                <MenuItem>Bank Name</MenuItem>
                                <MenuItem>Interest Rate</MenuItem>
                                <hr/> */}
                                    <optgroup label="Numbers"></optgroup>
                                    <MenuItem value={'Positive Numbers'}>Positive Numbers (0-10000000)</MenuItem>
                                    {/* <MenuItem value={'Negative Numbers'}>Negative Numbers (-10000000-10000000)</MenuItem>
                                <MenuItem value={'Pos/Neg Numbers'}>Pos/Neg Numbers</MenuItem>
                                <MenuItem value={'Zero'}>Zero</MenuItem>
                                <MenuItem value={'0to10'}>Number 0 - 10</MenuItem>
                                <MenuItem value={'0to100'}>Number 0 - 100</MenuItem>
                                <MenuItem value={'0to1000'}>Number 0 - 1000</MenuItem>
                                <MenuItem value={'0to10000'}>Number 0 - 10000</MenuItem>
                                <MenuItem value={'6 Digit Numbers'}>6 Digit Number</MenuItem>
                                <MenuItem value={'7 Digit Numbers'}>7 Digit Number</MenuItem>
                                <MenuItem value={'8 Digit Numbers'}>8 Digit Number</MenuItem>
                                <MenuItem value={'9 Digit Numbers'}>9 Digit Number</MenuItem>
                                <MenuItem value={'10 Digit Numbers'}>10 Digit Number</MenuItem>
                                <MenuItem value={'AlphaNumeric'}>AlphaNumeric</MenuItem> */}
                                    <hr />
                                    {/* <optgroup label="Medical"></optgroup>
                                <MenuItem>Insurance Name</MenuItem>
                                <MenuItem>Policy Number</MenuItem>
                                <MenuItem>Doctor Specialization</MenuItem>
                                <MenuItem>Reason for Visit</MenuItem>
                                <MenuItem>Medication Name</MenuItem>
                                <MenuItem>Medical Dosage</MenuItem>
                                <MenuItem>Diagnosis</MenuItem>
                                <MenuItem>Test Result</MenuItem>
                                <MenuItem>Hospital Role</MenuItem>
                                <MenuItem>Appointment Status</MenuItem>
                                <hr /> */}
                                    <optgroup label="Boolean"></optgroup>
                                    {/* <MenuItem value={'True'}>True</MenuItem>
                                <MenuItem value={'False'}>False</MenuItem> */}
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
                                {/* <label>is required</label>
                            <Switch defaultChecked /> */}

                                <Button variant="contained" color="error" className={'removeButton'} onClick={() => removeField(index)}>X</Button>
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
                                <MenuItem value={'JSON File'}>JSON File</MenuItem>
                                <MenuItem value={'XML File'}>XML File</MenuItem>
                            </Select>
                        </div>

                    }
                    <br />
                    {inputFields.length > 0 && <>
                        <Button variant="contained" color="success" onClick={submit} className={'submitButton'}>
                            <i className="material-icons">play_arrow</i>
                            Generate
                        </Button>
                    </>}
                    <br />
                </form>
                <br />
                {generationLoading &&
                    <>
                        <CircularProgress />
                        <h4 style={{ color: 'yellow' }}>File is generating. Please do not refresh your browser.</h4>

                    </>
                }
                <br />
                {generationSuccessFul &&
                    <>
                        <h3 className={'successful_generation'}>Your {fileType} has generated successfully.</h3>
                        {/* <Button onClick={() => console.log("File name: " + fileName)}>File Name</Button>
                        <br/> */}
                        <Downloader fileName={fileName} cost={cost} />
                    </>
                }
                {
                    generationFailed &&
                    <h3 className={'failed_generation'}>We could not generate your {fileType}. Please contact the IT Department.</h3>
                }
                <br />
                <hr />
            </div>
        </>
    )
}

export default Generator;