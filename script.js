/* ==========================================
   PETALS
========================================== */

const petalContainer = document.getElementById("petals");

const petalColors = [
    "#f4a7b9",
    "#f7c6d4",
    "#e8b5c5",
    "#f3d0bd",
    "#dca8bb"
];

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "petal";

    const size = Math.random() * 10 + 7;

    petal.style.width = size + "px";
    petal.style.height = size * 1.4 + "px";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.background =
        petalColors[
            Math.floor(
                Math.random() * petalColors.length
            )
        ];

    petal.style.animationDuration =
        Math.random() * 7 + 7 + "s";

    petal.style.animationDelay =
        Math.random() * 5 + "s";

    petalContainer.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 15000);
}

setInterval(createPetal, 500);


/* Initial petals */

for (let i = 0; i < 25; i++) {

    createPetal();

}


/* ==========================================
   CAKE SECTION
========================================== */

const cakeSection =
    document.getElementById("cakeSection");

const cakeText =
    document.getElementById("cakeText");

const wishButton =
    document.getElementById("wishButton");


let cakeStarted = false;


/* Observe cake section */

const cakeObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !cakeStarted
                ) {

                    cakeStarted = true;

                    startCakeAnimation();

                }

            });

        },

        {
            threshold: 0.35
        }

    );


cakeObserver.observe(cakeSection);


/* ==========================================
   CAKE ANIMATION TIMELINE
========================================== */

function startCakeAnimation() {

    cakeText.innerHTML =
        "Preparing something sweet for you... 🎂";


    setTimeout(() => {

        cakeText.innerHTML =
            "Adding a little sweetness... 🍰";

    }, 1800);


    setTimeout(() => {

        cakeText.innerHTML =
            "Almost ready... ✨";

    }, 3300);


    setTimeout(() => {

        cakeText.innerHTML =
            "One candle, one wish... 🕯️";

    }, 4500);


    setTimeout(() => {

        cakeText.innerHTML =
            "Make your wish... 💫";

    }, 5600);


    setTimeout(() => {

        cakeText.innerHTML =
            "Blowing the candle... 💨";

    }, 7000);


    setTimeout(() => {

        blowCandle();

    }, 7600);


    setTimeout(() => {

        cakeText.innerHTML =
            "Your wish is safe with me. ❤️";

        wishButton.classList.add("show");

    }, 8500);

}


/* ==========================================
   BLOW CANDLE
========================================== */

function blowCandle() {

    const flame =
        document.querySelector(".flame");

    flame.style.animation =
        "none";

    flame.style.opacity = "0";

    flame.style.transform =
        "translateX(-50%) scale(0)";

}


/* ==========================================
   WISH MODAL + EMAILJS
   (opens a form so the wish can be typed
   and emailed, then continues the flow
   into the card section)
========================================== */

/*
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (e.g. Gmail) connected to
      jatin.rajput742025@gmail.com — this is where
      wishes will arrive.
   3. Create an Email Template with these variables
      in the body: {{wish_message}}, {{from_name}}, {{sent_at}}
   4. Copy your Public Key, Service ID and Template ID
      below.
*/

const EMAILJS_PUBLIC_KEY = "FK4Q2wDxH7_oM1Mzv";
const EMAILJS_SERVICE_ID = "service_wvim7te";
const EMAILJS_TEMPLATE_ID = "template_2zx9k9b";

if (window.emailjs) {

    emailjs.init(EMAILJS_PUBLIC_KEY);

}


const wishModalOverlay =
    document.getElementById("wishModalOverlay");

const wishModalClose =
    document.getElementById("wishModalClose");

const wishInput =
    document.getElementById("wishInput");

const wishModalSubmit =
    document.getElementById("wishModalSubmit");

const wishModalError =
    document.getElementById("wishModalError");

const wishModalNote =
    document.getElementById("wishModalNote");


function openWishModal() {

    wishModalOverlay.classList.add("show");

    wishModalError.innerHTML = "";
    wishModalNote.innerHTML = "";

    wishInput.value = "";

    wishModalSubmit.disabled = false;

    wishModalSubmit.innerHTML =
        "Send my wish ✨";

    setTimeout(() => wishInput.focus(), 400);

}


function closeWishModal() {

    wishModalOverlay.classList.remove("show");

}


