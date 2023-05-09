from flask import jsonify
from tensorflow.keras.models import load_model
import numpy as np
import os

pathModeloSumar = os.path.join(os.getcwd(), 'src/model', 'model_sumar.h5')
model_sumar = load_model(pathModeloSumar)

pathModeloRestar = os.path.join(os.getcwd(), 'src/model', 'model_restar.h5')
model_restar = load_model(pathModeloRestar)

pathModeloMultiplicar = os.path.join(
    os.getcwd(), 'src/model', 'model_multiplicar.h5')
model_multiplicar = load_model(pathModeloMultiplicar)

pathModeloDividir = os.path.join(os.getcwd(), 'src/model', 'model_dividir.h5')
model_dividir = load_model(pathModeloDividir)


def sumar(op1, op2):
    entrada_prediccion = np.array([[op1, op2]])
    total = model_sumar.predict(entrada_prediccion)

    try:
        res = {
            "success": True,
            "operation": "suma",
            "op1": op1,
            "op2": op2,
            "res": str(total[0][0]),
            "message": "Operación realizada con éxito"
        }

        return jsonify(res)

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "No se pudo realizar la suma"})


def count_digits(number):
    return len(str(abs(int(number))))


def restar(op1, op2):
    op1_digits = count_digits(op1) - 1
    op2_digits = count_digits(op2) - 1
    scaling_factor = 10 ** (op1_digits if op1_digits >
                            op2_digits else op2_digits)

    # Escalamos los números de acuerdo con la cantidad de números: 100 -> 0.1
    op1 = op1 / scaling_factor
    op2 = op2 / scaling_factor

    entrada_prediccion = np.array([[op1, op2]])
    result = model_restar.predict(entrada_prediccion)
    total = result[0][0] * scaling_factor

    try:
        res = {
            "success": True,
            "operation": "resta",
            "op1": op1,
            "op2": op2,
            "res": str(total),
            "message": "Operación realizada con éxito"
        }

        return jsonify(res)

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "No se pudo realizar la resta"})


def multiplicar(op1, op2):
    op1_digits = count_digits(op1) - 1
    op2_digits = count_digits(op2) - 1
    scaling_factor = 10 ** (op1_digits + op2_digits)

    # Escalar los números según la cantidad de dígitos
    op1 /= 10 ** op1_digits
    op2 /= 10 ** op2_digits

    input_data = np.array([[op1, op2]])
    result = model_multiplicar.predict(input_data)
    total = result[0][0] * scaling_factor

    try:
        res = {
            "success": True,
            "operation": "multiplicacion",
            "op1": op1,
            "op2": op2,
            "res": str(total),
            "message": "Operación realizada con éxito"
        }

        return jsonify(res)

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "No se pudo realizar la multiplicacion"})


def dividir(op1, op2):
    op1_digits = count_digits(op1) - 1
    op2_digits = count_digits(op2) - 1
    scaling_factor = 10 ** (op1_digits if op1_digits >
                            op2_digits else op2_digits)

    # Escalar los números según la cantidad de dígitos
    op1 = op1 / scaling_factor
    op2 = op2 / scaling_factor

    input_data = np.array([[op1, op2]])
    result = model_dividir.predict(input_data)
    total = result[0][0]

    try:
        res = {
            "success": True,
            "operation": "division",
            "op1": op1,
            "op2": op2,
            "res": str(total),
            "message": "Operación realizada con éxito"
        }

        return jsonify(res)

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "No se pudo realizar la division"})
