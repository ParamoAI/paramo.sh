import SeoHead from '@/site/components/SeoHead';
import WhatWeDoPage from '@/site/views/WhatWeDoPage';

// New page in the redesign.
export default function WhatWeDo() {
  return (
    <>
      <SeoHead
        title="What we do | Páramo"
        description="Five ways Páramo puts AI to work in your business: AI Concierge, team AI workshops, AI strategy, a fractional chief AI officer, and managed agents."
        path="/what-we-do/"
      />
      <WhatWeDoPage />
    </>
  );
}
