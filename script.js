document.addEventListener("DOMContentLoaded", () => {
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");
    const projectWrapper = document.querySelector(".projects-wrapper");
    const projectCards = document.querySelectorAll(".project-card");

    const welcomeTitle = document.getElementById("welcome-title");
    let lastScrollPosition = 0;

    let cardIndex = 0;

    function updateCard(){
        const cardWidth = projectCards[0].offsetWidth + 20; 
        const offset = -cardIndex * cardWidth;
        projectWrapper.style.transform = `translateX(${offset}px)`;
        projectWrapper.scrollLeft = offset;
    }

    leftButton.addEventListener("click", () => {
        cardIndex = (cardIndex > 0)? cardIndex - 1 : projectCards.length - 1;
        updateCard();
    });

    rightButton.addEventListener("click", () => {
        cardIndex = (cardIndex < projectCards.length - 1)? cardIndex + 1 : 0;
        updateCard();
    });


    updateCard();

    window.addEventListener("scroll", () => {
        const currentScrollPosition = window.scrollY;
        
        let scale = 1 - currentScrollPosition / 1000;

        const isScrollingDown = currentScrollPosition > lastScrollPosition;

        if (isScrollingDown) {
            welcomeTitle.style.transform = `scale(${Math.max(scale, 1.3)}) translate3d(0, -5px, 0)`;
            
        } else {
            // Reverse transformations when scrolling up
            scale = 1 + currentScrollPosition / 1000; // Grow the title when scrolling up
            welcomeTitle.style.transform = `scale(${Math.max(scale, 1)}) translate3d(0, 5px, 0)`;
        }

        welcomeTitle.style.transition = `transform 0.6s ease`;
    
        // Update last scroll position
        lastScrollPosition = currentScrollPosition;
    })
})