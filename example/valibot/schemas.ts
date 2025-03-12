import * as v from 'valibot'
import { AbsoluteDirection, AccessibilityPreferencesInput, Agency, AgencyAlertsArgs, AgencyAlertType, Alert, AlertCauseType, AlertEffectType, AlertSeverityLevelType, AlightPreferencesInput, BicycleParkingPreferencesInput, BicyclePreferencesInput, BicycleRentalPreferencesInput, BicycleWalkPreferencesCostInput, BicycleWalkPreferencesInput, BikePark, BikeParkNameArgs, BikeRentalStation, BikeRentalStationUris, BikesAllowed, BoardPreferencesInput, BookingInfo, BookingTime, CarPark, CarParkNameArgs, CarParkingPreferencesInput, CarPreferencesInput, CarRentalPreferencesInput, Cluster, ContactInfo, Coordinate, Coordinates, Currency, CyclingOptimizationInput, CyclingOptimizationType, DefaultFareProduct, DepartureRow, DepartureRowStoptimesArgs, DestinationBicyclePolicyInput, DestinationScooterPolicyInput, Emissions, FareMedium, FareProduct, FareProductUse, Feed, FeedAlertsArgs, FeedAlertType, FeedPublisher, FilterPlaceType, FormFactor, Geometry, InputBanned, InputCoordinates, InputField, InputFilters, InputModeWeight, InputPreferred, InputTriangle, InputUnpreferred, Itinerary, ItineraryFilterDebugProfile, Leg, LegNextLegsArgs, LegTime, LocalDateRangeInput, LocalTimeSpan, LocalTimeSpanDate, LocationType, Mode, Money, Node, OccupancyStatus, OpeningHours, OpeningHoursDatesArgs, OptimizeType, PageInfo, ParkingFilter, ParkingFilterOperation, Pattern, PatternAlertsArgs, PatternTripsForDateArgs, PatternAlertType, PickupDropoffType, Place, PlaceInterface, Plan, PlanAccessMode, PlanConnection, PlanCoordinateInput, PlanDateTimeInput, PlanDirectMode, PlanEdge, PlanEgressMode, PlanItineraryFilterInput, PlanLabeledLocationInput, PlanLocationInput, PlanModesInput, PlanPageInfo, PlanPreferencesInput, PlanStopLocationInput, PlanStreetPreferencesInput, PlanTransferMode, PlanTransitModePreferenceInput, PlanTransitModesInput, PositionAtStop, PositionBetweenStops, PropulsionType, Qualifier, QueryType, QueryTypeAgencyArgs, QueryTypeAlertsArgs, QueryTypeBikeParkArgs, QueryTypeBikeRentalStationArgs, QueryTypeBikeRentalStationsArgs, QueryTypeCancelledTripTimesArgs, QueryTypeCarParkArgs, QueryTypeCarParksArgs, QueryTypeClusterArgs, QueryTypeDepartureRowArgs, QueryTypeFuzzyTripArgs, QueryTypeNearestArgs, QueryTypeNodeArgs, QueryTypePatternArgs, QueryTypePlanArgs, QueryTypePlanConnectionArgs, QueryTypeRentalVehicleArgs, QueryTypeRentalVehiclesArgs, QueryTypeRouteArgs, QueryTypeRoutesArgs, QueryTypeStationArgs, QueryTypeStationsArgs, QueryTypeStopArgs, QueryTypeStopsArgs, QueryTypeStopsByBboxArgs, QueryTypeStopsByRadiusArgs, QueryTypeTripArgs, QueryTypeTripsArgs, QueryTypeVehicleParkingArgs, QueryTypeVehicleParkingsArgs, QueryTypeVehicleRentalStationArgs, QueryTypeVehicleRentalStationsArgs, RealTimeEstimate, RealtimeState, RelativeDirection, RentalVehicle, RentalVehicleEntityCounts, RentalVehicleType, RentalVehicleTypeCount, RideHailingEstimate, RideHailingProvider, RiderCategory, Route, RouteAlertsArgs, RouteLongNameArgs, RoutePatternsArgs, RouteAlertType, RouteType, RoutingError, RoutingErrorCode, ScooterOptimizationInput, ScooterOptimizationType, ScooterPreferencesInput, ScooterRentalPreferencesInput, Stop, StopAlertsArgs, StopDescArgs, StopNameArgs, StopStopTimesForPatternArgs, StopStoptimesForPatternsArgs, StopStoptimesForServiceDateArgs, StopStoptimesWithoutPatternsArgs, StopTransfersArgs, StopUrlArgs, StopAlertType, StopGeometries, StopOnRoute, StopOnTrip, StopRelationship, Stoptime, StoptimeHeadsignArgs, StoptimesInPattern, SystemNotice, TicketType, TimetablePreferencesInput, TransferPreferencesInput, TransitMode, TransitModePreferenceCostInput, TransitPreferencesInput, TranslatedString, TransportMode, TriangleCyclingFactorsInput, TriangleScooterFactorsInput, Trip, TripAlertsArgs, TripArrivalStoptimeArgs, TripDepartureStoptimeArgs, TripStoptimesForDateArgs, TripTripHeadsignArgs, TripAlertType, TripOccupancy, Unknown, VehicleParking, VehicleParkingNameArgs, VehicleParkingNoteArgs, VehicleParkingInput, VehicleParkingSpaces, VehicleParkingState, VehiclePosition, VehicleRentalNetwork, VehicleRentalStation, VehicleRentalUris, VehicleStopStatus, VertexType, WalkPreferencesInput, WheelchairBoarding, WheelchairPreferencesInput, DebugOutput, ElevationProfileComponent, Fare, FareComponent, PlaceAtDistance, PlaceAtDistanceConnection, PlaceAtDistanceEdge, ServiceTimeRange, Step, StopAtDistance, StopAtDistanceConnection, StopAtDistanceEdge } from '../types'

export const AbsoluteDirectionSchema = v.enum_(AbsoluteDirection);

export const AgencyAlertTypeSchema = v.enum_(AgencyAlertType);

export const AlertCauseTypeSchema = v.enum_(AlertCauseType);

export const AlertEffectTypeSchema = v.enum_(AlertEffectType);

export const AlertSeverityLevelTypeSchema = v.enum_(AlertSeverityLevelType);

export const BikesAllowedSchema = v.enum_(BikesAllowed);

export const CyclingOptimizationTypeSchema = v.enum_(CyclingOptimizationType);

export const FeedAlertTypeSchema = v.enum_(FeedAlertType);

export const FilterPlaceTypeSchema = v.enum_(FilterPlaceType);

export const FormFactorSchema = v.enum_(FormFactor);

export const InputFieldSchema = v.enum_(InputField);

export const ItineraryFilterDebugProfileSchema = v.enum_(ItineraryFilterDebugProfile);

export const LocationTypeSchema = v.enum_(LocationType);

export const ModeSchema = v.enum_(Mode);

export const OccupancyStatusSchema = v.enum_(OccupancyStatus);

export const OptimizeTypeSchema = v.enum_(OptimizeType);

export const PatternAlertTypeSchema = v.enum_(PatternAlertType);

export const PickupDropoffTypeSchema = v.enum_(PickupDropoffType);

export const PlanAccessModeSchema = v.enum_(PlanAccessMode);

export const PlanDirectModeSchema = v.enum_(PlanDirectMode);

export const PlanEgressModeSchema = v.enum_(PlanEgressMode);

export const PlanTransferModeSchema = v.enum_(PlanTransferMode);

export const PropulsionTypeSchema = v.enum_(PropulsionType);

export const QualifierSchema = v.enum_(Qualifier);

export const RealtimeStateSchema = v.enum_(RealtimeState);

export const RelativeDirectionSchema = v.enum_(RelativeDirection);

export const RouteAlertTypeSchema = v.enum_(RouteAlertType);

export const RoutingErrorCodeSchema = v.enum_(RoutingErrorCode);

export const ScooterOptimizationTypeSchema = v.enum_(ScooterOptimizationType);

export const StopAlertTypeSchema = v.enum_(StopAlertType);

export const TransitModeSchema = v.enum_(TransitMode);

export const TripAlertTypeSchema = v.enum_(TripAlertType);

export const VehicleParkingStateSchema = v.enum_(VehicleParkingState);

export const VehicleStopStatusSchema = v.enum_(VehicleStopStatus);

export const VertexTypeSchema = v.enum_(VertexType);

export const WheelchairBoardingSchema = v.enum_(WheelchairBoarding);

export function AccessibilityPreferencesInputSchema(): v.GenericSchema<AccessibilityPreferencesInput> {
  return v.object({
    wheelchair: v.lazy(() => v.nullish(WheelchairPreferencesInputSchema()))
  })
}

export function AgencySchema(): v.GenericSchema<Agency> {
  return v.object({
    __typename: v.optional(v.literal('Agency')),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    fareUrl: v.nullish(v.string()),
    gtfsId: v.string(),
    id: v.string(),
    lang: v.nullish(v.string()),
    name: v.string(),
    phone: v.nullish(v.string()),
    routes: v.nullish(v.array(v.nullable(RouteSchema()))),
    timezone: v.string(),
    url: v.string()
  })
}

export function AgencyAlertsArgsSchema(): v.GenericSchema<AgencyAlertsArgs> {
  return v.object({
    types: v.nullish(v.array(v.nullable(AgencyAlertTypeSchema)))
  })
}

