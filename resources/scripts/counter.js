var counters = [document.getElementsByClassName('years')[0], document.getElementsByClassName('languages')[0], document.getElementsByClassName('lines')[0] ];

console.log(counters);

function increment(counter) {
    const finalValue = parseInt(counter.textContent.trim());
    let initialDate = new Date(Date.now());
    console.log(Date.now().getSeconds);
    while(Date.now().getSeconds < initialDate) {
        console.log("Initial Time", initialDate);
        console.log("Current Time", Date.now());
        if(parseInt(counter.textContent.trim()) < finalValue) {
            counter.textContent = parseInt(counter.textContent.trim()) + 1;
            console.log("Hi!~", counter.textContent);
            initialDate = Date.now();
        } else {
            break;
        }
        initialDate.setSeconds(2);
    }

}

increment(counters[0]);