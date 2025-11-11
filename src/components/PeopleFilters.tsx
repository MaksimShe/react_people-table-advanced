import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type Action = 'delete' | 'change' | 'add';

export const PeopleFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sex = searchParams.get('sex');
  const buttonsCentury = [16, 17, 18, 19, 20];

  function handleClick(
    queryParam: FilterType,
    value: string,
    action: Action = 'change',
  ) {
    if (action === 'delete') {
      searchParams.delete(queryParam);
    } else if (action === 'add') {
      if (searchParams.getAll('centuries').includes(value)) {
        searchParams.delete(queryParam, value);
      } else {
        searchParams.append(queryParam, value);
      }
    } else {
      if (value) {
        searchParams.set(queryParam, value);
      } else {
        searchParams.delete(queryParam);
      }
    }

    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  }

  const thisActiveCenturyBtn = (num: number) => {
    const newParams = new URLSearchParams(location.search);

    return newParams.getAll('centuries').includes(String(num));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          onClick={() => handleClick('sex', '', 'delete')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleClick('sex', 'm')}
        >
          Male
        </a>

        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleClick('sex', 'f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onInput={e => handleClick('query', e.currentTarget.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {buttonsCentury.map(item => (
              <a
                key={item}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': thisActiveCenturyBtn(item),
                })}
                onClick={() => handleClick('centuries', String(item), 'add')}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => handleClick('centuries', '', 'delete')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
