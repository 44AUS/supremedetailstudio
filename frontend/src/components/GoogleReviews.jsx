import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample reviews data - Fallback if API fails or not configured
const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "John Smith",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely phenomenal service! My car looks brand new after their ceramic coating. The attention to detail is unmatched. Highly recommend Supreme Detail Studio!",
    avatar: "JS"
  },
  {
    id: 2,
    author: "Sarah Johnson",
    rating: 5,
    date: "1 month ago",
    text: "Best detailing experience I've ever had. The mobile service was so convenient and the results were incredible. My SUV has never looked better!",
    avatar: "SJ"
  },
  {
    id: 3,
    author: "Michael Davis",
    rating: 5,
    date: "3 weeks ago",
    text: "Professional, thorough, and reasonably priced. The team went above and beyond to make sure every inch of my vehicle was perfect. Will definitely be back!",
    avatar: "MD"
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    rating: 5,
    date: "1 week ago",
    text: "I'm extremely impressed with the PPF installation. The quality of work is outstanding and the staff was very knowledgeable. My investment is well protected now!",
    avatar: "ER"
  },
  {
    id: 5,
    author: "David Thompson",
    rating: 5,
    date: "2 months ago",
    text: "Supreme Detail Studio transformed my car! The paint correction removed all swirls and scratches. It looks showroom fresh. Can't thank them enough!",
    avatar: "DT"
  },
  {
    id: 6,
    author: "Jessica Martinez",
    rating: 5,
    date: "3 days ago",
    text: "Amazing window tinting service! Perfect installation with no bubbles. The team was professional and finished right on time. Love the results!",
    avatar: "JM"
  }
];

const GoogleReviews = ({ showTitle = true }) => {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch reviews from backend API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await fetch(`${API_URL}/api/google-reviews`);

        if (!response.ok) {
          // If backend returns error (e.g., API key not configured), use sample reviews
          if (response.status === 503) {
            console.log('Google API not configured on backend - using sample reviews');
          } else {
            console.warn(`Backend returned ${response.status} - using sample reviews`);
          }
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          console.log(`✅ Loaded ${data.reviews.length} Google reviews from API`);
        } else {
          console.log('No reviews returned from API - using sample reviews');
        }
      } catch (error) {
        console.error('Failed to fetch Google reviews:', error);
        console.log('Using sample reviews as fallback');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reviewsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentReviews = reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#e80200' : 'none'}
        stroke={i < rating ? '#e80200' : '#525252'}
        style={{ marginRight: '2px' }}
      />
    ));
  };

  return (
    <div style={styles.bgBody}>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          {showTitle && (
            <>
              <h1 style={styles.h1}>Customer Experiences</h1>
              <div style={styles.desc}>
                WHAT OUR CUSTOMERS HAVE TO SAY
              </div>
            </>
          )}

          {/* Google Rating Summary */}
          <div style={styles.ratingSummary}>
            <div style={styles.ratingLeft}>
              <div style={styles.googleLogo}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div style={styles.ratingScore}>5.0</div>
                <div style={styles.ratingStars}>{renderStars(5)}</div>
                <div style={styles.ratingCount}>{reviews.length} Google Reviews</div>
              </div>
            </div>
            <a
              href="https://g.page/r/CbMHJLaVyJ6mEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.writeReviewBtn}
            >
              Write a Review
            </a>
          </div>

          {/* Reviews Carousel */}
          <div style={styles.carouselWrapper}>
            <button
              onClick={prevSlide}
              style={styles.navBtn}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <div style={styles.reviewsGrid}>
              {currentReviews.map((review) => (
                <div key={review.id} style={styles.reviewCard}>
                  <div style={styles.quoteIcon}>
                    <Quote size={32} style={{ color: '#e80200', opacity: 0.2 }} />
                  </div>

                  <div style={styles.reviewHeader}>
                    <div style={styles.avatar}>{review.avatar}</div>
                    <div style={styles.reviewMeta}>
                      <div style={styles.authorName}>{review.author}</div>
                      <div style={styles.reviewDate}>{review.date}</div>
                    </div>
                  </div>

                  <div style={styles.reviewStars}>
                    {renderStars(review.rating)}
                  </div>

                  <p style={styles.reviewText}>{review.text}</p>

                  <div style={styles.googleBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span style={styles.googleText}>Posted on Google</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextSlide}
              style={styles.navBtn}
              disabled={currentIndex === totalPages - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div style={styles.paginationDots}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  ...styles.dot,
                  ...(index === currentIndex ? styles.dotActive : {})
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  bgBody: {
    backgroundColor: '#0f0f0f',
    padding: '4rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  wrapper: {
    position: 'relative',
  },
  h1: {
    marginTop: 0,
    marginBottom: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
  },
  desc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#e80200',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  ratingSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '12px',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  ratingLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  googleLogo: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    borderRadius: '50%',
    padding: '8px',
  },
  ratingScore: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    lineHeight: 1,
    marginBottom: '4px',
  },
  ratingStars: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },
  ratingCount: {
    fontSize: '13px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  writeReviewBtn: {
    padding: '12px 24px',
    background: '#e80200',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  },
  carouselWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  navBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#111111',
    border: '1px solid #262626',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    flex: 1,
  },
  reviewCard: {
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '12px',
    padding: '2rem',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  quoteIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e80200, #b91c1c)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    flexShrink: 0,
  },
  reviewMeta: {
    flex: 1,
  },
  authorName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '2px',
  },
  reviewDate: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#ababab',
  },
  reviewStars: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  reviewText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    lineHeight: 1.7,
    color: '#ababab',
    margin: '0 0 1.5rem 0',
  },
  googleBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    paddingTop: '1rem',
    borderTop: '1px solid #262626',
  },
  googleText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#6b7280',
  },
  paginationDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#262626',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease',
  },
  dotActive: {
    background: '#e80200',
    width: '32px',
    borderRadius: '5px',
  },
};

export default GoogleReviews;
