type Route = {
  id: number;
  name: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  departurePlatform: string;
  arrivalPlatform: string;
};

type RouteSelectorProps = {
  routes: Route[];
  date: string;
};

export const RouteSelector = ({ routes, date }: RouteSelectorProps) => {
  return (
    <div>
      <h1>{date}</h1>
      {routes.map((route, index) => (
        // This div needs flex row and space-between
        <div key={index} className="route">
          <div>
            <h1>{route.departureTime}</h1>
            <h1>{route.arrivalTime}</h1>
          </div>
          <h1>{route.departurePlatform}</h1>
        </div>
      ))}
    </div>
  );
};
