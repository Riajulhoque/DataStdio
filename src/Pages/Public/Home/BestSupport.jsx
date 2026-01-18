import React from 'react';

const cards = document.querySelectorAll('.card');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const totalCards = cards.length;
let activeCardIndex = 0; // Start with the first card (index 0) in the center

/**
 * Calculates the position of each card relative to the active card (0).
 * Uses the modulo operator (%) to handle infinite looping.
 */
function updateSlider() {
  cards.forEach((card, index) => {
    // Calculate position difference: how far is this card from the active center card
    let position = index - activeCardIndex;

    // Handle infinite looping (wrapping)
    // If the card is far to the right, bring it to the far left.
    if (position > 2) {
      position -= totalCards;
    }
    // If the card is far to the left, bring it to the far right.
    if (position < -2) {
      position += totalCards;
    }

    card.setAttribute('data-pos', position);

    // Disable button on non-active cards
    const button = card.querySelector('.explore-btn');
    button.disabled = (position !== 0);
  });
}

/**
 * Moves the slider to a new index, using modulo to wrap around for infinite loop.
 * @param {number} direction - 1 for next, -1 for previous.
 */
function moveSlider(direction) {
  // Calculate the new index, ensuring it wraps using the modulo operator
  activeCardIndex = (activeCardIndex + direction + totalCards) % totalCards;
  updateSlider();
}

/**
 * Moves a specific card to the center.
 * @param {number} newIndex - The index of the card that should be centered.
 */
function moveToCard(newIndex) {
  // Calculate the shortest path (direction) for movement
  let diff = newIndex - activeCardIndex;

  // Check for wrap-around shorter path
  if (Math.abs(diff) > totalCards / 2) {
    if (diff > 0) {
      diff = diff - totalCards;
    } else {
      diff = diff + totalCards;
    }
  }

  activeCardIndex = newIndex;
  updateSlider();
}

// --- Event Listeners ---

// 1. Card Click: Move the card clicked to the center
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    moveToCard(index);
  });
});

// 2. Navigation Arrows
// prevButton.addEventListener('click', () => {
//   moveSlider(-1); // Move to previous
// });

// nextButton.addEventListener('click', () => {
//   moveSlider(1); // Move to next
// });

// Initial setup
updateSlider();


const BestSupport = () => {
  return (
    <div id='BestSupport'>
      <h2 className='text-center text-[#7370FF] text-6xl font-bold pt-[130px] pl-[50px]'>Best Support <br />in the Business</h2>
      <p className='text-center text-xl pt-[20px] pl-[50px] text-[#797979] -pb-[20px]'>You always get fast, friendly support in <br />record time (much faster than the competition).</p>
      <div className="BestSupport">
      <div class="showcase-container">

        <div class="nav-arrow" id="prev">←</div>
        <div class="nav-arrow" id="next">→</div>

        <div class="card card-1" data-id="0">
          <div class="card-image"></div>
          <h2 class="card-title">NEURAL NETWORK</h2>
          <p class="card-description">Advanced AI system with deep training capabilities for predictive analytics and pattern recognition.</p>
          <div class="card-tags">
            <span class="tag">TENSORFLOW</span>
            <span class="tag">PYTORCH</span>
          </div>
          <button class="explore-btn">EXPLORE</button>
        </div>

        <div class="card card-2" data-id="1">
          <div class="card-image"></div>
          <h2 class="card-title">QUANTUM CLOUD</h2>
          <p class="card-description">Next-generation cloud infrastructure leveraging quantum computing for unprecedented processing power.</p>
          <div class="card-tags">
            <span class="tag">AWS</span>
            <span class="tag">KUBERNETES</span>
          </div>
          <button class="explore-btn">EXPLORE</button>
        </div>

        <div class="card card-3" data-id="2">
          <div class="card-image"></div>
          <h2 class="card-title">BLOCKCHAIN VAULT</h2>
          <p class="card-description">Secure decentralized storage solution using advanced encryption and distributed ledger technology.</p>
          <div class="card-tags">
            <span class="tag">ETHEREUM</span>
            <span class="tag">SOLIDITY</span>
          </div>
          <button class="explore-btn">EXPLORE</button>
        </div>

        <div class="card card-4" data-id="3">
          <div class="card-image"></div>
          <h2 class="card-title">EDGE COMPUTING</h2>
          <p class="card-description">Decentralized processing closer to the data source, optimizing latency for real-time applications.</p>
          <div class="card-tags">
            <span class="tag">IOT</span>
            <span class="tag">RUST</span>
          </div>
          <button class="explore-btn">EXPLORE</button>
        </div>

        <div class="card card-5" data-id="4">
          <div class="card-image"></div>
          <h2 class="card-title">METAVERSE DEV</h2>
          <p class="card-description">Building immersive virtual environments and shared digital spaces using high-fidelity rendering engines.</p>
          <div class="card-tags">
            <span class="tag">UNITY</span>
            <span class="tag">UNREAL</span>
          </div>
          <button class="explore-btn">EXPLORE</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BestSupport;
