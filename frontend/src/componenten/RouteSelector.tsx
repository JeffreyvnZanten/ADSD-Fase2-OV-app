type Route = {
    id: number,
    name: string,
    departureStation: string,
    arrivalStation: string,
    departureTime: string,
    arrivalTime: string,
    departurePlatform: string,
    arrivalPlatform: string;
  }

type RouteSelectorProps = {
    routes: Route[],
    date: string,
}

export const RouteSelector = ({routes, date}: RouteSelectorProps) => {
    return (
      <div>
        <h1>{date}</h1>
        {routes.map((item, index) => (
            // This div needs flex row
          <div key={index} className="route">
            <div>
                <h1>{item.departureTime}</h1> 
                <h1>{item.arrivalTime}</h1>
            </div>
          </div>
        ))}
      </div>
    )
  }