"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLanguage } from "../../contexts/LanguageContext";

const HomeBanner = ({ banner: bannerData, brands }) => {
  const quizLink =
    process.env.NEXT_PUBLIC_LINK_QUIZZ ??
    process.env.LINK_QUIZZ ??
    "#";
  const { t } = useLanguage();
  
  // Function to scroll to courses section
  const scrollToCourses = (e) => {
    e.preventDefault();
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  useEffect(() => {
    const ctx2 = gsap.context(() => {
    });

    return () => ctx2.revert();
  }, []);

  return (
    <section className="section banner pt-0">
      <div className="container-xl">
        <div className="relative">
          <div className="banner-bg col-12 absolute left-0 top-0">
          
          </div>
          <div className="row overflow-hidden rounded-2xl">
            <div className="col-12">
              <div className="row relative justify-center pb-10">
                <div className="banner-content col-10 pb-10 pt-40 text-center">
                  <div>
                     <Link
                      className="btn mb-10 banner-quizz"
                      href={quizLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     <span className="flex items-center justify-center gap-2"><span>{t("banner.quizz")}</span> <FeatherIcon icon="arrow-right" /></span>
                    </Link>
                  </div>
                  <div className="mb-8 banner-title ">
                    {t("banner.title")}
                  </div>
                  <div className="mb-8 banner-title bold ">
                    {t("banner.titleDetail")}
                  </div>
                  {markdownify(t("banner.subText1"), "div", "sub-banner-text")}
                 {markdownify(t("banner.subText2"), "div", "sub-banner-text mb-10")}
                  <div className="banner-btn button-sucess">
                    <Link
                      className="btn "
                      href="#courses"
                      onClick={scrollToCourses}
                    >
                     <span className="flex items-center justify-center gap-2"><span>{t("banner.button")}</span> <FeatherIcon icon="arrow-right" /></span> 
                    </Link>
                  </div>

                </div>

                
                {/* <div className="col-10 pt-10">
                  <ImageFallback
                    className="banner-img"
                    src={bannerData.image}
                    width={1170}
                    height={666}
                    priority={true}
                    alt=""
                  />
                </div> */}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
