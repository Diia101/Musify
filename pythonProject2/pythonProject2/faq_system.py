from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
import string
from googletrans import Translator
from difflib import get_close_matches
import re


nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

data = {
    "questions": [
        "What is your privacy policy?",
        "Do you have a loyalty program?",
        "Hi",
        "Hello",
        "Hey",
        "Can you help me?",
        "How are you?",
        "What can you do?",
        "Who are you?",
        "How can I send a complaint?",
        "How do I contact support?",
        "Do you have a newsletter?",
        "How can I subscribe to the newsletter?",
        "How do I update my account information?",
        "What if I forget my account password?",
        "How can I delete my account?",
        "What is your average response time for customer inquiries?",
        "Do you have a mobile app?",
        "How do I create a new playlist?",
        "Can I download music for offline listening?",
        "Can I share playlists with my friends?",
        "How do I find new music or artists?",
        "Can I follow other users?",
        "How do I manage my account settings?",
        "How do I recover my account if I forgot my password?",
        "Can I recommend songs or playlists?",
        "What should I do if I encounter a playback issue?",
        "Can I create and manage multiple playlists?",
        "How do I report a bug or issue with the app?",
        "Can I use the app on multiple devices?",
        "Do you offer a family plan?",
        "How do I enable offline mode?",
        "What are your supported devices?",
        "Can I import playlists from other music services?",
        "How can I contact customer support?",
        "Do you have any special features or integrations?",
        "How do I update my profile information?",
        "Can I transfer my playlists to a new account?",
        "What is the policy for content availability in different regions?",
        "Can I link my social media accounts to the app?",
        "How do I discover new genres or artists?"
    ],
    "answers": [
        "You can read our privacy policy on our website under Privacy Policy.",
        "Currently, we do not offer a loyalty program.",
        "Hello! How can I assist you today?",
        "Hi there! How can I help you?",
        "Hey! How can I assist you?",
        "Of course! What do you need help with?",
        "I'm just a bot, but I'm here to help!",
        "I can assist you with common questions about our services.",
        "I'm a chatbot created to help answer your questions.",
        "To send a complaint, please email us at support@example.com.",
        "To contact support, email us at support@example.com or use the 'Help' section in the app.",
        "Yes, we have a newsletter. You can subscribe via our website.",
        "Enter your email in the subscription box on our website to receive the newsletter.",
        "Go to 'Profile' in the app and select 'Edit Account' to update your details.",
        "Click 'Forgot Password' on the login page and follow the instructions to reset your password.",
        "To delete your account, go to 'Account Settings' and select 'Delete Account'.",
        "Our average response time for customer inquiries is 24-48 hours.",
        "Yes, we offer a mobile app for both iOS and Android devices.",
        "Go to 'Playlists', click 'Create Playlist', and follow the instructions to name and add songs.",
        "Yes, you can download songs for offline listening by tapping the download icon next to the song or playlist.",
        "To share a playlist, click 'Share' and choose your preferred method of sharing.",
        "Explore the 'Discover' section or use the search feature to find new music and artists.",
        "Currently, following other users is not supported.",
        "Manage your account settings in the 'Profile' section of the app.",
        "If you forgot your password, follow the password reset instructions on the login page.",
        "You can recommend songs or playlists by sharing them through the app or on social media.",
        "If you encounter a playback issue, try restarting the app or contacting customer support.",
        "Yes, you can create and manage multiple playlists from the 'Playlists' section.",
        "To report a bug or issue, email us with details about the problem at support@example.com.",
        "Yes, you can use the app on multiple devices by logging in with the same account.",
        "We offer various plans, including family plans. Check our website for details.",
        "Enable offline mode in the app settings to access your music without an internet connection.",
        "Our app supports various devices including smartphones, tablets, and desktops. Check our website for a full list.",
        "Currently, importing playlists from other music services is not supported.",
        "Use the 'Help' section in the app or email us at support@example.com to contact customer support.",
        "Explore the app to discover special features and integrations, or check our website for more information.",
        "Update your profile information in the 'Profile' section by selecting 'Edit Profile'.",
        "Transferring playlists to a new account is not supported at this time.",
        "Content availability may vary by region due to licensing agreements. Please check our website for details.",
        "Link your social media accounts in 'Account Settings' under 'Social Media Links' to share your music activities.",
        "Discover new genres and artists by exploring the 'Discover' section or using personalized recommendations in the app."
    ]
}
len(data["questions"]), len(data["answers"])

df = pd.DataFrame(data)

