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

function discordcopy() {
  // Copy the text inside the text field
  navigator.clipboard.writeText("citruz2");
  
  // Alert the copied text
  alert("Copied to Clipboard");
}

function emailcopy() {
  // Copy the text inside the text field
  navigator.clipboard.writeText("nckim73@gmail.com");
  
  // Alert the copied text
  alert("Copied to Clipboard");
}

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}