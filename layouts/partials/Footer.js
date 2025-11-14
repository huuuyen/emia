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
          <div className="row  py-12">
            <div className="animate md:col-6 lg:col-6">
              <ImageFallback
                className="banner-img"
                src="/images/footer/logo_emia.png"
                width={184}
                height={59}
                sizes="100vw"
                alt="logo emia"
              />
              {markdownify("EXPERIENCE MANAGEMENT &", "p", "mt-2")}
              {markdownify("NNOVATION ACADEMY JOINT STOCK COMPANY", "p", "")}
              {markdownify("COMPANY", "p", "")}

              {markdownify("Address:", "p", "mt-10")}
              {markdownify("No. 42, Alley 528 Bach Dang Street,", "p", "")}
              {markdownify("Hong Ha Ward, Hoan Kiem District,", "p", "")}
              {markdownify("Hanoi, Vietnam", "p", "")}



            </div>
            <div className="animate mt-8 md:col-6 lg:col-6 lg:mt-0">
              <div className="row border-b border-border py-5 justify-between">
                <div className="animate md:col-6 lg:col-3 lg:mt-0">
                  Courses & Programs
                </div>
                <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
                  About EMIA
                </div>
                <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
                  Resources
                </div>
                <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
                  Partnership
                </div>
              </div>

              <div className="row border-b border-border py-5 ">
                <div className="animate md:col-6 lg:col-2 lg:mt-0">
                  DXCON
                </div>
                <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
                  Contact us
                </div>
              </div>

              <div className="row    border-border  ">
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
              <div className="row mt-10  ">
                <div className="animate md:col-6 lg:col-6 lg:mt-0">
                  {markdownify("Phone: +84 357 105 827", "p", "")}
                  {markdownify("Email: contact@emia.vn", "p", "")}
                </div>
                <div className="animate mt-8 md:col-6 lg:col-5 lg:mt-0" style={{textAlign:"right"}}>
                  © 2025 EMIA
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
