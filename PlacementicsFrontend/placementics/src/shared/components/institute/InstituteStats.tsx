interface InstituteStatsProps {
  alumni: string;
  recruiters: string;
}

export default function InstituteStats({
  alumni,
  recruiters,
}: InstituteStatsProps) {
  return (
    <div className="institute-stats">
      <div className="stat">
        <strong>{alumni}</strong>
        <span>ALUMNI</span>
      </div>

      <div className="stat">
        <strong>{recruiters}</strong>
        <span>RECRUITERS &apos;26</span>
      </div>

    </div>
  );
}