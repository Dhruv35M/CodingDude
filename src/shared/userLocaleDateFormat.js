async function userLocaleDateFormat() {
  try {
    const response = await fetch("https://ipinfo.io/json");
    if (!response.ok) {
      throw new Error("Failed to fetch countryCode");
    }
    const data = await response.json();
    return data.country || "IN";
  } catch (error) {
    console.error("Error fetching countryCode:", error);
    return "IN";
  }
}

export default userLocaleDateFormat;
