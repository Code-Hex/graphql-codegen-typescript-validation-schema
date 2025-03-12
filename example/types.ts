export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Either a latitude or a longitude as a WGS84 format floating point number. */
  CoordinateValue: { input: number; output: number; }
  /**
   * A static cost that is applied to a certain event or entity. Cost is a positive integer,
   * for example `450`. One cost unit should roughly match a one second travel on transit.
   */
  Cost: { input: number; output: number; }
  /** Duration in a lenient ISO-8601 duration format. Example P2DT2H12M40S, 2d2h12m40s or 1h */
  Duration: { input: string; output: string; }
  /** Geographic data structures in JSON format. See: https://geojson.org/ */
  GeoJson: { input: number; output: number; }
  Grams: { input: number; output: number; }
  /**
   * An ISO-8601-formatted local date, i.e. `2024-05-24` for the 24th of May, 2024.
   *
   * ISO-8601 allows many different date formats, however only the most common one - `yyyy-MM-dd` - is accepted.
   */
  LocalDate: { input: string; output: string; }
  /** A IETF BCP 47 language tag */
  Locale: { input: string; output: string; }
  /** A 64-bit signed integer */
  Long: { input: number; output: number; }
  /**
   * An ISO-8601-formatted datetime with offset, i.e. `2023-06-13T14:30+03:00` for 2:30pm on June 13th 2023 at Helsinki's offset from UTC at that time.
   *
   * ISO-8601 allows many different formats but OTP will only return the profile specified in RFC3339.
   */
  OffsetDateTime: { input: string; output: string; }
  /** List of coordinates in an encoded polyline format (see https://developers.google.com/maps/documentation/utilities/polylinealgorithm). The value appears in JSON as a string. */
  Polyline: { input: string; output: string; }
  /** A fractional multiplier between 0 and 1, for example 0.25. 0 means 0% and 1 means 100%. */
  Ratio: { input: number; output: number; }
  /**
   * A cost multiplier for how bad something is compared to being in transit for equal lengths of time.
   * The value should be greater than 0. 1 means neutral and values below 1 mean that something is
   * preferred over transit.
   */
  Reluctance: { input: number; output: number; }
  /** Speed in meters per seconds. Values are positive floating point numbers (for example, 2.34). */
  Speed: { input: number; output: number; }
};

/** The cardinal (compass) direction taken when engaging a walking/driving step. */
export enum AbsoluteDirection {
  East = 'EAST',
  North = 'NORTH',
  Northeast = 'NORTHEAST',
  Northwest = 'NORTHWEST',
  South = 'SOUTH',
  Southeast = 'SOUTHEAST',
  Southwest = 'SOUTHWEST',
  West = 'WEST'
}

/**
 * Plan accessibilty preferences. This can be expanded to contain preferences for various accessibility use cases
 * in the future. Currently only generic wheelchair preferences are available.
 */
export type AccessibilityPreferencesInput = {
  /** Wheelchair related preferences. Note, currently this is the only accessibility mode that is available. */
  wheelchair?: InputMaybe<WheelchairPreferencesInput>;
};

/** A public transport agency */
export type Agency = Node & {
  __typename?: 'Agency';
  /**
   * By default, list of alerts which have an effect on all operations of the agency (e.g. a strike).
   * It's also possible to return other relevant alerts through defining types.
   */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /** URL to a web page which has information of fares used by this agency */
  fareUrl?: Maybe<Scalars['String']['output']>;
  /** Agency feed and id */
  gtfsId: Scalars['String']['output'];
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  lang?: Maybe<Scalars['String']['output']>;
  /** Name of the agency */
  name: Scalars['String']['output'];
  /** Phone number which customers can use to contact this agency */
  phone?: Maybe<Scalars['String']['output']>;
  /** List of routes operated by this agency */
  routes?: Maybe<Array<Maybe<Route>>>;
  /** ID of the time zone which this agency operates on */
  timezone: Scalars['String']['output'];
  /** URL to the home page of the agency */
  url: Scalars['String']['output'];
};


/** A public transport agency */
export type AgencyAlertsArgs = {
  types?: InputMaybe<Array<InputMaybe<AgencyAlertType>>>;
};

/** Entities, which are relevant for an agency and can contain alerts */
export enum AgencyAlertType {
  /** Alerts affecting the agency. */
  Agency = 'AGENCY',
  /** Alerts affecting agency's routes */
  Routes = 'ROUTES',
  /**
   * Alerts affecting the different route types of the agency.
   * Alerts that affect route types on all agencies can be fetched through Feed.
   */
  RouteTypes = 'ROUTE_TYPES'
}

/** Alert of a current or upcoming disruption in public transportation */
export type Alert = Node & {
  __typename?: 'Alert';
  /**
   * Agency affected by the disruption. Note that this value is present only if the
   * disruption has an effect on all operations of the agency (e.g. in case of a strike).
   * @deprecated Alert can have multiple affected entities now instead of there being duplicate alerts
   * for different entities. This will return only one of the affected agencies.
   * Use entities instead.
   */
  agency?: Maybe<Agency>;
  /** Alert cause */
  alertCause?: Maybe<AlertCauseType>;
  /** Long description of the alert */
  alertDescriptionText: Scalars['String']['output'];
  /** Long descriptions of the alert in all different available languages */
  alertDescriptionTextTranslations: Array<TranslatedString>;
  /** Alert effect */
  alertEffect?: Maybe<AlertEffectType>;
  /** hashcode from the original GTFS-RT alert */
  alertHash?: Maybe<Scalars['Int']['output']>;
  /** Header of the alert, if available */
  alertHeaderText?: Maybe<Scalars['String']['output']>;
  /** Header of the alert in all different available languages */
  alertHeaderTextTranslations: Array<TranslatedString>;
  /** Alert severity level */
  alertSeverityLevel?: Maybe<AlertSeverityLevelType>;
  /** Url with more information */
  alertUrl?: Maybe<Scalars['String']['output']>;
  /** Url with more information in all different available languages */
  alertUrlTranslations: Array<TranslatedString>;
  /** Time when this alert is not in effect anymore. Format: Unix timestamp in seconds */
  effectiveEndDate?: Maybe<Scalars['Long']['output']>;
  /** Time when this alert comes into effect. Format: Unix timestamp in seconds */
  effectiveStartDate?: Maybe<Scalars['Long']['output']>;
  /** Entities affected by the disruption. */
  entities?: Maybe<Array<Maybe<AlertEntity>>>;
  /** The feed in which this alert was published */
  feed?: Maybe<Scalars['String']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /**
   * Patterns affected by the disruption
   * @deprecated This will always return an empty list. Use entities instead.
   */
  patterns?: Maybe<Array<Maybe<Pattern>>>;
  /**
   * Route affected by the disruption
   * @deprecated Alert can have multiple affected entities now instead of there being duplicate alerts
   * for different entities. This will return only one of the affected routes.
   * Use entities instead.
   */
  route?: Maybe<Route>;
  /**
   * Stop affected by the disruption
   * @deprecated Alert can have multiple affected entities now instead of there being duplicate alerts
   * for different entities. This will return only one of the affected stops.
   * Use entities instead.
   */
  stop?: Maybe<Stop>;
  /**
   * Trip affected by the disruption
   * @deprecated Alert can have multiple affected entities now instead of there being duplicate alerts
   * for different entities. This will return only one of the affected trips.
   * Use entities instead.
   */
  trip?: Maybe<Trip>;
};

/** Cause of a alert */
export enum AlertCauseType {
  /** ACCIDENT */
  Accident = 'ACCIDENT',
  /** CONSTRUCTION */
  Construction = 'CONSTRUCTION',
  /** DEMONSTRATION */
  Demonstration = 'DEMONSTRATION',
  /** HOLIDAY */
  Holiday = 'HOLIDAY',
  /** MAINTENANCE */
  Maintenance = 'MAINTENANCE',
  /** MEDICAL_EMERGENCY */
  MedicalEmergency = 'MEDICAL_EMERGENCY',
  /** OTHER_CAUSE */
  OtherCause = 'OTHER_CAUSE',
  /** POLICE_ACTIVITY */
  PoliceActivity = 'POLICE_ACTIVITY',
  /** STRIKE */
  Strike = 'STRIKE',
  /** TECHNICAL_PROBLEM */
  TechnicalProblem = 'TECHNICAL_PROBLEM',
  /** UNKNOWN_CAUSE */
  UnknownCause = 'UNKNOWN_CAUSE',
  /** WEATHER */
  Weather = 'WEATHER'
}

/** Effect of a alert */
export enum AlertEffectType {
  /** ACCESSIBILITY_ISSUE */
  AccessibilityIssue = 'ACCESSIBILITY_ISSUE',
  /** ADDITIONAL_SERVICE */
  AdditionalService = 'ADDITIONAL_SERVICE',
  /** DETOUR */
  Detour = 'DETOUR',
  /** MODIFIED_SERVICE */
  ModifiedService = 'MODIFIED_SERVICE',
  /** NO_EFFECT */
  NoEffect = 'NO_EFFECT',
  /** NO_SERVICE */
  NoService = 'NO_SERVICE',
  /** OTHER_EFFECT */
  OtherEffect = 'OTHER_EFFECT',
  /** REDUCED_SERVICE */
  ReducedService = 'REDUCED_SERVICE',
  /** SIGNIFICANT_DELAYS */
  SignificantDelays = 'SIGNIFICANT_DELAYS',
  /** STOP_MOVED */
  StopMoved = 'STOP_MOVED',
  /** UNKNOWN_EFFECT */
  UnknownEffect = 'UNKNOWN_EFFECT'
}

/** Entity related to an alert */
export type AlertEntity = Agency | Pattern | Route | RouteType | Stop | StopOnRoute | StopOnTrip | Trip | Unknown;

/** Severity level of a alert */
export enum AlertSeverityLevelType {
  /**
   * Info alerts are used for informational messages that should not have a
   * significant effect on user's journey, for example: A single entrance to a
   * metro station is temporarily closed.
   */
  Info = 'INFO',
  /**
   * Severe alerts are used when a significant part of public transport services is
   * affected, for example: All train services are cancelled due to technical problems.
   */
  Severe = 'SEVERE',
  /** Severity of alert is unknown */
  UnknownSeverity = 'UNKNOWN_SEVERITY',
  /**
   * Warning alerts are used when a single stop or route has a disruption that can
   * affect user's journey, for example: All trams on a specific route are running
   * with irregular schedules.
   */
  Warning = 'WARNING'
}

/** Preferences related to alighting from a transit vehicle. */
export type AlightPreferencesInput = {
  /** What is the required minimum time alighting from a vehicle. */
  slack?: InputMaybe<Scalars['Duration']['input']>;
};

/** Preferences for bicycle parking facilities used during the routing. */
export type BicycleParkingPreferencesInput = {
  /**
   * Selection filters to include or exclude parking facilities.
   * An empty list will include all facilities in the routing search.
   */
  filters?: InputMaybe<Array<ParkingFilter>>;
  /**
   * If non-empty every parking facility that doesn't match this set of conditions will
   * receive an extra cost (defined by `unpreferredCost`) and therefore avoided.
   */
  preferred?: InputMaybe<Array<ParkingFilter>>;
  /**
   * If `preferred` is non-empty, using a parking facility that doesn't contain
   * at least one of the preferred conditions, will receive this extra cost and therefore avoided if
   * preferred options are available.
   */
  unpreferredCost?: InputMaybe<Scalars['Cost']['input']>;
};

/** Preferences related to travel with a bicycle. */
export type BicyclePreferencesInput = {
  /** Cost of boarding a vehicle with a bicycle. */
  boardCost?: InputMaybe<Scalars['Cost']['input']>;
  /** What criteria should be used when optimizing a cycling route. */
  optimization?: InputMaybe<CyclingOptimizationInput>;
  /** Bicycle parking related preferences. */
  parking?: InputMaybe<BicycleParkingPreferencesInput>;
  /** A multiplier for how bad cycling is compared to being in transit for equal lengths of time. */
  reluctance?: InputMaybe<Scalars['Reluctance']['input']>;
  /** Bicycle rental related preferences. */
  rental?: InputMaybe<BicycleRentalPreferencesInput>;
  /**
   * Maximum speed on flat ground while riding a bicycle. Note, this speed is higher than
   * the average speed will be in itineraries as this is the maximum speed but there are
   * factors that slow down cycling such as crossings, intersections and elevation changes.
   */
  speed?: InputMaybe<Scalars['Speed']['input']>;
  /** Walking preferences when walking a bicycle. */
  walk?: InputMaybe<BicycleWalkPreferencesInput>;
};

/** Preferences related to bicycle rental (station based or floating bicycle rental). */
export type BicycleRentalPreferencesInput = {
  /** Rental networks which can be potentially used as part of an itinerary. */
  allowedNetworks?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Rental networks which cannot be used as part of an itinerary. */
  bannedNetworks?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Is it possible to arrive to the destination with a rented bicycle and does it
   * come with an extra cost.
   */
  destinationBicyclePolicy?: InputMaybe<DestinationBicyclePolicyInput>;
};

/** Costs related to walking a bicycle. */
export type BicycleWalkPreferencesCostInput = {
  /**
   * A static cost that is added each time hopping on or off a bicycle to start or end
   * bicycle walking. However, this cost is not applied when getting on a rented bicycle
   * for the first time or when getting off the bicycle when returning the bicycle.
   */
  mountDismountCost?: InputMaybe<Scalars['Cost']['input']>;
  /**
   * A cost multiplier of bicycle walking travel time. The multiplier is for how bad
   * walking the bicycle is compared to being in transit for equal lengths of time.
   */
  reluctance?: InputMaybe<Scalars['Reluctance']['input']>;
};

/** Preferences for walking a bicycle. */
export type BicycleWalkPreferencesInput = {
  /** Costs related to walking a bicycle. */
  cost?: InputMaybe<BicycleWalkPreferencesCostInput>;
  /**
   * How long it takes to hop on or off a bicycle when switching to walking the bicycle
   * or when getting on the bicycle again. However, this is not applied when getting
   * on a rented bicycle for the first time or off the bicycle when returning the bicycle.
   */
  mountDismountTime?: InputMaybe<Scalars['Duration']['input']>;
  /**
   * Maximum walk speed on flat ground. Note, this speed is higher than the average speed
   * will be in itineraries as this is the maximum speed but there are
   * factors that slow down walking such as crossings, intersections and elevation changes.
   */
  speed?: InputMaybe<Scalars['Speed']['input']>;
};

