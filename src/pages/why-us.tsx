import SeoHead from '@/site/components/SeoHead';
import WhyUsPage from '@/site/views/WhyUsPage';

// New page in the redesign.
export default function WhyUs() {
  return (
    <>
      <SeoHead
        title="Why us | Páramo"
        description="Why growing companies choose Páramo: we start with how you already work, get you past the pilot, set the rules before rollout, and you own what we build."
        path="/why-us/"
      />
      <WhyUsPage />
    </>
  );
}