def get_custom_answer(user_question):
    if any(word in user_question.lower() for word in obscene_words):
        return "The message contains licensed content and cannot be processed."

    if re.search(r'<3', user_question):
        return "I love you too <3"
    if re.search(r':\(\(\(', user_question):
        return "Why are you sad? *sends virtual hugs*"
    if re.search(r':\)+', user_question):
        return "I'm happy for you! :)))"
    if re.search(r'\b(cute|adorable|sweet|nice)\b', user_question, re.IGNORECASE):
        return "Aww, thank you! You're awesome! 😊"
    if re.search(r'\b(love|affection|care)\b', user_question, re.IGNORECASE):
        return "Sending you lots of love and positive vibes! ❤️"
    if re.search(r'\b(friend|buddy|pal)\b', user_question, re.IGNORECASE):
        return "I'm here for you, buddy! 😊"
    if re.search(r'\b(awesome|amazing|fantastic|great)\b', user_question, re.IGNORECASE):
        return "You're fantastic! Keep being awesome! 🌟"
    if re.search(r'\b(thank you|thanks)\b', user_question, re.IGNORECASE):
        return "You're welcome! 😊"
    if re.search(r'\b(happy|joy|delight)\b', user_question, re.IGNORECASE):
        return "I'm so glad to hear that! Keep smiling! 😊"
    if re.search(r'\b(sad|unhappy|depressed)\b', user_question, re.IGNORECASE):
        return "I'm here for you. It's okay to feel sad sometimes. *sends virtual hugs*"
    if re.search(r'\b(help|assist|support)\b', user_question, re.IGNORECASE):
        return "Of course! I'm here to help you. What do you need assistance with? 😊"
    if re.search(r'\b(funny|joke|laugh|haha)\b', user_question, re.IGNORECASE):
        return np.random.choice(jokes)
    if re.search(r'\b(another one)\b', user_question, re.IGNORECASE):
        return np.random.choice(jokes)
    if re.search(r'\b(tired|exhausted)\b', user_question, re.IGNORECASE):
        return "Take a deep breath and relax. You've got this! 🌟"
    if re.search(r'\b(bored)\b', user_question, re.IGNORECASE):
        return "How about we play a game or I tell you a fun fact? 😊"
    if re.search(r'\b(good night|gn)\b', user_question, re.IGNORECASE):
        return "Good night! Sweet dreams! 🌙"
    if re.search(r'\b(good morning|gm)\b', user_question, re.IGNORECASE):
        return "Good morning! Have a fantastic day! ☀️"
    if re.search(r'\b(hungry|starving)\b', user_question, re.IGNORECASE):
        return "Maybe you should grab a snack! 🍎"
    if re.search(r'\b(thirsty)\b', user_question, re.IGNORECASE):
        return "Don't forget to stay hydrated! 💧"
    if re.search(r'\b(angry|mad|furious)\b', user_question, re.IGNORECASE):
        return "Take a moment to calm down. Deep breaths can help. 🌬️"

    lang = request.json.get('language') or session.get('language', 'en')
    session['language'] = lang

    corrected_question = []
    for word in user_question.split():
        closest_match = get_close_matches(word.lower(), correct_words, n=1, cutoff=0.8)
        corrected_question.append(closest_match[0] if closest_match else word)
    corrected_question = ' '.join(corrected_question)

    user_question_translated = translator.translate(corrected_question, dest='en').text
    user_question_processed = preprocess_text(user_question_translated)
    user_tfidf = vectorizer.transform([user_question_processed])
    similarities = cosine_similarity(user_tfidf, tfidf_matrix)
    most_similar_index = np.argmax(similarities)
    answer = df.iloc[most_similar_index]['answers']
    answer_translated = translator.translate(answer, dest=lang).text
    return answer_translated


def expand_with_synonyms(text):
    words = text.split()
    expanded_text = set(words)
    for word in words:
        for syn in wordnet.synsets(word):
            for lemma in syn.lemmas():
                expanded_text.add(lemma.name())
    return ' '.join(expanded_text)


def preprocess_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    words = text.split()
    text = ' '.join([lemmatizer.lemmatize(word) for word in words if word not in stop_words])
    expanded_text = expand_with_synonyms(text)
    return expanded_text

df['processed_questions'] = df['questions'].apply(preprocess_text)

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df['processed_questions'])

translator = Translator()

def find_most_similar_question(user_question, lang):
    user_question_translated = translator.translate(user_question, dest='en').text
    user_question_processed = preprocess_text(user_question_translated)
    user_tfidf = vectorizer.transform([user_question_processed])
    similarities = cosine_similarity(user_tfidf, tfidf_matrix)
    most_similar_index = np.argmax(similarities)
    answer = df.iloc[most_similar_index]['answers']
    answer_translated = translator.translate(answer, dest=lang).text
    return answer_translated, df.iloc[most_similar_index]['questions']


correct_words = [
    "what", "how", "when", "where", "why", "who",
    "return", "track", "order", "contact", "business",
    "physical", "store", "change", "delivery", "gift",
    "damaged", "cancel", "reset", "privacy", "loyalty",
    "discount", "help", "place", "return", "purchase",
    "working", "open", "close", "complaint", "support",
    "warranty", "refund", "newsletter", "subscribe",
    "shipping", "ship", "update", "forget", "delete",
    "assistance", "exchange", "free", "price", "policy",
    "track", "package", "satisfaction", "process",
    "restriction", "restriction", "install", "schedule"
]

