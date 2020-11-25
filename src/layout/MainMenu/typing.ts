export interface MenuData {
  path?: string;
  disabled?: boolean;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  children?: MenuData[] | null;
}
