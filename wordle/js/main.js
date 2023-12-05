document.addEventListener("DOMContentLoaded", () => {
  get_new_word();
  const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", ({ target }) => {
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

let guessed_words = [[]];
let available_square = 1;
let word_list;
let word;
let guessed_word_count = 0;

async function fetch_game_list() {
  try {
    const response = await fetch("./game_list.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const game_list = await response.json();
    return game_list;
  } catch (error) {
    console.error("Error fetching game list: ", error);
  }
}

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

function get_current_word_array() {
  return guessed_words[guessed_words.length - 1];
}

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
          const tile_color = get_tile_color(letter, index);
          const letter_id = first_letter_id + index;

          const letter_element = document.getElementById(`square-${letter_id}`);
          letter_element.classList.add("animate__flipInX");
          letter_element.style = `background-color:${tile_color}; border-color:${tile_color}`;
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

function handle_delete() {
  const current_word_array = get_current_word_array();
  const removed_letter = current_word_array.pop();
  guessed_words[guessed_words.length - 1] = current_word_array;
  const last_letter_element = document.getElementById(
    `square-${available_square - 1}`
  );
  last_letter_element.textContent = "";

  available_square -= 1;
}

function get_tile_color(letter, index) {
  const is_letter_correct = word.includes(letter.toLowerCase());
  const letter_in_that_position = word.charAt(index);
  const is_position_correct =
    letter.toLowerCase() === letter_in_that_position.toLowerCase();

  if (!is_letter_correct) {
    return "var(--wrong-letter-color)";
  }
  if (is_position_correct) {
    return "var(--correct-letter-color)";
  }
  return "var(--correct-letter-but-wrong-position-color)";
}

function check_word(current_word) {
  if (current_word.toLowerCase() == word.toLowerCase()) {
    window.alert("Congratulations");
  }
  if (
    guessed_words.length === 6 &&
    current_word.toLowerCase() != word.toLowerCase()
  ) {
    window.alert(`You lost, the word is ${word}`);
  }
}
