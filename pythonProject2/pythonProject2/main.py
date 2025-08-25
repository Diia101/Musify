from flask import Flask, request, jsonify, session
from flask_cors import CORS
from faq_system import get_custom_answer

app = Flask(__name__)
app.secret_key = 'c84dac217816a52b78e8f27a0e3bed5c4fb9ed19ebe10587'
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/get_answer", methods=["POST"])
def get_answer():
    data = request.json
    user_input = data.get("question")

    if user_input:
        response = get_custom_answer(user_input)
        return jsonify({"response": response})
    else:
        return jsonify({"response": "Nu am înțeles întrebarea. Te rog să întrebi din nou."})


@app.route('/set_language', methods=['POST'])
def set_language():
    lang = request.json.get('language')
    session['language'] = lang
    return jsonify({'status': f'Language set to {lang}'})


if __name__ == "__main__":
    app.run(debug=True)
