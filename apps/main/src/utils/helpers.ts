export const formatPostedDate = (date: string) => {
  const posted = new Date(date);
  const now = new Date();

  const diffInMs = now.getTime() - posted.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Posted just now";
  if (diffInMinutes < 60)
    return `Posted ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  if (diffInHours < 24)
    return `Posted ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInDays === 1) return "Posted yesterday";
  if (diffInDays < 7) return `Posted ${diffInDays} days ago`;

  return `Posted on ${posted.toLocaleDateString()}`;
};
