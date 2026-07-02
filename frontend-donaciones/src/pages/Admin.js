import { useState } from 'react';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [donaciones, setDonaciones] = useState([]);

  const login = async () => {
    const respuesta = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const datos = await respuesta.json();
    if (datos.token) {
      setToken(datos.token);
      cargarDonaciones(datos.token);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const cargarDonaciones = async (tkn) => {
    const respuesta = await fetch('http://localhost:3000/api/donaciones', {
      headers: { 'Authorization': `Bearer ${tkn}` }
    });
    const datos = await respuesta.json();
    setDonaciones(datos.data);
  };

  const cambiarEstado = async (id, estado) => {
    await fetch(`http://localhost:3000/api/donaciones/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado })
    });
    cargarDonaciones(token);
  };

  if (!token) {
    return (
      <div>
        <h1>Login Administrador</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Ingresar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Historial de Donaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Comprobante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {donaciones.map((d) => (
            <tr key={d.id_donacion}>
              <td>{d.es_anonimo ? 'Anónimo' : `${d.nombre} ${d.apellido}`}</td>
              <td>${d.monto.toLocaleString('es-CL')}</td>
              <td>{d.estado}</td>
              <td>
                <a href={`http://localhost:3000/uploads/${d.comprobante_url}`} target="_blank" rel="noreferrer">
                    Ver comprobante
                </a>
                </td>
              <td>
                <button onClick={() => cambiarEstado(d.id_donacion, 'validada')}>Validar</button>
                <button onClick={() => cambiarEstado(d.id_donacion, 'rechazada')}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;