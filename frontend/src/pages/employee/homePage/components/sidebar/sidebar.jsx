import React from 'react';
import './sidebar.scss';
import {NavLink, useRouteMatch} from 'react-router-dom'
import './sidebar.scss'

const Sidebar = () => {
  const match = useRouteMatch()
  const SideBarList = [
    {name: 'Tra cứu tài khoản', url: `${match.path}/searchAccount`},
    {name: 'Tạo tài khoản', url: `${match.path}/createAccount`},
    {name: 'Nạp tiền', url: `${match.path}/addMoney`},
    {name: 'Xem lịch sử giao dịch', url: `${match.path}/history`},
    {name: 'Thoát', url: `${match.path}/logout`},
  ]

  let SideBarComponent = SideBarList.map((item, index) => {
    return(
      <NavLink to={item.url} className="list-group-item list-group-item-action bg-light navLink" activeClassName='activeNavLink'>
        {item.name}
      </NavLink>
    )
  })
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading bg-success text-white font-weight-bolder center-align"><a className="text-white" href={match.path}>GIAO DỊCH VIÊN</a></div>
      <div className="list-group list-group-flush">
      {SideBarComponent}
      </div>
    </div>
  );
};

export default Sidebar;