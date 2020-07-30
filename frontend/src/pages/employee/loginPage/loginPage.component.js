import React from 'react'
import HeaderHomePage from './components/header/header' 
import LoginForm from '../../../components/loginForm/loginForm' 
import {employeeActions} from '../../../actions/employee/employee'
import './loginPage.component.scss'
import { connect } from 'react-redux'

const employeeLoginPage = ({employee, login, refreshToken}) => {
    return (
        <div className="emp-login-page">
            <HeaderHomePage/>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-6"></div>
                    <div className="col-md-auto mt-5">
                        <LoginForm login={login} user={employee} refreshToken = {refreshToken}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    employee: state.employee
})

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(employeeActions.login(username, password)),
    refreshToken: () => dispatch(employeeActions.refreshAccessToken()),
})


export default connect(mapStateToProps, mapDispatchToProps)(employeeLoginPage)
