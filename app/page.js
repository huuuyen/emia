import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import HomeBanner from "@layouts/partials/HomeBanner";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import SpecialFeatures from "@layouts/partials/SpecialFeatures";
import Testimonial from "@layouts/partials/Testimonial";
import { getListPage } from "@lib/contentParser";
import config from "@config/config.json";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { vector_bg } = config.site;
  const { frontmatter } = homepage;
  const { banner, brands, features, intro, speciality, testimonial } =
    frontmatter;
  return (
    <GSAPWrapper>
      <div
        className="test_demo container"
        style={{ backgroundImage: `url(${vector_bg})`, backgroundRepeat: 'no-repeat' }}
      >
        <SeoMeta title="Home" />
        <HomeBanner banner={banner} brands={brands} />
        <Cta />
        <Features features={features} />
        <ShortIntro intro={intro} />
        <SpecialFeatures speciality={speciality} />
        <Testimonial testimonial={testimonial} />
        
      </div>
    </GSAPWrapper>
  );
};

export default Home;
