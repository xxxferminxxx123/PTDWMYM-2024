from flask import Blueprint
from .persona import persona_bp
from .pagos import pagos_bp

# Creamos un blueprint para la compilación de endpoints
router_bp = Blueprint('router', __name__)

# Registramos los blueprints de personas y pagos
router_bp.register_blueprint(persona_bp)
router_bp.register_blueprint(pagos_bp)

# No olvides agregar más blueprints si tienes más archivos de endpoints en el futuro
