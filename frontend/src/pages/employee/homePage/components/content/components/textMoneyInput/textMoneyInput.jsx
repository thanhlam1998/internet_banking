import React from 'react';
import './textMoneyInput.scss';
import { useState } from 'react';

const TextMoneyInput = (props) => {
  const soTien =
    props.soTien &&
    props.soTien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  const [value, setValue] = useState(soTien);
  const handleMoneyOnChange = (e) => {
    const re = /^[0-9\b]+$/;
    var money = e.target.value;
    money = money.split(',').join('');
    props.setSoTien(Number(money))
    if (money === '' || re.test(money)) {
      setValue(money.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
    }
  };
  
  return (
    <div className="row mt-3 textMoneyInput">
      <div className="col-3 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-9">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập số tiền"
            value={value || ""}
            onChange={(e) => handleMoneyOnChange(e)}></input>
          <div className="input-group-append">
            <span className="input-group-text">VND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextMoneyInput;
