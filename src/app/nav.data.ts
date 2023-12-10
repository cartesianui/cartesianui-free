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
    url: '/admin/users',
    icon: 'fa fa-user'
  },
  {
    name: 'Roles',
    url: '/admin/auth/roles',
    icon: 'fa fa-user-shield'
  },
  {
    name: 'Permissions',
    url: '/admin/auth/permissions',
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
    url: '/admin/tenants',
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
    url: '/admin/bookeeper',
    icon: 'fa fa-coins',
    children: [
      {
        name: 'Accounts',
        url: '/admin/bookeeper/accounts',
        icon: 'fas fa-list'
      },
      {
        name: 'Account Types',
        url: '/admin/bookeeper/types',
        icon: 'fa fa-list-ol'
      },
      {
        name: 'Account Category',
        url: '/admin/bookeeper/categories',
        icon: 'fa fa-table-list'
      },
      {
        name: 'Journal Voucher',
        url: '/admin/bookeeper/journal-vouchers',
        icon: 'fa fa-file-lines'
      },
      {
        name: 'Receipt Voucher',
        url: '/admin/bookeeper/receipt-vouchers',
        icon: 'fa fa-receipt'
      },
      {
        name: 'Payment Voucher',
        url: '/admin/bookeeper/payment-vouchers',
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
    url: '/admin/locations',
    icon: 'fa fa-map-location-dot',
    children: [
      {
        name: 'Countries',
        url: '/admin/locations/countries',
        icon: 'fa fa-flag'
      },
      {
        name: 'States',
        url: '/admin/locations/states',
        icon: 'fa fa-landmark'
      },
      {
        name: 'Cities',
        url: '/admin/locations/cities',
        icon: 'fa fa-city'
      },
      {
        name: 'Locations',
        url: '/admin/locations/locations',
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
    url: '/admin/configuration/user',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'User',
        url: '/admin/configuration/user',
        icon: 'fa fa-user-cog'
      },
      {
        name: 'Host',
        url: '/admin/configuration/host',
        icon: 'fa fa-globe'
      },
      {
        name: 'Tenant',
        url: '/admin/configuration/tenant',
        icon: 'fa fa-cog'
      },
      {
        name: 'Domain',
        url: '/admin/configuration/domain',
        icon: 'fa fa-earth-asia'
      }
    ]
  }
];
