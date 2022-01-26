export interface StatusBadge {
  value: string | boolean,
  display: string
  color: 'error' | 'warn' | 'success' | 'none';
}
