import oracledb
import os
from flask import Flask, request, make_response, redirect, render_template, jsonify, json
app = Flask(__name__)

user = "ADMINISTRADOR_CRM"
pw = "2711"
cs = "localhost:1521/pdborcl"



os.environ['TNS_ADMIN'] = 'C:\app\Milena\product\12.1.0\dbhome_1\network\admin'


#TEMPLATES


@app.route('/vendedor_inicio')
@app.route('/')
def index():
    return render_template('vendedor_inicio.html')

@app.route('/admin_inicio')
def admin_inicio():
    return render_template('Admin_inicio.html')

@app.route('/admin_empleados')
def admin_empleados():
    return render_template('Admin_empleados.html')

@app.route('/admin_inventario')
def admin_inventario():
    return render_template('Admin_inventario.html')

@app.route('/almacen_inicio')
def almacen_inicio():
    return render_template('Almacen_inicio.html')

@app.route('/almacen_inventario')
def almacen_inventario():
    return render_template('Almacen_inventario.html')

@app.route('/cliente_catalogo')
def cliente_catalogo():
    return render_template('cliente_catalogo.html')

@app.route('/cliente_inicio')
def cliente_inicio():
    return render_template('Cliente_inicio.html')

@app.route('/supervisor_empleados')
def supervisor_empleados():
    return render_template('supervisor_empleados.html')

@app.route('/supervisor_inicio')
def supervisor_inicio():
    return render_template('supervisor_inicio.html')

@app.route('/supervisor_inventario')
def supervisor_inventario():
    return render_template('supervisor_inventario.html')

@app.route('/vendedor_inicio')
def vendedor_inicio():
    return render_template('vendedor_inicio.html')

@app.route('/vendedor_inventario')
def vendedor_inventario():
    return render_template('vendedor_inventario.html')

@app.route('/vendedor_vender')
def vendedor_vender():
    return render_template('vendedor_vender.html')

@app.route('/vendedor_ventas')
def vendedor_ventas():
    return render_template('vendedor_ventas.html')

@app.route('/login')
def login():
    return render_template('login.html')

#PETICIONES

@app.route('/productos')
def query_database():
    try: 
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT  P.ID_PRODUCTO,P.NOMBRE, P.STOCK, P.PRECIO, E.LINK FROM PRODUCTO P INNER JOIN EQUIPO E ON P.fk_producto_equipo = E.id_equipo WHERE ROWNUM <= 15 ORDER BY  ID_PRODUCTO DESC")
                results = []
                for row in cursor:
                    results.append(row)
                return jsonify(results)
    except oracledb.Error as e:
        return "Error de Oracle: {}".format(e)

@app.route('/eliminarProducto/<int:id>')
def eliminarProducto(id):
    try: 
        id=str(id)
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                sql= "DELETE FROM PRODUCTO WHERE id_producto="+id
                cursor.execute(sql)
                print(sql)
                connection.commit()
                return jsonify("row")
    except oracledb.Error as e:
        return "Error de Oracle: {}".format(e)
    
@app.route('/consultarStock/<int:id>')
def consultaStock(id):
    try:
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT stock FROM PRODUCTO WHERE id_producto={id}")
                row = cursor.fetchmany(1)
                return jsonify(row)
    except oracledb.Error as e:
        return "Error de Oracle: {}".format(e)

@app.route('/actualizarStock', methods=['POST'])
def actualizaStock():
    try:
        datos = json.loads(request.data)
        idequipo = datos['id_producto']
        stock = datos['stock']
        sql = "CALL SP_AGREGAR_STOCK('PRODUCTO',"+idequipo+","+stock+")"
        print(sql)
        print("-------------------------------")
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql)
                row = cursor.fetchmany(1)
                return jsonify(row)
    except oracledb.Error as e:
        return "Error de Oracle: {}".format(e)

@app.route('/back/inventario_admi_producto/<int:id>',methods=['POST','GET'])
def cargaProductoInventarioAdmi(id):
    connection=oracledb.connect(user=user, password=pw, dsn=cs)
    cur = connection.cursor()
    cur.execute(f"select * from VW_PRODUCTO where id ={id}")
    row = cur.fetchmany(1)
    return jsonify(row)

@app.route('/equipo/<int:id>', methods=['POST','GET'])
def cargaEquipo(id):
        connection=oracledb.connect(user=user, password=pw, dsn=cs)
        cur = connection.cursor()
        cur.execute(f"select * from VISTA1 where id ={id}")
        row = cur.fetchmany(1)
        return jsonify(row)
