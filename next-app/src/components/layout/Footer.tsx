export function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 mt-8 pb-8">
      <p className="mb-2">
        Climb data sourced from{' '}
        <a
          href="https://climbfinder.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline"
        >
          ClimbFinder
        </a>
        {' '}and{' '}
        <a
          href="https://pjammcycling.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline"
        >
          PJAMM Cycling
        </a>
      </p>
      <p>
        Physics model based on{' '}
        <a
          href="https://www.gribble.org/cycling/power_v_speed.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline"
        >
          cycling power calculations
        </a>
      </p>
    </footer>
  );
}
