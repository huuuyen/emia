"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect } from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({ brands_line1, brands_line2, brands_line3 }) => {
  useEffect(() => {
    console.log("brands_line1:", brands_line1);
    const ctx2 = gsap.context(() => {});
    return () => ctx2.revert();
  }, []);

  return (
    <section className="section banner pt-0">
      <div className="container-xl">
        <div className="relative">
          <div className="row ">
            <div className="animate  col-12 mb-5">
              <Swiper
                loop={true}
                slidesPerView={2}
                breakpoints={{
                  480: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={10}
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                speed={3000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
              >
                {brands_line1.map((brand, index) => (
                  <SwiperSlide
                    className=" cursor-pointer transition lg:px-1 swiper-slide-responsive"
                    key={"brand-" + index}
                  >
                    <div className="relative w-full h-full">
                      <ImageFallback
                        className="object-contain w-full h-full"
                        src={brand}
                        width={273}
                        height={194}
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* line 2 - chạy ngược */}
            <div className="animate col-12 mb-5">
              <Swiper
                loop={true}
                slidesPerView={2}
                breakpoints={{
                  480: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={10}
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                speed={3000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
              >
                {brands_line2.map((brand, index) => (
                  <SwiperSlide
                    className="p-0 cursor-pointer transition lg:px-1 swiper-slide-responsive"
                    key={"brand-" + index}
                  >
                    <div className="relative w-full h-full">
                      <ImageFallback
                        className="object-contain w-full h-full"
                        src={brand}
                        width={273}
                        height={194}
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* line 3 */}
            <div className="animate from-right col-12">
              <Swiper
                loop={true}
                slidesPerView={2}
                breakpoints={{
                  480: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={10}
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                speed={3000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
              >
                {brands_line3.map((brand, index) => (
                  <SwiperSlide
                    className="p-0 cursor-pointer transition lg:px-1 swiper-slide-responsive"
                    key={"brand-" + index}
                  >
                    <div className="relative w-full h-full">
                      <ImageFallback
                        className="object-contain w-full h-full"
                        src={brand}
                        width={273}
                        height={194}
                        sizes="100vw"
                        alt=""
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