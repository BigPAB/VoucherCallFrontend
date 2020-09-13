import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Redirect, Route, Switch, useHistory, withRouter} from "react-router-dom";
import './App.css';
import RegistrationContainer from "./components/commons/pages/registration/RegistrationContainer";
import LoginContainer from "./components/commons/pages/login/LoginContainer";
import VoucherMonitoringContainer from "./components/modules/voucher/voucher-monitoring/VoucherMonitoringContainer";
import VoucherCallContainer from "./components/modules/voucher/voucher-call/VoucherCallContainer";
import {Button} from "primereact/button";
import Unauthorized from "./components/commons/pages/error/Unauthorized";

function App() {

    const user = sessionStorage.getItem("user");
    const history = useHistory();

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        history.push("/login");
    }

    return (
        <div className={"layout-wrapper layout-static"} >

            <div className="layout-header">
                {user &&
                    <Button label="Log out" icon="pi pi-sign-out" className="p-button-raised sign-out" onClick={handleLogout}/>
                }
            </div>
            <div className="layout-sidebar">
                <div className="layout-menu-container">
                </div>
            </div>
            <div className="layout-main">
                <Switch>
                    <Route exact path="/login" component={LoginContainer} />
                    <Route exact path="/register" component={RegistrationContainer} />
                    <Route exact path="/"  >
                        <Redirect to={"/voucher-monitoring"}/>
                    </Route>
                    <Route exact path="/voucher-monitoring"  >
                        {user ? <VoucherMonitoringContainer/> : <Redirect to={"/login"}/> }
                    </Route>
                    <Route exact path="/voucher-call"  >
                        {user ? (((JSON.parse(user)).profile === "M") ? <VoucherCallContainer/> : <Unauthorized/>) : <Redirect to={"/login"}/> }
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(App);
