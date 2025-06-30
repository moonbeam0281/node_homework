const myArr = [12, 32, 123, 5, 7645, 235, 234, 1, 43, 63, 2, 123];

printArr(myArr, "Initial array:");

//filterd

const filtered = myArr.filter(x => x % 2 === 0)

printArr(filtered, "Filtered array: every even number");

//sorted

const sorted = myArr.sort((a, b) => a - b);

printArr(sorted, "Sorted array:");

//sum

const sumarr = myArr.reduce((a, c) => a + c, 0);

printArr(sumarr, "Summed array:");

//find

const thatEle = myArr.find(x => x === 123);

printArr(thatEle, "Specific elemnet");

//First class function below

const myFunk = () => console.log("Sup");

//Calling said function
myFunk();

//Print function
function printArr(x, msg) {
    console.log(msg);
    if (Array.isArray(x)) {
        x.forEach(e => {
            console.log(e)
        });
    }
    else console.log(x);

}