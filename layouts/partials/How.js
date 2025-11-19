"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import { useLanguage } from "../../contexts/LanguageContext";

const How = ({ how }) => {
  const { t } = useLanguage();
  return (
    <section className="section pt-0">
      <div className="container">
        <div className="how-bg">
          {/* people */}
          <div className="row items-center justify-center ">
            <div className="animate lg:col-6 pt-10 pl-30 pr-30">
              <p className="how-title">{t("how.aboutEmia.subtitle")}</p> 
              {markdownify(t("how.aboutEmia.title"), "p", "mt-2 how-font-title")}
              {markdownify(t("how.aboutEmia.description"), "p", "mt-2")}
            </div>
            <div className="animate lg:col-5 pt-10 pl-30 pr-30">
              <ImageFallback
                className="pt-10"
                src={how.aboutEmia.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // optional
                alt="primary speciality"
              />
            </div>
          </div>

          <div className="row items-center justify-center mt-5">
            <div className="animate lg:col-6 lg:order-2  pl-30 pr-30">
              <p className="how-title">{t("how.vision.subtitle")}</p>
              {markdownify(t("how.vision.description"), "p", "mt-5")}
              <ImageFallback
                className="pt-10"
                src={how.vision.image}
                width={54}
                height={40}
                alt="primary speciality"
              />
            </div>
            <div className="animate lg:col-5 lg:order-1 pl-30 pr-30">
              <p className="how-title">{t("how.mission.subtitle")}</p>
              {markdownify(
                how.mission.title,
                "h2",
                "mt-4 section-title bar-left",
              )}
              {markdownify(t("how.mission.description"), "p", "mt-5")}
              <ImageFallback
                className="pt-10"
                src={how.mission.image}
                width={54}
                height={40}
                alt="primary speciality"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default How;
