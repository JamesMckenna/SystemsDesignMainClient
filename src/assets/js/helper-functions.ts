export const elementIntersectionObserver = (
  classNameToFind: string,
  classToAdd: string
): IntersectionObserver => {
  const allTagsWithClassName = document.getElementsByClassName(classNameToFind);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        e.target.classList.toggle(classToAdd, e.isIntersecting);
      });
    },
    {
      rootMargin: "-50%",
    }
  );

  Array.from(allTagsWithClassName).forEach((el) => {
    observer.observe(el);
  });

  return observer;
};
