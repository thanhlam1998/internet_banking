import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import TextInput from "../../component/textInput/textInput";
import InputWithSearch from "../../transfer/component/inputWithSearch/inputWithSearch";
import { transferActions } from "../../../../../../../actions/customer/transfer";
import TransferInformation from "./transferInformation/transferInformation";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "./addDebtModal.scss";
import { connect } from "react-redux";

const RemindListModal = (props) => {
  const { transfer, findReceiver, addDebt, bankAccount } = props;
  const [creditNumber, setCreditNumber] = useState();
  const [tenTaiKhoan, setTenTaiKhoan] = useState();
  const [soTien, setSoTien] = useState();
  const [soTaiKhoan, setSoTaiKhoan] = useState();
  const [noiDung, setNoiDung] = useState();
  const handleClose = () => {
    setSoTien()
    setSoTaiKhoan()
    setTenTaiKhoan()
    props.setShow(false);
  };

  useEffect(() => {
    if (transfer.findReceiverSuccess === true) {
      setTenTaiKhoan(transfer.full_name);
    }
  }, [transfer.findReceiverPending]);

  useEffect(() => {
    if(bankAccount.addDebtSuccess === true){
      NotificationManager.success("Tạo nhắc nợ thành công")
      setTimeout(function(){
        props.setShow(false);
      }, 2500)   
    }
  }, [bankAccount.addDebtPending])

  const handleCreate = () => {
    if (transfer.findReceiverPending === true) {
      return;
    }
    if (!tenTaiKhoan) {
      NotificationManager.warning("Vui lòng nhập số tài khoản chính xác");
      return;
    }
    if (!soTien) {
      NotificationManager.warning("Vui lòng nhập số tiền nhắc nợ");
      return;
    }
    addDebt(soTaiKhoan, soTien, noiDung)
  };

  const handleOnRemindListChange = (e) => {
    const { value } = e.target;
    setSoTaiKhoan(value);
    findReceiver(value);
  };

  return (
    <Modal show={props.show} onHide={handleClose} className="modal-custom">
      <Modal.Header closeButton>
        <Modal.Title>Tạo nhắc nợ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputWithSearch
            title="Tìm kiếm"
            items={props.remindList}
            onBlur={(e) => handleOnRemindListChange(e)}
          />
          <TextInput
            title="Số tài khoản*"
            placeholder="Nhập số tài khoản"
            value={soTaiKhoan}
            onBlur={() => findReceiver(soTaiKhoan)}
            onChange={(e) => setSoTaiKhoan(e.target.value)}
          />
          <TextInput
            title="Chủ tài khoản*"
            value={tenTaiKhoan}
            disabled={true}
          />
        </div>
        <TransferInformation
          soTien={soTien}
          setSoTien={setSoTien}
          noiDung={noiDung}
          setNoiDung={setNoiDung}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleCreate}>
          Tạo
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Hủy bỏ
        </button>
      </Modal.Footer>
      <NotificationContainer />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  transfer: state.transfer,
  bankAccount: state.bankAccount,
});

const mapDispatchToProps = (dispatch) => ({
  findReceiver: (credit_number) =>
    dispatch(transferActions.findReceiver(credit_number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RemindListModal);
