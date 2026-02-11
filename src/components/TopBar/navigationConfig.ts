export interface PageMetadata {
  title: string;
  description: string;
  pathname: string;
}

export const NAVIGATION_METADATA: PageMetadata[] = [
  {
    pathname: '/pricing',
    title: 'Pricing Plans',
    description: 'Choose the best plan for your agricultural needs and scale your business.',
  },
  {
    pathname: '/faq',
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about AgroMap features and services.',
  },
  {
    pathname: '/profile',
    title: 'My Profile',
    description: 'View your personal information and account statistics.',
  },
  {
    pathname: '/profile/edit',
    title: 'Edit Profile',
    description: 'Update your personal details, password, and account preferences.',
  },
  {
    pathname: '/fields',
    title: 'Field Management',
    description: 'Simplify processes and build trust through traceability.',
  },
  {
    pathname: '/map',
    title: 'Interactive Map',
    description: 'Visualize your fields and manage geographical boundaries in real-time.',
  },
];
