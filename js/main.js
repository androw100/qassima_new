function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

AOS.init();

document.getElementById('show-more-btn').addEventListener('click', function() {
    let hiddenCards = document.querySelectorAll('.hidden-card');
    hiddenCards.forEach(function(card) {
      card.classList.remove('hidden-card');
    });
    this.style.display = 'none';
  });