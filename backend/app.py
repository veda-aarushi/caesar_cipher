from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def caesar_cipher(text, shift, encrypt=True):
    result = []
    steps = []

    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            shift_direction = shift if encrypt else -shift
            cipher_char = chr((ord(char) - base + shift_direction) % 26 + base)
            steps.append(f"{char} → {cipher_char}")
            result.append(cipher_char)
        else:
            steps.append(f"{char} (unchanged)")
            result.append(char)

    return ''.join(result), steps

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    text = data['text']
    shift = int(data['shift'])
    encrypted, steps = caesar_cipher(text, shift, encrypt=True)
    return jsonify({"result": encrypted, "steps": steps})

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.json
    text = data['text']
    shift = int(data['shift'])
    decrypted, steps = caesar_cipher(text, shift, encrypt=False)
    return jsonify({"result": decrypted, "steps": steps})

if __name__ == '__main__':
    app.run(debug=True)
