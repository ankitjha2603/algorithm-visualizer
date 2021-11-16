'use strict';
function hideMenu() {
    select(".custom-right-click-menu").style.display = "none"
}
function rightClick(e) {
    e.preventDefault();
    let menu = select(".custom-right-click-menu");
    menu.style.display = 'block';
    let menuWidth = getComputedStyle(select(".custom-right-click-menu")).width;
    menuWidth = menuWidth.slice(0, menuWidth.length - 2) * 1
    let menuHeight = getComputedStyle(select(".custom-right-click-menu")).height;
    menuHeight = menuHeight.slice(0, menuHeight.length - 2) * 1
    if (window.innerWidth < menuWidth + 100 || window.innerHeight < menuHeight + 100) {
        return false
    }
    else {

        if (e.pageX + menuWidth > window.innerWidth) { menu.style.left = e.pageX - menuWidth + "px"; }
        else { menu.style.left = e.pageX + "px"; }
        if (e.pageY + menuHeight > window.innerHeight) { menu.style.top = e.pageY - menuHeight + "px"; }
        else {menu.style.top = e.pageY + "px"; }
    }
}

document.oncontextmenu = rightClick;
document.onclick = hideMenu;


window.addEventListener("keydown", (e) => {
    if (select("#type-of-algorithm").value === "2" && select(".algorithm-name").value === "0") {
        let key = e.key
        if ([`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`].includes(key) && InputkeyUnable) {
            InputkeyUnable = false
            key = key * 1
            if(key===0){
                sudokuSelect(...sudokuFocus).innerText = ""
            }
            else if (sudokuFocus) {
                let pre = sudokuSelect(...sudokuFocus).innerText
                sudokuSelect(...sudokuFocus).innerText = key
                if(sudokuCheck(sudokuTakeData(),...sudokuFocus, key, 150, 500, true)){
                    InputkeyUnable = true
                    sudokuSelect(...sudokuFocus).style.textDecoration = "underline";
                    sudokuSelect(...sudokuFocus).style.fontStyle = "italic";
                }
                else{
                    sudokuInputError.play()
                }
            }
        }
        else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key) && sudokuFocus) {
            sudokuSelect(...sudokuFocus).style.backgroundColor = ""
            if(key === "ArrowUp"){
                sudokuFocus = [(sudokuFocus[0]-1)%9,sudokuFocus[1]]
                if(sudokuFocus[0]===-1){sudokuFocus[0]=8}   
            }
            else if(key === "ArrowDown"){
                sudokuFocus = [(sudokuFocus[0]+1)%9,sudokuFocus[1]]   
            }
            else if(key === "ArrowLeft"){
                sudokuFocus = [sudokuFocus[0],(sudokuFocus[1]-1)%9]
                if(sudokuFocus[1]===-1){sudokuFocus[1]=8}   
            }
            else if(key === "ArrowRight"){
                sudokuFocus = [sudokuFocus[0],(sudokuFocus[1]+1)%9]   
            }
            sudokuSelect(...sudokuFocus).click()

        }
        else if(key === "Backspace"){
            sudokuSelect(...sudokuFocus).innerText = ""
            sudokuSelect(sudokuFocus).style.textDecoration = "none";
            sudokuSelect(...sudokuFocus).style.fontStyle = "";
        }
    }
})
