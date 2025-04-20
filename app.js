/*Навбар*/
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= navbarHeight) {
    navbar.classList.remove('hide');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
    
    navbar.classList.add('hide');
  } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
   
    navbar.classList.remove('hide');
  }
  
  lastScroll = currentScroll;
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});



/*____________________________________________Крутилка меню_________________________________________________*/
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const selectedItemDiv = document.getElementById('selected-item');
    const selectedImage = document.getElementById('selected-image');
    const itemName = document.getElementById('item-name');
    const itemPrice = document.getElementById('item-price');

    // Плавное появление элементов меню
    setTimeout(() => {
        document.querySelector('.box').style.opacity = '1';
    }, 100);

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 

            const itemNameValue = item.dataset.name;
            const itemPriceValue = item.dataset.price;
            const imageUrl = item.src;

            selectedImage.src = imageUrl;
            itemName.textContent = itemNameValue;
            itemPrice.textContent = `Price: $${itemPriceValue}`;

            // Плавное появление выбранного элемента
            selectedItemDiv.classList.add('show');
            selectedItemDiv.style.display = 'flex';
        });
    });
});

/*__________________________________________OSnova_________________________________________________________________*/
const questions = [
    { question: "Какой кофе содержит молоко?", answers: ["Эспрессо", "Капучино", "Американо"], correct: 1 },
    { question: "Кофе, на основе сливок?", answers: ["Фильтр-кофе", "Раф", "Эспрессо"], correct: 1 },
    { question: "Какой кофе имеет крепкий вкус?", answers: ["Латте", "Эспрессо", "Капучино"], correct: 1 },
    { question: "Что из этого напиток?", answers: ["Личи", "Мокко", "Мандарин"], correct: 1 },
    { question: "Кофе c молоком?", answers: ["Латте", "Американо", "Эспрессо"], correct: 0 }
];
let timer;
let timeLeft = 60;
let currentQuestionIndex = 0;

function startGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("loss").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.querySelector(".igra").style.display = "none";
    document.querySelector(".start").style.display = "none";
    currentQuestionIndex = 0;
    timeLeft = 60;
    loadQuestion();
    startTimer();
}

function startTimer() {
    document.getElementById("timer-cup").textContent = "Осталось " + timeLeft + " ";
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-cup").textContent = "Осталось " + timeLeft + " ";
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        document.getElementById("question-container").innerHTML = `
            <p>${q.question}</p>
            <button onclick="checkAnswer(0)">${q.answers[0]}</button>
            <button onclick="checkAnswer(1)">${q.answers[1]}</button>
            <button onclick="checkAnswer(2)">${q.answers[2]}</button>
        `;
    } else {
        clearInterval(timer); 
        winGame();
    }
}

function checkAnswer(answerIndex) {
    if (answerIndex === questions[currentQuestionIndex].correct) {
        currentQuestionIndex++;
        loadQuestion(); 
    } else {
        clearInterval(timer);
        gameOver();
    }
}


function gameOver() {
    document.getElementById("game").style.display = "none";
    document.getElementById("loss").style.display = "block";

}

function winGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("win").style.display = "block";

}




/*________________________________________Otzivi_____________________________________________________*/
document.querySelectorAll('.carousel_otzivi').forEach(carousel => {
    let currentIndex = 0;
    const slides = carousel.querySelectorAll('.carousel_item_otziv');
    const totalSlides = slides.length;
    const inner = carousel.querySelector('.carousel_inner_otziv');
    function showSlide(idx) {
        currentIndex = (idx + totalSlides) % totalSlides;
        inner.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
    }
    carousel.querySelector('.next').onclick = () => showSlide(currentIndex + 1);
    carousel.querySelector('.prev').onclick = () => showSlide(currentIndex - 1);
    carousel.querySelectorAll('.like-btn').forEach(btn=>{
        btn.onclick=()=>{let s=btn.nextElementSibling;s.textContent=+s.textContent+1}
    });
});

