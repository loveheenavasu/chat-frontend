(function () {
  // Configuration
  var config = window.embeddedChatbotConfig || {};
  var chatbotUrl =
    "https://chat-frontend-three-xi.vercel.app/chatbot/b834035e-fc28-4a84-bd49-e48565a21847";

  // Create chat bubble
  var bubble = document.createElement("div");
  bubble.id = "chatbot-bubble";
  var img = document.createElement("img");
  img.src = "./bot.jpg";
  img.setAttribute("width", "60px");
  img.style.borderRadius = "50%";
  img.style.boxShadow = "0 25px 50px -12px skyblue";
  bubble.appendChild(img);
  document.body.appendChild(bubble);

  // Create chat container (hidden initially)
  var chatContainer = document.createElement("div");
  chatContainer.id = "chatbot-container";
  chatContainer.style.display = "none";
  document.body.appendChild(chatContainer);

  // Toggle chat
  function toggleChat() {
    if (chatContainer.style.display === "none") {
      chatContainer.style.display = "block";
      chatContainer.style.width = "40vw";
      chatContainer.style.height = "70vh";
      chatContainer.style.marginBottom = "60px";
      if (!chatContainer.querySelector("iframe")) {
        var iframe = document.createElement("iframe");
        iframe.src = chatbotUrl;
        iframe.style.width = "40vw";
        iframe.style.height = "70vh";
        iframe.style.overflow = "hidden";
        iframe.style.borderRadius = "10px";
        chatContainer.appendChild(iframe);
      }
    } else {
      chatContainer.style.display = "none";
    }
  }

  // Add click event to bubble
  bubble.addEventListener("click", toggleChat);

  // Style elements (this would typically be more extensive)
  bubble.style.cssText =
    "position:fixed;bottom:20px;right:20px;cursor:pointer;";
  chatContainer.style.cssText =
    "position:fixed;bottom:60px;right:20px;width:300px;height:400px;";
})();
