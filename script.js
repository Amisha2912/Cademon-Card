let uniqueType = new Set();
let dataArr=[],currentData=[];
const displayCard=document.querySelector("#displayCard");
const searchInput=document.querySelector(".search");
const resetBtn=document.querySelector(".reset");
const filterBtn=document.querySelector(".filter");
const selectTagType=document.querySelector("#cardType");


const createTypes=()=>{
    selectTagType.innerHTML="";
    let optionsAll=document.createElement('option');
    optionsAll.value="All";
    optionsAll.textContent="All";
    selectTagType.appendChild(optionsAll);
    uniqueType.forEach((type)=>{
        let options=document.createElement('option');
        options.value=type;
        options.textContent=type;
        // console.log(options);
        selectTagType.appendChild(options);
    });
}

const filterByName =(currentData,input)=>{ //currentDate is arrays of objects,containing data of all pokiemon.
    currentData =currentData.filter((data)=>{ //data is element of array currentData
       return data.name.toLowerCase().includes(input.toLowerCase());
    });

    return currentData;
}


//2-times filter is going on
filterBtn.addEventListener("click",()=>{
    if(selectTagType.value.toLowerCase() === "all") {
        currentData=dataArr;
    }
    else{
        currentData = dataArr.filter(item=> item.types.toLowerCase()=== selectTagType.value);
    }
    //type pe filter lagaiya
    renderData(filterByName(currentData,searchInput.value)); //search pe filter laga ke render the final data
})


searchInput.addEventListener('input',()=>{
    let inputData=searchInput.value;
    // console.log(inputData);
    let filteredData =filterByName(dataArr,inputData);
    renderData(filteredData);//above then data is filtered based on the inputData and it is render,so that only search card with respective detail to be displayed
})
console.log(uniqueType);

const renderData = (dataArr) => {
    displayCard.innerHTML = ""; // Clear the display container each time

    dataArr.forEach((data) => {
        // Create card container
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        // Create card
        let card = document.createElement('div');
        card.classList.add('card');

        // Create front card
        let frontCard = document.createElement('div');
        frontCard.classList.add('front-card');

        // Set background color based on type
        if (data.types === "grass") frontCard.style.backgroundColor = "#32CD32";
        else if (data.types === "fire") frontCard.style.backgroundColor = "#FF5733";
        else if (data.types === "water") frontCard.style.backgroundColor = "#007BA7";
        else if (data.types === "bug") frontCard.style.backgroundColor = "#9ACD32";
        else if (data.types === "normal") frontCard.style.backgroundColor = "#A9A9A9";
        else if (data.types === "poison") frontCard.style.backgroundColor = "#800080";
        else if (data.types === "electric") frontCard.style.backgroundColor = "#8B8000";
        else if (data.types === "fairy") frontCard.style.backgroundColor = "#FFC0CB";
        else if (data.types === "ground") frontCard.style.backgroundColor = "#654321";
        else if (data.types === "psychic") frontCard.style.backgroundColor = "#8A2BE2";
        else if (data.types === "rock") frontCard.style.backgroundColor = "#EEDC82";
        else if (data.types === "ghost") frontCard.style.backgroundColor = "#800080";
        else if (data.types === "ice") frontCard.style.backgroundColor = "#00FFFF";
        else if (data.types === "dragon") frontCard.style.backgroundColor = "#FFD700";
        else if (data.types === "fighting") frontCard.style.background = "#FFA500";

        // Front card content
        let id = document.createElement('div');
        id.innerHTML = data.id;
        id.style.fontWeight = "800";
        id.style.fontSize = '20px';

        let img = document.createElement('img');
        img.src = data.images;

        let name = document.createElement('h1');
        name.innerHTML = data.name;

        let type = document.createElement('h2');
        type.innerHTML = data.types;

        frontCard.appendChild(id);
        frontCard.appendChild(img);
        frontCard.appendChild(name);
        frontCard.appendChild(type);

        // Create back card
        let backCard = document.createElement('div');
        backCard.classList.add('back-card');
        backCard.style.backgroundColor = frontCard.style.backgroundColor;

        // Back card content
        let backId = document.createElement('div');
        backId.innerHTML = data.id;
        backId.style.fontWeight = "800";
        backId.style.fontSize = '20px';

        let backImg = document.createElement('img');
        backImg.src = data.images;
        backImg.style.transform = "rotateY(180deg)";

        let backName = document.createElement('h1');
        backName.innerHTML = data.name;

        let abilities = document.createElement('h2');
        abilities.innerHTML = "Abilities: " + data.abilities;

        backCard.appendChild(backId);
        backCard.appendChild(backImg);
        backCard.appendChild(backName);
        backCard.appendChild(abilities);

        // Append front and back card to card
        card.appendChild(frontCard);
        card.appendChild(backCard);

        // Append card to card container
        cardContainer.appendChild(card);

        // Append card container to displayCard
        displayCard.appendChild(cardContainer);
    });
};


