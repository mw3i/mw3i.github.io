function save_and_quit(data) {
    var a = window.document.createElement('a');
    dataToSave = JSON.stringify(
        [localStorage.getItem('subject_id'), localStorage.getItem('experiment'), data],
        null, 4
    )
    a.href = window.URL.createObjectURL(new Blob([dataToSave], {type: 'text/plain'}));
    a.download = 'data.json';

    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)

    setTimeout( function() {
        window.location.href = '../finish.html'
    })
}

function shuffle(array) { // from mike bostok @ https://bost.ocks.org/mike/shuffle/
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}