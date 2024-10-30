import { useState } from "react";
import { FaLocationArrow, FaSpinner } from "react-icons/fa";
import emailjs from "@emailjs/browser";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

interface FormFields {
  name: string;
  email: string;
  number: string;
  message: string;
  [key: string]: string;
}

const Footer = () => {
  const [formValues, setFormValues] = useState<FormFields>({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Ensure from_name is included in formValues
    const emailData = {
        ...formValues,
        from_name: formValues.name, // Add this line if not already included
    };

    emailjs
      .send(
        "service_512f6rt",
        "template_udrkpjj",
        emailData, // Use emailData instead of formValues
        "uudQ5lKokUlSb2HHm"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Message sent!");
          setFormValues({ name: "", email: "", number: "", message: "" });
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send message.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
};

  return (
    <footer className="w-full pb-4 md:mb-1" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Let's Connect & <span className="text-purple"> Explore</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let's discuss how I can help you achieve your goals.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-white">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Number Field */}
          <div className="mt-4">
            <label className="block text-white">
              Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="number"
              value={formValues.number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Message Field */}
          <div className="mt-4">
            <label className="block text-white">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows={5}
              value={formValues.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <MagicButton
              title={loading ? "Sending..." : "Submit"}
              icon={loading ? <FaSpinner className="animate-spin" /> : <FaLocationArrow />}
              position="right"
              disabled={loading}
            />
          </div>
        </form>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light mb-5">
          Copyright © 2024 Ayush Jha
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.url} // Set href to the URL
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