/** Bike park represents a location where bicycles can be parked. */
export type BikePark = Node & PlaceInterface & {
  __typename?: 'BikePark';
  /** ID of the bike park */
  bikeParkId?: Maybe<Scalars['String']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the bike park (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the bike park (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Name of the bike park */
  name: Scalars['String']['output'];
  /** Opening hours of the parking facility */
  openingHours?: Maybe<OpeningHours>;
  /** If true, value of `spacesAvailable` is updated from a real-time source. */
  realtime?: Maybe<Scalars['Boolean']['output']>;
  /** Number of spaces available for bikes */
  spacesAvailable?: Maybe<Scalars['Int']['output']>;
  /** Source specific tags of the bike park, which describe the available features. */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Bike park represents a location where bicycles can be parked. */
export type BikeParkNameArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

/** Bike rental station represents a location where users can rent bicycles for a fee. */
export type BikeRentalStation = Node & PlaceInterface & {
  __typename?: 'BikeRentalStation';
  /**
   * If true, bikes can be returned to this station if the station has spaces available
   * or allows overloading.
   */
  allowDropoff?: Maybe<Scalars['Boolean']['output']>;
  /** If true, bikes can be currently returned to this station. */
  allowDropoffNow?: Maybe<Scalars['Boolean']['output']>;
  /** If true, bikes can be returned even if spacesAvailable is zero or bikes > capacity. */
  allowOverloading?: Maybe<Scalars['Boolean']['output']>;
  /** If true, bikes can be picked up from this station if the station has bikes available. */
  allowPickup?: Maybe<Scalars['Boolean']['output']>;
  /** If true, bikes can be currently picked up from this station. */
  allowPickupNow?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Number of bikes currently available on the rental station.
   * See field `allowPickupNow` to know if is currently possible to pick up a bike.
   */
  bikesAvailable?: Maybe<Scalars['Int']['output']>;
  /** Nominal capacity (number of racks) of the rental station. */
  capacity?: Maybe<Scalars['Int']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the bike rental station (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the bike rental station (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Name of the bike rental station */
  name: Scalars['String']['output'];
  networks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** If true, station is on and in service. */
  operative?: Maybe<Scalars['Boolean']['output']>;
  /**
   * If true, values of `bikesAvailable` and `spacesAvailable` are updated from a
   * real-time source. If false, values of `bikesAvailable` and `spacesAvailable`
   * are always the total capacity divided by two.
   */
  realtime?: Maybe<Scalars['Boolean']['output']>;
  /** Platform-specific URLs to begin renting a bike from this station. */
  rentalUris?: Maybe<BikeRentalStationUris>;
  /**
   * Number of free spaces currently available on the rental station.
   * Note that this value being 0 does not necessarily indicate that bikes cannot be returned
   * to this station, as for example it might be possible to leave the bike in the vicinity of
   * the rental station, even if the bike racks don't have any spaces available.
   * See field `allowDropoffNow` to know if is currently possible to return a bike.
   */
  spacesAvailable?: Maybe<Scalars['Int']['output']>;
  /**
   * A description of the current state of this bike rental station, e.g. "Station on"
   * @deprecated Use operative instead
   */
  state?: Maybe<Scalars['String']['output']>;
  /** ID of the bike rental station */
  stationId?: Maybe<Scalars['String']['output']>;
};

export type BikeRentalStationUris = {
  __typename?: 'BikeRentalStationUris';
  /**
   * A URI that can be passed to an Android app with an {@code android.intent.action.VIEW} Android
   * intent to support Android Deep Links.
   * May be null if a rental URI does not exist.
   */
  android?: Maybe<Scalars['String']['output']>;
  /**
   * A URI that can be used on iOS to launch the rental app for this station.
   * May be {@code null} if a rental URI does not exist.
   */
  ios?: Maybe<Scalars['String']['output']>;
  /**
   * A URL that can be used by a web browser to show more information about renting a vehicle at
   * this station.
   * May be {@code null} if a rental URL does not exist.
   */
  web?: Maybe<Scalars['String']['output']>;
};

export enum BikesAllowed {
  /** The vehicle being used on this particular trip can accommodate at least one bicycle. */
  Allowed = 'ALLOWED',
  /** No bicycles are allowed on this trip. */
  NotAllowed = 'NOT_ALLOWED',
  /** There is no bike information for the trip. */
  NoInformation = 'NO_INFORMATION'
}

/**
 * Preferences related to boarding a transit vehicle. Note, board costs for each street mode
 * can be found under the street mode preferences.
 */
export type BoardPreferencesInput = {
  /**
   * What is the required minimum waiting time at a stop. Setting this value as `PT0S`, for example, can lead
   * to passenger missing a connection when the vehicle leaves ahead of time or the passenger arrives to the
   * stop later than expected.
   */
  slack?: InputMaybe<Scalars['Duration']['input']>;
  /** A multiplier for how bad waiting at a stop is compared to being in transit for equal lengths of time. */
  waitReluctance?: InputMaybe<Scalars['Reluctance']['input']>;
};

/**
 * Booking information for a stop time which has special requirements to use, like calling ahead or
 * using an app.
 */
export type BookingInfo = {
  __typename?: 'BookingInfo';
  /** Contact information for reaching the service provider */
  contactInfo?: Maybe<ContactInfo>;
  /** A message specific to the drop off */
  dropOffMessage?: Maybe<Scalars['String']['output']>;
  /** When is the earliest time the service can be booked. */
  earliestBookingTime?: Maybe<BookingTime>;
  /** When is the latest time the service can be booked */
  latestBookingTime?: Maybe<BookingTime>;
  /** Maximum number of seconds before travel to make the request */
  maximumBookingNoticeSeconds?: Maybe<Scalars['Long']['output']>;
  /** A general message for those booking the service */
  message?: Maybe<Scalars['String']['output']>;
  /** Minimum number of seconds before travel to make the request */
  minimumBookingNoticeSeconds?: Maybe<Scalars['Long']['output']>;
  /** A message specific to the pick up */
  pickupMessage?: Maybe<Scalars['String']['output']>;
};

/** Temporal restriction for a booking */
export type BookingTime = {
  __typename?: 'BookingTime';
  /** How many days before the booking */
  daysPrior?: Maybe<Scalars['Int']['output']>;
  /** Time of the booking */
  time?: Maybe<Scalars['String']['output']>;
};

/** Car park represents a location where cars can be parked. */
export type CarPark = Node & PlaceInterface & {
  __typename?: 'CarPark';
  /** ID of the car park */
  carParkId?: Maybe<Scalars['String']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the car park (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the car park (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Number of parking spaces at the car park */
  maxCapacity?: Maybe<Scalars['Int']['output']>;
  /** Name of the car park */
  name: Scalars['String']['output'];
  /**
   * Opening hours for the selected dates using the local time of the park.
   * Each date can have multiple time spans.
   */
  openingHours?: Maybe<OpeningHours>;
  /** If true, value of `spacesAvailable` is updated from a real-time source. */
  realtime?: Maybe<Scalars['Boolean']['output']>;
  /** Number of currently available parking spaces at the car park */
  spacesAvailable?: Maybe<Scalars['Int']['output']>;
  /** Source specific tags of the car park, which describe the available features. */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Car park represents a location where cars can be parked. */
export type CarParkNameArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

/** Preferences for car parking facilities used during the routing. */
export type CarParkingPreferencesInput = {
  /**
   * Selection filters to include or exclude parking facilities.
   * An empty list will include all facilities in the routing search.
   */
  filters?: InputMaybe<Array<ParkingFilter>>;
  /**
   * If non-empty every parking facility that doesn't match this set of conditions will
   * receive an extra cost (defined by `unpreferredCost`) and therefore avoided.
   */
  preferred?: InputMaybe<Array<ParkingFilter>>;
  /**
   * If `preferred` is non-empty, using a parking facility that doesn't contain
   * at least one of the preferred conditions, will receive this extra cost and therefore avoided if
   * preferred options are available.
   */
  unpreferredCost?: InputMaybe<Scalars['Cost']['input']>;
};

/** Preferences related to traveling on a car (excluding car travel on transit services such as taxi). */
export type CarPreferencesInput = {
  /** Car parking related preferences. */
  parking?: InputMaybe<CarParkingPreferencesInput>;
  /** A multiplier for how bad travelling on car is compared to being in transit for equal lengths of time. */
  reluctance?: InputMaybe<Scalars['Reluctance']['input']>;
  /** Car rental related preferences. */
  rental?: InputMaybe<CarRentalPreferencesInput>;
};

/** Preferences related to car rental (station based or floating car rental). */
export type CarRentalPreferencesInput = {
  /** Rental networks which can be potentially used as part of an itinerary. */
  allowedNetworks?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Rental networks which cannot be used as part of an itinerary. */
  bannedNetworks?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Cluster is a list of stops grouped by name and proximity */
export type Cluster = Node & {
  __typename?: 'Cluster';
  /** ID of the cluster */
  gtfsId: Scalars['String']['output'];
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the center of this cluster (i.e. average latitude of stops in this cluster) */
  lat: Scalars['Float']['output'];
  /** Longitude of the center of this cluster (i.e. average longitude of stops in this cluster) */
  lon: Scalars['Float']['output'];
  /** Name of the cluster */
  name: Scalars['String']['output'];
  /** List of stops in the cluster */
  stops?: Maybe<Array<Stop>>;
};

/** Contact information for booking an on-demand or flexible service. */
export type ContactInfo = {
  __typename?: 'ContactInfo';
  /** Additional notes about the contacting the service provider */
  additionalDetails?: Maybe<Scalars['String']['output']>;
  /** URL to the booking systems of the service */
  bookingUrl?: Maybe<Scalars['String']['output']>;
  /** Name of the person to contact */
  contactPerson?: Maybe<Scalars['String']['output']>;
  /** Email to contact */
  eMail?: Maybe<Scalars['String']['output']>;
  /** Fax number to contact */
  faxNumber?: Maybe<Scalars['String']['output']>;
  /** URL containing general information about the service */
  infoUrl?: Maybe<Scalars['String']['output']>;
  /** Phone number to contact */
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

/**
 * Coordinate (often referred as coordinates), which is used to specify a location using in the
 * WGS84 coordinate system.
 */
export type Coordinate = {
  __typename?: 'Coordinate';
  /** Latitude as a WGS84 format number. */
  latitude: Scalars['CoordinateValue']['output'];
  /** Longitude as a WGS84 format number. */
  longitude: Scalars['CoordinateValue']['output'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  /** Latitude (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
};

/** A currency */
export type Currency = {
  __typename?: 'Currency';
  /** ISO-4217 currency code, for example `USD` or `EUR`. */
  code: Scalars['String']['output'];
  /**
   * Fractional digits of this currency. A value of 2 would express that in this currency
   * 100 minor units make up one major unit.
   *
   * Expressed more concretely: 100 Euro-cents make up one Euro.
   *
   * Note: Some currencies don't even have any fractional digits, for example the Japanese Yen.
   *
   * See also https://en.wikipedia.org/wiki/ISO_4217#Minor_unit_fractions
   */
  digits: Scalars['Int']['output'];
};

/** What criteria should be used when optimizing a cycling route. */
export type CyclingOptimizationInput =
  /** Define optimization by weighing three criteria. */
  { triangle: TriangleCyclingFactorsInput; type?: never; }
  |  /** Use one of the predefined optimization types. */
  { triangle?: never; type: CyclingOptimizationType; };

/**
 * Predefined optimization alternatives for bicycling routing. For more customization,
 * one can use the triangle factors.
 */
export enum CyclingOptimizationType {
  /** Emphasize flatness over safety or duration of the route. This option was previously called `FLAT`. */
  FlatStreets = 'FLAT_STREETS',
  /**
   * Completely ignore the elevation differences and prefer the streets, that are evaluated
   * to be the safest, even more than with the `SAFE_STREETS` option.
   * Safety can also include other concerns such as convenience and general cyclist preferences
   * by taking into account road surface etc. This option was previously called `GREENWAYS`.
   */
  SafestStreets = 'SAFEST_STREETS',
  /**
   * Emphasize cycling safety over flatness or duration of the route. Safety can also include other
   * concerns such as convenience and general cyclist preferences by taking into account
   * road surface etc. This option was previously called `SAFE`.
   */
  SafeStreets = 'SAFE_STREETS',
  /**
   * Search for routes with the shortest duration while ignoring the cycling safety
   * of the streets (the routes should still follow local regulations). Routes can include
   * steep streets, if they are the fastest alternatives. This option was previously called
   * `QUICK`.
   */
  ShortestDuration = 'SHORTEST_DURATION'
}

/**
 * The standard case of a fare product: it only has a single price to be paid by the passenger
 * and no discounts are applied.
 */
export type DefaultFareProduct = FareProduct & {
  __typename?: 'DefaultFareProduct';
  /** Identifier for the fare product. */
  id: Scalars['String']['output'];
  /**
   * The 'medium' that this product applies to, for example "Oyster Card" or "Berlin Ticket App".
   *
   * This communicates to riders that a specific way of buying or keeping this product is required.
   */
  medium?: Maybe<FareMedium>;
  /** Human readable name of the product, for example example "Day pass" or "Single ticket". */
  name: Scalars['String']['output'];
  /** The price of the product */
  price: Money;
  /** The category of riders this product applies to, for example students or pensioners. */
  riderCategory?: Maybe<RiderCategory>;
};

/**
 * Departure row is a combination of a pattern and a stop of that pattern.
 *
 * They are de-duplicated so for each pattern there will only be a single departure row.
 *
 * This is useful if you want to show a list of stop/pattern combinations but want each pattern to be
 * listed only once.
 */
export type DepartureRow = Node & PlaceInterface & {
  __typename?: 'DepartureRow';
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the stop (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the stop (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Pattern of the departure row */
  pattern?: Maybe<Pattern>;
  /** Stop from which the departures leave */
  stop?: Maybe<Stop>;
  /** Departures of the pattern from the stop */
  stoptimes?: Maybe<Array<Maybe<Stoptime>>>;
};


/**
 * Departure row is a combination of a pattern and a stop of that pattern.
 *
 * They are de-duplicated so for each pattern there will only be a single departure row.
 *
 * This is useful if you want to show a list of stop/pattern combinations but want each pattern to be
 * listed only once.
 */
export type DepartureRowStoptimesArgs = {
  numberOfDepartures?: InputMaybe<Scalars['Int']['input']>;
  omitCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  omitNonPickups?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['Long']['input']>;
  timeRange?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Is it possible to arrive to the destination with a rented bicycle and does it
 * come with an extra cost.
 */
export type DestinationBicyclePolicyInput = {
  /** For networks that require station drop-off, should the routing engine offer results that go directly to the destination without dropping off the rental bicycle first. */
  allowKeeping?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Cost associated with arriving to the destination with a rented bicycle.
   * No cost is applied if arriving to the destination after dropping off the rented
   * bicycle.
   */
  keepingCost?: InputMaybe<Scalars['Cost']['input']>;
};

/**
 * Is it possible to arrive to the destination with a rented scooter and does it
 * come with an extra cost.
 */
export type DestinationScooterPolicyInput = {
  /** For networks that require station drop-off, should the routing engine offer results that go directly to the destination without dropping off the rental scooter first. */
  allowKeeping?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Cost associated with arriving to the destination with a rented scooter.
   * No cost is applied if arriving to the destination after dropping off the rented
   * scooter.
   */
  keepingCost?: InputMaybe<Scalars['Cost']['input']>;
};

export type Emissions = {
  __typename?: 'Emissions';
  /** CO₂ emissions in grams. */
  co2?: Maybe<Scalars['Grams']['output']>;
};

/** A 'medium' that a fare product applies to, for example cash, 'Oyster Card' or 'DB Navigator App'. */
export type FareMedium = {
  __typename?: 'FareMedium';
  /** ID of the medium */
  id: Scalars['String']['output'];
  /** Human readable name of the medium. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A fare product (a ticket) to be bought by a passenger */
export type FareProduct = {
  /** Identifier for the fare product. */
  id: Scalars['String']['output'];
  /**
   * The 'medium' that this product applies to, for example "Oyster Card" or "Berlin Ticket App".
   *
   * This communicates to riders that a specific way of buying or keeping this product is required.
   */
  medium?: Maybe<FareMedium>;
  /** Human readable name of the product, for example example "Day pass" or "Single ticket". */
  name: Scalars['String']['output'];
  /** The category of riders this product applies to, for example students or pensioners. */
  riderCategory?: Maybe<RiderCategory>;
};

/** A container for both a fare product (a ticket) and its relationship to the itinerary. */
export type FareProductUse = {
  __typename?: 'FareProductUse';
  /**
   * Represents the use of a single instance of a fare product throughout the itinerary. It can
   * be used to cross-reference and de-duplicate fare products that are applicable for more than one
   * leg.
   *
   * If you want to uniquely identify the fare product itself (not its use) use the product's `id`.
   *
   * ### Example: Day pass
   *
   * The day pass is valid for both legs in the itinerary. It is listed as the applicable `product` for each leg,
   * and the same FareProductUse id is shown, indicating that only one pass was used/bought.
   *
   * **Illustration**
   * ```yaml
   * itinerary:
   *   leg1:
   *     fareProducts:
   *       id: "AAA" // id of a FareProductUse instance
   *       product:
   *         id: "day-pass" // product id
   *         name: "Day Pass"
   *   leg2:
   *     fareProducts:
   *       id: "AAA" // identical to leg1. the passenger needs to buy ONE pass, not two.
   *       product:
   *         id: "day-pass"  // product id
   *         name: "Day Pass"
   * ```
   *
   * **It is the responsibility of the API consumers to display the day pass as a product for the
   * entire itinerary rather than two day passes!**
   *
   * ### Example: Several single tickets
   *
   * If you have two legs and need to buy two single tickets they will appear in each leg with the
   * same `FareProduct.id` but different `FareProductUse.id`.
   *
   * **Illustration**
   * ```yaml
   * itinerary:
   *   leg1:
   *     fareProducts:
   *       id: "AAA" // id of a FareProductUse instance, not product id
   *       product:
   *         id: "single-ticket" // product id
   *         name: "Single Ticket"
   *   leg2:
   *     fareProducts:
   *       id: "BBB" // different to leg1. the passenger needs to buy two single tickets.
   *       product:
   *         id: "single-ticket"  // product id
   *         name: "Single Ticket"
   * ```
   */
  id: Scalars['String']['output'];
  /** The purchasable fare product */
  product?: Maybe<FareProduct>;
};

/** A feed provides routing data (stops, routes, timetables, etc.) from one or more public transport agencies. */
export type Feed = {
  __typename?: 'Feed';
  /** List of agencies which provide data to this feed */
  agencies?: Maybe<Array<Maybe<Agency>>>;
  /** Alerts relevant for the feed. */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /** ID of the feed */
  feedId: Scalars['String']['output'];
  /** The publisher of the input transit data. */
  publisher?: Maybe<FeedPublisher>;
};


/** A feed provides routing data (stops, routes, timetables, etc.) from one or more public transport agencies. */
export type FeedAlertsArgs = {
  types?: InputMaybe<Array<FeedAlertType>>;
};

/** Entities, which are relevant for a feed and can contain alerts */
export enum FeedAlertType {
  /** Alerts affecting the feed's agencies */
  Agencies = 'AGENCIES',
  /**
   * Alerts affecting the route types across the feed.
   * There might be alerts that only affect route types within an agency of the feed,
   * and those can be fetched through the Agency.
   */
  RouteTypes = 'ROUTE_TYPES'
}

/** Feed publisher information */
export type FeedPublisher = {
  __typename?: 'FeedPublisher';
  /** Name of feed publisher */
  name: Scalars['String']['output'];
  /** Web address of feed publisher */
  url: Scalars['String']['output'];
};

export enum FilterPlaceType {
  /**
   * Old value for VEHICLE_RENT
   * @deprecated Use VEHICLE_RENT instead as it's clearer that it also returns rental scooters, cars...
   */
  BicycleRent = 'BICYCLE_RENT',
  /** Parking lots (not rental stations) that contain spaces for bicycles */
  BikePark = 'BIKE_PARK',
  /** Parking lots that contain spaces for cars */
  CarPark = 'CAR_PARK',
  /** Departure rows */
  DepartureRow = 'DEPARTURE_ROW',
  /**
   * Stations.
   * NOTE: if this is selected at the same time as `STOP`, stops that have a parent station will not be returned but their parent stations will be returned instead.
   */
  Station = 'STATION',
  /**
   * Stops.
   * NOTE: if this is selected at the same time as `STATION`, stops that have a parent station will not be returned but their parent stations will be returned instead.
   */
  Stop = 'STOP',
  /** Vehicle (bicycles, scooters, cars ...) rental stations and vehicles */
  VehicleRent = 'VEHICLE_RENT'
}

export enum FormFactor {
  /** A bicycle */
  Bicycle = 'BICYCLE',
  /** An automobile */
  Car = 'CAR',
  /** A bicycle with additional space for cargo */
  CargoBicycle = 'CARGO_BICYCLE',
  /** A moped that the rider sits on. For a disambiguation see https://github.com/NABSA/gbfs/pull/370#issuecomment-982631989 */
  Moped = 'MOPED',
  /** A vehicle that doesn't fit into any other category */
  Other = 'OTHER',
  /** A kick scooter that the rider either sits or stands on. Will be deprecated in GBFS v3.0. */
  Scooter = 'SCOOTER',
  /** A kick scooter with a seat */
  ScooterSeated = 'SCOOTER_SEATED',
  /** A kick scooter that the rider stands on */
  ScooterStanding = 'SCOOTER_STANDING'
}

export type Geometry = {
  __typename?: 'Geometry';
  /** The number of points in the string */
  length?: Maybe<Scalars['Int']['output']>;
  /**
   * List of coordinates of in a Google encoded polyline format (see
   * https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
   */
  points?: Maybe<Scalars['Polyline']['output']>;
};

export type InputBanned = {
  /** A comma-separated list of banned agency ids */
  agencies?: InputMaybe<Scalars['String']['input']>;
  /** A comma-separated list of banned route ids */
  routes?: InputMaybe<Scalars['String']['input']>;
  /**
   * A comma-separated list of banned stop ids. Note that these stops are only
   * banned for boarding and disembarking vehicles — it is possible to get an
   * itinerary where a vehicle stops at one of these stops
   * @deprecated Not implemented in OTP2.
   */
  stops?: InputMaybe<Scalars['String']['input']>;
  /**
   * A comma-separated list of banned stop ids. Only itineraries where these stops
   * are not travelled through are returned, e.g. if a bus route stops at one of
   * these stops, that route will not be used in the itinerary, even if the stop is
   * not used for boarding or disembarking the vehicle.
   * @deprecated Not implemented in OTP2.
   */
  stopsHard?: InputMaybe<Scalars['String']['input']>;
  /** A comma-separated list of banned trip ids */
  trips?: InputMaybe<Scalars['String']['input']>;
};

export type InputCoordinates = {
  /** The name of the place. If specified, the place name in results uses this value instead of `"Origin"` or `"Destination"` */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Latitude of the place (WGS 84) */
  lat: Scalars['Float']['input'];
  /** The amount of time, in seconds, to spend at this location before venturing forth. */
  locationSlack?: InputMaybe<Scalars['Int']['input']>;
  /** Longitude of the place (WGS 84) */
  lon: Scalars['Float']['input'];
};

export enum InputField {
  DateTime = 'DATE_TIME',
  From = 'FROM',
  To = 'TO'
}

export type InputFilters = {
  /** Bike parks to include by id. */
  bikeParks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Bike rentals to include by id (without network identifier). */
  bikeRentalStations?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Car parks to include by id. */
  carParks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Routes to include by GTFS id. */
  routes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Stations to include by GTFS id. */
  stations?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Stops to include by GTFS id. */
  stops?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type InputModeWeight = {
  /** The weight of AIRPLANE traverse mode. Values over 1 add cost to airplane travel and values under 1 decrease cost */
  AIRPLANE?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of BUS traverse mode. Values over 1 add cost to bus travel and values under 1 decrease cost */
  BUS?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of CABLE_CAR traverse mode. Values over 1 add cost to cable car travel and values under 1 decrease cost */
  CABLE_CAR?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of FERRY traverse mode. Values over 1 add cost to ferry travel and values under 1 decrease cost */
  FERRY?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of FUNICULAR traverse mode. Values over 1 add cost to funicular travel and values under 1 decrease cost */
  FUNICULAR?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of GONDOLA traverse mode. Values over 1 add cost to gondola travel and values under 1 decrease cost */
  GONDOLA?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of RAIL traverse mode. Values over 1 add cost to rail travel and values under 1 decrease cost */
  RAIL?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of SUBWAY traverse mode. Values over 1 add cost to subway travel and values under 1 decrease cost */
  SUBWAY?: InputMaybe<Scalars['Float']['input']>;
  /** The weight of TRAM traverse mode. Values over 1 add cost to tram travel and values under 1 decrease cost */
  TRAM?: InputMaybe<Scalars['Float']['input']>;
};

export type InputPreferred = {
  /** A comma-separated list of ids of the agencies preferred by the user. */
  agencies?: InputMaybe<Scalars['String']['input']>;
  /**
   * Penalty added for using every route that is not preferred if user set any
   * route as preferred. We return number of seconds that we are willing to wait
   * for preferred route.
   */
  otherThanPreferredRoutesPenalty?: InputMaybe<Scalars['Int']['input']>;
  /** A comma-separated list of ids of the routes preferred by the user. */
  routes?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Relative importances of optimization factors. Only effective for bicycling legs.
 * Invariant: `timeFactor + slopeFactor + safetyFactor == 1`
 */
export type InputTriangle = {
  /** Relative importance of safety */
  safetyFactor?: InputMaybe<Scalars['Float']['input']>;
  /** Relative importance of flat terrain */
  slopeFactor?: InputMaybe<Scalars['Float']['input']>;
  /** Relative importance of duration */
  timeFactor?: InputMaybe<Scalars['Float']['input']>;
};

export type InputUnpreferred = {
  /** A comma-separated list of ids of the agencies unpreferred by the user. */
  agencies?: InputMaybe<Scalars['String']['input']>;
  /** A comma-separated list of ids of the routes unpreferred by the user. */
  routes?: InputMaybe<Scalars['String']['input']>;
  /**
   * An cost function used to calculate penalty for an unpreferred route/agency. Function should return
   * number of seconds that we are willing to wait for unpreferred route/agency.
   * String must be of the format:
   * `A + B x`, where A is fixed penalty and B is a multiplier of transit leg travel time x.
   * For example: `600 + 2.0 x`
   */
  unpreferredCost?: InputMaybe<Scalars['String']['input']>;
  /**
   * Penalty added for using route that is unpreferred, i.e. number of seconds that we are willing to
   * wait for route that is unpreferred.
   *
   * Deprecated: Use `unpreferredCost` instead.
   * @deprecated Use unpreferredCost instead
   */
  useUnpreferredRoutesPenalty?: InputMaybe<Scalars['Int']['input']>;
};

export type Itinerary = {
  __typename?: 'Itinerary';
  /**
   * Computes a numeric accessibility score between 0 and 1.
   *
   * The closer the value is to 1 the better the wheelchair-accessibility of this itinerary is.
   * A value of `null` means that no score has been computed, not that the leg is inaccessible.
   *
   * More information is available in the [feature documentation](https://docs.opentripplanner.org/en/dev-2.x/sandbox/IBIAccessibilityScore/).
   */
  accessibilityScore?: Maybe<Scalars['Float']['output']>;
  /** Does the itinerary end without dropping off the rented bicycle: */
  arrivedAtDestinationWithRentedBicycle?: Maybe<Scalars['Boolean']['output']>;
  /** Duration of the trip on this itinerary, in seconds. */
  duration?: Maybe<Scalars['Long']['output']>;
  /** How much elevation is gained, in total, over the course of the itinerary, in meters. */
  elevationGained?: Maybe<Scalars['Float']['output']>;
  /** How much elevation is lost, in total, over the course of the itinerary, in meters. */
  elevationLost?: Maybe<Scalars['Float']['output']>;
  /** Emissions of this itinerary per traveler. */
  emissionsPerPerson?: Maybe<Emissions>;
  /** Time when the user leaves arrives at the destination. */
  end?: Maybe<Scalars['OffsetDateTime']['output']>;
  /**
   * Time when the user arrives to the destination. Format: Unix timestamp in milliseconds.
   * @deprecated Use `end` instead which includes timezone information.
   */
  endTime?: Maybe<Scalars['Long']['output']>;
  /**
   * Information about the fares for this itinerary. This is primarily a GTFS Fares V1 interface
   * and always returns an empty list. Use the leg's `fareProducts` instead.
   * @deprecated Use the leg's `fareProducts`.
   */
  fares?: Maybe<Array<Maybe<Fare>>>;
  /** Generalized cost of the itinerary. Used for debugging search results. */
  generalizedCost?: Maybe<Scalars['Int']['output']>;
  /**
   * A list of Legs. Each Leg is either a walking (cycling, car) portion of the
   * itinerary, or a transit leg on a particular vehicle. So a itinerary where the
   * user walks to the Q train, transfers to the 6, then walks to their
   * destination, has four legs.
   */
  legs: Array<Maybe<Leg>>;
  /**
   * How many transfers are part of this itinerary.
   *
   * Notes:
   *  - Interlined/stay-seated transfers do not increase this count.
   *  - Transferring from a flex to a fixed schedule trip and vice versa increases this count.
   */
  numberOfTransfers: Scalars['Int']['output'];
  /** Time when the user leaves from the origin. */
  start?: Maybe<Scalars['OffsetDateTime']['output']>;
  /**
   * Time when the user leaves from the origin. Format: Unix timestamp in milliseconds.
   * @deprecated Use `start` instead which includes timezone information.
   */
  startTime?: Maybe<Scalars['Long']['output']>;
  /**
   * A list of system notices. Contains debug information for itineraries.
   * One use-case is to run a routing search with 'debugItineraryFilter: true'.
   * This will then tag itineraries instead of removing them from the result.
   * This make it possible to inspect the itinerary-filter-chain.
   */
  systemNotices: Array<Maybe<SystemNotice>>;
  /** How much time is spent waiting for transit to arrive, in seconds. */
  waitingTime?: Maybe<Scalars['Long']['output']>;
  /** How far the user has to walk, in meters. */
  walkDistance?: Maybe<Scalars['Float']['output']>;
  /** How much time is spent walking, in seconds. */
  walkTime?: Maybe<Scalars['Long']['output']>;
};

/**
 * Enable this to attach a system notice to itineraries instead of removing them. This is very
 * convenient when tuning the itinerary-filter-chain.
 */
export enum ItineraryFilterDebugProfile {
  /**
   * Only return the requested number of itineraries, counting both actual and deleted ones.
   * The top `numItineraries` using the request sort order is returned. This does not work
   * with paging, itineraries after the limit, but inside the search-window are skipped when
   * moving to the next page.
   */
  LimitToNumberOfItineraries = 'LIMIT_TO_NUMBER_OF_ITINERARIES',
  /**
   * Return all itineraries, including deleted ones, inside the actual search-window used
   * (the requested search-window may differ).
   */
  LimitToSearchWindow = 'LIMIT_TO_SEARCH_WINDOW',
  /** List all itineraries, including all deleted itineraries. */
  ListAll = 'LIST_ALL',
  /** By default, the debug itinerary filters is turned off. */
  Off = 'OFF'
}

export type Leg = {
  __typename?: 'Leg';
  /**
   * Computes a numeric accessibility score between 0 and 1.
   *
   * The closer the value is to 1 the better the wheelchair-accessibility of this leg is.
   * A value of `null` means that no score has been computed, not that the itinerary is inaccessible.
   *
   * More information is available in the [feature documentation](https://docs.opentripplanner.org/en/dev-2.x/sandbox/IBIAccessibilityScore/).
   */
  accessibilityScore?: Maybe<Scalars['Float']['output']>;
  /** For transit legs, the transit agency that operates the service used for this leg. For non-transit legs, `null`. */
  agency?: Maybe<Agency>;
  /** Applicable alerts for this leg. */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /**
   * For transit leg, the offset from the scheduled arrival time of the alighting
   * stop in this leg, i.e. scheduled time of arrival at alighting stop = `endTime
   * - arrivalDelay`
   * @deprecated Use `start.estimated.delay` instead.
   */
  arrivalDelay?: Maybe<Scalars['Int']['output']>;
  /**
   * For transit leg, the offset from the scheduled departure time of the boarding
   * stop in this leg, i.e. scheduled time of departure at boarding stop =
   * `startTime - departureDelay`
   * @deprecated Use `end.estimated.delay` instead.
   */
  departureDelay?: Maybe<Scalars['Int']['output']>;
  /** The distance traveled while traversing the leg in meters. */
  distance?: Maybe<Scalars['Float']['output']>;
  /**
   * Special booking information for the drop off stop of this leg if, for example, it needs
   * to be booked in advance. This could be due to a flexible or on-demand service.
   */
  dropOffBookingInfo?: Maybe<BookingInfo>;
  /** This is used to indicate if alighting from this leg is possible only with special arrangements. */
  dropoffType?: Maybe<PickupDropoffType>;
  /** The leg's duration in seconds */
  duration?: Maybe<Scalars['Float']['output']>;
  /** The time when the leg ends including real-time information, if available. */
  end: LegTime;
  /**
   * The date and time when this leg ends. Format: Unix timestamp in milliseconds.
   * @deprecated Use `end.estimated.time` instead which contains timezone information.
   */
  endTime?: Maybe<Scalars['Long']['output']>;
  /**
   * Fare products are purchasable tickets which may have an optional fare container or rider
   * category that limits who can buy them or how.
   *
   * Please read the documentation of `id` very carefully to learn how a single fare product
   * that applies to multiple legs can appear several times.
   */
  fareProducts?: Maybe<Array<Maybe<FareProductUse>>>;
  /** The Place where the leg originates. */
  from: Place;
  /** Generalized cost of the leg. Used for debugging search results. */
  generalizedCost?: Maybe<Scalars['Int']['output']>;
  /**
   * For transit legs, the headsign that the vehicle shows at the stop where the passenger boards.
   * For non-transit legs, null.
   */
  headsign?: Maybe<Scalars['String']['output']>;
  /**
   * Interlines with previous leg.
   * This is true when the same vehicle is used for the previous leg as for this leg
   * and passenger can stay inside the vehicle.
   */
  interlineWithPreviousLeg?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the destination of this leg (field `to`) is one of the intermediate places specified in the query. */
  intermediatePlace?: Maybe<Scalars['Boolean']['output']>;
  /**
   * For transit legs, intermediate stops between the Place where the leg
   * originates and the Place where the leg ends. For non-transit legs, null.
   * Returns Place type, which has fields for e.g. departure and arrival times
   */
  intermediatePlaces?: Maybe<Array<Maybe<Place>>>;
  /**
   * For transit legs, intermediate stops between the Place where the leg
   * originates and the Place where the leg ends. For non-transit legs, null.
   */
  intermediateStops?: Maybe<Array<Maybe<Stop>>>;
  /** The leg's geometry. */
  legGeometry?: Maybe<Geometry>;
  /** The mode (e.g. `WALK`) used when traversing this leg. */
  mode?: Maybe<Mode>;
  /** Future legs with same origin and destination stops or stations */
  nextLegs?: Maybe<Array<Leg>>;
  /**
   * Special booking information for the pick up stop of this leg if, for example, it needs
   * to be booked in advance. This could be due to a flexible or on-demand service.
   */
  pickupBookingInfo?: Maybe<BookingInfo>;
  /** This is used to indicate if boarding this leg is possible only with special arrangements. */
  pickupType?: Maybe<PickupDropoffType>;
  /** Whether there is real-time data about this Leg */
  realTime?: Maybe<Scalars['Boolean']['output']>;
  /** State of real-time data */
  realtimeState?: Maybe<RealtimeState>;
  /** Whether this leg is traversed with a rented bike. */
  rentedBike?: Maybe<Scalars['Boolean']['output']>;
  /** Estimate of a hailed ride like Uber. */
  rideHailingEstimate?: Maybe<RideHailingEstimate>;
  /** For transit legs, the route that is used for traversing the leg. For non-transit legs, `null`. */
  route?: Maybe<Route>;
  /** For transit legs, the service date of the trip. Format: YYYYMMDD. For non-transit legs, null. */
  serviceDate?: Maybe<Scalars['String']['output']>;
  /** The time when the leg starts including real-time information, if available. */
  start: LegTime;
  /**
   * The date and time when this leg begins. Format: Unix timestamp in milliseconds.
   * @deprecated Use `start.estimated.time` instead which contains timezone information.
   */
  startTime?: Maybe<Scalars['Long']['output']>;
  /** The turn-by-turn navigation instructions. */
  steps?: Maybe<Array<Maybe<Step>>>;
  /** The Place where the leg ends. */
  to: Place;
  /** Whether this leg is a transit leg or not. */
  transitLeg?: Maybe<Scalars['Boolean']['output']>;
  /** For transit legs, the trip that is used for traversing the leg. For non-transit legs, `null`. */
  trip?: Maybe<Trip>;
  /** Whether this leg is walking with a bike. */
  walkingBike?: Maybe<Scalars['Boolean']['output']>;
};


export type LegNextLegsArgs = {
  destinationModesWithParentStation?: InputMaybe<Array<TransitMode>>;
  numberOfLegs: Scalars['Int']['input'];
  originModesWithParentStation?: InputMaybe<Array<TransitMode>>;
};

/**
 * Time information about a passenger at a certain place. May contain real-time information if
 * available.
 */
export type LegTime = {
  __typename?: 'LegTime';
  /** The estimated time of the event. If no real-time information is available, this is null. */
  estimated?: Maybe<RealTimeEstimate>;
  /** The scheduled time of the event. */
  scheduledTime: Scalars['OffsetDateTime']['output'];
};

/** Filters an entity by a date range. */
export type LocalDateRangeInput = {
  /**
   * **Exclusive** end date of the filter. This means that if you want a time window from Sunday to
   * Sunday, `end` must be on Monday.
   *
   * If `null` this means that no end filter is applied and all entities that are after or on `start`
   * are selected.
   */
  end?: InputMaybe<Scalars['LocalDate']['input']>;
  /**
   * **Inclusive** start date of the filter. If `null` this means that no `start` filter is applied and all
   * dates that are before `end` are selected.
   */
  start?: InputMaybe<Scalars['LocalDate']['input']>;
};

/** A span of time. */
export type LocalTimeSpan = {
  __typename?: 'LocalTimeSpan';
  /** The start of the time timespan as seconds from midnight. */
  from: Scalars['Int']['output'];
  /** The end of the timespan as seconds from midnight. */
  to: Scalars['Int']['output'];
};

/** A date using the local timezone of the object that can contain timespans. */
export type LocalTimeSpanDate = {
  __typename?: 'LocalTimeSpanDate';
  /** The date of this time span. Format: YYYYMMDD. */
  date: Scalars['String']['output'];
  /** The time spans for this date. */
  timeSpans?: Maybe<Array<Maybe<LocalTimeSpan>>>;
};

/** Identifies whether this stop represents a stop or station. */
export enum LocationType {
  Entrance = 'ENTRANCE',
  /** A physical structure or area that contains one or more stop. */
  Station = 'STATION',
  /** A location where passengers board or disembark from a transit vehicle. */
  Stop = 'STOP'
}

export enum Mode {
  /** AIRPLANE */
  Airplane = 'AIRPLANE',
  /** BICYCLE */
  Bicycle = 'BICYCLE',
  /** BUS */
  Bus = 'BUS',
  /** CABLE_CAR */
  CableCar = 'CABLE_CAR',
  /** CAR */
  Car = 'CAR',
  /** Private car trips shared with others. */
  Carpool = 'CARPOOL',
  /** COACH */
  Coach = 'COACH',
  /** FERRY */
  Ferry = 'FERRY',
  /** Enables flexible transit for access and egress legs */
  Flex = 'FLEX',
  /**
   * Enables flexible transit for access and egress legs
   * @deprecated Use FLEX instead
   */
  Flexible = 'FLEXIBLE',
  /** FUNICULAR */
  Funicular = 'FUNICULAR',
  /** GONDOLA */
  Gondola = 'GONDOLA',
  /**
   * Only used internally. No use for API users.
   * @deprecated No longer supported
   */
  LegSwitch = 'LEG_SWITCH',
  /** Railway in which the track consists of a single rail or a beam. */
  Monorail = 'MONORAIL',
  /** RAIL */
  Rail = 'RAIL',
  /** SCOOTER */
  Scooter = 'SCOOTER',
  /** SUBWAY */
  Subway = 'SUBWAY',
  /** A taxi, possibly operated by a public transport agency. */
  Taxi = 'TAXI',
  /** TRAM */
  Tram = 'TRAM',
  /** A special transport mode, which includes all public transport. */
  Transit = 'TRANSIT',
  /** Electric buses that draw power from overhead wires using poles. */
  Trolleybus = 'TROLLEYBUS',
  /** WALK */
  Walk = 'WALK'
}

/** An amount of money. */
export type Money = {
  __typename?: 'Money';
  /**
   * Money in the major currency unit, so 3.10 USD is represented as `3.1`.
   *
   * If you want to get the minor currency unit (310 cents), multiply with
   * (10 to the power of `currency.digits`).
   */
  amount: Scalars['Float']['output'];
  /** The currency of this money amount. */
  currency: Currency;
};

/** An object with an ID */
export type Node = {
  /** The ID of an object */
  id: Scalars['ID']['output'];
};

/** Occupancy status of a vehicle. */
export enum OccupancyStatus {
  /**
   * The vehicle or carriage can currently accommodate only standing passengers and has limited
   * space for them. There isn't a big difference between this and FULL so it's possible to handle
   * them as the same value, if one wants to limit the number of different values.
   * SIRI nordic profile: merge into `STANDING_ROOM_ONLY`.
   */
  CrushedStandingRoomOnly = 'CRUSHED_STANDING_ROOM_ONLY',
  /**
   * The vehicle is considered empty by most measures, and has few or no passengers onboard, but is
   * still accepting passengers. There isn't a big difference between this and MANY_SEATS_AVAILABLE
   * so it's possible to handle them as the same value, if one wants to limit the number of different
   * values.
   * SIRI nordic profile: merge these into `MANY_SEATS_AVAILABLE`.
   */
  Empty = 'EMPTY',
  /**
   * The vehicle or carriage has a small number of seats available. The amount of free seats out of
   * the total seats available to be considered small enough to fall into this category is
   * determined at the discretion of the producer.
   * SIRI nordic profile: less than ~50% of seats available.
   */
  FewSeatsAvailable = 'FEW_SEATS_AVAILABLE',
  /**
   * The vehicle is considered full by most measures, but may still be allowing passengers to
   * board.
   */
  Full = 'FULL',
  /**
   * The vehicle or carriage has a large number of seats available. The amount of free seats out of
   * the total seats available to be considered large enough to fall into this category is
   * determined at the discretion of the producer. There isn't a big difference between this and
   * EMPTY so it's possible to handle them as the same value, if one wants to limit the number of
   * different values.
   * SIRI nordic profile: more than ~50% of seats available.
   */
  ManySeatsAvailable = 'MANY_SEATS_AVAILABLE',
  /**
   * The vehicle or carriage is not accepting passengers.
   * SIRI nordic profile: if vehicle/carriage is not in use / unavailable, or passengers are only allowed
   * to alight due to e.g. crowding.
   */
  NotAcceptingPassengers = 'NOT_ACCEPTING_PASSENGERS',
  /** Default. There is no occupancy-data on this departure. */
  NoDataAvailable = 'NO_DATA_AVAILABLE',
  /**
   * The vehicle or carriage can currently accommodate only standing passengers.
   * SIRI nordic profile: less than ~10% of seats available.
   */
  StandingRoomOnly = 'STANDING_ROOM_ONLY'
}

export type OpeningHours = {
  __typename?: 'OpeningHours';
  /**
   * Opening hours for the selected dates using the local time of the parking lot.
   * Each date can have multiple time spans.
   *
   * Note: This is not implemented yet and always returns null.
   */
  dates?: Maybe<Array<Maybe<LocalTimeSpanDate>>>;
  /**
   * OSM-formatted string of the opening hours.
   *
   * The spec is available at: https://wiki.openstreetmap.org/wiki/Key:opening_hours
   */
  osm?: Maybe<Scalars['String']['output']>;
};


export type OpeningHoursDatesArgs = {
  dates: Array<Scalars['String']['input']>;
};

/** Optimization type for bicycling legs */
export enum OptimizeType {
  /** Prefer flat terrain */
  Flat = 'FLAT',
  /** GREENWAYS */
  Greenways = 'GREENWAYS',
  /** Prefer faster routes */
  Quick = 'QUICK',
  /** Prefer safer routes, i.e. avoid crossing streets and use bike paths when possible */
  Safe = 'SAFE',
  /** **TRIANGLE** optimization type can be used to set relative preferences of optimization factors. See argument `triangle`. */
  Triangle = 'TRIANGLE'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/**
 * The filter definition to include or exclude parking facilities used during routing.
 *
 * Logically, the filter algorithm work as follows:
 *
 * - The starting point is the set of all facilities, lets call it `A`.
 * - Then all `select` filters are applied to `A`, potentially reducing the number of facilities used.
 *   Let's call the result of this `B`.
 *   An empty `select` will lead to `A` being equal to `B`.
 * - Lastly, the `not` filters are applied to `B`, reducing the set further.
 *   Lets call this final set `C`.
 *   An empty `not` will lead to `B` being equal to `C`.
 * - The remaining parking facilities in `C` are used for routing.
 */
export type ParkingFilter = {
  /**
   * Exclude parking facilities based on their properties.
   *
   * If empty nothing is excluded from the initial set of facilities but may be filtered down
   * further by the `select` filter.
   */
  not?: InputMaybe<Array<ParkingFilterOperation>>;
  /**
   * Include parking facilities based on their properties.
   *
   * If empty everything is included from the initial set of facilities but may be filtered down
   * further by the `not` filter.
   */
  select?: InputMaybe<Array<ParkingFilterOperation>>;
};

export type ParkingFilterOperation = {
  /** Filter parking facilities based on their tag */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Pattern is sequence of stops used by trips on a specific direction and variant
 * of a route. Most routes have only two patterns: one for outbound trips and one
 * for inbound trips
 */
export type Pattern = Node & {
  __typename?: 'Pattern';
  /**
   * By default, list of alerts which have directly an effect on just the pattern.
   * It's also possible to return other relevant alerts through defining types.
   */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /** ID of the pattern */
  code: Scalars['String']['output'];
  /**
   * Direction of the pattern. Possible values: 0, 1 or -1.
   * -1 indicates that the direction is irrelevant, i.e. the route has patterns only in one direction.
   */
  directionId?: Maybe<Scalars['Int']['output']>;
  geometry?: Maybe<Array<Maybe<Coordinates>>>;
  /** Vehicle headsign used by trips of this pattern */
  headsign?: Maybe<Scalars['String']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /**
   * Name of the pattern. Pattern name can be just the name of the route or it can
   * include details of destination and origin stops.
   */
  name?: Maybe<Scalars['String']['output']>;
  /** Original Trip pattern for changed patterns */
  originalTripPattern?: Maybe<Pattern>;
  /** Coordinates of the route of this pattern in Google polyline encoded format */
  patternGeometry?: Maybe<Geometry>;
  /** The route this pattern runs on */
  route: Route;
  /**
   * Hash code of the pattern. This value is stable and not dependent on the
   * pattern id, i.e. this value can be used to check whether two patterns are the
   * same, even if their ids have changed.
   */
  semanticHash?: Maybe<Scalars['String']['output']>;
  /** List of stops served by this pattern */
  stops?: Maybe<Array<Stop>>;
  /** Trips which run on this pattern */
  trips?: Maybe<Array<Trip>>;
  /** Trips which run on this pattern on the specified date */
  tripsForDate?: Maybe<Array<Trip>>;
  /** Real-time updated position of vehicles that are serving this pattern. */
  vehiclePositions?: Maybe<Array<VehiclePosition>>;
};


/**
 * Pattern is sequence of stops used by trips on a specific direction and variant
 * of a route. Most routes have only two patterns: one for outbound trips and one
 * for inbound trips
 */
export type PatternAlertsArgs = {
  types?: InputMaybe<Array<InputMaybe<PatternAlertType>>>;
};


/**
 * Pattern is sequence of stops used by trips on a specific direction and variant
 * of a route. Most routes have only two patterns: one for outbound trips and one
 * for inbound trips
 */
export type PatternTripsForDateArgs = {
  serviceDate?: InputMaybe<Scalars['String']['input']>;
};

/** Entities, which are relevant for a pattern and can contain alerts */
export enum PatternAlertType {
  /** Alerts affecting the pattern's route's agency */
  Agency = 'AGENCY',
  /** Alerts affecting the pattern */
  Pattern = 'PATTERN',
  /** Alerts affecting the route that the pattern runs on */
  Route = 'ROUTE',
  /** Alerts affecting the route type of the route that the pattern runs on */
  RouteType = 'ROUTE_TYPE',
  /** Alerts affecting the stops which are on this pattern */
  StopsOnPattern = 'STOPS_ON_PATTERN',
  /** Alerts affecting the stops of the trips which run on this pattern */
  StopsOnTrips = 'STOPS_ON_TRIPS',
  /** Alerts affecting the trips which run on this pattern */
  Trips = 'TRIPS'
}

export enum PickupDropoffType {
  /** Must phone agency to arrange pickup / drop off. */
  CallAgency = 'CALL_AGENCY',
  /** Must coordinate with driver to arrange pickup / drop off. */
  CoordinateWithDriver = 'COORDINATE_WITH_DRIVER',
  /** No pickup / drop off available. */
  None = 'NONE',
  /** Regularly scheduled pickup / drop off. */
  Scheduled = 'SCHEDULED'
}

export type Place = {
  __typename?: 'Place';
  /**
   * The time the rider will arrive at the place. This also includes real-time information
   * if available.
   */
  arrival?: Maybe<LegTime>;
  /**
   * The time the rider will arrive at the place. Format: Unix timestamp in milliseconds.
   * @deprecated Use `arrival` which includes timezone information.
   */
  arrivalTime: Scalars['Long']['output'];
  /**
   * The bike parking related to the place
   * @deprecated bikePark is deprecated. Use vehicleParking instead.
   */
  bikePark?: Maybe<BikePark>;
  /**
   * The bike rental station related to the place
   * @deprecated Use vehicleRentalStation and rentalVehicle instead
   */
  bikeRentalStation?: Maybe<BikeRentalStation>;
  /**
   * The car parking related to the place
   * @deprecated carPark is deprecated. Use vehicleParking instead.
   */
  carPark?: Maybe<CarPark>;
  /**
   * The time the rider will depart the place. This also includes real-time information
   * if available.
   */
  departure?: Maybe<LegTime>;
  /**
   * The time the rider will depart the place. Format: Unix timestamp in milliseconds.
   * @deprecated Use `departure` which includes timezone information.
   */
  departureTime: Scalars['Long']['output'];
  /** Latitude of the place (WGS 84) */
  lat: Scalars['Float']['output'];
  /** Longitude of the place (WGS 84) */
  lon: Scalars['Float']['output'];
  /** For transit stops, the name of the stop. For points of interest, the name of the POI. */
  name?: Maybe<Scalars['String']['output']>;
  /** The rental vehicle related to the place */
  rentalVehicle?: Maybe<RentalVehicle>;
  /** The stop related to the place. */
  stop?: Maybe<Stop>;
  /**
   * The position of the stop in the pattern. This is not required to start from 0 or be consecutive - any
   * increasing integer sequence along the stops is valid.
   *
   * The purpose of this field is to identify the stop within the pattern so it can be cross-referenced
   * between it and the itinerary. It is safe to cross-reference when done quickly, i.e. within seconds.
   * However, it should be noted that real-time updates can change the values, so don't store it for
   * longer amounts of time.
   *
   * Depending on the source data, this might not be the GTFS `stop_sequence` but another value, perhaps
   * even generated.
   *
   * The position can be either at a certain stop or in between two for trips where this is possible.
   */
  stopPosition?: Maybe<StopPosition>;
  /** The vehicle parking related to the place */
  vehicleParking?: Maybe<VehicleParking>;
  /** The vehicle rental station related to the place */
  vehicleRentalStation?: Maybe<VehicleRentalStation>;
  /**
   * Type of vertex. (Normal, Bike sharing station, Bike P+R, Transit stop) Mostly
   * used for better localization of bike sharing and P+R station names
   */
  vertexType?: Maybe<VertexType>;
};

/** Interface for places, e.g. stops, stations, parking areas.. */
export type PlaceInterface = {
  id: Scalars['ID']['output'];
  /** Latitude of the place (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the place (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
};

export type Plan = {
  __typename?: 'Plan';
  /** The time and date of travel. Format: Unix timestamp in milliseconds. */
  date?: Maybe<Scalars['Long']['output']>;
  /** Information about the timings for the plan generation */
  debugOutput: DebugOutput;
  /** The origin */
  from: Place;
  /** A list of possible itineraries */
  itineraries: Array<Maybe<Itinerary>>;
  /** A list of possible error messages as enum */
  messageEnums: Array<Maybe<Scalars['String']['output']>>;
  /** A list of possible error messages in cleartext */
  messageStrings: Array<Maybe<Scalars['String']['output']>>;
  /**
   * This is the suggested search time for the "next page" or time window. Insert it together
   * with the searchWindowUsed in the request to get a new set of trips following in the
   * search-window AFTER the current search. No duplicate trips should be returned, unless a trip
   * is delayed and new real-time data is available.
   * @deprecated Use nextPageCursor instead
   */
  nextDateTime?: Maybe<Scalars['Long']['output']>;
  /**
   * Use the cursor to go to the next "page" of itineraries. Copy the cursor from the last response
   * to the pageCursor query parameter and keep the original request as is. This will enable you to
   * search for itineraries in the next search-window.
   * The cursor based paging only support stepping to the next page, as it does not support jumping.
   * This is only usable when public transportation mode(s) are included in the query.
   */
  nextPageCursor?: Maybe<Scalars['String']['output']>;
  /**
   * This is the suggested search time for the "previous page" or time window. Insert it together
   * with the searchWindowUsed in the request to get a new set of trips preceding in the
   * search-window BEFORE the current search. No duplicate trips should be returned, unless a trip
   * is delayed and new real-time data is available.
   * @deprecated Use previousPageCursor instead
   */
  prevDateTime?: Maybe<Scalars['Long']['output']>;
  /**
   * Use the cursor to go to the previous "page" of itineraries. Copy the cursor from the last
   * response to the pageCursor query parameter and keep the original request otherwise as is.
   * This will enable you to search for itineraries in the previous search-window.
   * The cursor based paging only support stepping to the previous page, as it does not support
   * jumping.
   * This is only usable when public transportation mode(s) are included in the query.
   */
  previousPageCursor?: Maybe<Scalars['String']['output']>;
  /** A list of routing errors, and fields which caused them */
  routingErrors: Array<RoutingError>;
  /**
   * This is the `searchWindow` used by the raptor search. It is provided here for debugging
   * purpousess.
   *
   * The unit is seconds.
   */
  searchWindowUsed?: Maybe<Scalars['Long']['output']>;
  /** The destination */
  to: Place;
};

/** Street modes that can be used for access to the transit network from origin. */
export enum PlanAccessMode {
  /**
   * Cycling to a stop and boarding a vehicle with the bicycle.
   * Note, this can include walking when it's needed to walk the bicycle.
   * Access can use cycling only if the mode used for transfers
   * and egress is also `BICYCLE`.
   */
  Bicycle = 'BICYCLE',
  /**
   * Starting the itinerary with a bicycle and parking the bicycle to
   * a parking location. Note, this can include walking after parking
   * the bicycle or when it's needed to walk the bicycle.
   */
  BicycleParking = 'BICYCLE_PARKING',
  /**
   * Bicycle rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, access will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * bicycle or when it's needed to walk the bicycle.
   */
  BicycleRental = 'BICYCLE_RENTAL',
  /**
   * Getting dropped off by a car to a location that is accessible with a car.
   * Note, this can include walking after the drop-off.
   */
  CarDropOff = 'CAR_DROP_OFF',
  /**
   * Starting the itinerary with a car and parking the car to a parking location.
   * Note, this can include walking after parking the car.
   */
  CarParking = 'CAR_PARKING',
  /**
   * Car rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, access will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * car.
   */
  CarRental = 'CAR_RENTAL',
  /**
   * Flexible transit. This can include different forms of flexible transit that
   * can be defined in GTFS-Flex or in Netex. Note, this can include walking before
   * or after the flexible transit leg.
   */
  Flex = 'FLEX',
  /**
   * Scooter rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, access will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * scooter.
   */
  ScooterRental = 'SCOOTER_RENTAL',
  /** Walking to a stop. */
  Walk = 'WALK'
}

/**
 * Plan (result of an itinerary search) that follows
 * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
 */
export type PlanConnection = {
  __typename?: 'PlanConnection';
  /**
   * Edges which contain the itineraries. Part of the
   * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
   */
  edges?: Maybe<Array<Maybe<PlanEdge>>>;
  /**
   * Contains cursors to continue the search and the information if there are more itineraries available.
   * Part of the [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
   */
  pageInfo: PlanPageInfo;
  /** Errors faced during the routing search. */
  routingErrors: Array<RoutingError>;
  /** What was the starting point for the itinerary search. */
  searchDateTime?: Maybe<Scalars['OffsetDateTime']['output']>;
};

/** A coordinate used for a location in a plan query. */
export type PlanCoordinateInput = {
  /** Latitude as a WGS84 format number. */
  latitude: Scalars['CoordinateValue']['input'];
  /** Longitude as a WGS84 format number. */
  longitude: Scalars['CoordinateValue']['input'];
};

/** Plan date time options. Only one of the values should be defined. */
export type PlanDateTimeInput =
  /**
   * Earliest departure date time. The returned itineraries should not
   * depart before this instant unless one is using paging to find earlier
   * itineraries. Note, it is not currently possible to define both
   * `earliestDeparture` and `latestArrival`.
   */
  { earliestDeparture: Scalars['OffsetDateTime']['input']; latestArrival?: never; }
  |  /**
   * Latest arrival time date time. The returned itineraries should not
   * arrive to the destination after this instant unless one is using
   * paging to find later itineraries. Note, it is not currently possible
   * to define both `earliestDeparture` and `latestArrival`.
   */
  { earliestDeparture?: never; latestArrival: Scalars['OffsetDateTime']['input']; };

/** Street mode that is used when searching for itineraries that don't use any transit. */
export enum PlanDirectMode {
  /**
   * Cycling from the origin to the destination. Note, this can include walking
   * when it's needed to walk the bicycle.
   */
  Bicycle = 'BICYCLE',
  /**
   * Starting the itinerary with a bicycle and parking the bicycle to
   * a parking location. Note, this can include walking after parking
   * the bicycle or when it's needed to walk the bicycle.
   */
  BicycleParking = 'BICYCLE_PARKING',
  /**
   * Bicycle rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, itinerary will include only walking.
   * Also, it can include walking before picking up or after dropping off the
   * bicycle or when it's needed to walk the bicycle.
   */
  BicycleRental = 'BICYCLE_RENTAL',
  /** Driving a car from the origin to the destination. */
  Car = 'CAR',
  /**
   * Starting the itinerary with a car and parking the car to a parking location.
   * Note, this can include walking after parking the car.
   */
  CarParking = 'CAR_PARKING',
  /**
   * Car rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, itinerary will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * car.
   */
  CarRental = 'CAR_RENTAL',
  /**
   * Flexible transit. This can include different forms of flexible transit that
   * can be defined in GTFS-Flex or in Netex. Note, this can include walking before
   * or after the flexible transit leg.
   */
  Flex = 'FLEX',
  /**
   * Scooter rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, itinerary will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * scooter.
   */
  ScooterRental = 'SCOOTER_RENTAL',
  /**
   * Walking from the origin to the destination. Note, this can include walking
   * when it's needed to walk the bicycle.
   */
  Walk = 'WALK'
}

/**
 * Edge outputted by a plan search. Part of the
 * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
 */
export type PlanEdge = {
  __typename?: 'PlanEdge';
  /**
   * The cursor of the edge. Part of the
   * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
   */
  cursor: Scalars['String']['output'];
  /**
   * An itinerary suggestion. Part of the
   * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
   */
  node: Itinerary;
};

/** Street modes that can be used for egress from the transit network to destination. */
export enum PlanEgressMode {
  /**
   * Cycling from a stop to the destination. Note, this can include walking when
   * it's needed to walk the bicycle. Egress can use cycling only if the mode used
   * for access and transfers is also `BICYCLE`.
   */
  Bicycle = 'BICYCLE',
  /**
   * Bicycle rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, egress will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * bicycle or when it's needed to walk the bicycle.
   */
  BicycleRental = 'BICYCLE_RENTAL',
  /**
   * Getting picked up by a car from a location that is accessible with a car.
   * Note, this can include walking before the pickup.
   */
  CarPickup = 'CAR_PICKUP',
  /**
   * Car rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, egress will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * car.
   */
  CarRental = 'CAR_RENTAL',
  /**
   * Flexible transit. This can include different forms of flexible transit that
   * can be defined in GTFS-Flex or in Netex. Note, this can include walking before
   * or after the flexible transit leg.
   */
  Flex = 'FLEX',
  /**
   * Scooter rental can use either station based systems or "floating"
   * vehicles which are not linked to a rental station. Note, if there are no
   * rental options available, egress will include only walking. Also, this
   * can include walking before picking up or after dropping off the
   * scooter.
   */
  ScooterRental = 'SCOOTER_RENTAL',
  /** Walking from a stop to the destination. */
  Walk = 'WALK'
}

/**
 * Settings that control the behavior of itinerary filtering. **These are advanced settings and
 * should not be set by a user through user preferences.**
 */
export type PlanItineraryFilterInput = {
  /**
   * Pick one itinerary from each group after putting itineraries that are `85%` similar together,
   * if the given value is `0.85`, for example. Itineraries are grouped together based on relative
   * the distance of transit travel that is identical between the itineraries (access, egress and
   * transfers are ignored). The value must be at least `0.5`.
   */
  groupSimilarityKeepOne?: InputMaybe<Scalars['Ratio']['input']>;
  /**
   * Pick three itineraries from each group after putting itineraries that are `68%` similar together,
   * if the given value is `0.68`, for example. Itineraries are grouped together based on relative
   * the distance of transit travel that is identical between the itineraries (access, egress and
   * transfers are ignored). The value must be at least `0.5`.
   */
  groupSimilarityKeepThree?: InputMaybe<Scalars['Ratio']['input']>;
  /**
   * Of the itineraries grouped to maximum of three itineraries, how much worse can the non-grouped
   * legs be compared to the lowest cost. `2.0` means that they can be double the cost, and any
   * itineraries having a higher cost will be filtered away. Use a value lower than `1.0` to turn the
   * grouping off.
   */
  groupedOtherThanSameLegsMaxCostMultiplier?: InputMaybe<Scalars['Float']['input']>;
  /** Itinerary filter debug profile used to control the behaviour of itinerary filters. */
  itineraryFilterDebugProfile?: InputMaybe<ItineraryFilterDebugProfile>;
};

/**
 * Plan location settings. Location must be set. Label is optional
 * and used for naming the location.
 */
export type PlanLabeledLocationInput = {
  /**
   * A label that can be attached to the location. This label is then returned with the location
   * in the itineraries.
   */
  label?: InputMaybe<Scalars['String']['input']>;
  /** A location that has to be used in an itinerary. */
  location: PlanLocationInput;
};

/** Plan location. Either a coordinate or a stop location should be defined. */
export type PlanLocationInput =
  /** Coordinate of the location. Note, either a coordinate or a stop location should be defined. */
  { coordinate: PlanCoordinateInput; stopLocation?: never; }
  |  /**
   * Stop, station, a group of stop places or multimodal stop place that should be used as
   * a location for the search. The trip doesn't have to use the given stop location for a
   * transit connection as it's possible to start walking to another stop from the given
   * location. If a station or a group of stop places is provided, a stop that makes the most
   * sense for the journey is picked as the location within the station or group of stop places.
   */
  { coordinate?: never; stopLocation: PlanStopLocationInput; };

/** Mode selections for the plan search. */
export type PlanModesInput = {
  /**
   * Street mode that is used when searching for itineraries that don't use any transit.
   * If more than one mode is selected, at least one of them must be used but not necessarily all.
   * There are modes that automatically also use walking such as the rental modes. To force rental
   * to be used, this should only include the rental mode and not `WALK` in addition.
   * The default access mode is `WALK`.
   */
  direct?: InputMaybe<Array<PlanDirectMode>>;
  /** Should only the direct search without any transit be done. */
  directOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Modes for different phases of an itinerary when transit is included. Also
   * includes street mode selections related to connecting to the transit network
   * and transfers. By default, all transit modes are usable and `WALK` is used for
   * access, egress and transfers.
   */
  transit?: InputMaybe<PlanTransitModesInput>;
  /**
   * Should only the transit search be done and never suggest itineraries that don't
   * contain any transit legs.
   */
  transitOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Information about pagination in a connection. Part of the
 * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
 */
export type PlanPageInfo = {
  __typename?: 'PlanPageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The search window that was used for the search in the current page. */
  searchWindowUsed?: Maybe<Scalars['Duration']['output']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Wrapper type for different types of preferences related to plan query. */
export type PlanPreferencesInput = {
  /** Accessibility preferences that affect both the street and transit routing. */
  accessibility?: InputMaybe<AccessibilityPreferencesInput>;
  /**
   * Street routing preferences used for ingress, egress and transfers. These do not directly affect
   * the transit legs but can change how preferable walking or cycling, for example, is compared to
   * transit.
   */
  street?: InputMaybe<PlanStreetPreferencesInput>;
  /** Transit routing preferences used for transit legs. */
  transit?: InputMaybe<TransitPreferencesInput>;
};

/**
 * Stop, station, a group of stop places or multimodal stop place that should be used as
 * a location for the search. The trip doesn't have to use the given stop location for a
 * transit connection as it's possible to start walking to another stop from the given
 * location. If a station or a group of stop places is provided, a stop that makes the most
 * sense for the journey is picked as the location within the station or group of stop places.
 */
export type PlanStopLocationInput = {
  /**
   * ID of the stop, station, a group of stop places or multimodal stop place. Format
   * should be `FeedId:StopLocationId`.
   */
  stopLocationId: Scalars['String']['input'];
};

/**
 * Street routing preferences used for ingress, egress and transfers. These do not directly affect
 * the transit legs but can change how preferable walking or cycling, for example, is compared to
 * transit.
 */
export type PlanStreetPreferencesInput = {
  /** Cycling related preferences. */
  bicycle?: InputMaybe<BicyclePreferencesInput>;
  /**
   * Car related preferences. These are not used for car travel as part of transit, such as
   * taxi travel.
   */
  car?: InputMaybe<CarPreferencesInput>;
  /** Scooter (kick or electrical) related preferences. */
  scooter?: InputMaybe<ScooterPreferencesInput>;
  /**
   * Walk related preferences. These are not used when walking a bicycle or a scooter as they
   * have their own preferences.
   */
  walk?: InputMaybe<WalkPreferencesInput>;
};

export enum PlanTransferMode {
  /**
   * Cycling between transit vehicles (typically between stops). Note, this can
   * include walking when it's needed to walk the bicycle. Transfers can only use
   * cycling if the mode used for access and egress is also `BICYCLE`.
   */
  Bicycle = 'BICYCLE',
  /** Walking between transit vehicles (typically between stops). */
  Walk = 'WALK'
}

/** Transit mode and a reluctance associated with it. */
export type PlanTransitModePreferenceInput = {
  /** Costs related to using a transit mode. */
  cost?: InputMaybe<TransitModePreferenceCostInput>;
  /** Transit mode that could be (but doesn't have to be) used in an itinerary. */
  mode: TransitMode;
};

/**
 * Modes for different phases of an itinerary when transit is included. Also includes street
 * mode selections related to connecting to the transit network and transfers.
 */
export type PlanTransitModesInput = {
  /**
   * Street mode that is used when searching for access to the transit network from origin.
   * If more than one mode is selected, at least one of them must be used but not necessarily all.
   * There are modes that automatically also use walking such as the rental modes. To force rental
   * to be used, this should only include the rental mode and not `WALK` in addition.
   * The default access mode is `WALK`.
   */
  access?: InputMaybe<Array<PlanAccessMode>>;
  /**
   * Street mode that is used when searching for egress to destination from the transit network.
   * If more than one mode is selected, at least one of them must be used but not necessarily all.
   * There are modes that automatically also use walking such as the rental modes. To force rental
   * to be used, this should only include the rental mode and not `WALK` in addition.
   * The default access mode is `WALK`.
   */
  egress?: InputMaybe<Array<PlanEgressMode>>;
  /**
   * Street mode that is used when searching for transfers. Selection of only one allowed for now.
   * The default transfer mode is `WALK`.
   */
  transfer?: InputMaybe<Array<PlanTransferMode>>;
  /**
   * Transit modes and reluctances associated with them. Each defined mode can be used in
   * an itinerary but doesn't have to be. If direct search is not disabled, there can be an
   * itinerary without any transit legs. By default, all transit modes are usable.
   */
  transit?: InputMaybe<Array<PlanTransitModePreferenceInput>>;
};

/** Stop position at a specific stop. */
export type PositionAtStop = {
  __typename?: 'PositionAtStop';
  /** Position of the stop in the pattern. Positions are not required to start from 0 or be consecutive. */
  position?: Maybe<Scalars['Int']['output']>;
};

/** The board/alight position in between two stops of the pattern of a trip with continuous pickup/drop off. */
export type PositionBetweenStops = {
  __typename?: 'PositionBetweenStops';
  /** Position of the next stop in the pattern. Positions are not required to start from 0 or be consecutive. */
  nextPosition?: Maybe<Scalars['Int']['output']>;
  /** Position of the previous stop in the pattern. Positions are not required to start from 0 or be consecutive. */
  previousPosition?: Maybe<Scalars['Int']['output']>;
};

export enum PropulsionType {
  /** Powered by gasoline combustion engine */
  Combustion = 'COMBUSTION',
  /** Powered by diesel combustion engine */
  CombustionDiesel = 'COMBUSTION_DIESEL',
  /** Powered by battery-powered electric motor with throttle mode */
  Electric = 'ELECTRIC',
  /** Provides electric motor assist only in combination with human propulsion - no throttle mode */
  ElectricAssist = 'ELECTRIC_ASSIST',
  /** Pedal or foot propulsion */
  Human = 'HUMAN',
  /** Powered by combined combustion engine and battery-powered motor */
  Hybrid = 'HYBRID',
  /** Powered by hydrogen fuel cell powered electric motor */
  HydrogenFuelCell = 'HYDROGEN_FUEL_CELL',
  /** Powered by combined combustion engine and battery-powered motor with plug-in charging */
  PlugInHybrid = 'PLUG_IN_HYBRID'
}

/**
 * Additional qualifier for a transport mode.
 * Note that qualifiers can only be used with certain transport modes.
 */
export enum Qualifier {
  /** The mode is used for the access part of the search. */
  Access = 'ACCESS',
  /** The mode is used for the direct street search. */
  Direct = 'DIRECT',
  /** The user can be dropped off by someone else riding a vehicle */
  Dropoff = 'DROPOFF',
  /** The mode is used for the egress part of the search. */
  Egress = 'EGRESS',
  /** Hailing a ride, for example via an app like Uber. */
  Hail = 'HAIL',
  /**
   * ~~HAVE~~
   * **Currently not used**
   * @deprecated Currently not used
   */
  Have = 'HAVE',
  /**
   * ~~KEEP~~
   * **Currently not used**
   * @deprecated Currently not used
   */
  Keep = 'KEEP',
  /**
   * The vehicle used must be left to a parking area before continuing the journey.
   * This qualifier is usable with transport modes `CAR` and `BICYCLE`.
   * Note that the vehicle is only parked if the journey is continued with public
   * transportation (e.g. if only `CAR` and `WALK` transport modes are allowed to
   * be used, the car will not be parked as it is used for the whole journey).
   */
  Park = 'PARK',
  /** The user can be picked up by someone else riding a vehicle */
  Pickup = 'PICKUP',
  /** The vehicle used for transport can be rented */
  Rent = 'RENT'
}

export type QueryType = {
  __typename?: 'QueryType';
  /** Get all agencies */
  agencies?: Maybe<Array<Maybe<Agency>>>;
  /** Get a single agency based on agency ID, i.e. value of field `gtfsId` (ID format is `FeedId:StopId`) */
  agency?: Maybe<Agency>;
  /** Get all active alerts */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /**
   * Get a single bike park based on its ID, i.e. value of field `bikeParkId`
   * @deprecated bikePark is deprecated. Use vehicleParking instead.
   */
  bikePark?: Maybe<BikePark>;
  /**
   * Get all bike parks
   * @deprecated bikeParks is deprecated. Use vehicleParkings instead.
   */
  bikeParks?: Maybe<Array<Maybe<BikePark>>>;
  /**
   * Get a single bike rental station based on its ID, i.e. value of field `stationId`
   * @deprecated Use rentalVehicle or vehicleRentalStation instead
   */
  bikeRentalStation?: Maybe<BikeRentalStation>;
  /**
   * Get all bike rental stations
   * @deprecated Use rentalVehicles or vehicleRentalStations instead
   */
  bikeRentalStations?: Maybe<Array<Maybe<BikeRentalStation>>>;
  /** Get cancelled TripTimes. */
  cancelledTripTimes?: Maybe<Array<Maybe<Stoptime>>>;
  /**
   * Get a single car park based on its ID, i.e. value of field `carParkId`
   * @deprecated carPark is deprecated. Use vehicleParking instead.
   */
  carPark?: Maybe<CarPark>;
  /**
   * Get all car parks
   * @deprecated carParks is deprecated. Use vehicleParkings instead.
   */
  carParks?: Maybe<Array<Maybe<CarPark>>>;
  /** Get a single cluster based on its ID, i.e. value of field `gtfsId` */
  cluster?: Maybe<Cluster>;
  /** Get all clusters */
  clusters?: Maybe<Array<Maybe<Cluster>>>;
  /** Get a single departure row based on its ID (ID format is `FeedId:StopId:PatternId`) */
  departureRow?: Maybe<DepartureRow>;
  /** Get all available feeds */
  feeds?: Maybe<Array<Maybe<Feed>>>;
  /**
   * Finds a trip matching the given parameters. This query type is useful if the
   * id of a trip is not known, but other details uniquely identifying the trip are
   * available from some source (e.g. MQTT vehicle positions).
   */
  fuzzyTrip?: Maybe<Trip>;
  /**
   * Get all places (stops, stations, etc. with coordinates) within the specified
   * radius from a location. The returned type is a Relay connection (see
   * https://facebook.github.io/relay/graphql/connections.htm). The placeAtDistance
   * type has two fields: place and distance. The search is done by walking so the
   * distance is according to the network of walkable streets and paths.
   */
  nearest?: Maybe<PlaceAtDistanceConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /**
   * Get a single pattern based on its ID, i.e. value of field `code` (format is
   * `FeedId:RouteId:DirectionId:PatternVariantNumber`)
   */
  pattern?: Maybe<Pattern>;
  /** Get all patterns */
  patterns?: Maybe<Array<Maybe<Pattern>>>;
  /** Plans an itinerary from point A to point B based on the given arguments */
  plan?: Maybe<Plan>;
  /**
   * Plan (itinerary) search that follows
   * [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm).
   * @deprecated Experimental and can include breaking changes, use plan instead
   */
  planConnection?: Maybe<PlanConnection>;
  /** Get a single rental vehicle based on its ID, i.e. value of field `vehicleId` */
  rentalVehicle?: Maybe<RentalVehicle>;
  /** Get all rental vehicles */
  rentalVehicles?: Maybe<Array<Maybe<RentalVehicle>>>;
  /** Get a single route based on its ID, i.e. value of field `gtfsId` (format is `FeedId:RouteId`) */
  route?: Maybe<Route>;
  /** Get all routes */
  routes?: Maybe<Array<Maybe<Route>>>;
  /** Get the time range for which the API has data available */
  serviceTimeRange?: Maybe<ServiceTimeRange>;
  /** Get a single station based on its ID, i.e. value of field `gtfsId` (format is `FeedId:StopId`) */
  station?: Maybe<Stop>;
  /** Get all stations */
  stations?: Maybe<Array<Maybe<Stop>>>;
  /** Get a single stop based on its ID, i.e. value of field `gtfsId` (ID format is `FeedId:StopId`) */
  stop?: Maybe<Stop>;
  /** Get all stops */
  stops?: Maybe<Array<Maybe<Stop>>>;
  /** Get all stops within the specified bounding box */
  stopsByBbox?: Maybe<Array<Maybe<Stop>>>;
  /**
   * Get all stops within the specified radius from a location. The returned type
   * is a Relay connection (see
   * https://facebook.github.io/relay/graphql/connections.htm). The stopAtDistance
   * type has two values: stop and distance.
   */
  stopsByRadius?: Maybe<StopAtDistanceConnection>;
  /** Return list of available ticket types */
  ticketTypes?: Maybe<Array<Maybe<TicketType>>>;
  /** Get a single trip based on its ID, i.e. value of field `gtfsId` (format is `FeedId:TripId`) */
  trip?: Maybe<Trip>;
  /** Get all trips */
  trips?: Maybe<Array<Maybe<Trip>>>;
  /** Get a single vehicle parking based on its ID */
  vehicleParking?: Maybe<VehicleParking>;
  /** Get all vehicle parkings */
  vehicleParkings?: Maybe<Array<Maybe<VehicleParking>>>;
  /** Get a single vehicle rental station based on its ID, i.e. value of field `stationId` */
  vehicleRentalStation?: Maybe<VehicleRentalStation>;
  /** Get all vehicle rental stations */
  vehicleRentalStations?: Maybe<Array<Maybe<VehicleRentalStation>>>;
  /** Needed until https://github.com/facebook/relay/issues/112 is resolved */
  viewer?: Maybe<QueryType>;
};


export type QueryTypeAgencyArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeAlertsArgs = {
  cause?: InputMaybe<Array<AlertCauseType>>;
  effect?: InputMaybe<Array<AlertEffectType>>;
  feeds?: InputMaybe<Array<Scalars['String']['input']>>;
  route?: InputMaybe<Array<Scalars['String']['input']>>;
  severityLevel?: InputMaybe<Array<AlertSeverityLevelType>>;
  stop?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryTypeBikeParkArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeBikeRentalStationArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeBikeRentalStationsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTypeCancelledTripTimesArgs = {
  feeds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxArrivalTime?: InputMaybe<Scalars['Int']['input']>;
  maxDate?: InputMaybe<Scalars['String']['input']>;
  maxDepartureTime?: InputMaybe<Scalars['Int']['input']>;
  minArrivalTime?: InputMaybe<Scalars['Int']['input']>;
  minDate?: InputMaybe<Scalars['String']['input']>;
  minDepartureTime?: InputMaybe<Scalars['Int']['input']>;
  patterns?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  routes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trips?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTypeCarParkArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeCarParksArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTypeClusterArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeDepartureRowArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeFuzzyTripArgs = {
  date: Scalars['String']['input'];
  direction?: InputMaybe<Scalars['Int']['input']>;
  route: Scalars['String']['input'];
  time: Scalars['Int']['input'];
};


export type QueryTypeNearestArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filterByIds?: InputMaybe<InputFilters>;
  filterByModes?: InputMaybe<Array<InputMaybe<Mode>>>;
  filterByNetwork?: InputMaybe<Array<Scalars['String']['input']>>;
  filterByPlaceTypes?: InputMaybe<Array<InputMaybe<FilterPlaceType>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
  maxDistance?: InputMaybe<Scalars['Int']['input']>;
  maxResults?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTypePatternArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypePlanArgs = {
  alightSlack?: InputMaybe<Scalars['Int']['input']>;
  allowBikeRental?: InputMaybe<Scalars['Boolean']['input']>;
  allowKeepingRentedBicycleAtDestination?: InputMaybe<Scalars['Boolean']['input']>;
  allowedBikeRentalNetworks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  allowedTicketTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  allowedVehicleRentalNetworks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  arriveBy?: InputMaybe<Scalars['Boolean']['input']>;
  banned?: InputMaybe<InputBanned>;
  bannedVehicleRentalNetworks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  batch?: InputMaybe<Scalars['Boolean']['input']>;
  bikeBoardCost?: InputMaybe<Scalars['Int']['input']>;
  bikeReluctance?: InputMaybe<Scalars['Float']['input']>;
  bikeSpeed?: InputMaybe<Scalars['Float']['input']>;
  bikeSwitchCost?: InputMaybe<Scalars['Int']['input']>;
  bikeSwitchTime?: InputMaybe<Scalars['Int']['input']>;
  bikeWalkingReluctance?: InputMaybe<Scalars['Float']['input']>;
  boardSlack?: InputMaybe<Scalars['Int']['input']>;
  carParkCarLegWeight?: InputMaybe<Scalars['Float']['input']>;
  carReluctance?: InputMaybe<Scalars['Float']['input']>;
  claimInitialWait?: InputMaybe<Scalars['Long']['input']>;
  compactLegsByReversedSearch?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  debugItineraryFilter?: InputMaybe<Scalars['Boolean']['input']>;
  disableRemainingWeightHeuristic?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<InputCoordinates>;
  fromPlace?: InputMaybe<Scalars['String']['input']>;
  heuristicStepsPerMainStep?: InputMaybe<Scalars['Int']['input']>;
  ignoreRealtimeUpdates?: InputMaybe<Scalars['Boolean']['input']>;
  intermediatePlaces?: InputMaybe<Array<InputMaybe<InputCoordinates>>>;
  itineraryFiltering?: InputMaybe<Scalars['Float']['input']>;
  keepingRentedBicycleAtDestinationCost?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  maxPreTransitTime?: InputMaybe<Scalars['Int']['input']>;
  maxTransfers?: InputMaybe<Scalars['Int']['input']>;
  maxWalkDistance?: InputMaybe<Scalars['Float']['input']>;
  minTransferTime?: InputMaybe<Scalars['Int']['input']>;
  modeWeight?: InputMaybe<InputModeWeight>;
  nonpreferredTransferPenalty?: InputMaybe<Scalars['Int']['input']>;
  numItineraries?: InputMaybe<Scalars['Int']['input']>;
  omitCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  optimize?: InputMaybe<OptimizeType>;
  pageCursor?: InputMaybe<Scalars['String']['input']>;
  parking?: InputMaybe<VehicleParkingInput>;
  preferred?: InputMaybe<InputPreferred>;
  reverseOptimizeOnTheFly?: InputMaybe<Scalars['Boolean']['input']>;
  searchWindow?: InputMaybe<Scalars['Long']['input']>;
  startTransitStopId?: InputMaybe<Scalars['String']['input']>;
  startTransitTripId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<InputCoordinates>;
  toPlace?: InputMaybe<Scalars['String']['input']>;
  transferPenalty?: InputMaybe<Scalars['Int']['input']>;
  transportModes?: InputMaybe<Array<InputMaybe<TransportMode>>>;
  triangle?: InputMaybe<InputTriangle>;
  unpreferred?: InputMaybe<InputUnpreferred>;
  waitAtBeginningFactor?: InputMaybe<Scalars['Float']['input']>;
  waitReluctance?: InputMaybe<Scalars['Float']['input']>;
  walkBoardCost?: InputMaybe<Scalars['Int']['input']>;
  walkOnStreetReluctance?: InputMaybe<Scalars['Float']['input']>;
  walkReluctance?: InputMaybe<Scalars['Float']['input']>;
  walkSafetyFactor?: InputMaybe<Scalars['Float']['input']>;
  walkSpeed?: InputMaybe<Scalars['Float']['input']>;
  wheelchair?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTypePlanConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  dateTime?: InputMaybe<PlanDateTimeInput>;
  destination: PlanLabeledLocationInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  itineraryFilter?: InputMaybe<PlanItineraryFilterInput>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['Locale']['input']>;
  modes?: InputMaybe<PlanModesInput>;
  origin: PlanLabeledLocationInput;
  preferences?: InputMaybe<PlanPreferencesInput>;
  searchWindow?: InputMaybe<Scalars['Duration']['input']>;
};


export type QueryTypeRentalVehicleArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeRentalVehiclesArgs = {
  formFactors?: InputMaybe<Array<InputMaybe<FormFactor>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTypeRouteArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeRoutesArgs = {
  feeds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  serviceDates?: InputMaybe<LocalDateRangeInput>;
  transportModes?: InputMaybe<Array<InputMaybe<Mode>>>;
};


export type QueryTypeStationArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeStationsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTypeStopArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeStopsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTypeStopsByBboxArgs = {
  feeds?: InputMaybe<Array<Scalars['String']['input']>>;
  maxLat: Scalars['Float']['input'];
  maxLon: Scalars['Float']['input'];
  minLat: Scalars['Float']['input'];
  minLon: Scalars['Float']['input'];
};


export type QueryTypeStopsByRadiusArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  feeds?: InputMaybe<Array<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
  radius: Scalars['Int']['input'];
};


export type QueryTypeTripArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeTripsArgs = {
  feeds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTypeVehicleParkingArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeVehicleParkingsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTypeVehicleRentalStationArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeVehicleRentalStationsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Real-time estimates for a vehicle at a certain place. */
export type RealTimeEstimate = {
  __typename?: 'RealTimeEstimate';
  /**
   * The delay or "earliness" of the vehicle at a certain place.
   *
   * If the vehicle is early then this is a negative duration.
   */
  delay: Scalars['Duration']['output'];
  time: Scalars['OffsetDateTime']['output'];
};

export enum RealtimeState {
  /** The trip has been added using a real-time update, i.e. the trip was not present in the GTFS feed. */
  Added = 'ADDED',
  /** The trip has been canceled by a real-time update. */
  Canceled = 'CANCELED',
  /**
   * The trip information has been updated and resulted in a different trip pattern
   * compared to the trip pattern of the scheduled trip.
   */
  Modified = 'MODIFIED',
  /** The trip information comes from the GTFS feed, i.e. no real-time update has been applied. */
  Scheduled = 'SCHEDULED',
  /** The trip information has been updated, but the trip pattern stayed the same as the trip pattern of the scheduled trip. */
  Updated = 'UPDATED'
}

/** Actions to take relative to the current position when engaging a walking/driving step. */
export enum RelativeDirection {
  CircleClockwise = 'CIRCLE_CLOCKWISE',
  CircleCounterclockwise = 'CIRCLE_COUNTERCLOCKWISE',
  Continue = 'CONTINUE',
  Depart = 'DEPART',
  Elevator = 'ELEVATOR',
  EnterStation = 'ENTER_STATION',
  ExitStation = 'EXIT_STATION',
  FollowSigns = 'FOLLOW_SIGNS',
  HardLeft = 'HARD_LEFT',
  HardRight = 'HARD_RIGHT',
  Left = 'LEFT',
  Right = 'RIGHT',
  SlightlyLeft = 'SLIGHTLY_LEFT',
  SlightlyRight = 'SLIGHTLY_RIGHT',
  UturnLeft = 'UTURN_LEFT',
  UturnRight = 'UTURN_RIGHT'
}

/** Rental vehicle represents a vehicle that belongs to a rental network. */
export type RentalVehicle = Node & PlaceInterface & {
  __typename?: 'RentalVehicle';
  /** If true, vehicle is currently available for renting. */
  allowPickupNow?: Maybe<Scalars['Boolean']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the vehicle (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the vehicle (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Name of the vehicle */
  name: Scalars['String']['output'];
  /**
   * ID of the rental network.
   * @deprecated Use `networkId` from `rentalNetwork` instead.
   */
  network?: Maybe<Scalars['String']['output']>;
  /** If true, vehicle is not disabled. */
  operative?: Maybe<Scalars['Boolean']['output']>;
  /** The vehicle rental network information. This is referred as system in the GBFS terminology. */
  rentalNetwork: VehicleRentalNetwork;
  /** Platform-specific URLs to begin the vehicle. */
  rentalUris?: Maybe<VehicleRentalUris>;
  /** ID of the vehicle in the format of network:id */
  vehicleId?: Maybe<Scalars['String']['output']>;
  /** The type of the rental vehicle (scooter, bicycle, car...) */
  vehicleType?: Maybe<RentalVehicleType>;
};

export type RentalVehicleEntityCounts = {
  __typename?: 'RentalVehicleEntityCounts';
  /** The number of entities by type */
  byType: Array<RentalVehicleTypeCount>;
  /** The total number of entities (e.g. vehicles, spaces). */
  total: Scalars['Int']['output'];
};

export type RentalVehicleType = {
  __typename?: 'RentalVehicleType';
  /** The vehicle's general form factor */
  formFactor?: Maybe<FormFactor>;
  /** The primary propulsion type of the vehicle */
  propulsionType?: Maybe<PropulsionType>;
};

export type RentalVehicleTypeCount = {
  __typename?: 'RentalVehicleTypeCount';
  /** The number of vehicles of this type */
  count: Scalars['Int']['output'];
  /** The type of the rental vehicle (scooter, bicycle, car...) */
  vehicleType: RentalVehicleType;
};

/** An estimate for a ride on a hailed vehicle, like an Uber car. */
export type RideHailingEstimate = {
  __typename?: 'RideHailingEstimate';
  /** The estimated time it takes for the vehicle to arrive. */
  arrival: Scalars['Duration']['output'];
  /** The upper bound of the price estimate of this ride. */
  maxPrice: Money;
  /** The lower bound of the price estimate of this ride. */
  minPrice: Money;
  /** The name of the ride, ie. UberX */
  productName?: Maybe<Scalars['String']['output']>;
  /** The provider of the ride hailing service. */
  provider: RideHailingProvider;
};

export type RideHailingProvider = {
  __typename?: 'RideHailingProvider';
  /** The ID of the ride hailing provider. */
  id: Scalars['String']['output'];
};

/** Category of riders a fare product applies to, for example students or pensioners. */
export type RiderCategory = {
  __typename?: 'RiderCategory';
  /** ID of the category */
  id: Scalars['String']['output'];
  /** Human readable name of the category. */
  name?: Maybe<Scalars['String']['output']>;
};

/**
 * Route represents a public transportation service, usually from point A to point
 * B and *back*, shown to customers under a single name, e.g. bus 550. Routes
 * contain patterns (see field `patterns`), which describe different variants of
 * the route, e.g. outbound pattern from point A to point B and inbound pattern
 * from point B to point A.
 */
export type Route = Node & {
  __typename?: 'Route';
  /** Agency operating the route */
  agency?: Maybe<Agency>;
  /**
   * List of alerts which have an effect on the route directly or indirectly.
   * By default only alerts directly affecting this route are returned. It's also possible
   * to return other relevant alerts through defining types.
   */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  bikesAllowed?: Maybe<BikesAllowed>;
  /**
   * The color (in hexadecimal format) the agency operating this route would prefer
   * to use on UI elements (e.g. polylines on a map) related to this route. This
   * value is not available for most routes.
   */
  color?: Maybe<Scalars['String']['output']>;
  desc?: Maybe<Scalars['String']['output']>;
  /** ID of the route in format `FeedId:RouteId` */
  gtfsId: Scalars['String']['output'];
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Long name of the route, e.g. Helsinki-Leppävaara */
  longName?: Maybe<Scalars['String']['output']>;
  /** Transport mode of this route, e.g. `BUS` */
  mode?: Maybe<TransitMode>;
  /** List of patterns which operate on this route */
  patterns?: Maybe<Array<Maybe<Pattern>>>;
  /** Short name of the route, usually a line number, e.g. 550 */
  shortName?: Maybe<Scalars['String']['output']>;
  /**
   * Orders the routes in a way which is useful for presentation to passengers.
   * Routes with smaller values should be displayed first.
   *
   * The value can be any non-negative integer. A null value means that no information was supplied.
   *
   * This value is passed through from the source data without modification. If multiple feeds
   * define sort orders for their routes, they may not be comparable to each other as no agreed scale
   * exists.
   *
   * Two routes may also have the same sort order and clients must decide based on other criteria
   * what the actual order is.
   */
  sortOrder?: Maybe<Scalars['Int']['output']>;
  /** List of stops on this route */
  stops?: Maybe<Array<Maybe<Stop>>>;
  /**
   * The color (in hexadecimal format) the agency operating this route would prefer
   * to use when displaying text related to this route. This value is not available
   * for most routes.
   */
  textColor?: Maybe<Scalars['String']['output']>;
  /** List of trips which operate on this route */
  trips?: Maybe<Array<Maybe<Trip>>>;
  /**
   * The raw GTFS route type as a integer. For the list of possible values, see:
   * https://developers.google.com/transit/gtfs/reference/#routestxt and
   * https://developers.google.com/transit/gtfs/reference/extended-route-types
   */
  type?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


/**
 * Route represents a public transportation service, usually from point A to point
 * B and *back*, shown to customers under a single name, e.g. bus 550. Routes
 * contain patterns (see field `patterns`), which describe different variants of
 * the route, e.g. outbound pattern from point A to point B and inbound pattern
 * from point B to point A.
 */
export type RouteAlertsArgs = {
  types?: InputMaybe<Array<InputMaybe<RouteAlertType>>>;
};


/**
 * Route represents a public transportation service, usually from point A to point
 * B and *back*, shown to customers under a single name, e.g. bus 550. Routes
 * contain patterns (see field `patterns`), which describe different variants of
 * the route, e.g. outbound pattern from point A to point B and inbound pattern
 * from point B to point A.
 */
export type RouteLongNameArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Route represents a public transportation service, usually from point A to point
 * B and *back*, shown to customers under a single name, e.g. bus 550. Routes
 * contain patterns (see field `patterns`), which describe different variants of
 * the route, e.g. outbound pattern from point A to point B and inbound pattern
 * from point B to point A.
 */
export type RoutePatternsArgs = {
  serviceDates?: InputMaybe<LocalDateRangeInput>;
};

/** Entities that are relevant for routes that can contain alerts */
export enum RouteAlertType {
  /** Alerts affecting the route's agency. */
  Agency = 'AGENCY',
  /** Alerts affecting route's patterns. */
  Patterns = 'PATTERNS',
  /** Alerts directly affecting the route. */
  Route = 'ROUTE',
  /** Alerts affecting the route type of the route. */
  RouteType = 'ROUTE_TYPE',
  /** Alerts affecting the stops that are on the route. */
  StopsOnRoute = 'STOPS_ON_ROUTE',
  /** Alerts affecting the stops on some trips of the route. */
  StopsOnTrips = 'STOPS_ON_TRIPS',
  /** Alerts affecting the route's trips. */
  Trips = 'TRIPS'
}

/**
 * Route type entity which covers all agencies if agency is null,
 * otherwise only relevant for one agency.
 */
export type RouteType = {
  __typename?: 'RouteType';
  /** A public transport agency */
  agency?: Maybe<Agency>;
  /**
   * GTFS Route type.
   * For the list of possible values, see:
   *     https://developers.google.com/transit/gtfs/reference/#routestxt and
   *     https://developers.google.com/transit/gtfs/reference/extended-route-types
   */
  routeType: Scalars['Int']['output'];
  /**
   * The routes which have the defined routeType and belong to the agency, if defined.
   * Otherwise all routes of the feed that have the defined routeType.
   */
  routes?: Maybe<Array<Maybe<Route>>>;
};

/** Description of the reason, why the planner did not return any results */
export type RoutingError = {
  __typename?: 'RoutingError';
  /** An enum describing the reason */
  code: RoutingErrorCode;
  /** A textual description of why the search failed. The clients are expected to have their own translations based on the code, for user visible error messages. */
  description: Scalars['String']['output'];
  /** An enum describing the field which should be changed, in order for the search to succeed */
  inputField?: Maybe<InputField>;
};

export enum RoutingErrorCode {
  /**
   * The specified location is not close to any streets or transit stops currently loaded into the
   * system, even though it is generally within its bounds.
   *
   * This can happen when there is only transit but no street data coverage at the location in
   * question.
   */
  LocationNotFound = 'LOCATION_NOT_FOUND',
  /**
   * No stops are reachable from the start or end locations specified.
   *
   * You can try searching using a different access or egress mode, for example cycling instead of walking,
   * increase the walking/cycling/driving speed or have an administrator change the system's configuration
   * so that stops further away are considered.
   */
  NoStopsInRange = 'NO_STOPS_IN_RANGE',
  /**
   * No transit connection was found between the origin and destination within the operating day or
   * the next day, not even sub-optimal ones.
   */
  NoTransitConnection = 'NO_TRANSIT_CONNECTION',
  /**
   * A transit connection was found, but it was outside the search window. See the metadata for a token
   * for retrieving the result outside the search window.
   */
  NoTransitConnectionInSearchWindow = 'NO_TRANSIT_CONNECTION_IN_SEARCH_WINDOW',
  /**
   * The coordinates are outside the geographic bounds of the transit and street data currently loaded
   * into the system and therefore cannot return any results.
   */
  OutsideBounds = 'OUTSIDE_BOUNDS',
  /**
   * The date specified is outside the range of data currently loaded into the system as it is too
   * far into the future or the past.
   *
   * The specific date range of the system is configurable by an administrator and also depends on
   * the input data provided.
   */
  OutsideServicePeriod = 'OUTSIDE_SERVICE_PERIOD',
  /**
   * Transit connections were requested and found but because it is easier to just walk all the way
   * to the destination they were removed.
   *
   * If you want to still show the transit results, you need to make walking less desirable by
   * increasing the walk reluctance.
   */
  WalkingBetterThanTransit = 'WALKING_BETTER_THAN_TRANSIT'
}

/** What criteria should be used when optimizing a scooter route. */
export type ScooterOptimizationInput =
  /** Define optimization by weighing three criteria. */
  { triangle: TriangleScooterFactorsInput; type?: never; }
  |  /** Use one of the predefined optimization types. */
  { triangle?: never; type: ScooterOptimizationType; };

/**
 * Predefined optimization alternatives for scooter routing. For more customization,
 * one can use the triangle factors.
 */
export enum ScooterOptimizationType {
  /** Emphasize flatness over safety or duration of the route. This option was previously called `FLAT`. */
  FlatStreets = 'FLAT_STREETS',
  /**
   * Completely ignore the elevation differences and prefer the streets, that are evaluated
   * to be safest for scooters, even more than with the `SAFE_STREETS` option.
   * Safety can also include other concerns such as convenience and general preferences by taking
   * into account road surface etc.  Note, currently the same criteria is used both for cycling and
   * scooter travel to determine how safe streets are for cycling or scooter.
   * This option was previously called `GREENWAYS`.
   */
  SafestStreets = 'SAFEST_STREETS',
  /**
   * Emphasize scooter safety over flatness or duration of the route. Safety can also include other
   * concerns such as convenience and general preferences by taking into account road surface etc.
   * Note, currently the same criteria is used both for cycling and scooter travel to determine how
   * safe streets are for cycling or scooter. This option was previously called `SAFE`.
   */
  SafeStreets = 'SAFE_STREETS',
  /**
   * Search for routes with the shortest duration while ignoring the scooter safety
   * of the streets. The routes should still follow local regulations, but currently scooters
   * are only allowed on the same streets as bicycles which might not be accurate for each country
   * or with different types of scooters. Routes can include steep streets, if they are
   * the fastest alternatives. This option was previously called `QUICK`.
   */
  ShortestDuration = 'SHORTEST_DURATION'
}

/** Preferences related to travel with a scooter (kick or e-scooter). */
export type ScooterPreferencesInput = {
  /** What criteria should be used when optimizing a scooter route. */
  optimization?: InputMaybe<ScooterOptimizationInput>;
  /**
   * A multiplier for how bad riding a scooter is compared to being in transit
   * for equal lengths of time.
   */
  reluctance?: InputMaybe<Scalars['Reluctance']['input']>;
  /** Scooter rental related preferences. */
  rental?: InputMaybe<ScooterRentalPreferencesInput>;
  /**
   * Maximum speed on flat ground while riding a scooter. Note, this speed is higher than
   * the average speed will be in itineraries as this is the maximum speed but there are
   * factors that slow down the travel such as crossings, intersections and elevation changes.
   */
  speed?: InputMaybe<Scalars['Speed']['input']>;
};

/** Preferences related to scooter rental (station based or floating scooter rental). */
export type ScooterRentalPreferencesInput = {
  /** Rental networks which can be potentially used as part of an itinerary. */
  allowedNetworks?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Rental networks which cannot be used as part of an itinerary. */
  bannedNetworks?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Is it possible to arrive to the destination with a rented scooter and does it
   * come with an extra cost.
   */
  destinationScooterPolicy?: InputMaybe<DestinationScooterPolicyInput>;
};

/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type Stop = Node & PlaceInterface & {
  __typename?: 'Stop';
  /**
   * By default, list of alerts which have directly an effect on just the stop.
   * It's also possible to return other relevant alerts through defining types.
   */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /** The cluster which this stop is part of */
  cluster?: Maybe<Cluster>;
  /** Stop code which is visible at the stop */
  code?: Maybe<Scalars['String']['output']>;
  /** Description of the stop, usually a street name */
  desc?: Maybe<Scalars['String']['output']>;
  direction?: Maybe<Scalars['String']['output']>;
  /**
   * Representations of this stop's geometry. This is mainly interesting for flex stops which can be
   * a polygon or a group of stops either consisting of either points or polygons.
   *
   * Regular fixed-schedule stops return a single point.
   *
   * Stations (parent stations with child stops) contain a geometry collection with a point for the
   * central coordinate plus a convex hull polygon (https://en.wikipedia.org/wiki/Convex_hull) of all
   * coordinates of the child stops.
   *
   * If there are only two child stops then the convex hull is a straight line between the them. If
   * there is a single child stop then it's a single point.
   */
  geometries?: Maybe<StopGeometries>;
  /** ÌD of the stop in format `FeedId:StopId` */
  gtfsId: Scalars['String']['output'];
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the stop (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Identifies whether this stop represents a stop or station. */
  locationType?: Maybe<LocationType>;
  /** Longitude of the stop (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Name of the stop, e.g. Pasilan asema */
  name: Scalars['String']['output'];
  /** The station which this stop is part of (or null if this stop is not part of a station) */
  parentStation?: Maybe<Stop>;
  /** Patterns which pass through this stop */
  patterns?: Maybe<Array<Maybe<Pattern>>>;
  /** Identifier of the platform, usually a number. This value is only present for stops that are part of a station */
  platformCode?: Maybe<Scalars['String']['output']>;
  /** Routes which pass through this stop */
  routes?: Maybe<Array<Route>>;
  /** Returns timetable of the specified pattern at this stop */
  stopTimesForPattern?: Maybe<Array<Maybe<Stoptime>>>;
  /** Returns all stops that are children of this station (Only applicable for stations) */
  stops?: Maybe<Array<Maybe<Stop>>>;
  /** Returns list of stoptimes (arrivals and departures) at this stop, grouped by patterns */
  stoptimesForPatterns?: Maybe<Array<Maybe<StoptimesInPattern>>>;
  /** Returns list of stoptimes for the specified date */
  stoptimesForServiceDate?: Maybe<Array<Maybe<StoptimesInPattern>>>;
  /** Returns list of stoptimes (arrivals and departures) at this stop */
  stoptimesWithoutPatterns?: Maybe<Array<Maybe<Stoptime>>>;
  timezone?: Maybe<Scalars['String']['output']>;
  /** List of nearby stops which can be used for transfers */
  transfers?: Maybe<Array<Maybe<StopAtDistance>>>;
  url?: Maybe<Scalars['String']['output']>;
  /**
   * Transport mode (e.g. `BUS`) used by routes which pass through this stop or
   * `null` if mode cannot be determined, e.g. in case no routes pass through the stop.
   * Note that also other types of vehicles may use the stop, e.g. tram replacement
   * buses might use stops which have `TRAM` as their mode.
   */
  vehicleMode?: Maybe<Mode>;
  /**
   * The raw GTFS route type used by routes which pass through this stop. For the
   * list of possible values, see:
   * https://developers.google.com/transit/gtfs/reference/#routestxt and
   * https://developers.google.com/transit/gtfs/reference/extended-route-types
   */
  vehicleType?: Maybe<Scalars['Int']['output']>;
  /** Whether wheelchair boarding is possible for at least some of vehicles on this stop */
  wheelchairBoarding?: Maybe<WheelchairBoarding>;
  /** ID of the zone where this stop is located */
  zoneId?: Maybe<Scalars['String']['output']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopAlertsArgs = {
  types?: InputMaybe<Array<InputMaybe<StopAlertType>>>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopDescArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopNameArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopStopTimesForPatternArgs = {
  id: Scalars['String']['input'];
  numberOfDepartures?: InputMaybe<Scalars['Int']['input']>;
  omitCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  omitNonPickups?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['Long']['input']>;
  timeRange?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopStoptimesForPatternsArgs = {
  numberOfDepartures?: InputMaybe<Scalars['Int']['input']>;
  omitCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  omitNonPickups?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['Long']['input']>;
  timeRange?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopStoptimesForServiceDateArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  omitCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  omitNonPickups?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopStoptimesWithoutPatternsArgs = {
  numberOfDepartures?: InputMaybe<Scalars['Int']['input']>;
  omitCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  omitNonPickups?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['Long']['input']>;
  timeRange?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopTransfersArgs = {
  maxDistance?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Stop can represent either a single public transport stop, where passengers can
 * board and/or disembark vehicles, or a station, which contains multiple stops.
 * See field `locationType`.
 */
export type StopUrlArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

/** Entities, which are relevant for a stop and can contain alerts */
export enum StopAlertType {
  /** Alerts affecting the agencies of the routes going through the stop */
  AgenciesOfRoutes = 'AGENCIES_OF_ROUTES',
  /** Alerts affecting the stop's patterns */
  Patterns = 'PATTERNS',
  /** Alerts affecting the routes that go through the stop */
  Routes = 'ROUTES',
  /** Alerts affecting the stop */
  Stop = 'STOP',
  /** Alerts affecting the stop on specific routes */
  StopOnRoutes = 'STOP_ON_ROUTES',
  /** Alerts affecting the stop on specific trips */
  StopOnTrips = 'STOP_ON_TRIPS',
  /** Alerts affecting the trips that go through this stop */
  Trips = 'TRIPS'
}

export type StopGeometries = {
  __typename?: 'StopGeometries';
  /** Representation of the stop geometries as GeoJSON (https://geojson.org/) */
  geoJson?: Maybe<Scalars['GeoJson']['output']>;
  /**
   * Representation of a stop as a series of polylines.
   *
   * Polygons of flex stops are represented as linear rings (lines where the first and last point are the same).
   *
   * Proper stops are represented as single point "lines".
   */
  googleEncoded?: Maybe<Array<Maybe<Geometry>>>;
};

/** Stop that should (but not guaranteed) to exist on a route. */
export type StopOnRoute = {
  __typename?: 'StopOnRoute';
  /** Route which contains the stop. */
  route: Route;
  /** Stop at the route. It's also possible that the stop is no longer on the route. */
  stop: Stop;
};

/** Stop that should (but not guaranteed) to exist on a trip. */
export type StopOnTrip = {
  __typename?: 'StopOnTrip';
  /** Stop at the trip. It's also possible that the stop is no longer on the trip. */
  stop: Stop;
  /** Trip which contains the stop. */
  trip: Trip;
};

export type StopPosition = PositionAtStop | PositionBetweenStops;

/** Upcoming or current stop and how close the vehicle is to it. */
export type StopRelationship = {
  __typename?: 'StopRelationship';
  /** How close the vehicle is to `stop` */
  status: VehicleStopStatus;
  stop: Stop;
};

/** Stoptime represents the time when a specific trip arrives to or departs from a specific stop. */
export type Stoptime = {
  __typename?: 'Stoptime';
  /**
   * The offset from the scheduled arrival time in seconds. Negative values
   * indicate that the trip is running ahead of schedule.
   */
  arrivalDelay?: Maybe<Scalars['Int']['output']>;
  /**
   * The offset from the scheduled departure time in seconds. Negative values
   * indicate that the trip is running ahead of schedule
   */
  departureDelay?: Maybe<Scalars['Int']['output']>;
  /**
   * Whether the vehicle can be disembarked at this stop. This field can also be
   * used to indicate if disembarkation is possible only with special arrangements.
   */
  dropoffType?: Maybe<PickupDropoffType>;
  /**
   * Vehicle headsign of the trip on this stop. Trip headsigns can change during
   * the trip (e.g. on routes which run on loops), so this value should be used
   * instead of `tripHeadsign` to display the headsign relevant to the user.
   */
  headsign?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the vehicle can be boarded at this stop. This field can also be used
   * to indicate if boarding is possible only with special arrangements.
   */
  pickupType?: Maybe<PickupDropoffType>;
  /** true, if this stoptime has real-time data available */
  realtime?: Maybe<Scalars['Boolean']['output']>;
  /** Real-time prediction of arrival time. Format: seconds since midnight of the departure date */
  realtimeArrival?: Maybe<Scalars['Int']['output']>;
  /** Real-time prediction of departure time. Format: seconds since midnight of the departure date */
  realtimeDeparture?: Maybe<Scalars['Int']['output']>;
  /** State of real-time data */
  realtimeState?: Maybe<RealtimeState>;
  /** Scheduled arrival time. Format: seconds since midnight of the departure date */
  scheduledArrival?: Maybe<Scalars['Int']['output']>;
  /** Scheduled departure time. Format: seconds since midnight of the departure date */
  scheduledDeparture?: Maybe<Scalars['Int']['output']>;
  /** Departure date of the trip. Format: Unix timestamp (local time) in seconds. */
  serviceDay?: Maybe<Scalars['Long']['output']>;
  /** The stop where this arrival/departure happens */
  stop?: Maybe<Stop>;
  /**
   * The sequence of the stop in the pattern. This is not required to start from 0 or be consecutive - any
   * increasing integer sequence along the stops is valid.
   *
   * The purpose of this field is to identify the stop within the pattern so it can be cross-referenced
   * between it and the itinerary. It is safe to cross-reference when done quickly, i.e. within seconds.
   * However, it should be noted that real-time updates can change the values, so don't store it for
   * longer amounts of time.
   *
   * Depending on the source data, this might not be the GTFS `stop_sequence` but another value, perhaps
   * even generated.
   */
  stopPosition?: Maybe<Scalars['Int']['output']>;
  /** true, if this stop is used as a time equalization stop. false otherwise. */
  timepoint?: Maybe<Scalars['Boolean']['output']>;
  /** Trip which this stoptime is for */
  trip?: Maybe<Trip>;
};


/** Stoptime represents the time when a specific trip arrives to or departs from a specific stop. */
export type StoptimeHeadsignArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

/** Stoptimes grouped by pattern */
export type StoptimesInPattern = {
  __typename?: 'StoptimesInPattern';
  pattern?: Maybe<Pattern>;
  stoptimes?: Maybe<Array<Maybe<Stoptime>>>;
};

/**
 * A system notice is used to tag elements with system information for debugging
 * or other system related purpose. One use-case is to run a routing search with
 * 'debugItineraryFilter: true'. This will then tag itineraries instead of removing
 * them from the result. This make it possible to inspect the itinerary-filter-chain.
 * A SystemNotice only has english text,
 * because the primary user are technical staff, like testers and developers.
 */
export type SystemNotice = {
  __typename?: 'SystemNotice';
  /** Notice's tag */
  tag?: Maybe<Scalars['String']['output']>;
  /** Notice's description */
  text?: Maybe<Scalars['String']['output']>;
};

/** Describes ticket type */
export type TicketType = Node & {
  __typename?: 'TicketType';
  /** ISO 4217 currency code */
  currency?: Maybe<Scalars['String']['output']>;
  /**
   * Ticket type ID in format `FeedId:TicketTypeId`. Ticket type IDs are usually
   * combination of ticket zones where the ticket is valid.
   */
  fareId: Scalars['String']['output'];
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Price of the ticket in currency that is specified in `currency` field */
  price?: Maybe<Scalars['Float']['output']>;
  /**
   * List of zones where this ticket is valid.
   * Corresponds to field `zoneId` in **Stop** type.
   */
  zones?: Maybe<Array<Scalars['String']['output']>>;
};

export type TimetablePreferencesInput = {
  /**
   * When false, real-time updates are considered during the routing.
   * In practice, when this option is set as true, some of the suggestions might not be
   * realistic as the transfers could be invalid due to delays,
   * trips can be cancelled or stops can be skipped.
   */
  excludeRealTimeUpdates?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * When true, departures that have been cancelled ahead of time will be
   * included during the routing. This means that an itinerary can include
   * a cancelled departure while some other alternative that contains no cancellations
   * could be filtered out as the alternative containing a cancellation would normally
   * be better.
   */
  includePlannedCancellations?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * When true, departures that have been cancelled through a real-time feed will be
   * included during the routing. This means that an itinerary can include
   * a cancelled departure while some other alternative that contains no cancellations
   * could be filtered out as the alternative containing a cancellation would normally
   * be better. This option can't be set to true while `includeRealTimeUpdates` is false.
   */
  includeRealTimeCancellations?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Preferences related to transfers between transit vehicles (typically between stops). */
export type TransferPreferencesInput = {
  /** A static cost that is added for each transfer on top of other costs. */
  cost?: InputMaybe<Scalars['Cost']['input']>;
  /**
   * How many additional transfers there can be at maximum compared to the itinerary with the
   * least number of transfers.
   */
  maximumAdditionalTransfers?: InputMaybe<Scalars['Int']['input']>;
  /** How many transfers there can be at maximum in an itinerary. */
  maximumTransfers?: InputMaybe<Scalars['Int']['input']>;
  /**
   * A global minimum transfer time (in seconds) that specifies the minimum amount of time
   * that must pass between exiting one transit vehicle and boarding another. This time is
   * in addition to time it might take to walk between transit stops. Setting this value
   * as `PT0S`, for example, can lead to passenger missing a connection when the vehicle leaves
   * ahead of time or the passenger arrives to the stop later than expected.
   */
  slack?: InputMaybe<Scalars['Duration']['input']>;
};

/**
 * Transit modes include modes that are used within organized transportation networks
 * run by public transportation authorities, taxi companies etc.
 * Equivalent to GTFS route_type or to NeTEx TransportMode.
 */
export enum TransitMode {
  Airplane = 'AIRPLANE',
  Bus = 'BUS',
  CableCar = 'CABLE_CAR',
  /** Private car trips shared with others. */
  Carpool = 'CARPOOL',
  Coach = 'COACH',
  Ferry = 'FERRY',
  Funicular = 'FUNICULAR',
  Gondola = 'GONDOLA',
  /** Railway in which the track consists of a single rail or a beam. */
  Monorail = 'MONORAIL',
  /** This includes long or short distance trains. */
  Rail = 'RAIL',
  /** Subway or metro, depending on the local terminology. */
  Subway = 'SUBWAY',
  /** A taxi, possibly operated by a public transport agency. */
  Taxi = 'TAXI',
  Tram = 'TRAM',
  /** Electric buses that draw power from overhead wires using poles. */
  Trolleybus = 'TROLLEYBUS'
}

/** Costs related to using a transit mode. */
export type TransitModePreferenceCostInput = {
  /** A cost multiplier of transit leg travel time. */
  reluctance: Scalars['Reluctance']['input'];
};

/** Transit routing preferences used for transit legs. */
export type TransitPreferencesInput = {
  /** Preferences related to alighting from a transit vehicle. */
  alight?: InputMaybe<AlightPreferencesInput>;
  /**
   * Preferences related to boarding a transit vehicle. Note, board costs for each street mode
   * can be found under the street mode preferences.
   */
  board?: InputMaybe<BoardPreferencesInput>;
  /** Preferences related to cancellations and real-time. */
  timetable?: InputMaybe<TimetablePreferencesInput>;
  /** Preferences related to transfers between transit vehicles (typically between stops). */
  transfer?: InputMaybe<TransferPreferencesInput>;
};

/** Text with language */
export type TranslatedString = {
  __typename?: 'TranslatedString';
  /** Two-letter language code (ISO 639-1) */
  language?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Transportation mode which can be used in the itinerary */
export type TransportMode = {
  mode: Mode;
  /** Optional additional qualifier for transport mode, e.g. `RENT` */
  qualifier?: InputMaybe<Qualifier>;
};

/**
 * Relative importance of optimization factors. Only effective for bicycling legs.
 * Invariant: `safety + flatness + time == 1`
 */
export type TriangleCyclingFactorsInput = {
  /** Relative importance of flat terrain */
  flatness: Scalars['Ratio']['input'];
  /**
   * Relative importance of cycling safety, but this factor can also include other
   * concerns such as convenience and general cyclist preferences by taking into account
   * road surface etc.
   */
  safety: Scalars['Ratio']['input'];
  /** Relative importance of duration */
  time: Scalars['Ratio']['input'];
};

/**
 * Relative importance of optimization factors. Only effective for scooter legs.
 * Invariant: `safety + flatness + time == 1`
 */
export type TriangleScooterFactorsInput = {
  /** Relative importance of flat terrain */
  flatness: Scalars['Ratio']['input'];
  /**
   * Relative importance of scooter safety, but this factor can also include other
   * concerns such as convenience and general scooter preferences by taking into account
   * road surface etc.
   */
  safety: Scalars['Ratio']['input'];
  /** Relative importance of duration */
  time: Scalars['Ratio']['input'];
};

/** Trip is a specific occurance of a pattern, usually identified by route, direction on the route and exact departure time. */
export type Trip = Node & {
  __typename?: 'Trip';
  /** List of dates when this trip is in service. Format: YYYYMMDD */
  activeDates?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * By default, list of alerts which have directly an effect on just the trip.
   * It's also possible to return other relevant alerts through defining types.
   */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /** Arrival time to the final stop */
  arrivalStoptime?: Maybe<Stoptime>;
  /** Whether bikes are allowed on board the vehicle running this trip */
  bikesAllowed?: Maybe<BikesAllowed>;
  blockId?: Maybe<Scalars['String']['output']>;
  /** Departure time from the first stop */
  departureStoptime?: Maybe<Stoptime>;
  /**
   * Direction code of the trip, i.e. is this the outbound or inbound trip of a
   * pattern. Possible values: 0, 1 or `null` if the direction is irrelevant, i.e.
   * the pattern has trips only in one direction.
   */
  directionId?: Maybe<Scalars['String']['output']>;
  /** List of coordinates of this trip's route */
  geometry?: Maybe<Array<Maybe<Array<Maybe<Scalars['Float']['output']>>>>>;
  /** ID of the trip in format `FeedId:TripId` */
  gtfsId: Scalars['String']['output'];
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /**
   * The latest real-time occupancy information for the latest occurance of this
   * trip.
   */
  occupancy?: Maybe<TripOccupancy>;
  /** The pattern the trip is running on */
  pattern?: Maybe<Pattern>;
  /** The route the trip is running on */
  route: Route;
  /** Short name of the route this trip is running. See field `shortName` of Route. */
  routeShortName?: Maybe<Scalars['String']['output']>;
  /** Hash code of the trip. This value is stable and not dependent on the trip id. */
  semanticHash: Scalars['String']['output'];
  serviceId?: Maybe<Scalars['String']['output']>;
  shapeId?: Maybe<Scalars['String']['output']>;
  /** List of stops this trip passes through */
  stops: Array<Stop>;
  /** List of times when this trip arrives to or departs from a stop */
  stoptimes?: Maybe<Array<Maybe<Stoptime>>>;
  stoptimesForDate?: Maybe<Array<Maybe<Stoptime>>>;
  /** Coordinates of the route of this trip in Google polyline encoded format */
  tripGeometry?: Maybe<Geometry>;
  /** Headsign of the vehicle when running on this trip */
  tripHeadsign?: Maybe<Scalars['String']['output']>;
  tripShortName?: Maybe<Scalars['String']['output']>;
  /** Whether the vehicle running this trip can be boarded by a wheelchair */
  wheelchairAccessible?: Maybe<WheelchairBoarding>;
};


/** Trip is a specific occurance of a pattern, usually identified by route, direction on the route and exact departure time. */
export type TripAlertsArgs = {
  types?: InputMaybe<Array<InputMaybe<TripAlertType>>>;
};


/** Trip is a specific occurance of a pattern, usually identified by route, direction on the route and exact departure time. */
export type TripArrivalStoptimeArgs = {
  serviceDate?: InputMaybe<Scalars['String']['input']>;
};


/** Trip is a specific occurance of a pattern, usually identified by route, direction on the route and exact departure time. */
export type TripDepartureStoptimeArgs = {
  serviceDate?: InputMaybe<Scalars['String']['input']>;
};


/** Trip is a specific occurance of a pattern, usually identified by route, direction on the route and exact departure time. */
export type TripStoptimesForDateArgs = {
  serviceDate?: InputMaybe<Scalars['String']['input']>;
};


/** Trip is a specific occurance of a pattern, usually identified by route, direction on the route and exact departure time. */
export type TripTripHeadsignArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

/** Entities, which are relevant for a trip and can contain alerts */
export enum TripAlertType {
  /** Alerts affecting the trip's agency */
  Agency = 'AGENCY',
  /** Alerts affecting the trip's pattern */
  Pattern = 'PATTERN',
  /** Alerts affecting the trip's route */
  Route = 'ROUTE',
  /** Alerts affecting the route type of the trip's route */
  RouteType = 'ROUTE_TYPE',
  /**
   * Alerts affecting the stops visited on the trip.
   * Some of the alerts can only affect the trip or its route on the stop.
   */
  StopsOnTrip = 'STOPS_ON_TRIP',
  /** Alerts affecting the trip */
  Trip = 'TRIP'
}

/**
 * Occupancy of a vehicle on a trip. This should include the most recent occupancy information
 * available for a trip. Historic data might not be available.
 */
export type TripOccupancy = {
  __typename?: 'TripOccupancy';
  /** Occupancy information mapped to a limited set of descriptive states. */
  occupancyStatus?: Maybe<OccupancyStatus>;
};

/** This is used for alert entities that we don't explicitly handle or they are missing. */
export type Unknown = {
  __typename?: 'Unknown';
  /** Entity's description */
  description?: Maybe<Scalars['String']['output']>;
};

/** Vehicle parking represents a location where bicycles or cars can be parked. */
export type VehicleParking = Node & PlaceInterface & {
  __typename?: 'VehicleParking';
  /**
   * Does this vehicle parking have spaces (capacity) for either wheelchair accessible (disabled)
   * or normal cars.
   */
  anyCarPlaces?: Maybe<Scalars['Boolean']['output']>;
  /** The currently available spaces at this vehicle parking. */
  availability?: Maybe<VehicleParkingSpaces>;
  /** Does this vehicle parking have spaces (capacity) for bicycles. */
  bicyclePlaces?: Maybe<Scalars['Boolean']['output']>;
  /** The capacity (maximum available spaces) of this vehicle parking. */
  capacity?: Maybe<VehicleParkingSpaces>;
  /**
   * Does this vehicle parking have spaces (capacity) for cars excluding wheelchair accessible spaces.
   * Use anyCarPlaces to check if any type of car may use this vehicle parking.
   */
  carPlaces?: Maybe<Scalars['Boolean']['output']>;
  /** URL which contains details of this vehicle parking. */
  detailsUrl?: Maybe<Scalars['String']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** URL of an image which may be displayed to the user showing the vehicle parking. */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** Latitude of the bike park (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the bike park (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Name of the park */
  name: Scalars['String']['output'];
  /** A short translatable note containing details of this vehicle parking. */
  note?: Maybe<Scalars['String']['output']>;
  /** Opening hours of the parking facility */
  openingHours?: Maybe<OpeningHours>;
  /** If true, value of `spacesAvailable` is updated from a real-time source. */
  realtime?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The state of this vehicle parking.
   * Only ones in an OPERATIONAL state may be used for Park and Ride.
   */
  state?: Maybe<VehicleParkingState>;
  /**
   * Source specific tags of the vehicle parking, which describe the available features. For example
   * park_and_ride, bike_lockers, or static_osm_data.
   */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** ID of the park */
  vehicleParkingId?: Maybe<Scalars['String']['output']>;
  /** Does this vehicle parking have wheelchair accessible (disabled) car spaces (capacity). */
  wheelchairAccessibleCarPlaces?: Maybe<Scalars['Boolean']['output']>;
};


/** Vehicle parking represents a location where bicycles or cars can be parked. */
export type VehicleParkingNameArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


/** Vehicle parking represents a location where bicycles or cars can be parked. */
export type VehicleParkingNoteArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

/** Preferences for parking facilities used during the routing. */
export type VehicleParkingInput = {
  /**
   * Selection filters to include or exclude parking facilities.
   * An empty list will include all facilities in the routing search.
   */
  filters?: InputMaybe<Array<InputMaybe<ParkingFilter>>>;
  /**
   * If non-empty every parking facility that doesn't match this set of conditions will
   * receive an extra cost (defined by `unpreferredCost`) and therefore avoided.
   */
  preferred?: InputMaybe<Array<InputMaybe<ParkingFilter>>>;
  /**
   * If `preferred` is non-empty, using a parking facility that doesn't contain
   * at least one of the preferred conditions, will receive this extra cost and therefore avoided if
   * preferred options are available.
   */
  unpreferredCost?: InputMaybe<Scalars['Int']['input']>;
};

/** The number of spaces by type. null if unknown. */
export type VehicleParkingSpaces = {
  __typename?: 'VehicleParkingSpaces';
  /** The number of bicycle spaces. */
  bicycleSpaces?: Maybe<Scalars['Int']['output']>;
  /** The number of car spaces. */
  carSpaces?: Maybe<Scalars['Int']['output']>;
  /** The number of wheelchair accessible (disabled) car spaces. */
  wheelchairAccessibleCarSpaces?: Maybe<Scalars['Int']['output']>;
};

/**
 * The state of the vehicle parking. TEMPORARILY_CLOSED and CLOSED are distinct states so that they
 * may be represented differently to the user.
 */
export enum VehicleParkingState {
  /** Can't be used for park and ride. */
  Closed = 'CLOSED',
  /** May be used for park and ride. */
  Operational = 'OPERATIONAL',
  /** Can't be used for park and ride. */
  TemporarilyClosed = 'TEMPORARILY_CLOSED'
}

/** Real-time vehicle position */
export type VehiclePosition = {
  __typename?: 'VehiclePosition';
  /**
   * Bearing, in degrees, clockwise from North, i.e., 0 is North and 90 is East. This can be the
   * compass bearing, or the direction towards the next stop or intermediate location.
   */
  heading?: Maybe<Scalars['Float']['output']>;
  /** Human-readable label of the vehicle, eg. a publicly visible number or a license plate */
  label?: Maybe<Scalars['String']['output']>;
  /** When the position of the vehicle was recorded in seconds since the UNIX epoch. */
  lastUpdated?: Maybe<Scalars['Long']['output']>;
  /** Latitude of the vehicle */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the vehicle */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Speed of the vehicle in meters/second */
  speed?: Maybe<Scalars['Float']['output']>;
  /** The current stop where the vehicle will be or is currently arriving. */
  stopRelationship?: Maybe<StopRelationship>;
  /** Which trip this vehicles runs on. */
  trip: Trip;
  /** Feed-scoped ID that uniquely identifies the vehicle in the format FeedId:VehicleId */
  vehicleId?: Maybe<Scalars['String']['output']>;
};

/**
 * Vehicle rental network, which is referred as system in the GBFS terminology. Note, the same operator can operate in multiple
 * regions either with the same network/system or with a different one. This can contain information about either the rental brand
 * or about the operator.
 */
export type VehicleRentalNetwork = {
  __typename?: 'VehicleRentalNetwork';
  /**
   * ID of the vehicle rental network. In GBFS, this is the `system_id` field from the system information, but it can
   * be overridden in the configuration to have a different value so this field doesn't necessarily match the source data.
   */
  networkId: Scalars['String']['output'];
  /** The rental vehicle operator's network/system URL. In GBFS, this is the `url` field from the system information. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Vehicle rental station represents a location where users can rent bicycles etc. for a fee. */
export type VehicleRentalStation = Node & PlaceInterface & {
  __typename?: 'VehicleRentalStation';
  /**
   * If true, vehicles can be returned to this station if the station has spaces available
   * or allows overloading.
   */
  allowDropoff?: Maybe<Scalars['Boolean']['output']>;
  /** If true, vehicles can be currently returned to this station. */
  allowDropoffNow?: Maybe<Scalars['Boolean']['output']>;
  /** If true, vehicles can be returned even if spacesAvailable is zero or vehicles > capacity. */
  allowOverloading?: Maybe<Scalars['Boolean']['output']>;
  /** If true, vehicles can be picked up from this station if the station has vehicles available. */
  allowPickup?: Maybe<Scalars['Boolean']['output']>;
  /** If true, vehicles can be currently picked up from this station. */
  allowPickupNow?: Maybe<Scalars['Boolean']['output']>;
  /** Number of free spaces currently available on the rental station, grouped by vehicle type. */
  availableSpaces?: Maybe<RentalVehicleEntityCounts>;
  /** Number of vehicles currently available on the rental station, grouped by vehicle type. */
  availableVehicles?: Maybe<RentalVehicleEntityCounts>;
  /** Nominal capacity (number of racks) of the rental station. */
  capacity?: Maybe<Scalars['Int']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  /** Latitude of the vehicle rental station (WGS 84) */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the vehicle rental station (WGS 84) */
  lon?: Maybe<Scalars['Float']['output']>;
  /** Name of the vehicle rental station */
  name: Scalars['String']['output'];
  /**
   * ID of the rental network.
   * @deprecated Use `networkId` from `rentalNetwork` instead.
   */
  network?: Maybe<Scalars['String']['output']>;
  /** If true, station is on and in service. */
  operative?: Maybe<Scalars['Boolean']['output']>;
  /**
   * If true, values of `vehiclesAvailable` and `spacesAvailable` are updated from a
   * real-time source. If false, values of `vehiclesAvailable` and `spacesAvailable`
   * are always the total capacity divided by two.
   */
  realtime?: Maybe<Scalars['Boolean']['output']>;
  /** The vehicle rental network information. This is referred as system in the GBFS terminology. */
  rentalNetwork: VehicleRentalNetwork;
  /** Platform-specific URLs to begin renting a vehicle from this station. */
  rentalUris?: Maybe<VehicleRentalUris>;
  /**
   * Number of free spaces currently available on the rental station.
   * Note that this value being 0 does not necessarily indicate that vehicles cannot be returned
   * to this station, as for example it might be possible to leave the vehicle in the vicinity of
   * the rental station, even if the vehicle racks don't have any spaces available.
   * See field `allowDropoffNow` to know if is currently possible to return a vehicle.
   * @deprecated Use `availableSpaces` instead, which also contains the space vehicle types
   */
  spacesAvailable?: Maybe<Scalars['Int']['output']>;
  /** ID of the vehicle in the format of network:id */
  stationId?: Maybe<Scalars['String']['output']>;
  /**
   * Number of vehicles currently available on the rental station.
   * See field `allowPickupNow` to know if is currently possible to pick up a vehicle.
   * @deprecated Use `availableVehicles` instead, which also contains vehicle types
   */
  vehiclesAvailable?: Maybe<Scalars['Int']['output']>;
};

export type VehicleRentalUris = {
  __typename?: 'VehicleRentalUris';
  /**
   * A URI that can be passed to an Android app with an {@code android.intent.action.VIEW} Android
   * intent to support Android Deep Links.
   * May be null if a rental URI does not exist.
   */
  android?: Maybe<Scalars['String']['output']>;
  /**
   * A URI that can be used on iOS to launch the rental app for this rental network.
   * May be {@code null} if a rental URI does not exist.
   */
  ios?: Maybe<Scalars['String']['output']>;
  /**
   * A URL that can be used by a web browser to show more information about renting a vehicle.
   * May be {@code null} if a rental URL does not exist.
   */
  web?: Maybe<Scalars['String']['output']>;
};

/** How close the vehicle is to the stop. */
export enum VehicleStopStatus {
  /** The vehicle is just about to arrive at the stop (on a stop display, the vehicle symbol typically flashes). */
  IncomingAt = 'INCOMING_AT',
  /** The vehicle has departed the previous stop and is in transit. */
  InTransitTo = 'IN_TRANSIT_TO',
  /** The vehicle is standing at the stop. */
  StoppedAt = 'STOPPED_AT'
}

export enum VertexType {
  /** BIKEPARK */
  Bikepark = 'BIKEPARK',
  /** BIKESHARE */
  Bikeshare = 'BIKESHARE',
  /** NORMAL */
  Normal = 'NORMAL',
  /** PARKANDRIDE */
  Parkandride = 'PARKANDRIDE',
  /** TRANSIT */
  Transit = 'TRANSIT'
}

/** Preferences related to walking (excluding walking a bicycle or a scooter). */
export type WalkPreferencesInput = {
  /** The cost of boarding a vehicle while walking. */
  boardCost?: InputMaybe<Scalars['Cost']['input']>;
  /** A multiplier for how bad walking is compared to being in transit for equal lengths of time. */
  reluctance?: InputMaybe<Scalars['Reluctance']['input']>;
  /**
   * Factor for how much the walk safety is considered in routing. Value should be between 0 and 1.
   * If the value is set to be 0, safety is ignored.
   */
  safetyFactor?: InputMaybe<Scalars['Ratio']['input']>;
  /**
   * Maximum walk speed on flat ground. Note, this speed is higher than the average speed
   * will be in itineraries as this is the maximum speed but there are
   * factors that slow down walking such as crossings, intersections and elevation changes.
   */
  speed?: InputMaybe<Scalars['Speed']['input']>;
};

export enum WheelchairBoarding {
  /** Wheelchair boarding is not possible at this stop. */
  NotPossible = 'NOT_POSSIBLE',
  /** There is no accessibility information for the stop. */
  NoInformation = 'NO_INFORMATION',
  /** At least some vehicles at this stop can be boarded by a rider in a wheelchair. */
  Possible = 'POSSIBLE'
}

/**
 * Wheelchair related preferences. Note, this is the only from of accessibilty available
 * currently and is sometimes is used for other accessibility needs as well.
 */
export type WheelchairPreferencesInput = {
  /**
   * Is wheelchair accessibility considered in routing. Note, this does not guarantee
   * that the itineraries are wheelchair accessible as there can be data issues.
   */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DebugOutput = {
  __typename?: 'debugOutput';
  pathCalculationTime?: Maybe<Scalars['Long']['output']>;
  precalculationTime?: Maybe<Scalars['Long']['output']>;
  renderingTime?: Maybe<Scalars['Long']['output']>;
  timedOut?: Maybe<Scalars['Boolean']['output']>;
  totalTime?: Maybe<Scalars['Long']['output']>;
};

export type ElevationProfileComponent = {
  __typename?: 'elevationProfileComponent';
  /** The distance from the start of the step, in meters. */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The elevation at this distance, in meters. */
  elevation?: Maybe<Scalars['Float']['output']>;
};

/**
 * This type is only here for backwards-compatibility and this API will never return it anymore.
 * Please use the leg's `fareProducts` instead.
 */
export type Fare = {
  __typename?: 'fare';
  /**
   * Fare price in cents. **Note:** this value is dependent on the currency used,
   * as one cent is not necessarily ¹/₁₀₀ of the basic monerary unit.
   * @deprecated No longer supported
   */
  cents?: Maybe<Scalars['Int']['output']>;
  /**
   * Components which this fare is composed of
   * @deprecated No longer supported
   */
  components?: Maybe<Array<Maybe<FareComponent>>>;
  /**
   * ISO 4217 currency code
   * @deprecated No longer supported
   */
  currency?: Maybe<Scalars['String']['output']>;
  /** @deprecated No longer supported */
  type?: Maybe<Scalars['String']['output']>;
};

/**
 * This type is only here for backwards-compatibility and this API will never return it anymore.
 * Please use the leg's `fareProducts` instead.
 */
export type FareComponent = {
  __typename?: 'fareComponent';
  /**
   * Fare price in cents. **Note:** this value is dependent on the currency used,
   * as one cent is not necessarily ¹/₁₀₀ of the basic monerary unit.
   * @deprecated No longer supported
   */
  cents?: Maybe<Scalars['Int']['output']>;
  /**
   * ISO 4217 currency code
   * @deprecated No longer supported
   */
  currency?: Maybe<Scalars['String']['output']>;
  /**
   * ID of the ticket type. Corresponds to `fareId` in **TicketType**.
   * @deprecated No longer supported
   */
  fareId?: Maybe<Scalars['String']['output']>;
  /**
   * List of routes which use this fare component
   * @deprecated No longer supported
   */
  routes?: Maybe<Array<Maybe<Route>>>;
};

export type PlaceAtDistance = Node & {
  __typename?: 'placeAtDistance';
  /** Walking distance to the place along streets and paths */
  distance?: Maybe<Scalars['Int']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  place?: Maybe<PlaceInterface>;
};

/** A connection to a list of items. */
export type PlaceAtDistanceConnection = {
  __typename?: 'placeAtDistanceConnection';
  edges?: Maybe<Array<Maybe<PlaceAtDistanceEdge>>>;
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PlaceAtDistanceEdge = {
  __typename?: 'placeAtDistanceEdge';
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<PlaceAtDistance>;
};

/** Time range for which the API has data available */
export type ServiceTimeRange = {
  __typename?: 'serviceTimeRange';
  /** Time until which the API has data available. Format: Unix timestamp in seconds */
  end?: Maybe<Scalars['Long']['output']>;
  /** Time from which the API has data available. Format: Unix timestamp in seconds */
  start?: Maybe<Scalars['Long']['output']>;
};

export type Step = {
  __typename?: 'step';
  /** The cardinal (compass) direction (e.g. north, northeast) taken when engaging this step. */
  absoluteDirection?: Maybe<AbsoluteDirection>;
  /** A list of alerts (e.g. construction, detours) applicable to the step. */
  alerts?: Maybe<Array<Maybe<Alert>>>;
  /**
   * This step is on an open area, such as a plaza or train platform,
   * and thus the directions should say something like "cross".
   */
  area?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The name of this street was generated by the system, so we should only display it once, and
   * generally just display right/left directions
   */
  bogusName?: Maybe<Scalars['Boolean']['output']>;
  /** The distance in meters that this step takes. */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The elevation profile as a list of { distance, elevation } values. */
  elevationProfile?: Maybe<Array<Maybe<ElevationProfileComponent>>>;
  /** When exiting a highway or traffic circle, the exit name/number. */
  exit?: Maybe<Scalars['String']['output']>;
  /** The latitude of the start of the step. */
  lat?: Maybe<Scalars['Float']['output']>;
  /** The longitude of the start of the step. */
  lon?: Maybe<Scalars['Float']['output']>;
  /** The relative direction (e.g. left or right turn) to take when engaging this step. */
  relativeDirection?: Maybe<RelativeDirection>;
  /** Indicates whether or not a street changes direction at an intersection. */
  stayOn?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the street, road, or path taken for this step. */
  streetName?: Maybe<Scalars['String']['output']>;
  /** Is this step walking with a bike? */
  walkingBike?: Maybe<Scalars['Boolean']['output']>;
};

export type StopAtDistance = Node & {
  __typename?: 'stopAtDistance';
  /** Walking distance to the stop along streets and paths */
  distance?: Maybe<Scalars['Int']['output']>;
  /** Global object ID provided by Relay. This value can be used to refetch this object using **node** query. */
  id: Scalars['ID']['output'];
  stop?: Maybe<Stop>;
};

/** A connection to a list of items. */
export type StopAtDistanceConnection = {
  __typename?: 'stopAtDistanceConnection';
  edges?: Maybe<Array<Maybe<StopAtDistanceEdge>>>;
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type StopAtDistanceEdge = {
  __typename?: 'stopAtDistanceEdge';
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<StopAtDistance>;
};
