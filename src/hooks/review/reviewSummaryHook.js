
export function useReviewCreatedSummary() {

  return function(review, summary) {

    summary.total++;

    summary.ratings[review.rating-1] = summary.ratings[review.rating-1] + 1;

    const average = summary.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
    
    summary.average = average / summary.total;

    return summary;
  }
}

export function useReviewUpdatedSummary() {

  return function(reviewCur, reviewPrev, summary) {

    summary.ratings[reviewCur.rating-1] = summary.ratings[reviewCur.rating-1] + 1;

    summary.ratings[reviewPrev.rating-1] = summary.ratings[reviewPrev.rating-1] - 1;

    const average = summary.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);

    summary.average = average / summary.total;

    return summary;
  }
}

export function useReviewDeletedSummary() {

  return function(review, summary) {

    summary.total--;

    summary.ratings[review.rating-1] = summary.ratings[review.rating-1] - 1;

    if (summary.total > 0) {
      const average = summary.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
      summary.average = average / summary.total;
    } else {
      summary.average = 0;
    }

    return summary;
  }
}

