
const URL_ = "https://thronesapi.com/api/v2/Characters";
var filter = "";
const InfoSize_ = "300px";
var mainCounter = 0;
var countOfChars = 5;
var infoViewer;


window.addEventListener("load", Init);
document.getElementById("search").addEventListener("keyup",()=>{findChar();setRows();});



class InfoViewer
{
    constructor(id,firstName,lastName,fullName,title,family,image,imageUrl,imgOfChar)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.title = title;
        this.family = family;
        this.image = image;
        this.imageUrl = imageUrl;
        this.imgOfChar = imgOfChar;

        this.imgOfChar.style.width = InfoSize_;
        this.imgOfChar.style.height = InfoSize_;
        this.imgOfChar.style.maxWidth = InfoSize_;
        this.imgOfChar.style.maxHeight = InfoSize_;
        this.imgOfChar.style.objectFit = "cover";
    }

    set s_id(val)
    {
        this.id.innerHTML = val;
    }

    set s_firstName(val)
    {
        this.firstName.innerHTML = val;
    }

    set s_lastName(val)
    {
        this.lastName.innerHTML = val;
    }

    set s_fullName(val)
    {
        this.fullName.innerHTML = val;
    }

    set s_title(val)
    {
        this.title.innerHTML = val;
    }

    set s_family(val)
    {
        this.family.innerHTML = val;
    }

    set s_image(val)
    {
        this.image.innerHTML = val;
    }

    set s_imageUrl(val)
    {
        this.imageUrl.innerHTML = val;
    }

    set s_imgOfChar(val)
    {
        this.imgOfChar.src = val;
    }


}

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

function Init()
{
    infoViewer = new InfoViewer(
        document.getElementById("id"),
        document.getElementById("firstName"),
        document.getElementById("lastName"),
        document.getElementById("fullName"),
        document.getElementById("title"),
        document.getElementById("family"),
        document.getElementById("image"),
        document.getElementById("imageUrl"),
        document.getElementById("imgOfChar")
    )

    var res = fetch(URL_)
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
}






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

    infoViewer.s_id = char.id;
    infoViewer.s_firstName = char.firstName;
    infoViewer.s_lastName = char.lastName;
    infoViewer.s_fullName = char.fullName;
    infoViewer.s_title = char.title;
    infoViewer.s_family = char.family;
    infoViewer.s_image = char.image;
    infoViewer.s_imageUrl = char.imageUrl;
    infoViewer.s_imgOfChar = char.imageUrl;
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
}