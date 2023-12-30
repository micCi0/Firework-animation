// function for update time

function updateTime(){
    const endOfYear = new Date(new Date().getFullYear() + 1 , 0 , 1 , 0 , 0 , 0);

    // difference
    const timeDifference = endOfYear - new Date();

    // calc each parts

    const days = Math.floor(timeDifference / (1000 * 60 * 60 *24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / ( 1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.querySelector(".days").innerHTML = padZero(days) // function for check if number will has 0 + number or just number
    document.querySelector(".hours").innerHTML = ":" +  padZero(hours);
    document.querySelector(".minutes").innerHTML =  ":" + padZero(minutes);
    document.querySelector(".seconds").innerHTML =  ":" + padZero(seconds);
}
function padZero(n){
    return (n < 10) ? "0" + n : n;
}
setInterval(updateTime , 1000)