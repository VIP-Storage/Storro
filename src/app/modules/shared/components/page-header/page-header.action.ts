export interface PageHeaderAction {
  icon: string;
  title: string;
  routerLink?: string;
  color?: 'primary' | 'accent' | 'warn';
  clickAction?: () => void;
}
