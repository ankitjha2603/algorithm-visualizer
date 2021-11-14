'use strict';
let currentArray, array, maxArray, length, iP = 0, quickSortArrayCopy;
function impButton(disable = true) {
    select("#start").disabled = disable;
    select(".speed").disabled = disable;
    select("#length").disabled = disable;
    select("#type-of-algorithm").disabled = disable;
    select(".algorithm-name").disabled = disable;

}
function sorting() {
    setup("Length of list", [10, 200], [1, 1000], false, "Sort the array", 50)
    generateModel(select("#length").value * 1)
    sampleSort(true)
    select("#length").disabled = false
    if (select(".algorithm-name")) { select(".algorithm-name").remove() }
    let optionMenu = newElement("algorithm-name", "", "select")
    let optionArray = ["Bubble sort", "Insertion sort", "Selection sort", "Quick sort", "Merge sort"];
    optionArray.forEach((element, index) => {
        let option = newElement("", element, "option")
        option.setAttribute("value", `${index}`)
        append(optionMenu, option)
    })
    append(select(".about"), optionMenu)
    select(".refresh").addEventListener("click", () => {
        if (!select(".speed").disabled) { generateModel(select("#length").value * 1, false, array) }
    })
}
function bubbleSort(timeInterval = 50) {
    let timesSwap = 0
    let c = 0
    let x = 0;
    let interval = setInterval(() => {
        sampleSort(true)
        if (x === length - 1 - timesSwap) {
            backgroundColor("", x, x - 1)
            sampleSort(true)
            timesSwap += 1
            if (c === 0 || timesSwap === length - 1) {
                impButton(false)

                clearInterval(interval)
                return array
            }
            c = 0
            x = 0
        }
        if (x > 0) { backgroundColor("", x, x - 1) }
        backgroundColor("yellow", x, x + 1)
        if (array[x] > array[x + 1]) {
            c = 1
            swapitem(x, x + 1)
            backgroundColor("red", x, x + 1)

        }
        x++
    }, timeInterval)
}
function insertionSort(timeInterval = 50) {
    let times = 1, temp = array[times], ch = 1, x = 0, breakLoop = false;
    let interval = setInterval(() => {
        if (x != times) {
            backgroundColor("", x + 1, x + 2)
        }
        sampleSort(true)
        if (x < 0 || breakLoop) {
            breakLoop = false
            backgroundColor("", 0, 1)
            x = times
            times++
            temp = array[times]
            if (times === length) {
                sampleSort(true)
                clearInterval(interval)
                impButton(false)
                return "end"
            }
        }
        backgroundColor("yellow", x, x + 1)
        if (array[x] > temp) {
            swapitem(x, x + 1)
            backgroundColor("red", x, x + 1)
        }
        else {
            breakLoop = true
        }
        x--
    }, timeInterval);
}
function selectionSort(timeInterval = 50) {

    let times = 0, minTillNow = times, x = times + 1, pause = false;
    length = array.length;
    block(times).style.backgroundColor = "yellow"
    let interval = setInterval(() => {
        sampleSort(true)
        if (pause) { pause = false; return 0 }
        if (x != times + 1) { backgroundColor("", x - 1) }
        if (x === length) {
            swapitem(minTillNow, times)
            backgroundColor("", times, minTillNow)
            times++
            backgroundColor("yellow", times)
            x = times + 1;
            minTillNow = times
            if (times === length - 1) {
                backgroundColor("", times)
                sampleSort(true)
                clearInterval(interval)
                impButton(false)
                return array
            }
        }
        backgroundColor("yellow", x)
        if (array[x] < array[minTillNow]) {
            minTillNow = x
        }
        x++
        if (x === length) {
            backgroundColor("red", times, minTillNow)
            pause = true
        }
    }, timeInterval);
}
function quickSort(timeInterval = 50, sortedArray, le = 0, ri = array.length - 1) {
    function partition(le = 0, ri = None) {
        let i = le, j = ri, pivotIndex = le, pivot = array[pivotIndex]
        while (i < j && i < ri && j > le) {
            while (i < ri && array[i] <= pivot) { i += 1; iP += 1 }
            while (j > le && array[j] >= pivot) { j -= 1; iP += 1 }
            if (i < j) {
                swapitem(i, j, "list")
                setTimeout((i, j, isI, isJ) => {
                    backgroundColor("red", i, j)
                    setTimeout((i, j, isI, isJ) => {
                        backgroundColor("", i, j)
                        if (isI) { backgroundColor("lightgreen", i) }
                        else{backgroundColor("", i)}
                        if (isJ) { backgroundColor("lightgreen", j) }
                        else{backgroundColor("", j)}
                    }, timeInterval, i, j, isI, isJ);
                    swapitem(i, j, "height")
                }, timeInterval * iP, i, j, array[i] === sortedArray[i], array[j] === sortedArray[j]);
                iP++
            }
        }
        swapitem(j, pivotIndex, "list")
        setTimeout((j, pivotIndex, isP, isJ) => {
            setTimeout((i, j, isP, isJ) => {
                backgroundColor("", j, pivotIndex)
                if (isP) { backgroundColor("lightgreen", pivotIndex) }
                if (isJ) { backgroundColor("lightgreen", j) }
            }, timeInterval, i, j, isP, isJ);
            swapitem(j, pivotIndex, "height")
        }, timeInterval * iP, j, pivotIndex, (array[pivotIndex] === sortedArray[pivotIndex]), array[j] === sortedArray[j]);
        iP++
        return j
    }
    if (le < ri) {
        let p = partition(le, ri)
        quickSort(timeInterval, sortedArray, le, p - 1)
        quickSort(timeInterval, sortedArray, p + 1, ri)
        if (le == 0 && ri === array.length - 1) {
            setTimeout(() => {
                impButton(false)
            }, timeInterval * iP)
        }
    }
}
function mergeSort(timeInterval = 50, sortedArray,le = 0, ri = array.length - 1) {
    function merge(timeInterval,sortedArray,le, mi, ri) {
        let pointer = le, j = mi + 1
        do {
            let point
            if (array[pointer] < array[j]) {
                point = pointer
            }
            else {
                point = j
                j++
            }
            arraySlider(timeInterval,sortedArray,pointer, point)
            pointer++
        } while (pointer <= mi && j <= ri)
        do {
            if (j != ri + 1 && array[pointer] > array[j]) {
                arraySlider(timeInterval,sortedArray,pointer, j);
                j++
            }
            pointer++
        } while ((pointer<mi && j===ri+1) || (pointer<=ri && j!=ri+1))
        if(le===0 && ri===array.length-1){
            setTimeout(()=>{impButton(false)},timeInterval*iP)
            iP++
        }
        return array
    }
    if (le < ri) {
        let mi = Math.floor((le + ri) / 2)
        mergeSort(timeInterval,sortedArray,le, mi)
        mergeSort(timeInterval,sortedArray,mi + 1, ri)
        return merge(timeInterval,sortedArray,le, mi, ri)
    }
    return array
}
