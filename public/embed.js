(function () {
  // Configuration
  var config = window.embeddedChatbotConfig || {};

  if (!window.isChatbotInitialized) {
    window.isChatbotInitialized = true;

    console.log("Chatbot running");
    if (config.domain && config.chatbotId) {
      var chatbotUrl =
        "https://" + config.domain + "/chatbot/" + config.chatbotId;
      console.log("Chatbot URL:", chatbotUrl);
    } else {
      console.error("Chatbot configuration is missing.");
      return; // Exit if configuration is missing
    }
  }

  // Create chat bubble
  var bubble = document.createElement("div");
  bubble.id = "chatbot-bubble";
  var img = document.createElement("img");
  img.src = "https://" + config.domain + "/images/bot.jpg";
  img.setAttribute("width", "60px");
  img.style.borderRadius = "50%";
  img.style.transition = "transform 0.3s ease"; // Add transition for smooth scaling
  img.style.boxShadow = "0px 3px 8px gray";

  bubble.appendChild(img);
  document.body.appendChild(bubble);

  // Create chat container (hidden initially)
  var chatContainer = document.createElement("div");
  chatContainer.id = "chatbot-container";
  chatContainer.style.display = "none";
  document.body.appendChild(chatContainer);

  // Function to toggle chat visibility
  function toggleChat() {
    if (chatContainer.style.display === "none") {
      chatContainer.style.display = "block";
      chatContainer.style.width = "40vw";
      chatContainer.style.maxHeight = "70vh";
      chatContainer.style.paddingBottom = "4px";
      chatContainer.style.marginBottom = "60px";
      chatContainer.style.overflowY = "auto";
      chatContainer.style.boxShadow = "0px 3px 8px gray";

      // Check if iframe already exists, if not create it
      if (!chatContainer.querySelector("iframe")) {
        var iframe = document.createElement("iframe");
        iframe.src = chatbotUrl;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.paddingBottom = "4px";
        iframe.style.borderRadius = "10px";
        iframe.style.border = "none";
        chatContainer.appendChild(iframe);
      }
    } else {
      chatContainer.style.display = "none";
    }
  }

  // Add click event to toggle the chat
  bubble.addEventListener("click", toggleChat);

  // Style elements
  bubble.style.cssText =
    "position:fixed;bottom:20px;right:20px;cursor:pointer;z-index:1000;";
  chatContainer.style.cssText =
    "position:fixed;bottom:60px;right:20px;width:300px;height:400px;overflow:hidden;border-radius:10px;z-index:1000;";

  // Add hover effect to scale the image
  bubble.addEventListener("mouseover", function () {
    img.style.transform = "scale(1.2)";
    img.style.transition = "all ease-in .4s";
  });

  bubble.addEventListener("mouseout", function () {
    img.style.transform = "scale(1)";
    img.style.transition = "all ease-in .4s";
  });
})();
