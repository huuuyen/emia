"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

const expertLogos = [
  "/images/trained/01.png",
  "/images/trained/02.png",
  "/images/trained/03.png",
  "/images/trained/04.png",
  "/images/trained/05.png",
  "/images/trained/06.png",
];

const LevelEMIA = ({ levelemia }) => {
  const { t } = useLanguage();
  return (
    <section className="section ">
      <div className="container pt-10 pb-10">
        <div className="row justify-center">
          {markdownify(t("levelemia.title"), "p", "mt-4 levelemia-label")}
        </div>
        <div className="row justify-evenly mt-5">
          <div className="animate lg:col-5 levelemia-content">
            {markdownify(t("levelemia.left.label"), "p", "mt-2 levelemia-content-label")}
            {markdownify(t("levelemia.left.description"), "p", "mt-2 levelemia-content-description")}
            <ImageFallback
              className="banner-img"
              src={levelemia.left.image}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
              alt={t("levelemia.left.label")}
            />
          </div>
          <div className="animate lg:col-5 levelemia-content">
            {markdownify(t("levelemia.right.label"), "p", "mt-2 levelemia-content-label")}
            {markdownify(t("levelemia.right.description"), "p", "mt-2 levelemia-content-description")}
            <ImageFallback
              className="banner-img"
              src={levelemia.right.image}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
              alt={t("levelemia.right.label")}
            />
          </div>
        </div>
      </div>

      <div className="container levelemia-expert-wrapper">
        <div className="row justify-center">
          {markdownify(
            t("levelemia.expert.label"),
            "p",
            "levelemia-expert-title"
          )}
        </div>
        <div className=" levelemia-expert-logos justify-center">
          {expertLogos.map((logo, index) => (
            <div className="levelemia-expert-logo" key={`expert-logo-${index}`}>
              <ImageFallback
                src={logo}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt={`${t("levelemia.expert.label")} logo ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelEMIA;
