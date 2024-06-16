
const multiplier = document.querySelector(`.shopping__multiplierX`);
const balanced = document.querySelector(`#balance`);
const spanInside = multiplier.querySelector('span');
const oneItemsMenu = document.querySelector(`#goods-items_1`);
const book = document.querySelector(`.mainbefore__bg`);
const plusPerClick = document.querySelector(`.plusClick`);
const rebirthMenu = document.querySelector(`.rebirth-header`);
const closeRebirthMenu = document.querySelector(`.rebirth__rebirth`)
const countRebirth = closeRebirthMenu.querySelector('span')
const profit = document.querySelector(`#profit`)
const resetGame = document.querySelector(`#reset`)

let countPerClick = 1;
let rebirthCoin = 1;

const items = [
   {
      name: 'Name',
      photo: 1,
      price: 100,
      profit: 5,
      count: 0,
   },
   {
      name: 'Name',
      photo: 2,
      price: 1000,
      profit: 20,
      count: 0,
   },
   {
      name: 'Name',
      photo: 3,
      price: 3000,
      profit: 75,
      count: 0,
   },
   {
      name: 'Name',
      photo: 4,
      price: 9000,
      profit: 200,
      count: 0,
   },
   {
      name: 'Name',
      photo: 5,
      price: 18000,
      profit: 225,
      count: 0,
   },
   {
      name: 'Name',
      photo: 6,
      price: 40000,
      profit: 375,
      count: 0,
   },
]

book.addEventListener('click', plusBalance);
multiplier.addEventListener('click', changeMulti)


closeRebirthMenu.addEventListener('click', () => {
   countPerClick = 1;
   balanced.textContent = 0;
   profit.textContent = 0;
   document.querySelectorAll(`.goods-item`).forEach(item => {
      item.remove()
   });
   multiplier.querySelector('span').textContent = 1;
   rebirthCoin += (Number(countRebirth.textContent))
   console.log(rebirthCoin);
   startGame(items, rebirthCoin)
});

resetGame.addEventListener('dblclick', () => {
   countPerClick = 1;
   rebirthCoin = 1;
   console.log(rebirthCoin);
   balanced.textContent = 0;
   profit.textContent = 0;
   document.querySelectorAll(`.goods-item`).forEach(item => {
      item.remove()
   });
   multiplier.querySelector('span').textContent = 1;
   startGame(items, rebirthCoin)
});
plusPerClick.addEventListener('click', () => {
   if (Number(balanced.textContent) >= 1000) {
      balanced.textContent = Number(balanced.textContent) - 1000;
      countPerClick += 1;
   }
});

document.addEventListener('click', (e) => {
   el = e.target

   if (el.classList.contains('goods-item') && !el.classList.contains('hidden')) {
      console.log(666);
      balanced.textContent = Number(balanced.textContent) - el.dataset.price;
      profit.textContent = Number(profit.textContent) + Number(el.dataset.profit);

      let itemGoodsName = el.querySelector('.goods-item__name');
      let itemGoodsCount = itemGoodsName.querySelector('.goods-item__span');
      let itemGoodsPrice = el.querySelector('.goods-item-price');

      el.dataset.count = Number(el.dataset.count) + Number(itemGoodsCount.textContent)
      el.dataset.first = ((Number(el.dataset.first) + Number(itemGoodsCount.textContent)) * 1.29212358).toFixed(0);
      el.dataset.price = Number(el.dataset.first) * Number(itemGoodsCount.textContent)
      el.querySelector(`.goods-item__count`).textContent = el.dataset.count
      itemGoodsPrice.textContent = el.dataset.first;
   }

   if (el.classList.contains('rebirth-header') || el.classList.contains('rebirth__close') || el.classList.contains('rebirth__rebirth')) {
      document.querySelector(`.rebirth`).classList.toggle('active');
   }

   changeComp();
});

function changeMulti() {
   if (spanInside.innerHTML == '1') {
      spanInside.innerHTML = '10';
   } else if (spanInside.innerHTML == '10') {
      spanInside.innerHTML = '25';
   } else if (spanInside.innerHTML == '25') {
      spanInside.innerHTML = '100';
   } else if (spanInside.innerHTML == '100') {
      spanInside.innerHTML = 'Max';
   } else {
      spanInside.innerHTML = '1';
   }

   let multiplierX = spanInside.innerHTML;

   const goodsPrice = document.querySelectorAll(`[data-price]`).forEach(price => {
      if ((multiplierX != 'Max') && (multiplierX != '1')) {
         price.dataset.price = price.dataset.price * multiplierX;
         changingMulti(multiplierX, price)
      } else if (multiplierX == '1') {
         changingMulti(multiplierX, price)
      } else {
         let multiplierMaxX = Math.floor(Number(balanced.textContent) / price.dataset.first);
         changingMulti(multiplierMaxX, price)
      }
   })
}

