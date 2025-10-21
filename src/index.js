// Function to display the quote in the #quote element using Typewriter effect
function displayQuote(response) {
  new Typewriter('#quote', {
    strings: response.data.answer, // API response text
    autoStart: true,
    delay: 50,
    cursor: "", // no blinking cursor
  });
}

// Function to fetch a quote from the API based on user input
function getQuote(event) {
  event.preventDefault();

  // Get the input value
  let inputElement = document.querySelector("#subject-field");
  let userTopic = inputElement.value.trim();

  // Define prompt and context for the AI
  let prompt = `Generate a quote about ${userTopic}.`;
  let context = `
    Generate a quote about the topic the user provides. 
    It must be short (no more than 18 words) and inspire the user. 
    The quote must include the exact word the user provides ("${userTopic}"). 
    Write the quote in plain text — do not include HTML tags or formatting. 
    Put quotation marks at the beginning and end of the quote, in a romantic way.
  `;

  // API Key (consider moving this to a secure environment variable)
  let apiKey = "8d54b800a79o3a3f274ta06a2117547b";

  // Show quote container and insert loading animation
  let quoteContainerElement = document.querySelector(".quote-container");
  quoteContainerElement.classList.remove("hidden");
  let quoteElement = document.querySelector("#quote");
  quoteElement.innerHTML = `<img src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/175/110/original/magicpen-removebg-preview.png?1761057041" class="magic-pen blinker"/>`;

  // Build API URL
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  // Fetch the quote
  axios.get(apiUrl).then(displayQuote);
}

// Attach event listener to the form
let searchFieldElement = document.querySelector("form");
searchFieldElement.addEventListener("submit", getQuote);
