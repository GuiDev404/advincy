const Gift = (props) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <rect x={3} y={8} width={18} height={4} rx={1} />
    <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const NoGift = (props) => (
  <svg
    className=""
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M12 8h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4m-4 0H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4M12 12v9" />
    <path d="M19 12v3m0 4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1-2.457-2.963m2.023-2C7.206 3.014 7.352 3 7.5 3c1.974-.034 3.76 1.95 4.5 5 .74-3.05 2.526-5.034 4.5-5a2.5 2.5 0 1 1 0 5M3 3l18 18" />
  </svg>
);

const AddIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const DeleteIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const TrashIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

const PencilIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
    <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" />
  </svg>
);

const DuplicateIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3" />
  </svg>
);

export { NoGift, Gift, AddIcon, DeleteIcon, TrashIcon, PencilIcon, DuplicateIcon };
