const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

const themeToggler = document.querySelector(".theme");

sideBarMenu = document.querySelector(".sidebar").querySelectorAll("a");

sectionHeading = document.getElementById("body-heading");

menuHeadings = document.getElementById("menu-heading");



//show sidebar
menuBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'block';
})

//close sidebar
closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'none';
})

//change theme
themeToggler.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-theme');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

//changing anchor tags to active onclick

sideBarMenu.forEach(element=>{
    element.addEventListener('click', ()=>{
        sideBarMenu.forEach(nav=>nav.classList.remove("active"));

        element.classList.add("active");

        sectionHeading.innerHTML = element.id;
    })
    
})





