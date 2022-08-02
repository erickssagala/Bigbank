{
    const indicator = document.getElementById("indicator");
    const login = document.getElementById("login");
    const register = document.getElementById("register");
    const regForm = document.getElementById("Regform");
    const logForm = document.getElementById("Logform");
    const regBtn = document.getElementById("btn-register");

    login.onclick = (e)=>{
        indicator.style.transform = "translateX(40px)";
        logForm.style.transform = "translateX(350px)";
        regForm.style.transform = "translateX(350px)";
    }
    register.onclick = (e)=>{
        indicator.style.transform = "translateX(180px)";
        logForm.style.transform = "translateX(0px)";
        regForm.style.transform = "translateX(0px)";
    }
    regBtn.onclick = (e)=>{
        
    }
}