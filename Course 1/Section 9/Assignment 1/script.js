'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours, // openingHours: openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngrediets) {
    console.log(mainIngredient);
    console.log(otherIngrediets);
  },
};

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

/*
///////////////////////////////////////
// The for-of Loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
// console.log(item); // Array Iterator {}
// }

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries)])

///////////////////////////////////////
// Short Circuiting (&& and ||)

console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuting
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello (first truthy value)

// Practical example
// const guests = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests); // 10 (numGuests = undefined)

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests); // 10 (0 = falsy value)

restaurant.numGuests = 0;
const guests = restaurant.numGuests ?? 10;
console.log(guests); // 0 (0 = non-nullish value)

restaurant.numGuests = 23; // default value
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 23

const guests2 = restaurant.numGuests || 10; // 23
console.log(guests2);


console.log('---- AND ----');
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // Jonas

console.log('Hello' && 23 && null && 'Jonas'); // null (first falsy value)

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


///////////////////////////////////////
// Rest Pattern and Parameters
// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];
console.log(arr); // [1, 2, 3, 4]

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); // Pizza Risotto, ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // {thu: {…}, fri: {…}}

// 2) Functions
const add = function (...numbers) {
  // console.log(numbers); // [2, 3] / [5, 3, 7, 2] / [8, 2, 5, 3, 2, 1, 4]
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); // mushrooms / ['onion', 'olives', 'spinach']
restaurant.orderPizza('mushrooms'); // mushrooms / []


///////////////////////////////////////
// The Spread Operator (...)

const arr = [5, 6, 7];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 5, 6, 7);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

// Copy array
const newMainMenu = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // ['J', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str); // J o n a s
console.log('J', 'o', 'n', 'a', 's'); // J o n a s
// console.log(`${...str} Schmedtmann`); // not gonna work!

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredients 1?"),
  // prompt('Ingredients 2?'),
  // prompt('Ingredients 3?'),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano
*/

/*
///////////////////////////////////////
// Destructuring Objects

// Calling a method with an object
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});



const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

/*
///////////////////////////////////////
Destructuring Arrays

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // destructuring
console.log(x, y, z); // 2 3 4
console.log(arr); // [2, 3, 4]

const [first, second] = restaurant.categories;
console.log(first, second); // Italian Pizzeria

const [first2, , second2] = restaurant.categories;
console.log(first2, second2); // Italian Vegetarian

let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian

// Without destructuring
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary); // Vegetarian Italian

// With destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary); // Vegetarian Italian

// Receive 2 return values from a function
console.log(restaurant.order(2, 0)); // ["Garlic Bread", "Pizza"]
const [starter, mainCourse] = restaurant.order(2, 0); // Garlic Bread Pizza
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j); // 2 [5, 6]
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 5 6

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
