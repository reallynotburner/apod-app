import withFocusable from "@noriginmedia/react-spatial-navigation/dist/withFocusable";
import { useEffect } from "react";
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
      <ul className={styles.swimlane}>
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
      </ul>
    </div>
  );
};

export default Swimlane;