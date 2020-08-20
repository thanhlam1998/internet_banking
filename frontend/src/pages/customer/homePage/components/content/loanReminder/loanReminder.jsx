import React, { useState, useEffect } from "react";
import Title from "../component/title/title";
import TextMoneyOutput from "../component/textMoneyOutput/textMoneyOutput";
import TextOutput from "../component/textOutput/textOutput";
import TextInput from "../component/textInput/textInput";
import { connect } from "react-redux";
import { bankAccountActions } from "../../../../../../actions/customer/bankAccount";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { transferActions } from "../../../../../../actions/customer/transfer";
import { bankConfig } from "../../../../../../config/bank";
import AddLoanModal from "./components/addDebtModal";
import "./loanReminder.scss";

const LoanReminder = (props) => {
  const {
    bankAccount,
    getBankAccount,
    addDebt,
    deleteDebt,
    getDebt,
    getBeDebt,
    transfer,
    getRemindList,
    transferLocal,
    verifyOtp,
  } = props;
  // const balance = bankAccount.credit_account[0].balance
  const [balance, setBalance] = useState(0);
  const [show, setShow] = useState(false);
  const [remindList, setRemindList] = useState([]);
  const [debt, setDebt] = useState();
  const [beDebt, setBeDebt] = useState();
  const [creditNumber, setCreditNumber] = useState();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState();
  const [item, setItem] = useState();
  const [transactionId, setTransactionId] = useState()

  useEffect(() => {
    getBankAccount();
    getDebt();
    getBeDebt();
    getRemindList();
  }, []);

  useEffect(() => {
    if (transfer.getRemindListSuccess === true) {
      setRemindList(transfer.remindList);
    }
  }, [transfer.getRemindListPending]);

  useEffect(() => {
    if (bankAccount.bankAccountSuccess === true) {
      setBalance(bankAccount.credit_account[0].balance);
      setCreditNumber(bankAccount.credit_account[0].credit_number);
    }
  }, [bankAccount.bankAccountPending]);

  useEffect(() => {
    if (bankAccount.getDebtSuccess === true) {
      setDebt(bankAccount.debt);
    }
  }, [bankAccount.getDebtPending]);

  useEffect(() => {
    if (bankAccount.getBeDebtSuccess === true) {
      setBeDebt(bankAccount.beDebt);
    }
  }, [bankAccount.getBeDebtPending]);

  const handleAddDebtModal = () => {
    setShow(!show);
  };

  const formatMoney = (money) => {
    const formatedMoney =
      money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " VND";
    return formatedMoney;
  };

  useEffect(() => {
    if(transfer.verifyOtpSuccess === true){
      NotificationManager.success("Thanh toán thành công");
      deleteDebt(item.debt_id)
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
    if (transfer.verifyOtpError) {
      NotificationManager.error("Mã OTP không hợp lệ");
    }
  }, [transfer.verifyOtpPending]);

  const handleForSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      NotificationManager.warning("Vui lòng nhập mã OTP");
    }
    verifyOtp(transactionId, otp);
  };

  useEffect(() => {
    if (transfer.transferLocalSuccess === true) {
      setTransactionId(transfer.transactionId)
      setStep(2);
    }
  }, [transfer.transferLocalPending]);

  const handlePay = (item) => {
    setItem(item);
    if (
      balance -
        (parseInt(item.amount) + parseInt(bankConfig.local_transfer_fee)) <
      bankConfig.min_balance
    ) {
      NotificationManager.error("Số tiền của quý khách không đủ để thanh toán");
      return;
    }
    transferLocal(
      item.lender_name,
      creditNumber,
      item.credit_number,
      item.amount,
      "sender",
      "Thanh toán nợ"
    );
  };
  if (step === 1) {
    return (
      <div className="loan-reminder">
        <Title title="THÔNG TIN NHẮC NỢ" />
        <div className="inputContainer mt-4">
          <h5 className="text-success">DANH SÁCH NHẮC NỢ</h5>
          <hr />
        </div>
        <div>
          <div className="row align-items-center">
            <button
              className="btn btn-success ml-4"
              onClick={handleAddDebtModal}>
              Tạo nhắc nợ
            </button>
            <AddLoanModal
              show={show}
              setShow={setShow}
              addDebt={addDebt}
              remindList={remindList}
            />
          </div>
          <h5 className="text-success mt-5">Danh sách nợ chưa thanh toán</h5>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Người nhắc</th>
                <th scope="col">Số tài khoản</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Nội dung</th>
                <th scope="col" className="btn-container"></th>
              </tr>
            </thead>
            <tbody>
              {beDebt &&
                beDebt.map((item) => (
                  <tr key={item.debt_id}>
                    <td>{item.createdAt}</td>
                    <td>{item.lender_name}</td>
                    <td>{item.credit_number}</td>
                    <td>{formatMoney(item.amount)}</td>
                    <td className="max-width-desc">{item.content}</td>
                    <td>
                      <div className="td-button-container">
                        <button
                          className="btn btn-success"
                          onClick={() => handlePay(item)}>
                          Thanh toán
                        </button>
                        <button className="btn btn-danger mt-1">Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5 className="text-success mt-5">Danh sách nhắc nợ</h5>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Người nợ</th>
                <th scope="col">Số tài khoản</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {debt &&
                debt.map((item) => (
                  <tr key={item.debt_id}>
                    <td>{item.createdAt}</td>
                    <td>{item.debtor_name}</td>
                    <td>{item.credit_number}</td>
                    <td>{formatMoney(item.amount)}</td>
                    <td className="max-width-desc">{item.content}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="load-reminder">
        <Title title="XÁc nhận thanh toán" />
        <div className="inputContainer mt-4">
          <h5 className="text-success">Xác nhận bằng mã OTP</h5>
          <hr />
        </div>
        <form onSubmit={handleForSubmit}>
          <TextMoneyOutput title="Số dư khả dụng" money={balance} />
          <div className="mt-5">
            <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
            <hr />
            <TextOutput title="Số tài khoản" text={item.credit_number} />
            <TextOutput title="Tên ngưởi được trả" text={item.lender_name} />
          </div>

          <div className="mt-5">
            <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
            <hr />
            <TextMoneyOutput title="Số tiền trả" money={item.amount} />
            <TextMoneyOutput
              title="Số tiền phí"
              money={bankConfig.local_transfer_fee}
            />
          </div>
          <TextOutput title="Hình thức nhận mã OTP" text="Qua Email" />
          <TextInput
            title="Nhập mã OTP"
            type="number"
            placeholder="Nhập mã OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <h6 className="center-align mt-4 text-danger">
            Mã OTP đã được gửi qua Email của quý khách
          </h6>
          <div className="mt-5 center-align row justify-content-center">
            <button className="btn btn-success" onClick={() => setStep(1)}>
              Trở về
            </button>
            <button className="btn btn-success ml-2" type="submit">
              {props.transfer.verifyOtpPending === true && (
                <i className="fa fa-refresh fa-spin mr-3" />
              )}
              Xác nhận
            </button>
          </div>
        </form>
        <NotificationContainer />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  bankAccount: state.bankAccount,
  transfer: state.transfer,
});

const mapDispatchToProps = (dispatch) => ({
  getBankAccount: () => dispatch(bankAccountActions.getBankAccount()),
  verifyOtp: (id, otp) => dispatch(transferActions.verifyOtp(id, otp)),
  transferLocal: (
    name,
    from_credit_number,
    to_credit_number,
    amount,
    fee_payer,
    message
  ) =>
    dispatch(
      transferActions.transferLocal(
        name,
        from_credit_number,
        to_credit_number,
        amount,
        fee_payer,
        message
      )
    ),
  addDebt: (credit_number, amount, content) =>
    dispatch(bankAccountActions.addDebt(credit_number, amount, content)),
  deleteDebt: (id) => dispatch(bankAccountActions.deleteDebt(id)),
  getDebt: () => dispatch(bankAccountActions.getDebt()),
  getBeDebt: () => dispatch(bankAccountActions.getBeDebt()),
  getRemindList: () => dispatch(transferActions.getRemindList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoanReminder);
