import { useEffect, useState } from 'react';
import './TopMenu.scss';

export const TopMenu: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const optionsToday: Intl.DateTimeFormatOptions = { weekday: 'long' };

  const today = currentDate.toLocaleString(undefined, optionsToday);
  const time = currentDate.toLocaleString(undefined, optionsTime);
  const date = currentDate.toLocaleString(undefined, optionsDate).toUpperCase();

  const formatedDate = date.slice(0, -2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="top-menu">
      <div className="container top-menu__container">
        <div className="top-menu__date">
          <span className="today">
            {today}
          </span>

          <br />
          {formatedDate}

          <div className="
            icon
            fa-regular
            fa-clock
            text-success"
          />

          {time}
        </div>
      </div>
    </div>
  );
};
