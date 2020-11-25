import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";

import { BasicLayoutSider, BasicLayoutContent } from "./style";
import { Layout } from "antd";
import MainMenu from "../MainMenu";
import { IRoute } from "@/router/typing";

const config = {
  defaultOpenKeys: ["/page1"],
};

interface Props extends RouteComponentProps {
  route?: IRoute;
}

const BasicLayout: React.FC<Props> = ({ children, ...props }) => {
  const { route, staticContext, ...test } = props;
  return (
    <Layout>
      <BasicLayoutSider>
        <MainMenu menuData={route} defaultOpenKeys={config.defaultOpenKeys} />
      </BasicLayoutSider>
      <BasicLayoutContent {...test} id="scrollLayoutContent">
        <div className="contentWrap">{children}</div>
      </BasicLayoutContent>
    </Layout>
  );
};

export default memo(BasicLayout);