function changeComp() {
   document.querySelectorAll(`.goods-item`).forEach(items => {
      if ((Number(balanced.textContent) >= Number(items.dataset.price)) && (Number(items.dataset.price) != 0)) {
         if (items.classList.contains('hidden')) {
            items.classList.remove('hidden')
         }
      } else {
         if (!items.classList.contains('hidden')) {
            items.classList.add('hidden')
         }
      }
   })
   if ((Number(balanced.textContent) >= 1000)) {
      if (plusPerClick.classList.contains('hidden')) {
         plusPerClick.classList.remove('hidden')
      }
   } else {
      if (!plusPerClick.classList.contains('hidden')) {
         plusPerClick.classList.add('hidden')
      }
   }
}

function changingMulti(multi, price) {

   const allGoodsPrice = price.querySelectorAll(`.goods-item-price`);
   const allGoodsProfit = price.querySelectorAll(`.goods-item-profit`);

   price.dataset.price = Number(price.dataset.first) * (multi * 1.21212358).toFixed(0);
   price.dataset.profit = price.dataset.fprofit * multi;
   const goodsName = price.querySelectorAll(`.goods-item__name`).forEach(goodsName => {
      const goodsCount = goodsName.querySelector('.goods-item__span');
      goodsCount.innerHTML = multi;
   });

   if (multi != '1') {
      allGoodsProfit.forEach(goodsProfit => {
         goodsProfit.textContent = Number(price.dataset.fprofit) * multi;
      })
      allGoodsPrice.forEach(goodsPrice => {
         goodsPrice.textContent = Number(price.dataset.first) * (multi * 1.21212358).toFixed(0);
      })
   } else {
      allGoodsProfit.forEach(goodsProfit => {
         goodsProfit.textContent = price.dataset.fprofit;
      })
      allGoodsPrice.forEach(goodsPrice => {
         goodsPrice.textContent = Number(price.dataset.first) * (multi * 1.21212358).toFixed(0);
      })
   }
   changeComp();
}

function plusBalance() {
   balanced.textContent = Number(balanced.textContent) + countPerClick;
}

function startGame(items, multiplierRebirth) {
   let length = Object.keys(items).length;

   console.log(123);

   for (let i = 0; i <= length; i++) {
      let item = items[i];
      if (item) { // Перевірка, щоб уникнути помилок при відсутності ключа
         oneItemsMenu.insertAdjacentHTML(
            'beforeend',
            `
               <article data-name="${item.name}" data-photo='${item.photo}' data-price="${item.price}" data-first="${item.price}" data-count="${item.count}" data-profit="${(item.profit * multiplierRebirth).toFixed(0)}" data-fprofit="${(item.profit * multiplierRebirth).toFixed(0)}" data-require="None" class="game__goods-item goods-item">
                  <div class="goods-item__icon"><img src="img/Hero/${item.photo}.svg" alt=""></div>
                  <div class="goods-item__content">
                     <div class="goods-item__name">${item.name}(<span class='goods-item__count'>${item.count}</span>) (+<span class='goods-item__span'>1</span>)</div>
                     <div class="goods-item__price"><span class="goods-item-price">${item.price}</span>$</div>
                     <div class="goods-item__profit"><span class="goods-item-profit">${(item.profit * multiplierRebirth).toFixed(0)}</span>$/s</div>
                     <div class="goods-item__require">None</div>
                  </div>
               </article>
               `
         );
      }
   }
   changeComp()
}

setInterval(() => {
   balanced.textContent = Number(balanced.textContent) + Number(profit.textContent)
   countRebirth.textContent = ((Number(balanced.textContent) / 4000000) * (Number(profit.textContent) / 9000)).toFixed(1)
   console.log(countRebirth.textContent);
   changeComp();
}, 1000)


window.addEventListener('beforeunload', function (e) {

   let newItems = []
   let userProgress = {
      balanced: balanced.textContent,
      profit: profit.textContent,
      multiplier: multiplierRebirth,
      countPerClick: countPerClick,
   }

   const item = document.querySelectorAll(`.goods-item`).forEach(item => {
      let newItem = {
         name: item.dataset.name,
         photo: item.dataset.photo,
         price: item.dataset.first,
         profit: item.dataset.fprofit,
         count: item.dataset.count,
      }
      newItems.push(newItem);
   })


   localStorage.setItem('items', JSON.stringify(newItems))
   localStorage.setItem('userProgress', JSON.stringify(userProgress))
});

document.addEventListener('DOMContentLoaded', () => {
   let oldItems = JSON.parse(localStorage.getItem('items'))
   let userProgress = JSON.parse(localStorage.getItem('userProgress'))
   if (oldItems != '') {
      startGame(oldItems, 1)
      console.log(111);
   } else {
      startGame(items, 1);
      console.log(333);
   }

   if (userProgress != '') {
      countPerClick = userProgress.countPerClick;
      multiplierRebirth = userProgress.multiplier;
      balanced.textContent = userProgress.balanced;
      profit.textContent = userProgress.profit
   }
})
