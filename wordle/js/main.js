document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "ENTER") {
        handle_submit();
        return;
      }

      update_guessed_words(letter);
    });
  }
});

let guessed_words = [[]];
let available_square = 1;
let word = "peopo";

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
  if (current_word_array.length !== 5) {
    window.alert("Word must be 5 letters");
  } else {
    const current_word = current_word_array.join("");
    check_word(current_word);

    guessed_words.push([]);
  }
}

function check_word(current_word) {
  if (current_word.toLowerCase() == word) {
    window.alert("Congratulations");
  }
  if (guessed_words.length === 6) {
    window.alert("You lost");
  }
}
