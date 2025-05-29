const API_URL = "http://localhost:8000";

async function analyzeSentiment() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value.trim();

  if (!text) {
    showError("Please enter some text to analyze.");
    return;
  }

  // Show loading state
  showLoading(true);
  hideResult();

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    showResult(data);
  } catch (error) {
    console.error("Error:", error);
    showError(
      "Failed to analyze sentiment. Make sure the API server is running on localhost:8000"
    );
  } finally {
    showLoading(false);
  }
}

function showResult(data) {
  const resultDiv = document.getElementById("result");
  const sentimentClass =
    data.sentiment === "positive" ? "positive" : "negative";
  const emoji = data.sentiment === "positive" ? "😊" : "😔";

  resultDiv.innerHTML = `
          <div class="sentiment-label">${emoji} ${data.sentiment}</div>
      `;

  resultDiv.className = `result ${sentimentClass} show`;
}

function showError(message) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="error">${message}</div>`;
  resultDiv.className = "result show";
}

function showLoading(show) {
  const loading = document.getElementById("loading");
  const button = document.querySelector(".analyze-btn");

  loading.style.display = show ? "block" : "none";
  button.disabled = show;
}

function hideResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("show");
}

// Allow Enter key to trigger analysis
document.getElementById("textInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter" && e.ctrlKey) {
    analyzeSentiment();
  }
});
