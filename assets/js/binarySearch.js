'use strict';
let mid = 0;
function binarySearch() {
    setup("Length of list",[100,300],[1,3],true,"Binary search in a array",150)

    generateModel(select("#length").value * 1, 1)
    let optionMenu = newElement("algorithm-name", "", "select")
    let optionArray = ["Binary search on Sorted array", "Binary search in infinite sorted array (constant speed)", "Binary search in infinite sorted array (exponential speed)", "Binary search on rotated sorted Array"];
    optionArray.forEach((element, index) => {
        let option = newElement("", element, "option")
        option.setAttribute("value", `${index}`)
        append(optionMenu, option)
    })
    append(select(".about"), optionMenu)
    select(".algorithm-name").addEventListener("input", () => {
        if (select(".algorithm-name").value === "3") {
            generateModel(select("#length").value * 1, 2)
        }
        else{
            generateModel(select("#length").value * 1, 1)
        }
    })
}
function binarySearchSortedArray(timeInterval, ele, low = 0, high = array.length - 1) {
    if (mid >= 0 && mid <= array.length) { backgroundColor("", mid) }
    mid = 0
    let preMid;
    let interval = setInterval(() => {
        if (mid) { backgroundColor("", mid) }
        preMid = mid
        mid = Math.floor((low + high) / 2);
        if (low > high || low < 0) {
            backgroundColor("", preMid)
            alert(`The queried number is not in the array`)
            impButton(false)
            clearInterval(interval)
            return 0
        }
        backgroundColor("yellow", mid)
        if (array[mid] === ele) {
            backgroundColor("green", mid)
            impButton(false)
            clearInterval(interval)
            alert(`This queried is at index ${mid} in the given sorted array`)
            return mid
        }
        else if (array[mid] > ele) {
            high = mid - 1
        }
        else {
            low = mid + 1
        }
    }, timeInterval);
    return -1
}

function binarySearchInfiniteSortedArrayConstant(timeInterval, ele, constant = 10) {
    if (mid >= 0 && mid <= array.length) { backgroundColor("", mid) }
    mid = 0
    let low = 0, high = 1, pEle;
    let interval = setInterval(() => {
        if (pEle && pEle >= 0 && pEle < array.length) { backgroundColor("", pEle) }
        if (!array[high] && array[high] != 0) {
            high = Math.floor((high + low) / 2)
            pEle = high
            if (high != low) {
                return 0
            }
        }
        if (!array[low] && array[low] != 0) {
            alert(`The queried number is not in the array`)
            clearInterval(interval)
            return 0
        }
        backgroundColor('yellow', high)
        if (low === high) {
            if (array[high] === ele) {
                alert(`This queried is at index ${high} in the given sorted array`)
            } else {
                alert(`The queried number is not in the array`)
            }
            clearInterval(interval)
            return 0
        }
        else if (array[high] == ele) {
            alert(`This queried is at index ${high} in the given sorted array1`)
            clearInterval(interval)
            return high
        }
        else if (array[high] > ele) {
            clearInterval(interval)
            backgroundColor('', high)
            binarySearchSortedArray(timeInterval, ele, low, high)
            return 0
        }
        else {
            pEle = high;
            low = high + 1;
            high = high + constant;
        }
    }, timeInterval);

    return
}

function binarySearchInfiniteSortedArrayExponential(timeInterval, ele, constant = 2) {
    if (mid >= 0 && mid <= array.length) { backgroundColor("", mid) }
    mid = 0
    let low = 0, high = 1, pEle;
    let interval = setInterval(() => {
        if (pEle && pEle >= 0 && pEle < array.length) { backgroundColor("", pEle) }
        if (!array[high] && array[high] != 0) {
            high = Math.floor(Math.pow(high * low, 0.5))
            pEle = high
            if (high != low) {
                return 0
            }
        }
        if (!array[low] && array[low] != 0) {
            alert(`The queried number is not in the array`)
            clearInterval(interval)
            return 0
        }
        backgroundColor('yellow', high)
        console.log(low, high)
        if (array[high] == ele) {
            alert(`This queried is at index ${high} in the given sorted array`)
            clearInterval(interval)
            return high
        }
        else if (array[high] > ele) {
            clearInterval(interval)
            backgroundColor('', high)
            binarySearchSortedArray(timeInterval, ele, low, high)
            return 0
        }
        else {
            pEle = high;
            low = high + 1;
            high = high * constant;
        }
    }, timeInterval);

    return
}

function binarySearchSortedRotatedArray(timeInterval, ele) {
    if (mid >= 0 && mid <= array.length) { backgroundColor("", mid) }
    mid = 0;
    let low = 0, high = array.length - 1, midEle;
    let interval = setInterval(() => {
        if (low > high) {
            backgroundColor("",mid)
            alert(`The queried number is not in the array`)
            impButton(false)
            clearInterval(interval)
        }
        backgroundColor("",mid)
        mid = Math.floor((low + high) / 2)
        backgroundColor("yellow",mid)
        midEle = array[mid]
        if (midEle === ele) {
            clearInterval(interval)
            backgroundColor("green",mid)
            impButton(false)
            alert(`This queried is at index ${mid} in the given sorted array`)
            return mid
        }
        else if (midEle < array[low]) {
            if (array[mid + 1] <= ele && array[low] >= ele) {
                low = mid+1
            }
            else {
                high = mid-1
            }
        }
        else {
            if (array[mid - 1] >= ele && array[low] <= ele) {
                high = mid-1
            }
            else {
                low = mid+1
            }
        }
    }, timeInterval);
}