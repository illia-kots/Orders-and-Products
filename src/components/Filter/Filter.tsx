import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items } = useAppSelector((state) => state.products);
  const [isOpened, setIsOpened] = useState(false);
  const type = searchParams.get('type') || '';

  const initialState = !type ? 'All' : type;

  const [selectedValue, setSelectedValue] = useState(initialState);

  const typeSet = new Set(items.map(
    item => item.type,
  ));

  const typeList = ['All', ...typeSet.keys()];

  const handleChangeValue = (value: string) => {
    setSelectedValue(value);
    setIsOpened(false);

    setSearchParams(
      getSearchWith(searchParams, {
        sort: value || null,
      }),
    );
  };

  const handleToggleList = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="dropdown">
      <button
        className={classNames(
          'btn btn-secondary dropdown-toggle',
          { show: isOpened },
        )}
        type="button"
        data-toggle="dropdown"
        onClick={handleToggleList}
      >
        {selectedValue}

        <span className="caret" />
      </button>

      <ul className={classNames(
        'dropdown-menu',
        { show: isOpened },
      )}
      >
        {typeList.map((item) => (
          <SearchLink
            key={item}
            className="dropdown-item"
            params={{
              type: item === 'All' ? null : item,
            }}
            onClick={() => handleChangeValue(item)}
          >
            {item}
          </SearchLink>
        ))}
      </ul>
    </div>
  );
};
