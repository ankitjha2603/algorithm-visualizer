'use strict';
let recursiveDelayConstant, board, sudokuFocus = null, pre = "", InputkeyUnable = true, firstSudokuBlank = null;
const sudokuInputError = new Audio(`${window.location.href}assets/music/move.mp3`)
function backtraking() {
    select("#speed-range").setAttribute("max", "1000")
    select("#start").innerText = "Start"
    let optionMenu = newElement("algorithm-name", "", "select")
    let optionArray = ["Sudoku solver", "nQueen problem Solver"];
    optionArray.forEach((element, index) => {
        let option = newElement("", element, "option")
        option.setAttribute("value", `${index}`)
        append(optionMenu, option)
    })
    sudokuEnv()
    append(select(".about"), optionMenu)
    select(".algorithm-name").addEventListener("input", () => {
        if (select(".algorithm-name").value === "0") { sudokuEnv() }
        else if (select(".algorithm-name").value === "1") { nQueenEnv() }
    })
}
/*----------------------------------------------------------------------------*/
/*                             Sudoku solver                                  */
/*----------------------------------------------------------------------------*/

function sudokuEnv() {
    setup("", false, [1, 1000], true, "Solve Sudokus")
    if (select(".gSudoku")) { select(".gSudoku").remove() }
    let gS = newElement("gSudoku", "Generate Random Sudoku")
    gS.style.borderRadius = "5"
    gS.style.border = "none"
    append(select("#option"), gS)
    gS.addEventListener("click", () => {
        showRandomSudoku()
    })

    select(".main-body").remove();
    let i = 0
    let table = newElement("main-table", "", "table")
    for (let r = 0; r < 9; r++) {
        let tr = newElement("row", "", "tr")
        tr.id = `row-${r}`
        for (let c = 0; c < 9; c++) {
            let td = newElement("sudoku-block", "", "td")
            td.id = `sudoku-block-${r}${c}`;
            if (c % 3 == 0) { td.style.borderLeft = "3px solid black"; }
            else if (c % 3 == 2) { td.style.borderRight = "3px solid black"; }
            else {
                td.style.borderLeft = "1px dashed black";
                td.style.borderRight = "1px dashed black";
            }
            if (r % 3 == 0) { td.style.borderTop = "3px solid black"; }
            else if (r % 3 == 2) { td.style.borderBottom = "3px solid black"; }
            else {
                td.style.borderTop = "1px dashed black";
                td.style.borderBottom = "1px dashed black";
            }
            append(tr, td)
        }
        append(table, tr)
    }
    let mainElement = newElement("main-body")
    append(mainElement, table)
    append(select("body"), mainElement)
    mainElement.addEventListener("click", (e) => {
        if (select(".algorithm-name").value === "0") {
            if (e.target === e.currentTarget) {
                sudokuBlurEffect()
            }
        }
    })
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let block = sudokuSelect(r, c);
            block.addEventListener("click", () => {
                sudokuBlurEffect()
                sudokuFocus = [r, c];
                block.style.backgroundColor = "#e6e6e6"
            })
        }
    }
}

