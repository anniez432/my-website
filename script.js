document.addEventListener("DOMContentLoaded", () => {
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");
    const projectWrapper = document.querySelector(".projects-wrapper");
    let projectCards = document.querySelectorAll(".project-card");

    const welcomeTitle = document.getElementById("welcome-title");
    let lastScrollPosition = 0;
    //let cardIndex = 0;
    //let autoScrollInterval;

    // want a loop of the cards
    projectWrapper.innerHTML += projectWrapper.innerHTML;
    projectCards = document.querySelectorAll(".project-card");

    const cardWidth = projectCards[0].offsetWidth + 10;
    let position = 0;
    let speed = 0.75;
    let isPaused = false;
    let manualAction = false;
    let resumeTimeout;

    function continuousScroll() {
        if (!isPaused && !manualAction){
            position -= speed;
            if(Math.abs(position) >= (projectCards.length / 2) * cardWidth){
                position = 0;
            }
            projectWrapper.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(continuousScroll);
    }

    function moveOneCard(direction){
        manualAction = true;
        clearTimeout(resumeTimeout);

        const targetPosition = position + (direction === "left" ? cardWidth: -cardWidth);
        projectWrapper.style.transition = "transform 0.5s ease-in-out";
        position = targetPosition;
        projectWrapper.style.transform = `translateX(${position}px)`;

        setTimeout(() => {
            projectWrapper.style.transition = "none";

            if(Math.abs(position) >= (projectCards.length / 2) * cardWidth){
                position = 0;
                projectWrapper.style.transform = `translateX(${position}px)`;
            } else if (position > 0){
                position = -((projectCards.length / 2) - 1) * cardWidth;
                projectWrapper.style.transform = `translateX(${position}px)`;
            }

            resumeTimeout = setTimeout(() => {
                manualAction = false;
            }, 800);
        }, 500);
    }

    /*
    function moveLeft() {
        position += cardWidth;
        if(position >0) {
            position = -((projectCards.length / 2) - 1) * cardWidth;
        }
    }

    function moveRight() {
        position -= cardWidth;
        if(Math.abs(position) >= (projectCards.length / 2) * cardWidth){
            position = 0;
        }
    }

    function updateCard(){
        const cardWidth = projectCards[0].offsetWidth + 10; // Get the width of the first card
        const offset = -cardIndex * cardWidth; // Move by the width of one card
        projectWrapper.style.transform = `translateX(${offset}px)`; // Use px instead of %
    }

    function nextCard(){
        cardIndex = (cardIndex + 1) % projectCards.length;
        updateCard();
    }

    function previousCard() {
        cardIndex = (cardIndex - 1 + projectCards.length) % projectCards.length;
        updateCard();
    }

    function startAutoScroll(){
        stopAutoScroll();
        autoScrollInterval = setInterval(nextCard, 3000); //scrolls every 3 sec
    }

    function stopAutoScroll(){
        clearInterval(autoScrollInterval);
    }
    */

    leftButton.addEventListener("click", () => {
        moveOneCard("left");
    });

    rightButton.addEventListener("click", () => {
        moveOneCard("right");
    });

    //projectWrapper.addEventListener("mouseenter", () => isPaused = true);
    //projectWrapper.addEventListener("mouseleave", () => isPaused = false);
    projectWrapper.addEventListener("touchstart", () => isPaused = true, {passive: true});
    projectWrapper.addEventListener("touchend", () => isPaused = false), {passive: true};

    continuousScroll();

    /*
    projectWrapper.style.transition = "transform 0.6s ease-in-out";
    updateCard();
    startAutoScroll();
    */

    window.addEventListener("scroll", () => {
        const currentScrollPosition = window.scrollY;
        const isScrollingDown = currentScrollPosition > lastScrollPosition;
        
        let scale = 1 - currentScrollPosition / 1000;


        if (isScrollingDown) {
            welcomeTitle.style.transform = `scale(${Math.max(scale, 1.4)}) translate3d(0, -5px, 0)`;
            
        } else {
            // Reverse transformations when scrolling up
            scale = 1 + currentScrollPosition / 1000; // Grow the title when scrolling up
            welcomeTitle.style.transform = `scale(${Math.max(scale, 1)}) translate3d(0, 5px, 0)`;
        }

        const titleWidth = welcomeTitle.offsetWidth;
        if (titleWidth > window.innerWidth) {
            // If the title is too wide, scale it down to fit within the viewport
            welcomeTitle.style.fontSize = `calc(${(window.innerWidth / titleWidth) * 100}% + 1rem)`;
        } else {
            // Reset to a base font-size if it's within bounds
            welcomeTitle.style.fontSize = `calc(3vw + 1rem)`;
        }
        welcomeTitle.style.transition = `transform 0.6s ease`;
    
        // Update last scroll position
        lastScrollPosition = currentScrollPosition;
    })
})