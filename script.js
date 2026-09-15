/* =========================
   SLIT LAB
========================= */

let score = 0;
let xp = 0;
let level = 1;

let currentDifficulty = "easy";
let currentQuestion = 0;
let missionScore = 0;
let missionAnswered = false;

let experimentType = "single";


/* =========================
   PAGE SYSTEM
========================= */

function goPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goHome() {
    goPage("mainMenu");
}


function openMission() {

    goPage("missionPage");

    document.getElementById("difficultySelect").style.display = "grid";
    document.getElementById("questionArea").style.display = "none";
}


function openLab() {
    goPage("labPage");
    updateLab();
}


function openLearn() {
    goPage("teacherPage");
}


/* =========================
   SCORE + XP
========================= */

function addScore(points) {

    score += points;

    document.getElementById("score").textContent = score;
}


function addXP(amount) {

    xp += amount;

    while (xp >= 100) {

        xp -= 100;

        level++;

        showPopup(
            "🎉",
            "Level Up!",
            `คุณเลื่อนเป็น Level ${level} แล้ว`
        );
    }

    document.getElementById("playerLevel").textContent = level;

    document.getElementById("xpBar").style.width =
        xp + "%";
}


/* =========================
   QUESTIONS
========================= */

const questions = {

    easy: [

        {
            q: "เมื่อแสงผ่านช่องแคบมาก ๆ จะเกิดปรากฏการณ์ใด?",
            choices: [
                "การเลี้ยวเบน",
                "การสะท้อน",
                "การหักเห",
                "การดูดกลืน"
            ],
            answer: 0,
            explain: "แสงสามารถเลี้ยวเบนเมื่อผ่านช่องแคบได้"
        },

        {
            q: "Double Slit มีช่องเปิดกี่ช่อง?",
            choices: [
                "1 ช่อง",
                "2 ช่อง",
                "3 ช่อง",
                "4 ช่อง"
            ],
            answer: 1,
            explain: "Double Slit หมายถึงการทดลองที่มีช่องเปิด 2 ช่อง"
        },

        {
            q: "บริเวณที่คลื่นเสริมกันจะเกิดเป็นอะไร?",
            choices: [
                "แถบสว่าง",
                "แถบมืด",
                "ไม่มีแสง",
                "เงา"
            ],
            answer: 0,
            explain: "คลื่นที่เสริมกันจะทำให้แอมพลิจูดมากขึ้น จึงเห็นเป็นแถบสว่าง"
        },

        {
            q: "ตัวแปร λ หมายถึงอะไร?",
            choices: [
                "ความยาวคลื่น",
                "ระยะทาง",
                "ความถี่",
                "ความเร็ว"
            ],
            answer: 0,
            explain: "λ (แลมบ์ดา) ใช้แทนความยาวคลื่น"
        },

        {
            q: "ถ้าช่องสลิตแคบลง แสงจะมีแนวโน้มอย่างไร?",
            choices: [
                "กระจายกว้างขึ้น",
                "กระจายแคบลง",
                "หยุดทันที",
                "เปลี่ยนเป็นเสียง"
            ],
            answer: 0,
            explain: "ช่องยิ่งแคบ การเลี้ยวเบนยิ่งชัดและแสงกระจายกว้างขึ้น"
        }

    ],


    medium: [

        {
            q: "ถ้าเพิ่มความยาวคลื่น โดยค่าอื่นคงเดิม ระยะห่างแถบจะเป็นอย่างไร?",
            choices: [
                "มากขึ้น",
                "น้อยลง",
                "เท่าเดิม",
                "หายไป"
            ],
            answer: 0,
            explain: "จาก β = λL/d เมื่อ λ เพิ่ม ค่า β ก็เพิ่ม"
        },

        {
            q: "ถ้าเพิ่มระยะถึงฉาก L จะเกิดอะไรขึ้นกับลายแสง?",
            choices: [
                "แถบห่างขึ้น",
                "แถบชิดขึ้น",
                "ไม่มีการเปลี่ยนแปลง",
                "แสงหายไป"
            ],
            answer: 0,
            explain: "เมื่อ L เพิ่ม ระยะห่างระหว่างแถบจะเพิ่มขึ้น"
        },

        {
            q: "สูตรใดใช้หาระยะห่างระหว่างแถบของ Double Slit?",
            choices: [
                "β = λL/d",
                "E = mc²",
                "v = fλ",
                "F = ma"
            ],
            answer: 0,
            explain: "Double Slit ใช้ β = λL/d"
        },

        {
            q: "ถ้าเพิ่มระยะห่างระหว่างช่อง d โดยค่าอื่นคงเดิม แถบจะเป็นอย่างไร?",
            choices: [
                "ชิดกันมากขึ้น",
                "ห่างกันมากขึ้น",
                "ไม่มีแถบ",
                "สว่างขึ้นทุกจุด"
            ],
            answer: 0,
            explain: "จาก β = λL/d เมื่อ d เพิ่ม ค่า β จะลดลง"
        },

        {
            q: "การทดลอง Single Slit เน้นศึกษาปรากฏการณ์ใด?",
            choices: [
                "การเลี้ยวเบน",
                "การชน",
                "แรงโน้มถ่วง",
                "ไฟฟ้าสถิต"
            ],
            answer: 0,
            explain: "Single Slit ใช้ศึกษาการเลี้ยวเบนของแสงเป็นหลัก"
        }

    ],


    hard: [

        {
            q: "ถ้า λ เพิ่มเป็น 2 เท่า และค่าอื่นคงเดิม β จะเป็นอย่างไร?",
            choices: [
                "เพิ่มเป็น 2 เท่า",
                "ลดครึ่งหนึ่ง",
                "เท่าเดิม",
                "เพิ่มเป็น 4 เท่า"
            ],
            answer: 0,
            explain: "β แปรผันตรงกับ λ ดังนั้นเพิ่ม λ เป็น 2 เท่า β ก็เพิ่ม 2 เท่า"
        },

        {
            q: "ถ้า L เพิ่มเป็น 2 เท่า ระยะห่างแถบ β จะเป็นอย่างไร?",
            choices: [
                "เพิ่มเป็น 2 เท่า",
                "ลดครึ่งหนึ่ง",
                "เท่าเดิม",
                "เป็น 4 เท่า"
            ],
            answer: 0,
            explain: "จาก β = λL/d ค่า β แปรผันตรงกับ L"
        },

        {
            q: "ถ้า d เพิ่มเป็น 2 เท่า ระยะห่างแถบ β จะเป็นอย่างไร?",
            choices: [
                "ลดเหลือครึ่งหนึ่ง",
                "เพิ่มเป็น 2 เท่า",
                "เท่าเดิม",
                "เพิ่มเป็น 4 เท่า"
            ],
            answer: 0,
            explain: "d อยู่ด้านล่างของสูตร ดังนั้นเมื่อ d เพิ่ม 2 เท่า β จะลดครึ่งหนึ่ง"
        },

        {
            q: "จาก y ≈ λL/a ถ้า a ลดลงครึ่งหนึ่ง y จะเป็นอย่างไร?",
            choices: [
                "เพิ่มเป็น 2 เท่า",
                "ลดครึ่งหนึ่ง",
                "เท่าเดิม",
                "เป็น 4 เท่า"
            ],
            answer: 0,
            explain: "a อยู่ในส่วนหาร เมื่อ a ลดครึ่งหนึ่ง y จึงเพิ่มเป็น 2 เท่า"
        },

        {
            q: "ข้อใดทำให้การเลี้ยวเบนเห็นได้ชัดขึ้น?",
            choices: [
                "ใช้ช่องสลิตที่แคบลง",
                "ใช้ช่องสลิตที่กว้างขึ้น",
                "ลดความยาวคลื่นจนเป็นศูนย์",
                "ปิดแหล่งกำเนิดแสง"
            ],
            answer: 0,
            explain: "ช่องสลิตที่แคบลงทำให้การเลี้ยวเบนเด่นชัดขึ้น"
        }

    ]

};


