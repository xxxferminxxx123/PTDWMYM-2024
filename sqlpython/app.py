from flask import Flask
from api.router import router_bp
from flask_cors import CORS
from database.connection import create_connection

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200", "http://localhost:5000"])  # Permitir solicitudes CORS desde http://localhost:4200 y http://localhost:5000

# Registramos el blueprint del router que incluye todos los endpoints
app.register_blueprint(router_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)