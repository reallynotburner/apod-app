import withFocusable from "@noriginmedia/react-spatial-navigation/dist/withFocusable";
import { useEffect, useRef } from "react";
import styles from '../../styles/Home.module.css';
import Card from "./Card";

const FocusableCard = withFocusable()(Card);
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Swimlane = ({ month, year, days, index, focused, setFocus, hasFocusedChild }) => {
  useEffect(() => {
    // the docs don't say you need to do this, but I've had trouble getting it
    // to work without a zero setTimeout.
    if (index === 0) setTimeout(() => setFocus('card_0_0'), 0);
    // setFocus('card_0_0');
  });

  // I haven't figured out why hasFocusedChild doesn't work, it may
  // be that the HOC for SN needs to have direct chidren like in their
  // docs ?:
  // <FocusableMenu>
  //  <FocusableMenuItem />
  //  <FocusableMenuItem />
  //  <FocusableMenuItem />
  // </FocusableMenu>

  return (
    <div key={index} >
      <h1 className={styles.swimlaneTitle}>{monthNames[month]} {year}</h1>
      <Carousel className={styles.swimlane}>
        {days.map(({ title, thumbnailUrl, date, url }, idx) => {
          return <FocusableCard
            key={`${idx}-${title}`}
            focusKey={`card_${index}_${idx}`}
            thumbnailUrl={thumbnailUrl}
            date={date}
            title={title}
            url={url}
          />
        })}
      </Carousel>
    </div>
  );
};

const Carousel = ({children, className}) => {
  let containerRef = useRef(null);
  
  const focusListener = (event) => {
    const container = containerRef.current;
    const childNodes = container.childNodes;
    const length = childNodes.length;
    const target = event.target;    
    const overallContainerWidth = container.scrollWidth;
    const containerVisibleWidth = container.clientWidth;

    const maxDelta = overallContainerWidth - containerVisibleWidth;
    const delta = length > 1 ? maxDelta / (length - 1) : 0;

    let targetIndex = 0;
    for (let i = 0; i < length; i++) {
      if (target === childNodes[i]) {
        targetIndex = i;
        break;
      }
    }

    container.scrollTo(delta * targetIndex,0);
  };

  const subscribe = () => {
    if (containerRef && containerRef.current) {
      const container = containerRef.current;
      const children = container.childNodes;
      const length = children.length;
      for (let i = 0; i < length; i++) {
        children[i].addEventListener('focus', focusListener);
      }
    } 
  };

  const unsubscribe = () => {
    if (containerRef && containerRef.current) {
      const container = containerRef.current;
      const children = container.childNodes;
      const length = children.length;
      for (let i = 0; i < length; i++) {
        children[i].removeEventListener('focus', focusListener);
      }
    } 
  };

  useEffect(() => {
    subscribe();
    return unsubscribe;
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export default Swimlane;