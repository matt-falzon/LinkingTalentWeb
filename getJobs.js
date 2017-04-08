$(document).ready(function()
{
    var rootRef = firebase.database().ref().child('job');

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var href = window.top.location.href;
    //var header = document.getElementById("j");
    //var urlParams = parseURLParams(href);
    var job = href.split("=")[1];
    //console.log(urlParams);
    //header.innerHTML = job;

    rootRef.on('child_added', snap => {

        var company = snap.child('company').val();
        var title = snap.child('title').val();
        var payMax = snap.child('payMax').val();
        var payMin = snap.child('payMin').val();
        var bounty = snap.child('bounty').val();
        var location = snap.child('location').val();
        var employmentType = snap.child('employmentType').val();
        var imageUrl = snap.child('imageUrl').val();

        if(imageUrl == null)
        {
          imageUrl = 'images/lt_symbol.png'; 
        }

        $('#table_job').append('<tr><td>'+title+'</td>' +
        '<td>'+company+'</td>' +
        '<td>'+employmentType+'</td>'+
        '<td>'+location+'</td>'+
        '<td>'+payMin+'</td>'+
        '<td>'+payMax+'</td>'+
        '<td>'+bounty+'</td>'+
        //'<td>' + imageUrl + '</td>' +
        '<td><img src='+'"' + imageUrl + '"'+'style="width:90px;height:90px;">'+
        '</tr>');
    });


function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

});
