import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Content from './components/content/content'
import EmployeeList from './components/content/employeeList/employeeList'
import PrivateRoute from '../../../PrivateRoute'

const SidebarRouter = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute exact path={`${match.path}`} component={EmployeeList} page="/admin"/>
            <Route exact path={`${match.url}/logout`} render={() => {(window.location = window.location.origin + "/admin")}}/>
        </Switch>
    )
}

export default SidebarRouter
