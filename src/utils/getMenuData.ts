import isEqual from "lodash/isEqual";
import memoizeOne from "memoize-one";
import { IRoute } from "@/router/typing";

type MenuDataItem = IRoute;

interface FormatterProps {
  data: MenuDataItem[];
  parentName?: string;
  authority?: string[] | string;
}

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

/** 是否是url */
export const isUrl = (path: string): boolean => reg.test(path);

export function guid(): string {
  return "xxxxxxxx".replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** 获取菜单key */
export const getKeyByPath = (item: MenuDataItem) => {
  const { path, name } = item;
  if (path && path !== "/") {
    return path;
  }
  if (name) {
    return name;
  }

  return guid();
};

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  if (!menuData) {
    return undefined;
  }
  return menuData.reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children) {
      const newArray: string[] = pre.concat(
        getOpenKeysFromMenuData(item.children) || []
      );
      return newArray;
    }
    return pre;
  }, [] as string[]);
};

export const mergePath = (path: string = "", parentPath: string = "/") => {
  if (isUrl(path)) {
    return path;
  }
  if ((path || parentPath).startsWith("/")) {
    return path;
  }
  return `/${parentPath}/${path}`.replace(/\/\//g, "/").replace(/\/\//g, "/");
};

function formatter(
  props: FormatterProps,
  parent: Partial<MenuDataItem> = { path: "/" }
): MenuDataItem[] {
  const { data = [], authority } = props;

  return data
    .filter((item) => {
      if (!item) {
        return false;
      }
      if (item.routes || item.children) {
        return true;
      }
      if (item.name && item.path) {
        return true;
      }
      return false;
    })
    .map((item) => {
      if (!item.name) {
        return item;
      }
      const { parentKeys = [], title, lock, hideLock } = parent;
      const path = mergePath(item.path, parent ? parent.path : "/");
      const result: MenuDataItem = {
        ...item,
        path,
        component: undefined,
        title: item.title || item.name || title,
        key: item.key || getKeyByPath(item),
        parentKeys: [...parentKeys, parent.key || "/"],
        routes: undefined,
        lock: item.lock || lock,
        hideLock: item.hideLock || hideLock,
      };
      if (item.routes || item.children) {
        const children = formatter(
          {
            ...props,
            authority: item.authority || authority,
            data: item.routes || item.children,
          },
          result
        );
        // Reduce memory usage
        result.children = children;
      }
      return result;
    });
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const defaultFilterMenuData = (menuData: MenuDataItem[] = []): MenuDataItem[] =>
  menuData
    .filter((item) => item && item.name && !item.hideInMenu)
    .map((item) => {
      if (
        item.children &&
        Array.isArray(item.children) &&
        !item.hideChildrenInMenu &&
        item.children.some((child) => child && !!child.name)
      ) {
        const children = defaultFilterMenuData(item.children);
        if (children.length) return { ...item, children };
      }
      return { ...item, children: undefined };
    })
    .filter((item) => item);

/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (
  menuData: MenuDataItem[]
): Map<string, MenuDataItem> => {
  // Map is used to ensure the order of keys
  const routerMap = new Map<string, MenuDataItem>();
  const flattenMenuData = (data: MenuDataItem[], parent?: MenuDataItem) => {
    data.forEach((menuItem) => {
      if (!menuItem) {
        return;
      }
      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children, menuItem);
      }
      // Reduce memory usage
      const path = mergePath(menuItem.path, parent ? parent.path : "/");
      routerMap.set(path, menuItem);
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMap,
  isEqual
);

/** Map to object */
function strMapToObj(iterable: any) {
  return [...iterable].reduce(
    (
      obj: {
        [key: string]: MenuDataItem;
      },
      [key, val]
    ) => {
      obj[key] = val;
      return obj;
    },
    {}
  );
}

const getMenuData = (
  routes: IRoute[],
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[]
) => {
  let originalMenuData = memoizeOneFormatter({
    data: routes,
  });

  if (menuDataRender) {
    originalMenuData = memoizeOneFormatter({
      data: menuDataRender(originalMenuData),
    });
  }

  const menuData = defaultFilterMenuData(originalMenuData);
  const breadcrumbMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
  const breadcrumb: {
    [key: string]: MenuDataItem;
  } = strMapToObj(breadcrumbMap);

  return { menuData, breadcrumbMap, breadcrumb };
};

export default getMenuData;
