const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('transition-done');
      return;
    }

    entry.target.classList.remove('transition-done');
  });
});

// Get multiple elements instead of a single one using "querySelectorAll"
const transition_divs = document.querySelectorAll('.transition');
transition_divs.forEach((element) => element.classList.remove('transition-done'));

// Loop over the elements and add each one to the observer
transition_divs.forEach((element) => observer.observe(element));