/* =========================
   START MISSION
========================= */

function startMission(difficulty) {

    currentDifficulty = difficulty;

    currentQuestion = 0;

    missionScore = 0;

    missionAnswered = false;

    document.getElementById("difficultySelect").style.display = "none";

    document.getElementById("questionArea").style.display = "block";

    showQuestion();
}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

    const questionList = questions[currentDifficulty];

    const q = questionList[currentQuestion];

    document.getElementById("questionNumber").textContent =
        currentQuestion + 1;

    document.getElementById("questionCount").textContent =
        questionList.length;

    document.getElementById("questionText").textContent =
        q.q;

    const choices =
        document.getElementById("answerChoices");

    choices.innerHTML = "";

    missionAnswered = false;

    document.getElementById("missionFeedback").textContent = "";

    document.getElementById("nextQuestionBtn").style.display =
        "none";


    q.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            choice;

        button.onclick = function () {
            checkAnswer(index, button);
        };

        choices.appendChild(button);
    });
}


/* =========================
   CHECK ANSWER
========================= */

function checkAnswer(selected, selectedButton) {

    if (missionAnswered) return;

    missionAnswered = true;

    const q =
        questions[currentDifficulty][currentQuestion];

    const allButtons =
        document.querySelectorAll(".answer-btn");

    allButtons.forEach(button => {
        button.disabled = true;
    });


    if (selected === q.answer) {

        selectedButton.classList.add("correct");

        missionScore += 100;

        addScore(100);

        addXP(20);

        document.getElementById("missionFeedback").innerHTML =
            "✅ <strong>ถูกต้อง!</strong><br>" +
            q.explain;

    } else {

        selectedButton.classList.add("wrong");

        allButtons[q.answer].classList.add("correct");

        document.getElementById("missionFeedback").innerHTML =
            "❌ <strong>ยังไม่ถูก</strong><br>" +
            "คำตอบที่ถูกคือ " +
            q.choices[q.answer] +
            "<br>" +
            q.explain;
    }


    document.getElementById("nextQuestionBtn").style.display =
        "inline-block";
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    currentQuestion++;

    if (
        currentQuestion >=
        questions[currentDifficulty].length
    ) {

        finishMission();

        return;
    }

    showQuestion();
}


