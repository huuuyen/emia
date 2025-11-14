import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import HomeBanner from "@layouts/partials/HomeBanner";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import SpecialFeatures from "@layouts/partials/SpecialFeatures";
import How from "@layouts/partials/How";
import SliderLine from "@layouts/partials/SliderLine";

import Testimonial from "@layouts/partials/Testimonial";
import { getListPage } from "@lib/contentParser";
import config from "@config/config.json";

import Courses from "@layouts/partials/Courses";

import Partnership from "@layouts/partials/Partnership";
import Contact from "@layouts/partials/Contact";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { vector_bg } = config.site;
  const { frontmatter } = homepage;
  const {
    banner,
    brands,
    how,
    brands_line1,
    brands_line2,
    brands_line3,
    courses,
    partnership,
  } = frontmatter;
  return (
    <GSAPWrapper>
      <div
        className="test_demo container"
        style={{
          backgroundImage: `url(${vector_bg})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <SeoMeta title="Home" />
        <HomeBanner banner={banner} brands={brands} />
        <Cta />
        <How how={how} />
        <SliderLine
          brands_line1={brands_line1}
          brands_line2={brands_line2}
          brands_line3={brands_line3}
        />
        <Courses courses={courses} />
        <Partnership partnership={partnership} />
        <Contact />
      </div>
    </GSAPWrapper>
  );
};

export default Home;
