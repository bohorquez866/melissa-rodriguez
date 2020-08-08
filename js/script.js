const burguerMenu = document.querySelector('.burger-menu');
const navbarList = document.querySelector('.navbar__list');
const accItemHead = document.querySelectorAll('.accordion-header');

//Accordion
accItemHead.forEach(accItem => {
    //closes other accoridons when one isopen
    accItem.addEventListener("click", event => {
        const activeAC = document.querySelector(".accordion-header.active");
        if (activeAC && activeAC !== accItem) {
            activeAC.classList.toggle("active");
            activeAC.nextElementSibling.style.maxHeight = 0;
            activeAC.nextElementSibling.style.overflow = 'hidden';
        }
        accItem.classList.toggle("active");
        const accordionItemBody = accItem.nextElementSibling;
        //opens accordion
        if (accItem.classList.contains("active")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 100 + "px";
            accordionItemBody.style.overflow = 'initial';
            //closes accordion
        } else if (!accItem.classList.contains("active")) {
            accordionItemBody.style.maxHeight = 0;
            accordionItemBody.style.overflow = 'hidden';
        }
    });
});
//open and closes mobile menu
burguerMenu.addEventListener('click', e => {
    navbarList.classList.toggle('show-sidebar');
});




//Firebase Keys
var firebaseConfig = {
    apiKey: "AIzaSyCebFMQZXla6NP66MohXB6uZr5YZ0cklxA",
    authDomain: "melissa-rrz.firebaseapp.com",
    databaseURL: "https://melissa-rrz.firebaseio.com",
    projectId: "melissa-rrz",
    storageBucket: "melissa-rrz.appspot.com",
    messagingSenderId: "239597702654",
    appId: "1:239597702654:web:28697bf87085fd5ef7c4af",
    measurementId: "G-V0456QX5RG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//validates contact form
let messagesRef = firebase.database().ref('messages');
//submit event
const contactForm = document.querySelector('#contactForm');
let submitForm = e => {
    e.preventDefault();
    let name = getVal('name'),
        email = getVal('email'),
        phone = getVal('phone'),
        message = getVal('message');
    saveMessages(name, email, phone, message);

    //show alert
    document.querySelector('.alert').style.display = 'inline-block';

    //hide alert after a few seconds
    setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);
    //clear form
    contactForm.reset();
};

contactForm.addEventListener('submit', submitForm);

//get input values
const getVal = selector => document.getElementById(selector).value;

//save messages 
let saveMessages = (name, email, phone, message) => {
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
}