@app.route('/crearproducto', methods=['POST'])
def crearProducto():
    mensaje = ""
    try:
        datos = json.loads(request.data)
        idequipo = datos['id_equipo']
        idoferta = datos['id_oferta']
        sql = "CALL SP_AGREGAR_PRODUCTO("+ idequipo+","+ idoferta+")"
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql)
        mensaje = "Se completo el registro del producto"
    except Exception as e:
        print(e)
        mensaje = "Error en el registro del producto"
    return (mensaje)

@app.route('/crearvendedor', methods=['POST'])
def crearVendedor():
    mensaje = ""
    try:
        datos = json.loads(request.data)
        usuario = datos['usuario']
        nombre = datos['nombre']
        contrasenia=datos['contrasenia']
        sql = "INSERT INTO VENDEDOR(id_vendedor, usuario, contraseña, nombre) VALUES(F_RETORNA_NUEVO_ID('VENDEDOR'),'"+usuario+"','"+contrasenia+"','"+nombre+"')"
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                print(sql)
                cursor.execute(sql)
                connection.commit()
        mensaje = "Se completo el registro del vendedor"
        
    except Exception as e:
        print(e)
        mensaje = "Error en el registro del vendedor"
    return (mensaje)

@app.route('/empleados')
def empleados():
     try:
         with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
             with connection.cursor() as cursor:
                 cursor.execute("SELECT * FROM VW_EMPLEADO")
                 results = []
                 for row in cursor:
                     results.append(row)
                 print(results)
                 return jsonify(results)
     except oracledb.Error as e:
         return "Error de Oracle: {}".format(e)


@app.route('/maximos')
def maximos():
     try:
         with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
             with connection.cursor() as cursor:
                 cursor.execute("SELECT f_max_camara() AS CAMARA, f_max_ram AS RAM FROM DUAL")
                 results = []
                 for row in cursor:
                     results.append(row)
                 print(results)
                 return jsonify(results)
     except oracledb.Error as e:
         return "Error de Oracle: {}".format(e)

@app.route('/ventas/<int:id>',methods=['POST','GET'])
def ventas(id):
    try:
        id=str(id)
        sql="SELECT id_venta, monto, forma_pago, fecha FROM VENTA WHERE id_vendedor="+id
        print(sql)
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql) 
                results = []
                for row in cursor:
                     results.append(row)
                print(results)
                return jsonify(results)  
    except oracledb.Error as e:
        return "error de Oracle: {}".format(e)
    
@app.route('/commit')
def commit():
    try:
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
             with connection.cursor() as cursor:
                 cursor.execute("commit")
    except oracledb.Error as e:
        return "Error de Oracle: {}".format(e)

@app.route('/productocarrito/<int:id>', methods=['POST','GET'])
def productocarrito(id):
    try:
        id=str(id)
        sql="SELECT id_producto, nombre,  precio FROM PRODUCTO WHERE id_producto="+id
        print(sql)
        with oracledb.connect(user=user, password=pw, dsn=cs) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql) 
                results = []
                for row in cursor:
                     results.append(row)
                print(results)
                return jsonify(results)  
    except oracledb.Error as e:
        return "error de Oracle: {}".format(e)


@app.route('/procesa_login',methods=['POST'])
def procesa_login(cadena):
    aux = cadena.split(',')
    print(aux)
    user = aux[0]
    pw = aux[1]
    connection = oracledb.connect(user=user, password=pw, dsn=cs)
    cur = connection.cursor()
    cur.execute(f"select username, granted_role from user_role_privs")
    row = cur.fetchmany(1)
    print(row)
    print(row[0][1])
    if(row[0][1]=="CLIENTE"):
        print('CLIENTE')
        return redirect('/cliente_inicio')
    elif (row[0][1]=="SUPERVISOR"):
        print('SUPERVISOR')
        return redirect('/supervisor_inicio')
    elif (row[0][1]=="CRM_DBA"):
        print('CRM_DBA')
        return redirect('/admin_inicio')
    elif (row[0][1]=="VENDE"):
        print('VENDE')
        return redirect('/vendedor_inicio')
    elif (row[0][1]=="ALMACEN"):
        print('ALMACEN')
        return redirect('/almacen_inicio')
