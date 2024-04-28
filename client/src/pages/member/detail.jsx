import Barcode from 'react-barcode';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { parseDate } from '../../utilities';
import dummyProfile from '../../assets/images/profile.jpg';
import { Breadcrumbs } from '../../components';
import { getMemberById, getAbsenDetailsMemberById } from '../../fetchers/member';

const breadList = [
  { title: 'Beranda', href: '/' },
  { title: 'Anggota', href: -1 },
  { title: 'Detail Member' },
];
const displayBirth = (date) => {
  if (!date) return '-';

  const { dateWithZero, monthString, year } = parseDate(date);
  return `${dateWithZero} ${monthString} ${year}`;
};

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [member, setMember] = useState({ kematian_details: [], dzikiran_details: [] });

  useEffect(() => {
    const getDetailMember = async () => {
      if (!location.state) return navigate('/member');
      const member = await getMemberById(location.state.id);
      const details = await getAbsenDetailsMemberById(location.state.id);

      setMember({ ...member, ...details });
    };

    getDetailMember();
  }, [location, navigate]);

  return (
    <>
      <Breadcrumbs list={breadList} />

      <div className="flex justify-center">
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-700 tablet:max-w-2xl tablet:flex-row">
          <img
            className="h-96 w-full self-center object-cover tablet:h-full tablet:w-48"
            src={member.image ? `${member.url}/${member.image}` : dummyProfile}
            alt=""
          />
          <div className="flex flex-1 flex-col justify-center p-6">
            <h5 className="mb-3 self-center font-['Uthmanic'] text-2xl font-medium text-neutral-800 dark:text-neutral-50">
              المصطفى الأمين
            </h5>
            <p className="flex text-base text-neutral-600 dark:text-neutral-200">
              <span className="inline-block w-[105px]">Nama</span>
              <span className="mr-2">:</span>
              <span>{member.full_name}</span>
            </p>
            <p className="flex text-base text-neutral-600 dark:text-neutral-200">
              <span className="inline-block w-[105px]">Bin/Binti</span>
              <span className="mr-2">:</span>
              <span>{member.father_name}</span>
            </p>
            <p className="flex text-base text-neutral-600 dark:text-neutral-200">
              <span className="inline-block w-[105px]">Alamat</span>
              <span className="mr-2">:</span>
              <span className="flex-1">{member.address}</span>
            </p>
            <p className="flex text-base text-neutral-600 dark:text-neutral-200">
              <span className="inline-block w-[105px]">Tanggal Lahir</span>
              <span className="mr-2">:</span>
              <span>{displayBirth(member.birth)}</span>
            </p>
            <p className="flex text-base text-neutral-600 dark:text-neutral-200">
              <span className="inline-block w-[105px]">Wilayah</span>
              <span className="mr-2">:</span>
              <span>{member.regions?.name}</span>
            </p>

            <div className="mt-3 self-center">
              <Barcode
                value={member.no_induk || 'no_set'}
                height={25}
                fontSize={15}
                background="rgba(0,0,0,0)"
              />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-3 text-xl">Detail Absen Dzikiran :</h3>
      <ul>
        {member.dzikiran_details.map((event, i) => (
          <li key={i}>
            {event.name} - {displayBirth(event.created_at)} ={' '}
            {event.hadir ? 'Hadir' : 'Tidak Hadir'}
          </li>
        ))}
      </ul>

      <h3 className="mt-3 text-xl">Detail Absen Kematian :</h3>
      <ul>
        {member.kematian_details.map((event, i) => (
          <li key={i}>
            {event.name} - {displayBirth(event.created_at)} ={' '}
            {event.hadir ? 'Hadir' : 'Tidak Hadir'}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Detail;
