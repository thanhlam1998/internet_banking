import React, { useState, useEffect } from 'react';
import Title from '../components/title/title';
import TextInput from '../components/textInput/textInput';
import TextMoneyInput from '../components/textMoneyInput/textMoneyInput';
import { employeeActions } from '../../../../../../actions/employee/employee';
import {
    NotificationManager,
    NotificationContainer,
  } from 'react-notifications';
import { connect } from 'react-redux';

const AddMoneyToAccount = ({employee, findCustomer, addMoneyToCustomer}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!creditNumber){
          NotificationManager.warning('Vui lòng nhập số tài khoản');
          return;
        }
        if(!name){
          NotificationManager.warning('Vui lòng nhập chính xác số tài khoản');
          return;
        }
        if(!money){
          NotificationManager.warning('Vui lòng nhập số tiền nạp');
          return;
        }
        if(!confirmMoney){
          NotificationManager.warning('Vui lòng nhập xác nhận số tiền nạp');
          return;
        }
        if(money !== confirmMoney){
          NotificationManager.warning('Số tiền nạp không trùng khớp');
          return;
        }
        addMoneyToCustomer(creditNumber, money)
    }
    const [creditNumber, setCreditNumber] = useState();
    const [name, setName] = useState('')
    const [money, setMoney] = useState();
    const [confirmMoney, setConfirmMoney] = useState();

  useEffect(() => {
    if(employee.findCustomerSuccess === true){
      setName(employee.full_name)
    }
    if(employee.addMoneyToCustomerSuccess === true){
      NotificationManager.success('Nạp tiền thành công');
      setTimeout(function(){
        window.location.reload();
      }, 2000)
    }
    if(employee.addMoneyToCustomerErro){
      NotificationManager.error('Có lỗi xảy ra vui lòng thử lại sau');
    }
  }, [employee])

  return (
    <div className="add-money-to-acount">
      <Title title="Nạp tiền vào tài khoản" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mt-5">
          <h5 className="text-success">Thông tin khách hàng</h5>
          <hr />
          <TextInput
            title="Số tài khoản"
            autoFocus
            placeholder="Nhập số tài khoản"
            type="text"
            onChange={(e) => setCreditNumber(e.target.value)}
            onBlur = {() => findCustomer(creditNumber)}
          />
          <TextInput
            title="Tên khách hàng"
            placeholder="Tên khách hàng"
            disabled
            value={name}
          />
        </div>
        <div className="mt-5">
          <h5 className="text-success">Thông tin nạp</h5>
          <hr />
          <TextMoneyInput title="Số tiền cần nạp" soTien={money} setSoTien={setMoney}/>
          <TextMoneyInput title="Nhập lại số tiền cần nạp" soTien={confirmMoney} setSoTien={setConfirmMoney}/>
        </div>
        <div className="mt-5 center-align">
          <button className="btn btn-success float-center" type="submit">
            Nạp tiền
          </button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

const mapDispatchToProps = (dispatch) => ({
  findCustomer: (credit_number) => dispatch(employeeActions.findCustomer(credit_number)),
  addMoneyToCustomer: (credit_number, amount) => dispatch(employeeActions.addMoneyToCustomer(credit_number, amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMoneyToAccount);
