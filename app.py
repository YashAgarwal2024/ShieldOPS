from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

# session secret key
app.secret_key = 'replace-this-with-a-secure-random-key'

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'shieldops'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Blueprint registration placeholders
# from backend.auth import auth_bp
# from backend.client import client_bp
# from backend.staff import staff_bp
# from backend.contract import contract_bp
# from backend.deployment import deployment_bp
# from backend.attendance import attendance_bp
# from backend.invoice import invoice_bp
# from backend.payment import payment_bp

# app.register_blueprint(auth_bp, url_prefix='/auth')
# app.register_blueprint(client_bp, url_prefix='/client')
# app.register_blueprint(staff_bp, url_prefix='/staff')
# app.register_blueprint(contract_bp, url_prefix='/contract')
# app.register_blueprint(deployment_bp, url_prefix='/deployment')
# app.register_blueprint(attendance_bp, url_prefix='/attendance')
# app.register_blueprint(invoice_bp, url_prefix='/invoice')
# app.register_blueprint(payment_bp, url_prefix='/payment')

@app.route('/')
def index():
    return 'ShieldOps API is running.'

if __name__ == '__main__':
    app.run(debug=True)
