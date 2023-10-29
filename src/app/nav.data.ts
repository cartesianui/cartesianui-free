import { INavData } from '@coreui/angular';

// TODO:
// Add required permission in the block,
// and use PermissionCheckerService (already used in route-guard.service.js) to view/hide menu item
// Custom Nav https://github.com/coreui/coreui-free-angular-admin-template/issues/107

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Authorization'
  },
  {
    divider: true
  },
  {
    name: 'User',
    url: '/users',
    icon: 'fa fa-user'
  },
  {
    name: 'Roles',
    url: '/authorization/roles',
    icon: 'fa fa-user-shield'
  },
  {
    name: 'Permissions',
    url: '/authorization/permissions',
    icon: 'fa fa-building-lock'
  },

  {
    title: true,
    name: 'Tenancy (Pro)'
  },
  {
    divider: true
  },
  {
    name: 'Tenants',
    url: '/tenants',
    icon: 'fa fa-passport'
  },

  {
    title: true,
    name: 'Book Keeping (Pro)'
  },
  {
    divider: true
  },
  {
    name: 'Book Keeping',
    url: '/bookeeper',
    icon: 'fa fa-coins',
    children: [
      {
        name: 'Accounts',
        url: '/bookeeper/accounts',
        icon: 'fas fa-list'
      },
      {
        name: 'Account Types',
        url: '/bookeeper/types',
        icon: 'fa fa-list-ol'
      },
      {
        name: 'Account Category',
        url: '/bookeeper/categories',
        icon: 'fa fa-table-list'
      },
      {
        name: 'Journal Voucher',
        url: '/bookeeper/journal-vouchers',
        icon: 'fa fa-file-lines'
      },
      {
        name: 'Receipt Voucher',
        url: '/bookeeper/receipt-vouchers',
        icon: 'fa fa-receipt'
      },
      {
        name: 'Payment Voucher',
        url: '/bookeeper/payment-vouchers',
        icon: 'fa fa-file-invoice-dollar'
      }
    ]
  },

  {
    title: true,
    name: 'Locations (Pro)'
  },
  {
    divider: true
  },
  {
    name: 'Locations',
    url: '/locations',
    icon: 'fa fa-map-location-dot',
    children: [
      {
        name: 'Countries',
        url: '/locations/countries',
        icon: 'fa fa-flag'
      },
      {
        name: 'States',
        url: '/locations/states',
        icon: 'fa fa-landmark'
      },
      {
        name: 'Cities',
        url: '/locations/cities',
        icon: 'fa fa-city'
      },
      {
        name: 'Locations',
        url: '/locations/locations',
        icon: 'fa fa-location-dot'
      }
    ]
  },

  {
    title: true,
    name: 'Configuration (Pro)'
  },
  {
    divider: true
  },
  {
    name: 'Configuration',
    url: '/configuration/user',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'User',
        url: '/configuration/user',
        icon: 'fa fa-user-cog'
      },
      {
        name: 'Host',
        url: '/configuration/host',
        icon: 'fa fa-globe'
      },
      {
        name: 'Tenant',
        url: '/configuration/tenant',
        icon: 'fa fa-cog'
      },
      {
        name: 'Domain',
        url: '/configuration/domain',
        icon: 'fa fa-earth-asia'
      }
    ]
  },
];
