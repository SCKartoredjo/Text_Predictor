
const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();

var url = 'https://carboncreditcapital.com/wp-json/wp/v2/posts/?per_page=100';

var obj
var rawContent
var data = ""

var today = new Date();
var ss = today.getSeconds();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {

		obj = JSON.parse(this.responseText)

		for (var key in obj) {
			rawContent = obj[key].content.rendered;
			data += strip_html_tags(rawContent)
		} 

		fs.writeFile("data/data-" + ss + "-" + dd + "-" + mm + "-" + yyyy + ".txt", data,  function (err, data) {
			if (err) {
				return console.log(err);
			}
			console.log(data);
		});
	}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function strip_html_tags(str) {
	if ((str===null) || (str==='')) {
	   return false;
	} else {
		str = str.toString();
		return str.replace(/<[^>]*>/g, '');
	}
}
