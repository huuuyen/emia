"use client";

import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLanguage } from "../../contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section className="section c-courses-section">
      <div className="container">
        <div className="section row  justify-center">
          <div className="animate lg:col-5">
            <div className="c-courses-title pl-0">
              {markdownify(t("contact.title"), "span", "pl-0 mt-4 mb-10")}
            </div>
            <FeatherIcon icon="map-pin" className="icon-map" />
            <div className="c-course-duration-label">{t("contact.address")}</div>
            {markdownify(t("contact.addressLine1"), "div", "")}
            {markdownify(t("contact.addressLine2"), "div", "mb-10")}
            <FeatherIcon icon="at-sign" className="icon-contact"/>
            <div className="c-course-duration-label ">{t("contact.contact")}</div>
            {markdownify(t("contact.phone"), "div", "")}
            {markdownify(t("contact.email"), "div", "")}
            {/* <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            /> */}
          </div>
          <div className="animate lg:col-5">
            <form
              method="POST"
              action="#"
              className=" contact-form rounded-xl "
            >
              <div>{t("contact.description")}</div>
              <div className="row gap-4 mt-6 mb-6 justify-between">
                <div className=" lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="firstname"
                    >
                      {t("contact.firstName")}
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className=" lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="lastname">
                      {t("contact.lastName")}
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row gap-4 mt-6 mb-6 justify-between">
                <div className=" lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="firstname"
                    >
                      {t("contact.companyEmail")}
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      placeholder={t("contact.companyEmailPlaceholder")}
                      required
                    />
                  </div>
                </div>
                <div className=" lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="lastname">
                      {t("contact.phoneNumber")}
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      placeholder={t("contact.phonePlaceholder")}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  {t("contact.message")}
                </label>
                <textarea className="form-textarea w-full" rows="6" placeholder={t("contact.messagePlaceholder")} />
              </div>

              <div className="mb-6">

                <select>
                  <option value="someOption">{t("contact.requestInfo")}</option>
                  <option value="otherOption">{t("contact.coursePrograms")}</option>
                  <option value="otherOption">{t("contact.partnership")}</option>
                  <option value="otherOption">{t("contact.feedback")}</option>
                  <option value="otherOption">{t("contact.friendlyMessage")}</option>

                </select>
              </div>
              <div className="button-sucess">
                <Link
                  className="btn mb-10 "
                  href="javascript(0)"
                >
                  <span className="flex items-center justify-center gap-2"><span>{t("contact.sendMessage")}</span> <FeatherIcon icon="arrow-right" /></span>
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
