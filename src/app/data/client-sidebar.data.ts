import {SidebarItem} from "./types/sidebar-item.type";

export const ClientSidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: 'grid_view',
    isExternal: false,
    link: '/client/dashboard'
  },
  {
    title: 'Units',
    icon: 'place',
    isExternal: false,
    link: '/client/units'
  }
]
