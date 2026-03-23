import React from "react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Our Journey 🚀
          </h2>
          <p className="text-gray-600 mt-4">
            We are building a powerful platform for vendors, affiliates, and customers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Our Start</h3>
            <p className="text-gray-600">
              Founded in 2020 with a mission to grow businesses digitally.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Our Growth</h3>
            <p className="text-gray-600">
              Thousands of vendors joined and millions of users trust us.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Our Future</h3>
            <p className="text-gray-600">
              We aim to build the biggest eCommerce ecosystem.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;