function sudokuSelect(r, c) {
    return select(`#sudoku-block-${r}${c}`)
}
function sudokuBlurEffect() {
    if (sudokuFocus) {
        sudokuSelect(...sudokuFocus).style.backgroundColor = ""
        sudokuFocus = null
    }
}
function showRandomSudoku() {
    let choice = []
    for (let i = 0; i < 81; i++) { choice.push(i) }
    let generatedSudokuSample = []
    for (let r = 0; r < 9; r++) {
        let dgeneratedSudokuSample = []
        for (let c = 0; c < 9; c++) {
            sudokuSelect(r, c).innerText = "";
            sudokuSelect(r, c).style.textDecoration = "none";
            sudokuSelect(r, c).style.fontStyle = "";
            dgeneratedSudokuSample.push(0)
        }
        generatedSudokuSample.push(dgeneratedSudokuSample)
    }
    generatedSudokuSample = generateSolvable(generatedSudokuSample)
    for (let i = 0; i < Math.floor(Math.random() * 40 + 30); i++) {
        let selectBlockInfor = choice[Math.floor(Math.random() * choice.length)]
        let r = Math.floor(selectBlockInfor / 9)
        let c = Math.floor(selectBlockInfor % 9)
        sudokuSelect(r, c).innerText = generatedSudokuSample[r][c]
        sudokuSelect(r, c).style.textDecoration = "underline ";
        sudokuSelect(r, c).style.fontStyle = "italic";
    }
}
function sudokuTakeData() {
    let sample = [];
    for (let r = 0; r < 9; r++) {
        let dSample = [];
        for (let c = 0; c < 9; c++) {
            let sRC = sudokuSelect(r, c)
            let vRC = sRC.innerText
            if (!vRC) { vRC = 0 }
            dSample.push(vRC * 1)
        }
        sample.push(dSample)
    }
    return sample
}
function showError(r1, c1, r2, c2, givenDelay, delay, del = false) {
    let ele1 = sudokuSelect(r1, c1);
    let ele2 = sudokuSelect(r2, c2);
    setTimeout(() => {
        ele1.style.color = 'red';//borderColor
        ele1.style.fontWeight = "bold"
        ele1.style.borderColor = "red";
        ele2.style.color = 'red';
        ele2.style.fontWeight = "bold"
        ele2.style.borderColor = "red";
        setTimeout(() => {
            ele1.style.color = ''
            ele2.style.color = ''
            ele1.style.borderColor = '';
            ele1.style.fontWeight = '';
            ele2.style.fontWeight = '';
            ele2.style.borderColor = '';
            if (del) {
                ele1.innerText = pre
                InputkeyUnable = true
            }
        }, delay)
    }, givenDelay - (delay / 2))
}
function sudokuCheck(board, r, c, n, givenDelay, delay, del = false) {
    for (let x = 0; x < 9; x++) {
        if (n === board[r][x] && x != c) {
            if (delay != 0) { showError(r, c, r, x, givenDelay, delay, del) }
            return false
        }
        if (n === board[x][c] && x != r) {
            if (delay != 0) { showError(r, c, x, c, givenDelay, delay, del) }
            return false
        }
    }
    let bR = Math.floor(r / 3);
    let bC = Math.floor(c / 3);
    for (let R = 0; R < 3; R++) {
        for (let C = 0; C < 3; C++) {
            if (n == board[R + 3 * bR][C + 3 * bC] && (R + 3 * bR != r || C + 3 * bC != c)) {
                if (delay != 0) { showError(r, c, R + 3 * bR, C + 3 * bC, givenDelay, delay, del) }
                return false;
            }
        }
    }
    return true;
}
function sudokuSolver(delay, r = 0, c = 0) {
    if (r === 0 && c === 0) { board = sudokuTakeData() }
    if (r === 9) {
        setTimeout(() => { impButton(false) }, delay * recursiveDelayConstant)
        firstSudokuBlank == null
        return board
    }
    for (let n = 1; n <= 9; n++) {
        if (board[r][c]) {
            return sudokuSolver(delay, r + (c == 8), (c + 1) % 9);
        }
        if (firstSudokuBlank === null) { firstSudokuBlank = [r, c] }
        board[r][c] = n;
        setTimeout(function () { sudokuSelect(r, c).innerText = n; }, delay * recursiveDelayConstant, r, c)
        recursiveDelayConstant++
        if (sudokuCheck(board, r, c, n, delay * recursiveDelayConstant, delay)) {
            let re = sudokuSolver(delay, r + (c == 8), (c + 1) % 9)
            if (re) {
                return re
            }
            board[r][c] = 0;
            setTimeout(() => { sudokuSelect(r, c).innerText = ""; }, delay * recursiveDelayConstant, r, c)
            recursiveDelayConstant++
        }
        else {
            board[r][c] = 0;
            setTimeout(() => { sudokuSelect(r, c).innerText = ""; }, delay * recursiveDelayConstant, r, c)
            recursiveDelayConstant++
        }
    }
}

