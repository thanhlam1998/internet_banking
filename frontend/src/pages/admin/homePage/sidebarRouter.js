import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import EmployeeList from './components/content/employeeList/employeeList'
import TransactionList from './components/content/transactionList/transactionList'
import PrivateRoute from '../../../PrivateRoute'

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute exact path={`${match.path}`} component={EmployeeList} page="/admin"/>
            <PrivateRoute exact path={`${match.path}/transaction`} component={TransactionList} page="/admin"/>
            <Route exact path={`${match.url}/logout`} render={() => {(window.location = window.location.origin + "/admin")}}/>
        </Switch>
    )
}

export default SidebarRouter
