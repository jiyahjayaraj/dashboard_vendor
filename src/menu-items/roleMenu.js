import {IconCrown,IconUser,IconChartLine,IconClipboardList,IconTicket, IconCalendarEvent,IconLayoutDashboard, IconScale, IconReceipt2, IconMessageCircle , IconStar, IconAlertTriangle, IconShieldCheck, IconClockHour1, IconFileImport, IconUserExclamation } from '@tabler/icons-react';

// constant
const icons = {IconCrown,IconUser,IconChartLine,IconClipboardList,IconTicket,IconCalendarEvent,IconLayoutDashboard, IconScale, IconReceipt2, IconStar,  IconMessageCircle, IconAlertTriangle, IconShieldCheck, IconClockHour1, IconFileImport, IconUserExclamation };

const RoleMenu = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    },
    {
  id: 'events',
  title: 'Events',
  type: 'item',
  url: '/events',
  icon: icons.IconCalendarEvent, // you can change icon
  breadcrumbs: false
},
{
    id: 'ticket-management',
    title: 'Ticket Management',
    type: 'item',
    url: '/tickets',
    icon: icons.IconTicket,
    breadcrumbs: false
  },
  {
    id: 'view-bookings',
    title: 'View Bookings',
    type: 'item',
    url: '/bookings',
    icon: icons.IconClipboardList,
    breadcrumbs: false
  },
  {
    id: 'revenue-reports',
    title: 'Revenue Reports',
    type: 'item',
    url: '/reports/revenue',
    icon: icons.IconChartLine,
    breadcrumbs: false
  },
  {
    id: 'profile',
    title: 'Profile',
    type: 'item',
    url: '/profile',
    icon: icons.IconUser,
    breadcrumbs: false
  },
  {
    id: 'subscription',
    title: 'Subscription',
    type: 'item',
    url: '/subscription',
    icon: icons.IconCrown,
    breadcrumbs: false
  },
 
    // {
    //   id: 'facility',
    //   title: 'Facilities',
    //   type: 'item',
    //   url: '/facility',
    //   icon: icons.IconShieldCheck,
    //   breadcrumbs: false
    // },
    //     {
    //   id: 'userManagment',
    //   title: 'Users',
    //   type: 'item',
    //   url: '/userManagment',
    //   icon: icons.IconFileImport,
    //   breadcrumbs: false
    // },
    
    //     {
    //   id: 'reportedIssues',
    //   title: 'Issues',
    //   type: 'item',
    //   url: '/reportedIssues',
    //   icon: icons.IconAlertTriangle,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'userfeedback',
    //   title: 'User Feedback',
    //   type: 'item',
    //   url: '/userfeedback',
    //   icon: icons.IconMessageCircle ,
    //   breadcrumbs: false
    // },
        {
      id: 'rating',
      title: 'Ratings & Feedback',
      type: 'item',
      url: '/rating',
      icon: icons.IconStar,
      breadcrumbs: false
    },
    



  ]
};

export default RoleMenu;
