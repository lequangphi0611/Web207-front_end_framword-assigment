// slider head

const header = document.getElementsByClassName('m-header')[0];

const containImg = "/img";
// img URL
const imgUrls = [
    `${containImg}/head.jpeg`,
    `${containImg}/head01.jpg`,
    `${containImg}/head02.jpeg`,
    `${containImg}/head04.jpg`
]

changeBackgroundImg();

function setBackgroundImg(ImgURL) {
    header.style.backgroundImage = `url('${ImgURL}')`;
}

function randomImgUrl() {
    let randomNumber = Math.floor(Math.random() * imgUrls.length);
    return imgUrls[randomNumber];
}

function changeBackgroundImg() {
    if (header) {
        header.className += " fadeOut";
        setTimeout(function () {
            header.className = "m-header";
        }, 1000)
        setBackgroundImg(randomImgUrl());
        setTimeout(changeBackgroundImg, 3000);
    }
}

function shuffleArray(args) {
    this.maxLength = args.length - 1;
    this.result = [];

    this.limit = (value) => {
        if (value <= args.length) {
            this.maxLength = value - 1;
        }
        return this;
    };

    this.process = () => {
        let temp = [...args];
        for (let i = this.maxLength; i >= 0;) {
            let indexRandom = Math.floor(Math.random() * temp.length);
            if (temp[indexRandom]) {
                this.result.push(temp[indexRandom]);
                temp.splice(indexRandom, 1);
                i--;
            }
        }
    };

    this.get = () => {
        this.process();
        return this.result;
    };
};

function active(input) {
    input.classList.add("active");
};

function nonActive(input) {
    input.classList.remove("active");
}

function activeSidebar(input) {
    let sidebars = document.getElementsByClassName('sidebar');
    for (let i = 0; i < sidebars.length; i++) {
        nonActive(sidebars[i]);
    }
    active(input);
};

function MyLocalStorage(key) {
    this.save = function (data) {
        localStorage.setItem(key, JSON.stringify(data));
        return this;
    };

    this.clear = function () {
        localStorage.setItem(key, undefined);
        return this;
    };

    this.isPresent = function () {
        var ob = localStorage.getItem(key);
        return ob != '' && ob != "null" && ob != "undefined" & ob != null;
    };

    this.get = function () {
        return JSON.parse(localStorage.getItem(key));
    }
};