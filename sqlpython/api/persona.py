from flask import Blueprint, jsonify

persona_bp = Blueprint('persona', __name__)

@persona_bp.route('/personas')
def get_personas():
    # Lógica para obtener personas desde la base de datos
    personas = [{"id": 1, "nombre": "Juan"}, {"id": 2, "nombre": "María"}]
    return jsonify(personas)

# Puedes agregar más endpoints relacionados con personas aquí
