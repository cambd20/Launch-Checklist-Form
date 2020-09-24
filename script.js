window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
       let pilotName = document.querySelector("input[name=pilotName]");
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel = document.querySelector("input[name=fuelLevel]");
       let cargoMass = document.querySelector("input[name=cargoMass]");
       
       event.preventDefault();

       if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
           alert("All fields required."); 
        } else if ( isNaN (fuelLevel.value) || isNaN (cargoMass.value) || !isNaN (pilotName.value) || !isNaN (copilotName.value) ){ // validate data types
            alert("Please enter valid information for each field"); 
        } else { 
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready for launch`;
            document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
            
            fuelLevel= Number(fuelLevel.value);
            cargoMass = Number(cargoMass.value);

            if (fuelLevel < 10000 || cargoMass > 10000){
               document.getElementById("faultyItems").style.visibility = "visible";
               let launchStatus = document.getElementById("launchStatus");
                  launchStatus.innerHTML = "Shuttle isn't ready for launch";
                  launchStatus.style.color = "red";
                     if (fuelLevel < 10000) {
                        document.getElementById("fuelStatus").innerHTML = "Not enough fuel for the journey.";
                     } 
                     if (cargoMass > 10000) {
                        document.getElementById("cargoStatus").innerHTML = "Too much mass for the shuttle to take off.";
                     } 
            } else if (fuelLevel >= 10000 || cargoMass <= 10000) {
               document.getElementById("faultyItems").style.visibility = "visible";
               launchStatus.style.color = "green";
               launchStatus.innerHTML = "Shuttle is ready for launch!";
               document.getElementById("fuelStatus").innerHTML = "Fuel level is high enough for launch";
               document.getElementById("cargoStatus").innerHTML = "Cargo mass is low enough for launch";
            };
        }
   });
   });

  fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         response.json().then( function(json) {
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[3].name}</li>
                  <li>Diameter: ${json[3].diameter}</li>
                  <li>Star: ${json[3].star}</li>
                  <li>Distance from Earth: ${json[3].distance}</li>
                  <li>Number of Moons: ${json[3].moons}</li>
               </ol>
               <img src="${json[3].image}">
            `
         });
      });   
      
