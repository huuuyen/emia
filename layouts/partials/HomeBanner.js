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

const HomeBanner = ({ banner: bannerData, brands }) => {
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
                  <div className="mb-8 banner-title ">
                    {bannerData.title}
                  </div>
                  <div className="mb-8 banner-title bold ">
                    {bannerData.titledetail}
                  </div>
                  <div className="banner-btn button-sucess">
                    <Link
                      className="btn "
                      href={bannerData.link.href} 
                    >
                     <span className="flex items-center justify-center gap-2"><span>{bannerData.link.label}</span> <FeatherIcon icon="arrow-right" /></span> 
                    </Link>
                  </div>
                </div>
                <div className="col-10 pt-10">
                  <ImageFallback
                    className="banner-img"
                    src={bannerData.image}
                    width={1170}
                    height={666}
                    priority={true}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row border-y border-border py-5">
            <div className="animate from-right col-12">
              <Swiper
                loop={true}
                slidesPerView={3}
                breakpoints={{
                  992: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={20}
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
              >
                {brands.map((brand, index) => (
                  <SwiperSlide
                    className=" h-20 cursor-pointer px-6 py-6 grayscale  transition hover:grayscale-0 lg:px-10"
                    key={"brand-" + index}
                  >
                    <div className="relative h-full">
                      <ImageFallback
                        className="object-contain"
                        src={brand}
                        sizes="100vw"
                        alt=""
                        fill={true}
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
