document.addEventListener("DOMContentLoaded", () => {
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");
    const projectWrapper = document.querySelector(".projects-wrapper");
    const projectCards = document.querySelectorAll(".project-card")

    let cardIndex = 0;

    function updateCard(){
        const offset = -cardIndex * 50;
        projectWrapper.style.transform = `translateX(${offset}%)`;
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
})