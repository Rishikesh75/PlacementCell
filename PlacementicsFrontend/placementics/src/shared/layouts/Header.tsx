import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-logo">
          <Image
            src="/icons/placementics.svg"
            alt="Placementics logo"
            width={48}
            height={48}
          />
        </div>

        <div>
          <div className="brand-name">Placements</div>
          <div className="brand-subtitle">
            PLACEMENT RECORDS NETWORK
          </div>
        </div>
      </div>

      <div className="header-info">
        Est. records from 40+ institutes
      </div>
    </header>
  );
}