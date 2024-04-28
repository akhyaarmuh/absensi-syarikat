import Swal from 'sweetalert2';
import Select from 'react-select';
import { ImBoxAdd } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { parseDate, toRupiah } from '../../utilities';
import { Breadcrumbs, Button } from '../../components';

import { getAllEvent, deleteEventById } from '../../fetchers/event';

const breadList = [{ title: 'Beranda', href: '/' }, { title: 'Kegiatan' }];
const displayDate = (date) => {
  const { dateWithZero, monthString, year } = parseDate(date);

  return `${dateWithZero} ${monthString} ${year}`;
};
const displayTime = (date) => {
  const { hourWithZero, minuteWithZero, secondWithZero } = parseDate(date);

  return `${hourWithZero}:${minuteWithZero}:${secondWithZero}`;
};

const Event = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    data: [],
    page: 0,
    limit: 0,
    rows: 0,
    pages: 0,
  });
  const [queries, setQueries] = useState({
    name: '',
    type: '',
    page: 1,
    limit: 20,
  });
  const [getting, setGetting] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      setGetting(true);
      try {
        const data = await getAllEvent(queries);
        setEvent(data);
      } catch (error) {
        console.log(error);
      }

      setGetting(false);
    };

    getAll();
  }, [queries]);

  const handleDelete = (deleted) => {
    Swal.fire({
      title: `Hapus kegiatan ${
        deleted.type === 'kematian' ? 'kifayah' : 'dzikiran di '
      } ${deleted.name}?`,
      text: `Anda yakin, tindakan ini tidak bisa dikembalikan`,
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
            await deleteEventById(deleted.id);
          } catch (error) {
            Swal.showValidationMessage(error.response?.data?.message || error.message);
          }
        })();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((res) => {
      if (res.isConfirmed) {
        setEvent({
          ...event,
          data: event.data.filter((event) => event.id !== deleted.id),
          rows: event.rows - 1,
        });

        Swal.fire({
          icon: 'success',
          title: `Kegiatan berhasil dihapus`,
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
        label="Tambah Kegiatan"
        icon={<ImBoxAdd className="text-lg" />}
        size="md"
        onClick={() => navigate('/event/create')}
      />

      <div className="my-5 overflow-x-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-xs uppercase">
            <tr>
              <th></th>
              <th className="min-w-[185px] py-3">
                <Select
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  menuPosition="fixed"
                  placeholder="Jenis kegiatan..."
                  name="type"
                  isClearable
                  options={[
                    { value: 'dzikiran', label: 'Dzikiran' },
                    { value: 'kematian', label: 'Kematian' },
                  ]}
                  defaultValue={
                    !queries.type
                      ? []
                      : queries.type === 'dzikiran'
                      ? { value: 'dzikiran', label: 'Dzikiran' }
                      : { value: 'kematian', label: 'Kematian' }
                  }
                  onChange={(e) =>
                    setQueries({ ...queries, type: e?.value || '', page: 1 })
                  }
                />
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>

            <tr className="border-y">
              <th className="whitespace-nowrap px-6 py-3">Tanggal</th>
              <th className="whitespace-nowrap px-6">Jenis Kegiatan</th>
              <th className="whitespace-nowrap px-6">Nama / Tempat</th>
              <th className="whitespace-nowrap px-6">Keterangan</th>
              <th className="whitespace-nowrap px-6"></th>
            </tr>
          </thead>
          <tbody>
            {event.data.map((event, i) => (
              <tr
                className={
                  i % 2 === 1 ? 'border-y' : 'border-y bg-neutral-100 dark:bg-transparent'
                }
                key={event.id}
              >
                <td className="whitespace-nowrap px-6 py-3">
                  {displayDate(event.created_at)}
                  <br />
                  {displayTime(event.created_at)}
                </td>
                <td className="whitespace-nowrap px-6">{event.type.toUpperCase()}</td>
                <td className="whitespace-nowrap px-6">{event.name}</td>
                <td className="px-6">{event.description}</td>
                <td className="whitespace-nowrap px-6 text-right">
                  <Button
                    label="Buat Buku Hadir"
                    type="success"
                    outline
                    onClick={() =>
                      navigate(`/event/${event.id}/create-present`, { state: event })
                    }
                  />
                  <span className="inline-block w-1"></span>

                  <Button
                    label="Ubah"
                    outline
                    onClick={() =>
                      navigate(`/event/${event._id}/update`, { state: event })
                    }
                  />
                  <span className="inline-block w-1"></span>

                  <Button
                    label="Detail"
                    type="success"
                    outline
                    onClick={() =>
                      navigate(`/event/${event.id}/detail`, { state: event })
                    }
                  />
                  <span className="inline-block w-1"></span>

                  <Button
                    label="Hapus"
                    type="danger"
                    outline
                    onClick={() => handleDelete(event)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <p>Total data: {toRupiah(event.rows)}</p>

      {event.rows > 0 && (
        <>
          <p>
            Halaman: {toRupiah(event.page)} dari {toRupiah(event.pages)} halaman.
          </p>

          <div className="flex justify-end gap-x-2">
            {event.page > 1 && (
              <Button
                label="Sebelumnya"
                icon={<BsArrowLeftShort className="text-xl" />}
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: event.page - 1 })}
              />
            )}

            {event.page < event.pages && (
              <Button
                label="Selanjutnya"
                icon={<BsArrowRightShort className="text-xl" />}
                reverse
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: event.page + 1 })}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Event;
