const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

const themeToggler = document.querySelector(".theme");

sideBarMenu = document.querySelector(".sidebar").querySelectorAll("a");

sectionHeading = document.getElementById("body-heading");

menuHeadings = document.getElementById("menu-heading");

//-------------changing form section on home-page------------------
const indicator = document.getElementById("indicator");
const login = document.getElementById("login");
const register = document.getElementById("register");
const regForm = document.getElementById("register-form");
const logForm = document.getElementById("login-form");

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



    

    login.onclick = (e)=>{
        indicator.style.transform = "translateX(-200px)";
        logForm.style.transform = "translateX(573px)";
        regForm.style.transform = "translateX(650px)";
    }
    register.onclick = (e)=>{
        indicator.style.transform = "translateX(-60px)";
        logForm.style.transform = "translateX(0px)";
        regForm.style.transform = "translateX(0px)";
    }


