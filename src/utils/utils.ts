export function checkAuthTokenExists() {
  // Example: Check if token exists in localStorage or any state management
  const authToken = localStorage.getItem("authToken");
  return !!authToken; // Return true if token exists, false otherwise
}