function isSudokuSolvable(r = 0, c = 0) {
    if (r === 0 && c === 0) { board = sudokuTakeData() }
    if (r === 9) {
        firstSudokuBlank == null
        return board
    }
    for (let n = 1; n <= 9; n++) {
        if (board[r][c]) {
            return isSudokuSolvable(r + (c == 8), (c + 1) % 9);
        }
        if (firstSudokuBlank === null) { firstSudokuBlank = [r, c] }
        board[r][c] = n;
        if (sudokuCheck(board, r, c, n, 0, 0)) {
            let re = isSudokuSolvable(r + (c == 8), (c + 1) % 9)
            if (re) {
                return re
            }
            board[r][c] = 0;
        }
        else {
            board[r][c] = 0;
        }
    }
    if (r === firstSudokuBlank[0] && c == firstSudokuBlank[1]) {
        firstSudokuBlank = null
        return false
    }
}
function generateSolvable(board, r = 0, c = 0) {
    if (r === 9) {
        firstSudokuBlank = null
        return board
    }
    let l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let nI = 1; nI <= 9; nI++) {
        let n = l[Math.floor(Math.random() * l.length)]
        let sampleBoard = []; l.forEach((element) => { if (element != n) { sampleBoard.push(element) } }); l = [...sampleBoard]
        if (board[r][c]) {
            return generateSolvable(board, r + (c == 8), (c + 1) % 9);
        }
        if (firstSudokuBlank === null) { firstSudokuBlank = [r, c] }
        board[r][c] = n;
        if (sudokuCheck(board, r, c, n, 0, 0)) {
            let mayBoard = generateSolvable(board, r + (c == 8), (c + 1) % 9)
            if (mayBoard) {
                return board
            }
            board[r][c] = 0;
        }
        else {
            board[r][c] = 0;
        }
    }
    if (r === firstSudokuBlank[0] && c === firstSudokuBlank[1]) {
        firstSudokuBlank = null
        return false
    }
}

