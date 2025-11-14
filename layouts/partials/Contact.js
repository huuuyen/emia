import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="section c-courses-section">
      <div className="container">
        <div className="section row  justify-center">
          <div className="animate lg:col-5">
            <div className="animate c-courses-title">
              {markdownify("Drop us a message", "span", "mt-4")}
            </div>
            <div className="c-course-duration-label mt-10">Address</div>
            {markdownify("No. 42, Alley 528 Bach Dang Street,", "div", "")}
            {markdownify("Hong Ha Ward, Hoan Kiem District, ", "div", "")}
            {markdownify("Hanoi, Vietnam", "div", "")}

            <div className="c-course-duration-label mt-10">Contact</div>
            {markdownify("Phone: +84 357 105 827", "div", "")}
            {markdownify("Email: contact@emia.vn", "div", "")}
            {/* <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            /> */}
          </div>
          <div className="animate lg:col-5">
            <form
              method="POST"
              action="#"
              className=" contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            >
              <div>Let’s get connected! We would love you to share your CXM journey, your need of training, an idea of Partnership or even a feedback for us to serve you better.</div>
              <div className="row gap-4 mt-6 mb-6 justify-between">
                <div className="animate lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="firstname"
                    >
                      First Name
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="animate lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="lastname">
                      Last Name
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row gap-4 mt-6 mb-6 justify-between">
                <div className="animate lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="firstname"
                    >
                      Your Company Email
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      placeholder="yourname@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="animate lg:col-6 customer-form">
                  <div className="">
                    <label
                      className="mb-2 block font-medium text-dark"
                      htmlFor="lastname">
                      Your Phone number
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      placeholder="+ 84 999 999 9999"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Your message for us
                </label>
                <textarea className="form-textarea w-full" rows="6" placeholder="Share with EMIA what is in your mind" />
              </div>

              <div className="mb-6">

                <select>
                  <option value="someOption">Request information</option>
                  <option value="otherOption">Course & Programs</option>
                  <option value="otherOption">Partnership</option>
                  <option value="otherOption">Customer feedback</option>
                  <option value="otherOption">A friendly message</option>

                </select>
              </div>
              <div className="button-sucess">
                <Link className="btn " href="javascript(0)">
                  Send Message
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
