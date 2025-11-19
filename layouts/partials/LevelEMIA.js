"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

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
    </section>
  );
};

export default LevelEMIA;
