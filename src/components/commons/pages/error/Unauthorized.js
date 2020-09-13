import React from 'react';
import {Button} from "primereact/button";
import {useHistory} from "react-router";

const Unauthorized = () => {

    const history = useHistory();

    return (
        <>
            <h1>UNAUTHORIZED 404</h1>
            <div style={{textAlign: "center", paddingTop: "30%"}}>
                <Button label="Back to home page" icon="pi pi-home" className="p-button-raised" onClick={() => history.push("/voucher-monitoring")}/>
            </div>
        </>
    )

}

export default Unauthorized;