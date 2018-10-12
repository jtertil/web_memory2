const memory2 = {
  cardCount : 16, //number of cards
  cardsOnRow : 4, //number of cards in one cardsOnRow
  divBoard : null, //game board
  divScore :null, //game divScore
  cards : [], //rendomized cards
  cardsChecked : [], //checked cards
  moves : 0, //number of moves
  cardsImg : [ // cards images
        'IMG/title_1.png',
        'IMG/title_2.png',
        'IMG/title_3.png',
        'IMG/title_4.png',
        'IMG/title_5.png',
        'IMG/title_6.png',
        'IMG/title_7.png',
        'IMG/title_8.png',
        'IMG/title_9.png',
        'IMG/title_10.png',
    ],
    canGet : true, //card click lock
    pairs : 0, //card pairs

  cardClick : function(e) {
    if (this.canGet) {
      if (!this.cardsChecked[0] || (this.cardsChecked[0].dataset.index !== e.target.dataset.index)) {
        this.cardsChecked.push(e.target);
        e.target.style.backgroundImage = 'url(' + this.cardsImg[e.target.dataset.cardType] + ')';
      }

      if (this.cardsChecked.length === 2) {
        this.canGet = false;

        if (this.cardsChecked[0].dataset.cardType === this.cardsChecked[1].dataset.cardType) {
          setTimeout(this.deleteCards.bind(this), 500);
        } else {
          setTimeout(this.resetCards.bind(this), 1000);
        }

        this.moves++;
        this.divScore.innerHTML = this.moves;

      }
    }
  },

  deleteCards : function() {
    this.cardsChecked[0].remove();
    this.cardsChecked[1].remove();

    this.canGet = true;
    this.cardsChecked = [];

    this.pairs++
    if (this.pairs >= this.cardCount /2) {
      alert('Game Over!')
    }
  },

  resetCards : function() {
    this.cardsChecked[0].style.backgroundImage = 'url(IMG/title.png)';
    this.cardsChecked[1].style.backgroundImage = 'url(IMG/title.png)';

    this.cardsChecked = [];
    this.canGet = true;
  },

  StartGame : function() {
    // clear game board
    this.divBoard = document.querySelector('.game-board');
    this.divBoard.innerHTML = '';

    // clear score record
    this.divScore = document.querySelector('.game-score');
    this.divScore.innerHTML = '';

    // clear variables
    this.cards = [];
    this.cardsChecked = [];
    this.moves = 0;
    this.canGet = true;
    this.pairs = 0;

    //create gameboard
    for (let i=0; i<this.cardCount; i++) {
        this.cards.push(Math.floor(i/2));
    }

    //randomize gameboard
    for (let i=this.cardCount-1; i>0; i--) {
        const swap = Math.floor(Math.random()*i);
        const tmp = this.cards[i];
        this.cards[i] = this.cards[swap];
        this.cards[swap] = tmp
    }

    for (let i=0; i<this.cardCount; i++){
      const card = document.createElement('div');
      card.classList.add("game-card");
      this.divBoard.appendChild(card);

      card.dataset.cardType = this.cards[i];
      card.dataset.index = i;
      card.style.left = 10 + (card.offsetWidth+10) * (i%this.cardsOnRow) + 'px'
      card.style.top = 10 + (card.offsetHeight+10) * (Math.floor(i/this.cardsOnRow)) + 'px';

      card.addEventListener('click', this.cardClick.bind(this));
    }
    }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.game-start').addEventListener('click', function() {
    memory2.StartGame();
  })
})
