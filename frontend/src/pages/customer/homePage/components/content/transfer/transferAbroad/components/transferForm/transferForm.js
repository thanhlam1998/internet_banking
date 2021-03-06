import React, { useState, useEffect } from 'react';
import SenderInformation from '../../../component/senderInformation/senderInformation';
import TransferInformation from '../../../component/transferInformation/transferInformation';
import InputWithSearch from '../../../component/inputWithSearch/inputWithSearch';
import TextInput from '../../../../component/textInput/textInput';
import { transferActions } from '../../../../../../../../../actions/customer/transfer';
import {bankConfig} from '../../../../../../../../../config/bank'

import './transferForm.scss';
import CheckBox from '../../../../component/checkBox/checkBox';
import { connect } from 'react-redux';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import SelectInput from '../../../../component/selectInput/selectInput';
import {partnerBank} from '../../../../../../../../../config/bank'

const TransferForm = (props) => {
  const credit_account = props.bankAccount.credit_account[0];
  const SoTK = [credit_account.credit_number];
  const phiChuyenTien = [props.sender, props.receiver];
  const money = credit_account.balance;
  const [remindList, setRemindList] = useState([]);
  const banks = partnerBank.map(item => item.name)

  useEffect(() => {
    props.setTenNganHang(banks[0])
  }, [])

  const handleOnChangeBank = () => {
    if(props.soTaiKhoan) {
      if(props.tenNganHang == "NaniBank" || props.tenNganHang == "N42"){
        props.findReceiver(props.soTaiKhoan, props.tenNganHang)
      } else {
        props.findReceiver(props.soTaiKhoan, props.tenNganHang.toLowerCase())
      }
    }
  }

  useEffect(() => {
    if (props.transfer.findReceiverError && props.soTaiKhoan) {
      NotificationManager.error('Không tìm thấy tài khoản thẻ');
    }
    if (!props.soTaiKhoan || props.transfer.findReceiverError) {
      props.setTenNguoiHuong();
    }
    if (props.transfer.findReceiverSuccess === true) {
      props.setTenNguoiHuong(props.transfer.full_name);
    }
    if (props.transfer.getRemindListSuccess === true) {
      setRemindList(props.transfer.remindList);
    }
    if(props.transfer.transferInterSuccess === true && props.transfer.onChangedState === true){
      props.transfer.onChangedState = false
      props.setStep(2);
    }
    if(props.transfer.transferInterError){
      NotificationManager.error('Đã có lỗi xảy ra, vui lòng thử lại sau ít phút');
    }
  }, [props.transfer]);

  const handleOnRemindListChange = (e) => {
    props.setSoTaiKhoan(e.target.value);
  };

  const handleForSubmit = (e) => {
    if (props.transfer.findReceiverPending === true) {
      return;
    }
    if(!props.soTaiKhoan){
      NotificationManager.warning('Vui lòng nhập số tài khoản');
      return;
    }
    if (props.soTaiKhoan == SoTK) {
      NotificationManager.warning('Số tài khoản trùng với số thẻ');
      return;
    }
    if (!props.soTien) {
      NotificationManager.warning('Vui lòng nhập số tiền chuyển');
      return;
    }
    if (props.soTien < 6000) {
      NotificationManager.warning('Vui lòng nhập tối thiểu 6,000 VND');
      return;
    }
    if(props.nguoiTraPhi === props.sender){
      if(money - (props.soTien + bankConfig.inter_transfer_fee) < bankConfig.min_balance){
        NotificationManager.error('Số tiền của quý khách không đủ để thực hiện giao dịch');
        return;
      }
    } else {
      if(money - props.soTien < bankConfig.min_balance){
        NotificationManager.error('Số tiền của quý khách không đủ để thực hiện giao dịch');
        return;
      }
    }
    if (props.luuThongTin === true && !props.tenGoiNho) {
      props.setTenGoiNho(props.tenNguoiHuong);
    }
    if (props.luuThongTin && !props.tenGoiNho) {
      props.setTenGoiNho(props.tenNguoiHuong);
    }
    const tenNguoiHuong = props.tenNguoiHuong;
    if(props.tenNganHang == "NaniBank" || props.tenNganHang == "N42"){
      props.transferInter(
        tenNguoiHuong,
        SoTK,
        props.soTaiKhoan,
        props.soTien,
        props.nguoiTraPhi === props.sender ? 'sender' : 'receiver',
        props.tenNganHang,
        props.noiDung
      )
    } else {
      props.transferInter(
        tenNguoiHuong,
        SoTK,
        props.soTaiKhoan,
        props.soTien,
        props.nguoiTraPhi === props.sender ? 'sender' : 'receiver',
        props.tenNganHang.toLowerCase(),
        props.noiDung
      )
    }
  };

  return (
    <div className="transferForm">
      <div className="mt-4">
        <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
        <hr />
      </div>
      <SenderInformation items={SoTK} money={money} />
      <div className="mt-5">
        <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
        <hr />
        <InputWithSearch
          title="Tìm kiếm"
          items={remindList}
          onBlur={(e) => handleOnRemindListChange(e)}
        />
        <TextInput
          title="Số tài khoản"
          placeholder="Nhập số tài khoản"
          value={props.soTaiKhoan || ''}
          onBlur={handleOnChangeBank}
          onChange={(e) => props.setSoTaiKhoan(e.target.value)}
        />
        <div className="receiver">
          <TextInput
            title="Tên người hưởng"
            placeholder="Tên người huởng"
            value={props.tenNguoiHuong || ''}
            disabled={true}/>
        {props.transfer.findReceiverPending === true && <i className="fa fa-refresh fa-spin mr-3"/>}
        </div>
        
        <SelectInput
          title ="Ngân hàng"
          placeholder= "Chọn ngân hàng"
          onChange={e => props.setTenNganHang(e.target.value)}
          onBlur = {handleOnChangeBank}
          items={banks}/>
        <CheckBox
          label="Lưu thông tin người hưởng"
          onChange={() => props.setLuuThongTin(!props.luuThongTin)}
        />
        {props.luuThongTin && (
          <TextInput
            title="Tên gợi nhớ"
            placeholder="Nhập tên gợi nhớ"
            onBlur={(e) => props.setTenGoiNho(e.target.value)}
          />
        )}
      </div>

      <div className="mt-5">
        <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
        <hr />
        <TransferInformation {...props} items={phiChuyenTien} />
      </div>
      <div className="mt-5 center-align">
        <button
          className="btn btn-success float-center"
          type="button"
          onClick={() => handleForSubmit()}>
            {props.transfer.transferInterPending === true && <i className="fa fa-refresh fa-spin mr-3"/>}
          Chuyển tiền
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  transfer: state.transfer,
});

const mapDispatchToProps = (dispatch) => ({
  findReceiver: (credit_number, partner_code) =>
    dispatch(transferActions.findReceiver(credit_number, partner_code)),
  transferInter: (
    name,
    from_credit_number,
    to_credit_number,
    amount,
    fee_payer,
    partner_code,
    message
  ) =>
    dispatch(
      transferActions.transferInter(
        name,
        from_credit_number,
        to_credit_number,
        amount,
        fee_payer,
        partner_code,
        message
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferForm);
