import useInnerSize from "./useInnerSize";

const useDeviceMatch = () => {
    const { innerWidth } = useInnerSize();

    return { matchesMobile: innerWidth <= 768 };
}

export default useDeviceMatch;