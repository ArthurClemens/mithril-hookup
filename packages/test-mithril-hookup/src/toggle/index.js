import m from "mithril";
import { withHooks } from "mithril-hookup";

const Toggle = ({ useState }) => {
  const [clicked, setClicked] = useState(false);
  return m(".toggle", [
    m("button",
      {
        className: `button ${clicked ? "is-info" : ""}`,
        onclick: () => setClicked(!clicked)
      },
      "Toggle"
    ),
    m(".info", clicked ? "On" : "Off")
  ]);
};

export default withHooks(Toggle);
