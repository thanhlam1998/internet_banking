import React, { useState, useEffect } from 'react';
import Title from '../component/title/title';
import DatePicker from 'react-datepicker';


const LoanReminder = () => {
    const now = new Date().getTime();
    const [startDate, setStartDate] = useState(now);
    const [endDate, setEndDate] = useState(now);

    const handleSearch = () => {

    }
  return (
    <div className="contentContainer">
      <Title title="THÔNG TIN NHẮC NỢ" />
      <div className="inputContainer mt-4">
        <h5 className="text-success">DANH SÁCH NHẮC NỢ</h5>
        <hr />
        <div className="row align-items-center">
          <DatePicker
            className="col-11 ml-3"
            placeholderText="Ngày bắt đầu"
            onChange={(date) => setStartDate(date.getTime())}
            selected={startDate}
            dateFormat="dd-MM-yyyy"
          />
          <DatePicker
            className="col-11 ml-2"
            placeholderText="Ngày kết thúc"
            onChange={(date) => setEndDate(date.getTime())}
            selected={endDate}
            dateFormat="dd-MM-yyyy"
          />
          <button className="btn btn-success" onClick={handleSearch}>
            Lọc
          </button>
          <button className="btn btn-success ml-4" onClick={handleSearch}>
            Tạo nhắc nợ
          </button>
        </div>
      </div>
      <div>
        <table className="table table-hover mt-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Ngày nhắc</th>
              <th scope="col">Loại</th>
              <th scope="col">Thông tin</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
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
    </div>
  );
};
export default LoanReminder;
