import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { toRupiah } from '../../utilities';
import { Breadcrumbs, Button } from '../../components';
import { getAttendanceDetailsById } from '../../fetchers/event';

const breadList = [
  { title: 'Beranda', href: '/' },
  { title: 'Kegiatan', href: '/event' },
  { title: 'Anggota yang hadir' },
];

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [members, setMembers] = useState({
    data: [],
    page: 0,
    limit: 0,
    rows: 0,
    pages: 0,
  });
  const [queries, setQueries] = useState({
    'no-induk': '',
    'full-name': '',
    page: 1,
  });
  const [getting, setGetting] = useState(true);

  useEffect(() => {
    if (!location.state) return navigate('/event');
  }, [location, navigate]);

  useEffect(() => {
    const getAll = async () => {
      setGetting(true);
      try {
        const data = await getAttendanceDetailsById(location.state.id, queries);
        setMembers(data);
      } catch (error) {
        console.log(error);
      }

      setGetting(false);
    };

    getAll();
  }, [queries, location.state.id]);

  const changeInputQueries = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (e.key === 'Enter' || (value === '' && queries[name] !== ''))
      setQueries({ ...queries, [name]: value, page: 1 });
  };

  // const handlePrintPDF = async () => {
  //   // const { data } = await getAllMember({
  //   //   absent: location.state._id,
  //   //   region: queries.region,
  //   //   sort: 'region full_name',
  //   // });
  //   const filtered = filtering(members, queries);

  //   navigate(`/event/${location.state._id}/pdf-preview`, { state: filtered });
  // };

  return (
    <>
      <Breadcrumbs list={breadList} />

      {/* <Button
        label="Download PDF"
        icon={<AiOutlineFilePdf className="text-lg" />}
        size="md"
        onClick={handlePrintPDF}
      /> */}

      {/* table */}
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
                  onKeyUp={changeInputQueries}
                />
              </th>

              <th></th>
              <th></th>
            </tr>

            <tr className="border-y">
              <th className="whitespace-nowrap px-6 py-3">No. Induk</th>
              <th className="whitespace-nowrap px-6">Nama Lengkap</th>
              <th className="whitespace-nowrap px-6">Nama Orangtua</th>
              <th className="whitespace-nowrap px-6">Alamat</th>
            </tr>
          </thead>

          <tbody>
            {members.data.map(({ members }, i) => (
              <tr
                className={
                  i % 2 === 1 ? 'border-y' : 'border-y bg-neutral-100 dark:bg-transparent'
                }
                key={i}
              >
                <td className="whitespace-nowrap px-6 py-3">{members.no_induk}</td>
                <td className="whitespace-nowrap px-6">{members.full_name}</td>
                <td className="whitespace-nowrap px-6">{members.father_name}</td>
                <td className="whitespace-nowrap px-6">{members.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <p>Total data: {toRupiah(members.rows)}</p>

      {members.rows > 0 && (
        <>
          <p>
            Halaman: {toRupiah(members.page)} dari {toRupiah(members.pages)} halaman.
          </p>

          <div className="flex justify-end gap-x-2">
            {members.page > 1 && (
              <Button
                label="Sebelumnya"
                icon={<BsArrowLeftShort className="text-xl" />}
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: members.page - 1 })}
              />
            )}

            {members.page < members.pages && (
              <Button
                label="Selanjutnya"
                icon={<BsArrowRightShort className="text-xl" />}
                reverse
                outline
                disabled={getting}
                onClick={() => setQueries({ ...queries, page: members.page + 1 })}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
