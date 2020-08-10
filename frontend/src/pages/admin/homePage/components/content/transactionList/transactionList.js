import React, { useState, useEffect } from "react";
import Title from "../components/title/title";
import "./transactionList.scss";
import {AdminActions} from '../../../../../../actions/admin/admin'
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

const TransactionList = ({admin, getTransactionList}) => {
  const now = new Date().getTime()
  const [startDate, setStartDate] = useState(now)
  const [endDate, setEndDate] = useState(now)
  const [transactionList, setTransactionList] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [bank, setBank] = useState("all");
  const [transferMoney, setTransferMoney] = useState(0);
  const [receivedMoney, setReceivedMoney] = useState(0)
  var receive = 0
  var send = 0

  useEffect(() => {
    getTransactionList()
  }, [])

  useEffect(() => {
    
    if(bank !== "all")
    { 
      const newList = transactionData.filter(item => item.partner_code === bank)
      newList.map(item => {
        if(item.from_credit_number){
          receive += item.amount
        }
        if(item.to_credit_number){
          send += item.amount
        }
      })
      setTransactionList(newList)
    } else {
      transactionData.map(item => {
        if(item.from_credit_number){
          receive += item.amount
        }
        if(item.to_credit_number){
          send += item.amount
        }
      })
      setTransactionList(transactionData)
    }
    setTransferMoney(send)
    setReceivedMoney(receive)
  }, [bank])

  useEffect(() => {
    if(admin.getTransactionListSuccess === true){
      const allTransaction = admin.transactionList;
      const compose = allTransaction.sent_to_transaction_history.concat(
        allTransaction.receive_from_transaction_history
      );
      compose.map(item => {
        if(item.from_credit_number){
          receive += item.amount
        }
        if(item.to_credit_number){
          send += item.amount
        }
      })
      setTransferMoney(send)
      setReceivedMoney(receive)
      compose.sort((a, b) => a.ts - b.ts);
      setTransactionList(compose)
      setTransactionData(compose)
    }
  }, [admin])

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    // const date = new Date(endDate)
    // date.setHours(0,0,0,0)
    // setEndDate(date)
    if (startDate > endDate) {
      setStartDate(endDate);
    }
  }, [endDate]);

  const tsToDate = (ts) => {
    const date = new Date(ts*1000)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatDate = `${day}-${month}-${year}`
    return formatDate
  }

  const formatMoney = (money) => {
    const formatedMoney = money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  + " VND"
    return formatedMoney
  }

  return (
    <div className="transaction">
      <Title title="Danh sách giao dịch" />
      <div className="mt-5 transaction-content">
        <div className="filter">
          <div className="mr-5">
            <select className="form-control" onChange={e => setBank(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="bankdbb">BankDbb</option>
              <option value="nanibank">NaniBank</option>
            </select>
          </div>
          <DatePicker
            className="form-control"
            placeholderText="Ngày bắt đầu"
            onChange={(date) => setStartDate(date.getTime())}
            selected={startDate}
            dateFormat="dd-MM-yyyy"
          />
            <DatePicker
              className="form-control"
              placeholderText="Ngày kết thúc"
              onChange={(date) => setEndDate(date.getTime())}
              selected={endDate}
              dateFormat="dd-MM-yyyy"
            />
          <button className="btn btn-success ml-5">Thống kê</button>
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
              <th scope="col">Tên ngân hàng</th>
            </tr>
          </thead>
          <tbody>
            {transactionList &&
              transactionList.map((item) => (
                <tr className={item.to_credit_number ? "table-danger" : "table-success"} key={item.transaction_id}>
                  <td>{tsToDate(item.ts)}</td>
                  <td>{item.transaction_id}</td>
                  {item.to_credit_number &&
                  <td><b>Gửi</b></td>}
                  {item.from_credit_number &&
                  <td><b>Nhận</b></td>}
                  <td>{formatMoney(item.amount)}</td>
                  <td className="max-width-desc">
                    {item.partner_code}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="money-transfer">
            <p>Tổng tiền giao dịch: <strong>{formatMoney(transferMoney)}</strong></p>
            <p>Tổng tiền thu vào: <strong>{formatMoney(receivedMoney)}</strong></p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.admin
})

const mapDispatchToProps = dispatch => ({
  getTransactionList: () => dispatch(AdminActions.getTransactionList()),
})


export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
