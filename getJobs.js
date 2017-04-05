$(document).ready(function()
{
    var rootRef = firebase.database().ref().child("job");

    rootRef.on("child_added", snap => {

        var company = snap.child("company").val();
        var title = snap.child("title").val();
        var payMax = snap.child("payMax").val();
        var payMin = snap.child("payMin").val();
        var bounty = snap.child("bounty").val();
        var location = snap.child("location").val();
        var employmentType = snap.child("employmentType").val();


        $("#table_job").append("<tr><td>"+title+"</td>" + 
        "<td>"+company+"</td>" + 
        "<td>"+employmentType+"</td>"+
        "<td>"+location+"</td>"+
        "<td>"+payMin+"</td>"+
        "<td>"+payMax+"</td>"+
        "<td>"+bounty+"</td>"+
        "</tr>");
    });

});