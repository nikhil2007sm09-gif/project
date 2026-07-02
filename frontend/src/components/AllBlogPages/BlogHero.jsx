import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';

const BlogHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f4f0ea]">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-0 h-px bg-[#ded2c5]" />
        <div className="absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(214,143,55,0.18),transparent_36%)]" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-[radial-gradient(circle_at_85%_65%,rgba(63,50,44,0.13),transparent_38%)]" />
      </div>

      <div className="container relative mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ded2c5] bg-white/70 px-4 py-2 text-sm font-semibold text-[#6b5142] shadow-sm">
              <Sparkles className="h-4 w-4 text-[#d68f37]" />
              Latest Articles & Fashion Insights
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#302720] sm:text-5xl lg:text-7xl">
              Our Blog
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#665b53] sm:text-lg">
              Stay updated with the latest fashion trends, styling ideas,
              clothing care tips, and expert guides. Discover everything you
              need to elevate your wardrobe and express your unique style with
              confidence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[#75685d]">
                <Link to="/" className="hover:text-[#302720] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#302720] font-semibold">Blog</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-[#302720] shadow-2xl shadow-black/15 sm:min-h-[380px]">
            <img
              src="data:image/jpeg;base64,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"
              alt="Fashion Blog"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#302720]/90 via-[#302720]/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <BookOpen className="h-4 w-4" />
                Featured Article
              </div>

              <h2 className="max-w-md text-2xl font-black leading-tight sm:text-3xl">
                Discover Fashion Inspiration, Expert Styling Tips & Seasonal
                Trends.
              </h2>

              <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
                Read curated articles that help you choose the perfect outfits,
                care for your clothing, and stay ahead of the latest fashion
                trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;