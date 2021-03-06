/////////////////////////////
//HOMEPAGE TYPING ANIMATION//
/////////////////////////////

// Global variable to prevent myNameChanger starting before text has finished typing
var TYPING = true;
var NAME_LIST = [
    "Ian Patterson",
    "Michael Scott",
    "Mary Poppins",
    "Walter White",
    "Leslie Knope"
]

function typeWriter(selectedSpan, typeSpeed) {
    // in case of weirdness
    if(selectedSpan == undefined || typeSpeed == NaN) {
        return ['',0];
    }
    // get text data from span element
    let txt = selectedSpan.getAttribute('data-text');
    // this loop creates the typing effect
    for(c=0; c<txt.length; c++) { // c is for character
        (function(c){setTimeout(function(){selectedSpan.innerHTML += txt[c];}, c*typeSpeed);})(c);
    };
    let duration = (txt.length)*typeSpeed;
    // create output for controller to check text output and determine timing
    let outputArray = [txt, duration];
    return outputArray;
};

class myController {
    constructor(spansList, wait, typeSpeed) {
        this.spansList = spansList;
        this.index = 0;
        this.wait = parseInt(wait,10);
        this.typeSpeed = parseInt(typeSpeed,10);
        this.isTyping = false;
        this.output = '';
        this.type();
    }
    type() {
        // set pause to default
        let pause = 0;
        // set text check variable to current text
        const current = this.spansList[this.index].getAttribute('data-text');

        // if current text has finished being typed
        if(this.isTyping && this.output[0] == current) {
            // increment index counter
            this.index++;
            // signal to controller that typing has finished
            this.isTyping = false;
            // change pause to set wait time between words
            pause = this.wait;
            // reset output array
            this.output = [];

         // check if current text hasn't started typing
        } else if(!this.isTyping && this.output == '') {
            // signal to controller that typing has started
            this.isTyping = true;
            // remove/add cursor effect
            if(this.index > 0) {this.spansList[this.index-1].classList.remove('cursor')};
            this.spansList[this.index].classList.add('cursor');
            // start typing a new word
            this.output = typeWriter(this.spansList[this.index], this.typeSpeed);
            pause = this.output[1];
        }
        // check if entire text has finished typing
        if(this.index == this.spansList.length) {
            this.spansList[this.index-1].classList.remove('cursor');
            // let myNameChanger know text has finished typing
            TYPING = false;
            // exit
            return;

         // if not, callback
        } else {
            setTimeout(() => this.type(), pause);
        }
    }
}

function homeAnimationInit() {
    const spansList = document.querySelectorAll('.typewriter');
    const wait = 200;
    const typeSpeed = 100;
    // start myController
    new myController(spansList, wait, typeSpeed);
}
document.addEventListener('DOMContentLoaded',homeAnimationInit);

//////////////////////////
// change name function //
//////////////////////////

class myNameChanger {
    constructor(txtElement, names, wait = 3000) {
        this.txtElement = txtElement;
        this.names = names;
        this.txt = 'Ian Patterson';
        this.nameIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = true;
    }
    type() {
        // current index of name, allows the function to loop because the last position % index.length is equal to zero
        const current = this.nameIndex % this.names.length;

        // get full text of current name
        const fullTxt = this.names[current];

        // check if deleting
        if(this.isDeleting) {
            // remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // initial type Speed
        let typeSpeed = 300;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // if word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // make a pause at end
            typeSpeed = this.wait;
            // set delete to true;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt == '') {
            this.isDeleting = false;
            // move to next name
            this.nameIndex++
            // Pause before start typing
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

function init() {
    if(TYPING == false) { // stops the object from being created unless the homepage text has finished typing
        const txtElement = document.querySelector('.myName');
        const names = NAME_LIST;
        const wait = txtElement.getAttribute('data-wait');
        // Instantiate myNameChanger
        new myNameChanger(txtElement, names, wait);
        // stop multiples of myNameChanger being instantiated on click 
        function disable() {
            txtElement.onclick = null;
        };
        disable();
    } else {
        return;
    }  
};
////////////////////////
// responsive top nav //
///////////////////////
// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the menu icon
function myNavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}
/////////////////
// pop-up form //
////////////////
// Toggle showing and hiding contact form when the user clicks on the button
var modal = document.querySelector(".md-modal")
function openForm() {
    document.getElementById("contact-form").reset();
    modal.classList.add("md-show");
}
function closeForm() {
    modal.classList.remove("md-show");
}
window.onclick = function(event) {
    if (event.target == document.querySelector(".md-overlay")) {
      modal.classList.remove("md-show");
    }
  }