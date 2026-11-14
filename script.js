"use strict";

const CONFIG = {
  recipientName: "Mahesha",
  senderSignature: "Amala\nYour colleague and friend 💚",
  letterTitle: "A Little Note For You, {recipientName}! 💚",
  letterHighlights: [
    "wonderful lead and boss",
    "happy to have found such a nice friend",
    "started as colleagues, but somewhere along the way, became good friends"
  ],
  appreciationLetter: `Hey {recipientName}! 💚

This Thanksgiving, I just wanted to take a moment to tell you how genuinely happy I am to have a wonderful lead and boss like you.

I've learned so much from you and gained a lot of knowledge along the way. Thank you for all the guidance, support, and learning opportunities. I'm truly grateful for that.

And honestly, I'm equally happy to have found such a nice friend in you!

It's always so nice talking to you, and I genuinely enjoy our conversations, whether they're about work or just random things.

I've shared quite a lot of things with you, and I hope I haven't unknowingly forced you into talking to me or disturbed your peaceful time! 😂 I just hope you enjoy our conversations as much as I do.

It's funny how we started as colleagues, but somewhere along the way, became good friends. I'm genuinely glad that happened.

From endless talks to random conversations, laughs, and little moments, I'm really happy to have a friend like you.

I hope this friendship continues for a long, long time, with the same comfort, endless conversations, random topics, and lots of laughter. 💚

And now, coming to something very important... 😂💰

I know how much you love money! So here's wishing you endless money, unbelievable success, and all the wealth you've ever dreamed of.

I genuinely hope you achieve that someday. And when you do, don't forget this little friend! 😂

Thank you for being a wonderful lead, a great person to learn from, and an even nicer friend.

Stay happy, keep shining, and keep being you!

HAPPY THANKSGIVING! 🍀

With lots of gratitude,
{senderSignature}`,
  gratitudeCards: [
    {
      icon: "🌱",
      title: "A Wonderful Lead",
      front: "For the guidance that helps me grow.",
      message: "Grateful for all the knowledge, guidance, and learning opportunities. I've learned a lot from you!"
    },
    {
      icon: "🦋",
      title: "Endless Conversations",
      front: "For the talks that make the day brighter.",
      message: "From work-related discussions to random endless talks, some conversations just make the day better."
    },
    {
      icon: "🍀",
      title: "A Nice Friendship",
      front: "For a connection I truly appreciate.",
      message: "Somewhere along the way, a wonderful professional connection became a friendship worth appreciating."
    }
  ],
  finalGreeting: {
    thought: "I'm grateful for your guidance, our conversations, and the friendship we've built.",
    message: "Here's to continued learning, easy conversations, and lots more laughter.",
    signature: "With lots of gratitude,\n{senderSignature}"
  }
};

const byId = (id) => document.getElementById(id);
const welcome = byId("welcome");
const envelopeScreen = byId("envelope-screen");
const giftContent = byId("gift-content");
const envelopeWrap = byId("envelope-wrap");
const moreInside = byId("more-inside");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function personalize(text) {
  return text
    .replaceAll("{recipientName}", CONFIG.recipientName)
    .replaceAll("{senderSignature}", CONFIG.senderSignature);
}

function renderLetter() {
  const letter = byId("letter-copy");
  personalize(CONFIG.appreciationLetter).split(/\n{2,}/).forEach((paragraph) => {
    const element = document.createElement("p");
    const highlight = CONFIG.letterHighlights.find((phrase) => paragraph.includes(phrase));
    if (highlight) {
      const start = paragraph.indexOf(highlight);
      element.append(document.createTextNode(paragraph.slice(0, start)));
      const emphasized = document.createElement("mark");
      emphasized.className = "phrase-highlight";
      emphasized.textContent = highlight;
      element.append(emphasized, document.createTextNode(paragraph.slice(start + highlight.length)));
    } else {
      element.textContent = paragraph;
    }
    letter.append(element);
  });
  byId("letter-title").textContent = personalize(CONFIG.letterTitle);
  document.title = personalize(CONFIG.letterTitle);
  document.querySelectorAll("[data-recipient]").forEach((element) => {
    element.textContent = CONFIG.recipientName;
  });
  byId("final-thought").textContent = CONFIG.finalGreeting.thought;
  byId("final-message").textContent = CONFIG.finalGreeting.message;
  byId("final-signature").textContent = personalize(CONFIG.finalGreeting.signature);
}

