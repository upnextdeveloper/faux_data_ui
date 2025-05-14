import { InputLabel, Input, FormHelperText, Icon, SvgIcon, ButtonBase } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";


function Downloader(props: { fileName: string; cost: number }) {
    const [enableDownload, setEnableDownload] = useState(true);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    // state to disable the payment button from being used twice in same operation
    const [paymentComplete, setPaymentComplete] = useState(false);

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

    const submitAuditLog = () => {
        client
            .post('', {
                referenceNo: 'ABC123',
                email: '',
                dateTime: Date.now(),
                fileName: props.fileName,
                cost: props.cost
            })
            .then((response) => {
                // successfully saved
                setPaymentSuccessful(true);
                setPaymentComplete(true);
            }).catch(
                function (error) {
                    setPaymentSuccessful(false);
                    setPaymentComplete(false);
                    alert("Payment Not successful. Please try again.")
                }
            )
    }

    return (
        <>
            <br/><br/>
            <form>
                <Button onClick={submitAuditLog} disabled={paymentComplete}>Pay ${props.cost}</Button>
            </form>
            <br />
            {paymentSuccessful &&
                <form onSubmit={handleFileDownload}>
                    <div className="form-group">
                        <label>Download File</label>
                    </div>
                    <Button type="submit" className="btn btn-primary mt-3"
                        disabled={!enableDownload}>
                        <i className="material-icons">download</i><br /> Download
                    </Button>
                </form>}
        </>
    )

}

export default Downloader;