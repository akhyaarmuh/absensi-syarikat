import Swal from 'sweetalert2';
import { ImBoxAdd } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { toRupiah } from '../../utilities';
import { Breadcrumbs, Button } from '../../components';
import { getAllUser, deleteUserById } from '../../fetchers/user';

const breadList = [{ title: 'Beranda', href: '/' }, { title: 'Pengguna' }];

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    data: [],
    page: 1,
    limit: 0,
    rows: 0,
    pages: 0,
  });
  const [queries, setQueries] = useState({
    page: 1,
    limit: 20,
  });
  const [getting, setGetting] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      setGetting(true);
      try {
        const data = await getAllUser(queries);
        setUser(data);
      } catch (error) {
        console.log(error);
      }

      setGetting(false);
    };

    getAll();
  }, [queries]);

  const handleDelete = (deleted) => {
    Swal.fire({
      title: `Hapus pengguna '${deleted.full_name}'?`,
      text: `Anda yakin`,
      icon: 'question',
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#287bff',
      showDenyButton: true,
      denyButtonText: 'Batal',
      denyButtonColor: '#dc3545',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return (async () => {
          try {
            await deleteUserById(deleted.id);
          } catch (error) {
            Swal.showValidationMessage(error.response?.data?.message || error.message);
          }
        })();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((res) => {
      if (res.isConfirmed) {
        setUser({
          ...user,
          data: user.data.filter((user) => user.id !== deleted.id),
          rows: user.rows - 1,
        });

        Swal.fire({
          icon: 'success',
          title: `Pengguna berhasil dihapus`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      <Breadcrumbs list={breadList} />

      <Button
        label="Tambah Pengguna"
        icon={<ImBoxAdd className="text-lg" />}
        size="md"
        onClick={() => navigate('/user/create')}
      />

      <div className="my-5 overflow-x-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-xs uppercase">
            <tr className="border-y">
              <th className="w-[50px] whitespace-nowrap px-6 py-3 ">No.</th>
              <th className="whitespace-nowrap px-6">Nama Lengkap</th>
              <th className="whitespace-nowrap px-6">Email</th>
              <th className="whitespace-nowrap px-6"></th>
            </tr>
          </thead>
          <tbody>
            {user.data.map((user, i) => (
              <tr
                className={
                  i % 2 === 1 ? 'border-y' : 'border-y bg-neutral-100 dark:bg-transparent'
                }
                key={user.id}
              >
                <td className="whitespace-nowrap px-6 py-3 text-center">
                  {(queries.page - 1) * queries.limit + (i + 1)}
                </td>
                <td
                  className={`whitespace-nowrap px-6${
                    user.status ? '' : ' text-red-500'
                  }`}
                >
                  {user.full_name}
                </td>
                <td className="whitespace-nowrap px-6">{user.email}</td>
                <td className="whitespace-nowrap px-6 text-right">
                  {user.role !== 'admin' && (
                    <Button
                      label="Hapus"
                      type="danger"
                      outline
                      onClick={() => handleDelete(user)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <p>Total data: {toRupiah(user.rows)}</p>

      {user.rows > 0 && (
        <>
          <p>
            Halaman: {toRupiah(user.page)} dari {toRupiah(user.pages)} halaman.
          </p>

          <div className="flex justify-end gap-x-2">
            {user.page > 1 && (
              <Button
                label="Sebelumnya"
                icon={<BsArrowLeftShort className="text-xl" />}
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: user.page - 1 })}
              />
            )}

            {user.page < user.pages && (
              <Button
                label="Selanjutnya"
                icon={<BsArrowRightShort className="text-xl" />}
                reverse
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: user.page + 1 })}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default User;
