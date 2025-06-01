import { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';

export default function useUsersChartData(users) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = subDays(new Date(), i);
            days.push({
                name: format(date, 'EEE'),
                dateKey: format(date, 'yyyy-MM-dd'),
                users: 0,
            });
        }

        users.forEach(user => {
            const userDate = format(new Date(user.dataCadastro), 'yyyy-MM-dd');
            const dayEntry = days.find(d => d.dateKey === userDate);
            if (dayEntry) dayEntry.users += 1;
        });

        const result = days.map(({ dateKey, ...rest }) => rest);
        setChartData(result);
    }, [users]);

    return chartData;
}
