import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Partnership = ({ partnership }) => {
  return (
    <section className="section c-courses-section">
      <div className="partnership-border">
        <div className="container c-courses-container partnership-inner pt-10 pb-10">
          <div className="row justify-center c-courses-header">
            <div className="animate lg:col-5 c-courses-title">
              {markdownify(partnership.title, "span", "mt-4 ")}
              <p className="mt-4">{partnership.description}</p>
              <div className="row mt-5 d-flex align-items-center c-courses-buttons">
                <div className="col-auto c-courses-button-download">
                  <Link className="btn " href={partnership.button.link}>
                    {partnership.button.label}
                  </Link>
                </div>
              </div>
            </div>
            <div className="animate lg:col-5 c-courses-description">
              <ImageFallback
                className="banner-img"
                src={partnership.image}
                width={545}
                height={306}
                sizes="100vw"
                alt={partnership.title}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Partnership;
