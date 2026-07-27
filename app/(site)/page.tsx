import Hero from '@/components/Hero';
import { getHome } from '@/lib/site';

export default async function HomePage() {
  const home = await getHome();

  return (
    <Hero
      colorSrc={home.heroColor}
      bwSrc={home.heroBw}
      positionClass={home.heroPositionClass}
      tagline={home.tagline}
      subtagline={home.subtagline}
    />
  );
}
