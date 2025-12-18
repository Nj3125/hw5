/*
File: Board.js
GUI Assignment:  Scrabble [HW5]
Nicholas Johnson, UMass Lowell Computer Science, Nicholas_Johnson5@student.uml.edu 
Copyright (c) 2025 by Nicholas Johnson.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
Template for header made by Wenjin Zhou and provided in the HW1 pdf.
*/

// Spawns all board targets:
for (let i = 1; i <= 15; i++) {
    if (i === 3 || i === 13) {  // Hardcoded double word score targets:
        $(".board").append(`<div class="board-slot target DW" data-target="${i}"></div>`);
    } else if (i === 7 || i === 9) {  // Hardcoded double letter score targets:
        $(".board").append(`<div class="board-slot target DL" data-target="${i}"></div>`);
    } else {  // All other targets:
        $(".board").append(`<div class="board-slot target" data-target="${i}"></div>`);
    }
}