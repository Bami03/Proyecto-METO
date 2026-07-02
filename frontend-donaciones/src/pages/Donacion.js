import { useState } from 'react';

function Donacion() {
  const [tipo, setTipo] = useState('anonimo');
  const [monto, setMonto] = useState('');
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [archivo, setArchivo] = useState(null);

  const enviarDonacion = async () => {
    if (!monto || monto < 1000) {
      alert('El monto mínimo es $1.000');
      return;
    }
    if (!archivo) {
      alert('Debes adjuntar el comprobante de transferencia');
      return;
    }
    if (tipo === 'registrado') {
      if (!rut || !nombre || !apellido || !correo) {
        alert('Debes completar todos los campos para donar como registrado');
        return;
      }
      const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!soloLetras.test(nombre)) {
        alert('El nombre solo puede contener letras');
        return;
      }
      if (!soloLetras.test(apellido)) {
        alert('El apellido solo puede contener letras');
        return;
      }
      const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formatoCorreo.test(correo)) {
        alert('El correo no tiene un formato válido');
        return;
      }
      const formatoRut = /^\d{7,8}-[\dkK]$/;
      if (!formatoRut.test(rut)) {
        alert('El RUT debe tener el formato 12345678-9');
        return;
      }
    }

    const formData = new FormData();
    formData.append('monto', monto);
    formData.append('es_anonimo', tipo === 'anonimo');
    formData.append('comprobante', archivo);

    if (tipo === 'registrado') {
      formData.append('rut', rut);
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('correo', correo);
    }

    const respuesta = await fetch('http://localhost:3000/api/donaciones', {
      method: 'POST',
      body: formData
    });

    const datos = await respuesta.json();
    console.log(datos);
  };

  return (
    <div>
      <h1>Gestión de Donaciones</h1>

      <label>
        <input
          type="radio"
          value="anonimo"
          checked={tipo === 'anonimo'}
          onChange={() => setTipo('anonimo')}
        /> Anónimo
      </label>

      <label>
        <input
          type="radio"
          value="registrado"
          checked={tipo === 'registrado'}
          onChange={() => setTipo('registrado')}
        /> Registrado
      </label>

      {tipo === 'registrado' && (
        <div>
          <input type="text" placeholder="RUT" value={rut} onChange={(e) => setRut(e.target.value)} />
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
      )}

      <input
        type="number"
        min="1000"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <input
        type="file"
        accept=".jpg,.png,.pdf"
        onChange={(e) => setArchivo(e.target.files[0])}
      />

      <button onClick={enviarDonacion}>Enviar donación</button>
    </div>
  );
}

export default Donacion;