/*----------------------------------------------------------------------------*/
/*                                 n Queen                                    */
/*----------------------------------------------------------------------------*/
let queenPosition = [],isnQueenRunning=false;
function nQueenEnv() {
    setup("Number of queen", [4, 15], [1, 1000], true, "Solve nQueen",4)
    nQueenCreate(select("#length").value * 1)
}
function nQueenCreate(n) {
    queenPosition = []
    select(".main-body").remove();
    let table = newElement("nQueenBoxTable", "", "table")
    for (let r = 0; r < n; r++) {
        let tr = newElement("nQueenBoxRow", "", "tr")
        tr.id = `nQueenBoxRow-${r}`
        for (let c = 0; c < n; c++) {
            let td = newElement("nQueenBlock", "", "td")
            td.id = `nQueenBlock-R${r}C${c}`
            td.setAttribute("row", r)
            td.setAttribute("column", c)
            append(tr, td)
        }
        append(table, tr)
    }
    let mainBody = newElement("main-body")
    append(mainBody, table)
    append(select("body"), mainBody)
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            nQueenSelect(r, c).addEventListener("mouseover", nQueenMouseOver)
            nQueenSelect(r, c).addEventListener("mouseleave", nQueenMouseLeave)
        }
    }
}
function nQueenCheck(xR, yC) {
    let error = 0;
    queenPosition.forEach((element) => {
        if ((Math.abs(element[0] - xR) === Math.abs(element[1] - yC)) || (element[0] === xR || element[1] === yC)) {
            if (element[0] - xR != 0) {
                error++
            }
        }
    })
    return error === 0
}
function nQueenSelect(r, c) {
    return select(`#nQueenBlock-R${r}C${c}`)
}
function nqueenSolve(delay, n, r = 0) {
    if (r === n) {
        setTimeout(() => {isnQueenRunning = false;impButton(false);},delay * recursiveDelayConstant)
        return true }
    for (let cI = 0; cI < n; cI++) {
        setTimeout(() => {nQueenSelect(r, cI).classList.add("queenPosition")}, delay * recursiveDelayConstant, r, cI)
        recursiveDelayConstant++
        queenPosition.push([r, cI])
        if (nQueenCheck(r, cI)) {
            if (nqueenSolve(delay, n, r + 1)) {
                return true
            } else {
                setTimeout(() => {nQueenSelect(r, cI).classList.remove("queenPosition")}, delay * recursiveDelayConstant, r, cI)
                recursiveDelayConstant++
                queenPosition.pop()
            }
        } else {
            setTimeout(() => {nQueenSelect(r, cI).classList.remove("queenPosition")}, delay * recursiveDelayConstant, r, cI)
            recursiveDelayConstant++
            queenPosition.pop()
        }
    }
    return false
}
function nQueenMouseOver(e) {
    if(isnQueenRunning){
        return "No hover effect when nQueenSolver is running"
    }
    let block = e.target;
    let r = block.getAttribute("row")*1
    let c = block.getAttribute("column")*1
    let isIn = false
    for (let index = 0; index < queenPosition.length; index++) {
        if (queenPosition[index][0] == r && queenPosition[index][1] == c) {
            isIn = true
            break
        }
    }
    if (isIn === false) {
        for (let i = 0; i < select("#length").value * 1; i++) {
            if (i != c) {
                nQueenSelect(r, i).style.backgroundColor = "rgb(235, 235, 235)"
            }
            if (i != r) {
                nQueenSelect(i, c).style.backgroundColor = "rgb(235, 235, 235)"
            }
        }
    }
    else{
        let color = "rgb(242, 100, 100)" 
        for(let d=1;d < select("#length").value * 1;d++){
            if(nQueenSelect(r+d,c+d)){nQueenSelect(r+d,c+d).style.backgroundColor =color}
            if(nQueenSelect(r+d,c-d)){nQueenSelect(r+d,c-d).style.backgroundColor =color}
            if(nQueenSelect(r-d,c+d)){nQueenSelect(r-d,c+d).style.backgroundColor =color}
            if(nQueenSelect(r-d,c-d)){nQueenSelect(r-d,c-d).style.backgroundColor =color}

            if(nQueenSelect(r+d,c)){nQueenSelect(r+d,c).style.backgroundColor =color}
            if(nQueenSelect(r-d,c)){nQueenSelect(r-d,c).style.backgroundColor =color}
            if(nQueenSelect(r,c+d)){nQueenSelect(r,c+d).style.backgroundColor =color}
            if(nQueenSelect(r,c-d)){nQueenSelect(r,c-d).style.backgroundColor =color}
        }
    }

}
function nQueenMouseLeave(e) {
    if(isnQueenRunning){
        return "No hover effect when nQueenSolver is running"
    }
    let block = e.target;
    let r = block.getAttribute("row")*1
    let c = block.getAttribute("column")*1
    let isIn = false
    for (let index = 0; index < queenPosition.length; index++) {
        if (queenPosition[index][0] == r && queenPosition[index][1] == c) {
            isIn = true
            break
        }
    }
    if (isIn === false) {
        for (let i = 0; i < select("#length").value * 1; i++) {
            if (i != r) {
                nQueenSelect(i, c).style.backgroundColor = ""
            }
            if (i != c) {
                nQueenSelect(r, i).style.backgroundColor = ""
            }
        }
    }
    else{
        for(let d=1;d < select("#length").value * 1;d++){
            if(nQueenSelect(r+d,c+d)){nQueenSelect(r+d,c+d).style.backgroundColor =""}
            if(nQueenSelect(r+d,c-d)){nQueenSelect(r+d,c-d).style.backgroundColor =""}
            if(nQueenSelect(r-d,c+d)){nQueenSelect(r-d,c+d).style.backgroundColor =""}
            if(nQueenSelect(r-d,c-d)){nQueenSelect(r-d,c-d).style.backgroundColor =""}

            if(nQueenSelect(r+d,c)){nQueenSelect(r+d,c).style.backgroundColor =""}
            if(nQueenSelect(r-d,c)){nQueenSelect(r-d,c).style.backgroundColor =""}
            if(nQueenSelect(r,c+d)){nQueenSelect(r,c+d).style.backgroundColor =""}
            if(nQueenSelect(r,c-d)){nQueenSelect(r,c-d).style.backgroundColor =""}
        }
    }

}
//function nQueenHoverEffect()
// show queen
// 
