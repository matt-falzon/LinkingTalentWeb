$(document).ready(function()
{
    const auth = firebase.auth();

    var rootRef = firebase.database().ref().child('files');

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var href = window.top.location.href;
    //var header = document.getElementById("j");
    //var urlParams = parseURLParams(href);
    var job = href.split("=")[1];
    //console.log(urlParams);
    //header.innerHTML = job;

    var txtUsername= document.getElementById('username');
    var txtPassword= document.getElementById('password');
    var btnLogin= document.getElementById('login_button');
    var jobsTable = document.getElementById('jobs_table');

    //user login
    btnLogin.addEventListener('click', e => {
        //if user is already logged in
        if(auth.currentUser)
        {
            auth.signOut();
        }
        else//no user logged in
        {
            const email = txtUsername.value;
            const pass = txtPassword.value;

            const promise = auth.signInWithEmailAndPassword(email, pass);

            promise.catch(e => console.log(e.message));
        }

    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser)
        {
            console.log("logged in");
            btnLogin.innerHTML = "Logout"
            txtUsername.style.visibility = "hidden";
            txtPassword.style.visibility = "hidden";
            jobsTable.style.visibility = "visible";
        }
        else
        {
            console.log("logged out");
            btnLogin.innerHTML="Login";
            txtUsername.style.visibility = "visible";
            txtPassword.style.visibility = "visible";
            jobsTable.style.visibility = "hidden";
        }
    });

    rootRef.on('child_added', snap => {

        var fileName = snap.child('name').val();
        var downloadURL = snap.child('location').val();

        $('#table_job').append('<tr>' +
        '<td>'+'company name?'+'</td>' +
        '<td>'+fileName+'</td>'+
        '<td><a href=' + downloadURL + '>Download</a></td>' +
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
