"use client";

import { useCountdown } from "../../contexts/CountdownContext";
import config from "@config/config.json";
import CountdownTimer from "./CountdownTimer";
import SeoMeta from "@layouts/partials/SeoMeta";

const CountdownWrapper = ({ children }) => {
  const { countdown } = config;
  const { isExpired, launchDate } = useCountdown();
  const title = countdown?.title || "Sắp ra mắt";
  const subtitle = countdown?.subtitle || "Trang web của chúng tôi sẽ chính thức ra mắt vào ngày";
  const description = countdown?.description || "Đăng ký để nhận thông báo sớm nhất";

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // If countdown is expired, show the landing page
  if (isExpired) {
    return <>{children}</>;
  }

  // Otherwise, show countdown
  return (
    <>
      <SeoMeta title="Countdown - EMIA" />
      <div className="countdown-page min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold uppercase tracking-wide">
                Sắp ra mắt
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              {subtitle}
            </p>

            {/* Launch Date */}
            <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-12">
              {formatDate(launchDate)}
            </p>

            {/* Countdown Timer */}
            <div className="mb-12">
              <CountdownTimer targetDate={launchDate} />
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8">
              {description}
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountdownWrapper;

