$(document).ready(function()
{
    var rootRef = firebase.database().ref().child('test');

    rootRef.on('child_added', snap => {

        var name = snap.child('name').val();
        var email = snap.child('email').val();

        $('#table_data').append('<tr><td>'+name+'</td><td>'+email+'</td></tr>');
    });

});