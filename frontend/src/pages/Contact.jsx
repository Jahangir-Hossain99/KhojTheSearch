import React, { useState } from 'react';

const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // A generic change handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // A handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to an API endpoint
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            We'd love to hear from you! Please fill out the form or use one of the contact methods below.
          </p>
        </div>

        {/* Contact Form and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-lg p-8 md:p-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-cyan-400 pb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:border-l md:pl-12 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-cyan-400 pb-4">Contact Information</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <div className="flex items-start">
                <span className="flex-shrink-0 material-icons text-cyan-600 text-3xl mr-4">&#9993;</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p>support@khojthejob.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 material-icons text-cyan-600 text-3xl mr-4">&#9742;</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p>+1 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 material-icons text-cyan-600 text-3xl mr-4">&#9992;</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p>123 Career Blvd, Suite 456<br />San Francisco, CA 94103</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 material-icons text-cyan-600 text-3xl mr-4">&#9994;</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Follow Us</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-500 hover:text-cyan-600 transition-colors">
                      <span className="material-icons">Twitter</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-cyan-600 transition-colors">
                      <span className="material-icons">LinkedIn</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-cyan-600 transition-colors">
                      <span className="material-icons">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;