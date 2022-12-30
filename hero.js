var PrsnlDtls=document.getElementById('personalDetail');
var Biography=document.getElementById('biography');
var powerstats=document.getElementById('powerstats');
var imageSuper = document.getElementById("imageSuper");

function retrive(ShId) {
    fetch('https://www.superheroapi.com/api.php/1358348604650444/'+ShId)
        .then(function (e) {
            return e.json();
        })
        .then(function (data) {
            console.log("data", data);
            // console.log(data.image.url);
            PrintResults(data);
            return data;
        })
}
// on load run
window.onload = function(){
    let winurl = window.location.href;
    console.log(winurl);
    let ShId = winurl.substring(winurl.lastIndexOf('=') + 1);
    console.log(ShId);
    retrive(ShId);    
}

// print deatils of biograph,powerstar,main image
function PrintResults(data) {
    console.log(data.image.url);
    imageSuper.src = data.image.url;
    ul1 = document.createElement('ul');
    ul1.innerHTML = `
                        <h1>${data.name}</h1>
                        <p><strong>Gender :&nbsp;</strong>${data.appearance.gender}</p>
                        <p><strong>Race :&nbsp;</strong>${data["appearance"]["race"]}</p>
                        <p><strong>Hair-Color :&nbsp;</strong>${data['appearance']['hair-color']}</p>
                        <p><strong>Height :&nbsp;</strong>${data.appearance.height}</p>
                        <p><strong>Eye-Color :&nbsp;</strong>${data["appearance"]["eye-color"]}</p>
                        <p><strong>Weight :&nbsp;</strong>${data.appearance.weight}</p>
                        `                    
    PrsnlDtls.appendChild(ul1);
    ul2 = document.createElement('ul');
    ul2.innerHTML = `
                        <p><strong>Aliases : </strong>[${data["biography"]["aliases"].slice(0,10)}]</p>
                        <p><strong>Alignment : </strong>${data.biography.alignment}</p>
                        <p><strong>Alter-Egos : </strong>${data["biography"]["alter-egos"]}</p>
                        <p><strong>First-Appearance : </strong>${data["biography"]["first-appearance"].slice(0,10)}</p>
                        <p><strong>Full-Name : </strong>${data["biography"]["full-name"]}</p>
                        <p><strong>Place-Of-Birth: </strong>${data["biography"]["place-of-birth"]}</p>
                        <p><strong>Publisher: </strong>${data["biography"]["publisher"]}</p>
                        `
    Biography.appendChild(ul2);

    ul3 = document.createElement('ul');
    ul3.innerHTML = `
                        <p><strong>Combat : &emsp;&emsp;</strong>${data.powerstats.combat}</p>
                        <p><strong>Durability : &emsp;</strong>${data.powerstats.durability}</p>
                        <p><strong>Intelligence : &emsp;</strong>${data["powerstats"]["intelligence"]}</p>
                        <p><strong>Power : &emsp;&emsp;&emsp;</strong>${data["powerstats"]["power"]}</p>
                        <p><strong>Speed : &emsp;&emsp;&emsp;</strong>${data["powerstats"]["speed"]}</p>
                        <p><strong>Strength: &emsp;&emsp;</strong>${data["powerstats"]["strength"]}</p>
                        <p><strong>Strength: &emsp;</strong>${data["work"]["occupation"]}</p>
                       `
    powerstats.appendChild(ul3);
}



