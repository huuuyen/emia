import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";

const How = ({ how }) => {
  return (
    <section className="section pt-0">
      <div className="containe ">
        <div className="how-bg">
          {/* people */}
          <div className="row items-center justify-center ">
            <div className="animate lg:col-6  pl-20 pr-20">
              <p className="how-title">{how.aboutEmia.subtitle}</p> 
              {markdownify(how.aboutEmia.title, "p", "mt-2 how-font-title")}
              {markdownify(how.aboutEmia.description, "p", "mt-2")}
            </div>
            <div className="animate lg:col-5  pl-20 pr-20">
              <ImageFallback
                className="pt-10"
                src={how.aboutEmia.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // optional
                alt="primary speciality"
              />
            </div>
          </div>

          <div className="row items-center justify-center">
            <div className="animate lg:col-6 lg:order-2 pl-20 pr-20">
              <p className="how-title">{how.vision.subtitle}</p>
              {markdownify(how.vision.description, "p", "mt-5")}
              <ImageFallback
                className="pt-10"
                src={how.vision.image}
                width={54}
                height={40}
                alt="primary speciality"
              />
            </div>
            <div className="animate lg:col-5 lg:order-1 pl-20 pr-20">
              <p className="how-title">{how.mission.subtitle}</p>
              {markdownify(
                how.mission.title,
                "h2",
                "mt-4 section-title bar-left",
              )}
              {markdownify(how.mission.description, "p", "mt-5")}
              <ImageFallback
                className="pt-10"
                src={how.mission.image}
                width={54}
                height={40}
                alt="primary speciality"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default How;