export function AlertSchema(): v.GenericSchema<Alert> {
  return v.object({
    __typename: v.optional(v.literal('Alert')),
    agency: v.nullish(AgencySchema()),
    alertCause: v.nullish(AlertCauseTypeSchema),
    alertDescriptionText: v.string(),
    alertDescriptionTextTranslations: v.array(TranslatedStringSchema()),
    alertEffect: v.nullish(AlertEffectTypeSchema),
    alertHash: v.nullish(v.number()),
    alertHeaderText: v.nullish(v.string()),
    alertHeaderTextTranslations: v.array(TranslatedStringSchema()),
    alertSeverityLevel: v.nullish(AlertSeverityLevelTypeSchema),
    alertUrl: v.nullish(v.string()),
    alertUrlTranslations: v.array(TranslatedStringSchema()),
    effectiveEndDate: v.nullish(v.number()),
    effectiveStartDate: v.nullish(v.number()),
    entities: v.nullish(v.array(v.nullable(AlertEntitySchema()))),
    feed: v.nullish(v.string()),
    id: v.string(),
    patterns: v.nullish(v.array(v.nullable(PatternSchema()))),
    route: v.nullish(RouteSchema()),
    stop: v.nullish(StopSchema()),
    trip: v.nullish(TripSchema())
  })
}

export function AlertEntitySchema() {
  return v.union([AgencySchema(), PatternSchema(), RouteSchema(), RouteTypeSchema(), StopSchema(), StopOnRouteSchema(), StopOnTripSchema(), TripSchema(), UnknownSchema()])
}

export function AlightPreferencesInputSchema(): v.GenericSchema<AlightPreferencesInput> {
  return v.object({
    slack: v.nullish(v.string())
  })
}

export function BicycleParkingPreferencesInputSchema(): v.GenericSchema<BicycleParkingPreferencesInput> {
  return v.object({
    filters: v.nullish(v.array(ParkingFilterSchema())),
    preferred: v.nullish(v.array(ParkingFilterSchema())),
    unpreferredCost: v.nullish(v.number())
  })
}

export function BicyclePreferencesInputSchema(): v.GenericSchema<BicyclePreferencesInput> {
  return v.object({
    boardCost: v.nullish(v.number()),
    optimization: v.lazy(() => v.nullish(CyclingOptimizationInputSchema())),
    parking: v.lazy(() => v.nullish(BicycleParkingPreferencesInputSchema())),
    reluctance: v.nullish(v.number()),
    rental: v.lazy(() => v.nullish(BicycleRentalPreferencesInputSchema())),
    speed: v.nullish(v.number()),
    walk: v.lazy(() => v.nullish(BicycleWalkPreferencesInputSchema()))
  })
}

export function BicycleRentalPreferencesInputSchema(): v.GenericSchema<BicycleRentalPreferencesInput> {
  return v.object({
    allowedNetworks: v.nullish(v.array(v.string())),
    bannedNetworks: v.nullish(v.array(v.string())),
    destinationBicyclePolicy: v.lazy(() => v.nullish(DestinationBicyclePolicyInputSchema()))
  })
}

export function BicycleWalkPreferencesCostInputSchema(): v.GenericSchema<BicycleWalkPreferencesCostInput> {
  return v.object({
    mountDismountCost: v.nullish(v.number()),
    reluctance: v.nullish(v.number())
  })
}

export function BicycleWalkPreferencesInputSchema(): v.GenericSchema<BicycleWalkPreferencesInput> {
  return v.object({
    cost: v.lazy(() => v.nullish(BicycleWalkPreferencesCostInputSchema())),
    mountDismountTime: v.nullish(v.string()),
    speed: v.nullish(v.number())
  })
}

