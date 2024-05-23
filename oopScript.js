'use strict'
//Months 
//Selecting elemtents

const form = document.querySelector("form");
const workoutList = document.querySelector(".workouts");
const inputType = document.querySelector(".input_type");
const inputDistance = document.querySelector(".input_distance");
const inputDuration = document.querySelector(".input_duration");
const inputCadence = document.querySelector(".input_cadence");
const inputElevation = document.querySelector(".input_elevation");

class App {
    #map;
    #mapEvent;
    #workouts = [];
    constructor() {
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener("keydown", this._newWorkout.bind(this))
        inputType.addEventListener('change', this._toggleElevationField.bind(this));
        workoutList.addEventListener('click', this._actions.bind(this));
    }
    //Methods
    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                // alert("Could not get your position");
            })
        }
    }
    _loadMap(position) {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
            attribution: '&copy; <hidden-formhref="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.addEventListener('click', this._showForm.bind(this));
        this.#workouts.forEach(work => {

            this._addWorkoutToMap(work);
        });
    }
    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove("hidden-form");
        inputDistance.focus();
    }
    _toggleElevationField() {
        if (inputType.value == 'running') {
            inputCadence.parentElement.classList.remove("hidden-row");
            inputCadence.classList.remove("form_row_hidden");
            inputElevation.parentElement.classList.add("hidden-row");
        }
        else {
            inputCadence.parentElement.classList.add("hidden-row");
            inputElevation.classList.remove("form_row_hidden");
            inputElevation.parentElement.classList.remove("hidden-row");
        }
    }
    _newWorkout(key) {
        if (key.code === "Enter") {

            const validsInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
            const allPostive = (...inputs) => inputs.every(inp => inp > 0);

            //get data from form
            //the plus (+) => is unry opertor used to convert any thing to number
            const type = inputType.value;
            const distance = +inputDistance.value;
            const duration = +inputDuration.value;
            const { lat, lng } = this.#mapEvent.latlng;
            let workout;
            if (type === 'running') {
                const cadence = +inputCadence.value;
                //Check if data is valid
                if (!validsInputs(distance, duration, cadence) || !allPostive(distance, duration, cadence)) {
                    return alert("inputs must be a postive number");
                }
                workout = new Running([lat, lng], distance, duration, cadence);
            }
            if (type === 'cycling') {
                const elevation = +inputElevation.value;

                //Check if data is valid
                if (!validsInputs(distance, duration, elevation) || !allPostive(distance, duration, elevation)) {
                    return alert("inputs must be a postive number");
                }
                workout = new Cycling([lat, lng], distance, duration, elevation);
            }
            //Adding workout to the map and list
            this.#workouts.push(workout);
            this._addWorkoutToMap(workout);
            this._addWorkoutToList(workout);
            //Hide the form 
            this._hideForm();
            this._setLocalStorage();
        }
    }
    _addWorkoutToMap(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(
                `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
            )
            .openPopup();
    }
    _addWorkoutToList(workout) {
        let html = `
        <li class="workout ${workout.type}" data-id= "${workout.id}">
        <h3>${workout.description}</h3>
        <div class="workout-details">
          <span class="workout-icon">🚴‍♀️</span>
          <span class="workout-value">${workout.distance}</span>
          <span class="workout-unit">KM</span>
        </div>
        <div class="workout-details">
          <span class="workout-icon">⏱</span>
          <span class="workout-value">${workout.duration}</span>
          <span class="workout-unit">MIN</span>
        </div>
        `;
        if (workout.type === 'running')
            html += `
        <div class="workout-details">
          <span class="workout-icon">⚡️</span>
          <span class="workout-value">${workout.pace}</span>
          <span class="workout-unit">KM|H</span>
        </div>
        <div class="workout-details">
        <span class="workout-icon">🦶🏼</span>
        <span class="workout-value">${workout.cadence}</span>
        <span class="workout-unit">spm</span>
        </div>
        </li>`;
        if (workout.type === 'cycling')
            html += `
            <div class="workout-details">
                <span class="workout-icon">⚡️</span>
                <span class="workout-value">${workout.speed}</span>
                <span class="workout-unit">km/h</span>
            </div>
            <div class="workout-details">
                <span class="workout-icon">⛰</span>
                <span class="workout-value">${workout.elevation}</span>
                <span class="workout-unit">m</span>
            </div>
      </li>
        `;

        workoutList.insertAdjacentHTML("afterbegin", html);
    }
    _hideForm() {
        form.classList.add("hidden-form");
        inputCadence.value = inputDistance.value = inputElevation.value = inputDuration.value = "";
    }
    _setLocalStorage() {
        //If you eant to set ann object on local storage use JSON.stringfy
        window.localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }
    _getLocalStorage() {
        //To convert the string to an object use json parse
        const data = JSON.parse(localStorage.getItem("workouts"));

        if (!data) return;
        this.#workouts = data;
        this.#workouts.forEach(work => {
            this._addWorkoutToList(work);
        });
    }
    _moveToPopup(workoutEl) {
        //Closest is the opposite of query selctor => getting the nearest class to top
        // const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, 13);
    }
    _actions(e) {
        const ele = e.target;
        const workoutEl = ele.closest('.workout');
        const button = ele.closest('.btn');
        //Check if element is edti or delete btn
        if (button) {
            if (button.dataset.type === 'delete') {
                this._deleteWorkout(workoutEl);
                return;
            }
        }

        this._moveToPopup(workoutEl);
    }
    _deleteWorkout(workoutEl) {
        //Remove this workout from workouts array
        this.#workouts = this.#workouts.filter(work => work.id !== workoutEl.dataset.id);

        //Delete workout element
        workoutList.removeChild(workoutEl);

        //Remove workout from map

        //Add the new workouts to local stoarge
        this._setLocalStorage();
    }
}

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    // #curMonth = months[curDate.getMonth()];
    // #curDay = curDate.getDate();
    constructor(coords, distance, duration) {
        this.coords = coords; // [let,lng]
        this.distance = distance; // in km
        this.duration = duration; // min
    }
    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} 
        ${this.date.getDate()}`;
    }
}
class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this._calcPace();
        this._setDescription();
    }
    _calcPace() {
        //min / km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this._calcSpeed();
        this._setDescription();
    }
    _calcSpeed() {
        //km / h
        this.speed = this.distance / this.duration;
        return this.speed;
    }
}
const app = new App();
