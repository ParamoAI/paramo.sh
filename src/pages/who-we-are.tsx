import SeoHead from '@/site/components/SeoHead';
import AboutPage from '@/site/views/AboutPage';

// New page in the redesign.
export default function WhoWeAre() {
  return (
    <>
      <SeoHead
        title="Who we are | Páramo"
        description="Páramo was founded by brothers Dennis and Adrian Morales, rooted in Colombia and based in the Twin Cities. Meet the team behind your AI transformation partner."
        path="/who-we-are/"
      />
      <AboutPage />
    </>
  );
}