function goToCardSection() {

    document
        .getElementById("cardSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Open the modal instead of jumping straight
   to the card, so the wish can be typed first */

wishButton.addEventListener(
    "click",
    () => {

        openWishModal();

    }
);


/* Close icon / clicking outside the card
   skips sending and just continues the flow */

wishModalClose.addEventListener(
    "click",
    () => {

        closeWishModal();
        goToCardSection();

    }
);

wishModalOverlay.addEventListener(
    "click",
    (e) => {

        if (e.target === wishModalOverlay) {

            closeWishModal();
            goToCardSection();

        }

    }
);


/* Submit -> send the wish via EmailJS,
   then continue on to the card section */

wishModalSubmit.addEventListener(
    "click",
    () => {

        const wishText =
            wishInput.value.trim();

        if (!wishText) {

            wishModalError.innerHTML =
                "Please write your wish first 🌸";

            return;

        }

        if (!window.emailjs) {

            wishModalError.innerHTML =
                "Couldn't reach the mail service. Please try again.";

            return;

        }

        wishModalError.innerHTML = "";

        wishModalSubmit.disabled = true;

        wishModalSubmit.innerHTML =
            "Sending... 💌";

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                message: document.getElementById("wishInput").value,
                wish_message: wishText,
                from_name: "Hunar",
                sent_at: new Date().toLocaleString()
            }
        )
        .then(() => {

            wishModalNote.innerHTML =
                "Your wish has been sent 💗";

            wishModalSubmit.innerHTML =
                "Sent ✨";

            setTimeout(() => {

                closeWishModal();
                goToCardSection();

            }, 1800);

        })
        .catch((error) => {

            console.error(
                "EmailJS error:",
                error
            );

            wishModalError.innerHTML =
                "Something went wrong. Please try again.";

            wishModalSubmit.disabled = false;

            wishModalSubmit.innerHTML =
                "Send my wish ✨";

        });

    }
);


/* ==========================================
   BACKGROUND MUSIC
   (autoplays where the browser allows it;
   otherwise starts on the visitor's first
   tap/scroll/click — this is a browser
   security rule, not something code can skip.
   Music stops on its own when the tab/site
   is closed.)
========================================== */

const bgMusic =
    document.getElementById("bgMusic");

const musicToggle =
    document.getElementById("musicToggle");

const musicIcon =
    document.getElementById("musicIcon");

let musicPlaying = false;


function playMusic() {

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicIcon.innerHTML = "🔊";

        })
        .catch(() => {

            /* Autoplay blocked — will retry
               on the visitor's first interaction */

            musicPlaying = false;

        });

}


function pauseMusic() {

    bgMusic.pause();

    musicPlaying = false;

    musicIcon.innerHTML = "🔇";

}


/* Try to play immediately on page load */

playMusic();


/* Fallback: start music on first interaction
   if the browser blocked the initial autoplay */

function startOnFirstInteraction() {

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicIcon.innerHTML = "🔊";

            document.removeEventListener("click", startOnFirstInteraction);
            document.removeEventListener("keydown", startOnFirstInteraction);
            document.removeEventListener("touchstart", startOnFirstInteraction);

        })
        .catch(() => {

            /* still blocked — keep listening for
               the next interaction */

        });

}

document.addEventListener("click", startOnFirstInteraction);
document.addEventListener("keydown", startOnFirstInteraction);
document.addEventListener("touchstart", startOnFirstInteraction);

document.addEventListener("click", startOnFirstInteraction);
document.addEventListener("scroll", startOnFirstInteraction);
document.addEventListener("keydown", startOnFirstInteraction);
document.addEventListener("touchstart", startOnFirstInteraction);


/* Manual mute/unmute button */

musicToggle.addEventListener(
    "click",
    (e) => {

        e.stopPropagation();

        if (musicPlaying) {

            pauseMusic();

        } else {

            playMusic();

        }

    }
);


/* ==========================================
   CARD OPEN
========================================== */

const birthdayCard =
    document.getElementById("birthdayCard");

const openInstruction =
    document.getElementById("openInstruction");

const afterCard =
    document.getElementById("afterCard");


birthdayCard.addEventListener(
    "click",
    () => {

        if (
            birthdayCard.classList.contains("open")
        ) {

            return;

        }


        birthdayCard.classList.add("open");


        openInstruction.innerHTML =
            "A little message, just for you ❤️";


        setTimeout(() => {

            afterCard.classList.add("show");

        }, 1200);

    }
);
