import React from 'react';
import { Button } from 'antd';
import { StyledButton } from './style';
import Com1 from './ComOne';
import Com3 from './ComThree';
// import Com2 from "./Com2";

const Page2 = () => {
  return (
    <div>
      <Button>按钮</Button>
      <StyledButton>按钮2</StyledButton>
      <br />
      <Com1 />
      <Com3 />
      {/* <Com2 /> */}
    </div>
  );
};

export default Page2;
