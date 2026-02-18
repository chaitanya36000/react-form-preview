import { useRef, useEffect, useCallback } from "react";

export const useAutoScroll = (threshold = 80, maxSpeed = 15) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollSpeed = useRef(0);
    const animationFrameId = useRef<number | null>(null);

    const performScroll = useCallback(() => {
        if (scrollContainerRef.current && scrollSpeed.current !== 0) {
            scrollContainerRef.current.scrollTop += scrollSpeed.current;
        }
        animationFrameId.current = requestAnimationFrame(performScroll);
    }, []);

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(performScroll);
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [performScroll]);

    const handleAutoScroll = useCallback((clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const relativeY = clientY - rect.top;
        const containerHeight = rect.height;

        if (relativeY < threshold && relativeY > 0) {
            const intensity = (threshold - relativeY) / threshold;
            scrollSpeed.current = -maxSpeed * intensity * 1.5;
        } else if (relativeY > containerHeight - threshold && relativeY < containerHeight) {
            const intensity = (relativeY - (containerHeight - threshold)) / threshold;
            scrollSpeed.current = maxSpeed * intensity * 1.5;
        } else {
            scrollSpeed.current = 0;
        }
    }, [threshold, maxSpeed]);

    const stopScrolling = useCallback(() => {
        scrollSpeed.current = 0;
    }, []);

    return {
        scrollContainerRef,
        handleAutoScroll,
        stopScrolling
    };
};
