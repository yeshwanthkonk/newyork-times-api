
var cont = document.createElement('div');
cont.setAttribute('class', "container");
var head = document.createElement('div');
head.setAttribute('class', "heading");
var header = document.createElement('header');
header.innerText = "THE TOP STORIES FROM NY";
head.append(header);
var nav = document.createElement('nav');
nav.setAttribute('class', 'nav');
nav.append(creataNav('home'), creataNav('world'), creataNav('politics'), creataNav('magazine'), creataNav('technology'), creataNav('science'));
nav.append(creataNav('health'), creataNav('sports'), creataNav('arts'), creataNav('fashion'), creataNav('food'), creataNav('travel'));

cont.append(head, nav);

document.body.append(cont);

function creataNav(value){
    var a = document.createElement('a');
    a.id = value
    a.setAttribute('onclick', "goto(this)");
    a.innerText=value;
    return a;
}

var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var first_url = "https://api.nytimes.com/svc/topstories/v2/";
var last_url = ".json?api-key=WCGDdS6QHZLeJffG0xvGrmLjVUUM5bVE";
var currentPage = "home";

async function goto(node){
    if(currentPage == node.id){
        return;
    }
    let prevPage = document.getElementById(currentPage);
    prevPage.style = ""
    node.style = "background-color: royalblue; color: white;"
    currentPage = node.id;
    var response = await fetch(first_url+currentPage+last_url);
    var data = await response.json();
    if(data.status == "OK"){
        data = data.results;
        console.log(data);
        var div = document.createElement('div');
        div.setAttribute('id','data');
        data.forEach((item)=>{
            let img = "";
            if('null' != String(item['multimedia'])){
                let arr = item['multimedia'];
                for(let i =0;i<arr.length;i++){
                    if(arr[i].url.includes("articleInline")){
                        img = arr[i].url;
                        break;
                    }
                }
            }
            if(img == ""){
                img = "https://place-hold.it/190x127";
            }
            div.append(createNews(item['section'], item['title'], item['updated_date'], item['abstract'], item['short_url'], img));
        })
        let prev = document.getElementById('data');
        cont.replaceChild(div, prev);
    }
}

async function getShow(){
    var response = await fetch(first_url+currentPage+last_url);
    var data = await response.json();
    document.getElementById(currentPage).style = "background-color: royalblue; color: white;"
    if(data.status == "OK"){
        data = data.results;
        console.log(data);
        var div = document.createElement('div');
        div.setAttribute('id','data');
        data.forEach((item)=>{
            let img;
            let arr = item['multimedia'];
            for(let i =0;i<arr.length;i++){
                if(arr[i].url.includes("articleInline")){
                    img = arr[i].url;
                    break;
                }
            }
            div.append(createNews(item['section'], item['title'], item['updated_date'], item['abstract'], item['short_url'], img));
        })

        cont.append(div);
        console.log(cont);
        
    }
}

function createNews(sect, title, date, content, url,jpg){

    var row_1 = document.createElement('div');
    row_1.setAttribute('class', 'row');

    var col_1 = document.createElement('div');
    col_1.setAttribute("class", "col-1");
    var col_9 = document.createElement('div');
    col_9.setAttribute("class", "col-10");

    var card = document.createElement('div');
    card.setAttribute("class", "card mb-3");
    card.style = "width: 100%; margin-top: 20px;";
    var row = document.createElement('div');
    row.setAttribute("class", "row no-gutters");
    var col_8 = document.createElement('div');
    col_8.setAttribute("class", "col-lg-12 col-xl-8");
    var card_body = document.createElement('div');
    card_body.setAttribute("class", "card-body");
    var h5 = document.createElement('h5');
    h5.setAttribute("class", "sectioncard");
    h5.innerText = sect;
    var titlecard = document.createElement('div');
    titlecard.setAttribute("class", "titlecard");
    titlecard.innerText = title;
    var datecard = document.createElement('div');
    datecard.setAttribute("class", "datecard");
    date = new Date(date);
    datecard.innerText = month[date.getMonth()]+" "+date.getDate();
    var abstractcard = document.createElement('p');
    abstractcard.setAttribute("class", "abstractcard");
    abstractcard.innerText = content;
    var a = document.createElement('a');
    a.setAttribute("class", "continueReading");
    a.innerText = "Continue reading";
    a.href = url;
    a.target = "_blank";
    card_body.append(h5, titlecard, datecard, abstractcard, a);
    col_8.append(card_body);

    var col_4 = document.createElement('div');
    col_4.setAttribute("class", "col-lg-12 col-xl-4 ");
    var img = document.createElement('img');
    img.setAttribute("class", "img-thumbnail");
    img.src = jpg;
    col_4.append(img);

    row.append(col_8, col_4);
    card.append(row);
    col_9.append(card);
    
    row_1.append(col_1, col_9);
    return row_1;

}

getShow();




