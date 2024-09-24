(function () {
  // Configuration
  var config = window.embeddedChatbotConfig || {};

  if (config.domain && config.chatbotId) {
    var chatbotUrl =
      "https://" + config.domain + "/chatbot/" + config.chatbotId;
    console.log("Chatbot URL:", chatbotUrl);
  } else {
    console.error("Chatbot configuration is missing.");
  }

  // Create chat bubble
  var bubble = document.createElement("div");
  bubble.id = "chatbot-bubble";
  var img = document.createElement("img");
  img.src = "/images/bot.jpg";
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
      chatContainer.style.maxHeight = "70vh";
      chatContainer.style.marginBottom = "60px";
      chatContainer.style.overflow = "hidden";
      if (!chatContainer.querySelector("iframe")) {
        var iframe = document.createElement("iframe");
        iframe.src = chatbotUrl;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.borderRadius = "10px";
        iframe.style.overflow = "hidden";
        iframe.style.border = "none";
        chatContainer.appendChild(iframe);
      }
    } else {
      chatContainer.style.display = "none";
    }
  }

  // Add click event to bubble
  bubble.addEventListener("click", toggleChat);

  // Style elements
  bubble.style.cssText =
    "position:fixed;bottom:20px;right:20px;cursor:pointer;";
  chatContainer.style.cssText =
    "position:fixed;bottom:60px;right:20px;width:300px;height:400px;overflow:hidden;border-radius:10px;";
})();
