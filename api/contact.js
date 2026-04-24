document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("[name='name']").value;
  const email = document.querySelector("[name='email']").value;
  const message = document.querySelector("[name='message']").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Inquiry sent successfully.");
    } else {
      alert("Error: " + (data.error || "Something went wrong"));
    }

  } catch (error) {
    console.error("Frontend error:", error);
    alert("Unable to send the inquiry right now.");
  }
});
}
