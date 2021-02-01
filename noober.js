async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides
  let ride = []
  let outputElement = document.querySelector('.ridesContainer')

  function buildLeg(passenger) {
    // passengerName = `${passenger.passengerDetails.first} ${passenger.passengerDetails.last}`
    // passengerPhone = `${passenger.passengerDetails.phoneNumber}`
    // passengerNumberOfPassengers = passenger.numberOfPassengers
    // passengerPickupAddressLine1 = passenger.pickupLocation.address
    // passengerPickupAddressLine2 = `${passenger.pickupLocation.city}, ${passenger.pickupLocation.state} ${passenger.pickupLocation.zip}`
    // passengerDropoffAddressLine1 = passenger.dropoffLocation.address
    // passengerDropoffAddressLine2 = `${passenger.dropoffLocation.city}, ${passenger.dropoffLocation.state} ${passenger.dropoffLocation.zip}`
    
    // HTML injection goes here
  }

  for (let i = 0; i < json.length; i++) {
    ride = json[i]
    if (ride.length > 1) {
      // If there are more than 1 riders, it must be a Noober Pool
      // console.log(`${ride.length} legs - Noober Pool - Ride ${i}`)
      outputElement.insertAdjacentHTML('beforeend', ` 
        <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          <i class="fas fa-car-side"></i>
          <span>Noober Pool</span>
        </h1>
      `)
      // Passenger 2 details
      // let passenger2 = ride[1]
      // buildLeg(passenger2)

      //Passenger 3 details, if present
      if (ride.length == 3) {
        // let passenger3 = ride[2]
        // buildLeg(passenger3)
        
      }
    } else if (ride[0].purpleRequested == true) {
      // console.log(`Purple is ${ride[0].purpleRequested} - Noober Purple - Ride ${i}`)
      outputElement.insertAdjacentHTML('beforeend', ` 
        <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          <i class="fas fa-car-side"></i>
          <span>Noober Purple</span>
        </h1>
    `)


    } else if (ride[0].numberOfPassengers > 3) {
      // console.log(`${ride[0].numberOfPassengers} riders - Noober XL - Ride ${i}`)
      outputElement.insertAdjacentHTML('beforeend', ` 
        <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          <i class="fas fa-car-side"></i>
          <span>Noober XL</span>
        </h1>
      `)

    } else {
      // console.log(`Noober X - Ride ${i}`)
      outputElement.insertAdjacentHTML('beforeend', ` 
        <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          <i class="fas fa-car-side"></i>
          <span>Noober X</span>
        </h1>
      `)
    }
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded)

