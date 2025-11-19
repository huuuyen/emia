"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useLanguage } from "../../contexts/LanguageContext";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const DownloadModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    // Placeholder for download logic
    onClose();
  };

  const handleLater = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-auto w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-xl lg:h-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          aria-label="Close download modal"
        >
          <CgClose className="h-4 w-4" />
        </button>

        <div className="flex h-full flex-col gap-6 lg:flex-row">
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

          <div className="flex flex-1 flex-col justify-center">
            <form onSubmit={handleDownload} className="space-y-6">
              <p className="text-sm text-dark">{t("downloadModal.title")}</p>

              <div>
                <label
                  htmlFor="download-name"
                  className="mb-1 block text-xs font-medium text-dark"
                >
                  {t("downloadModal.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="download-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={t("downloadModal.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="download-email"
                  className="mb-1 block text-xs font-medium text-dark"
                >
                  {t("downloadModal.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="download-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={t("downloadModal.emailPlaceholder")}
                />
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row ">
                <button type="submit" className="btn flex-1 btn-dowload">
                <span className="flex items-center justify-center gap-2">
                    <span> {t("downloadModal.download")} </span>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
