import { useState } from 'react'
import { Filter, X, Search, ChevronDown } from 'lucide-react'

const FilterSidebar = ({
  categories,
  selectedCategory,
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onCategoryChange,
  showFilters,
  onToggleFilters
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: '🌟' },
    ...categories.map(cat => ({
      value: cat._id,
      label: cat.name,
      icon: cat.icon || '📦'
    }))
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {showFilters && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggleFilters}
        ></div>
      )}

      {/* Filter Sidebar - Sticky */}
      <div className={`
        w-full lg:w-1/4 
        fixed lg:sticky 
        top-0 left-0 
        h-screen lg:h-auto
        z-40 lg:z-20
        transform lg:transform-none transition-transform duration-300 
        ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      style={{ 
        top: showFilters ? '0' : 'auto',
        ...(typeof window !== 'undefined' && window.innerWidth >= 1024 && {
          top: '20px',
          maxHeight: 'calc(100vh - 40px)',
        })
      }}>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 h-full lg:h-auto overflow-y-auto lg:sticky lg:top-5" style={{
          maxHeight: 'calc(100vh - 40px)'
        }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
              <Filter className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              Filters
            </h3>
            <button 
              onClick={onToggleFilters}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Filter */}
          <div className="mb-4 md:mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Price Range Filter */}
        {/* Dual Price Range Filter - 100% Functional Both Sides */}
<div className="mb-6">
  <h4 className="text-lg font-bold text-gray-800 mb-5">Filter By Price</h4>
  
  <div className="relative w-full mb-6 pt-2">
    {/* Style Injection for Dual Slider */}
    <style>{`
      .dual-range-input {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        background: transparent;
        pointer-events: none; /* जब तक थंब पर क्लिक न हो, तब तक नीचे क्लिक न जाए */
        position: absolute;
        left: 0;
        top: 0;
        height: 6px;
      }
      
      /* Chrome, Safari, Edge के लिए थंब स्टाइल */
      .dual-range-input::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 3px;
        height: 14px;
        background: #f97316; /* Orange color */
        border-radius: 1px;
        cursor: pointer;
        pointer-events: auto; /* थंब को क्लिकेबल बनाने के लिए */
        position: relative;
        z-index: 30;
      }

      /* Firefox के लिए थंब स्टाइल */
      .dual-range-input::-moz-range-thumb {
        width: 3px;
        height: 14px;
        background: #f97316;
        border: none;
        border-radius: 1px;
        cursor: pointer;
        pointer-events: auto;
        position: relative;
        z-index: 30;
      }
    `}</style>

    {/* 1. Base Grey Track */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-gray-100 rounded-full z-10" />

    {/* 2. Dynamic Active Orange Track (दोनों हैंडल्स के बीच की लाइन) */}
    <div 
      className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-orange-500 z-20"
      style={{
        left: `${(priceRange[0] / 10000) * 100}%`,
        right: `${100 - (priceRange[1] / 10000) * 100}%`
      }}
    />

    {/* 3. Left Slider Input (For Minimum Price) */}
    <input
      type="range"
      min="0"
      max="10000"
      step="100"
      value={priceRange[0]}
      onChange={(e) => {
        const val = Math.min(parseInt(e.target.value), priceRange[1] - 500); // मिनिमम को मैक्सिमम से आगे जाने से रोकने के लिए
        onPriceChange([val, priceRange[1]]);
      }}
      className="dual-range-input"
    />

    {/* 4. Right Slider Input (For Maximum Price) */}
    <input
      type="range"
      min="0"
      max="10000"
      step="100"
      value={priceRange[1]}
      onChange={(e) => {
        const val = Math.max(parseInt(e.target.value), priceRange[0] + 500); // मैक्सिमम को मिनिमम से पीछे आने से रोकने के लिए
        onPriceChange([priceRange[0], val]);
      }}
      className="dual-range-input"
    />
  </div>

  {/* Price Display Text */}
  <div className="text-sm font-medium text-gray-500 mt-4">
    Price: <span className="text-gray-800 font-semibold">₹{priceRange[0].toLocaleString('en-IN')} — ₹{priceRange[1].toLocaleString('en-IN')}</span>
  </div>
</div>
          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Filter By Category</h4>
            
            <div className="relative mb-4">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-orange-500 transition-colors"
              >
                <span className="text-gray-600">Find a Category</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-64 overflow-y-auto">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onCategoryChange(option.value)
                        setShowCategoryDropdown(false)
                      }}
                      className="w-full p-3 text-left hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {categoryOptions.slice(0, showAllCategories ? categoryOptions.length : 4).map((option) => (
                <label key={option.value} className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="category"
                      value={option.value}
                      checked={selectedCategory === option.value}
                      onChange={(e) => onCategoryChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      selectedCategory === option.value 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300 group-hover:border-orange-400'
                    }`}>
                      {selectedCategory === option.value && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span className={`text-base transition-colors ${
                    selectedCategory === option.value 
                      ? 'text-orange-600 font-medium' 
                      : 'text-gray-700 group-hover:text-orange-600'
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
              
              {categoryOptions.length > 4 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1 mt-3"
                >
                  {showAllCategories ? (
                    <>
                      <span>Show Less</span>
                      <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({categoryOptions.length - 4} more)</span>
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar
