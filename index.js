document.addEventListener("DOMContentLoaded", create_buttons);

function create_buttons() {
  fetch_game_list().then((game_list) => {
    let button_container = document.getElementsByClassName("button_container");
    for (let i = 0; i < game_list.length; i++) {
      let button = document.createElement("button");
      button.className = "pixel_button";
      button.textContent = format_display_text(game_list[i].game_name);
      button.onclick = function () {
        window.location.href = format_url_text(game_list[i].game_name);
      };

      button_container[0].appendChild(button);
    }
  });
}

function format_display_text(input) {
  let formatted_text = input.replace(/_/g, " ");
  formatted_text = formatted_text.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
  return formatted_text;
}

function format_url_text(input) {
  let formatted_text = input.replace(/[, ]/g, "").toLowerCase();
  return formatted_text;
}

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
