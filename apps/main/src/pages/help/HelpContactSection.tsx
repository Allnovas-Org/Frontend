import React, { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

interface ContactFormData {
  username: string;
  email: string;
  mobile: string;
  company: string;
  message: string;
}

interface HelpContactSectionProps {
  onEmailClick?: () => void;
}

const HelpContactSection: React.FC<HelpContactSectionProps> = ({
  onEmailClick,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    username: "",
    email: "",
    mobile: "",
    company: "",
    message: "",
  });

  const [messageLength, setMessageLength] = useState(0);
  const MAX_MESSAGE_LENGTH = 2000;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "message") {
        setMessageLength(value.length);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);
      // Add API logic here
      // Reset form on success
      setFormData({
        username: "",
        email: "",
        mobile: "",
        company: "",
        message: "",
      });
      setMessageLength(0);
    },
    [formData],
  );

  const handleEmailClick = useCallback(() => {
    if (onEmailClick) {
      onEmailClick();
    }
    // You could also open email directly
    // window.location.href = 'mailto:support@allnovas.com';
  }, [onEmailClick]);

  return (
    <section className='w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white'>
      <div className='max-w-5xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-semibold text-gray-darker mb-2'>
            Get in Touch with Us
          </h2>
          <p className='text-sm md:text-base text-gray-dark'>
            Get custom help in minutes or{" "}
            <button
              onClick={handleEmailClick}
              className='text-primary cursor-pointer font-medium hover:text-primary hover:underline transition-colors'
              aria-label='Email support'
            >
              Email us
            </button>
          </p>
        </div>

        {/* Contact Container */}
        <div className='bg-white rounded-3xl shadow-lg border border-input overflow-hidden'>
          <div className='flex flex-col lg:flex-row'>
            {/* Illustration Side */}
            <div className='lg:w-1/2 bg-gray-lighter flex items-center justify-center p-8 md:p-12'>
              <div className='relative w-full max-w-sm'>
                {/* Decorative Element */}
                <div className='absolute -top-4 -left-4 w-12 h-12 bg-orange-400 rounded-full opacity-80' />

                {/* Illustration */}
                <img
                  src='/images/help-contact.png'
                  alt='Customer support illustration'
                  className='w-full h-auto relative z-10'
                />
              </div>
            </div>

            {/* Form Side */}
            <div className='lg:w-1/2 p-8 md:p-12'>
              <h3 className='text-xl md:text-2xl font-semibold text-gray-darker mb-2'>
                Need More Help?
              </h3>
              <p className='text-xs md:text-sm text-gray-dark mb-8 leading-relaxed'>
                Complete the form below to send us a message. Our support team
                will promptly respond to your request.
              </p>

              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Username Field */}
                <div>
                  <label className='block text-xs font-bold text-gray-dark uppercase mb-2'>
                    * Username
                  </label>
                  <input
                    type='text'
                    name='username'
                    placeholder='olatanji9'
                    value={formData.username}
                    onChange={handleInputChange}
                    className='w-full p-3 rounded-lg border border-input bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all'
                    required
                    aria-label='Username'
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className='block text-xs font-bold text-gray-700 uppercase mb-2'>
                    * Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    placeholder='olatanjisamuel@gmail.com'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full p-3 rounded-lg border border-input bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all'
                    required
                    aria-label='Email address'
                  />
                </div>

                {/* Mobile and Company Fields */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase mb-2'>
                      Mobile
                    </label>
                    <input
                      type='tel'
                      name='mobile'
                      placeholder='+234...'
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className='w-full p-3 rounded-lg border border-input bg-gray-lighter focus:bg-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all'
                      aria-label='Mobile number'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase mb-2'>
                      Company (Optional)
                    </label>
                    <input
                      type='text'
                      name='company'
                      placeholder='Orlando'
                      value={formData.company}
                      onChange={handleInputChange}
                      className='w-full p-3 rounded-lg border border-input bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all'
                      aria-label='Company name'
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className='block text-xs font-bold text-gray-700 uppercase mb-2'>
                    * Message
                  </label>
                  <textarea
                    name='message'
                    rows={4}
                    placeholder='Please type your message here...'
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className='w-full p-3 rounded-lg border border-input bg-gray-lighter focus:bg-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all resize-none'
                    required
                    aria-label='Message'
                  />
                  <div className='text-right text-xs text-input mt-1'>
                    {messageLength}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  className='w-full bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors group mt-6'
                  aria-label='Send message'
                >
                  Send Message
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpContactSection;
