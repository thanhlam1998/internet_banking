import React, { useState, useEffect } from "react";
import Title from "../component/title/title";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { bankAccountActions } from '../../../../../../actions/customer/bankAccount'


const LoanReminder = (props) => {
  const {bankAccount, getBankAccount} = props;
  // const balance = bankAccount.credit_account[0].balance
  const now = new Date().getTime();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBankAccount()
  }, [])

  useEffect(() => {
    if(bankAccount.bankAccountSuccess === true){
      setBalance(bankAccount.credit_account[0].balance)
    }
  }, [bankAccount.bankAccountPending])

  const [step, setStep] = useState(1);
  const handleSearch = () => {};
  return (
    <div className="contentContainer">
      <Title title="THÔNG TIN NHẮC NỢ" />
      <div className="inputContainer mt-4">
        <h5 className="text-success">DANH SÁCH NHẮC NỢ</h5>
        <hr />
      </div>
      <div>
        <div className="row align-items-center">
          <button className="btn btn-success ml-4" onClick={handleSearch}>
            Tạo nhắc nợ
          </button>
        </div>
        <table className="table table-hover mt-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Người nợ</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {/* {transactions &&
              transactions.map((item) => (
                <tr
                  className={
                    item.to_credit_number ? 'table-danger' : 'table-success'
                  }
                  key={item.transaction_id}>
                  <td>{tsToDate(item.ts)}</td>
                  <td>{item.transaction_id}</td>
                  {item.to_credit_number && (
                    <td>
                      <b>Gửi</b>
                    </td>
                  )}
                  {(item.from_credit_number ||
                    item.partner_code !== 'local') && (
                    <td>
                      <b>Nhận</b>
                    </td>
                  )}
                  {!item.to_credit_number &&
                    !item.from_credit_number &&
                    item.partner_code === 'local' && (
                      <td>
                        <b>Nạp tiền</b>
                      </td>
                    )}
                  <td>{formatMoney(item.amount)}</td>
                  <td className="max-width-desc">
                    {item.message && (
                      <div>
                        <span>
                          <b>Tài khoản gửi: </b>
                          {item.to_credit_number
                            ? item.credit_number
                            : item.from_credit_number}
                        </span>
                        <br />
                        <span>
                          <b>Tài khoản nhận: </b>
                          {item.to_credit_number
                            ? item.to_credit_number
                            : item.credit_number}
                        </span>
                        <br />
                        <span>
                          <b>Nội dung: </b>
                          {item.message}
                        </span>
                        <br />
                      </div>
                    )}
                    {item.partner_code !== 'local' && (
                      <div>
                        <span>
                          <b>Từ: </b>
                          {item.partner_code}
                        </span>
                        <br />
                      </div>
                    )}
                    <span>
                      <b>Thời gian: </b>
                      {tsToTime(item.ts)}
                    </span>
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </div>
      <div>
        <table className="table table-hover mt-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Người nhắc nợ</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Nội dung</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    bankAccount: state.bankAccount
})

const mapDispatchToProps = dispatch => ({
  getBankAccount: () => dispatch(bankAccountActions.getBankAccount())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoanReminder);
