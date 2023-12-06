//DO AFTER PAGE LOADED
document.addEventListener("DOMContentLoaded", () => {
  get_new_word();
  const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", ({ target }) => {
      if (is_game_over) {
        ok_selected = window.confirm("Game is already over. Another game?");
        if (ok_selected) {
          location.reload();
        } else {
          return;
        }
      }

      const letter = target.getAttribute("data-key");

      if (letter === "ENTER") {
        handle_submit();
        return;
      }

      if (letter === "DEL") {
        handle_delete();
        return;
      }

      update_guessed_words(letter);
    });
  }
});

//VARIABLES
let guessed_words = [[]];
let available_square = 1;
let word_list;
let word;
let guessed_word_count = 0;
let is_game_over = false;

/*
=========================================================
GAME HANDLING
=========================================================
*/

//FETCH WORD_LIST.JSON AND APPLY NEW WORD
async function get_new_word() {
  try {
    const response = await fetch("./word_list.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const word_list_data = await response.json();

    word_list = word_list_data.words;

    const random_index = Math.floor(Math.random() * word_list.length);
    word = word_list[random_index];
  } catch (error) {
    console.error("Error fetching word list: ", error);
  }
}

//UPDATE GUESS WORD EVERY INPUT
function update_guessed_words(letter) {
  const current_word_array = get_current_word_array();
  if (current_word_array && current_word_array.length < 5) {
    current_word_array.push(letter);

    const available_square_element = document.getElementById(
      `square-${available_square}`
    );

    available_square_element.textContent = letter;
    available_square = available_square + 1;
  }
}

/*
=========================================================
ANSWER HANDLING
=========================================================
*/

//HANDLE USER SUBMISSION
function handle_submit() {
  const current_word_array = get_current_word_array();
  const current_word = current_word_array.join("");
  const is_in_word_list = word_list.includes(current_word.toLowerCase());
  if (is_in_word_list) {
    if (current_word_array.length !== 5) {
      window.alert("Word must be 5 letters");
    } else {
      const first_letter_id = guessed_word_count * 5 + 1;
      const interval = 250;

      current_word_array.forEach((letter, index) => {
        setTimeout(() => {
          const tile_class = get_tile_class(
            letter.toLowerCase(),
            index,
            current_word_array
          );
          if (tile_class) {
            console.log(tile_class);
            const letter_id = first_letter_id + index;

            const letter_element = document.getElementById(
              `square-${letter_id}`
            );

            letter_element.classList.add("animate__flipInX");
            letter_element.classList.add(tile_class);
            const key_element = document.querySelector(`[data-key=${letter}]`);
            key_element.classList.add(tile_class);
          }
        }, interval * index);
      });
      guessed_word_count += 1;
      check_word(current_word);

      guessed_words.push([]);
    }
  } else {
    window.alert("Word is not recognised!");
  }
}

//HANDLE LETTER DELETION
function handle_delete() {
  const current_word_array = get_current_word_array();

  if (!current_word_array.length) {
    return;
  }

  current_word_array.pop();

  guessed_words[guessed_words.length - 1] = current_word_array;

  const last_letter_element = document.getElementById(
    `square-${available_square - 1}`
  );
  last_letter_element.textContent = "";

  available_square -= 1;
}

//VERIFY THE WORD INPUT
function check_word(current_word) {
  if (current_word.toLowerCase() == word.toLowerCase()) {
    ok_selected = window.confirm("Congratulations. Another game?");
    is_game_over = true;
    if (ok_selected) {
      location.reload();
    }
  }
  if (
    guessed_words.length === 6 &&
    current_word.toLowerCase() != word.toLowerCase()
  ) {
    ok_selected = window.confirm(
      `You lost, the word is ${word}. Another game?`
    );
    is_game_over = true;
    if (ok_selected) {
      location.reload();
    }
  }
}

/*
=========================================================
UTILITIES
=========================================================
*/

//GET THE CURRENT WORD ARRAY
function get_current_word_array() {
  return guessed_words[guessed_words.length - 1];
}

//GET THE INDICES OF THE LETTER
function get_indices_of_letter(letter, array) {
  let indices = [];
  let index = array.indexOf(letter);
  while (index != -1) {
    indices.push(index);
    index = array.indexOf(letter, index + 1);
  }
  return indices;
}

//GET THE TILE CLASS FOR THE SQUARE AND KEYBOARD TO UPDATE THEIR COLORS
function get_tile_class(letter, index, current_word_array) {
  const is_letter_correct = word.includes(letter);
  if (!is_letter_correct) {
    return "incorrect-letter";
  }

  const letter_in_that_position = word.charAt(index);
  const is_position_correct = letter === letter_in_that_position;
  if (is_position_correct) {
    return "correct-letter-and-position";
  }

  const is_guessed_more_than_once =
    current_word_array.filter((l) => l === letter).length > 1;

  if (!is_guessed_more_than_once) {
    return "correct-letter";
  }

  const exixts_more_than_once =
    word.split("").filter((l) => l === letter).length > 1;

  if (exixts_more_than_once) {
    return "correct-letter";
  }

  const has_been_guessed_already = current_word_array.indexOf(letter) < index;
  const indices = get_indices_of_letter(letter, word.split(""));
  const other_indices = indices.filter((i) => i !== index);
  const is_guessed_correctly_later = other_indices.some(
    (i) => i > index && current_word_array[i] === letter
  );

  if (!has_been_guessed_already && !is_guessed_correctly_later) {
    return "correct-letter";
  }

  return "incorrect-letter";
}
