let openCount = 0;
let remaining = 0;
let images = ["apple", "watermelon", "grapes"];
let round = 1;
function init() {
  startGame();
  flip();
}
$(document).on("click touchstart", function (e) {
  //if (e.key == "Enter") {
    console.log("KEY PRESSED");
    $(".msg").addClass("hidden");

    init();
 // }
});
function randNum(item) {
  return Math.floor(Math.random() * item.length);
}

function startGame() {
  //let file=images[randNum(images)];
  let numOfCard = round * 2;
  console.log($(".game-area "));

  if (round > 0) {
    for (let card = 1; card < numOfCard; card += 2) {
      console.log("card", card);
      console.log("numOfCard", numOfCard);

      $(".game-area .row").append(
        `<div class=" col-3 card " style="width: 10rem;"><img src="./images/default.png" class="card-img-top card-front" alt="Card ${card}"><img src="./images/watermelon.jpg" class="card-img-top hidden card-back" alt="Card 3" data-num="${card}"></div>
        <div class=" col-3 card " style="width: 10rem;"><img src="./images/default.png" class="card-img-top card-front" alt="Card ${
          card + 1
        }"><img src="./images/watermelon.jpg" class="card-img-top hidden card-back" alt="Card 3" data-num="${
          card + 1
        }"></div>`
      );
    }
  }
  let n;
  let num;
  let numbers = [];
  document.querySelectorAll("[data-num]").forEach((el) => {
    numbers.push(el.dataset.num);
    console.log("el", el.dataset.num);
  });
  console.log(numbers);
  if (round == 1) {
    console.log("IF round", round);
    document
      .querySelector(`[data-num="1"]`)
      .setAttribute("src", `./images/${images[0]}.jpg`);
    document
      .querySelector(`[data-num="2"]`)
      .setAttribute("src", `./images/${images[0]}.jpg`);
  } else
    for (let j = 0; j < images.length; j++) {
      let y = 0;
      num = -1;
      let attempts = 0;
      while (y < 2 && attempts < 100) {
        let n = randNum(numbers);
        if (num != n && numbers[n] != -1) {
          // assign
          console.log("image", images[j], "num -", numbers[n]);

          y++;
          num = n;
          document
            .querySelector(`[data-num="${numbers[n]}"]`)
            .setAttribute("src", `./images/${images[j]}.jpg`);
          numbers[n] = -1;
        } else {
          console.log("Duplicate or used number", n);
        }
        attempts++;
      }
    }
}
//     for(let i=0;y<100;i++)
// {
//     console.log("line 62 how to solve");

//     n=randNum(numbers);

//     if(num!=n&&numbers[n]!=-1)
//     {y++;
//         num=n;
//         //console.log(file);
//         document.querySelector(`[data-num="${numbers[n]}"]`).setAttribute('src',`./images/${images[j]}.jpg`);
//         console.log(numbers[n],"--img",images[j]);

//         numbers[n]=-1;
//     }
//     else
//     {//i--;
//         i--;

//         console.log("same number generated",n);
//         console.log("y",y);
//     }
// }

// function checkOpen()
// {
//     let openCount=0;
//     document.querySelectorAll('.card-back').forEach(card=>{
//     if(!card.classList.contains('hidden'))
//     {openCount++;

//     console.log("open",openCount);

//     }
//    });
//    return openCount;
// }
function flip() {
  $(".card-front").on("click", function (e) {
    //    let openCount=checkOpen();
    //if(openCount<2)
    // {
    console.log(e.target);
    console.log(e.target.nextElementSibling);
    $(e.target).addClass("hidden");

    $(e.target.nextElementSibling).removeClass("hidden");
    console.log("AFTER -------");

    console.log(e.target);
    console.log(e.target.nextElementSibling);
    openCount++;
    // }
    if (openCount === 2) {
      checkMatch();
    }
  });
}

function checkMatch() {
  let l = 0;
  console.log("CHECK MATCH", l);
  let firstCard;
  let firstImage, secondImage;
  document.querySelectorAll(".card-back").forEach((card) => {
    if (
      !card.classList.contains("hidden") &&
      !card.classList.contains("matched")
    ) {
      console.log("IF====", l);

      if (!firstImage) {
        firstImage = card.getAttribute("src");
        firstCard = card;
        console.log(firstImage);
      } else {
        secondImage = card.getAttribute("src");
        console.log(firstImage);
        console.log(secondImage);
        if (firstImage === secondImage) {
          console.log("MATCHED");
          openCount = 0;
          card.classList.add("matched");
          firstCard.classList.add("matched");
          console.log("secondCard", card);
          console.log("firstCard", firstCard);
        } else {
          console.log("NOT MATCHED");
          setTimeout(() => {
            document.querySelectorAll(".card-back").forEach((card) => {
              if (
                !card.classList.contains("hidden") &&
                !card.classList.contains("matched")
              ) {
                card.classList.add("hidden");
                card.previousElementSibling.classList.remove("hidden");
              }
            });
            openCount = 0;
          }, 500);
        }
      }
    }
    l++;
  });
  console.log(document.querySelectorAll(".matched").length);

  if (document.querySelectorAll(".matched").length === round * 2) {
    console.log("All Matched");
    round++;
    setTimeout(() => {
      $(".card-front").removeClass("hidden");
      $(".card-back").addClass("hidden");

      // $('.game-area .row').html('');
      document.querySelectorAll(".card-back").forEach((el) => {
        el.remove();
      });
      document.querySelectorAll(".card-front").forEach((el) => {
        el.remove();
      });
      document.querySelectorAll(".game-area .row .col-3").forEach((el) => {
        el.remove();
      });
      console.log("================================");
      console.log(document.querySelectorAll(".game-area .row"));
      console.log(document.querySelectorAll(".card-back"));

      //console.log(document.querySelector(`[data-num="1"]`));
      init();
    }, 1000);
  } else {
  }
}
