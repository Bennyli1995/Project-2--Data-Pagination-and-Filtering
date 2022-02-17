/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Done By: Benny Li
January 31, 2022
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
* `randomColor` function
* @list {array} A list parameter to represent student data that will be passed as an argument when the function is called.
* @page (int) A page parameter to represent the page number that will be passed as an argument when the function is called. 
* @returns {string} Returns a ul string that will be used for the index.html file to display the profiles of the students. 
*/

// Pseudocode
// Create two variables to store the start index and the end index of the list items to be displayed on the given page. 
// To make this function dynamic, use the page parameter and some basic math to calculate the value of these variables like so:
// Start Index = (page parameter * items per page) - items per page
// End Index = page parameter * items per page

const numberPerPage = 9;

function showPage(list,page){

   // Initiate the start and end index
   const startIndex = numberPerPage * page - numberPerPage;
   const endIndex = numberPerPage * page;

   // Identify the ul element 
   const ul = document.getElementsByClassName("student-list")[0]

   // Setting both tags to be empty string initially
   ul.innerHTML = ""
   let html = ""

   // For loop to loop over the lists 
   for (let i = 0; i < list.length; i++){
      if (i >= startIndex && i < endIndex){
         html +=
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src = ${list[i]["picture"]["large"]} alt="Profile Picture">
               <h3>${list[i]["name"]["first"]} ${list[i]["name"]["last"]}</h3>
               <span class="email">${list[i]["email"]}</span>  
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i]["registered"]["date"]}</span>
            </div>
         </li>`
      }
   }
   ul.insertAdjacentHTML("beforeend", html)

   // Should display "No results found" if no matches 
   if (html === ""){
      ul.innerHTML = '<h2> No Results Found</h2>'
   }
   return ul;
}

/*
Create the `addPagination` function
* @list {array} A list parameter to represent student data that will be passed as an argument when the function is called.
* @returns {string} Returns a random background color
* This function creates and appends functioning pagination buttons.
*/

function addPagination (list){

   // Minimum number of buttons required (At least 1)
   buttonsRequired = Math.floor(list.length / numberPerPage)+1;


   // Select the element with the class "link-list" and set the initial tags to be empty strings 
   const ul = document.querySelector(".link-list")
   ul.innerHTML = "";
   let html = "";

   // Add the buttons 
   for (let i = 1; i <= buttonsRequired; i++){
      html += `<li>
      <button type="button">${i}</button>
    </li>`
   }
   ul.insertAdjacentHTML("beforeend", html);

   // Initialize the ul and li variables so they can be related to the button variable
   const li = ul.children;
   let firstButton = ul.firstElementChild.children;

   //Set the first button to be active
   firstButton.className = "active"

   // Whenever a button is clicked, that button becomes active and the rest of the status clears on the other buttons. 
   ul.addEventListener("click",(e)=>{
      if (e.target.tagName === "BUTTON"){
         let activeButton = e.target;
         // Loop through all of the buttons one by one 
         for (button of li){
            button.firstElementChild.className = ""
         }
         activeButton.className = "active"
         // Get to the appropriate page with the correct profiles
         showPage(list,+activeButton.textContent)
      }
   return ul;
   })
   }

/* EXTRA CREDITS
Create the `createSearchBar` function
* @list {array} A list parameter to represent student data that will be passed as an argument when the function is called.
* @returns {string} A searchbar that can be used to look up users
* This function creates a searchbar so that users can search particular users
*/

function createSearchBar(list){

   //Create Search Bar
   const header = document.querySelector("header")
   let html = "" 
   html += `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`

   header.insertAdjacentHTML("beforeend",html)

   // Add functionality to the search bar 
   const search = document.querySelector(".student-search")

   // Keyup type 
   search.addEventListener("keyup",(e)=>{

      // Make everything upper-case so search is case insensitive
      const searchPhrase = e.target.value.toUpperCase();

      // New list that is filtered according to the search
      const filtered = list.filter(word => word.name.first.toUpperCase().includes(searchPhrase) || word.name.last.toUpperCase().includes(searchPhrase));
      showPage(filtered,1);
      addPagination(filtered)});

   // Handle the case when the search button is clicked
   search.addEventListener("click",(e)=>{
      // Define the input element
      const input = search.childNodes[3]
      if (e.target.tagName === "BUTTON"){
         const searchPhrase = input.value.toUpperCase();
         // New list that is filtered according to the search
         const filtered = list.filter(word => word.name.first.toUpperCase().includes(searchPhrase) || word.name.last.toUpperCase().includes(searchPhrase));
         showPage(filtered,1);
         addPagination(filtered)};
      })
   return header;
}

// Call functions
showPage(data,1);
addPagination(data);
createSearchBar(data);


