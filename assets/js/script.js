'use strict';
// making a request to queen image.png
append(select("html"), newElement("queenPosition"));
select(".queenPosition").addEventListener("load", () => { select(".queenPosition").remove() })

sorting()
console.log("Started part");
select("#type-of-algorithm").addEventListener('input', function () {
    if (select(".algorithm-name")) { select(".algorithm-name").remove() }
    if (this.value === "0") { sorting() }
    else if (this.value == "1") { binarySearch() }
    else if (this.value == "2") { backtraking() }
})
select("#start").addEventListener("click", () => {
    length = array.length;
    impButton()
    if (select("#type-of-algorithm").value === "0") {
        if (select(".algorithm-name").value === "0") { bubbleSort(1001 / select("#speed-range").value) }
        else if (select(".algorithm-name").value === "1") { insertionSort(1001 / select("#speed-range").value) }
        else if (select(".algorithm-name").value === "2") { selectionSort(1001 / select("#speed-range").value) }
        else if (select(".algorithm-name").value === "3") {
            iP = 0;
            let sortedArray = sampleSort()
            quickSort((1001 / select("#speed-range").value) / 20 + 10, sortedArray)
        } else {
            iP = 0;
            let sortedArray = sampleSort()
            //mergeSort((1001 - select("#speed-range").value)/15 + 3,sortedArray)
            mergeSort((1001 - select("#speed-range").value) / 5 + 15, sortedArray)
        }
    } else if (select("#type-of-algorithm").value === "1") {
        do {
            let ele = prompt("Enter the number between [11-999] to search in array")
            if (ele > 10 && ele < 1000) {
                if (select(".algorithm-name").value === "0") { binarySearchSortedArray(1000 / (select("#speed-range").value * 1), ele * 1) }
                else if (select(".algorithm-name").value === "1") { binarySearchInfiniteSortedArrayConstant(1000 / (select("#speed-range").value * 1), ele * 1) }
                else if (select(".algorithm-name").value === "2") { binarySearchInfiniteSortedArrayExponential(1000 / (select("#speed-range").value * 1), ele * 1) }
                else {
                    binarySearchSortedRotatedArray(1000 / (select("#speed-range").value * 1), ele * 1)
                }
                break
            }
            else if (ele === null) {
                impButton(false)
                return 0
            }
        } while (true)
    } else {
        recursiveDelayConstant = 1
        if (select(".algorithm-name").value === "0") {
            if (isSudokuSolvable()) { sudokuSolver(1 + (1001 / select("#speed-range").value) / 5) }
            else { alert("Unsolvable") }
        }
        else {
            queenPosition = [];
            isnQueenRunning = true;
            nQueenCreate(select("#length").value * 1);
            nqueenSolve((1001 / select("#speed-range").value) / 3, select("#length").value * 1)
        }
    }
})
select("#length").addEventListener("input", () => {
    if (select("#type-of-algorithm").value === "0") {
        generateModel(select("#length").value * 1)
        sampleSort(true)
    }
    else if (select("#type-of-algorithm").value === "1") {
        if (select(".algorithm-name").value === "3") { generateModel(select("#length").value * 1, 2) }
        else { generateModel(select("#length").value * 1, 1) }
    }
    else if (select("#type-of-algorithm").value === "2") {
        if (select(".algorithm-name").value === "1") { nQueenCreate(select("#length").value * 1) }
    }
})
