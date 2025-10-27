// Use strict mode for better error catching and performance
"use strict";

// Create module for better encapsulation and performance
const SliderModule = {
  slider: null,
  form: null,
  mouseDownAt: 0,
  left: 0,
  animationFrameId: null,
  SPEED: 3, // Constant speed value

  init() {
    // Initialize DOM elements once
    this.slider = document.querySelector(".slider");
    this.form = document.querySelector(".form");
    this.attachEventListeners();
  },

  handleMouseDown(e) {
    this.mouseDownAt = e.clientX;
  },

  handleMouseUp() {
    this.mouseDownAt = 0;
    this.slider.style.userSelect = "unset";
    this.slider.style.cursor = "unset";
    this.form.style.pointerEvents = "unset";
    this.form.classList.remove("left", "right");
  },

  updateAnimation(e) {
    if (this.mouseDownAt === 0) return;

    this.slider.style.userSelect = "none";
    this.slider.style.cursor = "grab";
    this.form.style.pointerEvents = "none";

    const direction = e.clientX > this.mouseDownAt ? "left" : "right";
    this.form.classList.remove(direction === "left" ? "right" : "left");
    this.form.classList.add(direction);

    const leftTemporary =
      this.left + (e.clientX - this.mouseDownAt) / this.SPEED;
    const leftLimit = this.form.offsetWidth - this.slider.offsetWidth / 2;

    if (leftTemporary < 0 && Math.abs(leftTemporary) < leftLimit) {
      this.form.style.setProperty("--left", `${this.left}px`);
      this.left = leftTemporary;
      this.mouseDownAt = e.clientX;
    }
  },

  handleMouseMove(e) {
    if (this.mouseDownAt === 0) return;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() =>
      this.updateAnimation(e)
    );
  },

  attachEventListeners() {
    // Use passive event listeners for better performance
    this.slider.addEventListener("mousedown", this.handleMouseDown.bind(this), {
      passive: true,
    });
    this.slider.addEventListener("mouseup", this.handleMouseUp.bind(this), {
      passive: true,
    });
    this.slider.addEventListener("mousemove", this.handleMouseMove.bind(this), {
      passive: true,
    });
  },
};

// Initialize the slider when DOM is ready
document.addEventListener("DOMContentLoaded", () => SliderModule.init());
