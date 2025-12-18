Right now, most of the required features are implemented, including:
• (4) letter tiles in the player’s “hand” are selected randomly from a data structure with the proper
distribution of the letters (code!) [Done]

• (4) letter tiles can be dragged-and-dropped onto target Scrabble squares [Done]

• (4) board includes at least two bonus squares [Done]

• (4) scoring is accurate and updates dynamically upon tile placement, correctly applying all
bonus square multipliers [Done]

• (3) any number of words can be played until the player wishes to quit or depletes all tiles [Done]

• (3) the board is cleared after each round so that a new word can be played [Done]

• (3) after playing a word, only the number of letter tiles needed to bring the player’s “hand” back 
to 7 tiles are selected [Done]

• (3) score is kept for multiple words until the user restart a new game (implement next vs. restart) [Done]

• (2) Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them anywhere
else, they will be bounced back to the “rack”. [Done]

• (2) Once the tile is placed on the Scrabble board, it can be moved back to the “rack”. [Done]

• (2) Except for the first letter, all sub-subsequent letters must be placed directly next to or below
another letter with no space. Else, they will bounce back to the “rack”. [Done]

• (2) user can always restart the game. [Done]

The only one that was  (argueably) not implemented:
• (4) program identifies which letter tile is dropped onto which Scrabble square
because while the program does read tile data, the letter is never actually read because it isnt used. The value of the tile is read though, so if
that is good enough then this can be added to the top list.

Right now the program has a bug where invalid word combos are allowed if you put in a full word and then remove a letter from the center.