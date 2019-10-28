//variables
const addCourse = document.querySelector('#courses-list'),
      shoppingCart = document.querySelector('#shopping-cart tbody'),
      clearCart = document.querySelector('#clear-cart')

//event listeners
loadEventListeners()
function loadEventListeners(){
    addCourse.addEventListener('click', buyCourse);
    shoppingCart.addEventListener('click', removeShopping);
    //clearing all the shopping  cart
    clearCart.addEventListener('click', clearAll);
    document.addEventListener('DOMContentLoaded', loadFromStorage)
}
//functions

function buyCourse(e){
     e.preventDefault()
     if(e.target.classList.contains('add-to-cart')){
          const course = e.target.parentElement.parentElement
          //read coures

          readCoures(course)
     }
}

function readCoures(course){
     const info ={
          images: course.querySelector('img').src,
          title: course.querySelector('h4').textContent,
          price: course.querySelector('.price span').textContent,
          id: course.querySelector('a').getAttribute('data-id')
     }
     //add to cart
          addToCart(info)
}

function addToCart(course){
    const row = document.createElement('tr')
    //building a template to form the table row
    row.innerHTML = `
          <tr>
          <td><img src= '${course.images}' width='100'</td>
          <td>${course.title}</td>
          <td>${course.price}</td>
          <td><a href='#' class='remove' data-id'${course.id}'>X</td>
          </tr>
    `;
          shoppingCart.appendChild(row);
          
          //save to the local storage

          saveToLocalStorage(course);
}

//adding courses to the local storage
function saveToLocalStorage(course){
     let courses = getFromLocalStorage()
     courses.push(course)
     localStorage.setItem('courses', JSON.stringify(courses))
}

function getFromLocalStorage(){
     let courses
     if(localStorage.getItem('courses') === null){
          courses =[]
     }else[
          courses = JSON.parse( localStorage.getItem('courses') )
     ]
     return courses
}

//Remove fro the dom
function removeShopping(e){
     let course, courseId
     if(e.target.classList.contains('remove')){
          e.target.parentElement.parentElement.remove()
        course=  e.target.parentElement.parentElement
        courseId = course.querySelector('a').getAttribute('data-id')

     }
     //remove for local storage
     removeFromStorage(courseId)
}

function removeFromStorage(id){
     let coursesLS = getFromLocalStorage();

     //loop through all the courses and delete
     coursesLS.forEach(function(course, index){
          if(course.id === id){
               coursesLS.splice(index,1)
          }
     })
     console.log(coursesLS)
     localStorage.setItem('courses', JSON.stringify(coursesLS))
}


//clearing all the cart
function clearAll(e){
     // shoppingCart.innerHTML =''
     while(shoppingCart.firstChild){
          shoppingCart.removeChild(shoppingCart.firstChild)
     }
     //remove for local storage
     clearFromStorage()
}

function clearFromStorage(){
     localStorage.clear()
}

function loadFromStorage(){
     let coursesLS = getFromLocalStorage();

     coursesLS.forEach(function(course){
          const row = document.createElement('tr');

          //building a template to form the table row
          row.innerHTML = `
                <tr>
                <td><img src= '${course.images}' width='100'</td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td><a href='#' class='remove' data-id='${course.id}'>X</td>
                </tr>
          `;
                shoppingCart.appendChild(row);
     })
    
}


















































// // Variables
// const courses = document.querySelector('#courses-list'),
//       shoppingCartContent = document.querySelector('#cart-content tbody'),
//       clearCartBtn = document.querySelector('#clear-cart');



// // Listeners

// loadEventListeners();

// function loadEventListeners() {
//      // When a new course is added
//      courses.addEventListener('click', buyCourse);

//      // When the remove button is clicked
//      shoppingCartContent.addEventListener('click', removeCourse);

//      // Clear Cart Btn
//      clearCartBtn.addEventListener('click', clearCart);

//      // Document Ready
//      document.addEventListener('DOMContentLoaded', getFromLocalStorage);
// }





