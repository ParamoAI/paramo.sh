import Redirect from '@/site/components/Redirect';

// Old address from an earlier version of the site; still gets visits.
export default function Old() {
  return <Redirect to="/what-we-do/" />;
}
