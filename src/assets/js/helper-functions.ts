interface showBackgroundObserverOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

const buildShowBackgroundObserverOptions = (
  width: number,
  height: number
): showBackgroundObserverOptions => {
  const orientation = window.screen.orientation;
  const observerOptions = {} as showBackgroundObserverOptions;
  if (width <= 728 && height > 428) {
    observerOptions.root = null;
    observerOptions.rootMargin = "-25% 0% -25% 0%";
    observerOptions.threshold = 0.5;
  } else if (height < 500 && orientation.type.includes("landscape")) {
    observerOptions.root = null;
    observerOptions.rootMargin = "0% 0% 15% 0%";
    observerOptions.threshold = 0.5;
  } else {
    observerOptions.root = null;
    observerOptions.rootMargin = "-20% 0% -20% 0%";
    observerOptions.threshold = 0.66;
  }

  return observerOptions;
};

const showBackgroundIntersectionObserver = (
  classNameToFind: string,
  classToAdd: string,
  options: showBackgroundObserverOptions
): IntersectionObserver => {
  const allTagsWithClassName = document.getElementsByClassName(classNameToFind);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      e.target.classList.toggle(classToAdd, e.isIntersecting);
    });
  }, options);

  Array.from(allTagsWithClassName).forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

export {
  showBackgroundObserverOptions,
  buildShowBackgroundObserverOptions,
  showBackgroundIntersectionObserver,
};
