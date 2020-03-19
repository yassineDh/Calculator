let divs = [...document.getElementsByClassName('btn')];
let screen = document.getElementById("screen");

let inp = "";
divs.forEach(elt => {
    console.log(inp);
    elt.addEventListener("click", (e) => {
        let key = Object.keys(elt.dataset)[0];
        let t = elt.dataset[key];
        showIn(key, elt);
        
    })
})

function showIn(x, element) {
    switch (x) {
        case 'action':
            inp = "";
            screen.value= inp;
             break;

        case 'operator':
            if (element.dataset[x] !== "equal") { 
                inp += element.dataset[x] ;
                screen.value= inp;}
            else {
                equalEq();
                
            }
            break;

        case 'number':
            inp += element.dataset[x];
            screen.value= inp;
            break;
    }
}

function equalEq() {
    let str = inp.slice();
    let reg1 = /\D/g;
    let reg2 = /\d/g

    let nums = str.split(reg1);
    let ops = str.split(reg2);

    console.log(nums)
    console.log(ops);

    let nums2 = eleminateVoid(nums);
    let ops2 = eleminateVoid(ops);

   
    console.log(nums2)
    console.log(ops2);

    if(nums2.length == ops2.length){
        let sign = ops2.shift();
        nums2[0] = sign+nums2[0]
    }

    console.log(nums2)
    console.log(ops2);

    for (let i = 0; i < ops.length; i++) {
        let occPlus = getOcc("+", ops2);
        let occMinus = getOcc("-", ops2);
        let occMultiole = getOcc("*", ops2);
        let occDevide = getOcc("/", ops2);
        if (nums2.length > 1) {
            if (occMultiole) {
                let ind = ops2.indexOf("*");
                let calNum = parseInt(nums2[ind],10) * parseInt(nums2[ind + 1],10);
                ops2.splice(ind, 1);
                nums2.splice(ind, 2, calNum);
            } else if (occDevide) {
                let ind = ops2.indexOf("/");
                let calNum = parseInt(nums2[ind],10) / parseInt(nums2[ind + 1],10);
                ops2.splice(ind, 1);
                nums2.splice(ind, 2, calNum);
            } else if (occMinus) {
                let ind = ops2.indexOf("-");
                let calNum = parseInt(nums2[ind],10) - parseInt(nums2[ind + 1],10);
                ops2.splice(ind, 1);
                nums2.splice(ind, 2, calNum);
            } else if (occPlus) {
                let ind = ops2.indexOf("+");
                let calNum = parseInt(nums2[ind],10) + parseInt(nums2[ind + 1],10);
                ops2.splice(ind, 1);
                nums2.splice(ind, 2, calNum);
            }
        }

    }
    console.log(nums2[0]);
    
    screen.value = nums2[0]
}

function getOcc(x, list) {
    let occ = 0;

    list.forEach(elt => {
        if (elt == x) occ++;
    })

    return occ;
}

function eleminateVoid(x) {
    let x2 = []

    x.forEach(elt => {
        if (elt) {
            let i = x2.push(elt)
        }
    })

    return x2;
}