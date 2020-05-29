import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import './menu.scss';

const Menu = ({ match }) => {
    const [isBankDropdown, setIsBankDropDown] = useState(false);
    const [isTransferDropdown, setIsTransferDropDown] = useState(false);
    const [isReminderDropdown, setIsReminderDropDown] = useState(false);
    const [isAccountDropdown, setIsAccountDropDown] = useState(false);
  return (
    <nav className="custom-navbar navbar-expand navbar-light bg-color w-100 justify-content-center">
      <a className href={`${match.url}`}>
        <img
          src="/assets/home_icon.svg"
          width="25"
          height="25"
          alt=""
          loading="lazy"
        />
      </a>
      <div className="nav-dropdown-bound"
        onMouseEnter={() => setIsBankDropDown(true)}
        onMouseLeave={() => setIsBankDropDown(false)}>
        <NavDropdown
            title={<span className="text-white divider-vertical">Thông tin tài khoản/ thẻ</span>}
            id="basic-nav-dropdown"
            show={isBankDropdown} >
            <NavDropdown.Item href={`${match.url}/bankaccount`}>Danh sách tài khoản</NavDropdown.Item>
            <NavDropdown.Item href={`${match.url}/history`}>Lịch sử giao dịch</NavDropdown.Item>
        </NavDropdown>
      </div>

        <div className="nav-dropdown-bound"
            onMouseEnter={() => setIsTransferDropDown(true)}
            onMouseLeave={() => setIsTransferDropDown(false)}>
            <NavDropdown
                title={<span className="text-white divider-vertical">Chuyển tiền</span>}
                id="basic-nav-dropdown"
                show={isTransferDropdown}>
                <NavDropdown.Item href={`${match.url}/transfer/kiantobank`}>Chuyển tiền trong Kiantobank</NavDropdown.Item>
                <NavDropdown.Item href={`${match.url}/transfer/otherbank`}>Chuyển tiền đến ngân hàng khác</NavDropdown.Item>
            </NavDropdown>
        </div>
        <div className="nav-dropdown-bound"
            onMouseEnter={() => setIsReminderDropDown(true)}
            onMouseLeave={() => setIsReminderDropDown(false)}>
            <NavDropdown
                title={<span className="text-white divider-vertical">Nhắc nợ</span>}
                id="basic-nav-dropdown"
                show={isReminderDropdown}>
                <NavDropdown.Item href={`${match.url}/reminder`}>Quản lý nhắc nợ</NavDropdown.Item>
            </NavDropdown>
        </div>
        <div className="nav-dropdown-bound"
            onMouseEnter={() => setIsAccountDropDown(true)}
            onMouseLeave={() => setIsAccountDropDown(false)}>
            <NavDropdown
                title={<span className="text-white divider-vertical">Tài khoản</span>}
                id="basic-nav-dropdown"
                show={isAccountDropdown}>
                <NavDropdown.Item href={`${match.url}/account-info`}>Thông tin cá nhân</NavDropdown.Item>
                <NavDropdown.Item href={`${match.url}/change-password`}>Đổi mật khẩu</NavDropdown.Item>
                <NavDropdown.Item href={`${match.url}/logout`}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
        </div>
    </nav>
  );
}

export default withRouter(Menu);
