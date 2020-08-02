import React from "react";
import Title from "../components/title/title";
import "./transactionList.scss";
import DatePicker from "react-datepicker";

const TransactionList = () => {
  return (
    <div className="transaction">
      <Title title="Danh sách giao dịch" />
      <div className="mt-5 transaction-content">
        <div className="filter">
          <div className="mr-5">
            <select className="form-control">
              <option>Tất cả</option>
              <option>BankDbb</option>
              <option>NaniBank</option>
            </select>
          </div>
          <DatePicker
            className="form-control"
            placeholderText="Ngày bắt đầu"
            // onChange={(date) => setStartDate(date.getTime())}
            // selected={startDate}
            dateFormat="dd-MM-yyyy"
          />
            <DatePicker
              className="form-control"
              placeholderText="Ngày kết thúc"
              // onChange={(date) => setStartDate(date.getTime())}
              // selected={startDate}
              dateFormat="dd-MM-yyyy"
            />
          <button className="btn btn-success ml-5">Thống kê</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
