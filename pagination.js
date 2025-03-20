"use strict";

let currentPage = 1;
let lastFetchTime = 0;

async function fetchPosts(page) {
  try {
    let now = Date.now();
    if (now - lastFetchTime < 2000) {
      console.log("Rate limit exceeded. Please wait.");
      return;
    }

    lastFetchTime = now;

    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    renderPosts(data);
  } catch (error) {
    if (error) {
      console.log("Error fetching posts");
    }
    console.log(error);
  }
}

function renderPosts(allTenPosts) {
  const div = document.getElementById("output-here");
  div.innerHTML = "";
  const ul = document.createElement("ul");

  allTenPosts.forEach((post) => {
    const li = document.createElement("li");
    li.innerText = post.title;
    ul.appendChild(li);
  });
  div.appendChild(ul);
}
// Event Listeners
document.getElementById("next").addEventListener("click", () => {
  currentPage++;
  fetchPosts(currentPage);
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--; // application state
    fetchPosts(currentPage);
  }
});

// Get the party started - init
fetchPosts(currentPage);
