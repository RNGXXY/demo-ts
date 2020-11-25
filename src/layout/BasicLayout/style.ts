import styled from "styled-components";
import { Layout } from "antd";

const sliderWidth = "256px";

export const BasicLayoutSider = styled(Layout.Sider)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  width: ${sliderWidth} !important;
  max-width: ${sliderWidth} !important;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid #f0f0f0;
  background-color: #fff;
`;

export const BasicLayoutContent = styled(Layout.Content)`
  padding-left: ${sliderWidth};
  .contentWrap {
    padding: 16px;
  }
`;
