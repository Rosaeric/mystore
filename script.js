async function buy(productId) {
  const username = prompt("Enter your Minecraft username:");
  if (!username) return alert("You must enter a username!");

  // Send request to your backend API
  try {
    const res = await fetch("https://your-backend-url.com/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, buyerName: username })
    });

    const data = await res.json();

    // Redirect to Stripe checkout
    if (data.id) {
      const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY");
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert("Error creating checkout session.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again later.");
  }
}
