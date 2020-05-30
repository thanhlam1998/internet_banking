import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import './sidebar.scss'

const SideBar = ({match}) => {
    const Services = [
        {name: 'Danh sách tài khoản', url: `${match.url}/bankaccount`},
        {name: 'Chuyển tiền trong KiantoBank', url: `${match.url}/transfer/kiantobank`},
        {name: 'Chuyển tiền đến ngân hàng khác', url: `${match.url}/transfer/otherbank`},
        {name: 'Lịch sử giao dịch', url: `${match.url}/history`},
        {name: 'Quản lý nhắc nợ', url: `${match.url}/loan-reminder`},
    ]
    
    const Account = [
        {name: 'Thông tin cá nhân', url: `${match.url}/account-info`},
        {name: 'Cài đặt người hưởng', url: `${match.url}/receiver`},
        {name: 'Đổi mật khẩu', url: `${match.url}/change-password`},
        {name: 'Thoát', url: `${match.url}/logout`},
    ]

    let servicesComponents = Services.map((item, index) => {
        return(
            <div key={index}>
            <li className={'nav'}>
                <NavLink className='navLink' activeClassName={'activeNavLink'} to={item.url}>> {item.name}</NavLink>
            </li>
            <hr/>
            </div>
        )
    })

    let accountComponents = Account.map((item, index) => {
        return(
            <div key={index}>
            <li className={'nav'}>
                <NavLink className='navLink' activeClassName={'activeNavLink'} to={item.url}>> {item.name}</NavLink>
            </li>
            <hr/>
            </div>
        )
    })
    return (
        <div className = "sideBarContainer">
            <div className='leftNavContainer card'>
                <div className="title">
                    <span className="text-white font-weight-bold">DỊCH VỤ</span>
                </div>
                <ul>
                    {servicesComponents}
                </ul>
            </div>
            <div className='leftNavContainer card'>
                <div className="title">
                    <span className="text-white font-weight-bold">iB@NKING CỦA TÔI</span>
                </div>
                <ul>
                    {accountComponents}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(SideBar)
