// get element from index page
var superheroname = document.getElementById("superhero-name");
var AddingContent = document.getElementById("adding-list");


//  viewing hero page
function ViewHero(li){
    console.log("li",li);
    var element = li.getElementsByTagName('h1')[0];
    console.log("element",element);
    element.addEventListener('click',function(e){
        console.log(e.target.id);
        console.log(window.location.pathname+"/hero.html#id="+e.target.id);
        let way1=`${window.location.pathname} + /../hero.html#id=${e.target.id}`;
        console.log(way1);
        window.open(way1);
    });
}

// creating each element name
function display(data) {
            li=document.createElement("li");
            li.className="list-item";
            li.setAttribute("id",data.id);
            li.innerHTML = `<h1 id=${data.id}>${data.name}</h1>
                            <img src="${data.image.url}" id=${data.id}>`;
            favheart = document.createElement("i");
            favheart.className = "fa fa-heart";
            favheart.setAttribute('id', data.id);
            li.append(favheart);
            favheart.addEventListener('click',function (e){
                let id = e.target.id;
                let chngcolor = e.target;
                let favchk = frvtHeros();
                console.log('favchk', favchk);
                if (!favchk.includes(id)) {
                    chngcolor.style.color = "red";
                    favchk.push(id);  
                }
                else {
                    alert('already added to Favourite!!')  
                }
        localStorage.setItem('FavouriteHeros', JSON.stringify(favchk));
        console.log(id);
        
    })
    li.append(favheart);
            AddingContent.append(li);
            ViewHero(li,data);
            return;
}

function frvtHeros(){
    let hero;
    if (localStorage.getItem('FavouriteHeros') === null) {
        hero = [];
        console.log("no hero ", hero);
    }
    else {
        hero = JSON.parse(localStorage.getItem('FavouriteHeros'));
        console.log("hero",hero);
    }
    return hero;
}



// console.log(li);

// iterating over each element in a loop
function ExtractNames(data, searchText) {
    let local_Storage = frvtHeros();
    console.log("searchText",searchText);
    for(let i=0;i<data.results.length;i++){
         if((data.results[i].name).slice(0,searchText.length).toUpperCase() == searchText.toUpperCase()){
            display(data.results[i], searchText,local_Storage);
        }
        
    }
    return; 
}
function search_hero(searchText,KCode1) { 
    if (searchText.length > 0) {
        console.log('https://www.superheroapi.com/api.php/1358348604650444/search/' + searchText);
             fetch('https://www.superheroapi.com/api.php/1358348604650444/search/'+searchText)
            .then(function (response) {
                return response.json();
            })
             .then(function (data) {
                
                console.log(data);
                    if (KCode1 == 13 && searchText.length >= 5) {
                      let path = `${window.location.pathname} + /../hero.html#id=${data.results[0].id}`;
                    window.open(path);
                } 
                   if (data.response === 'success') {
                    AddingContent.innerHTML = "";
                      ExtractNames(data, searchText);
                }
                return data;
        })
    }
    //  no text is present
        else {
            AddingContent.innerHTML = "";
    }

    AddingContent.innerHTML = "";
    return;
}
superheroname.addEventListener('keyup', function (e) {
    console.log(e.target.value,e.keyCode)
    search_hero(e.target.value,e.keyCode);
});