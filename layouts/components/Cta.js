import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import Image from "next/image";
function Cta() {
  const { title, content, button, enable } = config.call_to_action;
  if (!enable) return;

  return (
    <section className="cta section pt-0" style={{ minHeight: "600px" }}>
      <div className="container-xl">
        <div className="section relative px-4 text-center">
          {/* <div className="animate">
            {markdownify(title, "h2", "section-title")}
            {markdownify(content, "p", "mt-10")}
          </div> */}
          <Image
            src="/images/Group17.svg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />
          {/* <Image src="/images/Group17.svg" alt={title} priority={true}  /> */}
          {/* <ImageFallback
              src="/images/Group17.svg"
              fill={true}
              alt="bg wave"
            /> */}
          <div className="bg_banner_02 animated-bg absolute top-0 left-0 w-full after:hidden"></div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
