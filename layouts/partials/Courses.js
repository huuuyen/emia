import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Courses = ({ courses }) => {
  return (
    <section className="section c-courses-section">
      <div className="container c-courses-container">
        {/* Header */}
        <div className="row justify-center c-courses-header">
          <div className="animate lg:col-5 c-courses-title">
            {markdownify(courses.title, "span", "mt-4")}
          </div>
          <div className="animate lg:col-5 c-courses-description">
            <p>{courses.description}</p>
            <div className="row mt-5 d-flex align-items-center c-courses-buttons">
              <div className="col-auto c-courses-button-download">
                <Link className="btn " href={courses.button.link}>
                  {courses.button.label}
                </Link>
              </div>
              <div className="col-auto c-courses-button-contact">
                <Link href={courses.contact.link}>
                  {courses.contact.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        {courses.list.map((item, index) => (
          <div
            key={index}
            className="row items-center justify-center mt-5 pt-5 border-t c-courses-item"
          >
            {/* Image */}
            <div className="animate lg:col-5 c-course-image">
              <ImageFallback
                className="banner-img"
                src={item.image}
                width={432}
                height={294}
                sizes="100vw"
                alt={item.title}
              />
            </div>

            {/* Content */}
            <div className="animate lg:col-5 c-course-content">
              <div className="c-course-title">{item.title}</div>
              <div className="c-course-subtitle">{item.subtitle}</div>
              <div className="c-course-description">{item.content}</div>

              <div className="row c-course-details justify-between mt-5">
                <div className="animate lg:col-8 c-course-bestfor ">
                  <div className="c-course-duration-label">Best for</div>

                  <ul className="flex flex-wrap gap-2">
                    {item.bestfors.map((bestfor, id2) => (
                      <li className=" c-course-item-loop" key={id2}>{bestfor}</li>
                    ))}
                  </ul>
                </div>

                <div className="animate lg:col-3 c-course-types">
                  <div className="c-course-duration-label">TYPE</div>

                  <ul className="flex flex-wrap gap-2">
                    {item.types.map((type, id3) => (
                      <li className="c-course-item-loop" key={id3}>{type}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <div className="c-course-duration-label">{item.duration.lable}</div>
                <div className="c-course-duration-time">{item.duration.time}</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
