/*
File: Rack.js
GUI Assignment:  Scrabble [HW5]
Nicholas Johnson, UMass Lowell Computer Science, Nicholas_Johnson5@student.uml.edu 
Copyright (c) 2025 by Nicholas Johnson.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
Template for header made by Wenjin Zhou and provided in the HW1 pdf.
*/

// Spawns all rack tiles:
for (let i = 0; i < 7; i++) {
    $("#tileRack").append(`
        <div class="rack-slot target" data-slot="${i}"></div>
    `);
}