// // Functions
// function buyCourse(e) {
//      e.preventDefault();
//      // Use delegation to find the course that was added
//      if(e.target.classList.contains('add-to-cart')) {
//           // read the course values
//           const course = e.target.parentElement.parentElement;

//           // read the values
//           getCourseInfo(course);
//      }
// }
// // Reads the HTML information of the selected course
// function getCourseInfo(course) {
//      // Create an Object with Course Data
//      const courseInfo = {
//           image: course.querySelector('img').src,
//           title: course.querySelector('h4').textContent,
//           price: course.querySelector('.price span').textContent,
//           id: course.querySelector('a').getAttribute('data-id')
//      }
//      // Insert into the shopping cart
//      addIntoCart(courseInfo);
// }
// // Display the selected course into the shopping cart

// function addIntoCart(course) {
//      // create a <tr>
//      const row = document.createElement('tr');

//      // Build the template
//      row.innerHTML = `
//           <tr>
//                <td>
//                     <img src="${course.image}" width=100>
//                </td>
//                <td>${course.title}</td>
//                <td>${course.price}</td>
//                <td>
//                     <a href="#" class="remove" data-id="${course.id}">X</a>
//                </td>
//           </tr>
//      `;
//      // Add into the shopping cart
//      shoppingCartContent.appendChild(row);

//      // Add course into Storage
//      saveIntoStorage(course);
// }

// // Add the courses into the local storage

// function saveIntoStorage(course) {
//      let courses = getCoursesFromStorage();

//      // add the course into the array
//      courses.push(course);

//      // since storage only saves strings, we need to convert JSON into String
//      localStorage.setItem('courses', JSON.stringify(courses) );
// }

// // Get the contents from storage
// function getCoursesFromStorage() {

//      let courses;

//      // if something exist on storage then we get the value, otherwise create an empty array
//      if(localStorage.getItem('courses') === null) {
//           courses = [];
//      } else {
//           courses = JSON.parse(localStorage.getItem('courses') );
//      }
//      return courses;

// }

// // remove course from the dom
// function removeCourse(e) {
//      let course, courseId;

//      // Remove from the dom
//      if(e.target.classList.contains('remove')) {
//           e.target.parentElement.parentElement.remove();
//           course = e.target.parentElement.parentElement;
//           courseId = course.querySelector('a').getAttribute('data-id');
//      }
//      console.log(courseId);
//      // remove from the local storage
//      removeCourseLocalStorage(courseId);
// }
// // remove from local storage
// function removeCourseLocalStorage(id) {
//      // get the local storage data
//      let coursesLS = getCoursesFromStorage();

//      // loop trought the array and find the index to remove
//      coursesLS.forEach(function(courseLS, index) {
//           if(courseLS.id === id) {
//                coursesLS.splice(index, 1);
//           }
//      });

//      // Add the rest of the array
//      localStorage.setItem('courses', JSON.stringify(coursesLS));
// }

// // Clears the shopping cart
// function clearCart() {
//      // shoppingCartContent.innerHTML = '';

//      while(shoppingCartContent.firstChild) {
          // shoppingCartContent.removeChild(shoppingCartContent.firstChild);
//      }

//      // Clear from Local Storage
//      clearLocalStorage();
// }
// // Clears the whole local storage
// function clearLocalStorage() {
//      localStorage.clear();
// }

// // Loads when document is ready and print courses into shopping cart

// function getFromLocalStorage() {
//      let coursesLS = getCoursesFromStorage();

//      // LOOP throught the courses and print into the cart
//      coursesLS.forEach(function(course) {
//           // create the <tr>
//           const row = document.createElement('tr');

//           // print the content
//           row.innerHTML = `
//                <tr>
//                     <td>
//                          <img src="${course.image}" width=100>
//                     </td>
//                     <td>${course.title}</td>
//                     <td>${course.price}</td>
//                     <td>
//                          <a href="#" class="remove" data-id="${course.id}">X</a>
//                     </td>
//                </tr>
//           `;
//           shoppingCartContent.appendChild(row);
//      });
// }