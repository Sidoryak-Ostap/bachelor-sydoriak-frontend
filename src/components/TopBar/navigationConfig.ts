export interface PageMetadata {
  titleKey: string;
  descriptionKey: string;
  pathname: string;
}

export const NAVIGATION_METADATA: PageMetadata[] = [
  {
    pathname: '/dashboard/pricing',
    titleKey: 'dashboard.breadcrumbs.pricing.title',
    descriptionKey: 'dashboard.breadcrumbs.pricing.description',
  },
  {
    pathname: '/dashboard/faq',
    titleKey: 'dashboard.breadcrumbs.faq.title',
    descriptionKey: 'dashboard.breadcrumbs.faq.description',
  },
  {
    pathname: '/dashboard/profile',
    titleKey: 'dashboard.breadcrumbs.profile.title',
    descriptionKey: 'dashboard.breadcrumbs.profile.description',
  },
  {
    pathname: '/dashboard/profile/edit',
    titleKey: 'dashboard.breadcrumbs.profileEdit.title',
    descriptionKey: 'dashboard.breadcrumbs.profileEdit.description',
  },
  {
    pathname: '/dashboard/fields',
    titleKey: 'dashboard.breadcrumbs.fields.title',
    descriptionKey: 'dashboard.breadcrumbs.fields.description',
  },
  {
    pathname: '/dashboard/map',
    titleKey: 'dashboard.breadcrumbs.map.title',
    descriptionKey: 'dashboard.breadcrumbs.map.description',
  },
  {
    pathname: '/dashboard/settings',
    titleKey: 'dashboard.breadcrumbs.settings.title',
    descriptionKey: 'dashboard.breadcrumbs.settings.description',
  },
  {
    pathname: '/dashboard',
    titleKey: 'dashboard.breadcrumbs.dashboard.title',
    descriptionKey: 'dashboard.breadcrumbs.dashboard.description',
  },
];
