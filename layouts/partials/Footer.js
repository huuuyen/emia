"use client";

import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import ImageFallback from "@layouts/components/ImageFallback";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const { copyright, footer_content } = config.params;
  const { email, phone, location } = config.contact_info;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="bg_footer">
      <div className="container">
        <div className="section row justify-center">
          <div className="row py-8 lg:py-12">
            <div className="animate md:col-5 lg:col-5">
              <ImageFallback
                className="banner-img"
                src="/images/footer/logo_emia.svg"
                width={184}
                height={59}
                sizes="100vw"
                alt="logo emia"
              />
              {/* <p className="text-white mt-2 mb-1 font-medium">EXPERIENCE MANAGEMENT &</p>
              <p className="text-white mb-1 font-medium">INNOVATION ACADEMY JOINT STOCK COMPANY</p>
              <p className="text-white mb-1 font-medium">COMPANY</p> */}

              {/* <p className="text-white mt-8 mb-2 font-semibold">{t("footer.address")}</p> */}
              <p className="text-white mb-1 mt-8">{t("footer.addressLine1")}</p>
              <p className="text-white mb-1">{t("footer.addressLine2")}</p>
              <p className="text-white mb-1">{t("footer.addressLine3")}</p>



            </div>
            <div className="animate mt-8 md:col-7 lg:col-7 lg:mt-0">
              <div className="row border-b border-white/20 py-5 justify-between">
                <div className="animate md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">{t("footer.coursesPrograms")}</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">{t("footer.aboutEmia")}</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">{t("footer.dxcon")}</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">{t("footer.contactUs")}</p>
                </div>
              </div>

              {/* <div className="row border-b border-white/20 py-5">
                <div className="animate md:col-6 lg:col-4 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium">{t("footer.facebookFanpage")}</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium">{t("footer.linkedIn")}</p>
                </div>
              </div> */}
              <div className="row border-b border-white/20 py-5 justify-between">
                <div className="animate mt-4 md:col-6 lg:col-6 lg:mt-0 mb-6 lg:mb-0">
                  <p className="text-white font-medium mb-2 font-weight-700">{t("footer.officeHanoi")}</p>
                  <p className="text-white font-medium mb-2">{t("footer.officeHanoiLine1")}</p>
                  <p className="text-white font-medium mb-2">{t("footer.officeHanoiLine2")}</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-6 lg:mt-0 mb-6 lg:mb-0">
                  <p className="text-white font-medium mb-2 font-weight-700">{t("footer.officeHCM")}</p>
                  <p className="text-white font-medium mb-2">{t("footer.officeHCMLine1")}</p>
                  <p className="text-white font-medium mb-2">{t("footer.officeHCMLine2")}</p>
                </div>
              </div>
            </div>

            <div className="animate md:col-5 lg:col-5">
              <div className="button-back-to-top mt-10">
              {/* <Link className="btn " href="javascript(0)" onClick={scrollToTop}>
                <span className="flex items-center justify-center gap-2"><FeatherIcon icon="arrow-up" /><span>Back to top</span> </span>
                  
                </Link> */}
                <button className="btn btn-back-to-top" onClick={scrollToTop}>
                  <span className="flex items-center justify-center gap-2">
                    <FeatherIcon icon="arrow-up" />
                    <span>{t("footer.backToTop")}</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="animate mt-8 md:col-7 lg:col-7 lg:mt-0">
              <div className="row mt-10 items-center">
                <div className="animate md:col-6 lg:col-6 lg:mt-0">
                  <p className="text-white mb-2">{t("footer.phoneNumber")}</p>
                  <p className="text-white">{t("footer.emailAddress")}</p>
                </div>
                <div className="animate mt-6 md:col-6 lg:col-5 lg:mt-0 lg:text-right">
                  <p className="text-white">{t("footer.copyright")}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
