import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import ImageFallback from "@layouts/components/ImageFallback";
const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { email, phone, location } = config.contact_info;
  return (
    <footer className="bg_footer">
      <div className="container">
        <div className="section row justify-center">
          <div className="row py-8 lg:py-12">
            <div className="animate md:col-6 lg:col-6">
              <ImageFallback
                className="banner-img"
                src="/images/footer/logo_emia.png"
                width={184}
                height={59}
                sizes="100vw"
                alt="logo emia"
              />
              <p className="text-white mt-2 mb-1 font-medium">EXPERIENCE MANAGEMENT &</p>
              <p className="text-white mb-1 font-medium">INNOVATION ACADEMY JOINT STOCK COMPANY</p>
              <p className="text-white mb-1 font-medium">COMPANY</p>

              <p className="text-white mt-8 mb-2 font-semibold">Address:</p>
              <p className="text-white mb-1">No. 42, Alley 528 Bach Dang Street,</p>
              <p className="text-white mb-1">Hong Ha Ward, Hoan Kiem District,</p>
              <p className="text-white mb-1">Hanoi, Vietnam</p>



            </div>
            <div className="animate mt-8 md:col-6 lg:col-6 lg:mt-0">
              <div className="row border-b border-white/20 py-5 justify-between">
                <div className="animate md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">Courses & Programs</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">About EMIA</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">Resources</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium mb-2">Partnership</p>
                </div>
              </div>

              <div className="row border-b border-white/20 py-5">
                <div className="animate md:col-6 lg:col-2 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium">DXCON</p>
                </div>
                <div className="animate mt-4 md:col-6 lg:col-3 lg:mt-0 mb-4 lg:mb-0">
                  <p className="text-white font-medium">Contact us</p>
                </div>
              </div>

              <div className="row border-border py-5">
                <div className="animate md:col-6 lg:col-12 lg:mt-0">
                  <Social source={social} className="social-icons mt-5" />
                </div>
              </div>
            </div>

            <div className="animate md:col-6 lg:col-6">
              <div className="button-back-to-top mt-10">
                <Link className="btn " href="javascript(0)">
                  Back to top
                </Link>
              </div>
            </div>
            <div className="animate mt-8 md:col-6 lg:col-6 lg:mt-0">
              <div className="row mt-10 items-center">
                <div className="animate md:col-6 lg:col-6 lg:mt-0">
                  <p className="text-white mb-2">Phone: +84 357 105 827</p>
                  <p className="text-white">Email: contact@emia.vn</p>
                </div>
                <div className="animate mt-6 md:col-6 lg:col-5 lg:mt-0 lg:text-right">
                  <p className="text-white">© 2025 EMIA</p>
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
