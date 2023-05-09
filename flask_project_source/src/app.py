from flask import Flask, request
from flask_cors import CORS, cross_origin

import routes.actions as actions

app = Flask(__name__)

CORS(app)


@app.route('/')
def index():
    return "Hola mundo!"


@cross_origin
@app.route('/sumar', methods=['GET'])
def sumar():
    op1 = float(request.args.get('op1'))
    op2 = float(request.args.get('op2'))
    return actions.sumar(op1, op2)


@cross_origin
@app.route('/restar', methods=['GET'])
def restar():
    op1 = float(request.args.get('op1'))
    op2 = float(request.args.get('op2'))
    return actions.restar(op1, op2)


@cross_origin
@app.route('/multiplicar', methods=['GET'])
def multiplicar():
    op1 = float(request.args.get('op1'))
    op2 = float(request.args.get('op2'))
    return actions.multiplicar(op1, op2)


@cross_origin
@app.route('/dividir', methods=['GET'])
def dividir():
    op1 = float(request.args.get('op1'))
    op2 = float(request.args.get('op2'))
    return actions.dividir(op1, op2)


def page_not_found(error):
    return "La página no existe!", 404


if (__name__ == '__main__'):
    app.register_error_handler(404, page_not_found)
    app.run(host='0.0.0.0', debug=True, port=5000)
