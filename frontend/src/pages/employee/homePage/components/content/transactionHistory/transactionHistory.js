import React, { useState, useEffect } from 'react';
import Title from '../components/title/title';
import DatePicker from 'react-datepicker';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { employeeActions } from '../../../../../../actions/employee/employee';
import { connect } from 'react-redux';

const TransactionHistory = ({ employee, findCustomer, findTransactionHistory }) => {
  const now = new Date().getTime();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);
  const [creditNumber, setCreditNumber] = useState();
  const [name, setName] = useState();
  const [transactions, setTransactions] = useState();

  const handleSearch = () => {
    if(!creditNumber){
      NotificationManager.warning('Vui lòng nhập số tài khoản');
      return
    }
    if(!name){
      NotificationManager.warning('Số tài khoản không chính xác');
      return
    }
    findTransactionHistory(creditNumber)
  };

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate);
    }
  }, [endDate]);

  const checkValidDate = (ts) =>{
    const date = new Date(ts*1000);
    const start = new Date(startDate)
    const end = new Date(endDate)
    if(date.getFullYear()>=start.getFullYear() && date.getFullYear()<=end.getFullYear()){
      if(date.getMonth()>=start.getMonth() && date.getMonth()<=end.getMonth()){
        if(date.getDate()>=start.getDate() && date.getDate()<=end.getDate()){
          return true;
        }
      }
    }
    return false;
  }

  const tsToDate = (ts) => {
    const date = new Date(ts * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatDate = `${day}-${month}-${year}`;
    return formatDate;
  };
  
  const tsToTime = (ts) => {
    const date = new Date(ts * 1000);
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = '0' + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = '0' + date.getSeconds();
    var formattedTime =
      hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  };

  const formatMoney = (money) => {
    const formatedMoney =
      money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + ' VND';
    return formatedMoney;
  };

  useEffect(() => {
    if(employee.findCustomerSuccess === true){
      setName(employee.full_name)
    }
    if (employee.findTransactionHistorySuccess === true){
      const allTransaction = employee.transactionHistory;
      const compose = allTransaction.sendto_history.concat(
        allTransaction.receivefrom_history, allTransaction.deposit_history
      );
      compose.sort((a, b) => a.ts - b.ts);
      const searchTransaction = compose.filter(
        (item) => checkValidDate(item.ts)
      );
      setTransactions(searchTransaction);
    }
  }, [employee])
  return (
    <div className="transacction-history">
      <Title title="Tra cứu lịch sử giao dịch" />
      <div className="mt-5">
        <h5 className="text-success">Lịch sử giao dịch</h5>
        <hr />
        <div className="row col-8 align-items-center">
          <input
            type="text"
            placeholder="Nhập số tài khoản"
            className="form-control col-4"
            onChange={(e) => setCreditNumber(e.target.value)}
            onBlur = {() => findCustomer(creditNumber)}
          />
          <input
            type="text"
            placeholder="Họ tên khách hàng"
            value={name || ''}
            className="form-control col-7 ml-3"
            disabled
          />
        </div>
        <div className="row align-items-center mt-3">
          <DatePicker
            className="col-11 ml-3 form-control"
            placeholderText="Ngày bắt đầu"
            onChange={(date) => setStartDate(date.getTime())}
            selected={startDate}
            dateFormat="dd-MM-yyyy"
          />
          <DatePicker
            className="col-11 ml-3 form-control"
            placeholderText="Ngày kết thúc"
            onChange={(date) => setEndDate(date.getTime())}
            selected={endDate}
            dateFormat="dd-MM-yyyy"
          />
          <button className="btn btn-success ml-4" onClick={handleSearch}>
            Xem lịch sử
          </button>
        </div>
      </div>
      <div>
        <table className="table table-hover mt-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Ngày giao dịch</th>
              <th scope="col">Số ID</th>
              <th scope="col">Loại giao dịch</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
                    transactions.map((item) => (
                      <tr className={item.to_credit_number ? "table-danger" : "table-success"} key={item.transaction_id}>
                        <td>{tsToDate(item.ts)}</td>
                        <td>{item.transaction_id}</td>
                        {item.to_credit_number &&
                        <td><b>Gửi</b></td>}
                        {(item.from_credit_number || item.partner_code !== 'local') &&
                        <td><b>Nhận</b></td>}
                        {!item.to_credit_number && !item.from_credit_number && item.partner_code === 'local' &&
                        <td><b>Nạp tiền</b></td>}
                        <td>{formatMoney(item.amount)}</td>
                        <td className="max-width-desc">
                          {item.message && 
                          <div>
                              <span><b>Tài khoản gửi: </b>{item.to_credit_number ? item.credit_number : item.from_credit_number}</span>
                              <br />
                              <span><b>Tài khoản nhận: </b>{item.to_credit_number ? item.to_credit_number : item.credit_number}</span>
                              <br />
                              <span>
                                <b>Nội dung: </b>{item.message}
                              </span>
                              <br/>
                          </div>}
                          {item.partner_code !== 'local' && 
                          <div>
                            <span><b>Từ: </b>{item.partner_code}</span>
                            <br/>
                          </div>}
                          <span><b>Thời gian: </b>{tsToTime(item.ts)}</span>
                        </td>
                      </tr>
                    ))}
          </tbody>
        </table>
      </div>
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

const mapDispatchToProps = (dispatch) => ({
  findCustomer: (credit_number) =>
    dispatch(employeeActions.findCustomer(credit_number)),
  findTransactionHistory: (credit_number) => dispatch(employeeActions.findTransactionHistory(credit_number))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
