import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const MonitorView = React.lazy(() => import('./views/dashboard/Monitoring/MonitorView'));
const Maintenance = React.lazy(() => import('./views/dashboard/maintenance/Maintenance'));

const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));

const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const SettingsOverview = React.lazy(() => import('./views/settings/SettingsOverview'));

const Companies = React.lazy(() => import('./views/settings/informations/companies/Companies'))
const CreateCompany = React.lazy(() => import('./views/settings/informations/companies/CreateCompany'))
const EditCompany = React.lazy(() => import('./views/settings/informations/companies/EditCompany'))

const Organizations = React.lazy(() => import('./views/settings/informations/organizations/Organizations'))
const CreateOrganization = React.lazy(() => import('./views/settings/informations/organizations/CreateOrganization'))
const EditOrganization = React.lazy(() => import('./views/settings/informations/organizations/EditOrganization'))

const Projects = React.lazy(() => import('./views/settings/informations/projects/Projects'))
const CreateProject = React.lazy(() => import('./views/settings/informations/projects/CreateProject'))
const EditProject = React.lazy(() => import('./views/settings/informations/projects/EditProject'))

const Modules = React.lazy(() => import('./views/settings/informations/projects/modules/Modules'))
const CreateModule = React.lazy(() => import('./views/settings/informations/projects/modules/CreateModule'))
const EditModule = React.lazy(() => import('./views/settings/informations/projects/modules/EditModule'))
const ModuleConfig = React.lazy(() => import('./views/settings/informations/projects/modules/ModuleConfig'))

const Packets = React.lazy(() => import('./views/settings/informations/projects/modules/packets/Packets'))

const Contacts = React.lazy(() => import('./views/settings/informations/contacts/Contacts'))
const CreateContact = React.lazy(() => import('./views/settings/informations/contacts/CreateContact'))
const EditContact = React.lazy(() => import('./views/settings/informations/contacts/EditContact'))

export const PATH_MODULES_LIST = '/settings/projects/:pid/modules';
export const PATH_MODULES_CONFIG = '/settings/projects/:pid/modules/:mid/config';
export const PATH_PACKETS_LIST = '/settings/projects/:pid/modules/:mid/packets';

export const PATH_CONTACTS_LIST = '/contacts';
export const PATH_CONTACTS_CREATE = '/contacts/create';
export const PATH_CONTACTS_EDIT = '/contacts/edit/:id';

const routes = [
  { path: '/', exact: true, name: 'خانه' },
  { path: '/dashboard', name: 'مانیتورینگ', component: Dashboard },
  { path: '/monitoring', name: 'وضعیت سامانه', component: MonitorView },
  { path: '/maintenance', name: 'سرویس و نگهداری', component: Maintenance },


  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/settings', exact: true, name: 'تنظیمات', component: SettingsOverview },

  { path: '/settings/companies', exact: true, name: 'شرکت ها', component: Companies },
  { path: '/settings/companies/create', name: 'ایجاد شرکت', component: CreateCompany },
  { path: '/settings/companies/edit/:id', name: 'ویرایش شرکت', component: EditCompany },

  { path: '/settings/organizations', exact: true, name: 'ارگان ها', component: Organizations },
  { path: '/settings/organizations/create', name: 'ایجاد ارگان', component: CreateOrganization },
  { path: '/settings/organizations/edit/:id', name: 'ویرایش ارگان', component: EditOrganization },

  { path: '/settings/projects', exact: true, name: 'پروژه ها', component: Projects },
  { path: '/settings/projects/create', name: 'ایجاد پروژه', component: CreateProject },
  { path: '/settings/projects/edit/:id', name: 'ویرایش پروژه', component: EditProject },

  { path: PATH_MODULES_LIST, exact: true, name: 'ماژول ها', component: Modules },
  { path: '/settings/projects/:pid/modules/create', name: 'ایجاد ماژول', component: CreateModule },
  { path: '/settings/projects/:pid/modules/edit/:id', name: 'ویرایش ماژول', component: EditModule },
  { path: PATH_MODULES_CONFIG, name: 'تنظیمات ماژول', component: ModuleConfig },

  { path: PATH_PACKETS_LIST, name: 'بسته ها', component: Packets },

  { path: PATH_CONTACTS_LIST, exact: true, name: 'مخاطبین', component: Contacts },
  { path: PATH_CONTACTS_CREATE, name: 'ایجاد مخاطب', component: CreateContact },
  { path: PATH_CONTACTS_EDIT, name: 'ویرایش مخاطب', component: EditContact },
];

export default routes;
