import React from "react";
import { DatePicker, Space } from "antd";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

export default function DineIn() {

  const history = useHistory();

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
    openNotification(value);
    history.push("/");
  };

  const openNotification = (value) => {
    notification.open({
      message: "Your Slot Verification",
      description: `Your slot has been confirmed on ${value._d}`,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "100px" }}>
      <div>Choose Your Time Slot</div>
      <Space direction="vertical" size={12}>
        <DatePicker showTime onChange={onChange} onOk={onOk} />
      </Space>
    </div>
  );
}
