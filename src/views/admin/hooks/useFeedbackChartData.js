import { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';

export default function useFeedbacksChartData(feedbacks) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = subDays(new Date(), i);
            days.push({
                name: format(date, 'EEE'), // Dom, Seg, Ter, ...
                dateKey: format(date, 'yyyy-MM-dd'),
                feedbacks: 0,
            });
        }

        feedbacks.forEach(fb => {
            const fbDate = format(new Date(fb.dataEnvio), 'yyyy-MM-dd');
            const dayEntry = days.find(d => d.dateKey === fbDate);
            if (dayEntry) dayEntry.feedbacks += 1;
        });

        const result = days.map(({ dateKey, ...rest }) => rest);
        setChartData(result);
    }, [feedbacks]);

    return chartData;
}