jokes = [
    "Why don't scientists trust atoms? Because they make up everything! 😄",
    "Why did the scarecrow win an award? Because he was outstanding in his field! 😄",
    "Why don’t skeletons fight each other? They don’t have the guts. 😄",
    "What do you call fake spaghetti? An impasta! 😄",
    "Why did the math book look sad? Because it had too many problems. 😄",
    "Why was the computer cold? It left its Windows open! 😄",
    "What did one ocean say to the other ocean? Nothing, they just waved. 😄",
    "Why can’t your nose be 12 inches long? Because then it would be a foot! 😄",
    "What do you get when you cross a snowman and a vampire? Frostbite. 😄",
    "Why don’t some couples go to the gym? Because some relationships don’t work out. 😄"
]

obscene_words = ["fuck", "dick", "bitch", "asshole", "stupid", "idiot","hoe","shit"]


def get_answer():
    user_question = request.json.get('question')
    lang = session.get('language', 'en')
    conversation_history = session.get('conversation_history', [])

    conversation_history.append({'role': 'user', 'message': user_question})
    if any(word in user_question.lower() for word in obscene_words):
        return jsonify({'answer': "The message contains licensed content and cannot be processed."})

    if session.get('joke_mode', False) and re.search(r'\banother one\b', user_question, re.IGNORECASE):
        joke = np.random.choice(jokes)
        return jsonify({'answer': joke})

    if re.search(r'<3', user_question):
        session['joke_mode'] = False
        return jsonify({'answer': "I love you too <3"})
    if re.search(r':\(\(\(', user_question):
        session['joke_mode'] = False
        return jsonify({'answer': "Why are you sad? *sends virtual hugs*"})
    if re.search(r':\)+', user_question):
        session['joke_mode'] = False
        return jsonify({'answer': "I'm happy for you! :)))"})
    if re.search(r'\b(cute|adorable|sweet|nice)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Aww, thank you! You're awesome! 😊"})
    if re.search(r'\b(love|affection|care)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Sending you lots of love and positive vibes! ❤️"})
    if re.search(r'\b(friend|buddy|pal)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "I'm here for you, buddy! 😊"})
    if re.search(r'\b(awesome|amazing|fantastic|great)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "You're fantastic! Keep being awesome! 🌟"})
    if re.search(r'\b(thank you|thanks)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "You're welcome! 😊"})
    if re.search(r'\b(happy|joy|delight)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "I'm so glad to hear that! Keep smiling! 😊"})
    if re.search(r'\b(sad|unhappy|depressed)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "I'm here for you. It's okay to feel sad sometimes. *sends virtual hugs*"})
    if re.search(r'\b(help|assist|support)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Of course! I'm here to help you. What do you need assistance with? 😊"})
    if re.search(r'\b(funny|joke|laugh|haha)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = True
        joke = np.random.choice(jokes)
        return jsonify({'answer': joke})
    if re.search(r'\b(tired|exhausted)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Take a deep breath and relax. You've got this! 🌟"})
    if re.search(r'\b(bored)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "How about we play a game or I tell you a fun fact? 😊"})
    if re.search(r'\b(good night|gn)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Good night! Sweet dreams! 🌙"})
    if re.search(r'\b(good morning|gm)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Good morning! Have a fantastic day! ☀️"})
    if re.search(r'\b(hungry|starving)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Maybe you should grab a snack! 🍎"})
    if re.search(r'\b(thirsty)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Don't forget to stay hydrated! 💧"})
    if re.search(r'\b(angry|mad|furious)\b', user_question, re.IGNORECASE):
        session['joke_mode'] = False
        return jsonify({'answer': "Take a moment to calm down. Deep breaths can help. 🌬️"})

    corrected_question = []
    for word in user_question.split():
        closest_match = get_close_matches(word.lower(), correct_words, n=1, cutoff=0.8)
        if closest_match:
            corrected_question.append(closest_match[0])
        else:
            corrected_question.append(word)
    corrected_question = ' '.join(corrected_question)

    answer, question_matched = find_most_similar_question(corrected_question, lang)

    conversation_history.append({'role': 'bot', 'message': answer})
    session['conversation_history'] = conversation_history

    if user_question.lower() in ["how?", "why?", "when?", "where?", "what?"]:
        last_user_question = next((item['message'] for item in reversed(conversation_history) if item['role'] == 'user' and item['message'].lower() not in ["how?", "why?", "when?", "where?", "what?"]), None)
        if last_user_question:
            answer = f"You asked '{last_user_question}' before. {answer}"

    return jsonify({'answer': answer})

if __name__ == '__main__':
    pass
