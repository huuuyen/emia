"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import Link from "next/link";

const DownloadModal = ({ isOpen, onClose }) => {
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
    // Handle download logic here
    console.log("Download clicked with data:", formData);
    // You can add your download logic here
    // For now, just close the modal
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
        className="relative w-[538px] max-w-[95vw] h-[360px] bg-white shadow-xl"
        style={{ borderRadius: "24px", padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <CgClose className="h-4 w-4" />
        </button>

        <div className="flex h-full" style={{ gap: "31px" }}>
          {/* Left side - Image */}
          <div
            className="flex-shrink-0"
            style={{ width: "calc(50% - 15.5px)", height: "100%" }}
          >
            <ImageFallback
              src="/images/left_popup_dowload.png"
              alt="Download Resource"
              width={245}
              height={312}
              className="h-full w-full object-cover rounded-lg"
              fallbackSrc="/images/banner-app.png"
            />
          </div>

          {/* Right side - Form */}
          <div className="flex-1 bg-white flex flex-col justify-center h-full">
            <form
              onSubmit={handleDownload}
              className="h-full flex flex-col justify-center"
            >
              {/* Title text */}
              <p className="text-sm text-dark mb-6">
                Find out more about our program detail & useful content for your
                CX journey
              </p>

              {/* Your Name Input */}
              <div style={{ marginBottom: "31px" }}>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium text-dark"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your name"
                />
              </div>

              {/* Your Company Email Input */}
              <div style={{ marginBottom: "31px" }}>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-dark"
                >
                  Your Company Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="yourname@company.com"
                />
              </div>

              {/* Buttons */}
              <div className="flex" style={{ gap: "31px" }}>
                <div className="col-auto c-courses-button-download">
                  <Link className="btn " href="javascript:void(0)">
                    Download
                  </Link>
                </div>
                <Link className="btn " href="javascript:void(0)">
                  Later
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
