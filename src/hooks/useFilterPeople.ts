import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const useFilterPeople = (people: Person[]) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const centuries = searchParams.get('centuries');

  useEffect(() => {
    let result = people;

    // фільтр за статтю
    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    // фільтр за пошуковим запитом
    if (query) {
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    // фільтр за століттям
    if (centuries) {
      result = result.filter(p =>
        centuries.includes(String(Math.floor(p.born / 100))),
      );
    }

    setFilteredPeople(result);
  }, [people, sex, query, centuries]);

  return { filteredPeople };
};
