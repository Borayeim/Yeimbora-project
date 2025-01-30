const preloader = document.querySelector("#preloader")
const header = document.querySelector(".header")
const progressBtn = document.querySelector("#progress-btn")
const progressBtnPath = progressBtn.querySelector("svg path")


window.addEventListener("load", () => {
    preloader.classList.add("active")
    animationText()
})

const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight
const pathLength = progressBtnPath.getTotalLength()
progressBtnPath.style.strokeDasharray = `${pathLength} ${pathLength}`
// progressBtnPath.style.strokeDashoffset = pathLength

window.addEventListener("scroll", () => {
    // header
    if (window.scrollY > 5) {
        header.classList.add("active")
    } else {
        header.classList.remove("active")
    }

    // header sections
    document.querySelectorAll("section").forEach(current => {
        const id = current.getAttribute("id")
        const h = document.querySelector(`#${id}`).offsetHeight
        const t = document.querySelector(`#${id}`).offsetTop - 80

        if (scrollY > t && scrollY <= t + h) {
            document.querySelector(`.header a[href="#${id}"] button`).classList.add("active")
        } else {
            document.querySelector(`.header a[href="#${id}"] button`).classList.remove("active")
        }
    })

    //progressBtn
    if (window.scrollY > 100) {
        progressBtn.classList.add("active")
    } else {
        progressBtn.classList.remove("active")
    }

    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = window.scrollY / totalScrollableHeight
    progressBtnPath.style.strokeDashoffset = pathLength - (scrollPercentage * pathLength)

})

progressBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

// ability block
const aboutAbility = document.querySelector("#about .ability")
aboutAbility.querySelectorAll(".ability-block").forEach((block) => {
    block.addEventListener("mouseover", () => {
        const blockHeight = block.clientHeight + 3
        const aboutAbilityRect = aboutAbility.getBoundingClientRect()
        const blockRect = block.getBoundingClientRect()
        const blockTop = blockRect.top - aboutAbilityRect.top

        aboutAbility.style.setProperty("--data-height", `${blockHeight}px`)
        aboutAbility.style.setProperty("--data-top", `${(blockTop)}px`)
    })
})

// animation text
function animationText() {
    const aniText = document.querySelector("#ani-txt")
    const words = [
        "WEB DEVELOPER",
        "Security Researcher",
        "TOOL DEVELOPEMENT",
        "ETHICAL HACKING",
        "CONTENT CREATION"
    ]

    let indexText = 0

    setInterval(() => {
        if (indexText == words.length) indexText = 0

        addRandomTextContent(words[indexText])
        indexText++
    }, 4000)

    function getRandomChar() {
        const glitchChars = "X六0@ƒ1{!<>-_/[]{}░▒▓—åß∂ƒ©˙∆˚æ≈ç√∫=+*^?#λ$"
        return glitchChars[Math.floor(Math.random() * glitchChars.length)]
    }

    function getRandomWord(value) {
        let finalVal = ""
        for (let i = 0; i < value.length; i++) {
            finalVal += value[i] == " " ? " " : getRandomChar()
        }
        return finalVal
    }

    function addRandomTextContent(word) {
        aniText.innerHTML = getRandomWord(word)

        const totalRounds = 2
        const interval = 50
        let count = 0
        let globalCount = 0
        let canChange = false

        let timer_ = setInterval(() => {
            let finalValue = ""

            for (let i = 0; i < word.length; i++) {
                if (i <= count && canChange) {
                    finalValue += word[i]
                } else {
                    finalValue += getRandomChar()
                }
            }

            aniText.innerHTML = finalValue

            if (canChange) count++
            if (globalCount == totalRounds) canChange = true
            if (count == word.length) {
                clearInterval(timer_)
                count = 0
                globalCount = 0
                canChange = false
            }

            globalCount++
        }, interval)
    }
}
//let's get all required elements
const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}

