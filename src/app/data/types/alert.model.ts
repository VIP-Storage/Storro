export interface Alert {
  type: 'info' | 'warning' | 'danger' | 'success';
  message: string;
  link?: {
    url: string;
    title: string;
  };
  action?: {
    function: () => void;
    title: string;
  };
}
