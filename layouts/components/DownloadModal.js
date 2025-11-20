"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useLanguage } from "../../contexts/LanguageContext";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const DownloadModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    brochureType: [],
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      brochureType: e.target.checked
        ? [...prev.brochureType, value]
        : prev.brochureType.filter((type) => type !== value),
    }));
    setError("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.brochureType.length === 0) {
      setError(t("downloadModal.brochureTypeRequired"));
      return;
    }

    if (!formData.email) {
      setError(t("downloadModal.emailRequired"));
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brochureType: formData.brochureType,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        // Auto close after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ brochureType: [], email: "" });
          onClose();
        }, 3000);
      } else {
        setError(data.error || t("downloadModal.submitError"));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(t("downloadModal.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLater = () => {
    onClose();
    setIsSuccess(false);
    setFormData({ brochureType: [], email: "" });
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-auto w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-xl lg:h-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          aria-label="Close download modal"
        >
          <CgClose className="h-4 w-4" />
        </button>

        {isSuccess ? (
          /* Success message - full popup */
          <div className="flex h-full w-full flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                <FeatherIcon
                  icon="check"
                  className="h-8 w-8 text-white"
                  strokeWidth={3}
                />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-gray-700">
                  {t("downloadModal.successTitle")}
                </h3>
                <p className="text-base text-gray-500">
                  {t("downloadModal.successMessage")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col gap-6 lg:flex-row">
            {/* Image on left */}
            <div className="hidden flex-shrink-0 overflow-hidden rounded-2xl lg:block lg:w-1/2">
              <ImageFallback
                src="/images/left_popup_dowload.png"
                alt="Download Resource"
                width={245}
                height={312}
                className="h-full w-full object-cover"
                fallbackSrc="/images/banner-app.png"
                priority
              />
            </div>

            {/* Form on right */}
            <div className="flex flex-1 flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl  text-dark">
                  {t("downloadModal.title")}
                </h2>

                <div>
                  <label className="mb-3 block text-sm font-medium text-dark">
                    {t("downloadModal.brochureTypeLabel")}
                  </label>
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center space-x-3">
                      <input
                        type="checkbox"
                        name="brochureType"
                        value="individual"
                        checked={formData.brochureType.includes("individual")}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 cursor-pointer rounded border-gray-400 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm text-dark">
                        {t("downloadModal.forIndividual")}
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center space-x-3">
                      <input
                        type="checkbox"
                        name="brochureType"
                        value="organization"
                        checked={formData.brochureType.includes("organization")}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 cursor-pointer rounded border-gray-400 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm text-dark">
                        {t("downloadModal.forOrganization")}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="download-email"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    {t("downloadModal.email")}
                  </label>
                  <input
                    type="email"
                    id="download-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder={t("downloadModal.emailPlaceholder")}
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-4 pt-2 sm:flex-row ">
                  <button  disabled={isSubmitting} type="submit" className="btn flex-1 btn-dowload">
                    <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                      <span>{t("downloadModal.sendRequest")}</span>
                      <FeatherIcon icon="arrow-right" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn flex-1 text-dark text-[#1744F4]"
                    onClick={handleLater}
                  >
                    {t("downloadModal.later")}
                  </button>
                </div>

                {/* <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn flex-1 bg-green-500 text-dark hover:bg-green-600 disabled:opacity-50"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{t("downloadModal.sendRequest")}</span>
                      <FeatherIcon icon="arrow-right" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn flex-1 bg-transparent font-bold text-[#1744F4] hover:bg-gray-800"
                    onClick={handleLater}
                  >
                    {t("downloadModal.later")}
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadModal;
