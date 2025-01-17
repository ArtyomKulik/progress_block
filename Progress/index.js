function createProgress() {
  const progressBar = document.querySelector(".progress-bar");
  const progressCircle = document.querySelector(".progress-circle");
  const valueInput = document.getElementById("valueInput");
  const animateToggle = document.getElementById("animateToggle");
  const hideToggle = document.getElementById("hideToggle");

  const circle = initCircleLength();
  bindEvents();
  updateProgress(0);

  function initCircleLength() {
    valueInput.defaultValue = 0;
    const circle = progressBar.getTotalLength() + 1;
    progressBar.style.strokeDasharray = circle;
    return circle;
  }

  function updateProgress(percent) {
    const value = Math.min(100, Math.max(0, percent));
    progressBar.style.strokeDashoffset = circle * (1 - value / 100);
  }

  function bindEvents() {
    let activeTimer = null;
    valueInput.addEventListener("input", (evt) => {
      if (activeTimer) {
        clearTimeout(activeTimer);
      }

      let value = evt.target.value === "" ? 0 : parseInt(evt.target.value);
      value = Math.min(100, Math.max(0, value));
      evt.target.value = value;

      activeTimer = setTimeout(() => {
        updateProgress(value);
      }, 333);
    });

    let currentRotation = -90;
    let animationFrame;
    animateToggle.addEventListener("change", (evt) => {
      const progressBar = document.querySelector(".progress-bar");

      if (evt.target.checked) {
        (function animate() {
          currentRotation += 2;
          progressBar.style.transform = `rotate(${currentRotation}deg)`;
          animationFrame = requestAnimationFrame(animate);
        })();
      } else {
        cancelAnimationFrame(animationFrame);
        progressBar.style.transform = `rotate(${currentRotation}deg)`;
      }
    });

    hideToggle.addEventListener("change", (evt) => {
      progressCircle.classList.toggle("hidden", evt.target.checked);
    });
  }
}

document.addEventListener("DOMContentLoaded", createProgress);
