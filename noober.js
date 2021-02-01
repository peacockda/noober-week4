async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  // console.dir(json)
  
  // 🔥 start here: write code to loop through the rides
  let outputElement = document.querySelector('.rides')
  
  // printLeg() extracts data for one passed passenger and injects a
  // "ride box" for that rider and any additional passengers.
  function printLeg(passenger) {
    // Code block adapted from hw3. Could this be simplified by skipping variable assignments?
    // Shortened, yes, but would be less useable.
    passengerName = `${passenger.passengerDetails.first} ${passenger.passengerDetails.last}`
    passengerPhone = `${passenger.passengerDetails.phoneNumber}`
    // passengerNumberOfPassengers = passenger.numberOfPassengers
    passengerPickupAddressLine1 = passenger.pickupLocation.address
    passengerPickupAddressLine2 = `${passenger.pickupLocation.city}, ${passenger.pickupLocation.state} ${passenger.pickupLocation.zip}`
    passengerDropoffAddressLine1 = passenger.dropoffLocation.address
    passengerDropoffAddressLine2 = `${passenger.dropoffLocation.city}, ${passenger.dropoffLocation.state} ${passenger.dropoffLocation.zip}`
    
    // Enhancement for grammar
    if (passenger.numberOfPassengers == 1){
      numPassengers = '1 passenger'
    } else {
      numPassengers = `${passenger.numberOfPassengers} passengers`
      // console.log(`Multiple passengers for ${passengerName}`)
    }

    // Inject passenger box with relevant data.
    outputElement.insertAdjacentHTML('beforeend', ` 
      <div class="border-4 border-gray-900 p-4 my-4 text-left">
      <div class="flex">
        <div class="w-1/2">
          <h2 class="text-2xl py-1">${passengerName}</h2>
          <p class="font-bold text-gray-600">${passengerPhone}</p>
        </div>
        <div class="w-1/2 text-right">
          <span class="rounded-xl bg-gray-600 text-white p-2">
            ${numPassengers}
          </span>
        </div>
      </div>
      <div class="mt-4 flex">
        <div class="w-1/2">
          <div class="text-sm font-bold text-gray-600">PICKUP</div>
          <p>${passengerPickupAddressLine1}</p>
          <p>${passengerPickupAddressLine2}</p>
        </div>
        <div class="w-1/2">
          <div class="text-sm font-bold text-gray-600">DROPOFF</div>
          <p>${passengerDropoffAddressLine1}</p>
          <p>${passengerDropoffAddressLine2}</p>
        </div>
      </div>
    </div>
  `)
  }

  // printRide() accepts a ride and calls printLeg() for each leg of that ride
  function printRide(ride) {
    for (let j = 0; j < ride.length; j++) {
      let passenger = ride[j]
      printLeg(passenger)
    }
  }

  // printLevelOfService() prints an approriate service level header
  // based on the passed string
  function printLevelOfService(serviceLevel) {
    outputElement.insertAdjacentHTML('beforeend', ` 
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>Noober ${serviceLevel}</span>
      </h1>
    `)
  }

  // Determine level of service before writing anything
  for (let i = 0; i < json.length; i++) {
    let ride = json[i]
    let levelOfService = ''
    if (ride.length > 1) {
      levelOfService = 'Pool'
    } else if (ride[0].purpleRequested == true) {
      levelOfService = 'Purple'
    } else if (ride[0].numberOfPassengers > 3) {
      levelOfService = 'XL'
    } else {
      levelOfService = 'X'
    }
    // Print appropriate level of service header, then print the ride
    printLevelOfService(levelOfService)
    printRide(ride)
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded)