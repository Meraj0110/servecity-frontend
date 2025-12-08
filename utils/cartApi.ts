export async function updateCartItem(productId, quantity) {
  const deviceId = localStorage.getItem("deviceId");

  return fetch("/carts/update", {
    method: "POST",
    credentials: "include", // ⭐ includes access_token from cookies
    headers: {
      deviceId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removeCartItem(productId) {
  const deviceId = localStorage.getItem("deviceId");

  return fetch("/carts/remove", {
    method: "POST",
    credentials: "include", // ⭐ includes cookies automatically
    headers: {
      deviceId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
}
