import React, { useMemo, useCallback } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { useHistory } from 'react-router-dom';

import { IRoute } from '@/router/typing';
import getMenuData from '@/utils/getMenuData';
import { MenuData } from './typing';
import { MainMenuWrap, MenuItem, LinkItem } from './style';

interface Props extends MenuProps {
  menuData?: IRoute;
}

const renderMenuList = (data: MenuData[]): React.ReactNode[] => {
  return data?.map((item) =>
    item.children ? (
      <Menu.SubMenu {...item}>{renderMenuList(item.children)}</Menu.SubMenu>
    ) : (
      <Menu.Item {...item}>{item.title}</Menu.Item>
    )
  );
};

const handleMenuData = (data: IRoute[]): MenuData[] => {
  if (data.length <= 0) return [];
  const { menuData: newData } = getMenuData(data);
  return newData?.map((item) => ({
    path: item.path,
    title: item.name,
    key: item.path,
    icon: item.icon,
    disabled: item.disabled,
    children: item.children ? handleMenuData(item.children) : null,
  }));
};

const MainMenu: React.FC<Props> = ({ menuData, ...props }) => {
  const history = useHistory();
  return (
    <MainMenuWrap>
      <Menu
        {...props}
        onClick={(e) => {
          history.push(String(e.key));
        }}
        mode="inline"
      >
        {renderMenuList(handleMenuData(menuData?.routes || []))}
      </Menu>
    </MainMenuWrap>
  );
};

export default MainMenu;
