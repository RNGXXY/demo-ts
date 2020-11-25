import React from "react";
import { Steps, Popover } from "antd";
const { Step } = Steps;

const customDot = (dot: any, { status, index }: any) => {
  return (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
};

const Com2 = () => {
  return (
    <div>
      <Steps current={1.5} progressDot={customDot} status='process'>
        <Step title="Finished" description="You can hover on the dot." />
        <Step title="In Progress" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
      </Steps>
    </div>
  );
};

export default Com2;
