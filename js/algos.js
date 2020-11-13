// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    console.log("distanceFromGrenoble - implement me !");
    const GrenobleLat = 45.166667;
    const GrenobleLong = 5.716667;
    const R = 6371e3; // metres

    const φ1 = GrenobleLat * Math.PI / 180; // rad1, λ in radians
    const φ2 = city.latitude * Math.PI / 180;
    const Δφ = (city.latitude - GrenobleLat) * Math.PI / 180;
    const Δλ = (city.longitude - GrenobleLong) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d / 1000;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

    let temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;
}


// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)

    if (distanceFromGrenoble(csvData[i]) < distanceFromGrenoble(csvData[j]))
        return true;
    return false;
}

function insertsort() {
    for (let i = 1; i < csvData.length; i++) {

        for (let j = i; j > 0 && isLess(j, j - 1); j--) {
            swap(j, j - 1)
        }
    }
    return csvData;
}

function selectionsort() {
    for (let i = 0; i < csvData.length; i++) {
        let min = i;
        for (let j = i + 1; j < csvData.length; j++) {
            if (isLess(j, min)) {
                min = j;
            }
        }
        swap(i, min);
    }
    return csvData;
}

function bubblesort() {
    let bubbleSorted = true;
    let count = 0;
    do {
        bubbleSorted = false;
        count++;

        for (let i = 0; i < csvData.length - count; i++) {

            let j = i + 1;
            if (!isLess(i, j)) {
                swap(i, j);
                bubbleSorted = true;
            }
        }
    } while (bubbleSorted)
    return csvData;
}

function insertsortForShell(gap, start) {

    for (let i = start; i < csvData.length; i += gap) {

        for (let j = i; j > 0 && isLess(j, j - 1); j--) {
            swap(j, j - 1)
        }
    }
}

function shellsort() {
    const gaps = [6, 4, 3, 2, 1];

    for (const gap of gaps) {
        for (let start = 0; start < gap; start++) {
            insertsortForShell(gap, start);
        }
    }
}

function mergesort() {
    console.log("mergesort - implement me !");
}

function heapsort() {
    console.log("heapsort - implement me !");
}

// ---------------------- QUICK SORT ---------------------- //
function swapForQuick(data,i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

    let temp = data[i];
    data[i] = data[j];
    data[j] = temp;
}

function quickPart(data, left, right) {

    let pivot = data[Math.floor((right + left) / 2)],
     i = left,
     j = right;
    console.log(pivot);

    while (i <= j) {
        while (data[i].dist < pivot.dist) {
            i++;
        }
        while (data[j].dist > pivot.dist) {
            j--;
        }
        if (i <= j) {
            swapForQuick(data, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quicksort(data, left, right) {

    let index;

    if (data.length > 1) {

        index = quickPart(data ,left, right);

        if (left < index - 1) {
            quicksort(data, left, index - 1);
        }
        if (index < right) {
            quicksort(data, index, right);
        }
    }
}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort(csvData, 0, csvData.length - 1);
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
