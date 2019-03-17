// slider head

const header = document.getElementsByClassName('m-header')[0];

const containImg = "img";
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
    header.className += " fadeOut";
    setTimeout(function() {
        header.className = "m-header";
    }, 1000)
    setBackgroundImg(randomImgUrl());
    setTimeout(changeBackgroundImg, 3000);
}