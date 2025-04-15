/*____________________________________________Крутилка меню_________________________________________________*/
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const selectedItemDiv = document.getElementById('selected-item');
    const selectedImage = document.getElementById('selected-image');
    const itemName = document.getElementById('item-name');
    const itemPrice = document.getElementById('item-price');

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 

            const itemNameValue = item.dataset.name;
            const itemPriceValue = item.dataset.price;
            const imageUrl = item.src;

          
            selectedImage.src = imageUrl;
            itemName.textContent = itemNameValue;
            itemPrice.textContent = `Price: $${itemPriceValue}`; 

            selectedItemDiv.style.display = 'block';
        });
    });
});


/*___________________________________________________________________________________________________________*/
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
    document.getElementById("timer").textContent = "Время: " + timeLeft + " секунд";
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = "Время: " + timeLeft + " секунд";
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



     
//_________________________________________________________________\\
        

        let currentPage = 0;
        const pages = document.querySelectorAll('.page');
    
        function showPage(index) {
            pages.forEach((page, i) => {
                page.classList.toggle('active', i === index);
            });
        }
    
        function nextPage() {
            currentPage = (currentPage + 1) % pages.length;
            showPage(currentPage);
        }
    
        function prevPage() {
            currentPage = (currentPage - 1 + pages.length) % pages.length;
            showPage(currentPage);
        }


//_________________________________________________________________\\
   
document.addEventListener('DOMContentLoaded', function () {
    function setupCarousel(containerClass) {
        const containers = document.querySelectorAll(containerClass);

        containers.forEach(container => {
            const cards = container.querySelectorAll('.card');
            const links = container.querySelectorAll('.card-link.silka');

            links.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const targetCardId = this.dataset.target;

                    cards.forEach(card => {
                        card.classList.add('hidden');
                    });

                    document.getElementById(targetCardId).classList.remove('hidden');
                });
            });

            if (cards.length > 0) {
                cards[0].classList.remove('hidden');
            }
        });
    }

    setupCarousel('.coffee-card-container');
    setupCarousel('.cold-drinks-card-container');
    setupCarousel('.tea-card-container');
});
/*_____________________________________________________________________________________________*/


document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');

    function checkTestimonials() {
        testimonials.forEach(testimonial => {
            if (isElementInViewport(testimonial)) {
                testimonial.classList.add('active'); 
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    checkTestimonials();

    window.addEventListener('scroll', checkTestimonials);
});


/*_____________________________________________________________________________________________*/
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    function checkElements() {
        elementsToAnimate.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('active');
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    
    checkElements();

  
    window.addEventListener('scroll', checkElements);
});




/*_____________________________________________________________________________________________*/
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
/*_____________________________________________________________________________________________*/