/* =========================
   FINISH
========================= */

function finishMission() {

    const total =
        questions[currentDifficulty].length * 100;

    const percent =
        Math.round((missionScore / total) * 100);

    let message = "";

    if (percent === 100) {
        message = "สุดยอด! เข้าใจเรื่องสลิตดีมาก";
    } else if (percent >= 60) {
        message = "ทำได้ดี! ลองทบทวนข้อที่ผิดอีกนิด";
    } else {
        message = "ลองกลับไปอ่าน Learn แล้วมาทดลองใหม่";
    }

    showPopup(
        "🎯",
        "จบภารกิจ!",
        `คะแนน ${missionScore} / ${total}<br>${message}`
    );
}


/* =========================
   HINT
========================= */

function photonHint() {

    showPopup(
        "💡",
        "คำใบ้",
        "ลองนึกถึงความสัมพันธ์ของ<br>" +
        "λ, L, d และ a<br><br>" +
        "ถ้าค่าอยู่ในตัวหารเพิ่มขึ้น ผลลัพธ์จะลดลง"
    );
}


/* =========================
   EXPERIMENT TYPE
========================= */

function setExperiment(type) {

    experimentType = type;

    const singleBtn =
        document.getElementById("singleBtn");

    const doubleBtn =
        document.getElementById("doubleBtn");

    const explain =
        document.getElementById("experimentExplain");

    const distanceSetting =
        document.getElementById("distanceSetting");


    if (type === "single") {

        singleBtn.classList.add("active");

        doubleBtn.classList.remove("active");

        distanceSetting.style.opacity = "0.45";

        explain.innerHTML = `
            <strong>🔵 Single Slit</strong>
            <p>
                แสงผ่านช่องเดียว แล้วเกิด
                <b>การเลี้ยวเบน</b>
                ทำให้แสงกระจายออกเป็นแถบ
            </p>
        `;

    } else {

        singleBtn.classList.remove("active");

        doubleBtn.classList.add("active");

        distanceSetting.style.opacity = "1";

        explain.innerHTML = `
            <strong style="color:#7c3aed">
                🟣 Double Slit
            </strong>

            <p>
                แสงผ่านสองช่อง แล้วเกิด
                <b>การแทรกสอด</b>
                ทำให้เกิดแถบสว่างและมืดสลับกัน
            </p>
        `;
    }

    updateLab();
}


/* =========================
   LAB
========================= */

