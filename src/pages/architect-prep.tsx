import { useState, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { flashcards } from '@/data/flashcards';
import { SITE_URL, SITE_NAME, CALENDLY_URL } from '@/config/site';

type CardStatus = 'unseen' | 'learning' | 'known';

export default function ArchitectPrep() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [statuses, setStatuses] = useState<CardStatus[]>(
    () => flashcards.map(() => 'unseen')
  );
  const [reviewMode, setReviewMode] = useState(false);
  const [finished, setFinished] = useState(false);

  const deck = useMemo(() => {
    if (reviewMode) {
      return flashcards
        .map((card, i) => ({ card, originalIndex: i }))
        .filter(({ originalIndex }) => statuses[originalIndex] === 'learning');
    }
    return flashcards.map((card, i) => ({ card, originalIndex: i }));
  }, [reviewMode, statuses]);

  const knownCount = statuses.filter((s) => s === 'known').length;
  const learningCount = statuses.filter((s) => s === 'learning').length;
  const totalCards = flashcards.length;
  const progress = ((knownCount + learningCount) / totalCards) * 100;

  const currentDeckCard = deck[currentIndex];

  const handleFlip = useCallback(() => {
    if (!flipped) setFlipped(true);
  }, [flipped]);

  const handleMark = useCallback(
    (status: 'learning' | 'known') => {
      if (!currentDeckCard) return;
      const newStatuses = [...statuses];
      newStatuses[currentDeckCard.originalIndex] = status;
      setStatuses(newStatuses);
      setFlipped(false);

      if (currentIndex + 1 < deck.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setFinished(true);
      }
    },
    [currentDeckCard, currentIndex, deck.length, statuses]
  );

  const handleRestart = useCallback(() => {
    setStatuses(flashcards.map(() => 'unseen'));
    setCurrentIndex(0);
    setFlipped(false);
    setFinished(false);
    setReviewMode(false);
  }, []);

  const handleReviewLearning = useCallback(() => {
    setReviewMode(true);
    setCurrentIndex(0);
    setFlipped(false);
    setFinished(false);
  }, []);

  const pageTitle = `Architect Prep — ${SITE_NAME}`;
  const pageDescription =
    'Mobile-first flashcard study tool for the Claude Certified Architect exam. 20 cards covering agentic loops, multi-agent systems, context passing, safety, and more.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/architect-prep`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}/architect-prep`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="ap-page">
        {/* Header */}
        <header className="ap-header">
          <div className="ap-header-inner">
            <Link href="/" className="ap-logo">
              <img
                src="/assets/mark-bright-dark.svg"
                alt="Páramo"
                className="ap-logo-mark"
              />
              P<span className="accent">á</span>ramo
            </Link>
            <span className="ap-header-title">Architect Prep</span>
          </div>
        </header>

        {/* Progress */}
        <div className="ap-progress-section">
          <div className="ap-progress-bar-track">
            <div
              className="ap-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="ap-progress-stats">
            <span className="ap-stat ap-stat-known">
              ✓ {knownCount} known
            </span>
            <span className="ap-stat ap-stat-learning">
              ↻ {learningCount} learning
            </span>
            <span className="ap-stat ap-stat-remaining">
              {totalCards - knownCount - learningCount} remaining
            </span>
          </div>
        </div>

        {/* Main */}
        <main className="ap-main">
          {finished ? (
            <div className="ap-summary">
              <div className="ap-summary-card">
                <h2 className="ap-summary-title">
                  {reviewMode ? 'Review Complete' : 'Deck Complete'}
                </h2>
                <div className="ap-summary-score">
                  <span className="ap-score-number">{knownCount}</span>
                  <span className="ap-score-total">/ {totalCards}</span>
                </div>
                <p className="ap-summary-label">cards mastered</p>

                {learningCount > 0 && (
                  <p className="ap-summary-still-learning">
                    {learningCount} card{learningCount > 1 ? 's' : ''} still
                    need work
                  </p>
                )}

                <div className="ap-summary-actions">
                  <button
                    className="ap-btn ap-btn-primary"
                    onClick={handleRestart}
                  >
                    Restart Full Deck
                  </button>
                  {learningCount > 0 && (
                    <button
                      className="ap-btn ap-btn-secondary"
                      onClick={handleReviewLearning}
                    >
                      Review ({learningCount}) Learning Cards
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : currentDeckCard ? (
            <div className="ap-card-area">
              <div className="ap-card-counter">
                Card {currentIndex + 1} of {deck.length}
                {reviewMode && (
                  <span className="ap-review-badge">Review Mode</span>
                )}
              </div>
              <div className="ap-tag">{currentDeckCard.card.tag}</div>

              <div
                className={`ap-card ${flipped ? 'ap-card-flipped' : ''}`}
                onClick={handleFlip}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleFlip();
                }}
              >
                <div className="ap-card-inner">
                  <div className="ap-card-front">
                    <p className="ap-card-text">
                      {currentDeckCard.card.question}
                    </p>
                    <span className="ap-card-hint">Tap to reveal answer</span>
                  </div>
                  <div className="ap-card-back">
                    <p className="ap-card-text">
                      {currentDeckCard.card.answer}
                    </p>
                  </div>
                </div>
              </div>

              {flipped && (
                <div className="ap-actions">
                  <button
                    className="ap-btn ap-btn-learning"
                    onClick={() => handleMark('learning')}
                  >
                    ↻ Still Learning
                  </button>
                  <button
                    className="ap-btn ap-btn-known"
                    onClick={() => handleMark('known')}
                  >
                    ✓ Got It
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </main>

        {/* Footer CTA */}
        <footer className="ap-footer">
          <div className="ap-footer-inner">
            <p className="ap-footer-cta">
              Ready to build what you just studied?{' '}
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
              .
            </p>
            <p className="ap-footer-copy">
              © {new Date().getFullYear()} Páramo. Above the clouds.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
