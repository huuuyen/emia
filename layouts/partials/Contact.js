"use client";

import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || t("contact.successMessage"));
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || t("contact.errorMessage"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage(t("contact.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <FeatherIcon icon="at-sign" className="icon-contact" />
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
              onSubmit={handleSubmit}
              className=" contact-form rounded-xl "
            >
              <div>{t("contact.description")}</div>

              {/* Status Message */}
              {submitStatus && (
                <div
                  className={`mb-4 p-4 rounded-lg ${submitStatus === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                >
                  {submitMessage}
                </div>
              )}

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
                      name="firstName"
                      id="firstname"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
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
                      name="lastName"
                      id="lastname"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
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
                      htmlFor="email"
                    >
                      {t("contact.companyEmail")}
                    </label>
                    <input
                      className="form-input w-full"
                      name="email"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.companyEmailPlaceholder")}
                      required
                    />
                  </div>
                </div>
                <div className=" lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="phone">
                      {t("contact.phoneNumber")}
                    </label>
                    <input
                      className="form-input w-full"
                      name="phone"
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
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
                <textarea
                  className="form-textarea w-full"
                  name="message"
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>

              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  {t("contact.subject")}
                </label>
                <select
                  name="subject"
                  id="subject"
                  className="form-input w-full"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">{t("contact.selectSubject")}</option>
                  <option value={t("contact.coursePrograms")}>{t("contact.coursePrograms")}</option>
                  <option value={t("contact.feedback")}>{t("contact.feedback")}</option>
                </select>
              </div>
              <div className="button-sucess">
                {/* <button type="submit" className="btn flex-1 btn-dowload">
                  <span className="flex items-center justify-center gap-2">
                    <span> {t("downloadModal.download")} </span>
                    <FeatherIcon icon="arrow-right" />

                  </span>
                </button> */}

                <button
                  type="submit"
                  className="btn flex-1 btn-dowload"
                  disabled={isSubmitting}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>
                      {isSubmitting
                        ? t("contact.sending")
                        : t("contact.sendMessage")}
                    </span>
                    {!isSubmitting && <FeatherIcon icon="arrow-right" />}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
