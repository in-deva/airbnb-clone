/*
// section, we're going to make the gallery of photo
onclicks dynamic.
Setup
Create a script.js file in the /public/js folder of your project and load it into the main.hbs layout.
*/

/*
DOM
Using the DOM and client-size JavaScript, make the large image of the gallery become the same image as the thumbnail that you click on.

Each image in the gallery needs an id
onclick, then a function
function changes the image source of the large image

*/

function logHi() {
  console.log('hi')
}
logHi()

function logThis(el) {
  console.log(el)
}

function sendLink(el) {
  console.log(el.src)
  bigPic = `<img
	          class="img-lg img-fluid"
	          src="${el.src}"
	          alt=""
						onclick="logHi()"
	        />`
  console.log(bigPic)
  document.querySelector('#bigPic').src = el.src
  // let img = document.querySelector('img')
  // img.src = 'mountain.jpg'
}

// <img class="img-lg img-fluid p-1" src="https://a0.muscache.com/im/pictures/a5d8bbcc-cf29-4532-9e5e-4aa26503237f.jpg?im_w=720" onclick="logThis(this)">

// let productsButtons = document.querySelectorAll('.product > button')
// let main = document.querySelector('#main')
//
// // https://www.w3schools.com/js/js_htmldom_events.asp
// onclick
//
// onclick = logHi