const fetchData = async ()=>{
    let promiseArray = [];
    let dataPromiseArray = [];
    for (let i = 1; i <= 151; i++) {
        //will get all API asynchrously
        let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`); //return promise
        promiseArray.push(promise);
    }

    let responseArr = await Promise.all(promiseArray); //will wait for all promise to resolve after all API are fetch


    //converting all response to json
    for (let i = 0; i < responseArr.length; i++) {
        const data = responseArr[i].json();
        dataPromiseArray.push(data);
    }

    dataArr = await Promise.all(dataPromiseArray); 
    dataArr = dataArr.map((data, i) => { //map will return new Array to dataArr only.
        uniqueType.add(data.types[0].type.name);
        return{
            id:data.id,
            name:data.name,
            images:data.sprites['front_default'],
            types:data.types[0].type.name,
            species:data.species.url,
            abilities:data.abilities.map(ability=>ability.ability.name).join(', '),
            moves:data.moves[0].move.name
        }
        
    });
    createTypes(); //we are calling here ,becoz here we will get all the data.
    renderData(dataArr);
    currentData=dataArr;
}
    
fetchData();

resetBtn.addEventListener("click",()=>{
    searchInput.value="";
    currentData=dataArr;
    renderData(currentData);
})









































//----------IMPORTANT-CONCEPT------
// const fetchData = async ()=>{
//     let st=Date.now();
//     let promiseArray=[];
//     let dataPromiseArray=[];
//     for(let i=1;i<=151;i++){
//         //will get all API asynchrously
//         let promise =fetch(`https://pokeapi.co/api/v2/pokemon/${i}`); //return promise
//         promiseArray.push(promise);     
//     }

//     let responseArr= await Promise.all(promiseArray); //will wait for all promise to resolve after all API are fetch


//     //converting all response to json
//     for(let i=0;i<responseArr.length;i++){
//         const data= responseArr[i].json();
//         dataPromiseArray.push(data);
//     }

//     let dataArr=await Promise.all(dataPromiseArray); // wait for all json data
 
//     let uniqueType=new Set();//using Set to get unique pokiemon type

//     dataArr.forEach((data,i)=>{
//         uniqueType.add(data.types[0].type.name);
//     })
//     console.log(uniqueType);
    
// }

// fetchData();
//-----------------------------------------------



















//------------learnings---------------------
// const fetchData = async ()=>{
//     for(let i=1;i<=151;i++){
//         let arr=[];
//         //as we have use `await` so,this is sequential call.
//         let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
//         let data=await response.json();
//         arr.push(data);
//         console.log(data.sprites['front_default']);//get images for particular id     pokiemon
//         console.log(data.name);// get pokiemon name
//         console.log(data.id); // get pokiemon id
//         console.log(data.types[0].type.name); // get pokiemon types
//         console.log(data.species.url); //get pokiemon species
//         console.log(data.abilities);// get pokiemon abilities
//     }
// }
// //----kind of documentation for above URL--------
// fetchData();