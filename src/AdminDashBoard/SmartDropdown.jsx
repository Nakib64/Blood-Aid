import React, { useEffect, useRef, useState } from "react";

export default function SmartDropdown({ icon, children }) {
  const ref = useRef();
  const [openTop, setOpenTop] = useState(false);

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenTop(spaceBelow < 250); // adjust threshold as needed
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`dropdown dropdown-left ${openTop ? "dropdown-top" : ""}`}
    >
      <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle text-right">
        {icon}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-xl w-52 space-y-1"
      >
        {children}
      </ul>
    </div>
  );
}
