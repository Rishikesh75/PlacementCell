export interface Institute {
  id: number;
  shortName: string;
  name: string;
  location: string;
  alumni: string;
  recruiters: string;
  placement: string;
}

export const institutes: Institute[] = [
  {
    id: 1,
    shortName: "IT",
    name: "Indian Institute of Technology, Chennai",
    location: "Chennai, Tamil Nadu",
    alumni: "1,240",
    recruiters: "86",
    placement: "94%",
  },
  {
    id: 2,
    shortName: "NT",
    name: "National Institute of Technology, Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    alumni: "980",
    recruiters: "71",
    placement: "91%",
  },
  {
    id: 3,
    shortName: "PS",
    name: "PSG College of Technology",
    location: "Coimbatore, Tamil Nadu",
    alumni: "1,510",
    recruiters: "93",
    placement: "89%",
  },
  {
    id: 4,
    shortName: "SR",
    name: "SRM Institute of Science & Technology",
    location: "Kattankulathur, Tamil Nadu",
    alumni: "2,220",
    recruiters: "140",
    placement: "82%",
  },
  {
    id: 5,
    shortName: "VI",
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    alumni: "3,010",
    recruiters: "165",
    placement: "85%",
  },
  {
    id: 6,
    shortName: "AU",
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    alumni: "1,860",
    recruiters: "78",
    placement: "79%",
  },
];