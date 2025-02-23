import React, { useState } from "react";
import { Button, Col, Container, Table } from "react-bootstrap";
import './Generator.css'
import axios from "axios";

function Generator() {

    const [dataEntry, setDataEntry] = useState({})
    const client = axios.create({
        baseURL: "http://localhost:8080/api/v1/entry"
    })

    const submitDataEntry = (inputFields: any, rowCount: number) => {
        client
            .post('', {
                inputFields: inputFields,
                rowCount: rowCount,
                fileType: fileType
            })
            .then((response) => {
                setDataEntry([response.data])
            })
    }

    const [inputFields, setInputFields] = useState([
        { columnName: '', datatype: '', isRequired: 'Y' }
    ])
    const [rowCount, setRowCount] = useState(0)
    const [fileType, setFileType] = useState('')

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
        console.log("row count: " + event.target.value);
    }

    const handleFileTypeChange = (event: any) => {
        setFileType(event.target.value);
        console.log("file type: " + fileType)
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
        e.preventDefault();
        console.log(inputFields);
        submitDataEntry(inputFields, rowCount);
    }

    return (
        <div>
            {inputFields.length == 0 && <h3>Click 'Add' to create your first row</h3>}
            <label htmlFor="columnName" className="columntitles_name">Column Name</label>
            <label htmlFor="columnName" className="columntitles_datatype">Data Type</label>
            <label htmlFor="columnName" className="columntitles_required">Is Required?</label>
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
                            <select value={input.datatype} name="datatype" onChange={(e) => handleDataTypeChange(index, e)} className={'datainputrow'}>
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
                            <select defaultValue={"Y"} value={input.isRequired} name="isRequired" onChange={(e) => handleIsRequiredChange(index, e)} className={'datarequiredinput'}>
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