function renderCards() {
  const grid = byId("gratitude-grid");
  CONFIG.gratitudeCards.forEach((card, index) => {
    const article = document.createElement("article");
    article.className = "gratitude-card reveal";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-pressed", "false");
    article.setAttribute("aria-label", `Read note about ${card.title}`);
    article.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <span class="card-illustration" aria-hidden="true">${card.icon}</span>
          <h3></h3><p></p><span class="card-hint">tap to read the note ↗</span>
        </div>
        <div class="card-face card-back">
          <span class="card-illustration" aria-hidden="true">${card.icon}</span>
          <p class="card-message"></p><span class="card-hint">tap to turn back ↶</span>
        </div>
      </div>`;
    article.querySelector("h3").textContent = `${card.title} ${index === 0 ? "🌱" : ""}`;
    article.querySelector(".card-front p").textContent = card.front;
    article.querySelector(".card-message").textContent = card.message;
    const toggleCard = () => {
      const flipped = article.classList.toggle("is-flipped");
      article.setAttribute("aria-pressed", String(flipped));
      article.setAttribute("aria-label", `${flipped ? "Show front of" : "Read note about"} ${card.title}`);
    };
    article.addEventListener("click", toggleCard);
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });
    grid.append(article);
  });
}

function createFloaties(container, symbols, count) {
  if (reducedMotion.matches) return;
  for (let index = 0; index < count; index += 1) {
    const item = document.createElement("span");
    item.className = "floaty";
    item.setAttribute("aria-hidden", "true");
    item.textContent = symbols[index % symbols.length];
    item.style.left = `${(index * 37 + 8) % 96}%`;
    item.style.setProperty("--float-duration", `${15 + (index % 7) * 2}s`);
    item.style.setProperty("--float-delay", `${-((index * 3) % 18)}s`);
    item.style.setProperty("--float-drift", `${(index % 2 ? -1 : 1) * (25 + index % 5 * 12)}px`);
    item.style.setProperty("--leaf-size", `${.8 + (index % 4) * .25}rem`);
    container.append(item);
  }
}

function observeReveals(root = document) {
  const targets = root.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((target) => observer.observe(target));
}

function openEnvelope() {
  if (envelopeWrap.classList.contains("is-open")) return;
  envelopeWrap.classList.add("is-open");
  envelopeWrap.setAttribute("aria-pressed", "true");
  byId("envelope-hint").textContent = "A little note, just for you.";
  moreInside.hidden = false;
  moreInside.focus();
}

function showGift() {
  if (moreInside.disabled) return;
  moreInside.disabled = true;
  envelopeWrap.classList.add("is-revealing");

  const revealLetter = () => {
    envelopeScreen.hidden = true;
    giftContent.hidden = false;
    observeReveals(giftContent);
    byId("letter").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
    moreInside.disabled = false;
  };

  if (reducedMotion.matches) {
    revealLetter();
    return;
  }

  window.setTimeout(revealLetter, 1800);
}

function sendGoodLuck() {
  byId("success-message").hidden = false;
  const burst = byId("coin-burst");
  burst.replaceChildren();
  if (reducedMotion.matches) return;
  const symbols = ["🪙", "✨", "🍀", "💰", "✦", "🌿", "🪙", "✨"];
  symbols.forEach((symbol, index) => {
    const coin = document.createElement("span");
    coin.className = "coin";
    coin.textContent = symbol;
    coin.style.setProperty("--coin-x", `${(index - 3.5) * 40}px`);
    coin.style.setProperty("--coin-y", `${-80 - (index % 3) * 45}px`);
    coin.style.setProperty("--coin-rotation", `${(index % 2 ? 1 : -1) * 80}deg`);
    burst.append(coin);
  });
}

function resetExperience() {
  giftContent.hidden = true;
  envelopeScreen.hidden = true;
  welcome.hidden = false;
  envelopeWrap.classList.remove("is-open");
  envelopeWrap.classList.remove("is-revealing");
  envelopeWrap.setAttribute("aria-pressed", "false");
  moreInside.hidden = true;
  byId("envelope-hint").textContent = "Tap the envelope to open your note";
  byId("success-message").hidden = true;
  byId("coin-burst").replaceChildren();
  document.querySelectorAll(".gratitude-card").forEach((card) => {
    card.classList.remove("is-flipped");
    card.setAttribute("aria-pressed", "false");
  });
  document.querySelectorAll(".reveal").forEach((element) => element.classList.remove("is-visible"));
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
}

function setupMusic() {
  const audio = byId("background-music");
  const player = byId("music-player");
  const toggle = byId("music-toggle");
  const icon = byId("music-toggle-icon");
  const status = byId("music-status");
  const toast = byId("music-toast");
  let toastTimer;

  const showUnavailable = () => {
    player.dataset.state = "unavailable";
    status.textContent = "Add your local file: assets/music/magic-shop.mp3";
    toggle.setAttribute("aria-label", "Music file unavailable. Add magic-shop.mp3");
    toggle.setAttribute("aria-pressed", "false");
    toggle.dataset.tooltip = "Add magic-shop.mp3";
    icon.textContent = "♫";
  };

  const showPlaying = () => {
    player.dataset.state = "playing";
    status.textContent = "Now Playing: Magic Shop – BTS 💜";
    toggle.setAttribute("aria-label", "Pause Music");
    toggle.setAttribute("aria-pressed", "true");
    toggle.dataset.tooltip = "Pause Music";
    icon.textContent = "Ⅱ";
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 3500);
  };

  const showPaused = () => {
    player.dataset.state = "paused";
    status.textContent = "Music is paused";
    toggle.setAttribute("aria-label", "Play Magic Shop");
    toggle.setAttribute("aria-pressed", "false");
    toggle.dataset.tooltip = "Play Magic Shop 💜";
    icon.textContent = "♫";
    toast.hidden = true;
  };

  toggle.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      showUnavailable();
    }
  });
  audio.addEventListener("playing", showPlaying);
  audio.addEventListener("pause", showPaused);
  audio.addEventListener("error", () => {
    showUnavailable();
  });
  showPaused();
}

renderLetter();
renderCards();
createFloaties(document.querySelector(".decor-welcome"), ["✿", "🍃", "✧", "☘", "🦋"], 18);
createFloaties(document.querySelector(".decor-envelope"), ["✿", "🍃", "✧", "🦋"], 12);
createFloaties(document.querySelector(".decor-finale"), ["🍃", "✿", "✧", "☘", "🦋"], 22);
observeReveals();
setupMusic();

byId("open-surprise").addEventListener("click", () => {
  welcome.hidden = true;
  envelopeScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});
envelopeWrap.addEventListener("click", openEnvelope);
envelopeWrap.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope();
  }
});
envelopeWrap.setAttribute("aria-pressed", "false");
moreInside.addEventListener("click", showGift);
byId("good-luck-button").addEventListener("click", sendGoodLuck);
byId("replay-button").addEventListener("click", resetExperience);
