import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";

const How = ({ how }) => {
  return (
    <section className="section pt-0">
      <div className="container">
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

        <div className="mx-auto">
          <div className="recipe pt-10">
            <div className="recipe-emia-core">
              EMIA’s CORE = <span className="item-core-recipe">EMPATHY</span> +{" "}
              <span className="item-core-recipe">MASTERY</span> +{" "}
              <span className="item-core-recipe">INNOVATION</span> +{" "}
              <span className="item-core-recipe">ASPIRATION</span>
            </div>
          </div>
        </div>

        {/* people */}
        <div className="row items-center justify-center">
          <div className="animate lg:col-6  pl-20 pr-20">
            <ImageFallback
              className="pt-10 pb-5"
              src={how.people.image_icon_up}
              width={54}
              height={40}
              alt="primary speciality"
            />
            <p className="how-title">{how.people.subtitle}</p>
            {markdownify(how.people.description, "p", "mt-2")}
            <ImageFallback
              className="pt-10"
              src={how.people.image}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
              alt="primary speciality"
            />
          </div>
          <div className="animate lg:col-5  pl-20 pr-20">
            <ImageFallback
              className="pt-10"
              src={how.people.people_right}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
              alt="primary speciality"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default How;
