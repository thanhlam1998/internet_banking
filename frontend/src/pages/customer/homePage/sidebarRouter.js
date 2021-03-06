import React from 'react'
import { useRouteMatch, Switch, Route, useLocation, Redirect } from 'react-router-dom'
import BankAccount from './components/content/bankAccount/bankAccount'
import TransferLocal from './components/content/transfer/transferLocal/transferLocal'
import TransferAbroad from './components/content/transfer/transferAbroad/transferAbroad'
import TransferHistory from './components/content/transferHistory/transferHistory'
import ChangePassword from './components/content/changePassword/changePassword'
import Receiver from './components/content/receiver/receiver'
import PrivateRoute from '../../../PrivateRoute'
import LoanReminder from './components/content/loanReminder/loanReminder'

const Router = () => {
    let match = useRouteMatch();
    return (
        <Switch>    
            <Redirect exact from={`${match.path}`}  to={`${match.path}/bankaccount`}/>}/>
            <PrivateRoute exact path={`${match.url}/bankaccount`} component={BankAccount}/>
            <PrivateRoute exact path={`${match.url}/transfer/kiantobank`} component={TransferLocal}/>
            <PrivateRoute exact path={`${match.url}/transfer/otherbank`} component={TransferAbroad}/>
            <PrivateRoute exact path={`${match.url}/loan-reminder`} component={LoanReminder}/>
            <PrivateRoute exact path={`${match.url}/history`} component={TransferHistory}/>
            <PrivateRoute exact path={`${match.url}/receiver`} component={Receiver}/>
            <PrivateRoute exact path={`${match.url}/change-password`} component={ChangePassword}/>

            {/* <Route exact path={`${match.url}/bankaccount`} component={BankAccount}/>
            <Route exact path={`${match.url}/transfer/kiantobank`} component={TransferLocal}/>
            <Route exact path={`${match.url}/transfer/otherbank`} component={TransferAbroad}/>
            <Route exact path={`${match.url}/loan-reminder`} component={LoanReminder}/>
            <Route exact path={`${match.url}/history`} component={TransferHistory}/>
            <Route exact path={`${match.url}/receiver`} component={Receiver}/>
            <Route exact path={`${match.url}/change-password`} component={ChangePassword}/> */}
            <Route exact path={`${match.url}/logout`} render={() => {(window.location = window.location.origin)}}/>
        </Switch>
    )
}

export default Router
