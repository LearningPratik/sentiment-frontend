async function analyzeSentiment() {
            const text = document.getElementById("textInput").value;
            const resultDiv = document.getElementById("result");
            resultDiv.textContent = "Analyzing...";

            try {
                const response = await fetch("https://sentiment-backend-goga.onrender.com/predict", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: text })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    resultDiv.textContent = `Error: ${errorData.detail}`;
                    return;
                }

                const data = await response.json();
                resultDiv.textContent = `Sentiment: ${data.sentiment}`;
            } catch (error) {
                resultDiv.textContent = `Request failed: ${error}`;
            }
        }
