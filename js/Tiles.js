/*
File: Tile.js
GUI Assignment:  Scrabble [HW5]
Nicholas Johnson, UMass Lowell Computer Science, Nicholas_Johnson5@student.uml.edu 
Copyright (c) 2025 by Nicholas Johnson.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
Template for header made by Wenjin Zhou and provided in the HW1 pdf.
*/

let totalScore = 0
let posScore = 0
let allTiles = [];

$.getJSON("../graphics_data/pieces.json", function(data) {
    // Add all the pieces to the array:
    data.pieces.forEach(piece => {
        for (let i = 0; i < piece.amount; i++) {
            allTiles.push(piece);
        }
    });

    // Shuffle the full pool:
    shuffleArray(allTiles);

    // Draw only 5 tiles (splice takes them out of allTiles):
    const hand = allTiles.splice(0, 7);

    // Create each tile's element:
    hand.forEach((piece, index) => {
        const tile = $(`
            <div class="tile source"
                data-letter="${piece.letter}"
                data-value="${piece.value}">
            </div>
        `);

        tile.css({
            backgroundImage: `url('../graphics_data/Scrabble_Tiles/Scrabble_Tile_${piece.letter}.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "50px",
            height: "50px"
        });

        $(".rack-slot").eq(index).append(tile);
    });

    // Make each of them draggable:
    $(".source").draggable({
        revert: "invalid",
        start: function (event, ui) {
            $(this).css("z-index", 1000);
        }
    });
});

// Defines when a tile can be dropped onto a board slot
$(".board-slot").droppable({
    accept: function (draggable) {
        const $slot = $(this);

        // Block if slot already has a tile:
        if ($slot.find(".tile").length > 0) {
            return false;
        }

        // First tile can go anywhere:
        if (isBoardEmpty()) {
            return true;
        }
        // Else see if the tile is next to another tile:
        const index = parseInt($slot.data("target"), 10);

        const left  = $(`.board-slot[data-target="${index - 1}"]`);
        const right = $(`.board-slot[data-target="${index + 1}"]`);

        return (
            left.find(".tile").not(draggable).length > 0 ||
            right.find(".tile").not(draggable).length > 0
        );
    },
    tolerance: "pointer",

    // Snap it into place:
    drop: function (event, ui) {
        const $slot = $(this);
        const $tile = ui.draggable;

        $slot.append($tile);

        $tile.css({
            position: "relative",
            top: 0,
            left: 0,
            "z-index": 1
        });

        // Snaps tile back to parent:
        $tile.draggable("option", "revert", "invalid");
        // Updates score
        calculateScore();
    }
});

// Calculate possible score dyanmically:
function calculateScore() {
    let letterSum = 0;
    let wordMultiplier = 1;

    // Gather the sum and relevant multipliers:
    $(".board-slot").each(function () {
        const $slot = $(this);
        const $tile = $slot.find(".tile");

        if (!$tile.length) return;

        let value = Number($tile.data("value"));

        // Double letter:
        if ($slot.hasClass("DL")) {
            value *= 2;
        }

        letterSum += value;

        // Double word:
        if ($slot.hasClass("DW")) {
            wordMultiplier *= 2;
        }
    });

    // Pos score is updated:
    posScore = letterSum * wordMultiplier;
    $("#pos-score").text(`Possible Score: ${posScore}`);
}

// Defines when a tile can be dropped into a rack slot:
$(".rack-slot").droppable({
    accept: function(draggable) {
        const $slot = $(this);

        // Only accept if the slot is empty:
        return $slot.find(".tile").length === 0;
    },
    tolerance: "pointer",
    drop: function (event, ui) {
        const $slot = $(this);
        const $tile = ui.draggable;

        // Move tile into rack slot
        $slot.append($tile);

        $tile.css({
            top: 0,
            left: 0,
            position: "relative",
            "z-index": 1
        });

        $tile.draggable("option", "revert", "invalid");

        // Update the score:
        calculateScore();
    }
});

// Shuffles an array:
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Determines if board is empty:
function isBoardEmpty() {
    return $(".board-slot .tile").length === 0;
}

// Add the pos score to total score and then replenish tiles:
$("#submit-word").on("click", function () {

    const turnScore = posScore;
    if (turnScore === 0) return;
    totalScore += turnScore;
    $("#total-score").text(`Total Score: ${totalScore}`);

    $(".board-slot .tile").remove();

    refillRack();
});

// Reloads the page on restart:
$("#restart-game").on("click", function () {
    location.reload();
});

// Replenishes the rack:
function refillRack() {
    $(".rack-slot").each(function () {
        if ($(this).find(".tile").length > 0) return;
        if (allTiles.length === 0) return;

        const piece = allTiles.pop();
        const tile = createTile(piece);
        $(this).append(tile);
    });
}

// Creates a HTML element tile from the passed piece data:
function createTile(piece) {
    const tile = $(`
        <div class="tile source"
             data-letter="${piece.letter}"
             data-value="${piece.value}">
        </div>
    `);

    tile.css({
        backgroundImage: `url('../graphics_data/Scrabble_Tiles/Scrabble_Tile_${piece.letter}.jpg')`,
        backgroundSize: "cover",
        width: "50px",
        height: "50px"
    });

    tile.draggable({
        revert: "invalid",
        start: function () {
            $(this).css("z-index", 1000);
        }
    });

    return tile;
}