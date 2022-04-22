import React, {useEffect, useRef, useState} from "react";
import {
    MasonryScroller,
    useContainerPosition,
    useInfiniteLoader,
    usePositioner,
    useResizeObserver,
    useScroller,
    useScrollToIndex
} from "masonic";
import {useWindowSize} from "@react-hook/window-size";
import {CSSTransition} from "react-transition-group";
import MasonryCard from "../card/masonic-card";
import classes from "./Masonry.module.css";
import Spinner from "../spinner/spinner";
import {ScrollSaver, setIsSearching} from "../utils/ScrollSaver/ScrollSaver";
import {calculateMedia} from "../utils/medias";

const set = new Set() // Prevent repetitive fetches

const Masonry = ({searchItem}) => {
    const offsetValue = useRef(0);
    const searchFirstRun = useRef(true);
    const forward = useRef("");
    const searchTimeOut = useRef(null);
    const first = useRef(true);
    const store = useRef([]);
    const [items, setItems] = useState([]);
    const [forSearch, setForSearch] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchOff, setSearchOff] = useState(false);
    const [columnWidth, setColumnWidth] = useState(7);
    const [loading, setLoading] = useState(true);

    const containerRef = React.useRef(null);
    const [windowWidth, windowHeight] = useWindowSize();
    const {offset, width} = useContainerPosition(containerRef, [
        windowWidth,
        windowHeight
    ]);

    const {scrollTop, isScrolling} = useScroller(offset);

    // Positioner hook
    const positioner = usePositioner(
        {width, columnWidth: windowWidth / columnWidth, columnGutter: 0, rowGutter: 25},
        [forSearch]
    );

    // Jump to an item with a specific index
    const scrollToIndex = useScrollToIndex(positioner, {
        offset,
        height: windowHeight,
        align: "center"
    });

    // Make reaction to screen size changes
    const resizeObserver = useResizeObserver(positioner);

    useEffect(() => {
        const result = calculateMedia(windowWidth)
        setColumnWidth(result[0])
    }, [resizeObserver])

    useEffect(() => {
        if (first.current) {
            // Fetch the data on the first render
            first.current = false
            fetch(`https://xoosha.com/ws/1/test.php?offset=0`)
                .then(response => response.json())
                .then(data => {
                    offsetValue.current = offsetValue.current + 60
                    setItems([...data]);
                }).catch((error) => {
                console.log(error);
                setLoading(false)
            });
        }
    }, []);

    useEffect(() => {
        // Handle the search input effects
        if (searchFirstRun.current) {
            searchFirstRun.current = false
            return;
        }

        if ((forward.current.length === 1 && searchItem.length === 0) || (forward.current.length > 0 && searchItem.length === 0)) { // Backward
            setItems([...store.current]);
            setSearchOff(false)

            if (items.length >= ScrollSaver) {
                scrollToIndex(ScrollSaver)
            }

            forward.current = searchItem
            setIsSearching(false)
            return
        }

        if (forward.current.length === 0 && searchItem.length === 1) { // Forward
            store.current = [...items]
            setIsSearching(true)
        }

        const newItems = store.current.filter(item => item.description.toLowerCase().match(searchItem.toLowerCase()))
        setItems(newItems);
        setForSearch(newItems)
        forward.current = searchItem
    }, [searchItem]);

    const fetchMoreItems = async () => {
        if (set.has(offsetValue.current)) {
            return
        }

        if (searchItem.length === 0) {
            setLoading(true)
            setRefresh(false)
            setSearchOff(false)
            set.add(offsetValue.current)
            fetch(`https://xoosha.com/ws/1/test.php?offset=${offsetValue.current}`)
                .then(response => response.json())
                .then(data => {
                    if (forward.current.length > 0) {
                        setLoading(false)
                    } else {
                        offsetValue.current = offsetValue.current + 60
                        setLoading(false)
                        setItems((current) => [...current, ...data]);
                    }
                }).catch((error) => {
                console.log(error);
                setLoading(false)
            });
        } else {
            if (window.scrollY > window.innerHeight + 1000) {
                // setSearchOff(true)
                setRefresh(false)
                if (searchTimeOut.current === null) {
                    searchTimeOut.current = setTimeout(() => {
                        searchTimeOut.current = null
                        setSearchOff(false)
                    }, 3000)
                }
            }
        }
    };

    const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
        isItemLoaded: (index, items) => {
            return !!items[index]
        },
        threshold: 60,
    });

    return (
        <>
            <MasonryScroller
                positioner={positioner}
                resizeObserver={resizeObserver}
                containerRef={containerRef}
                items={items}
                height={windowHeight}
                offset={offset}
                overscanBy={1}
                render={MasonryCard}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
                style={{margin: "150px auto 0 auto", width: "100%"}}
                onRender={maybeLoadMore}
            />

            <CSSTransition in={loading} timeout={300} classNames="load" unmountOnExit>
                <div className={classes.loadWrapper}><Spinner/></div>
            </CSSTransition>


            {/* A warning that notify the user the objects not updated while searching (optional)*/}
            {/*<CSSTransition in={searchOff} timeout={300} classNames="load" unmountOnExit>*/}
            {/*    <div className={classes.NotificationWrapper}>Intentionally not fetch new data while searching</div>*/}
            {/*</CSSTransition>*/}
        </>
    );
};

export default Masonry;
