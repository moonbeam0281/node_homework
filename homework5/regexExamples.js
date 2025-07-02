const regexExamples = [
  { name: "Phone MK", pattern: /^\+389\s?\d{3}[-/]\d{3}\/?\d{3}?$/ },
  { name: "Address", pattern: /^[А-Яа-яA-Za-z\s]+,\s?.+бр\.\d+,?\s?\d{4}$/ },
  { name: "Email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  { name: "Username (4-12 chars)", pattern: /^[a-zA-Z0-9_]{4,12}$/ },
  { name: "Postal Code (4 digits)", pattern: /^\d{4}$/ },
  { name: "Date (DD/MM/YYYY)", pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[0-2])[\/]\d{4}$/ },
  { name: "MK License Plate", pattern: /^SK\s\d{3,4}[A-Z]{2}$/ },
  { name: "Hex Color", pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ },
  { name: "Strong Password", pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
  { name: "Binary Number", pattern: /^[01]+$/ }
];

export default regexExamples;