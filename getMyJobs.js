$(document).ready(function()
{
    const auth = firebase.auth();

    var jobRef = firebase.database().ref().child('job');
    var rootRef = firebase.database().ref();
    var storage = firebase.storage();
    var storageRef = storage.ref();

    var href = window.top.location.href;
    //var header = document.getElementById("j");
    //var urlParams = parseURLParams(href);
    var job = href.split("=")[1];
    //console.log(urlParams);
    //header.innerHTML = job;

    var user = firebase.auth().currentUser;

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

            //var userID = firebase.auth().currentUser.uid;
            const query = rootRef.child('job').orderByChild('id').equalTo(firebaseUser.uid);

            query.on('child_added', snap => {

                console.log(snap.val());
                console.log(snap.child('title').val());

                var company = snap.child('company').val();
                var title = snap.child('title').val();
                var payMax = snap.child('payMax').val();
                var payMin = snap.child('payMin').val();
                var bounty = snap.child('bounty').val();
                var location = snap.child('location').val();
                var employmentType = snap.child('employmentType').val();
                var imageUrl = snap.child('imageUrl').val();
                var key = snap.child('key').val();

                if(imageUrl == null)
                {
                  imageUrl = 'images/lt_symbol.png';
                }

                $('#table_job').append('<tr><td><a href="edit_job.html?j=' + key + '">' + title + '</a></td>' +
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
