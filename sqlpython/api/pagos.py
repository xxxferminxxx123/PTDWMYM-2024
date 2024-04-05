from flask import Blueprint, jsonify, request
from database.connection import create_connection
import logging

# Configura el registro
logging.basicConfig(filename='app.log', level=logging.ERROR)
pagos_bp = Blueprint('pagos', __name__)

@pagos_bp.route('/pagos')
def get_pagos():
    # Lógica para obtener pagos desde la base de datos
    pagos = [{"id": 1, "monto": 100}, {"id": 2, "monto": 200}]
    return jsonify(pagos)


@pagos_bp.route('/pagos/procedimiento', methods=['GET'])
def obtener_procedimiento():
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('EXEC getEmploys')
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return jsonify(result), 200
    except Exception as e:
        return str(e), 500
    
@pagos_bp.route('/pagos/procedimiento/getCuotas', methods=['GET'])
def obtener_procedimiento_pagos():
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('EXEC proc_get_cuotas')
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return jsonify(result), 200
    except Exception as e:
        return str(e), 500


@pagos_bp.route('/pagos/procedimiento/pagar', methods=['POST'])
def ejecutar_procedimiento():
    try:
        data = request.json
        monto = data.get('monto')
        id_trans_factura = data.get('id_trans_factura')

        if monto is None or id_trans_factura is None:
            return jsonify({"error": "Se requieren los parámetros 'monto' y 'id_trans_factura'"}), 400

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('EXEC [dbo].[pagarv3] @MONTOX=?, @idtransFacturax=?', (monto, id_trans_factura))
        conn.commit()
        conn.close()

        return jsonify({"message": "Procedimiento ejecutado exitosamente"}), 200

    except Exception as e:
        logging.error("Error al ejecutar el procedimiento: %s", str(e))
        return jsonify({"error": str(e)}), 500


@pagos_bp.route('/pagos/procedimiento/crearCuotas', methods=['POST'])
def crear_cuotas():
    try:
        data = request.json
        numero_cuotas = data.get('numeroCuotas')

        if numero_cuotas is None:
            return jsonify({"error": "Se requiere el parámetro 'numeroCuotas'"}), 400

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('EXEC [dbo].[proc_cuotas_crearCuotas] @NumeroCuotas=?', (numero_cuotas,))
        conn.commit()
        conn.close()

        return jsonify({"message": "Cuotas creadas exitosamente"}), 200

    except Exception as e:
        logging.error("Error al ejecutar el procedimiento: %s", str(e))
        return jsonify({"error": str(e)}), 500



@pagos_bp.route('/pagos/procedimiento/trasn_factura', methods=['GET'])
def get_trasn_factura():
    try:
        conn = create_connection()  # Crea la conexión a la base de datos
        cursor = conn.cursor()

        # Ejecuta la consulta SQL para obtener los datos de la tabla trasn_factura
        cursor.execute('SELECT idtransFactura, fechaVencimiento, monto, saldo, pago, sobra, estado FROM EmployeeDB.dbo.trasn_factura')

        # Obtiene los resultados de la consulta
        results = cursor.fetchall()

        # Formatea los resultados como una lista de diccionarios
        data = [{
            'idtransFactura': row[0],
            'fechaVencimiento': row[1],
            'monto': row[2],
            'saldo': row[3],
            'pago': row[4],
            'sobra': row[5],
            'estado': row[6]
        } for row in results]

        conn.close()  # Cierra la conexión a la base de datos

        return jsonify(data), 200  # Devuelve los datos como JSON

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Devuelve un mensaje de error en caso de excepción


# @pagos_bp.route('/pagos/procedimiento/pagarCuotas', methods=['POST'])
# def pagarCuotas():
#     try:
#         data = request.json
#         monto = data.get('monto')
#         idtransFacturax = data.get('idtransFacturax')

#         if idtransFacturax is None:
#             return jsonify({"error": "Se requiere el parámetro 'idtransFacturax'"}), 400

#         conn = create_connection()
#         cursor = conn.cursor()
#         cursor.execute('EXEC [dbo].[pagarv3] @monto=? , @idtransFacturax=? ', (monto,idtransFacturax))
#         conn.commit()
#         conn.close()

#         return jsonify({"message": "Cuotas creadas exitosamente"}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
