'use strict'
//Months 
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//Selecting elemtents

// const form = document.querySelector("form");
// const workoutList = document.querySelector(".workouts");
// const inputType = document.querySelector(".input_type");
// const inputDistance = document.querySelector(".input_distance");
// const inputDuration = document.querySelector(".input_duration");
// const inputCadence = document.querySelector(".input_cadence");
// const inputElevation = document.querySelector(".input_elevation");
// const curDate = new Date();
// const curMonth = months[curDate.getMonth()];
// const curDay = curDate.getDate();

// let map;
// let mapEvent;
// // console.log(inputType.value);
// // const addWorkout()
// // {
// //     const li = document.createElement('li');
// //     const h3 = document.createElement('h3');
// //     const div = document.createElement('div');
// //     const span = document.createElement('h3');
// // }
// // const arr2 = [1, 2, 3, 3];
// // console.log(arr2.some((val) => {
// //     return val == 3;
// // }));


// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         const { latitude, longitude } = position.coords;
//         const coords = [latitude, longitude];
//         // console.log(coords);
//         map = L.map('map').setView(coords, 13);

//         L.tileLayer('https://tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
//             attribution: '&copy; <hidden-formhref="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         map.addEventListener('click', function (mapE) {
//             mapEvent = mapE;

//             //Show Workout form
//             form.classList.remove("hidden-form");
//             inputDistance.focus();
//         })

//     }, function () {
//         // alert("Could not get your position");
//     })
// }
// // const formInputValidation = function (newCoords) {
// //     form.addEventListener("keydown", function (key) {
// //         if (key.code === "Enter") {
// //             // console.log(inputDistance.value, inputDuration.value, inputCadence.value);
// //             if (!inputDistance.value || inputDistance.value < 0 || !inputDuration.value ||
// //                 inputDuration.value < 0 || !inputCadence.value || inputCadence.value < 0) {
// //                 alert("inputs must be a postive number");
// //             }
// //             else {
// //                 let workoutType = inputType.value;
// //                 console.log(newCoords);
// //                 console.log(inputType.value);
// //                 //Adding workout to the map and list
// //                 addToMap(map, newCoords, workoutType);
// //                 // addToList();
// //             }
// //         }
// //     })
// // }
// const resetInput = function () {
//     console.log("i reset the inuts");
//     inputCadence.value = "";
//     inputDistance.value = "";
//     inputElevation.value = "";
//     inputDuration.value = "";
// }
// const addToMap = function (newCoords, workoutType) {
//     L.marker(newCoords)
//         .addTo(map)
//         .bindPopup(
//             L.popup({
//                 maxWidth: 250,
//                 minWidth: 100,
//                 autoClose: false,
//                 closeOnClick: false,
//                 className: `${workoutType}-popup`
//             })
//         )
//         .setPopupContent(`${workoutType} on ${curMonth} ${curDay}`)
//         .openPopup();
// }
// const addToList = function (workoutType) {
//     console.log(workoutType);
//     const details = [
//         ['🚴‍♀️', `${inputDistance.value}`, 'KM'],
//         ['⏱', `${inputDuration.value}`, 'MIN'],
//         ['⚡️', `${inputDistance.value / inputDuration.value}`, 'KM|H'],
//         [['🦶🏼', `${inputCadence.value}`, 'SPM'], ['⛰', `${inputElevation.value}`, 'M']]
//     ]
//     let li = document.createElement('li');
//     li.classList.add(`workout`);
//     li.classList.add(`${workoutType}`);

//     const h3 = document.createElement('h3');
//     h3.classList.add("workout-title");
//     h3.textContent = `${workoutType} on ${curMonth} ${curDay}`;

//     li.appendChild(h3);

//     for (let i = 0; i < 4; i++) {
//         let div = document.createElement('div');
//         div.classList.add("workout-details");
//         //Create spans
//         const icon_span = document.createElement('span');
//         const value_span = document.createElement('span');
//         const unit_span = document.createElement('span');

//         if (i == 3) {
//             console.log("I == 3");
//             console.log(`Workout type now ${workoutType}`);
//             icon_span.textContent = workoutType === 'running' ? details[i][0][0] : details[i][1][0];
//             value_span.textContent = workoutType === 'running' ? details[i][0][1] : details[i][1][1];
//             unit_span.textContent = workoutType === 'running' ? details[i][0][2] : details[i][1][2];
//         }
//         else {
//             icon_span.textContent = details[i][0];
//             value_span.textContent = details[i][1];
//             unit_span.textContent = details[i][2];
//         }

//         icon_span.classList.add("workout-icon");
//         value_span.classList.add("workout-value");
//         unit_span.classList.add("workout-unit");

//         div.appendChild(icon_span);
//         div.appendChild(value_span);
//         div.appendChild(unit_span);

//         li.appendChild(div);
//     }
//     workoutList.appendChild(li);
// }
// form.addEventListener("keydown", function (key) {
//     if (key.code === "Enter") {
//         //Check input Validation
//         const inputs = [inputDistance.value, inputDuration.value, [inputCadence.value, inputElevation.value]];
//         let inputValid = true;
//         console.log(inputs);
//         for (const [index, input] of inputs.entries()) {
//             if (index == 2) {
//                 const [sub1, sub2] = input;
//                 if (inputType.value == 'running' && (!sub1 || sub1 < 0)) {
//                     inputValid = false;
//                 }
//                 if (inputType.value == 'cycling' && (!sub2 || sub2 < 0)) {
//                     inputValid = false;
//                 }
//             }
//             else {
//                 if (!input || input < 0) {
//                     inputValid = false;
//                 }
//             }
//             if (!inputValid) {
//                 alert("inputs must be a postive number");
//                 break;
//             }
//         }
//         if (inputValid) {
//             const { lat, lng } = mapEvent.latlng;
//             const newCoords = [lat, lng];
//             let workoutType = inputType.value;

//             //Adding workout to the map and list
//             addToMap(newCoords, workoutType);
//             addToList(workoutType);
//             //Hide the form 
//             form.classList.add("hidden-form");
//             resetInput();
//         }
//     }
// })
// inputType.addEventListener('change', function (e) {
//     if (inputType.value == 'running') {
//         inputCadence.parentElement.classList.remove("hidden-row");
//         inputCadence.classList.remove("form_row_hidden");
//         inputElevation.parentElement.classList.add("hidden-row");
//     }
//     else {
//         inputCadence.parentElement.classList.add("hidden-row");
//         inputElevation.classList.remove("form_row_hidden");
//         inputElevation.parentElement.classList.remove("hidden-row");
//     }
// })

let arr = [1, 2, 3, 4];
arr = arr.filter(ele => ele != 1);
// console.log();
console.log(arr);
// console.log(arr.splice());
