import ShellSidebar from '../ShellSidebar';

export const COLLECTOR_NAV = [
  { to: '/collector', label: 'Jobs', icon: 'work' },
  { to: '/collector/routes', label: 'Route', icon: 'route' },
  { to: '/collector/history', label: 'History', icon: 'history' },
  { to: '/collector/performance', label: 'Performance', icon: 'trending_up' },
  { to: '/collector/profile', label: 'Profile', icon: 'person' },
];

export default function CollectorSidebar() {
  return <ShellSidebar items={COLLECTOR_NAV} />;
}