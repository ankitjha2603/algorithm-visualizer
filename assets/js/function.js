'use strict';

function select(selection, singleElement = true) {
    if (singleElement) {
        return document.querySelector(selection)
    } else {
        return document.querySelectorAll(selection)
    }
}
function append(mainElement, ...subElements) {
    subElements.forEach(subElement => {
        mainElement.append(subElement);
    })
}
function newElement(cls, content = "", tag = "div") {
    let element = document.createElement(tag);
    if (cls) {
        if (typeof cls === "object") {
            cls.forEach(clsElement => {
                element.classList.add(clsElement);
            });
        } else {
            element.classList.add(cls);
        }
    }
    if (content) {
        element.innerText = content;
    }
    return element;
}
function sampleSort(isShort = false, usual = false) {
    let copy = [...array]
    function compareDecimal(a, b) {
        if (a === b) { return 0 }
        return a < b ? -1 : 1
    }
    if (isShort) {
        if (usual) {
            copy = usual
        }
        copy.sort(compareDecimal)
        copy.forEach((element, index) => {
            if (copy[index] === array[index]) {
                backgroundColor("lightgreen", index)
            }
        });
    } else {
        copy.sort(compareDecimal)
        return copy
    }
}
function generateModel(n = 100, sortedRotated = false, randArray = false) {
    select(".main-body").remove()
    append(select("body"), newElement("main-body"))
    if (randArray) {
        array = [...currentArray]
    } else {
        select(":root").style.setProperty("--block-margin", `${15 / n}%`)
        array = [];
        for (let i = 0; i < n; i++) {
            array.push(Math.floor(Math.random() * 950) + 50)
        }
        maxArray = Math.max(...array);
        if (sortedRotated) {
            array = sampleSort()
            if (sortedRotated === 2) {
                let rotatedUnit = Math.floor(Math.random() * n);
                array = [...array.slice(rotatedUnit), ...array.slice(0, rotatedUnit)]
            }
        } else {
            currentArray = [...array]

        }
    }

    array.forEach((element, index) => {
        let newblock = newElement("block")
        newblock.style.width = `${70 / n}%`
        newblock.id = `block-${index}`;

        newblock.style.height = `${array[index] * 90 / maxArray}%`
        append(select(".main-body"), newblock)
    })
}
function block(n) {
    return select(`#block-${n}`)
}
function swapitem(i1, i2, only = false, usual = false) {
    if (only == false || only === "list") {
        let temp = array[i2]
        array[i2] = array[i1]
        array[i1] = temp
    }
    if (only == false || only === "height") {
        let tempHeight = block(i2).style.height;
        block(i2).style.height = block(i1).style.height
        block(i1).style.height = tempHeight
    }
}
function backgroundColor(color, ...id) {
    id.forEach(element => {
        block(element).style.backgroundColor = color
    });
}
function setup(lengthText, length, speed, refreshHidden, startText, lengthValue) {
    if (select(".gSudoku")) { select(".gSudoku").remove() }
    if (length) {
        select(".length").style.display = ""
        select("#minLength").innerText = length[0]
        select("#length").setAttribute("min", length[0])
        select("#maxLength").innerText = length[1]
        select("#length").setAttribute("max", length[1])
        select(".length label").innerText = lengthText
    }
    else {
        select(".length").style.display = "none"
    }
    select("#minSpeed").innerText = speed[0]
    select("#speed-range").setAttribute("min", speed[0])
    select("#maxSpeed").innerText = speed[1]
    select("#speed-range").setAttribute("max", speed[1])

    if (lengthValue) {
        select("#length").setAttribute("value", lengthValue)
    }





    select(".refresh").hidden = refreshHidden
    select("#start").innerText = startText
}

function arraySlider(timeInterval, sortedArray, i, j) {
    const cI = i;
    const cJ = j;
    setTimeout((i, j) => {
        backgroundColor("red", i, j)
    }, timeInterval * iP, i, j)
    for (j = j; j > i; j--) {
        swapitem(j, j - 1, "list")
        setTimeout((j) => {
            swapitem(j, j - 1, "height")
        }, timeInterval * iP, j)
    }
    iP++
    setTimeout((i, j, arrayCopy, sortedArrayCopy) => {
        backgroundColor("", i, j)
        arrayCopy.forEach((element, index) => {
            if (arrayCopy[index] == sortedArrayCopy[index]) {
                backgroundColor("lightgreen", index)
            } else {
                backgroundColor("", index)
            }
        })
    }, timeInterval * iP, cI, cJ, [...array], [...sortedArray])

}

