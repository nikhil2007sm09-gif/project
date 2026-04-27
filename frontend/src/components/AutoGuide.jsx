import React, { useState, useEffect } from 'react';
import './AutoGuide.css';

const AutoGuide = ({ page = 'home', onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  const guides = {
    login: [
      {
        title: 'Welcome',
        description: 'Login to your account or create a new one',
        target: '.login-form',
        position: 'bottom',
        highlight: true,
      },
      {
        title: 'Enter Email',
        description: 'Enter your email address',
        target: 'input[type="email"]',
        position: 'bottom',
        highlight: true,
      },
      {
        title: 'Enter Password',
        description: 'Enter your secure password',
        target: 'input[type="password"]',
        position: 'bottom',
        highlight: true,
      },
      {
        title: 'Login',
        description: 'Click the login button to proceed',
        target: 'button[type="submit"]',
        position: 'top',
        highlight: true,
      },
    ],

    product: [
      {
        title: 'Browse Products',
        description: 'Here are all available products',
        target: '.products-grid',
        position: 'top',
        highlight: true,
      },
      {
        title: 'Product Details',
        description: 'Click on any product to see details',
        target: '.product-card',
        position: 'bottom',
        highlight: true,
      },
      {
        title: 'Add to Cart',
        description: 'Add the product to your cart',
        target: '.add-to-cart-btn',
        position: 'top',
        highlight: true,
      },
    ],
  };

  const currentGuide = guides[page] || [];

  useEffect(() => {
    const seenGuides = JSON.parse(localStorage.getItem('seenGuides') || '{}');

    if (seenGuides[page]) {
      setHasSeenGuide(true);
      setIsVisible(false);
    } else {
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  }, [page]);

  useEffect(() => {
    if (!isVisible) return;

    const step = currentGuide[currentStep];
    if (!step) return;

    const target = document.querySelector(step.target);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentStep, isVisible, currentGuide]);

  const handleNext = () => {
    if (currentStep < currentGuide.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);

    const seenGuides = JSON.parse(localStorage.getItem('seenGuides') || '{}');
    seenGuides[page] = true;
    localStorage.setItem('seenGuides', JSON.stringify(seenGuides));

    setHasSeenGuide(true);

    if (onClose) onClose();
  };

  const restartGuide = () => {
    setCurrentStep(0);
    setIsVisible(true);
  };

  const step = currentGuide[currentStep];
  const targetElement = step ? document.querySelector(step.target) : null;

  if (currentGuide.length === 0) return null;

  return (
    <>
      {/* {hasSeenGuide && !isVisible && (
        <button className="show-guide-btn" onClick={restartGuide}>
          Show Guide Again
        </button>
      )} */}

      {isVisible && step && (
        <>
          <div className="guide-overlay" onClick={handleClose}></div>

          {targetElement && step.highlight && (
            <div
              className="guide-highlight"
              style={getHighlightPosition(targetElement)}
            />
          )}

          <div
            className={`guide-tooltip guide-tooltip-${step.position}`}
            style={getTooltipPosition(targetElement, step.position)}
          >
            <div className="guide-header">
              <h3>{step.title}</h3>
              <button className="guide-close" onClick={handleClose}>
                ✕
              </button>
            </div>

            <p>{step.description}</p>

            <div className="guide-footer">
              <div className="guide-progress">
                {currentStep + 1} / {currentGuide.length}
              </div>

              <div className="guide-buttons">
                <button
                  className="guide-btn guide-btn-prev"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                >
                  Previous
                </button>

                <button
                  className="guide-btn guide-btn-next"
                  onClick={handleNext}
                >
                  {currentStep === currentGuide.length - 1 ? 'Done' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const getHighlightPosition = (element) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY - 6,
    left: rect.left + window.scrollX - 6,
    width: rect.width + 12,
    height: rect.height + 12,
  };
};

const getTooltipPosition = (element, position) => {
  if (!element) return {};

  const rect = element.getBoundingClientRect();
  const tooltipWidth = 320;
  const tooltipHeight = 180;
  const gap = 16;

  let top = 0;
  let left = 0;

  switch (position) {
    case 'top':
      top = rect.top + window.scrollY - tooltipHeight - gap;
      left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
      break;

    case 'bottom':
      top = rect.bottom + window.scrollY + gap;
      left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
      break;

    case 'left':
      top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2;
      left = rect.left + window.scrollX - tooltipWidth - gap;
      break;

    case 'right':
      top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2;
      left = rect.right + window.scrollX + gap;
      break;

    default:
      top = rect.bottom + window.scrollY + gap;
      left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
  }

  if (left < 12) left = 12;
  if (left + tooltipWidth > window.innerWidth - 12) {
    left = window.innerWidth - tooltipWidth - 12;
  }

  if (top < 12) top = 12;

  return {
    top: `${top}px`,
    left: `${left}px`,
  };
};

export default AutoGuide;