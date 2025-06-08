import { useCallback, useEffect, useRef, useState } from "react";

export const useHorizontalScroll = () => {
    const [isDragging, setIsDragging] = useState(false);
    const scrollRef = useRef(null);
    const isDraggingRef = useRef(false);

    const handleMouseDown = useCallback((e) => {
        isDraggingRef.current = false;
        setIsDragging(true);

        const slider = scrollRef.current;
        slider.dataset.mouseDown = 'true';
        slider.dataset.startX = e.pageX;
        slider.dataset.scrollLeft = slider.scrollLeft;
    }, []);

    const handleMouseMove = useCallback((e) => {
        const slider = scrollRef.current;
        if (slider.dataset.mouseDown !== 'true') return;

        e.preventDefault();
        isDraggingRef.current = true;

        const x = e.pageX;
        const startX = parseInt(slider.dataset.startX, 10);
        const scrollLeft = parseInt(slider.dataset.scrollLeft, 10);
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    }, []);

    const handleMouseUp = useCallback(() => {
        const slider = scrollRef.current;
        slider.dataset.mouseDown = 'false';
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseUp);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp]);

    return { scrollRef, isDragging, isDraggingRef };
};