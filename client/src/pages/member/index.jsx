import Swal from 'sweetalert2';
import Select from 'react-select';
import { ImBoxAdd } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { toRupiah } from '../../utilities';
import { Breadcrumbs, Button, Badges } from '../../components';
import { getAllMember, deleteMemberById } from '../../fetchers/member';

const breadList = [{ title: 'Beranda', href: '/' }, { title: 'Anggota' }];

const Member = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const regions = useSelector((state) => state.region.data);
  const [member, setMember] = useState({
    data: [],
    page: 0,
    limit: 0,
    rows: 0,
    pages: 0,
  });
  const [queries, setQueries] = useState({
    'no-induk': params.get('no-induk') || '',
    'full-name': params.get('full-name') || '',
    status: params.get('status') || '',
    region: params.get('region') || '',
    page: params.get('page') || 1,
    limit: 20,
  });
  const [getting, setGetting] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      setGetting(true);
      try {
        const data = await getAllMember(queries);
        setMember(data);
      } catch (error) {
        console.log(error);
      }

      setGetting(false);
    };

    for (const property in queries) {
      if (queries[property]) {
        params.set(property, queries[property]);
      } else {
        params.delete(property);
      }
    }
    setParams(params);

    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  const changeInputQueries = (e) => {
    if (getting) return;

    const name = e.target.name;
    const value = e.target.value;

    if (e.key === 'Enter' || (value === '' && queries[name] !== ''))
      setQueries({ ...queries, [name]: value, page: 1 });
  };

  const handleDelete = (deleted) => {
    Swal.fire({
      title: `Hapus anggota ${deleted.full_name}?`,
      text: 'Anda yakin',
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
            await deleteMemberById(deleted.id);
          } catch (error) {
            Swal.showValidationMessage(error.response?.data?.message || error.message);
          }
        })();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((res) => {
      if (res.isConfirmed) {
        setMember({
          ...member,
          data: member.data.filter((member) => member.id !== deleted.id),
          rows: member.rows - 1,
        });

        Swal.fire({
          icon: 'success',
          title: `${deleted.full_name} berhasil dihapus`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const getUrl = () => {
    return member.url;
  };

  return (
    <>
      <Breadcrumbs list={breadList} />

      <Button
        label="Tambah Anggota"
        icon={<ImBoxAdd className="text-lg" />}
        size="md"
        onClick={() => navigate('/member/create')}
      />

      <div className="my-5 overflow-x-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-xs uppercase">
            <tr>
              <th className="min-w-[185px] py-3 pr-4">
                <input
                  className="w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:border-[#4B5563] dark:bg-charcoal dark:text-white"
                  placeholder="Masukkan no. induk..."
                  name="no-induk"
                  autoComplete="off"
                  defaultValue={queries['no-induk']}
                  autoFocus
                  onKeyUp={changeInputQueries}
                />
              </th>
              <th className="pr-4">
                <input
                  className="w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:border-[#4B5563] dark:bg-charcoal dark:text-white"
                  placeholder="Masukkan nama anggota..."
                  name="full-name"
                  autoComplete="off"
                  defaultValue={queries['full-name']}
                  onKeyUp={changeInputQueries}
                />
              </th>

              <th>
                <Select
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  menuPosition="fixed"
                  placeholder="Status..."
                  name="status"
                  isClearable
                  options={[
                    { value: 'new', label: 'Baru' },
                    { value: 'active', label: 'Aktif' },
                    { value: 'inactive', label: 'Tidak Aktif' },
                    { value: 'repeat', label: 'Mengulang' },
                  ]}
                  defaultValue={
                    !queries.status
                      ? []
                      : queries.status === 'new'
                      ? { value: 'new', label: 'Baru' }
                      : queries.status === 'active'
                      ? { value: 'active', label: 'Aktif' }
                      : queries.status === 'not active'
                      ? { value: 'inactive', label: 'Tidak Aktif' }
                      : { value: 'repeat', label: 'Mengulang' }
                  }
                  onChange={(e) =>
                    setQueries({ ...queries, status: e?.value || '', page: 1 })
                  }
                />
              </th>
              <th className="min-w-[190px] pr-4">
                <Select
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  menuPosition="fixed"
                  placeholder="Semua wilayah..."
                  name="region"
                  isClearable
                  options={regions}
                  defaultValue={regions.find((r) => r.value === queries.region)}
                  onChange={(e) =>
                    setQueries({ ...queries, region: e?.value || '', page: 1 })
                  }
                />
              </th>
              <th></th>
            </tr>

            <tr className="border-y">
              <th className="whitespace-nowrap px-6 py-3">No. Induk</th>
              <th className="whitespace-nowrap px-6">Nama Lengkap</th>
              <th className="whitespace-nowrap px-6">Status</th>
              <th className="whitespace-nowrap px-6">Wilayah</th>
              <th className="whitespace-nowrap px-6"></th>
            </tr>
          </thead>

          <tbody>
            {member.data.map((member, i) => (
              <tr
                className={
                  i % 2 === 1 ? 'border-y' : 'border-y bg-neutral-100 dark:bg-transparent'
                }
                key={member._id}
              >
                <td className="whitespace-nowrap px-6 py-3 text-primary">
                  <span
                    className="cursor-pointer hover:underline dark:font-bold"
                    onClick={() =>
                      navigate(`/member/${member.id}/detail`, {
                        state: { ...member, url: getUrl() },
                      })
                    }
                  >
                    {member.no_induk}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6">{member.full_name}</td>
                <td className="whitespace-nowrap px-6">
                  {member.status === 'new' && <Badges label="Baru" />}
                  {member.status === 'active' && <Badges label="Aktif" type="success" />}
                  {member.status === 'inactive' && (
                    <Badges label="Tidak Aktif" type="danger" />
                  )}
                  {member.status === 'repeat' && (
                    <Badges label="Mengulang" type="warning" />
                  )}
                </td>
                {/* <td className="whitespace-nowrap px-6">
                  {
                    (member.status = 'new' ? (
                      <Badges label="Baru" />
                    ) : (
                      (member.status = 'active' ? (
                        <Badges label="Aktif" type="success" />
                      ) : (
                        (member.status = 'not active' ? (
                          <Badges label="Tidak Aktif" type="danger" />
                        ) : (
                          <Badges label="Mengulang" type="warning" />
                        ))
                      ))
                    ))
                  }
                </td> */}
                <td className="whitespace-nowrap px-6">{member.regions.name}</td>
                <td className="whitespace-nowrap px-6 text-right">
                  <Button
                    label="Ubah"
                    outline
                    onClick={() =>
                      navigate(`/member/${member._id}/update`, {
                        state: { ...member, url: getUrl() },
                      })
                    }
                  />
                  <span className="inline-block w-1"></span>
                  <Button
                    label="Hapus"
                    type="danger"
                    outline
                    onClick={() => handleDelete(member)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <p>Total data: {toRupiah(member.rows)}</p>

      {member.rows > 0 && (
        <>
          <p>
            Halaman: {toRupiah(member.page)} dari {toRupiah(member.pages)} halaman.
          </p>

          <div className="flex justify-end gap-x-2">
            {member.page > 1 && (
              <Button
                label="Sebelumnya"
                icon={<BsArrowLeftShort className="text-xl" />}
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: member.page - 1 })}
              />
            )}

            {member.page < member.pages && (
              <Button
                label="Selanjutnya"
                icon={<BsArrowRightShort className="text-xl" />}
                reverse
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: member.page + 1 })}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Member;
