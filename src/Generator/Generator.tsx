import React, { useState } from "react";
import { Button, Col, Container, Table } from "react-bootstrap";
import './Generator.css'
import axios from "axios";

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
        console.log(index)
    }

    const submit = (e: any) => {
        if(rowCount < 10 || rowCount.toString() === '-'){
            alert("Invalid Inputs. Please ensure that the ROW COUNT is not blank.")
        } else if(fileType === "-") {
            alert("Invalid Inputs. Please ensure that the EXPORT FILE TYPE is not blank.")
        } else if(!tableName) {
            alert("Invalid Inputs. Please ensure that the TABLE NAME is not blank.")
        } else if(!validateColumnInputs()){
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
        for(let i =0; i < inputFields.length; i++){
            let colName = inputFields[i]['columnName'];
            let dataType = inputFields[i]['datatype']
            if(colName.trim() === "" || dataType.trim() === "-"){
                isInputValid = false;
                break;
            }else {
                isInputValid = true;
            }
        }
        return isInputValid;
    }

    return (
        <div>
            {inputFields.length == 0 && <h3>Click 'Add' to create your first row</h3>}
            <label>Table Name</label>
            <br/>
            <input className="table_name" id="tableName" type="text" placeholder="Table Name" name="tableName" onChange={(e) => handleTableNameChange(e)}/>
            <br/>
            <label htmlFor="columnName" className="columntitles_name">Column Name</label>
            <label htmlFor="dataType" className="columntitles_datatype">Data Type</label>
            <label htmlFor="isRequired" className="columntitles_required">Is Required?</label>
            <form onSubmit={submit}>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <h6 className={'datainputrowcount'}>{index + 1}</h6>
                            <input className={'datainputrow'}
                                id="columnName"
                                name='columnName'
                                placeholder='Name'
                                value={input.columnName}
                                onChange={(e) => handleFormChange(index, e)}
                            />
                            <select id="dataType" value={input.datatype} name="datatype" onChange={(e) => handleDataTypeChange(index, e)} className={'datainputrow'}>
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
                            </select>
                            <select id="isRequired" defaultValue={"Y"} value={input.isRequired} name="isRequired" onChange={(e) => handleIsRequiredChange(index, e)} className={'datarequiredinput'}>
                                <option>Y</option>
                                <option>N</option>
                            </select>

                            <Button variant="danger" className={'removeButton'} onClick={() => removeField(index)}>-</Button>
                        </div>
                    )
                })}
                <br />
                {inputFields.length != 0
                    &&
                    <div>
                        <label htmlFor={'rowCount'}># of Rows</label>
                        <br />
                        <select name={'rowCount'} className={'datainputrowcount'} value={rowCount} onChange={(e) => handleRowCountChange(e)}>
                            <option>-</option>
                            <option>10</option>
                            <option>100</option>
                            <option>1000</option>
                            <option>10000</option>
                            <option>100000</option>
                            <option>1000000</option>
                        </select>
                        <br />
                        <label htmlFor={'rowCount'}>Export File Type</label>
                        <br />
                        <select className={'datainputfiletype'} value={fileType} onChange={(e) => handleFileTypeChange(e)}>
                            <option>-</option>
                            <option>Excel File</option>
                            <option>MySQL File</option>
                        </select>
                    </div>

                }
                <br />
                <Button variant="secondary" className={'addButton'} onClick={addFields}>+ Add Column</Button><br /><br />
                {inputFields.length > 0 && <Button onClick={submit} className={'submitButton'}>Submit</Button>}
                <br />
            </form>
        </div>
    )
}

export default Generator;