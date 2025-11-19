"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../lib/translations";

const Courses = ({ courses }) => {
  const { t, language } = useLanguage();
  
  // Helper function to get array translations
  const getArrayTranslation = (key, index) => {
    const fullKey = `courses.list.${index}.${key}`;
    try {
      // Get the translation object (which has vi and en arrays)
      const keys = fullKey.split(".");
      let value = translations;
      
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return [];
        }
      }
      
      // If we have an object with vi/en, return the array for current language
      if (value && typeof value === "object" && language in value) {
        return Array.isArray(value[language]) ? value[language] : [];
      }
      
      return [];
    } catch (error) {
      return [];
    }
  };
  return (
    <section className="section c-courses-section">
      <div className="container c-courses-container">
        {/* Header */}
        <div className="row justify-center c-courses-header">
          <div className="animate lg:col-12 c-courses-title">
            {markdownify(t("courses.title"), "span", "mt-4")}
            <p>{t("courses.description")}</p>
            <div className="row mt-5 d-flex align-items-center c-courses-buttons">
              <div className="col-auto c-courses-button-download">
                <Link className="btn " href={courses.button.link}>
                <p className="flex items-center justify-center gap-2"><p>{t("courses.button")}</p> <FeatherIcon icon="arrow-down" /></p>
                </Link>
              </div>
              <div className="col-auto c-courses-button-contact">
                <Link href={courses.contact.link}>
                <p className="flex items-center justify-center gap-2"><p>{t("courses.contact")}</p> <FeatherIcon icon="arrow-right" /></p>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="animate lg:col-5 c-courses-title">
            {markdownify(courses.title, "span", "mt-4")}
          </div>
          <div className="animate lg:col-5 c-courses-description">
            <p>{courses.description}</p>
            <div className="row mt-5 d-flex align-items-center c-courses-buttons">
              <div className="col-auto c-courses-button-download">
                <Link className="btn " href={courses.button.link}>
                  {courses.button.label}
                </Link>
              </div>
              <div className="col-auto c-courses-button-contact">
                <Link href={courses.contact.link}>
                  {courses.contact.label}
                </Link>
              </div>
            </div>
          </div> */}
        </div>

        {/* Courses List */}
        {courses.list.map((item, index) => (
          <div
            key={index}
            className="row items-center justify-center mt-5 pt-5 border-t c-courses-item"
          >
            {/* Image */}
            <div className="animate lg:col-5 c-course-image">
              <ImageFallback
                className="banner-img"
                src={item.image}
                width={432}
                height={294}
                sizes="100vw"
                alt={t(`courses.list.${index}.title`)}
              />
            </div>

            {/* Content */}
            <div className="animate lg:col-5 c-course-content">
              <div className="c-course-title">{t(`courses.list.${index}.title`)}</div>
              <div className="c-course-subtitle">{t(`courses.list.${index}.subtitle`)}</div>
              <div className="c-course-description">{t(`courses.list.${index}.content`)}</div>

              <div className="row c-course-details justify-between mt-5">
                <div className="animate lg:col-8 c-course-bestfor ">
                  <div className="c-course-duration-label">{t("courses.bestFor")}</div>

                  <ul className="flex flex-wrap gap-2">
                    {getArrayTranslation("bestfors", index).map((bestfor, id2) => (
                      <li className=" c-course-item-loop" key={id2}>{bestfor}</li>
                    ))}
                  </ul>
                </div>

                <div className="animate lg:col-3 c-course-types">
                  <div className="c-course-duration-label">{t("courses.type")}</div>

                  <ul className="flex flex-wrap gap-2">
                    {getArrayTranslation("types", index).map((type, id3) => (
                      <li className="c-course-item-loop" key={id3}>{type}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <div className="c-course-duration-label">{t("courses.duration")}</div>
                <div className="c-course-duration-time">{t(`courses.list.${index}.duration`)}</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
