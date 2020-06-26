import React, { useState, useEffect } from 'react'
import Title from '../components/title/title'
import {AdminActions} from '../../../../../../actions/admin/admin'
import EmployeeModal from '../components/createEmployeeModal/employeeModal' 
import {
    NotificationManager,
    NotificationContainer,
  } from 'react-notifications';
import { connect } from 'react-redux';

const EmployeeList = ({admin, getAllEmployee, createEmployee, deleteEmployee, updatePasswordEmployee}) => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [item, setItem] = useState()
    const [employee, setEmployee] = useState();
    const [backupEmployee, setBackupEmployee] = useState();
    const [isModalEdit, setIsModalEdit] = useState(false);

    useEffect(() => {
     getAllEmployee()
    }, [])

    useEffect(() => {
      if(search === ''){
        setEmployee(backupEmployee)
      }
    }, [search])

    useEffect(() => {
      if(search){
        handleSearch()
      }
    }, [backupEmployee])

    useEffect(() => {
      if(admin.getAllEmployeeSuccess === true){
        setEmployee(admin.allEmployee)
        setBackupEmployee(admin.allEmployee)
      }
      if(admin.createEmployeeSuccess === true){
        NotificationManager.success('Tạo tài khoản thành công');
        getAllEmployee();
        setShow(false)
      }
      if(admin.updatePasswordEmployeeSuccess === true){
        NotificationManager.success('Cập nhật mật khẩu thành công');
        getAllEmployee();
        setShow(false)
      }
      if(admin.deleteEmployeeSuccess === true){
        NotificationManager.success('Xóa tài khoản thành công');
        getAllEmployee();
      }
    }, [admin])

    const handleEdit = (item) => {
      setShow(true);
      setIsModalEdit(true);
      setItem(item)
    }

    const handleDelete = (employee_id) => {
      deleteEmployee(employee_id)
    }

    const handleSearch =() => {
      const searchValue = backupEmployee.filter(
        (item) =>
          item.username.toLowerCase().includes(search.toLowerCase()))
      setEmployee(searchValue);
    }
    const handleCreate = () => {
        setShow(true);
        setIsModalEdit(false);
    }
    return (
        <div>
            <Title title="Danh sách nhân viên"/>
            <div className="mt-5">
        <div className="row ml-0 mr-0">
          <input
            className="col-5 font-weight-lighter"
            placeholder="Nhập tên tài khoản employee"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="btn btn-success ml-4" onClick={handleCreate}>
            Tạo mới
          </button>
          <EmployeeModal
            show={show}
            setShow={setShow}
            isModalEdit={isModalEdit}
            admin={admin}
            item = {item}
            createEmployee={createEmployee}
            updatePasswordEmployee={updatePasswordEmployee}/>
        </div>
        <div>
          <table className="table table-hover mt-5">
            <thead className="thead-light">
              <tr>
                <th scope="col">Số id</th>
                <th scope="col">Tên tài khoản</th>
                <th scope="col"/>
              </tr>
            </thead>
            <tbody>
              {employee &&
                employee.map((item, index) => (
                  <tr key={index}>
                    <td>{item.employee_id}</td>
                    <td>{item.username}</td>
                    <td>
                      <ul className="list-inline m-0">
                        <li className="list-inline-item">
                          <button
                            onClick={() => handleEdit(item)}
                            className="btn btn-success btn-sm rounded-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit">
                            <i className="fa fa-edit"></i>
                          </button>
                        </li>
                        <li className="list-inline-item">
                          <button
                            onClick={() => handleDelete(item.employee_id)}
                            className="btn btn-danger btn-sm rounded-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete">
                            <i className="fa fa-trash"></i>
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <NotificationContainer />
    </div>
    )
}

const mapStateToProps = (state) => ({
  admin: state.admin
})

const mapDispatchToProps = dispatch => ({
  getAllEmployee: () => dispatch(AdminActions.getAllEmployee()),
  createEmployee: (username, password) => dispatch(AdminActions.createEmployee(username, password)),
  updatePasswordEmployee: (employee_id, password) => dispatch(AdminActions.updatePasswordEmployee(employee_id, password)),
  deleteEmployee: (employee_id) => dispatch(AdminActions.deleteEmployee(employee_id))
})


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)