function updateLab() {

    const lambda =
        Number(document.getElementById("lambda").value);

    const slitWidth =
        Number(document.getElementById("slitWidth").value);

    const slitDistance =
        Number(document.getElementById("slitDistance").value);

    const screenDistance =
        Number(document.getElementById("screenDistance").value);


    /* แสดงค่า */

    document.getElementById("lambdaValue").textContent =
        lambda + " nm";

    document.getElementById("slitWidthValue").textContent =
        slitWidth + " μm";

    document.getElementById("slitDistanceValue").textContent =
        slitDistance + " μm";

    document.getElementById("screenDistanceValue").textContent =
        (screenDistance / 10).toFixed(1) + " m";


    /* ผล */

    document.getElementById("dataLambda").textContent =
        lambda + " nm";


    calculateBeta(
        lambda,
        slitWidth,
        slitDistance,
        screenDistance
    );


    drawPattern(
        lambda,
        slitWidth,
        slitDistance
    );
}


/* =========================
   CALCULATE
========================= */

function calculateBeta(
    lambda,
    slitWidth,
    slitDistance,
    screenDistance
) {

    const lambdaMeter =
        lambda * 1e-9;

    const L =
        screenDistance / 10;

    const d =
        slitDistance * 1e-6;

    const a =
        slitWidth * 1e-6;


    if (experimentType === "double") {

        const beta =
            (lambdaMeter * L / d) * 1000;

        document.getElementById("dataDistance").textContent =
            beta.toFixed(2) + " mm";

        document.getElementById("patternStatus").textContent =
            "แถบสว่าง–มืด";

        document.getElementById("simpleSummary").textContent =
            `ตอนนี้เป็น Double Slit: แถบสว่างจะห่างประมาณ ${beta.toFixed(2)} mm`;

        document.getElementById("formulaText").textContent =
            "β = λL / d";

    } else {

        const y =
            (lambdaMeter * L / a) * 1000;

        document.getElementById("dataDistance").textContent =
            y.toFixed(2) + " mm";

        document.getElementById("patternStatus").textContent =
            "การเลี้ยวเบน";

        document.getElementById("simpleSummary").textContent =
            `ตอนนี้เป็น Single Slit: ช่องยิ่งแคบ ลายแสงจะยิ่งกระจายกว้าง`;

        document.getElementById("formulaText").textContent =
            "y ≈ λL / a";
    }
}


/* =========================
   DRAW PATTERN
========================= */

function drawPattern(
    lambda,
    slitWidth,
    slitDistance
) {

    const pattern =
        document.getElementById("lightCanvas");


    let spacing;

    if (experimentType === "double") {

        spacing =
            Math.max(
                12,
                Math.min(
                    45,
                    12 +
                    (lambda - 400) / 20
                )
            );

    } else {

        spacing =
            Math.max(
                20,
                Math.min(
                    65,
                    70 - slitWidth * 0.4
                )
            );
    }


    pattern.style.background = `
        repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.98) 0px,
            rgba(255,255,255,.98) ${spacing / 2}px,
            rgba(80,100,180,.35) ${spacing / 2 + 2}px,
            rgba(80,100,180,.35) ${spacing}px
        )
    `;


    /* ถ้าเป็น Single Slit
       ทำให้ตรงกลางสว่างกว่า */

    if (experimentType === "single") {

        pattern.style.background = `
            radial-gradient(
                ellipse at center,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,.9) 18%,
                rgba(120,140,190,.5) 35%,
                rgba(255,255,255,.95) 55%,
                rgba(100,120,170,.4) 70%,
                rgba(255,255,255,.9) 85%
            )
        `;
    }
}


/* =========================
   POPUP
========================= */

function showPopup(icon, title, text) {

    document.getElementById("popupIcon").textContent =
        icon;

    document.getElementById("popupTitle").textContent =
        title;

    document.getElementById("popupText").innerHTML =
        text;

    document.getElementById("popup").classList.add("show");
}


function closePopup() {

    document.getElementById("popup").classList.remove("show");
}


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closePopup();
    }

});


/* =========================
   START
========================= */

window.addEventListener("load", function() {

    document
        .getElementById("lambda")
        .addEventListener("input", updateLab);

    document
        .getElementById("slitWidth")
        .addEventListener("input", updateLab);

    document
        .getElementById("slitDistance")
        .addEventListener("input", updateLab);

    document
        .getElementById("screenDistance")
        .addEventListener("input", updateLab);


    updateLab();

});