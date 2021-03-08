// Script for search_results.html

//copied from index.html
$('#search_btn').on('click', function(e) {
    console.log("YAY");

    e.preventDefault();
    var userQuery = $('#query').val();
    var mediaFormat = $('#format').val();

    var addressAppend = '?q=' + userQuery + '&fo=' + mediaFormat;

    document.location.replace('search_results.html'+addressAppend);
});

// take data from URL and manually split it (can easily automate for future projects)
var searchParametersRaw = document.location.search.split("&");
var userQuery = searchParametersRaw[0].substr(3,searchParametersRaw[0].length);
var mediaFormat = "search"; // default for LOC API

// use conditional so that it won't attempt unless user specified something
if (searchParametersRaw[1].substr(3,searchParametersRaw[1].length) != "All") {
    mediaFormat = searchParametersRaw[1].substr(3,searchParametersRaw[1].length);
    mediaFormat = mediaFormat.toLowerCase();
}

// log to make sure it's right
console.log(userQuery);
console.log(mediaFormat);

// build request for API
var request = 'https://www.loc.gov/' + mediaFormat + '/?q=' + userQuery + '&fo=json';

// write code to get data from API
fetch(request, {mode: 'cors'}).then(function (response) {
    // Check the console first to see the response.status
    console.log(response.status);
    
    // get data
    response.json().then(function (data) {
        displayData(data);
    });
});

function displayData(data) {
    console.log(data.results);
    for(i=0;i<data.results.length;i++) {
        console.log(data.results[i].title);

        var subjects = data.results[i].subject;

        if (subjects) {
            subjects.join(', ');
        }
        else {
            subjects = 'None listed';
        }

        var tableRoot = $('#table_body');   

        
        tableRoot.append("<tr>" +
        "<td>" + (i+1) + "</td>" +
        "<td>" + data.results[i].title + "</td>" +
        "<td>" + data.results[i].date + "</td>" +
        "<td>" + subjects + "</td>" +
        "<td><a href=" + data.results[i].id + ">Read more</a></td>" +
         + "</tr>");
    }
}