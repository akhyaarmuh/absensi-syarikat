import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Breadcrumbs, Input, Button } from '../../components';

import { updateEventById } from '../../fetchers/event';
import { createUser } from '../../fetchers/user';

const forms = [
  {
    type: 'text',
    required: true,
    autoComplete: 'off',
    label: 'Nama Lengkap',
    placeholder: 'Nama lengkap pengguna...',
    name: 'full_name',
  },
  {
    type: 'text',
    required: true,
    autoComplete: 'off',
    label: 'Email',
    placeholder: 'Email pengguna...',
    name: 'email',
  },
  {
    type: 'password',
    required: true,
    autoComplete: 'off',
    label: 'Katasandi',
    placeholder: 'Katasandi...',
    name: 'password',
  },
];

const Form = (props) => {
  const { type } = props;
  const breadList = [
    { title: 'Beranda', href: '/' },
    { title: 'Pengguna', href: '/user' },
    { title: type === 'create' ? 'Buat' : 'Perbarui' },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ full_name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({ full_name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (type === 'update') {
      if (!location.state) return navigate('/user');
      setPayload(location.state);
    }
  }, [type, location, navigate]);

  useEffect(() => {
    if (!saving) document.querySelector('input[name="full_name"]').focus();
  }, [saving]);

  const handleChangeInput = (e) => {
    const key = e.target.name;
    setPayload({ ...payload, [key]: e.target.value });
    setError({ ...error, [key]: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (type === 'update') {
        await updateEventById(payload);
        navigate('/user');
      } else {
        await createUser(payload);
        setPayload({ full_name: '', email: '', password: '' });
        Swal.fire({
          icon: 'success',
          title: `Pengguna berhasil dibuat`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      if (error.response.status === 422)
        setError({ ...error, ...error.response.data.data });
      else {
        console.log(error);
        setErr(error.response.data.message);
      }
    }

    setSaving(false);
  };

  return (
    <>
      <Breadcrumbs list={breadList} />

      <form onSubmit={handleSave}>
        <div className="grid gap-5 tablet:grid-cols-2">
          {forms.map(({ name, ...props }, i) => {
            return (
              <Input
                key={i}
                {...props}
                preventEnter
                disabled={saving}
                name={name}
                value={payload[name]}
                errorMessage={error[name]}
                onChange={handleChangeInput}
              />
            );
          })}
        </div>
        <div className="h-2"></div>
        {err && <p className="text-center text-sm text-red-500">{err}</p>}
        <div className="h-2"></div>
        <Button
          label={type === 'create' ? 'Simpan' : 'Perbarui'}
          size="md"
          block
          disabled={saving}
        />
      </form>
    </>
  );
};

export default Form;
