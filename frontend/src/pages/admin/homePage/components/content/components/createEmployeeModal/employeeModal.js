import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import TextInput from '../textInput/textInput';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import './employeeModal.scss';

const RemindListModal = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState()
  const handleClose = () => props.setShow(false);

  useEffect(() => {
    if(props.isModalEdit === true){
      
    }
  }, [props.isModalEdit])

  const handleCreate = () => {
    if (!username) {
      NotificationManager.warning('Vui lòng nhập tên tài khoản');
      return;
    }
    if (!password) {
      NotificationManager.warning('Vui lòng nhập mật khẩu');
      return;
    }
    props.createEmployee(username, password)
  };

  const handleUpdate = () => {
    if (!username) {
      NotificationManager.warning('Vui lòng nhập số tài khoản');
      return;
    }
    if (!password) {
      NotificationManager.warning('Vui lòng nhập tên gợi nhớ');
      return;
    }
  }

  return (
    <Modal show={props.show} onHide={handleClose} className="modal-custom">
      <Modal.Header closeButton>
        {props.isModalEdit === false && (
          <Modal.Title>Tạo tài khoản nhân viên</Modal.Title>
        )}
        {props.isModalEdit === true && <Modal.Title>Cập nhật tài khoản nhân viên</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <div>
          <TextInput
            title="Tên tài khoản"
            placeholder="Tên tài khoản"
            disabled = {props.isModalEdit === true ? true : false}
            onChange={(e) => setUsername(e.target.value)}
          />
          {props.isModalEdit === false &&
          <TextInput
            title="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />}

          {props.isModalEdit === true &&
          <div>
            <TextInput
            title="Đổi mật khẩu"
            placeholder="Nhập mật khẩu mới"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
            <TextInput
            title="Đổi mật khẩu"
            placeholder="Nhập lại mật khẩu mới"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
          }


        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.isModalEdit === false && (
          <button type="submit" className="btn btn-success" onClick={handleCreate}>
            Tạo
          </button>
        )}
        {props.isModalEdit === true && (
          <button className="btn btn-success" onClick={handleUpdate}>
            Cập nhật
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClose}>
          Hủy bỏ
        </button>
      </Modal.Footer>
      <NotificationContainer />
    </Modal>
  );
};

export default RemindListModal;
