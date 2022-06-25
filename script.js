
const URL = "https://thronesapi.com/api/v2/Characters";
var filter = "";

document.getElementById("search").addEventListener("keyup",()=>{findChar();setRows();});


var res = fetch(URL)
    .then((result)=>{
        return result.json();
    })
    .catch(err=>{console.log(err);})
    res.then(data=>{
        localStorage.setItem("allCharacters",data)
        console.log(data);
        characters = new Characters(data);
        setRows();
})


class Characters
{
    constructor(data){
        this.allChars = data;
    }

    get get_all()
    {
        return this.allChars;
    }

}

var mainCounter = 0;

countOfChars = 5;

function setRows()
{

    var localCounter = mainCounter;

    var tableRef = document.getElementById("mainTBody");

    var mainRow = document.getElementById("mainRow");

    tableRef.innerHTML = "";

    tableRef.appendChild(mainRow);


    for(var i = 0;i<countOfChars;i++,localCounter++)
    {
        if(localCounter==53){break;}
        var char = characters.get_all[localCounter];

        
        let newDiv = document.createElement("div");
        let newId = document.createElement("p");
        let newName = document.createElement("p");
        let newImg = document.createElement("img");

        newId.innerHTML = char.id;
        newName.innerHTML = char.fullName;
        newImg.src = char.imageUrl;

        newImg.style.width = "60px";
        newImg.style.height = "60px";
        newImg.style.maxWidth = "60px";
        newImg.style.maxHeight = "60px";
        newImg.style.objectFit = "cover";
        newDiv.style.background = "#f5f5f5";
        newDiv.style.height = "60px";
        newId.style.marginLeft = "60px"

        newDiv.classList.add("row");
        newDiv.classList.add("mb-2");
        newId.classList.add("col");
        newName.classList.add("col");
        newImg.classList.add("col");

        newDiv.appendChild(newId);
        newDiv.appendChild(newName);
        newDiv.appendChild(newImg);

        newDiv.addEventListener("mouseenter",()=>{hoverAtCell(newDiv)})
        newDiv.addEventListener("mouseleave",()=>{leaveAtCell(newDiv)})
        newDiv.addEventListener("click",()=>{clickAtChar(newId.innerHTML)});

        console.log(filter);

        if(filter!="" && filter.length!=0)
        {
            document.getElementById("btn-preview").disabled = false;;
            document.getElementById("btn-next").disabled = false;;

            if(char.fullName.includes(filter))
            {
                tableRef.appendChild(newDiv);
            }
            else
            {
                i--;
            }
        }
        else
        {
            tableRef.appendChild(newDiv);
        }

    }

}

var id = document.getElementById("id");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var fullName = document.getElementById("fullName");
var title = document.getElementById("title");
var family = document.getElementById("family");
var image = document.getElementById("image");
var imageUrl = document.getElementById("imageUrl");
var imgOfChar = document.getElementById("imgOfChar");

imgOfChar.style.width = "300px";
imgOfChar.style.height = "300px";
imgOfChar.style.maxWidth = "300px";
imgOfChar.style.maxHeight = "300px";
imgOfChar.style.objectFit = "cover";




function hoverAtCell(newDiv)
{
    newDiv.style.background = "#4a4a4a";
}

function leaveAtCell(newDiv)
{
    newDiv.style.background = "#f5f5f5";
}

function clickAtChar(val)
{
    console.log(val);
    var char = characters.get_all[val];

    id.innerHTML = char.id;
    firstName.innerHTML = char.firstName;
    lastName.innerHTML = char.lastName;
    fullName.innerHTML = char.fullName;
    title.innerHTML = char.title;
    family.innerHTML = char.family;
    image.innerHTML = char.image;
    imageUrl.innerHTML = char.imageUrl;
    imgOfChar.src = char.imageUrl;
}

function changeCountOfChars(val)
{
    countOfChars = val;
}

function nextGroupOfChars()
{
    if((mainCounter+countOfChars)<52)
    mainCounter+=countOfChars;
}

function previewGroupOfChars()
{
    if(mainCounter!= 0)
    {
        mainCounter-=countOfChars;
    }

    if(mainCounter<=4)
    {
        mainCounter = 0;
    }
}

function findChar()
{
    filter = document.getElementById("search").value;
    console.log(filter.length);
}