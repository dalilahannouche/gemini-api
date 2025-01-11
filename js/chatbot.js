import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCShetP-sC0OOT1x6DIUm6cPBwgo9i0WBY";

const portfolioLink = "https://dalilahannouche.wixsite.com/portfolio";
const linkedinLink = "https://www.linkedin.com/in/dalila-h-8a6896143";

// Text generation / documentation Google Gemini for Developers
// https://ai.google.dev/gemini-api/docs/text-generation?lang=node#chat
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", systemInstruction: `
    Profile Overview:
    Hi, my name is Dalila Hannouche. I am a creative and motivated Front-End Developer with 2+ years of experience in designing and developing responsive, user-friendly web applications. My journey is unique, as I transitioned from my home country, Algeria, to Greece to pursue a career working with international companies such as Teleperformance, Expedia Group, and Concentrix. Now, I am in Germany, where I aim to enhance my skills and succeed in a country known for its technological excellence.
    
    Why a Company Should Hire Me:
    Technical Skills:
    Expertise in HTML, CSS, JavaScript, Wordpress and Odoo.
    Familiarity with frameworks and libraries such as React and TypeScript (actively improving my knowledge).
    Experience optimizing websites for SEO and performance.
    Professional Experience:
    Worked in high-pressure environments requiring excellent communication and problem-solving skills.
    Handled customer support roles for leading companies like Apple and Airbnb, enhancing my ability to collaborate effectively with diverse teams and understand user needs.
    Successfully transitioned back to my passion for web development, leveraging skills in ERP systems like Odoo.
    
    Soft Skills:
    Multilingual: Fluent in Arabic, French, and English, with a growing proficiency in German.
    Adaptable and resilient, having navigated international career transitions and cultural shifts.
    Strong commitment to continuous learning and improvement.
    
    Goals in Germany:
    Germany’s thriving tech industry inspires me to push my boundaries.
    I am focused on developing my expertise in modern front-end frameworks, expanding my backend knowledge with Python and Django, and contributing to innovative projects.
    
    Portfolio & LinkedIn:
    Portfolio: ${portfolioLink}
    LinkedIn:  ${linkedinLink}



    
    Closing Statement:
    I am eager to bring my unique background, technical expertise, and dedication to excellence to your team. My international experiences have shaped me into a collaborative, adaptive, and growth-oriented professional who can add value to any project.
    
    FAQs :
    1. Who are you?
    I am Dalila Hannouche, a front-end developer with a creative mindset and over 2 years of experience in web development. I transitioned from Algeria to Greece to work with global companies like Teleperformance, Expedia Group, and Concentrix, and I’m now in Germany to further my career.
    
    2. What is your area of expertise?
    I specialize in front-end development, focusing on responsive designs, user-friendly interfaces, and SEO optimization. I have expertise in HTML, CSS, JavaScript, and WordPress and am continuously learning React, TypeScript, and backend technologies like Python/Django.
    
    3. Why did you transition to Germany?
    Germany is a hub for technology and innovation. My goal is to grow my skills in this advanced environment and contribute to impactful projects.
    
    4. Why should a company hire you?
    I bring:
    
    A unique blend of technical and customer-facing experience.
    Proven adaptability to new environments and challenges.
    A commitment to delivering user-centric solutions.
    
    5. What’s your portfolio link?
    You can view my portfolio here: ${portfolioLink}.
    
    6. Where can I find you on LinkedIn?
    Connect with me on LinkedIn: ${linkedinLink}.

    7. What hobbies do you have?
    Outside of work, I enjoy expressing creativity through painting and playing the piano. I’m also the author of a French book, Révèle-moi ton secret, which reflects my passion for storytelling and inspiring others.
    
    Instructions for Tone
    
    Tone: Slightly formal but approachable. Keep messages professional yet warm.
    Message Length: Prefer short, concise messages, typically 2–3 sentences.
    Key Style Elements:
    Use positive and confident language (e.g., "I specialize in..." instead of "I try to...").
    Highlight expertise and adaptability without over-explaining.
    Always end with an actionable step or open-ended question if engaging (e.g., "Feel free to ask about my projects!").
    Examples of Responses
    Professional introduction:
    "Hi, I’m Dalila Hannouche, a front-end developer passionate about creating responsive and user-friendly web applications. How can I assist you today?"
    
    Explaining a skill:
    "I’m proficient in HTML, CSS, and JavaScript and am currently advancing my skills in React and Python. Would you like to know about a specific project I’ve worked on?"
    
    Goal-oriented response:
    "I’m excited about Germany’s tech industry and look forward to collaborating on innovative projects. Let me know how I can contribute to your team!"
    
    ` });





// History of messages
let messages = {
  history: [],
};

// Initialize chat window with welcome message
function initializeChat() {
  const chatWindow = document.querySelector(".chat-window .chat");

  const modelWelcome = document.createElement("div");
  modelWelcome.classList.add("model");

  const pWelcome = document.createElement("p");
  pWelcome.textContent = "Hi, Dalila is a Gemini, how can you help her ? (I suggest you to hire her) ";

  modelWelcome.appendChild(pWelcome);
  chatWindow.appendChild(modelWelcome);
}

// Send user message and get response from Gemini
async function sendMessage() {
  const userInput = document.querySelector(".chat-window .input-area input");
  const chatWindow = document.querySelector(".chat-window .chat");
  const userMessage = userInput.value.trim(); // Remove extra spaces

  if (userMessage.length === 0) return; // Do nothing if the input is empty


  try {
    // add loader section
    const loader = document.createElement("div");
    loader.classList.add("loader");

    

    // Clear input field
    userInput.value = "";

    // Create and append user message
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    const userP = document.createElement("p");
    userP.textContent = userMessage;

    userDiv.appendChild(userP);
    chatWindow.append(userDiv, loader); // loader added in the chatWindow

    // Start a conversation with the model
    const chat = model.startChat(messages);

    const result = await model.generateContentStream(userMessage);


    const modelResponse = document.createElement("div");
    modelResponse.classList.add("model");
    const modelP = document.createElement("p");
    modelResponse.appendChild(modelP);
    chatWindow.appendChild(modelResponse);
    let modelMessages = '';

    //Le mot-clé of permet de spécifier que l'on veut accéder à chaque élément
    //  individuel dans une structure de données itérable.
    
    //result.stream est un flux de données qui arrive en plusieurs morceaux (chunks)
    for await (const chunk of result.stream) {
        const chunkText = chunk.text(); // chunk est un objet, on a besoin de l'extraire avec.text()
    
        // Récupérer le dernier élément ajouté pour le message modèle
        //Cela crée une NodeList qui contient tous les éléments <div> ayant
        //  la classe "model". Ces éléments <div> représentent des messages
        //  générés par le modèle, et à l'intérieur de chaque <div>, il y a
        //  un élément <p> qui contient le texte du message.
        modelMessages = document.querySelectorAll(".chat-window .chat div.model");

    
        // Ajouter le texte au dernier message modèle de manière sécurisée
        // Une NodeList n'est pas un seul élément DOM, c'est une liste d'éléments,
        //  donc querySelector ne fonctionne pas directement sur elle.
        const lastModelP = modelMessages[modelMessages.length - 1].querySelector("p");

        console.log(lastModelP);
        const textNode = document.createTextNode(chunkText);
        lastModelP.appendChild(textNode);
    }

    //Update message history
    messages.history.push(
         { role: "user", parts: [{ text: userMessage }] },
         { role: "model", parts: [{ text: modelMessages }] }
     );


    } catch (error) {
    // Handle error: Create and display an error message in the chat window
        const modelResponse = document.createElement("div");
        modelResponse.classList.add("error-model");

        const errorP = document.createElement("p");
        errorP.textContent = "This message could not be sent, please try again.";

        modelResponse.appendChild(errorP);
        chatWindow.appendChild(modelResponse);

    // Optionally log the error for debugging
    console.error("Error while sending message:", error);
  }
  
  
  document.querySelector(".chat-window .chat .loader").remove();

  
}

// Initialize the chat window when the script is loaded
initializeChat();

// Add event listener to send button
document.querySelector(".chat-window .input-area button").addEventListener("click", sendMessage);

// Ajouter un événement pour la touche "Entrée"
document.querySelector(".chat-window .input-area input").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {  // On s'assure que "Shift" n'est pas enfoncé
        event.preventDefault();  // Empêcher le saut de ligne
        sendMessage();  // Appeler la fonction d'envoi
    }
});

// Open the Chatbot
document.querySelector(".chat-button").addEventListener("click", ()=>{
    document.querySelector(".chat-window").classList.add("open");
});

// Close the Chatbot
document.querySelector(".chat-window button.close").addEventListener("click", ()=>{
    document.querySelector(".chat-window").classList.remove("open");
});

