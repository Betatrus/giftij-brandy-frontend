export function Reviews() {
  const reviews = [
    {
      initial: "A",
      name: "Adaeze O.",
      location: "Lagos, Nigeria",
      quote:
        "I walked into that meeting and three women stopped me to ask where I got my bag. Worth every naira and then some.",
    },
    {
      initial: "T",
      name: "Tobi F.",
      location: "Abuja, Nigeria",
      quote:
        "I've had designer bags that don't feel this luxurious. The leather, the craftsmanship, flawless. This is my third piece.",
    },
    {
      initial: "C",
      name: "Chiamaka E.",
      location: "Port Harcourt, Nigeria",
      quote:
        "My bag goes from office to dinner to airport and still turns heads. That's not a bag, that's a personality.",
    },
  ]

  return (
    <section className="gb-reviews-section" aria-labelledby="gb-reviews-title">
      <div className="gb-reviews-header">
        <p className="gb-reviews-label">She Said It Best</p>
        <h2 className="gb-reviews-title" id="gb-reviews-title">
          Why Women Love <span>Our Bags</span>
        </h2>
      </div>

      <div className="gb-reviews-grid">
        {reviews.map((review) => (
          <article className="gb-review-card" key={review.name}>
            <div className="gb-review-stars" aria-label="5 out of 5 stars">
              <span aria-hidden="true">★★★★★</span>
            </div>
            <p className="gb-review-quote">&ldquo;{review.quote}&rdquo;</p>
            <div className="gb-review-author">
              <div className="gb-review-avatar" aria-hidden="true">
                {review.initial}
              </div>
              <div>
                <p className="gb-review-author-name">{review.name}</p>
                <p className="gb-review-author-location">{review.location}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
