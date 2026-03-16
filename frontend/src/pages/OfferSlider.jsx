import { useState, useEffect } from "react";

export default function OfferSlide() {
  const slides = [
    {
      title: "Mega Fashion Sale",
      desc: "Up to 50% OFF on Premium Clothing",
      btn: "Shop Now",
      img: "https://images.unsplash.com/photo-1445205170230-053b83016050"
    },
    {
      title: "New Arrivals",
      desc: "Discover the Latest Fashion Collection",
      btn: "Explore Now",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
    },
    {
      title: "Exclusive Deals",
      desc: "Top Brands at Best Prices",
      btn: "View Deals",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slider);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">

          <div className="relative h-[350px]">
            <img
              src={slides[index].img}
              className="w-full h-full object-cover"
              alt="offer"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
              <h2 className="text-4xl font-bold mb-3">
                {slides[index].title}
              </h2>

              <p className="mb-5 text-lg">
                {slides[index].desc}
              </p>

              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold">
                {slides[index].btn}
              </button>
            </div>

            {/* Left Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2 rounded-full shadow"
            >
              ❮
            </button>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2 rounded-full shadow"
            >
              ❯
            </button>

          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  index === i ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}