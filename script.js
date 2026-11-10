/* ==============================
   PERSONAL CUSTOMIZATION
============================== */

const receiverName = "Katkoty anaaaa❤️";

const senderName = "Hamooooodk ❤️";

const myMessage = `
عاوز أقولك إني بحبككككك اوووي وفعلا يومي مينفعش يعدي غير بيكي ومهما أتكلم أو اقول مش هعرف أوصف حبي ليكي ♥🥺

بس بتمنى من ربنا نفضل العمر كلو سوااا وربنا يديمك ف حياتي ويخليكي ليا يروحي وتفضلي معايا وجنبي علطول بجد مبسوط اوي انك معايا علطول ومش عارف اوصف حبي ليكي قد اي بس انتي اكتر حد بجد بحس معاه بالامان وبحس براحة كبيرة لما بتكلم معاكي وبحب احكيلك كل حاجة بتحصل معايا ودايما انتي معايا ع الحلوة والمرة . ربنا يديمك نعمة ف حياتي ويخليكي ليا يروحي وتفضلي منورة حياتي بوجودك🩷♥

أنا أصلا مكنتش محضر اي كلام والله 😂

بس أنا قولت هقول اللي ف قلبي واللي حاسس بيه ويارب نفضل مع بعض العمر كلة

عاوز أقولك ي كتكوتي إني هفضل جمبك وعمري ما هسيبك مهما حصل لازم افضل قارفك ف عيشتك كده ومطلع عينك الههه😂😂😚🫂

وآخر حاجة أنا بحبكككككك اوي ومقدرش أعيش من غيرك أبدا ومقدرش أتخيل حياتي من غيرك خالص لأنو انتي حتة مني كده كده ي كتكوتي 😚♥🫂🌷
I♥U yaa Katkoty 🥺🫂♥
Happy 11:11 ✨
`;


/* ==============================
   ELEMENTS
============================== */

const butterflyStage =
    document.getElementById("butterflyStage");

const butterfly =
    document.getElementById("butterfly");

const instruction =
    document.getElementById("instruction");

const messageBox =
    document.getElementById("messageBox");

const message =
    document.getElementById("message");

const receiver =
    document.getElementById("receiver");

const signature =
    document.getElementById("signature");

const replay =
    document.getElementById("replay");


/* ==============================
   MESSAGE TYPING
============================== */

let typingTimer;

function typeMessage() {

    clearInterval(typingTimer);

    let index = 0;

    message.textContent = "";

    typingTimer = setInterval(() => {

        if (index < myMessage.length) {

            message.textContent += myMessage[index];

            index++;

        } else {

            clearInterval(typingTimer);

        }

    }, 45);

}


/* ==============================
   GOLDEN PARTICLE SYSTEM
============================== */

const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth *
        window.devicePixelRatio;

    canvas.height = window.innerHeight *
        window.devicePixelRatio;

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor(x, y, explosion = false) {

        this.x = x;
        this.y = y;

        this.size = Math.random() * 2.5 + .5;

        this.life = 1;

        this.color =
            Math.random() > .5 ? "#f5d58a" : "#d6a65e";

        const angle = Math.random() * Math.PI * 2;

        const speed = explosion
            ? Math.random() * 7 + 2
            : Math.random() * .7;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.gravity = explosion ? .015 : -.003;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= .99;
        this.vy += this.gravity;

        this.life -= .008;

    }

    draw() {

        ctx.globalAlpha = Math.max(0, this.life);

        ctx.fillStyle = this.color;

        ctx.shadowBlur = 12;

        ctx.shadowColor = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.shadowBlur = 0;

    }

}


/* ==============================
   CONTINUOUS GOLDEN DUST
============================== */

function ambientParticles() {

    if (Math.random() < .35) {

        particles.push(
            new Particle(
                Math.random() * window.innerWidth,
                window.innerHeight + 5
            )
        );

    }

}


/* ==============================
   BUTTERFLY EXPLOSION
============================== */

function goldenExplosion() {

    const rect = butterfly.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 180; i++) {

        particles.push(
            new Particle(centerX, centerY, true)
        );

    }

}


/* ==============================
   ANIMATION LOOP
============================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    ambientParticles();

    particles.forEach((particle, index) => {

        particle.update();

        particle.draw();

        if (particle.life <= 0) {

            particles.splice(index, 1);

        }

    });

    requestAnimationFrame(animate);

}

animate();


/* ==============================
   START THE EXPERIENCE
============================== */

let opened = false;

function startExperience() {

    if (opened) return;

    opened = true;

    goldenExplosion();

    butterflyStage.classList.add("depart");

    instruction.style.opacity = "0";

    document.getElementById("subtitle").textContent =
        "A little moment, created just for you.";

    receiver.textContent = `For ${receiverName}`;

    signature.textContent = senderName;

    setTimeout(() => {

        butterflyStage.style.display = "none";

        instruction.style.display = "none";

        messageBox.classList.add("show");

        typeMessage();

    }, 1000);

}

butterflyStage.addEventListener(
    "click",
    startExperience
);


/* ==============================
   REPLAY
============================== */

replay.addEventListener("click", () => {

    clearInterval(typingTimer);

    opened = false;

    messageBox.classList.remove("show");

    butterflyStage.style.display = "flex";

    butterflyStage.classList.remove("depart");

    instruction.style.display = "block";

    instruction.style.opacity = "1";

    message.textContent = "";

});


/* ==============================
   11:11 COUNTDOWN
============================== */

function updateCountdown() {

    const target = new Date(
        "2026-11-11T11:11:00"
    ).getTime();

    const now = Date.now();

    const diff = target - now;

    const timer = document.getElementById("timer");

    if (diff <= 0) {

        timer.textContent = "THE MAGIC IS HERE ✨";

        return;

    }

    const days = Math.floor(
        diff / 86400000
    );

    const hours = Math.floor(
        (diff % 86400000) / 3600000
    );

    const minutes = Math.floor(
        (diff % 3600000) / 60000
    );

    const seconds = Math.floor(
        (diff % 60000) / 1000
    );

    timer.textContent =
        `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

}

updateCountdown();

setInterval(updateCountdown, 1000);