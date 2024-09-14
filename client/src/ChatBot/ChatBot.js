import React from "react";
import { useEffect } from "react";
function ChatBot() {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;

    // Set the chatbotId and domain attributes
    script.setAttribute("chatbotId", "Md6dUPc75wnBkWlgWsVCO");
    script.setAttribute("domain", "www.chatbase.co");

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return <div></div>;
}

export default ChatBot;

