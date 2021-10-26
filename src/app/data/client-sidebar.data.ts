import {SidebarItem} from "./types/sidebar-item.type";

export const ClientSidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: 'grid_view',
    isExternal: false,
    link: '/client/dashboard'
  },
  {
    title: 'Billing',
    icon: 'attach_money',
    isExternal: false,
    link: '/client/billing'
  },
]