export function BikeParkSchema(): v.GenericSchema<BikePark> {
  return v.object({
    __typename: v.optional(v.literal('BikePark')),
    bikeParkId: v.nullish(v.string()),
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    name: v.string(),
    openingHours: v.nullish(OpeningHoursSchema()),
    realtime: v.nullish(v.boolean()),
    spacesAvailable: v.nullish(v.number()),
    tags: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function BikeParkNameArgsSchema(): v.GenericSchema<BikeParkNameArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function BikeRentalStationSchema(): v.GenericSchema<BikeRentalStation> {
  return v.object({
    __typename: v.optional(v.literal('BikeRentalStation')),
    allowDropoff: v.nullish(v.boolean()),
    allowDropoffNow: v.nullish(v.boolean()),
    allowOverloading: v.nullish(v.boolean()),
    allowPickup: v.nullish(v.boolean()),
    allowPickupNow: v.nullish(v.boolean()),
    bikesAvailable: v.nullish(v.number()),
    capacity: v.nullish(v.number()),
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    name: v.string(),
    networks: v.nullish(v.array(v.nullable(v.string()))),
    operative: v.nullish(v.boolean()),
    realtime: v.nullish(v.boolean()),
    rentalUris: v.nullish(BikeRentalStationUrisSchema()),
    spacesAvailable: v.nullish(v.number()),
    state: v.nullish(v.string()),
    stationId: v.nullish(v.string())
  })
}

export function BikeRentalStationUrisSchema(): v.GenericSchema<BikeRentalStationUris> {
  return v.object({
    __typename: v.optional(v.literal('BikeRentalStationUris')),
    android: v.nullish(v.string()),
    ios: v.nullish(v.string()),
    web: v.nullish(v.string())
  })
}

export function BoardPreferencesInputSchema(): v.GenericSchema<BoardPreferencesInput> {
  return v.object({
    slack: v.nullish(v.string()),
    waitReluctance: v.nullish(v.number())
  })
}

export function BookingInfoSchema(): v.GenericSchema<BookingInfo> {
  return v.object({
    __typename: v.optional(v.literal('BookingInfo')),
    contactInfo: v.nullish(ContactInfoSchema()),
    dropOffMessage: v.nullish(v.string()),
    earliestBookingTime: v.nullish(BookingTimeSchema()),
    latestBookingTime: v.nullish(BookingTimeSchema()),
    maximumBookingNoticeSeconds: v.nullish(v.number()),
    message: v.nullish(v.string()),
    minimumBookingNoticeSeconds: v.nullish(v.number()),
    pickupMessage: v.nullish(v.string())
  })
}

export function BookingTimeSchema(): v.GenericSchema<BookingTime> {
  return v.object({
    __typename: v.optional(v.literal('BookingTime')),
    daysPrior: v.nullish(v.number()),
    time: v.nullish(v.string())
  })
}

export function CarParkSchema(): v.GenericSchema<CarPark> {
  return v.object({
    __typename: v.optional(v.literal('CarPark')),
    carParkId: v.nullish(v.string()),
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    maxCapacity: v.nullish(v.number()),
    name: v.string(),
    openingHours: v.nullish(OpeningHoursSchema()),
    realtime: v.nullish(v.boolean()),
    spacesAvailable: v.nullish(v.number()),
    tags: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function CarParkNameArgsSchema(): v.GenericSchema<CarParkNameArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function CarParkingPreferencesInputSchema(): v.GenericSchema<CarParkingPreferencesInput> {
  return v.object({
    filters: v.nullish(v.array(ParkingFilterSchema())),
    preferred: v.nullish(v.array(ParkingFilterSchema())),
    unpreferredCost: v.nullish(v.number())
  })
}

export function CarPreferencesInputSchema(): v.GenericSchema<CarPreferencesInput> {
  return v.object({
    parking: v.lazy(() => v.nullish(CarParkingPreferencesInputSchema())),
    reluctance: v.nullish(v.number()),
    rental: v.lazy(() => v.nullish(CarRentalPreferencesInputSchema()))
  })
}

export function CarRentalPreferencesInputSchema(): v.GenericSchema<CarRentalPreferencesInput> {
  return v.object({
    allowedNetworks: v.nullish(v.array(v.string())),
    bannedNetworks: v.nullish(v.array(v.string()))
  })
}

export function ClusterSchema(): v.GenericSchema<Cluster> {
  return v.object({
    __typename: v.optional(v.literal('Cluster')),
    gtfsId: v.string(),
    id: v.string(),
    lat: v.number(),
    lon: v.number(),
    name: v.string(),
    stops: v.nullish(v.array(StopSchema()))
  })
}

export function ContactInfoSchema(): v.GenericSchema<ContactInfo> {
  return v.object({
    __typename: v.optional(v.literal('ContactInfo')),
    additionalDetails: v.nullish(v.string()),
    bookingUrl: v.nullish(v.string()),
    contactPerson: v.nullish(v.string()),
    eMail: v.nullish(v.string()),
    faxNumber: v.nullish(v.string()),
    infoUrl: v.nullish(v.string()),
    phoneNumber: v.nullish(v.string())
  })
}

export function CoordinateSchema(): v.GenericSchema<Coordinate> {
  return v.object({
    __typename: v.optional(v.literal('Coordinate')),
    latitude: v.number(),
    longitude: v.number()
  })
}

export function CoordinatesSchema(): v.GenericSchema<Coordinates> {
  return v.object({
    __typename: v.optional(v.literal('Coordinates')),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number())
  })
}

export function CurrencySchema(): v.GenericSchema<Currency> {
  return v.object({
    __typename: v.optional(v.literal('Currency')),
    code: v.string(),
    digits: v.number()
  })
}

export function CyclingOptimizationInputSchema(): v.GenericSchema<CyclingOptimizationInput> {
  return v.object({
    triangle: v.lazy(() => v.nullish(TriangleCyclingFactorsInputSchema())),
    type: v.nullish(CyclingOptimizationTypeSchema)
  })
}

export function DefaultFareProductSchema(): v.GenericSchema<DefaultFareProduct> {
  return v.object({
    __typename: v.optional(v.literal('DefaultFareProduct')),
    id: v.string(),
    medium: v.nullish(FareMediumSchema()),
    name: v.string(),
    price: MoneySchema(),
    riderCategory: v.nullish(RiderCategorySchema())
  })
}

export function DepartureRowSchema(): v.GenericSchema<DepartureRow> {
  return v.object({
    __typename: v.optional(v.literal('DepartureRow')),
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    pattern: v.nullish(PatternSchema()),
    stop: v.nullish(StopSchema()),
    stoptimes: v.nullish(v.array(v.nullable(StoptimeSchema())))
  })
}

export function DepartureRowStoptimesArgsSchema(): v.GenericSchema<DepartureRowStoptimesArgs> {
  return v.object({
    numberOfDepartures: v.nullish(v.number()),
    omitCanceled: v.nullish(v.boolean()),
    omitNonPickups: v.nullish(v.boolean()),
    startTime: v.nullish(v.number()),
    timeRange: v.nullish(v.number())
  })
}

export function DestinationBicyclePolicyInputSchema(): v.GenericSchema<DestinationBicyclePolicyInput> {
  return v.object({
    allowKeeping: v.nullish(v.boolean()),
    keepingCost: v.nullish(v.number())
  })
}

export function DestinationScooterPolicyInputSchema(): v.GenericSchema<DestinationScooterPolicyInput> {
  return v.object({
    allowKeeping: v.nullish(v.boolean()),
    keepingCost: v.nullish(v.number())
  })
}

export function EmissionsSchema(): v.GenericSchema<Emissions> {
  return v.object({
    __typename: v.optional(v.literal('Emissions')),
    co2: v.nullish(v.number())
  })
}

export function FareMediumSchema(): v.GenericSchema<FareMedium> {
  return v.object({
    __typename: v.optional(v.literal('FareMedium')),
    id: v.string(),
    name: v.nullish(v.string())
  })
}

export function FareProductSchema(): v.GenericSchema<FareProduct> {
  return v.object({
    id: v.string(),
    medium: v.nullish(FareMediumSchema()),
    name: v.string(),
    riderCategory: v.nullish(RiderCategorySchema())
  })
}

export function FareProductUseSchema(): v.GenericSchema<FareProductUse> {
  return v.object({
    __typename: v.optional(v.literal('FareProductUse')),
    id: v.string(),
    product: v.nullish(FareProductSchema())
  })
}

export function FeedSchema(): v.GenericSchema<Feed> {
  return v.object({
    __typename: v.optional(v.literal('Feed')),
    agencies: v.nullish(v.array(v.nullable(AgencySchema()))),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    feedId: v.string(),
    publisher: v.nullish(FeedPublisherSchema())
  })
}

export function FeedAlertsArgsSchema(): v.GenericSchema<FeedAlertsArgs> {
  return v.object({
    types: v.nullish(v.array(FeedAlertTypeSchema))
  })
}

export function FeedPublisherSchema(): v.GenericSchema<FeedPublisher> {
  return v.object({
    __typename: v.optional(v.literal('FeedPublisher')),
    name: v.string(),
    url: v.string()
  })
}

export function GeometrySchema(): v.GenericSchema<Geometry> {
  return v.object({
    __typename: v.optional(v.literal('Geometry')),
    length: v.nullish(v.number()),
    points: v.nullish(v.string())
  })
}

export function InputBannedSchema(): v.GenericSchema<InputBanned> {
  return v.object({
    agencies: v.nullish(v.string()),
    routes: v.nullish(v.string()),
    stops: v.nullish(v.string()),
    stopsHard: v.nullish(v.string()),
    trips: v.nullish(v.string())
  })
}

export function InputCoordinatesSchema(): v.GenericSchema<InputCoordinates> {
  return v.object({
    address: v.nullish(v.string()),
    lat: v.number(),
    locationSlack: v.nullish(v.number()),
    lon: v.number()
  })
}

export function InputFiltersSchema(): v.GenericSchema<InputFilters> {
  return v.object({
    bikeParks: v.nullish(v.array(v.nullable(v.string()))),
    bikeRentalStations: v.nullish(v.array(v.nullable(v.string()))),
    carParks: v.nullish(v.array(v.nullable(v.string()))),
    routes: v.nullish(v.array(v.nullable(v.string()))),
    stations: v.nullish(v.array(v.nullable(v.string()))),
    stops: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function InputModeWeightSchema(): v.GenericSchema<InputModeWeight> {
  return v.object({
    AIRPLANE: v.nullish(v.number()),
    BUS: v.nullish(v.number()),
    CABLE_CAR: v.nullish(v.number()),
    FERRY: v.nullish(v.number()),
    FUNICULAR: v.nullish(v.number()),
    GONDOLA: v.nullish(v.number()),
    RAIL: v.nullish(v.number()),
    SUBWAY: v.nullish(v.number()),
    TRAM: v.nullish(v.number())
  })
}

export function InputPreferredSchema(): v.GenericSchema<InputPreferred> {
  return v.object({
    agencies: v.nullish(v.string()),
    otherThanPreferredRoutesPenalty: v.nullish(v.number()),
    routes: v.nullish(v.string())
  })
}

export function InputTriangleSchema(): v.GenericSchema<InputTriangle> {
  return v.object({
    safetyFactor: v.nullish(v.number()),
    slopeFactor: v.nullish(v.number()),
    timeFactor: v.nullish(v.number())
  })
}

export function InputUnpreferredSchema(): v.GenericSchema<InputUnpreferred> {
  return v.object({
    agencies: v.nullish(v.string()),
    routes: v.nullish(v.string()),
    unpreferredCost: v.nullish(v.string()),
    useUnpreferredRoutesPenalty: v.nullish(v.number())
  })
}

export function ItinerarySchema(): v.GenericSchema<Itinerary> {
  return v.object({
    __typename: v.optional(v.literal('Itinerary')),
    accessibilityScore: v.nullish(v.number()),
    arrivedAtDestinationWithRentedBicycle: v.nullish(v.boolean()),
    duration: v.nullish(v.number()),
    elevationGained: v.nullish(v.number()),
    elevationLost: v.nullish(v.number()),
    emissionsPerPerson: v.nullish(EmissionsSchema()),
    end: v.nullish(v.string()),
    endTime: v.nullish(v.number()),
    fares: v.nullish(v.array(v.nullable(FareSchema()))),
    generalizedCost: v.nullish(v.number()),
    legs: v.array(v.nullable(LegSchema())),
    numberOfTransfers: v.number(),
    start: v.nullish(v.string()),
    startTime: v.nullish(v.number()),
    systemNotices: v.array(v.nullable(SystemNoticeSchema())),
    waitingTime: v.nullish(v.number()),
    walkDistance: v.nullish(v.number()),
    walkTime: v.nullish(v.number())
  })
}

export function LegSchema(): v.GenericSchema<Leg> {
  return v.object({
    __typename: v.optional(v.literal('Leg')),
    accessibilityScore: v.nullish(v.number()),
    agency: v.nullish(AgencySchema()),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    arrivalDelay: v.nullish(v.number()),
    departureDelay: v.nullish(v.number()),
    distance: v.nullish(v.number()),
    dropOffBookingInfo: v.nullish(BookingInfoSchema()),
    dropoffType: v.nullish(PickupDropoffTypeSchema),
    duration: v.nullish(v.number()),
    end: LegTimeSchema(),
    endTime: v.nullish(v.number()),
    fareProducts: v.nullish(v.array(v.nullable(FareProductUseSchema()))),
    from: PlaceSchema(),
    generalizedCost: v.nullish(v.number()),
    headsign: v.nullish(v.string()),
    interlineWithPreviousLeg: v.nullish(v.boolean()),
    intermediatePlace: v.nullish(v.boolean()),
    intermediatePlaces: v.nullish(v.array(v.nullable(PlaceSchema()))),
    intermediateStops: v.nullish(v.array(v.nullable(StopSchema()))),
    legGeometry: v.nullish(GeometrySchema()),
    mode: v.nullish(ModeSchema),
    nextLegs: v.nullish(v.array(LegSchema())),
    pickupBookingInfo: v.nullish(BookingInfoSchema()),
    pickupType: v.nullish(PickupDropoffTypeSchema),
    realTime: v.nullish(v.boolean()),
    realtimeState: v.nullish(RealtimeStateSchema),
    rentedBike: v.nullish(v.boolean()),
    rideHailingEstimate: v.nullish(RideHailingEstimateSchema()),
    route: v.nullish(RouteSchema()),
    serviceDate: v.nullish(v.string()),
    start: LegTimeSchema(),
    startTime: v.nullish(v.number()),
    steps: v.nullish(v.array(v.nullable(StepSchema()))),
    to: PlaceSchema(),
    transitLeg: v.nullish(v.boolean()),
    trip: v.nullish(TripSchema()),
    walkingBike: v.nullish(v.boolean())
  })
}

export function LegNextLegsArgsSchema(): v.GenericSchema<LegNextLegsArgs> {
  return v.object({
    destinationModesWithParentStation: v.nullish(v.array(TransitModeSchema)),
    numberOfLegs: v.number(),
    originModesWithParentStation: v.nullish(v.array(TransitModeSchema))
  })
}

export function LegTimeSchema(): v.GenericSchema<LegTime> {
  return v.object({
    __typename: v.optional(v.literal('LegTime')),
    estimated: v.nullish(RealTimeEstimateSchema()),
    scheduledTime: v.string()
  })
}

export function LocalDateRangeInputSchema(): v.GenericSchema<LocalDateRangeInput> {
  return v.object({
    end: v.nullish(v.string()),
    start: v.nullish(v.string())
  })
}

export function LocalTimeSpanSchema(): v.GenericSchema<LocalTimeSpan> {
  return v.object({
    __typename: v.optional(v.literal('LocalTimeSpan')),
    from: v.number(),
    to: v.number()
  })
}

export function LocalTimeSpanDateSchema(): v.GenericSchema<LocalTimeSpanDate> {
  return v.object({
    __typename: v.optional(v.literal('LocalTimeSpanDate')),
    date: v.string(),
    timeSpans: v.nullish(v.array(v.nullable(LocalTimeSpanSchema())))
  })
}

export function MoneySchema(): v.GenericSchema<Money> {
  return v.object({
    __typename: v.optional(v.literal('Money')),
    amount: v.number(),
    currency: CurrencySchema()
  })
}

export function NodeSchema(): v.GenericSchema<Node> {
  return v.object({
    id: v.string()
  })
}

export function OpeningHoursSchema(): v.GenericSchema<OpeningHours> {
  return v.object({
    __typename: v.optional(v.literal('OpeningHours')),
    dates: v.nullish(v.array(v.nullable(LocalTimeSpanDateSchema()))),
    osm: v.nullish(v.string())
  })
}

export function OpeningHoursDatesArgsSchema(): v.GenericSchema<OpeningHoursDatesArgs> {
  return v.object({
    dates: v.array(v.string())
  })
}

export function PageInfoSchema(): v.GenericSchema<PageInfo> {
  return v.object({
    __typename: v.optional(v.literal('PageInfo')),
    endCursor: v.nullish(v.string()),
    hasNextPage: v.boolean(),
    hasPreviousPage: v.boolean(),
    startCursor: v.nullish(v.string())
  })
}

export function ParkingFilterSchema(): v.GenericSchema<ParkingFilter> {
  return v.object({
    not: v.nullish(v.array(ParkingFilterOperationSchema())),
    select: v.nullish(v.array(ParkingFilterOperationSchema()))
  })
}

export function ParkingFilterOperationSchema(): v.GenericSchema<ParkingFilterOperation> {
  return v.object({
    tags: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function PatternSchema(): v.GenericSchema<Pattern> {
  return v.object({
    __typename: v.optional(v.literal('Pattern')),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    code: v.string(),
    directionId: v.nullish(v.number()),
    geometry: v.nullish(v.array(v.nullable(CoordinatesSchema()))),
    headsign: v.nullish(v.string()),
    id: v.string(),
    name: v.nullish(v.string()),
    originalTripPattern: v.nullish(PatternSchema()),
    patternGeometry: v.nullish(GeometrySchema()),
    route: RouteSchema(),
    semanticHash: v.nullish(v.string()),
    stops: v.nullish(v.array(StopSchema())),
    trips: v.nullish(v.array(TripSchema())),
    tripsForDate: v.nullish(v.array(TripSchema())),
    vehiclePositions: v.nullish(v.array(VehiclePositionSchema()))
  })
}

export function PatternAlertsArgsSchema(): v.GenericSchema<PatternAlertsArgs> {
  return v.object({
    types: v.nullish(v.array(v.nullable(PatternAlertTypeSchema)))
  })
}

export function PatternTripsForDateArgsSchema(): v.GenericSchema<PatternTripsForDateArgs> {
  return v.object({
    serviceDate: v.nullish(v.string())
  })
}

export function PlaceSchema(): v.GenericSchema<Place> {
  return v.object({
    __typename: v.optional(v.literal('Place')),
    arrival: v.nullish(LegTimeSchema()),
    arrivalTime: v.number(),
    bikePark: v.nullish(BikeParkSchema()),
    bikeRentalStation: v.nullish(BikeRentalStationSchema()),
    carPark: v.nullish(CarParkSchema()),
    departure: v.nullish(LegTimeSchema()),
    departureTime: v.number(),
    lat: v.number(),
    lon: v.number(),
    name: v.nullish(v.string()),
    rentalVehicle: v.nullish(RentalVehicleSchema()),
    stop: v.nullish(StopSchema()),
    stopPosition: v.nullish(StopPositionSchema()),
    vehicleParking: v.nullish(VehicleParkingSchema()),
    vehicleRentalStation: v.nullish(VehicleRentalStationSchema()),
    vertexType: v.nullish(VertexTypeSchema)
  })
}

export function PlaceInterfaceSchema(): v.GenericSchema<PlaceInterface> {
  return v.object({
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number())
  })
}

export function PlanSchema(): v.GenericSchema<Plan> {
  return v.object({
    __typename: v.optional(v.literal('Plan')),
    date: v.nullish(v.number()),
    debugOutput: DebugOutputSchema(),
    from: PlaceSchema(),
    itineraries: v.array(v.nullable(ItinerarySchema())),
    messageEnums: v.array(v.nullable(v.string())),
    messageStrings: v.array(v.nullable(v.string())),
    nextDateTime: v.nullish(v.number()),
    nextPageCursor: v.nullish(v.string()),
    prevDateTime: v.nullish(v.number()),
    previousPageCursor: v.nullish(v.string()),
    routingErrors: v.array(RoutingErrorSchema()),
    searchWindowUsed: v.nullish(v.number()),
    to: PlaceSchema()
  })
}

export function PlanConnectionSchema(): v.GenericSchema<PlanConnection> {
  return v.object({
    __typename: v.optional(v.literal('PlanConnection')),
    edges: v.nullish(v.array(v.nullable(PlanEdgeSchema()))),
    pageInfo: PlanPageInfoSchema(),
    routingErrors: v.array(RoutingErrorSchema()),
    searchDateTime: v.nullish(v.string())
  })
}

export function PlanCoordinateInputSchema(): v.GenericSchema<PlanCoordinateInput> {
  return v.object({
    latitude: v.number(),
    longitude: v.number()
  })
}

export function PlanDateTimeInputSchema(): v.GenericSchema<PlanDateTimeInput> {
  return v.object({
    earliestDeparture: v.nullish(v.string()),
    latestArrival: v.nullish(v.string())
  })
}

export function PlanEdgeSchema(): v.GenericSchema<PlanEdge> {
  return v.object({
    __typename: v.optional(v.literal('PlanEdge')),
    cursor: v.string(),
    node: ItinerarySchema()
  })
}

export function PlanItineraryFilterInputSchema(): v.GenericSchema<PlanItineraryFilterInput> {
  return v.object({
    groupSimilarityKeepOne: v.nullish(v.number()),
    groupSimilarityKeepThree: v.nullish(v.number()),
    groupedOtherThanSameLegsMaxCostMultiplier: v.nullish(v.number()),
    itineraryFilterDebugProfile: v.nullish(ItineraryFilterDebugProfileSchema)
  })
}

export function PlanLabeledLocationInputSchema(): v.GenericSchema<PlanLabeledLocationInput> {
  return v.object({
    label: v.nullish(v.string()),
    location: v.lazy(() => PlanLocationInputSchema())
  })
}

export function PlanLocationInputSchema(): v.GenericSchema<PlanLocationInput> {
  return v.object({
    coordinate: v.lazy(() => v.nullish(PlanCoordinateInputSchema())),
    stopLocation: v.lazy(() => v.nullish(PlanStopLocationInputSchema()))
  })
}

export function PlanModesInputSchema(): v.GenericSchema<PlanModesInput> {
  return v.object({
    direct: v.nullish(v.array(PlanDirectModeSchema)),
    directOnly: v.nullish(v.boolean()),
    transit: v.lazy(() => v.nullish(PlanTransitModesInputSchema())),
    transitOnly: v.nullish(v.boolean())
  })
}

export function PlanPageInfoSchema(): v.GenericSchema<PlanPageInfo> {
  return v.object({
    __typename: v.optional(v.literal('PlanPageInfo')),
    endCursor: v.nullish(v.string()),
    hasNextPage: v.boolean(),
    hasPreviousPage: v.boolean(),
    searchWindowUsed: v.nullish(v.string()),
    startCursor: v.nullish(v.string())
  })
}

export function PlanPreferencesInputSchema(): v.GenericSchema<PlanPreferencesInput> {
  return v.object({
    accessibility: v.lazy(() => v.nullish(AccessibilityPreferencesInputSchema())),
    street: v.lazy(() => v.nullish(PlanStreetPreferencesInputSchema())),
    transit: v.lazy(() => v.nullish(TransitPreferencesInputSchema()))
  })
}

export function PlanStopLocationInputSchema(): v.GenericSchema<PlanStopLocationInput> {
  return v.object({
    stopLocationId: v.string()
  })
}

export function PlanStreetPreferencesInputSchema(): v.GenericSchema<PlanStreetPreferencesInput> {
  return v.object({
    bicycle: v.lazy(() => v.nullish(BicyclePreferencesInputSchema())),
    car: v.lazy(() => v.nullish(CarPreferencesInputSchema())),
    scooter: v.lazy(() => v.nullish(ScooterPreferencesInputSchema())),
    walk: v.lazy(() => v.nullish(WalkPreferencesInputSchema()))
  })
}

export function PlanTransitModePreferenceInputSchema(): v.GenericSchema<PlanTransitModePreferenceInput> {
  return v.object({
    cost: v.lazy(() => v.nullish(TransitModePreferenceCostInputSchema())),
    mode: TransitModeSchema
  })
}

export function PlanTransitModesInputSchema(): v.GenericSchema<PlanTransitModesInput> {
  return v.object({
    access: v.nullish(v.array(PlanAccessModeSchema)),
    egress: v.nullish(v.array(PlanEgressModeSchema)),
    transfer: v.nullish(v.array(PlanTransferModeSchema)),
    transit: v.nullish(v.array(v.lazy(() => PlanTransitModePreferenceInputSchema())))
  })
}

export function PositionAtStopSchema(): v.GenericSchema<PositionAtStop> {
  return v.object({
    __typename: v.optional(v.literal('PositionAtStop')),
    position: v.nullish(v.number())
  })
}

export function PositionBetweenStopsSchema(): v.GenericSchema<PositionBetweenStops> {
  return v.object({
    __typename: v.optional(v.literal('PositionBetweenStops')),
    nextPosition: v.nullish(v.number()),
    previousPosition: v.nullish(v.number())
  })
}

export function QueryTypeSchema(): v.GenericSchema<QueryType> {
  return v.object({
    __typename: v.optional(v.literal('QueryType')),
    agencies: v.nullish(v.array(v.nullable(AgencySchema()))),
    agency: v.nullish(AgencySchema()),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    bikePark: v.nullish(BikeParkSchema()),
    bikeParks: v.nullish(v.array(v.nullable(BikeParkSchema()))),
    bikeRentalStation: v.nullish(BikeRentalStationSchema()),
    bikeRentalStations: v.nullish(v.array(v.nullable(BikeRentalStationSchema()))),
    cancelledTripTimes: v.nullish(v.array(v.nullable(StoptimeSchema()))),
    carPark: v.nullish(CarParkSchema()),
    carParks: v.nullish(v.array(v.nullable(CarParkSchema()))),
    cluster: v.nullish(ClusterSchema()),
    clusters: v.nullish(v.array(v.nullable(ClusterSchema()))),
    departureRow: v.nullish(DepartureRowSchema()),
    feeds: v.nullish(v.array(v.nullable(FeedSchema()))),
    fuzzyTrip: v.nullish(TripSchema()),
    nearest: v.nullish(PlaceAtDistanceConnectionSchema()),
    node: v.nullish(NodeSchema()),
    pattern: v.nullish(PatternSchema()),
    patterns: v.nullish(v.array(v.nullable(PatternSchema()))),
    plan: v.nullish(PlanSchema()),
    planConnection: v.nullish(PlanConnectionSchema()),
    rentalVehicle: v.nullish(RentalVehicleSchema()),
    rentalVehicles: v.nullish(v.array(v.nullable(RentalVehicleSchema()))),
    route: v.nullish(RouteSchema()),
    routes: v.nullish(v.array(v.nullable(RouteSchema()))),
    serviceTimeRange: v.nullish(ServiceTimeRangeSchema()),
    station: v.nullish(StopSchema()),
    stations: v.nullish(v.array(v.nullable(StopSchema()))),
    stop: v.nullish(StopSchema()),
    stops: v.nullish(v.array(v.nullable(StopSchema()))),
    stopsByBbox: v.nullish(v.array(v.nullable(StopSchema()))),
    stopsByRadius: v.nullish(StopAtDistanceConnectionSchema()),
    ticketTypes: v.nullish(v.array(v.nullable(TicketTypeSchema()))),
    trip: v.nullish(TripSchema()),
    trips: v.nullish(v.array(v.nullable(TripSchema()))),
    vehicleParking: v.nullish(VehicleParkingSchema()),
    vehicleParkings: v.nullish(v.array(v.nullable(VehicleParkingSchema()))),
    vehicleRentalStation: v.nullish(VehicleRentalStationSchema()),
    vehicleRentalStations: v.nullish(v.array(v.nullable(VehicleRentalStationSchema()))),
    viewer: v.nullish(QueryTypeSchema())
  })
}

export function QueryTypeAgencyArgsSchema(): v.GenericSchema<QueryTypeAgencyArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeAlertsArgsSchema(): v.GenericSchema<QueryTypeAlertsArgs> {
  return v.object({
    cause: v.nullish(v.array(AlertCauseTypeSchema)),
    effect: v.nullish(v.array(AlertEffectTypeSchema)),
    feeds: v.nullish(v.array(v.string())),
    route: v.nullish(v.array(v.string())),
    severityLevel: v.nullish(v.array(AlertSeverityLevelTypeSchema)),
    stop: v.nullish(v.array(v.string()))
  })
}

export function QueryTypeBikeParkArgsSchema(): v.GenericSchema<QueryTypeBikeParkArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeBikeRentalStationArgsSchema(): v.GenericSchema<QueryTypeBikeRentalStationArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeBikeRentalStationsArgsSchema(): v.GenericSchema<QueryTypeBikeRentalStationsArgs> {
  return v.object({
    ids: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function QueryTypeCancelledTripTimesArgsSchema(): v.GenericSchema<QueryTypeCancelledTripTimesArgs> {
  return v.object({
    feeds: v.nullish(v.array(v.nullable(v.string()))),
    maxArrivalTime: v.nullish(v.number()),
    maxDate: v.nullish(v.string()),
    maxDepartureTime: v.nullish(v.number()),
    minArrivalTime: v.nullish(v.number()),
    minDate: v.nullish(v.string()),
    minDepartureTime: v.nullish(v.number()),
    patterns: v.nullish(v.array(v.nullable(v.string()))),
    routes: v.nullish(v.array(v.nullable(v.string()))),
    trips: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function QueryTypeCarParkArgsSchema(): v.GenericSchema<QueryTypeCarParkArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeCarParksArgsSchema(): v.GenericSchema<QueryTypeCarParksArgs> {
  return v.object({
    ids: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function QueryTypeClusterArgsSchema(): v.GenericSchema<QueryTypeClusterArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeDepartureRowArgsSchema(): v.GenericSchema<QueryTypeDepartureRowArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeFuzzyTripArgsSchema(): v.GenericSchema<QueryTypeFuzzyTripArgs> {
  return v.object({
    date: v.string(),
    direction: v.nullish(v.number()),
    route: v.string(),
    time: v.number()
  })
}

export function QueryTypeNearestArgsSchema(): v.GenericSchema<QueryTypeNearestArgs> {
  return v.object({
    after: v.nullish(v.string()),
    before: v.nullish(v.string()),
    filterByIds: v.lazy(() => v.nullish(InputFiltersSchema())),
    filterByModes: v.nullish(v.array(v.nullable(ModeSchema))),
    filterByNetwork: v.nullish(v.array(v.string())),
    filterByPlaceTypes: v.nullish(v.array(v.nullable(FilterPlaceTypeSchema))),
    first: v.nullish(v.number()),
    last: v.nullish(v.number()),
    lat: v.number(),
    lon: v.number(),
    maxDistance: v.nullish(v.number()),
    maxResults: v.nullish(v.number())
  })
}

export function QueryTypeNodeArgsSchema(): v.GenericSchema<QueryTypeNodeArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypePatternArgsSchema(): v.GenericSchema<QueryTypePatternArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypePlanArgsSchema(): v.GenericSchema<QueryTypePlanArgs> {
  return v.object({
    alightSlack: v.nullish(v.number()),
    allowBikeRental: v.nullish(v.boolean()),
    allowKeepingRentedBicycleAtDestination: v.nullish(v.boolean()),
    allowedBikeRentalNetworks: v.nullish(v.array(v.nullable(v.string()))),
    allowedTicketTypes: v.nullish(v.array(v.nullable(v.string()))),
    allowedVehicleRentalNetworks: v.nullish(v.array(v.nullable(v.string()))),
    arriveBy: v.nullish(v.boolean()),
    banned: v.lazy(() => v.nullish(InputBannedSchema())),
    bannedVehicleRentalNetworks: v.nullish(v.array(v.nullable(v.string()))),
    batch: v.nullish(v.boolean()),
    bikeBoardCost: v.nullish(v.number()),
    bikeReluctance: v.nullish(v.number()),
    bikeSpeed: v.nullish(v.number()),
    bikeSwitchCost: v.nullish(v.number()),
    bikeSwitchTime: v.nullish(v.number()),
    bikeWalkingReluctance: v.nullish(v.number()),
    boardSlack: v.nullish(v.number()),
    carParkCarLegWeight: v.nullish(v.number()),
    carReluctance: v.nullish(v.number()),
    claimInitialWait: v.nullish(v.number()),
    compactLegsByReversedSearch: v.nullish(v.boolean()),
    date: v.nullish(v.string()),
    debugItineraryFilter: v.nullish(v.boolean()),
    disableRemainingWeightHeuristic: v.nullish(v.boolean()),
    from: v.lazy(() => v.nullish(InputCoordinatesSchema())),
    fromPlace: v.nullish(v.string()),
    heuristicStepsPerMainStep: v.nullish(v.number()),
    ignoreRealtimeUpdates: v.nullish(v.boolean()),
    intermediatePlaces: v.nullish(v.array(v.lazy(() => v.nullable(InputCoordinatesSchema())))),
    itineraryFiltering: v.nullish(v.number()),
    keepingRentedBicycleAtDestinationCost: v.nullish(v.number()),
    locale: v.nullish(v.string()),
    maxPreTransitTime: v.nullish(v.number()),
    maxTransfers: v.nullish(v.number()),
    maxWalkDistance: v.nullish(v.number()),
    minTransferTime: v.nullish(v.number()),
    modeWeight: v.lazy(() => v.nullish(InputModeWeightSchema())),
    nonpreferredTransferPenalty: v.nullish(v.number()),
    numItineraries: v.nullish(v.number()),
    omitCanceled: v.nullish(v.boolean()),
    optimize: v.nullish(OptimizeTypeSchema),
    pageCursor: v.nullish(v.string()),
    parking: v.lazy(() => v.nullish(VehicleParkingInputSchema())),
    preferred: v.lazy(() => v.nullish(InputPreferredSchema())),
    reverseOptimizeOnTheFly: v.nullish(v.boolean()),
    searchWindow: v.nullish(v.number()),
    startTransitStopId: v.nullish(v.string()),
    startTransitTripId: v.nullish(v.string()),
    time: v.nullish(v.string()),
    to: v.lazy(() => v.nullish(InputCoordinatesSchema())),
    toPlace: v.nullish(v.string()),
    transferPenalty: v.nullish(v.number()),
    transportModes: v.nullish(v.array(v.nullable(TransportModeSchema()))),
    triangle: v.lazy(() => v.nullish(InputTriangleSchema())),
    unpreferred: v.lazy(() => v.nullish(InputUnpreferredSchema())),
    waitAtBeginningFactor: v.nullish(v.number()),
    waitReluctance: v.nullish(v.number()),
    walkBoardCost: v.nullish(v.number()),
    walkOnStreetReluctance: v.nullish(v.number()),
    walkReluctance: v.nullish(v.number()),
    walkSafetyFactor: v.nullish(v.number()),
    walkSpeed: v.nullish(v.number()),
    wheelchair: v.nullish(v.boolean())
  })
}

export function QueryTypePlanConnectionArgsSchema(): v.GenericSchema<QueryTypePlanConnectionArgs> {
  return v.object({
    after: v.nullish(v.string()),
    before: v.nullish(v.string()),
    dateTime: v.lazy(() => v.nullish(PlanDateTimeInputSchema())),
    destination: v.lazy(() => PlanLabeledLocationInputSchema()),
    first: v.nullish(v.number()),
    itineraryFilter: v.lazy(() => v.nullish(PlanItineraryFilterInputSchema())),
    last: v.nullish(v.number()),
    locale: v.nullish(v.string()),
    modes: v.lazy(() => v.nullish(PlanModesInputSchema())),
    origin: v.lazy(() => PlanLabeledLocationInputSchema()),
    preferences: v.lazy(() => v.nullish(PlanPreferencesInputSchema())),
    searchWindow: v.nullish(v.string())
  })
}

export function QueryTypeRentalVehicleArgsSchema(): v.GenericSchema<QueryTypeRentalVehicleArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeRentalVehiclesArgsSchema(): v.GenericSchema<QueryTypeRentalVehiclesArgs> {
  return v.object({
    formFactors: v.nullish(v.array(v.nullable(FormFactorSchema))),
    ids: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function QueryTypeRouteArgsSchema(): v.GenericSchema<QueryTypeRouteArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeRoutesArgsSchema(): v.GenericSchema<QueryTypeRoutesArgs> {
  return v.object({
    feeds: v.nullish(v.array(v.nullable(v.string()))),
    ids: v.nullish(v.array(v.nullable(v.string()))),
    name: v.nullish(v.string()),
    serviceDates: v.lazy(() => v.nullish(LocalDateRangeInputSchema())),
    transportModes: v.nullish(v.array(v.nullable(ModeSchema)))
  })
}

export function QueryTypeStationArgsSchema(): v.GenericSchema<QueryTypeStationArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeStationsArgsSchema(): v.GenericSchema<QueryTypeStationsArgs> {
  return v.object({
    ids: v.nullish(v.array(v.nullable(v.string()))),
    name: v.nullish(v.string())
  })
}

export function QueryTypeStopArgsSchema(): v.GenericSchema<QueryTypeStopArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeStopsArgsSchema(): v.GenericSchema<QueryTypeStopsArgs> {
  return v.object({
    ids: v.nullish(v.array(v.nullable(v.string()))),
    name: v.nullish(v.string())
  })
}

export function QueryTypeStopsByBboxArgsSchema(): v.GenericSchema<QueryTypeStopsByBboxArgs> {
  return v.object({
    feeds: v.nullish(v.array(v.string())),
    maxLat: v.number(),
    maxLon: v.number(),
    minLat: v.number(),
    minLon: v.number()
  })
}

export function QueryTypeStopsByRadiusArgsSchema(): v.GenericSchema<QueryTypeStopsByRadiusArgs> {
  return v.object({
    after: v.nullish(v.string()),
    before: v.nullish(v.string()),
    feeds: v.nullish(v.array(v.string())),
    first: v.nullish(v.number()),
    last: v.nullish(v.number()),
    lat: v.number(),
    lon: v.number(),
    radius: v.number()
  })
}

export function QueryTypeTripArgsSchema(): v.GenericSchema<QueryTypeTripArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeTripsArgsSchema(): v.GenericSchema<QueryTypeTripsArgs> {
  return v.object({
    feeds: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function QueryTypeVehicleParkingArgsSchema(): v.GenericSchema<QueryTypeVehicleParkingArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeVehicleParkingsArgsSchema(): v.GenericSchema<QueryTypeVehicleParkingsArgs> {
  return v.object({
    ids: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function QueryTypeVehicleRentalStationArgsSchema(): v.GenericSchema<QueryTypeVehicleRentalStationArgs> {
  return v.object({
    id: v.string()
  })
}

export function QueryTypeVehicleRentalStationsArgsSchema(): v.GenericSchema<QueryTypeVehicleRentalStationsArgs> {
  return v.object({
    ids: v.nullish(v.array(v.nullable(v.string())))
  })
}

export function RealTimeEstimateSchema(): v.GenericSchema<RealTimeEstimate> {
  return v.object({
    __typename: v.optional(v.literal('RealTimeEstimate')),
    delay: v.string(),
    time: v.string()
  })
}

export function RentalVehicleSchema(): v.GenericSchema<RentalVehicle> {
  return v.object({
    __typename: v.optional(v.literal('RentalVehicle')),
    allowPickupNow: v.nullish(v.boolean()),
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    name: v.string(),
    network: v.nullish(v.string()),
    operative: v.nullish(v.boolean()),
    rentalNetwork: VehicleRentalNetworkSchema(),
    rentalUris: v.nullish(VehicleRentalUrisSchema()),
    vehicleId: v.nullish(v.string()),
    vehicleType: v.nullish(RentalVehicleTypeSchema())
  })
}

export function RentalVehicleEntityCountsSchema(): v.GenericSchema<RentalVehicleEntityCounts> {
  return v.object({
    __typename: v.optional(v.literal('RentalVehicleEntityCounts')),
    byType: v.array(RentalVehicleTypeCountSchema()),
    total: v.number()
  })
}

export function RentalVehicleTypeSchema(): v.GenericSchema<RentalVehicleType> {
  return v.object({
    __typename: v.optional(v.literal('RentalVehicleType')),
    formFactor: v.nullish(FormFactorSchema),
    propulsionType: v.nullish(PropulsionTypeSchema)
  })
}

export function RentalVehicleTypeCountSchema(): v.GenericSchema<RentalVehicleTypeCount> {
  return v.object({
    __typename: v.optional(v.literal('RentalVehicleTypeCount')),
    count: v.number(),
    vehicleType: RentalVehicleTypeSchema()
  })
}

export function RideHailingEstimateSchema(): v.GenericSchema<RideHailingEstimate> {
  return v.object({
    __typename: v.optional(v.literal('RideHailingEstimate')),
    arrival: v.string(),
    maxPrice: MoneySchema(),
    minPrice: MoneySchema(),
    productName: v.nullish(v.string()),
    provider: RideHailingProviderSchema()
  })
}

export function RideHailingProviderSchema(): v.GenericSchema<RideHailingProvider> {
  return v.object({
    __typename: v.optional(v.literal('RideHailingProvider')),
    id: v.string()
  })
}

export function RiderCategorySchema(): v.GenericSchema<RiderCategory> {
  return v.object({
    __typename: v.optional(v.literal('RiderCategory')),
    id: v.string(),
    name: v.nullish(v.string())
  })
}

export function RouteSchema(): v.GenericSchema<Route> {
  return v.object({
    __typename: v.optional(v.literal('Route')),
    agency: v.nullish(AgencySchema()),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    bikesAllowed: v.nullish(BikesAllowedSchema),
    color: v.nullish(v.string()),
    desc: v.nullish(v.string()),
    gtfsId: v.string(),
    id: v.string(),
    longName: v.nullish(v.string()),
    mode: v.nullish(TransitModeSchema),
    patterns: v.nullish(v.array(v.nullable(PatternSchema()))),
    shortName: v.nullish(v.string()),
    sortOrder: v.nullish(v.number()),
    stops: v.nullish(v.array(v.nullable(StopSchema()))),
    textColor: v.nullish(v.string()),
    trips: v.nullish(v.array(v.nullable(TripSchema()))),
    type: v.nullish(v.number()),
    url: v.nullish(v.string())
  })
}

export function RouteAlertsArgsSchema(): v.GenericSchema<RouteAlertsArgs> {
  return v.object({
    types: v.nullish(v.array(v.nullable(RouteAlertTypeSchema)))
  })
}

export function RouteLongNameArgsSchema(): v.GenericSchema<RouteLongNameArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function RoutePatternsArgsSchema(): v.GenericSchema<RoutePatternsArgs> {
  return v.object({
    serviceDates: v.lazy(() => v.nullish(LocalDateRangeInputSchema()))
  })
}

export function RouteTypeSchema(): v.GenericSchema<RouteType> {
  return v.object({
    __typename: v.optional(v.literal('RouteType')),
    agency: v.nullish(AgencySchema()),
    routeType: v.number(),
    routes: v.nullish(v.array(v.nullable(RouteSchema())))
  })
}

export function RoutingErrorSchema(): v.GenericSchema<RoutingError> {
  return v.object({
    __typename: v.optional(v.literal('RoutingError')),
    code: RoutingErrorCodeSchema,
    description: v.string(),
    inputField: v.lazy(() => v.nullish(InputFieldSchema))
  })
}

export function ScooterOptimizationInputSchema(): v.GenericSchema<ScooterOptimizationInput> {
  return v.object({
    triangle: v.lazy(() => v.nullish(TriangleScooterFactorsInputSchema())),
    type: v.nullish(ScooterOptimizationTypeSchema)
  })
}

export function ScooterPreferencesInputSchema(): v.GenericSchema<ScooterPreferencesInput> {
  return v.object({
    optimization: v.lazy(() => v.nullish(ScooterOptimizationInputSchema())),
    reluctance: v.nullish(v.number()),
    rental: v.lazy(() => v.nullish(ScooterRentalPreferencesInputSchema())),
    speed: v.nullish(v.number())
  })
}

export function ScooterRentalPreferencesInputSchema(): v.GenericSchema<ScooterRentalPreferencesInput> {
  return v.object({
    allowedNetworks: v.nullish(v.array(v.string())),
    bannedNetworks: v.nullish(v.array(v.string())),
    destinationScooterPolicy: v.lazy(() => v.nullish(DestinationScooterPolicyInputSchema()))
  })
}

export function StopSchema(): v.GenericSchema<Stop> {
  return v.object({
    __typename: v.optional(v.literal('Stop')),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    cluster: v.nullish(ClusterSchema()),
    code: v.nullish(v.string()),
    desc: v.nullish(v.string()),
    direction: v.nullish(v.string()),
    geometries: v.nullish(StopGeometriesSchema()),
    gtfsId: v.string(),
    id: v.string(),
    lat: v.nullish(v.number()),
    locationType: v.nullish(LocationTypeSchema),
    lon: v.nullish(v.number()),
    name: v.string(),
    parentStation: v.nullish(StopSchema()),
    patterns: v.nullish(v.array(v.nullable(PatternSchema()))),
    platformCode: v.nullish(v.string()),
    routes: v.nullish(v.array(RouteSchema())),
    stopTimesForPattern: v.nullish(v.array(v.nullable(StoptimeSchema()))),
    stops: v.nullish(v.array(v.nullable(StopSchema()))),
    stoptimesForPatterns: v.nullish(v.array(v.nullable(StoptimesInPatternSchema()))),
    stoptimesForServiceDate: v.nullish(v.array(v.nullable(StoptimesInPatternSchema()))),
    stoptimesWithoutPatterns: v.nullish(v.array(v.nullable(StoptimeSchema()))),
    timezone: v.nullish(v.string()),
    transfers: v.nullish(v.array(v.nullable(StopAtDistanceSchema()))),
    url: v.nullish(v.string()),
    vehicleMode: v.nullish(ModeSchema),
    vehicleType: v.nullish(v.number()),
    wheelchairBoarding: v.nullish(WheelchairBoardingSchema),
    zoneId: v.nullish(v.string())
  })
}

export function StopAlertsArgsSchema(): v.GenericSchema<StopAlertsArgs> {
  return v.object({
    types: v.nullish(v.array(v.nullable(StopAlertTypeSchema)))
  })
}

export function StopDescArgsSchema(): v.GenericSchema<StopDescArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function StopNameArgsSchema(): v.GenericSchema<StopNameArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function StopStopTimesForPatternArgsSchema(): v.GenericSchema<StopStopTimesForPatternArgs> {
  return v.object({
    id: v.string(),
    numberOfDepartures: v.nullish(v.number()),
    omitCanceled: v.nullish(v.boolean()),
    omitNonPickups: v.nullish(v.boolean()),
    startTime: v.nullish(v.number()),
    timeRange: v.nullish(v.number())
  })
}

export function StopStoptimesForPatternsArgsSchema(): v.GenericSchema<StopStoptimesForPatternsArgs> {
  return v.object({
    numberOfDepartures: v.nullish(v.number()),
    omitCanceled: v.nullish(v.boolean()),
    omitNonPickups: v.nullish(v.boolean()),
    startTime: v.nullish(v.number()),
    timeRange: v.nullish(v.number())
  })
}

export function StopStoptimesForServiceDateArgsSchema(): v.GenericSchema<StopStoptimesForServiceDateArgs> {
  return v.object({
    date: v.nullish(v.string()),
    omitCanceled: v.nullish(v.boolean()),
    omitNonPickups: v.nullish(v.boolean())
  })
}

export function StopStoptimesWithoutPatternsArgsSchema(): v.GenericSchema<StopStoptimesWithoutPatternsArgs> {
  return v.object({
    numberOfDepartures: v.nullish(v.number()),
    omitCanceled: v.nullish(v.boolean()),
    omitNonPickups: v.nullish(v.boolean()),
    startTime: v.nullish(v.number()),
    timeRange: v.nullish(v.number())
  })
}

export function StopTransfersArgsSchema(): v.GenericSchema<StopTransfersArgs> {
  return v.object({
    maxDistance: v.nullish(v.number())
  })
}

export function StopUrlArgsSchema(): v.GenericSchema<StopUrlArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function StopGeometriesSchema(): v.GenericSchema<StopGeometries> {
  return v.object({
    __typename: v.optional(v.literal('StopGeometries')),
    geoJson: v.nullish(v.any()),
    googleEncoded: v.nullish(v.array(v.nullable(GeometrySchema())))
  })
}

export function StopOnRouteSchema(): v.GenericSchema<StopOnRoute> {
  return v.object({
    __typename: v.optional(v.literal('StopOnRoute')),
    route: RouteSchema(),
    stop: StopSchema()
  })
}

export function StopOnTripSchema(): v.GenericSchema<StopOnTrip> {
  return v.object({
    __typename: v.optional(v.literal('StopOnTrip')),
    stop: StopSchema(),
    trip: TripSchema()
  })
}

export function StopPositionSchema() {
  return v.union([PositionAtStopSchema(), PositionBetweenStopsSchema()])
}

export function StopRelationshipSchema(): v.GenericSchema<StopRelationship> {
  return v.object({
    __typename: v.optional(v.literal('StopRelationship')),
    status: VehicleStopStatusSchema,
    stop: StopSchema()
  })
}

export function StoptimeSchema(): v.GenericSchema<Stoptime> {
  return v.object({
    __typename: v.optional(v.literal('Stoptime')),
    arrivalDelay: v.nullish(v.number()),
    departureDelay: v.nullish(v.number()),
    dropoffType: v.nullish(PickupDropoffTypeSchema),
    headsign: v.nullish(v.string()),
    pickupType: v.nullish(PickupDropoffTypeSchema),
    realtime: v.nullish(v.boolean()),
    realtimeArrival: v.nullish(v.number()),
    realtimeDeparture: v.nullish(v.number()),
    realtimeState: v.nullish(RealtimeStateSchema),
    scheduledArrival: v.nullish(v.number()),
    scheduledDeparture: v.nullish(v.number()),
    serviceDay: v.nullish(v.number()),
    stop: v.nullish(StopSchema()),
    stopPosition: v.nullish(v.number()),
    timepoint: v.nullish(v.boolean()),
    trip: v.nullish(TripSchema())
  })
}

export function StoptimeHeadsignArgsSchema(): v.GenericSchema<StoptimeHeadsignArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function StoptimesInPatternSchema(): v.GenericSchema<StoptimesInPattern> {
  return v.object({
    __typename: v.optional(v.literal('StoptimesInPattern')),
    pattern: v.nullish(PatternSchema()),
    stoptimes: v.nullish(v.array(v.nullable(StoptimeSchema())))
  })
}

export function SystemNoticeSchema(): v.GenericSchema<SystemNotice> {
  return v.object({
    __typename: v.optional(v.literal('SystemNotice')),
    tag: v.nullish(v.string()),
    text: v.nullish(v.string())
  })
}

export function TicketTypeSchema(): v.GenericSchema<TicketType> {
  return v.object({
    __typename: v.optional(v.literal('TicketType')),
    currency: v.nullish(v.string()),
    fareId: v.string(),
    id: v.string(),
    price: v.nullish(v.number()),
    zones: v.nullish(v.array(v.string()))
  })
}

export function TimetablePreferencesInputSchema(): v.GenericSchema<TimetablePreferencesInput> {
  return v.object({
    excludeRealTimeUpdates: v.nullish(v.boolean()),
    includePlannedCancellations: v.nullish(v.boolean()),
    includeRealTimeCancellations: v.nullish(v.boolean())
  })
}

export function TransferPreferencesInputSchema(): v.GenericSchema<TransferPreferencesInput> {
  return v.object({
    cost: v.nullish(v.number()),
    maximumAdditionalTransfers: v.nullish(v.number()),
    maximumTransfers: v.nullish(v.number()),
    slack: v.nullish(v.string())
  })
}

export function TransitModePreferenceCostInputSchema(): v.GenericSchema<TransitModePreferenceCostInput> {
  return v.object({
    reluctance: v.number()
  })
}

export function TransitPreferencesInputSchema(): v.GenericSchema<TransitPreferencesInput> {
  return v.object({
    alight: v.lazy(() => v.nullish(AlightPreferencesInputSchema())),
    board: v.lazy(() => v.nullish(BoardPreferencesInputSchema())),
    timetable: v.lazy(() => v.nullish(TimetablePreferencesInputSchema())),
    transfer: v.lazy(() => v.nullish(TransferPreferencesInputSchema()))
  })
}

export function TranslatedStringSchema(): v.GenericSchema<TranslatedString> {
  return v.object({
    __typename: v.optional(v.literal('TranslatedString')),
    language: v.nullish(v.string()),
    text: v.nullish(v.string())
  })
}

export function TransportModeSchema(): v.GenericSchema<TransportMode> {
  return v.object({
    mode: ModeSchema,
    qualifier: v.nullish(QualifierSchema)
  })
}

export function TriangleCyclingFactorsInputSchema(): v.GenericSchema<TriangleCyclingFactorsInput> {
  return v.object({
    flatness: v.number(),
    safety: v.number(),
    time: v.number()
  })
}

export function TriangleScooterFactorsInputSchema(): v.GenericSchema<TriangleScooterFactorsInput> {
  return v.object({
    flatness: v.number(),
    safety: v.number(),
    time: v.number()
  })
}

export function TripSchema(): v.GenericSchema<Trip> {
  return v.object({
    __typename: v.optional(v.literal('Trip')),
    activeDates: v.nullish(v.array(v.nullable(v.string()))),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    arrivalStoptime: v.nullish(StoptimeSchema()),
    bikesAllowed: v.nullish(BikesAllowedSchema),
    blockId: v.nullish(v.string()),
    departureStoptime: v.nullish(StoptimeSchema()),
    directionId: v.nullish(v.string()),
    geometry: v.nullish(v.array(v.nullish(v.array(v.nullable(v.number()))))),
    gtfsId: v.string(),
    id: v.string(),
    occupancy: v.nullish(TripOccupancySchema()),
    pattern: v.nullish(PatternSchema()),
    route: RouteSchema(),
    routeShortName: v.nullish(v.string()),
    semanticHash: v.string(),
    serviceId: v.nullish(v.string()),
    shapeId: v.nullish(v.string()),
    stops: v.array(StopSchema()),
    stoptimes: v.nullish(v.array(v.nullable(StoptimeSchema()))),
    stoptimesForDate: v.nullish(v.array(v.nullable(StoptimeSchema()))),
    tripGeometry: v.nullish(GeometrySchema()),
    tripHeadsign: v.nullish(v.string()),
    tripShortName: v.nullish(v.string()),
    wheelchairAccessible: v.nullish(WheelchairBoardingSchema)
  })
}

export function TripAlertsArgsSchema(): v.GenericSchema<TripAlertsArgs> {
  return v.object({
    types: v.nullish(v.array(v.nullable(TripAlertTypeSchema)))
  })
}

export function TripArrivalStoptimeArgsSchema(): v.GenericSchema<TripArrivalStoptimeArgs> {
  return v.object({
    serviceDate: v.nullish(v.string())
  })
}

export function TripDepartureStoptimeArgsSchema(): v.GenericSchema<TripDepartureStoptimeArgs> {
  return v.object({
    serviceDate: v.nullish(v.string())
  })
}

export function TripStoptimesForDateArgsSchema(): v.GenericSchema<TripStoptimesForDateArgs> {
  return v.object({
    serviceDate: v.nullish(v.string())
  })
}

export function TripTripHeadsignArgsSchema(): v.GenericSchema<TripTripHeadsignArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function TripOccupancySchema(): v.GenericSchema<TripOccupancy> {
  return v.object({
    __typename: v.optional(v.literal('TripOccupancy')),
    occupancyStatus: v.nullish(OccupancyStatusSchema)
  })
}

export function UnknownSchema(): v.GenericSchema<Unknown> {
  return v.object({
    __typename: v.optional(v.literal('Unknown')),
    description: v.nullish(v.string())
  })
}

export function VehicleParkingSchema(): v.GenericSchema<VehicleParking> {
  return v.object({
    __typename: v.optional(v.literal('VehicleParking')),
    anyCarPlaces: v.nullish(v.boolean()),
    availability: v.nullish(VehicleParkingSpacesSchema()),
    bicyclePlaces: v.nullish(v.boolean()),
    capacity: v.nullish(VehicleParkingSpacesSchema()),
    carPlaces: v.nullish(v.boolean()),
    detailsUrl: v.nullish(v.string()),
    id: v.string(),
    imageUrl: v.nullish(v.string()),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    name: v.string(),
    note: v.nullish(v.string()),
    openingHours: v.nullish(OpeningHoursSchema()),
    realtime: v.nullish(v.boolean()),
    state: v.nullish(VehicleParkingStateSchema),
    tags: v.nullish(v.array(v.nullable(v.string()))),
    vehicleParkingId: v.nullish(v.string()),
    wheelchairAccessibleCarPlaces: v.nullish(v.boolean())
  })
}

export function VehicleParkingNameArgsSchema(): v.GenericSchema<VehicleParkingNameArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function VehicleParkingNoteArgsSchema(): v.GenericSchema<VehicleParkingNoteArgs> {
  return v.object({
    language: v.nullish(v.string())
  })
}

export function VehicleParkingInputSchema(): v.GenericSchema<VehicleParkingInput> {
  return v.object({
    filters: v.nullish(v.array(v.nullable(ParkingFilterSchema()))),
    preferred: v.nullish(v.array(v.nullable(ParkingFilterSchema()))),
    unpreferredCost: v.nullish(v.number())
  })
}

export function VehicleParkingSpacesSchema(): v.GenericSchema<VehicleParkingSpaces> {
  return v.object({
    __typename: v.optional(v.literal('VehicleParkingSpaces')),
    bicycleSpaces: v.nullish(v.number()),
    carSpaces: v.nullish(v.number()),
    wheelchairAccessibleCarSpaces: v.nullish(v.number())
  })
}

export function VehiclePositionSchema(): v.GenericSchema<VehiclePosition> {
  return v.object({
    __typename: v.optional(v.literal('VehiclePosition')),
    heading: v.nullish(v.number()),
    label: v.nullish(v.string()),
    lastUpdated: v.nullish(v.number()),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    speed: v.nullish(v.number()),
    stopRelationship: v.nullish(StopRelationshipSchema()),
    trip: TripSchema(),
    vehicleId: v.nullish(v.string())
  })
}

export function VehicleRentalNetworkSchema(): v.GenericSchema<VehicleRentalNetwork> {
  return v.object({
    __typename: v.optional(v.literal('VehicleRentalNetwork')),
    networkId: v.string(),
    url: v.nullish(v.string())
  })
}

export function VehicleRentalStationSchema(): v.GenericSchema<VehicleRentalStation> {
  return v.object({
    __typename: v.optional(v.literal('VehicleRentalStation')),
    allowDropoff: v.nullish(v.boolean()),
    allowDropoffNow: v.nullish(v.boolean()),
    allowOverloading: v.nullish(v.boolean()),
    allowPickup: v.nullish(v.boolean()),
    allowPickupNow: v.nullish(v.boolean()),
    availableSpaces: v.nullish(RentalVehicleEntityCountsSchema()),
    availableVehicles: v.nullish(RentalVehicleEntityCountsSchema()),
    capacity: v.nullish(v.number()),
    id: v.string(),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    name: v.string(),
    network: v.nullish(v.string()),
    operative: v.nullish(v.boolean()),
    realtime: v.nullish(v.boolean()),
    rentalNetwork: VehicleRentalNetworkSchema(),
    rentalUris: v.nullish(VehicleRentalUrisSchema()),
    spacesAvailable: v.nullish(v.number()),
    stationId: v.nullish(v.string()),
    vehiclesAvailable: v.nullish(v.number())
  })
}

export function VehicleRentalUrisSchema(): v.GenericSchema<VehicleRentalUris> {
  return v.object({
    __typename: v.optional(v.literal('VehicleRentalUris')),
    android: v.nullish(v.string()),
    ios: v.nullish(v.string()),
    web: v.nullish(v.string())
  })
}

export function WalkPreferencesInputSchema(): v.GenericSchema<WalkPreferencesInput> {
  return v.object({
    boardCost: v.nullish(v.number()),
    reluctance: v.nullish(v.number()),
    safetyFactor: v.nullish(v.number()),
    speed: v.nullish(v.number())
  })
}

export function WheelchairPreferencesInputSchema(): v.GenericSchema<WheelchairPreferencesInput> {
  return v.object({
    enabled: v.nullish(v.boolean())
  })
}

export function DebugOutputSchema(): v.GenericSchema<DebugOutput> {
  return v.object({
    __typename: v.optional(v.literal('debugOutput')),
    pathCalculationTime: v.nullish(v.number()),
    precalculationTime: v.nullish(v.number()),
    renderingTime: v.nullish(v.number()),
    timedOut: v.nullish(v.boolean()),
    totalTime: v.nullish(v.number())
  })
}

export function ElevationProfileComponentSchema(): v.GenericSchema<ElevationProfileComponent> {
  return v.object({
    __typename: v.optional(v.literal('elevationProfileComponent')),
    distance: v.nullish(v.number()),
    elevation: v.nullish(v.number())
  })
}

export function FareSchema(): v.GenericSchema<Fare> {
  return v.object({
    __typename: v.optional(v.literal('fare')),
    cents: v.nullish(v.number()),
    components: v.nullish(v.array(v.nullable(FareComponentSchema()))),
    currency: v.nullish(v.string()),
    type: v.nullish(v.string())
  })
}

export function FareComponentSchema(): v.GenericSchema<FareComponent> {
  return v.object({
    __typename: v.optional(v.literal('fareComponent')),
    cents: v.nullish(v.number()),
    currency: v.nullish(v.string()),
    fareId: v.nullish(v.string()),
    routes: v.nullish(v.array(v.nullable(RouteSchema())))
  })
}

export function PlaceAtDistanceSchema(): v.GenericSchema<PlaceAtDistance> {
  return v.object({
    __typename: v.optional(v.literal('placeAtDistance')),
    distance: v.nullish(v.number()),
    id: v.string(),
    place: v.nullish(PlaceInterfaceSchema())
  })
}

export function PlaceAtDistanceConnectionSchema(): v.GenericSchema<PlaceAtDistanceConnection> {
  return v.object({
    __typename: v.optional(v.literal('placeAtDistanceConnection')),
    edges: v.nullish(v.array(v.nullable(PlaceAtDistanceEdgeSchema()))),
    pageInfo: PageInfoSchema()
  })
}

export function PlaceAtDistanceEdgeSchema(): v.GenericSchema<PlaceAtDistanceEdge> {
  return v.object({
    __typename: v.optional(v.literal('placeAtDistanceEdge')),
    cursor: v.string(),
    node: v.nullish(PlaceAtDistanceSchema())
  })
}

export function ServiceTimeRangeSchema(): v.GenericSchema<ServiceTimeRange> {
  return v.object({
    __typename: v.optional(v.literal('serviceTimeRange')),
    end: v.nullish(v.number()),
    start: v.nullish(v.number())
  })
}

export function StepSchema(): v.GenericSchema<Step> {
  return v.object({
    __typename: v.optional(v.literal('step')),
    absoluteDirection: v.nullish(AbsoluteDirectionSchema),
    alerts: v.nullish(v.array(v.nullable(AlertSchema()))),
    area: v.nullish(v.boolean()),
    bogusName: v.nullish(v.boolean()),
    distance: v.nullish(v.number()),
    elevationProfile: v.nullish(v.array(v.nullable(ElevationProfileComponentSchema()))),
    exit: v.nullish(v.string()),
    lat: v.nullish(v.number()),
    lon: v.nullish(v.number()),
    relativeDirection: v.nullish(RelativeDirectionSchema),
    stayOn: v.nullish(v.boolean()),
    streetName: v.nullish(v.string()),
    walkingBike: v.nullish(v.boolean())
  })
}

export function StopAtDistanceSchema(): v.GenericSchema<StopAtDistance> {
  return v.object({
    __typename: v.optional(v.literal('stopAtDistance')),
    distance: v.nullish(v.number()),
    id: v.string(),
    stop: v.nullish(StopSchema())
  })
}

export function StopAtDistanceConnectionSchema(): v.GenericSchema<StopAtDistanceConnection> {
  return v.object({
    __typename: v.optional(v.literal('stopAtDistanceConnection')),
    edges: v.nullish(v.array(v.nullable(StopAtDistanceEdgeSchema()))),
    pageInfo: PageInfoSchema()
  })
}

export function StopAtDistanceEdgeSchema(): v.GenericSchema<StopAtDistanceEdge> {
  return v.object({
    __typename: v.optional(v.literal('stopAtDistanceEdge')),
    cursor: v.string(),
    node: v.nullish(StopAtDistanceSchema())
  })
}
