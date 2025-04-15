import { InputLabel, Input, FormHelperText, Icon, SvgIcon, ButtonBase } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";


function Emailer(props: { fileName: string; }) {
    const [email, setEmail] = useState('');
    const [emailSentSuccess, setEmailSentSuccess] = useState(false);
    const [emailFailure, setEmailFailure] = useState(false);
    const [enableDownload, setEnableDownload] = useState(true);

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const client = axios.create({
        baseURL: "http://localhost:8080/api/aud/v1/audits"
    })

    const downloadClient = (fileName: string) => {
        return axios.get(
            "http://localhost:8080/api/v1/download/" + fileName, {
            responseType: 'blob',
        });
    }


    const handleFileDownload = async (e: any) => {
        e.preventDefault();
        try {
            const response = await downloadClient(props.fileName);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.setAttribute('download', props.fileName)
            downloadLink.click();
            setEnableDownload(false);
        } catch (error) {
            alert("File download unsuccessful")
            console.log(error)
        }
    }

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email);
    }




    const submitAuditLog = (fileName: string, userEmail: string) => {
        client
            .post('', {
                referenceNo: 'ABC123',
                email: userEmail,
                dateTime: Date.now(),
                fileName: fileName,
                cost: 0.00
            })
            .then((response) => {
                // successfully saved
                setEmailSentSuccess(true);
                setEmailFailure(false);
                console.log(response)
            }).catch(
                function (error) {
                    // error
                    setEmailSentSuccess(false);
                    setEmailFailure(true);
                    console.log(error)
                }
            ).finally(
                function completeAction() {
                    // finally
                }
            )
    }

    // to implement with email
    // const submit = (e: any) => {
    //     if (validateEmail(email)) {
    //         // the email is valid, good to submit
    //         console.log("Valid")
    //         submitAuditLog(props.fileName, email)
    //     } else {
    //         console.log("Invalid")
    //         alert("Invalid email entered. Please double check email address.")
    //     }
    //     e.preventDefault();
    //     console.log(email)
    // }

    return (
        <>
            {/* 
            to implement with email
                <form onSubmit={(e) => submit(e)}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input type={'email'} id="my-input" aria-describedby="my-helper-text" onChange={(e) => handleEmailChange(e)} />
                <Button variant="contained" color="primary" style={{ marginLeft: '1em' }} type={'submit'}>Send File</Button>
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </form>
            {emailSentSuccess && (
                <div>
                    <h2>File sent over to your email.</h2>
                </div>
            )}
            {emailFailure && (
                <div>
                    <h2>Failed to send email.</h2>
                </div>
            )} */}
            <br />
            <form onSubmit={handleFileDownload}>
                <div className="form-group">
                    <label>Download File</label>
                </div>
                <Button type="submit" className="btn btn-primary mt-3"
                disabled={!enableDownload}>
                    <i className="material-icons">download</i><br /> Download
                </Button>
            </form>
        </>
    )

}

export default Emailer;