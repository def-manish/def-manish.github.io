# server.py

import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- This is the PortfolioAgent class from before ---
class PortfolioAgent:
    def __init__(self, knowledge_base_path):
        with open(knowledge_base_path, 'r') as f:
            self.knowledge = json.load(f)
        print("Knowledge base loaded successfully.")

    def get_response(self, user_input):
        lowered_input = user_input.lower()

        # Define keywords and corresponding responses
        if any(keyword in lowered_input for keyword in ['hello', 'hi', 'hey']):
            return self.knowledge['personal_info']['introduction']
        elif 'contact' in lowered_input:
            return self.knowledge['personal_info']['contact']
        elif 'skills' in lowered_input or 'technologies' in lowered_input:
            skills_list = ', '.join(self.knowledge['skills']['languages'])
            return f"I've been working with these technologies recently: {skills_list}."
        elif 'project' in lowered_input:
            return self.get_project_details(lowered_input)
        elif any(keyword in lowered_input for keyword in ['bye', 'thanks', 'thank you']):
            return self.knowledge['farewell']
        else:
           return "I'm not sure how to answer that. You can ask me about 'skills', 'projects', or 'contact'."

    def get_project_details(self, user_input):
        projects = self.knowledge['projects']
        for project in projects:
            if project['name'].lower() in user_input:
                return f"{project['name']} is {project['description']} You can see it here: {project['link']}"
        project_names = ', '.join([p['name'] for p in projects])
        return f"I have worked on several projects, including: {project_names}. Which one would you like to know more about?"

# --- Flask App Setup ---
app = Flask(__name__)
cors = (CORSapp, origins='#')  # Enable CORS for all routes

# Create templates directory if it doesn't exist
if not os.path.exists('templates'):
    os.makedirs('templates')

# Create an instance of our agent
try:
    portfolio_bot = PortfolioAgent('data.json')
except FileNotFoundError:
    print("Error: data.json not found! Make sure to rename data.json.txt to data.json")


@app.route('/chat', methods=['POST'])
def chat():
    try:
        # This is the endpoint your JavaScript will call
        user_message = request.json['message']
        bot_response = portfolio_bot.get_response(user_message)
        return jsonify({'reply': bot_response})
    except Exception as e:
        return jsonify({'reply': 'Sorry, there was an error processing your message.'}), 500

if __name__ == '__main__':
    print("Starting Flask server... Your portfolio will be live at http://127.0.0.1:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)

