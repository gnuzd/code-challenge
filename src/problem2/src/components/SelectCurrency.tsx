import React from "react";
import country from "country-list-js";

type Props = {
  id: string;
  onSelect?: (option: any) => void;
};

const countries = country.all as unknown as object;

export default function SelectCurrency({ id, onSelect }: Props) {
  const [selected, setSelected] = React.useState<any>();

  const componentRef = React.useRef<any>(null);

  const handleClose = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      document.getElementById(id)?.removeAttribute("open");
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  return (
    <details id={id} ref={componentRef} className="dropdown w-full">
      <summary className="btn btn-outline btn-neutral w-full">
        {selected ? (
          <>
            <img
              alt={selected.name}
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selected.iso2}.svg`}
              className="w-5"
            />
            {selected.currency}
          </>
        ) : (
          "Please Select"
        )}
      </summary>

      <ul className="menu h-60 flex flex-row overflow-auto dropdown-content bg-base-100 rounded-box z-1 p-2 shadow w-full mt-1">
        {Object.entries(countries).map(([code, item]) => (
          <li
            key={code}
            className="flex flex-col w-full"
            onClick={() => {
              document.getElementById(id)?.removeAttribute("open");
              setSelected(item);
              onSelect?.(item);
            }}
          >
            <a>
              <img
                alt={item.name}
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
                className="w-5"
              />
              {item.currency}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
