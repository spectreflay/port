import React from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

function ContactMe({}: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const mailtoLink = `mailto:anon203kaiz@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=Hi, my name is ${encodeURIComponent(formData.name)}. %0D%0A%0D%0A${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
    reset();
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>

      <div className="w-full max-w-6xl mx-auto bg-[#303633]/40 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Let's Connect
              </h4>
              <p className="text-gray-400 text-lg">
                Feel free to reach out. I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 group">
                <div className="bg-[#8be8cb]/10 p-4 rounded-lg group-hover:bg-[#8be8cb]/20 transition-all duration-300">
                  <PhoneIcon className="text-[#8be8cb] h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white text-lg">09454123123</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-[#8be8cb]/10 p-4 rounded-lg group-hover:bg-[#8be8cb]/20 transition-all duration-300">
                  <EnvelopeIcon className="text-[#8be8cb] h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white text-lg">anon203kaiz@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-[#8be8cb]/10 p-4 rounded-lg group-hover:bg-[#8be8cb]/20 transition-all duration-300">
                  <MapPinIcon className="text-[#8be8cb] h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white text-lg">test area city</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className="contactInput"
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Your Email"
                  className="contactInput"
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register("subject", { required: "Subject is required" })}
                placeholder="Subject"
                className="contactInput"
                type="text"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Your Message"
                className="contactInput min-h-[200px] resize-none"
                rows={8}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#8be8cb] w-full py-4 px-10 rounded-lg text-[#303633] font-bold text-lg 
                       transition-all duration-300 hover:bg-[#8be8cb]/80 
                       active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-[0_0_15px_rgba(139,232,203,0.3)] hover:shadow-[0_0_25px_rgba(139,232,203,0.5)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;