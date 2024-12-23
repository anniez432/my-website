document.addEventListener("DOMContentLoaded", () => {
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");
    const projectWrapper = document.querySelector(".projects-wrapper");
    const projectCards = document.querySelectorAll(".project-card");

    const welcomeTitle = document.getElementById("welcome-title");
    let lastScrollPosition = 0;

    let cardIndex = 0;

    function updateCard(){
        const cardWidth = projectCards[0].offsetWidth + 10; // Get the width of the first card
        const offset = -cardIndex * cardWidth; // Move by the width of one card
        projectWrapper.style.transform = `translateX(${offset}px)`; // Use px instead of %
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