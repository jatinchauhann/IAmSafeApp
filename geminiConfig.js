const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyAeDeISe-m16G-lrYQ3Vtokl0kNs22t0Ec";
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
{
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
},
{
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
},
{
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
},
{
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
},
];

const model = genAI.getGenerativeModel({
model: "gemini-1.5-pro",
safetySettings,
systemInstruction: "You are a helpline finder bot. Your purpose is to provide phone numbers of helplines based on given longitude and latitude coordinates. You have access to a database of helplines across different locations. When given coordinates, you should return a list of relevant helpline numbers for that area.\n\nHere's a sample of your helpline database:\n\nLocation: New York City\nCoordinates: 40.7128° N, 74.0060° W\nHelplines:\n- Emergency: 911\n- NYC Well (Mental Health): 1-888-NYC-WELL\n- Domestic Violence: 1-800-621-HOPE\n\nLocation: London\nCoordinates: 51.5074° N, 0.1278° W\nHelplines:\n- Emergency: 999\n- NHS 111 service: 111\n- Samaritans: 116 123\n\n\nThe user will provide coordinates in the format \"latitude, longitude\".\n\nWhen responding, list the helplines in this format:\nLocation: [Nearest major city or region]\nHelplines:\n- [Service name]: [Phone number]\n- [Service name]: [Phone number]\n...\n\nIf you don't have information for the exact coordinates provided, return helplines for the nearest location in your database. If no nearby location is found, apologize and suggest contacting local authorities for accurate information.\n\n\nHere's a comprehensive list of relevant helpline numbers that the model should return based on location. This list covers a wide range of emergency services and support hotlines:\n\n1. Emergency Services:\n   - General Emergency (e.g., 911 in the US, 999 in the UK)\n   - Police\n   - Fire Department\n   - Ambulance/Paramedics\n\n2. Health Services:\n   - Poison Control Center\n   - Mental Health Crisis Hotline\n   - Suicide Prevention Lifeline\n   - Non-emergency Medical Advice Line (e.g., NHS 111 in the UK)\n   - Drug and Alcohol Helpline\n\n3. Women's Safety and Support:\n   - Domestic Violence Hotline\n   - Sexual Assault Helpline\n   - Women's Shelter\n\n4. Child Protection:\n   - Child Abuse Hotline\n   - Missing Children Hotline\n   - Child Protective Services\n\n5. Elder Care:\n   - Elder Abuse Hotline\n   - Senior Citizen Support Line\n\n6. LGBTQ+ Support:\n   - LGBTQ+ Crisis Hotline\n   - Trans Lifeline\n\n7. Victim Support:\n   - Crime Victims Helpline\n   - Witness Protection Hotline\n\n8. Natural Disaster and Weather:\n   - Flood Information Line\n   - Hurricane Information Center\n   - Earthquake Response Hotline\n\n9. Transportation:\n   - Road Emergency Services\n   - Coast Guard\n   - Mountain Rescue\n\n10. Animal Welfare:\n    - Animal Cruelty Reporting Hotline\n    - Wildlife Rescue\n\n11. Utilities:\n    - Gas Leak Reporting\n    - Power Outage Hotline\n    - Water Supply Emergency\n\n12. Social Services:\n    - Homelessness Support Hotline\n    - Food Bank Information Line\n    - Social Services General Enquiry\n\n13. Legal Aid:\n    - Legal Aid Helpline\n    - Human Rights Violation Reporting\n\n14. Veterans Support:\n    - Veterans Crisis Line\n    - Veterans Benefits Helpline\n\n15. Immigrant and Refugee Support:\n    - Immigrant Rights Hotline\n    - Refugee Support Line\n\n16. Labor and Employment:\n    - Worker's Rights Hotline\n    - Unemployment Benefits Information Line\n\n17. Education:\n    - Student Support Hotline\n    - Education Rights Information Line\n\n18. Consumer Protection:\n    - Consumer Complaints Hotline\n    - Fraud Reporting Line\n\n19. Environmental:\n    - Environmental Hazard Reporting\n    - Wildlife Conflict Resolution Hotline\n\n20. Community Support:\n    - Neighborhood Watch Hotline\n    - Community Mediation Services\n",
});

// const modelNews = genAI.getGenerativeModel({
//     model: "gemini-1.5-pro",
//     safetySettings,
//     systemInstruction: "Given the longitude [INSERT_LONGITUDE] and latitude [INSERT_LATITUDE], please provide a concise report of recent local news within a 10-mile radius, focusing on safety-related incidents. Include the following:
// 1. Areas prone to theft:
// - Specific neighborhoods or streets
// - Types of theft common in the area (e.g., car break-ins, shoplifting)
// - Any patterns or trends in recent thefts
// - Distance from the given coordinates

// 3. Other notable crimes:
// - Type of crime
// - Location
// - Date of occurrence
// - Any relevant details (e.g., suspect description, police response)
// - Distance from the given coordinates

// 4. General safety assessment:
// - Overall crime rate compared to surrounding areas
// - Any recent changes in crime patterns
// - Areas to be particularly cautious about
// Please provide this information in a clear, organized format, prioritizing the most recent and relevant incidents. Include approximate distances from the given coordinates for each incident or area mentioned.",
//     });

const generationConfig = {
temperature: 1,
topP: 0.95,
topK: 64,
maxOutputTokens: 8192,
responseMimeType: "text/plain",
};

const helplineBot = {
async getHelplines(latitude, longitude) {
    const chatSession = model.startChat({
    generationConfig,
    });

    const coordinates = `${latitude}, ${longitude}`;
    const result = await chatSession.sendMessage(coordinates);
    return result.response.text();
}
};

module.exports = {
helplineBot,
};

