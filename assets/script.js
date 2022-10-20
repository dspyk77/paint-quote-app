// calculate wall sqft (L*H)
// painted sqft = wall sqft - windows area * number of windows - door area * number of doors - cabinets area - other object area * object area
// **** all input values should be stored in backend - marked with (-b) ****

//  when "start quote" button is clicked  - static button
  // display start quote section
    // display input field for room name 
    // display checkbox options and start room button
    // imput a room name (Kitchen, master bedroom ect)

// ask user what is being quoted in this room - check all that apply
  // checkbox options
    // walls <--- DONE
    // ceiling <--- DONE
    // cabinets <--- DONE
    // furniture <--- DONE

// when "start room" button clicked
  // store room name input value in roomName (.toUpper for page display?) -b possiblly the array name for backend functionality? 
  // check what boxes are selected
  // if no boxes are checked display error (please select what is being quoted in this room)
  // if one or more boxes are checked 
    // display forms for boxes checked
    // hide section

// if walls is checked 
  // display walls section with input field and "add walls" button

  // **** note for html - tell user to keep track of walls inout order. Suggest writing down a rough floor plan as they are messuring.
  // right down wall one - wall two ext apon input ****
    
  // input number of walls being painted
  // input price per sqft

  // when "add walls" button is clicked 
    // check if number of walls or price per sqft input value is null and greater than zero
      // if null pop error message module w/"continue" and "cancel" buttons
            // when "continue" button is clicked
              // hide module
              // display red border on null input fields
            // when "cancel" button is clicked
              // hide windows section
              // return

    // if number of walls input value is greater than zero
      // store number of walls input value in numOfWalls
      // display wall dementions section with input fields and "add to room" button
      // store price per sqf in paintRatePerSqft
      // hide input field

    // check value of numOfWalls
    // if value is 1 
      // display input length and height (ft) of wall one

    // if value is 2 display length and height input fields for two walls and run line 109 with applicable stored values
      // display input length and height (ft) of wall one
      // display input length and height (ft) of wall two

    // if value is 3 display length and height input fields for three walls and run line 109 with applicable stored values
      // display input length and height (ft) of wall one
      // display input length and height (ft) of wall two
      // display input length and height (ft) of wall three

    // if value is 4 display length and height input fields for four walls and run line 109 with applicable stored values 
      // display input length and height (ft) of wall one
      // display input length and height (ft) of wall two
      // display input length and height (ft) of wall three
      // display input length and height (ft) of wall four

  // when the "add to room" button is clicked
    // if value of numOfWalls is 1
      // store wall one's length input value in wallOneLength -b
      // store wall one's height input value in wallOneHeight -b
      // get the square feet of wall one - (wallOneLength * wallOneHeight)
      // store value in wallOneSqft -b

      // since only one room is painted
      // re assign value of wallOneSqft to roomOneTotalSqft -b

    // if value of numOfWalls is 2
      // store wall one's length input value in wallOneLength -b
      // store wall one's height input value in wallOneHeight -b
      // get the square feet of wall one - (wallOneLength * wallOneHeight)
      // store value in wallOneSqft -b

      // store wall two's length input value in wallTwoLength -b
      // store wall two's height input value in wallTwoHeight -b
      // get the square feet of wall two - (wallTwoLength * wallTwoHeight)
      // store value in walltwoSqft -b

      // get room total square feet before subtractions (wallOneSqft + walltwoSqft)
      // store in roomOneTotalSqft -b

    // if value of numOfWalls is 3
      // store wall one's length input value in wallOneLength -b
      // store wall one's height input value in wallOneHeight -b
      // get the square feet of wall one - (wallOneLength * wallOneHeight)
      // store value in wallOneSqft -b

      // store wall two's length input value in wallTwoLength -b
      // store wall two's height input value in wallTwoHeight -b
      // get the square feet of wall two - (wallTwoLength * wallTwoHeight)
      // store value in walltwoSqft -b

      // store wall three's length input value in wallThreeLength -b
      // store wall three's height input value in wallThreeHeight -b
      // get the square feet of wall three - (wallThreeLength * wallThreeHeight)
      // store value in wallThreeSqft -b

      // get room total square feet before subtractions (wallOneSqft + walltwoSqft + wallThreeSqft)
      // store in roomOneTotalSqft -b

    // if value of numOfWalls is 4
      // store wall one's length input value in wallOneLength -b
      // store wall one's height input value in wallOneHeight -b
      // get the square feet of wall one - (wallOneLength * wallOneHeight)
      // store value in wallOneSqft -b

      // store wall two's length input value in wallTwoLength -b
      // store wall two's height input value in wallTwoHeight -b
      // get the square feet of wall two - (wallTwoLength * wallTwoHeight)
      // store value in walltwoSqft -b

      // store wall three's length input value in wallThreeLength -b
      // store wall three's height input value in wallThreeHeight -b
      // get the square feet of wall three - (wallThreeLength * wallThreeHeight)
      // store value in wallThreeSqft -b

      // store wall four's length input value in wallFourLength
      // store wall four's height input value in wallFourHeight
      // get the square feet of wall one - (wallFourLength * wallFourHeight)
      // store value in wallFourSqft -b

      // get room total square feet before subtractions (wallOneSqft + walltwoSqft + wallThreeSqft + wallFourSqft)
      // store in roomTotalSqft -b

    // post var's containing value marked with -b to backend
    // hide section

    // non painted wall area section "Does this room have any wall area(s) not being painted? Things like windows, doors, other objects like cabinets or mirrors to paint around?" w/ yes and no button

    // if "no" button is clicked pass over select walls section
    // hide non painted wall area section

    // if yes button is clicked 
      // display select walls section
      // hide non painted wall area section

    // if numOfWalls value is 1 
      // dont display select walls section
      // hide non painted wall area section

    // section - Select walls with non painted areas 
    // display number of checkbox option based on numOfWalls value with "select walls" button
      // if numOfWalls = 2
      // example checkbox option 
        // Wall One
        // Wall Two

      // if numOfWalls = 3
      // example checkbox option 
        // Wall One
        // Wall Two
        // Wall Three 

      // when "select walls" button is clicked
        // display checkbox for Wall one with checkbox, "start" button and "done with walls" button
        // check all that apply
          // Windows
          // Doors
          // Other objects
    
  // when "start" button is clicked
    // for each wall selected
      // if windows is checked
        // display windows section w/ inputs fields, "add window group" button
        // input number of same size window(s)
        // input length and height of window(s) (ft)  

      // when "add window group" button is clicked
        // check if number or length and height input is null
          // if null pop error message module w/"continue" and "cancel" buttons
            // when "continue" button is clicked
              // hide module
              // display red border on null input fields
            // when "cancel" button is clicked
              // hide windows section
              // return

      // if input fields are not null
        // store number of same size windows input value in numOfWindows -b
        // store value of length in windowLength -b
        // store value of height in windowHeight -b
        // get square feet of each window - windowLength * windowHeight
        // store value in windowSqft -b
        // get total windows sqft - windowSqft * numOfWindows
        // store value of total window sqft in windowsTotalSqft -b
        // post input value var's to backend in object

        // pop up module 
          // do you need to add another window size? w/ "add new size" and "move on" button
          // if "add new size" button is clicked
            // clear input fields
            // repeat actions from when "add window group" button is clicked
          // if "move on" button is clicked
            // hide windows section
            // get each walls total painted square foot x is every wall iteration (wall[x]Sqft - newWindow.windowsTotalSqft[0] - newWindow.windowsTotalSqft[1])
            // store value in wall[x]PaintedSqft
    
    // for each wall selected
      // if doors is checked
        // display doors section w/ inputs fields, "add door group" button
        // input number of same size door(s) 
        // input length and height of door(s) (ft)

    // when "add door group" button is clicked
      // check if number or length and height input is null
        // if null pop error message module w/"continue" and "cancel" buttons
          // when "continue" button is clicked
            // hide module
            // display red border on null input fields
          // when "cancel" button is clicked
            // hide windows section
            // return

      // if input fields are not null
        // store number of same size doors input value in numOfDoors -b
        // store length's input value in doorLength -b
        // store height's input value in doorHeight -b
        // get square feet of each door (doorLength * doorHeight)
        // store value of door sqft in doorSqft -b
        // get total doors sqft - doorSqft * numOfDoors
        // store value of total window sqft in doorsTotalSqft -b
        // post input value var's to backend in object

        // pop up module 
          // do you need to add another door size? w/ "add new size" and "move on" button
          // if "add new size" button is clicked
            // clear input fields
            // repeat actions from when "add door group" button is clicked
          // if "move on" button is clicked
            // get each walls total painted square foot x is every wall iteration (wall[x]Sqft - newDoor.doorsTotalSqft[0] - newDoor.doorsTotalSqft[1])
            // store value in new wall[x]PaintedSqft
            // hide windows section

    // for each wall selected
      // if other object is checked
      // display other object section w/ inputs fields, "add object" button
      // input name of other to paint around (Cabinets, mirror ext)
      // input length and height of otherObjectName (ft)

    // when "add object" button is clicked
      // check if number or length and height input is null
        // if null pop error message module w/"continue" and "cancel" buttons
          // when "continue" button is clicked
            // hide module
            // display red border on null input fields
          // when "cancel" button is clicked
            // hide other object section
            // return

      // if input fields are not null
        // store othe objects name input value in objectName
        // store length's input value in objectLength
        // store height's input value in objectHeight
        // get the square foot of the other object (objectLength * objectHeight)
        // store value in objectSqft -b
        // post input value var's to backend in object

        // pop up module 
          // do you need to add another object? w/ "add new object" and "move on" button
            // if "add new object" button is clicked
              // clear input fields
              // repeat "add object" button actions
            // if "move on" button is clicked
              // get total sqft for all objects added (newObject.objectSqft[0] + newObject.objectSqft[1] + newObject.objectSqft[2]) ext.
              // get each walls total painted square foot x is every wall iteration (wall[x]Sqft - newObject.objectSqft[0] - newObject.objectSqft[1])
              // store value in new wall[x]PaintedSqft
              // hide windows section

    // when "done with walls" is clicked
      // get rooms new total painted square feet (wall[x]Sqft + wall[x]Sqft + wall[x]Sqft) 2 - 4 walls
      // store value in new roomTotalSqftPainted
      // get price to paint room (roomTotalSqftPainted * paintRatePerSqft)
      // store value in paintRoomPrice

  // if ceiling is checked
    // display ceiling section with length, width and price per sqft input field and "add to room button"
      // input ceiling length
      // input ceiling width
      // input ceiling price per sqft
    // when "add to room" button is clicked
      // check if length and width input is null
        // if null pop error message module w/"continue" and "cancel" buttons
          // when "continue" button is clicked
            // hide module
            // display red border on null input fields
          // when "cancel" button is clicked
            // hide ceiling section
            // return

      // if length and width input values are not null
        // store length's input value in ceilngLength
        // store width 's input value in ceilngWidth
        // store ceiling price per sqft in ceilingRatePerSqft 
        // get ceilings painted sqft (ceilngLength * ceilngWidth)
        // store in ceilingPaintedSqft
        // get price to paint ceiling rate (ceilingPaintedSqft * ceilingRatePerSqft)
        // store in paintCeilingPrice
        // post input values var's to backend in object
        // hide ceiling section 

  //  if cabinets are checked 
    // display cabinet section w/ number of bases, flat rate charge, number of cabinet doors, 
    // cabinetDoorRate, of cabinet drawrs, rate for cabinet drawrs input and "add to room" button

    // input number of bases 
    // input flat rate charge for bases
    // input number of cabinet doors
    // input flat rate for cabinet doors
    // input number of cabinet drawrs
    // input flat rate for cabinet drawrs

    // when "add cabinet" button is clicked 
      // check if input values are null
         // if null pop error message module w/"continue" and "cancel" buttons
          // when "continue" button is clicked
            // hide module
            // display red border on null input fields
          // when "cancel" button is clicked
            // hide cabinet section
            // return 

      // if input fieds are not null
        // store number of bases input value in numOfCabinetBases -b
        // store base flat rate charge input value in baseRate -b
        // store number of cabinet doors input value in numOfCabinetDoors -b
        // store cabinet doors rate input value in cabinetDoorRate -b
        // store number of cabinet drawrs input value in numOfCabinetDrawrs -b
        // store cabinet drawrs rate input value in cabinetDrawrRate -b
        // get total base rate charged (baseRate * numOfCabinetBases) 
        // store value in totalBaseRate -b
        // get total door rate charged (numOfCabinetDoors * cabinetDoorRate)
        // store value in totalCabinetDoorsRate
        // get total drawr rate charged (numOfCabinetDrawrs * cabinetDrawrRate)
        // store value in totalCabinetDrawrsRate -b
        // get total rate charged for cabinets (totalBaseRate + totalCabinetDoorsRate + totalCabinetDrawrsRate)
        // store value in cabinetPrice
        // post input values var's to backend in object

        // pop up module 
          // do you need to add another cabinet? w/ "add new cabinet" and "move on" button
            // if "add new cabinet" button is clicked
              // clear input fields
              // repeat actions when "add cabinet" button is clicked
            // if "move on" button is clicked
              // get total price for all cabinet's added (newCabinet.cabinetPrice[0] + newCabinet.cabinetPrice[1] + newCabinet.cabinetPrice[2]) ext.
              // store value in totalcabinetPrice
              // hide cabinet section

  // if furniture is checked 
    // display furniture section with furniture name, number of same size items (chairs, bedframes ext), flat rate per item and "add furniture" button

    // input furniture name
    // input number of same size items
    // input flat rate per item

    // when "add furniture" button is clicked 
      // check if input values are null
         // if null pop error message module w/"continue" and "cancel" buttons
          // when "continue" button is clicked
            // hide module
            // display red border on null input fields
          // when "cancel" button is clicked
            // hide furniture section
            // return

    // if input fieds are not null
      // store furniture name input value in furnitureName
      // store number items input value in numOfItems
      // store rate per item input value in furnitureRate
      // get total price for all items (numOfItems * furnitureRate)
      // store in furniturePrice

      // pop up module 
          // do you need to add more furniture? w/ "add more furniture" and "move on" button
            // if "add more furniture" button is clicked
              // clear input fields
              // repeat actions when "add furniture" button is clicked
            // if "move on" button is clicked
              // get total price for all cabinet's added (newCabinet.cabinetPrice[0] + newCabinet.cabinetPrice[1] + newCabinet.cabinetPrice[2]) ext.
              // store value in totalcabinetPrice
              // hide furnitur section
