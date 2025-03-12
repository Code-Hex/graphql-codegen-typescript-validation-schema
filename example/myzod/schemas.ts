import * as myzod from 'myzod'
import { AbsoluteDirection, AccessibilityPreferencesInput, Agency, AgencyAlertsArgs, AgencyAlertType, Alert, AlertCauseType, AlertEffectType, AlertSeverityLevelType, AlightPreferencesInput, BicycleParkingPreferencesInput, BicyclePreferencesInput, BicycleRentalPreferencesInput, BicycleWalkPreferencesCostInput, BicycleWalkPreferencesInput, BikePark, BikeParkNameArgs, BikeRentalStation, BikeRentalStationUris, BikesAllowed, BoardPreferencesInput, BookingInfo, BookingTime, CarPark, CarParkNameArgs, CarParkingPreferencesInput, CarPreferencesInput, CarRentalPreferencesInput, Cluster, ContactInfo, Coordinate, Coordinates, Currency, CyclingOptimizationInput, CyclingOptimizationType, DefaultFareProduct, DepartureRow, DepartureRowStoptimesArgs, DestinationBicyclePolicyInput, DestinationScooterPolicyInput, Emissions, FareMedium, FareProduct, FareProductUse, Feed, FeedAlertsArgs, FeedAlertType, FeedPublisher, FilterPlaceType, FormFactor, Geometry, InputBanned, InputCoordinates, InputField, InputFilters, InputModeWeight, InputPreferred, InputTriangle, InputUnpreferred, Itinerary, ItineraryFilterDebugProfile, Leg, LegNextLegsArgs, LegTime, LocalDateRangeInput, LocalTimeSpan, LocalTimeSpanDate, LocationType, Mode, Money, Node, OccupancyStatus, OpeningHours, OpeningHoursDatesArgs, OptimizeType, PageInfo, ParkingFilter, ParkingFilterOperation, Pattern, PatternAlertsArgs, PatternTripsForDateArgs, PatternAlertType, PickupDropoffType, Place, PlaceInterface, Plan, PlanAccessMode, PlanConnection, PlanCoordinateInput, PlanDateTimeInput, PlanDirectMode, PlanEdge, PlanEgressMode, PlanItineraryFilterInput, PlanLabeledLocationInput, PlanLocationInput, PlanModesInput, PlanPageInfo, PlanPreferencesInput, PlanStopLocationInput, PlanStreetPreferencesInput, PlanTransferMode, PlanTransitModePreferenceInput, PlanTransitModesInput, PositionAtStop, PositionBetweenStops, PropulsionType, Qualifier, QueryType, QueryTypeAgencyArgs, QueryTypeAlertsArgs, QueryTypeBikeParkArgs, QueryTypeBikeRentalStationArgs, QueryTypeBikeRentalStationsArgs, QueryTypeCancelledTripTimesArgs, QueryTypeCarParkArgs, QueryTypeCarParksArgs, QueryTypeClusterArgs, QueryTypeDepartureRowArgs, QueryTypeFuzzyTripArgs, QueryTypeNearestArgs, QueryTypeNodeArgs, QueryTypePatternArgs, QueryTypePlanArgs, QueryTypePlanConnectionArgs, QueryTypeRentalVehicleArgs, QueryTypeRentalVehiclesArgs, QueryTypeRouteArgs, QueryTypeRoutesArgs, QueryTypeStationArgs, QueryTypeStationsArgs, QueryTypeStopArgs, QueryTypeStopsArgs, QueryTypeStopsByBboxArgs, QueryTypeStopsByRadiusArgs, QueryTypeTripArgs, QueryTypeTripsArgs, QueryTypeVehicleParkingArgs, QueryTypeVehicleParkingsArgs, QueryTypeVehicleRentalStationArgs, QueryTypeVehicleRentalStationsArgs, RealTimeEstimate, RealtimeState, RelativeDirection, RentalVehicle, RentalVehicleEntityCounts, RentalVehicleType, RentalVehicleTypeCount, RideHailingEstimate, RideHailingProvider, RiderCategory, Route, RouteAlertsArgs, RouteLongNameArgs, RoutePatternsArgs, RouteAlertType, RouteType, RoutingError, RoutingErrorCode, ScooterOptimizationInput, ScooterOptimizationType, ScooterPreferencesInput, ScooterRentalPreferencesInput, Stop, StopAlertsArgs, StopDescArgs, StopNameArgs, StopStopTimesForPatternArgs, StopStoptimesForPatternsArgs, StopStoptimesForServiceDateArgs, StopStoptimesWithoutPatternsArgs, StopTransfersArgs, StopUrlArgs, StopAlertType, StopGeometries, StopOnRoute, StopOnTrip, StopRelationship, Stoptime, StoptimeHeadsignArgs, StoptimesInPattern, SystemNotice, TicketType, TimetablePreferencesInput, TransferPreferencesInput, TransitMode, TransitModePreferenceCostInput, TransitPreferencesInput, TranslatedString, TransportMode, TriangleCyclingFactorsInput, TriangleScooterFactorsInput, Trip, TripAlertsArgs, TripArrivalStoptimeArgs, TripDepartureStoptimeArgs, TripStoptimesForDateArgs, TripTripHeadsignArgs, TripAlertType, TripOccupancy, Unknown, VehicleParking, VehicleParkingNameArgs, VehicleParkingNoteArgs, VehicleParkingInput, VehicleParkingSpaces, VehicleParkingState, VehiclePosition, VehicleRentalNetwork, VehicleRentalStation, VehicleRentalUris, VehicleStopStatus, VertexType, WalkPreferencesInput, WheelchairBoarding, WheelchairPreferencesInput, DebugOutput, ElevationProfileComponent, Fare, FareComponent, PlaceAtDistance, PlaceAtDistanceConnection, PlaceAtDistanceEdge, ServiceTimeRange, Step, StopAtDistance, StopAtDistanceConnection, StopAtDistanceEdge } from '../types'

export const definedNonNullAnySchema = myzod.object({});

export const AbsoluteDirectionSchema = myzod.enum(AbsoluteDirection);

export const AgencyAlertTypeSchema = myzod.enum(AgencyAlertType);

export const AlertCauseTypeSchema = myzod.enum(AlertCauseType);

export const AlertEffectTypeSchema = myzod.enum(AlertEffectType);

export const AlertSeverityLevelTypeSchema = myzod.enum(AlertSeverityLevelType);

export const BikesAllowedSchema = myzod.enum(BikesAllowed);

export const CyclingOptimizationTypeSchema = myzod.enum(CyclingOptimizationType);

export const FeedAlertTypeSchema = myzod.enum(FeedAlertType);

export const FilterPlaceTypeSchema = myzod.enum(FilterPlaceType);

export const FormFactorSchema = myzod.enum(FormFactor);

export const InputFieldSchema = myzod.enum(InputField);

export const ItineraryFilterDebugProfileSchema = myzod.enum(ItineraryFilterDebugProfile);

export const LocationTypeSchema = myzod.enum(LocationType);

export const ModeSchema = myzod.enum(Mode);

export const OccupancyStatusSchema = myzod.enum(OccupancyStatus);

export const OptimizeTypeSchema = myzod.enum(OptimizeType);

export const PatternAlertTypeSchema = myzod.enum(PatternAlertType);

export const PickupDropoffTypeSchema = myzod.enum(PickupDropoffType);

export const PlanAccessModeSchema = myzod.enum(PlanAccessMode);

export const PlanDirectModeSchema = myzod.enum(PlanDirectMode);

export const PlanEgressModeSchema = myzod.enum(PlanEgressMode);

export const PlanTransferModeSchema = myzod.enum(PlanTransferMode);

export const PropulsionTypeSchema = myzod.enum(PropulsionType);

export const QualifierSchema = myzod.enum(Qualifier);

export const RealtimeStateSchema = myzod.enum(RealtimeState);

export const RelativeDirectionSchema = myzod.enum(RelativeDirection);

export const RouteAlertTypeSchema = myzod.enum(RouteAlertType);

export const RoutingErrorCodeSchema = myzod.enum(RoutingErrorCode);

export const ScooterOptimizationTypeSchema = myzod.enum(ScooterOptimizationType);

export const StopAlertTypeSchema = myzod.enum(StopAlertType);

export const TransitModeSchema = myzod.enum(TransitMode);

export const TripAlertTypeSchema = myzod.enum(TripAlertType);

export const VehicleParkingStateSchema = myzod.enum(VehicleParkingState);

export const VehicleStopStatusSchema = myzod.enum(VehicleStopStatus);

export const VertexTypeSchema = myzod.enum(VertexType);

export const WheelchairBoardingSchema = myzod.enum(WheelchairBoarding);

export function AccessibilityPreferencesInputSchema(): myzod.Type<AccessibilityPreferencesInput> {
  return myzod.object({
    wheelchair: myzod.lazy(() => WheelchairPreferencesInputSchema().optional().nullable())
  })
}

export function AgencySchema(): myzod.Type<Agency> {
  return myzod.object({
    __typename: myzod.literal('Agency').optional(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    fareUrl: myzod.string().optional().nullable(),
    gtfsId: myzod.string(),
    id: myzod.string(),
    lang: myzod.string().optional().nullable(),
    name: myzod.string(),
    phone: myzod.string().optional().nullable(),
    routes: myzod.array(RouteSchema().nullable()).optional().nullable(),
    timezone: myzod.string(),
    url: myzod.string()
  })
}

export function AgencyAlertsArgsSchema(): myzod.Type<AgencyAlertsArgs> {
  return myzod.object({
    types: myzod.array(AgencyAlertTypeSchema.nullable()).optional().nullable()
  })
}

export function AlertSchema(): myzod.Type<Alert> {
  return myzod.object({
    __typename: myzod.literal('Alert').optional(),
    agency: AgencySchema().optional().nullable(),
    alertCause: AlertCauseTypeSchema.optional().nullable(),
    alertDescriptionText: myzod.string(),
    alertDescriptionTextTranslations: myzod.array(TranslatedStringSchema()),
    alertEffect: AlertEffectTypeSchema.optional().nullable(),
    alertHash: myzod.number().optional().nullable(),
    alertHeaderText: myzod.string().optional().nullable(),
    alertHeaderTextTranslations: myzod.array(TranslatedStringSchema()),
    alertSeverityLevel: AlertSeverityLevelTypeSchema.optional().nullable(),
    alertUrl: myzod.string().optional().nullable(),
    alertUrlTranslations: myzod.array(TranslatedStringSchema()),
    effectiveEndDate: myzod.number().optional().nullable(),
    effectiveStartDate: myzod.number().optional().nullable(),
    entities: myzod.array(AlertEntitySchema().nullable()).optional().nullable(),
    feed: myzod.string().optional().nullable(),
    id: myzod.string(),
    patterns: myzod.array(PatternSchema().nullable()).optional().nullable(),
    route: RouteSchema().optional().nullable(),
    stop: StopSchema().optional().nullable(),
    trip: TripSchema().optional().nullable()
  })
}

export function AlertEntitySchema() {
  return myzod.union([AgencySchema(), PatternSchema(), RouteSchema(), RouteTypeSchema(), StopSchema(), StopOnRouteSchema(), StopOnTripSchema(), TripSchema(), UnknownSchema()])
}

export function AlightPreferencesInputSchema(): myzod.Type<AlightPreferencesInput> {
  return myzod.object({
    slack: myzod.string().optional().nullable()
  })
}

export function BicycleParkingPreferencesInputSchema(): myzod.Type<BicycleParkingPreferencesInput> {
  return myzod.object({
    filters: myzod.array(ParkingFilterSchema()).optional().nullable(),
    preferred: myzod.array(ParkingFilterSchema()).optional().nullable(),
    unpreferredCost: myzod.number().optional().nullable()
  })
}

export function BicyclePreferencesInputSchema(): myzod.Type<BicyclePreferencesInput> {
  return myzod.object({
    boardCost: myzod.number().optional().nullable(),
    optimization: myzod.lazy(() => CyclingOptimizationInputSchema().optional().nullable()),
    parking: myzod.lazy(() => BicycleParkingPreferencesInputSchema().optional().nullable()),
    reluctance: myzod.number().optional().nullable(),
    rental: myzod.lazy(() => BicycleRentalPreferencesInputSchema().optional().nullable()),
    speed: myzod.number().optional().nullable(),
    walk: myzod.lazy(() => BicycleWalkPreferencesInputSchema().optional().nullable())
  })
}

export function BicycleRentalPreferencesInputSchema(): myzod.Type<BicycleRentalPreferencesInput> {
  return myzod.object({
    allowedNetworks: myzod.array(myzod.string()).optional().nullable(),
    bannedNetworks: myzod.array(myzod.string()).optional().nullable(),
    destinationBicyclePolicy: myzod.lazy(() => DestinationBicyclePolicyInputSchema().optional().nullable())
  })
}

export function BicycleWalkPreferencesCostInputSchema(): myzod.Type<BicycleWalkPreferencesCostInput> {
  return myzod.object({
    mountDismountCost: myzod.number().optional().nullable(),
    reluctance: myzod.number().optional().nullable()
  })
}

export function BicycleWalkPreferencesInputSchema(): myzod.Type<BicycleWalkPreferencesInput> {
  return myzod.object({
    cost: myzod.lazy(() => BicycleWalkPreferencesCostInputSchema().optional().nullable()),
    mountDismountTime: myzod.string().optional().nullable(),
    speed: myzod.number().optional().nullable()
  })
}

export function BikeParkSchema(): myzod.Type<BikePark> {
  return myzod.object({
    __typename: myzod.literal('BikePark').optional(),
    bikeParkId: myzod.string().optional().nullable(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    name: myzod.string(),
    openingHours: OpeningHoursSchema().optional().nullable(),
    realtime: myzod.boolean().optional().nullable(),
    spacesAvailable: myzod.number().optional().nullable(),
    tags: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function BikeParkNameArgsSchema(): myzod.Type<BikeParkNameArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function BikeRentalStationSchema(): myzod.Type<BikeRentalStation> {
  return myzod.object({
    __typename: myzod.literal('BikeRentalStation').optional(),
    allowDropoff: myzod.boolean().optional().nullable(),
    allowDropoffNow: myzod.boolean().optional().nullable(),
    allowOverloading: myzod.boolean().optional().nullable(),
    allowPickup: myzod.boolean().optional().nullable(),
    allowPickupNow: myzod.boolean().optional().nullable(),
    bikesAvailable: myzod.number().optional().nullable(),
    capacity: myzod.number().optional().nullable(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    name: myzod.string(),
    networks: myzod.array(myzod.string().nullable()).optional().nullable(),
    operative: myzod.boolean().optional().nullable(),
    realtime: myzod.boolean().optional().nullable(),
    rentalUris: BikeRentalStationUrisSchema().optional().nullable(),
    spacesAvailable: myzod.number().optional().nullable(),
    state: myzod.string().optional().nullable(),
    stationId: myzod.string().optional().nullable()
  })
}

export function BikeRentalStationUrisSchema(): myzod.Type<BikeRentalStationUris> {
  return myzod.object({
    __typename: myzod.literal('BikeRentalStationUris').optional(),
    android: myzod.string().optional().nullable(),
    ios: myzod.string().optional().nullable(),
    web: myzod.string().optional().nullable()
  })
}

export function BoardPreferencesInputSchema(): myzod.Type<BoardPreferencesInput> {
  return myzod.object({
    slack: myzod.string().optional().nullable(),
    waitReluctance: myzod.number().optional().nullable()
  })
}

export function BookingInfoSchema(): myzod.Type<BookingInfo> {
  return myzod.object({
    __typename: myzod.literal('BookingInfo').optional(),
    contactInfo: ContactInfoSchema().optional().nullable(),
    dropOffMessage: myzod.string().optional().nullable(),
    earliestBookingTime: BookingTimeSchema().optional().nullable(),
    latestBookingTime: BookingTimeSchema().optional().nullable(),
    maximumBookingNoticeSeconds: myzod.number().optional().nullable(),
    message: myzod.string().optional().nullable(),
    minimumBookingNoticeSeconds: myzod.number().optional().nullable(),
    pickupMessage: myzod.string().optional().nullable()
  })
}

export function BookingTimeSchema(): myzod.Type<BookingTime> {
  return myzod.object({
    __typename: myzod.literal('BookingTime').optional(),
    daysPrior: myzod.number().optional().nullable(),
    time: myzod.string().optional().nullable()
  })
}

export function CarParkSchema(): myzod.Type<CarPark> {
  return myzod.object({
    __typename: myzod.literal('CarPark').optional(),
    carParkId: myzod.string().optional().nullable(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    maxCapacity: myzod.number().optional().nullable(),
    name: myzod.string(),
    openingHours: OpeningHoursSchema().optional().nullable(),
    realtime: myzod.boolean().optional().nullable(),
    spacesAvailable: myzod.number().optional().nullable(),
    tags: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function CarParkNameArgsSchema(): myzod.Type<CarParkNameArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function CarParkingPreferencesInputSchema(): myzod.Type<CarParkingPreferencesInput> {
  return myzod.object({
    filters: myzod.array(ParkingFilterSchema()).optional().nullable(),
    preferred: myzod.array(ParkingFilterSchema()).optional().nullable(),
    unpreferredCost: myzod.number().optional().nullable()
  })
}

export function CarPreferencesInputSchema(): myzod.Type<CarPreferencesInput> {
  return myzod.object({
    parking: myzod.lazy(() => CarParkingPreferencesInputSchema().optional().nullable()),
    reluctance: myzod.number().optional().nullable(),
    rental: myzod.lazy(() => CarRentalPreferencesInputSchema().optional().nullable())
  })
}

export function CarRentalPreferencesInputSchema(): myzod.Type<CarRentalPreferencesInput> {
  return myzod.object({
    allowedNetworks: myzod.array(myzod.string()).optional().nullable(),
    bannedNetworks: myzod.array(myzod.string()).optional().nullable()
  })
}

export function ClusterSchema(): myzod.Type<Cluster> {
  return myzod.object({
    __typename: myzod.literal('Cluster').optional(),
    gtfsId: myzod.string(),
    id: myzod.string(),
    lat: myzod.number(),
    lon: myzod.number(),
    name: myzod.string(),
    stops: myzod.array(StopSchema()).optional().nullable()
  })
}

export function ContactInfoSchema(): myzod.Type<ContactInfo> {
  return myzod.object({
    __typename: myzod.literal('ContactInfo').optional(),
    additionalDetails: myzod.string().optional().nullable(),
    bookingUrl: myzod.string().optional().nullable(),
    contactPerson: myzod.string().optional().nullable(),
    eMail: myzod.string().optional().nullable(),
    faxNumber: myzod.string().optional().nullable(),
    infoUrl: myzod.string().optional().nullable(),
    phoneNumber: myzod.string().optional().nullable()
  })
}

export function CoordinateSchema(): myzod.Type<Coordinate> {
  return myzod.object({
    __typename: myzod.literal('Coordinate').optional(),
    latitude: myzod.number(),
    longitude: myzod.number()
  })
}

export function CoordinatesSchema(): myzod.Type<Coordinates> {
  return myzod.object({
    __typename: myzod.literal('Coordinates').optional(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable()
  })
}

export function CurrencySchema(): myzod.Type<Currency> {
  return myzod.object({
    __typename: myzod.literal('Currency').optional(),
    code: myzod.string(),
    digits: myzod.number()
  })
}

export function CyclingOptimizationInputSchema(): myzod.Type<CyclingOptimizationInput> {
  return myzod.object({
    triangle: myzod.lazy(() => TriangleCyclingFactorsInputSchema().optional().nullable()),
    type: CyclingOptimizationTypeSchema.optional().nullable()
  })
}

export function DefaultFareProductSchema(): myzod.Type<DefaultFareProduct> {
  return myzod.object({
    __typename: myzod.literal('DefaultFareProduct').optional(),
    id: myzod.string(),
    medium: FareMediumSchema().optional().nullable(),
    name: myzod.string(),
    price: MoneySchema(),
    riderCategory: RiderCategorySchema().optional().nullable()
  })
}

export function DepartureRowSchema(): myzod.Type<DepartureRow> {
  return myzod.object({
    __typename: myzod.literal('DepartureRow').optional(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    pattern: PatternSchema().optional().nullable(),
    stop: StopSchema().optional().nullable(),
    stoptimes: myzod.array(StoptimeSchema().nullable()).optional().nullable()
  })
}

export function DepartureRowStoptimesArgsSchema(): myzod.Type<DepartureRowStoptimesArgs> {
  return myzod.object({
    numberOfDepartures: myzod.number().default(1).optional().nullable(),
    omitCanceled: myzod.boolean().default(true).optional().nullable(),
    omitNonPickups: myzod.boolean().default(false).optional().nullable(),
    startTime: myzod.number().default(0).optional().nullable(),
    timeRange: myzod.number().default(86400).optional().nullable()
  })
}

export function DestinationBicyclePolicyInputSchema(): myzod.Type<DestinationBicyclePolicyInput> {
  return myzod.object({
    allowKeeping: myzod.boolean().optional().nullable(),
    keepingCost: myzod.number().optional().nullable()
  })
}

export function DestinationScooterPolicyInputSchema(): myzod.Type<DestinationScooterPolicyInput> {
  return myzod.object({
    allowKeeping: myzod.boolean().optional().nullable(),
    keepingCost: myzod.number().optional().nullable()
  })
}

export function EmissionsSchema(): myzod.Type<Emissions> {
  return myzod.object({
    __typename: myzod.literal('Emissions').optional(),
    co2: myzod.number().optional().nullable()
  })
}

export function FareMediumSchema(): myzod.Type<FareMedium> {
  return myzod.object({
    __typename: myzod.literal('FareMedium').optional(),
    id: myzod.string(),
    name: myzod.string().optional().nullable()
  })
}

export function FareProductSchema(): myzod.Type<FareProduct> {
  return myzod.object({
    id: myzod.string(),
    medium: FareMediumSchema().optional().nullable(),
    name: myzod.string(),
    riderCategory: RiderCategorySchema().optional().nullable()
  })
}

export function FareProductUseSchema(): myzod.Type<FareProductUse> {
  return myzod.object({
    __typename: myzod.literal('FareProductUse').optional(),
    id: myzod.string(),
    product: FareProductSchema().optional().nullable()
  })
}

export function FeedSchema(): myzod.Type<Feed> {
  return myzod.object({
    __typename: myzod.literal('Feed').optional(),
    agencies: myzod.array(AgencySchema().nullable()).optional().nullable(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    feedId: myzod.string(),
    publisher: FeedPublisherSchema().optional().nullable()
  })
}

export function FeedAlertsArgsSchema(): myzod.Type<FeedAlertsArgs> {
  return myzod.object({
    types: myzod.array(FeedAlertTypeSchema).optional().nullable()
  })
}

export function FeedPublisherSchema(): myzod.Type<FeedPublisher> {
  return myzod.object({
    __typename: myzod.literal('FeedPublisher').optional(),
    name: myzod.string(),
    url: myzod.string()
  })
}

export function GeometrySchema(): myzod.Type<Geometry> {
  return myzod.object({
    __typename: myzod.literal('Geometry').optional(),
    length: myzod.number().optional().nullable(),
    points: myzod.string().optional().nullable()
  })
}

export function InputBannedSchema(): myzod.Type<InputBanned> {
  return myzod.object({
    agencies: myzod.string().optional().nullable(),
    routes: myzod.string().optional().nullable(),
    stops: myzod.string().optional().nullable(),
    stopsHard: myzod.string().optional().nullable(),
    trips: myzod.string().optional().nullable()
  })
}

export function InputCoordinatesSchema(): myzod.Type<InputCoordinates> {
  return myzod.object({
    address: myzod.string().optional().nullable(),
    lat: myzod.number(),
    locationSlack: myzod.number().optional().nullable(),
    lon: myzod.number()
  })
}

export function InputFiltersSchema(): myzod.Type<InputFilters> {
  return myzod.object({
    bikeParks: myzod.array(myzod.string().nullable()).optional().nullable(),
    bikeRentalStations: myzod.array(myzod.string().nullable()).optional().nullable(),
    carParks: myzod.array(myzod.string().nullable()).optional().nullable(),
    routes: myzod.array(myzod.string().nullable()).optional().nullable(),
    stations: myzod.array(myzod.string().nullable()).optional().nullable(),
    stops: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function InputModeWeightSchema(): myzod.Type<InputModeWeight> {
  return myzod.object({
    AIRPLANE: myzod.number().optional().nullable(),
    BUS: myzod.number().optional().nullable(),
    CABLE_CAR: myzod.number().optional().nullable(),
    FERRY: myzod.number().optional().nullable(),
    FUNICULAR: myzod.number().optional().nullable(),
    GONDOLA: myzod.number().optional().nullable(),
    RAIL: myzod.number().optional().nullable(),
    SUBWAY: myzod.number().optional().nullable(),
    TRAM: myzod.number().optional().nullable()
  })
}

export function InputPreferredSchema(): myzod.Type<InputPreferred> {
  return myzod.object({
    agencies: myzod.string().optional().nullable(),
    otherThanPreferredRoutesPenalty: myzod.number().optional().nullable(),
    routes: myzod.string().optional().nullable()
  })
}

export function InputTriangleSchema(): myzod.Type<InputTriangle> {
  return myzod.object({
    safetyFactor: myzod.number().optional().nullable(),
    slopeFactor: myzod.number().optional().nullable(),
    timeFactor: myzod.number().optional().nullable()
  })
}

export function InputUnpreferredSchema(): myzod.Type<InputUnpreferred> {
  return myzod.object({
    agencies: myzod.string().optional().nullable(),
    routes: myzod.string().optional().nullable(),
    unpreferredCost: myzod.string().optional().nullable(),
    useUnpreferredRoutesPenalty: myzod.number().optional().nullable()
  })
}

export function ItinerarySchema(): myzod.Type<Itinerary> {
  return myzod.object({
    __typename: myzod.literal('Itinerary').optional(),
    accessibilityScore: myzod.number().optional().nullable(),
    arrivedAtDestinationWithRentedBicycle: myzod.boolean().optional().nullable(),
    duration: myzod.number().optional().nullable(),
    elevationGained: myzod.number().optional().nullable(),
    elevationLost: myzod.number().optional().nullable(),
    emissionsPerPerson: EmissionsSchema().optional().nullable(),
    end: myzod.string().optional().nullable(),
    endTime: myzod.number().optional().nullable(),
    fares: myzod.array(FareSchema().nullable()).optional().nullable(),
    generalizedCost: myzod.number().optional().nullable(),
    legs: myzod.array(LegSchema().nullable()),
    numberOfTransfers: myzod.number(),
    start: myzod.string().optional().nullable(),
    startTime: myzod.number().optional().nullable(),
    systemNotices: myzod.array(SystemNoticeSchema().nullable()),
    waitingTime: myzod.number().optional().nullable(),
    walkDistance: myzod.number().optional().nullable(),
    walkTime: myzod.number().optional().nullable()
  })
}

export function LegSchema(): myzod.Type<Leg> {
  return myzod.object({
    __typename: myzod.literal('Leg').optional(),
    accessibilityScore: myzod.number().optional().nullable(),
    agency: AgencySchema().optional().nullable(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    arrivalDelay: myzod.number().optional().nullable(),
    departureDelay: myzod.number().optional().nullable(),
    distance: myzod.number().optional().nullable(),
    dropOffBookingInfo: BookingInfoSchema().optional().nullable(),
    dropoffType: PickupDropoffTypeSchema.optional().nullable(),
    duration: myzod.number().optional().nullable(),
    end: LegTimeSchema(),
    endTime: myzod.number().optional().nullable(),
    fareProducts: myzod.array(FareProductUseSchema().nullable()).optional().nullable(),
    from: PlaceSchema(),
    generalizedCost: myzod.number().optional().nullable(),
    headsign: myzod.string().optional().nullable(),
    interlineWithPreviousLeg: myzod.boolean().optional().nullable(),
    intermediatePlace: myzod.boolean().optional().nullable(),
    intermediatePlaces: myzod.array(PlaceSchema().nullable()).optional().nullable(),
    intermediateStops: myzod.array(StopSchema().nullable()).optional().nullable(),
    legGeometry: GeometrySchema().optional().nullable(),
    mode: ModeSchema.optional().nullable(),
    nextLegs: myzod.array(LegSchema()).optional().nullable(),
    pickupBookingInfo: BookingInfoSchema().optional().nullable(),
    pickupType: PickupDropoffTypeSchema.optional().nullable(),
    realTime: myzod.boolean().optional().nullable(),
    realtimeState: RealtimeStateSchema.optional().nullable(),
    rentedBike: myzod.boolean().optional().nullable(),
    rideHailingEstimate: RideHailingEstimateSchema().optional().nullable(),
    route: RouteSchema().optional().nullable(),
    serviceDate: myzod.string().optional().nullable(),
    start: LegTimeSchema(),
    startTime: myzod.number().optional().nullable(),
    steps: myzod.array(StepSchema().nullable()).optional().nullable(),
    to: PlaceSchema(),
    transitLeg: myzod.boolean().optional().nullable(),
    trip: TripSchema().optional().nullable(),
    walkingBike: myzod.boolean().optional().nullable()
  })
}

export function LegNextLegsArgsSchema(): myzod.Type<LegNextLegsArgs> {
  return myzod.object({
    destinationModesWithParentStation: myzod.array(TransitModeSchema).optional().nullable(),
    numberOfLegs: myzod.number(),
    originModesWithParentStation: myzod.array(TransitModeSchema).optional().nullable()
  })
}

export function LegTimeSchema(): myzod.Type<LegTime> {
  return myzod.object({
    __typename: myzod.literal('LegTime').optional(),
    estimated: RealTimeEstimateSchema().optional().nullable(),
    scheduledTime: myzod.string()
  })
}

export function LocalDateRangeInputSchema(): myzod.Type<LocalDateRangeInput> {
  return myzod.object({
    end: myzod.string().optional().nullable(),
    start: myzod.string().optional().nullable()
  })
}

export function LocalTimeSpanSchema(): myzod.Type<LocalTimeSpan> {
  return myzod.object({
    __typename: myzod.literal('LocalTimeSpan').optional(),
    from: myzod.number(),
    to: myzod.number()
  })
}

export function LocalTimeSpanDateSchema(): myzod.Type<LocalTimeSpanDate> {
  return myzod.object({
    __typename: myzod.literal('LocalTimeSpanDate').optional(),
    date: myzod.string(),
    timeSpans: myzod.array(LocalTimeSpanSchema().nullable()).optional().nullable()
  })
}

export function MoneySchema(): myzod.Type<Money> {
  return myzod.object({
    __typename: myzod.literal('Money').optional(),
    amount: myzod.number(),
    currency: CurrencySchema()
  })
}

export function NodeSchema(): myzod.Type<Node> {
  return myzod.object({
    id: myzod.string()
  })
}

export function OpeningHoursSchema(): myzod.Type<OpeningHours> {
  return myzod.object({
    __typename: myzod.literal('OpeningHours').optional(),
    dates: myzod.array(LocalTimeSpanDateSchema().nullable()).optional().nullable(),
    osm: myzod.string().optional().nullable()
  })
}

export function OpeningHoursDatesArgsSchema(): myzod.Type<OpeningHoursDatesArgs> {
  return myzod.object({
    dates: myzod.array(myzod.string())
  })
}

export function PageInfoSchema(): myzod.Type<PageInfo> {
  return myzod.object({
    __typename: myzod.literal('PageInfo').optional(),
    endCursor: myzod.string().optional().nullable(),
    hasNextPage: myzod.boolean(),
    hasPreviousPage: myzod.boolean(),
    startCursor: myzod.string().optional().nullable()
  })
}

export function ParkingFilterSchema(): myzod.Type<ParkingFilter> {
  return myzod.object({
    not: myzod.array(ParkingFilterOperationSchema()).optional().nullable(),
    select: myzod.array(ParkingFilterOperationSchema()).optional().nullable()
  })
}

export function ParkingFilterOperationSchema(): myzod.Type<ParkingFilterOperation> {
  return myzod.object({
    tags: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function PatternSchema(): myzod.Type<Pattern> {
  return myzod.object({
    __typename: myzod.literal('Pattern').optional(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    code: myzod.string(),
    directionId: myzod.number().optional().nullable(),
    geometry: myzod.array(CoordinatesSchema().nullable()).optional().nullable(),
    headsign: myzod.string().optional().nullable(),
    id: myzod.string(),
    name: myzod.string().optional().nullable(),
    originalTripPattern: PatternSchema().optional().nullable(),
    patternGeometry: GeometrySchema().optional().nullable(),
    route: RouteSchema(),
    semanticHash: myzod.string().optional().nullable(),
    stops: myzod.array(StopSchema()).optional().nullable(),
    trips: myzod.array(TripSchema()).optional().nullable(),
    tripsForDate: myzod.array(TripSchema()).optional().nullable(),
    vehiclePositions: myzod.array(VehiclePositionSchema()).optional().nullable()
  })
}

export function PatternAlertsArgsSchema(): myzod.Type<PatternAlertsArgs> {
  return myzod.object({
    types: myzod.array(PatternAlertTypeSchema.nullable()).optional().nullable()
  })
}

export function PatternTripsForDateArgsSchema(): myzod.Type<PatternTripsForDateArgs> {
  return myzod.object({
    serviceDate: myzod.string().optional().nullable()
  })
}

export function PlaceSchema(): myzod.Type<Place> {
  return myzod.object({
    __typename: myzod.literal('Place').optional(),
    arrival: LegTimeSchema().optional().nullable(),
    arrivalTime: myzod.number(),
    bikePark: BikeParkSchema().optional().nullable(),
    bikeRentalStation: BikeRentalStationSchema().optional().nullable(),
    carPark: CarParkSchema().optional().nullable(),
    departure: LegTimeSchema().optional().nullable(),
    departureTime: myzod.number(),
    lat: myzod.number(),
    lon: myzod.number(),
    name: myzod.string().optional().nullable(),
    rentalVehicle: RentalVehicleSchema().optional().nullable(),
    stop: StopSchema().optional().nullable(),
    stopPosition: StopPositionSchema().optional().nullable(),
    vehicleParking: VehicleParkingSchema().optional().nullable(),
    vehicleRentalStation: VehicleRentalStationSchema().optional().nullable(),
    vertexType: VertexTypeSchema.optional().nullable()
  })
}

export function PlaceInterfaceSchema(): myzod.Type<PlaceInterface> {
  return myzod.object({
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable()
  })
}

export function PlanSchema(): myzod.Type<Plan> {
  return myzod.object({
    __typename: myzod.literal('Plan').optional(),
    date: myzod.number().optional().nullable(),
    debugOutput: DebugOutputSchema(),
    from: PlaceSchema(),
    itineraries: myzod.array(ItinerarySchema().nullable()),
    messageEnums: myzod.array(myzod.string().nullable()),
    messageStrings: myzod.array(myzod.string().nullable()),
    nextDateTime: myzod.number().optional().nullable(),
    nextPageCursor: myzod.string().optional().nullable(),
    prevDateTime: myzod.number().optional().nullable(),
    previousPageCursor: myzod.string().optional().nullable(),
    routingErrors: myzod.array(RoutingErrorSchema()),
    searchWindowUsed: myzod.number().optional().nullable(),
    to: PlaceSchema()
  })
}

export function PlanConnectionSchema(): myzod.Type<PlanConnection> {
  return myzod.object({
    __typename: myzod.literal('PlanConnection').optional(),
    edges: myzod.array(PlanEdgeSchema().nullable()).optional().nullable(),
    pageInfo: PlanPageInfoSchema(),
    routingErrors: myzod.array(RoutingErrorSchema()),
    searchDateTime: myzod.string().optional().nullable()
  })
}

export function PlanCoordinateInputSchema(): myzod.Type<PlanCoordinateInput> {
  return myzod.object({
    latitude: myzod.number(),
    longitude: myzod.number()
  })
}

export function PlanDateTimeInputSchema(): myzod.Type<PlanDateTimeInput> {
  return myzod.object({
    earliestDeparture: myzod.string().optional().nullable(),
    latestArrival: myzod.string().optional().nullable()
  })
}

export function PlanEdgeSchema(): myzod.Type<PlanEdge> {
  return myzod.object({
    __typename: myzod.literal('PlanEdge').optional(),
    cursor: myzod.string(),
    node: ItinerarySchema()
  })
}

export function PlanItineraryFilterInputSchema(): myzod.Type<PlanItineraryFilterInput> {
  return myzod.object({
    groupSimilarityKeepOne: myzod.number().default(0.85).optional().nullable(),
    groupSimilarityKeepThree: myzod.number().default(0.68).optional().nullable(),
    groupedOtherThanSameLegsMaxCostMultiplier: myzod.number().default(2).optional().nullable(),
    itineraryFilterDebugProfile: ItineraryFilterDebugProfileSchema.default("OFF").optional().nullable()
  })
}

export function PlanLabeledLocationInputSchema(): myzod.Type<PlanLabeledLocationInput> {
  return myzod.object({
    label: myzod.string().optional().nullable(),
    location: myzod.lazy(() => PlanLocationInputSchema())
  })
}

export function PlanLocationInputSchema(): myzod.Type<PlanLocationInput> {
  return myzod.object({
    coordinate: myzod.lazy(() => PlanCoordinateInputSchema().optional().nullable()),
    stopLocation: myzod.lazy(() => PlanStopLocationInputSchema().optional().nullable())
  })
}

export function PlanModesInputSchema(): myzod.Type<PlanModesInput> {
  return myzod.object({
    direct: myzod.array(PlanDirectModeSchema).optional().nullable(),
    directOnly: myzod.boolean().default(false).optional().nullable(),
    transit: myzod.lazy(() => PlanTransitModesInputSchema().optional().nullable()),
    transitOnly: myzod.boolean().default(false).optional().nullable()
  })
}

export function PlanPageInfoSchema(): myzod.Type<PlanPageInfo> {
  return myzod.object({
    __typename: myzod.literal('PlanPageInfo').optional(),
    endCursor: myzod.string().optional().nullable(),
    hasNextPage: myzod.boolean(),
    hasPreviousPage: myzod.boolean(),
    searchWindowUsed: myzod.string().optional().nullable(),
    startCursor: myzod.string().optional().nullable()
  })
}

export function PlanPreferencesInputSchema(): myzod.Type<PlanPreferencesInput> {
  return myzod.object({
    accessibility: myzod.lazy(() => AccessibilityPreferencesInputSchema().optional().nullable()),
    street: myzod.lazy(() => PlanStreetPreferencesInputSchema().optional().nullable()),
    transit: myzod.lazy(() => TransitPreferencesInputSchema().optional().nullable())
  })
}

export function PlanStopLocationInputSchema(): myzod.Type<PlanStopLocationInput> {
  return myzod.object({
    stopLocationId: myzod.string()
  })
}

export function PlanStreetPreferencesInputSchema(): myzod.Type<PlanStreetPreferencesInput> {
  return myzod.object({
    bicycle: myzod.lazy(() => BicyclePreferencesInputSchema().optional().nullable()),
    car: myzod.lazy(() => CarPreferencesInputSchema().optional().nullable()),
    scooter: myzod.lazy(() => ScooterPreferencesInputSchema().optional().nullable()),
    walk: myzod.lazy(() => WalkPreferencesInputSchema().optional().nullable())
  })
}

export function PlanTransitModePreferenceInputSchema(): myzod.Type<PlanTransitModePreferenceInput> {
  return myzod.object({
    cost: myzod.lazy(() => TransitModePreferenceCostInputSchema().optional().nullable()),
    mode: TransitModeSchema
  })
}

export function PlanTransitModesInputSchema(): myzod.Type<PlanTransitModesInput> {
  return myzod.object({
    access: myzod.array(PlanAccessModeSchema).optional().nullable(),
    egress: myzod.array(PlanEgressModeSchema).optional().nullable(),
    transfer: myzod.array(PlanTransferModeSchema).optional().nullable(),
    transit: myzod.array(myzod.lazy(() => PlanTransitModePreferenceInputSchema())).optional().nullable()
  })
}

export function PositionAtStopSchema(): myzod.Type<PositionAtStop> {
  return myzod.object({
    __typename: myzod.literal('PositionAtStop').optional(),
    position: myzod.number().optional().nullable()
  })
}

export function PositionBetweenStopsSchema(): myzod.Type<PositionBetweenStops> {
  return myzod.object({
    __typename: myzod.literal('PositionBetweenStops').optional(),
    nextPosition: myzod.number().optional().nullable(),
    previousPosition: myzod.number().optional().nullable()
  })
}

export function QueryTypeSchema(): myzod.Type<QueryType> {
  return myzod.object({
    __typename: myzod.literal('QueryType').optional(),
    agencies: myzod.array(AgencySchema().nullable()).optional().nullable(),
    agency: AgencySchema().optional().nullable(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    bikePark: BikeParkSchema().optional().nullable(),
    bikeParks: myzod.array(BikeParkSchema().nullable()).optional().nullable(),
    bikeRentalStation: BikeRentalStationSchema().optional().nullable(),
    bikeRentalStations: myzod.array(BikeRentalStationSchema().nullable()).optional().nullable(),
    cancelledTripTimes: myzod.array(StoptimeSchema().nullable()).optional().nullable(),
    carPark: CarParkSchema().optional().nullable(),
    carParks: myzod.array(CarParkSchema().nullable()).optional().nullable(),
    cluster: ClusterSchema().optional().nullable(),
    clusters: myzod.array(ClusterSchema().nullable()).optional().nullable(),
    departureRow: DepartureRowSchema().optional().nullable(),
    feeds: myzod.array(FeedSchema().nullable()).optional().nullable(),
    fuzzyTrip: TripSchema().optional().nullable(),
    nearest: PlaceAtDistanceConnectionSchema().optional().nullable(),
    node: NodeSchema().optional().nullable(),
    pattern: PatternSchema().optional().nullable(),
    patterns: myzod.array(PatternSchema().nullable()).optional().nullable(),
    plan: PlanSchema().optional().nullable(),
    planConnection: PlanConnectionSchema().optional().nullable(),
    rentalVehicle: RentalVehicleSchema().optional().nullable(),
    rentalVehicles: myzod.array(RentalVehicleSchema().nullable()).optional().nullable(),
    route: RouteSchema().optional().nullable(),
    routes: myzod.array(RouteSchema().nullable()).optional().nullable(),
    serviceTimeRange: ServiceTimeRangeSchema().optional().nullable(),
    station: StopSchema().optional().nullable(),
    stations: myzod.array(StopSchema().nullable()).optional().nullable(),
    stop: StopSchema().optional().nullable(),
    stops: myzod.array(StopSchema().nullable()).optional().nullable(),
    stopsByBbox: myzod.array(StopSchema().nullable()).optional().nullable(),
    stopsByRadius: StopAtDistanceConnectionSchema().optional().nullable(),
    ticketTypes: myzod.array(TicketTypeSchema().nullable()).optional().nullable(),
    trip: TripSchema().optional().nullable(),
    trips: myzod.array(TripSchema().nullable()).optional().nullable(),
    vehicleParking: VehicleParkingSchema().optional().nullable(),
    vehicleParkings: myzod.array(VehicleParkingSchema().nullable()).optional().nullable(),
    vehicleRentalStation: VehicleRentalStationSchema().optional().nullable(),
    vehicleRentalStations: myzod.array(VehicleRentalStationSchema().nullable()).optional().nullable(),
    viewer: QueryTypeSchema().optional().nullable()
  })
}

export function QueryTypeAgencyArgsSchema(): myzod.Type<QueryTypeAgencyArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeAlertsArgsSchema(): myzod.Type<QueryTypeAlertsArgs> {
  return myzod.object({
    cause: myzod.array(AlertCauseTypeSchema).optional().nullable(),
    effect: myzod.array(AlertEffectTypeSchema).optional().nullable(),
    feeds: myzod.array(myzod.string()).optional().nullable(),
    route: myzod.array(myzod.string()).optional().nullable(),
    severityLevel: myzod.array(AlertSeverityLevelTypeSchema).optional().nullable(),
    stop: myzod.array(myzod.string()).optional().nullable()
  })
}

export function QueryTypeBikeParkArgsSchema(): myzod.Type<QueryTypeBikeParkArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeBikeRentalStationArgsSchema(): myzod.Type<QueryTypeBikeRentalStationArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeBikeRentalStationsArgsSchema(): myzod.Type<QueryTypeBikeRentalStationsArgs> {
  return myzod.object({
    ids: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function QueryTypeCancelledTripTimesArgsSchema(): myzod.Type<QueryTypeCancelledTripTimesArgs> {
  return myzod.object({
    feeds: myzod.array(myzod.string().nullable()).optional().nullable(),
    maxArrivalTime: myzod.number().optional().nullable(),
    maxDate: myzod.string().optional().nullable(),
    maxDepartureTime: myzod.number().optional().nullable(),
    minArrivalTime: myzod.number().optional().nullable(),
    minDate: myzod.string().optional().nullable(),
    minDepartureTime: myzod.number().optional().nullable(),
    patterns: myzod.array(myzod.string().nullable()).optional().nullable(),
    routes: myzod.array(myzod.string().nullable()).optional().nullable(),
    trips: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function QueryTypeCarParkArgsSchema(): myzod.Type<QueryTypeCarParkArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeCarParksArgsSchema(): myzod.Type<QueryTypeCarParksArgs> {
  return myzod.object({
    ids: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function QueryTypeClusterArgsSchema(): myzod.Type<QueryTypeClusterArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeDepartureRowArgsSchema(): myzod.Type<QueryTypeDepartureRowArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeFuzzyTripArgsSchema(): myzod.Type<QueryTypeFuzzyTripArgs> {
  return myzod.object({
    date: myzod.string(),
    direction: myzod.number().default(-1).optional().nullable(),
    route: myzod.string(),
    time: myzod.number()
  })
}

export function QueryTypeNearestArgsSchema(): myzod.Type<QueryTypeNearestArgs> {
  return myzod.object({
    after: myzod.string().optional().nullable(),
    before: myzod.string().optional().nullable(),
    filterByIds: myzod.lazy(() => InputFiltersSchema().optional().nullable()),
    filterByModes: myzod.array(ModeSchema.nullable()).optional().nullable(),
    filterByNetwork: myzod.array(myzod.string()).optional().nullable(),
    filterByPlaceTypes: myzod.array(FilterPlaceTypeSchema.nullable()).optional().nullable(),
    first: myzod.number().optional().nullable(),
    last: myzod.number().optional().nullable(),
    lat: myzod.number(),
    lon: myzod.number(),
    maxDistance: myzod.number().default(2000).optional().nullable(),
    maxResults: myzod.number().default(20).optional().nullable()
  })
}

export function QueryTypeNodeArgsSchema(): myzod.Type<QueryTypeNodeArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypePatternArgsSchema(): myzod.Type<QueryTypePatternArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypePlanArgsSchema(): myzod.Type<QueryTypePlanArgs> {
  return myzod.object({
    alightSlack: myzod.number().optional().nullable(),
    allowBikeRental: myzod.boolean().optional().nullable(),
    allowKeepingRentedBicycleAtDestination: myzod.boolean().optional().nullable(),
    allowedBikeRentalNetworks: myzod.array(myzod.string().nullable()).optional().nullable(),
    allowedTicketTypes: myzod.array(myzod.string().nullable()).optional().nullable(),
    allowedVehicleRentalNetworks: myzod.array(myzod.string().nullable()).optional().nullable(),
    arriveBy: myzod.boolean().optional().nullable(),
    banned: myzod.lazy(() => InputBannedSchema().optional().nullable()),
    bannedVehicleRentalNetworks: myzod.array(myzod.string().nullable()).optional().nullable(),
    batch: myzod.boolean().optional().nullable(),
    bikeBoardCost: myzod.number().optional().nullable(),
    bikeReluctance: myzod.number().optional().nullable(),
    bikeSpeed: myzod.number().optional().nullable(),
    bikeSwitchCost: myzod.number().optional().nullable(),
    bikeSwitchTime: myzod.number().optional().nullable(),
    bikeWalkingReluctance: myzod.number().optional().nullable(),
    boardSlack: myzod.number().optional().nullable(),
    carParkCarLegWeight: myzod.number().optional().nullable(),
    carReluctance: myzod.number().optional().nullable(),
    claimInitialWait: myzod.number().optional().nullable(),
    compactLegsByReversedSearch: myzod.boolean().optional().nullable(),
    date: myzod.string().optional().nullable(),
    debugItineraryFilter: myzod.boolean().optional().nullable(),
    disableRemainingWeightHeuristic: myzod.boolean().optional().nullable(),
    from: myzod.lazy(() => InputCoordinatesSchema().optional().nullable()),
    fromPlace: myzod.string().optional().nullable(),
    heuristicStepsPerMainStep: myzod.number().optional().nullable(),
    ignoreRealtimeUpdates: myzod.boolean().optional().nullable(),
    intermediatePlaces: myzod.array(myzod.lazy(() => InputCoordinatesSchema().nullable())).optional().nullable(),
    itineraryFiltering: myzod.number().optional().nullable(),
    keepingRentedBicycleAtDestinationCost: myzod.number().optional().nullable(),
    locale: myzod.string().optional().nullable(),
    maxPreTransitTime: myzod.number().optional().nullable(),
    maxTransfers: myzod.number().optional().nullable(),
    maxWalkDistance: myzod.number().optional().nullable(),
    minTransferTime: myzod.number().optional().nullable(),
    modeWeight: myzod.lazy(() => InputModeWeightSchema().optional().nullable()),
    nonpreferredTransferPenalty: myzod.number().optional().nullable(),
    numItineraries: myzod.number().default(3).optional().nullable(),
    omitCanceled: myzod.boolean().default(true).optional().nullable(),
    optimize: OptimizeTypeSchema.optional().nullable(),
    pageCursor: myzod.string().optional().nullable(),
    parking: myzod.lazy(() => VehicleParkingInputSchema().optional().nullable()),
    preferred: myzod.lazy(() => InputPreferredSchema().optional().nullable()),
    reverseOptimizeOnTheFly: myzod.boolean().optional().nullable(),
    searchWindow: myzod.number().optional().nullable(),
    startTransitStopId: myzod.string().optional().nullable(),
    startTransitTripId: myzod.string().optional().nullable(),
    time: myzod.string().optional().nullable(),
    to: myzod.lazy(() => InputCoordinatesSchema().optional().nullable()),
    toPlace: myzod.string().optional().nullable(),
    transferPenalty: myzod.number().optional().nullable(),
    transportModes: myzod.array(TransportModeSchema().nullable()).optional().nullable(),
    triangle: myzod.lazy(() => InputTriangleSchema().optional().nullable()),
    unpreferred: myzod.lazy(() => InputUnpreferredSchema().optional().nullable()),
    waitAtBeginningFactor: myzod.number().optional().nullable(),
    waitReluctance: myzod.number().optional().nullable(),
    walkBoardCost: myzod.number().optional().nullable(),
    walkOnStreetReluctance: myzod.number().optional().nullable(),
    walkReluctance: myzod.number().optional().nullable(),
    walkSafetyFactor: myzod.number().optional().nullable(),
    walkSpeed: myzod.number().optional().nullable(),
    wheelchair: myzod.boolean().optional().nullable()
  })
}

export function QueryTypePlanConnectionArgsSchema(): myzod.Type<QueryTypePlanConnectionArgs> {
  return myzod.object({
    after: myzod.string().optional().nullable(),
    before: myzod.string().optional().nullable(),
    dateTime: myzod.lazy(() => PlanDateTimeInputSchema().optional().nullable()),
    destination: myzod.lazy(() => PlanLabeledLocationInputSchema()),
    first: myzod.number().optional().nullable(),
    itineraryFilter: myzod.lazy(() => PlanItineraryFilterInputSchema().optional().nullable()),
    last: myzod.number().optional().nullable(),
    locale: myzod.string().optional().nullable(),
    modes: myzod.lazy(() => PlanModesInputSchema().optional().nullable()),
    origin: myzod.lazy(() => PlanLabeledLocationInputSchema()),
    preferences: myzod.lazy(() => PlanPreferencesInputSchema().optional().nullable()),
    searchWindow: myzod.string().optional().nullable()
  })
}

export function QueryTypeRentalVehicleArgsSchema(): myzod.Type<QueryTypeRentalVehicleArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeRentalVehiclesArgsSchema(): myzod.Type<QueryTypeRentalVehiclesArgs> {
  return myzod.object({
    formFactors: myzod.array(FormFactorSchema.nullable()).optional().nullable(),
    ids: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function QueryTypeRouteArgsSchema(): myzod.Type<QueryTypeRouteArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeRoutesArgsSchema(): myzod.Type<QueryTypeRoutesArgs> {
  return myzod.object({
    feeds: myzod.array(myzod.string().nullable()).optional().nullable(),
    ids: myzod.array(myzod.string().nullable()).optional().nullable(),
    name: myzod.string().optional().nullable(),
    serviceDates: myzod.lazy(() => LocalDateRangeInputSchema().optional().nullable()),
    transportModes: myzod.array(ModeSchema.nullable()).optional().nullable()
  })
}

export function QueryTypeStationArgsSchema(): myzod.Type<QueryTypeStationArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeStationsArgsSchema(): myzod.Type<QueryTypeStationsArgs> {
  return myzod.object({
    ids: myzod.array(myzod.string().nullable()).optional().nullable(),
    name: myzod.string().optional().nullable()
  })
}

export function QueryTypeStopArgsSchema(): myzod.Type<QueryTypeStopArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeStopsArgsSchema(): myzod.Type<QueryTypeStopsArgs> {
  return myzod.object({
    ids: myzod.array(myzod.string().nullable()).optional().nullable(),
    name: myzod.string().optional().nullable()
  })
}

export function QueryTypeStopsByBboxArgsSchema(): myzod.Type<QueryTypeStopsByBboxArgs> {
  return myzod.object({
    feeds: myzod.array(myzod.string()).optional().nullable(),
    maxLat: myzod.number(),
    maxLon: myzod.number(),
    minLat: myzod.number(),
    minLon: myzod.number()
  })
}

export function QueryTypeStopsByRadiusArgsSchema(): myzod.Type<QueryTypeStopsByRadiusArgs> {
  return myzod.object({
    after: myzod.string().optional().nullable(),
    before: myzod.string().optional().nullable(),
    feeds: myzod.array(myzod.string()).optional().nullable(),
    first: myzod.number().optional().nullable(),
    last: myzod.number().optional().nullable(),
    lat: myzod.number(),
    lon: myzod.number(),
    radius: myzod.number()
  })
}

export function QueryTypeTripArgsSchema(): myzod.Type<QueryTypeTripArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeTripsArgsSchema(): myzod.Type<QueryTypeTripsArgs> {
  return myzod.object({
    feeds: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function QueryTypeVehicleParkingArgsSchema(): myzod.Type<QueryTypeVehicleParkingArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeVehicleParkingsArgsSchema(): myzod.Type<QueryTypeVehicleParkingsArgs> {
  return myzod.object({
    ids: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function QueryTypeVehicleRentalStationArgsSchema(): myzod.Type<QueryTypeVehicleRentalStationArgs> {
  return myzod.object({
    id: myzod.string()
  })
}

export function QueryTypeVehicleRentalStationsArgsSchema(): myzod.Type<QueryTypeVehicleRentalStationsArgs> {
  return myzod.object({
    ids: myzod.array(myzod.string().nullable()).optional().nullable()
  })
}

export function RealTimeEstimateSchema(): myzod.Type<RealTimeEstimate> {
  return myzod.object({
    __typename: myzod.literal('RealTimeEstimate').optional(),
    delay: myzod.string(),
    time: myzod.string()
  })
}

export function RentalVehicleSchema(): myzod.Type<RentalVehicle> {
  return myzod.object({
    __typename: myzod.literal('RentalVehicle').optional(),
    allowPickupNow: myzod.boolean().optional().nullable(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    name: myzod.string(),
    network: myzod.string().optional().nullable(),
    operative: myzod.boolean().optional().nullable(),
    rentalNetwork: VehicleRentalNetworkSchema(),
    rentalUris: VehicleRentalUrisSchema().optional().nullable(),
    vehicleId: myzod.string().optional().nullable(),
    vehicleType: RentalVehicleTypeSchema().optional().nullable()
  })
}

export function RentalVehicleEntityCountsSchema(): myzod.Type<RentalVehicleEntityCounts> {
  return myzod.object({
    __typename: myzod.literal('RentalVehicleEntityCounts').optional(),
    byType: myzod.array(RentalVehicleTypeCountSchema()),
    total: myzod.number()
  })
}

export function RentalVehicleTypeSchema(): myzod.Type<RentalVehicleType> {
  return myzod.object({
    __typename: myzod.literal('RentalVehicleType').optional(),
    formFactor: FormFactorSchema.optional().nullable(),
    propulsionType: PropulsionTypeSchema.optional().nullable()
  })
}

export function RentalVehicleTypeCountSchema(): myzod.Type<RentalVehicleTypeCount> {
  return myzod.object({
    __typename: myzod.literal('RentalVehicleTypeCount').optional(),
    count: myzod.number(),
    vehicleType: RentalVehicleTypeSchema()
  })
}

export function RideHailingEstimateSchema(): myzod.Type<RideHailingEstimate> {
  return myzod.object({
    __typename: myzod.literal('RideHailingEstimate').optional(),
    arrival: myzod.string(),
    maxPrice: MoneySchema(),
    minPrice: MoneySchema(),
    productName: myzod.string().optional().nullable(),
    provider: RideHailingProviderSchema()
  })
}

export function RideHailingProviderSchema(): myzod.Type<RideHailingProvider> {
  return myzod.object({
    __typename: myzod.literal('RideHailingProvider').optional(),
    id: myzod.string()
  })
}

export function RiderCategorySchema(): myzod.Type<RiderCategory> {
  return myzod.object({
    __typename: myzod.literal('RiderCategory').optional(),
    id: myzod.string(),
    name: myzod.string().optional().nullable()
  })
}

export function RouteSchema(): myzod.Type<Route> {
  return myzod.object({
    __typename: myzod.literal('Route').optional(),
    agency: AgencySchema().optional().nullable(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    bikesAllowed: BikesAllowedSchema.optional().nullable(),
    color: myzod.string().optional().nullable(),
    desc: myzod.string().optional().nullable(),
    gtfsId: myzod.string(),
    id: myzod.string(),
    longName: myzod.string().optional().nullable(),
    mode: TransitModeSchema.optional().nullable(),
    patterns: myzod.array(PatternSchema().nullable()).optional().nullable(),
    shortName: myzod.string().optional().nullable(),
    sortOrder: myzod.number().optional().nullable(),
    stops: myzod.array(StopSchema().nullable()).optional().nullable(),
    textColor: myzod.string().optional().nullable(),
    trips: myzod.array(TripSchema().nullable()).optional().nullable(),
    type: myzod.number().optional().nullable(),
    url: myzod.string().optional().nullable()
  })
}

export function RouteAlertsArgsSchema(): myzod.Type<RouteAlertsArgs> {
  return myzod.object({
    types: myzod.array(RouteAlertTypeSchema.nullable()).optional().nullable()
  })
}

export function RouteLongNameArgsSchema(): myzod.Type<RouteLongNameArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function RoutePatternsArgsSchema(): myzod.Type<RoutePatternsArgs> {
  return myzod.object({
    serviceDates: myzod.lazy(() => LocalDateRangeInputSchema().optional().nullable())
  })
}

export function RouteTypeSchema(): myzod.Type<RouteType> {
  return myzod.object({
    __typename: myzod.literal('RouteType').optional(),
    agency: AgencySchema().optional().nullable(),
    routeType: myzod.number(),
    routes: myzod.array(RouteSchema().nullable()).optional().nullable()
  })
}

export function RoutingErrorSchema(): myzod.Type<RoutingError> {
  return myzod.object({
    __typename: myzod.literal('RoutingError').optional(),
    code: RoutingErrorCodeSchema,
    description: myzod.string(),
    inputField: myzod.lazy(() => InputFieldSchema.optional().nullable())
  })
}

export function ScooterOptimizationInputSchema(): myzod.Type<ScooterOptimizationInput> {
  return myzod.object({
    triangle: myzod.lazy(() => TriangleScooterFactorsInputSchema().optional().nullable()),
    type: ScooterOptimizationTypeSchema.optional().nullable()
  })
}

export function ScooterPreferencesInputSchema(): myzod.Type<ScooterPreferencesInput> {
  return myzod.object({
    optimization: myzod.lazy(() => ScooterOptimizationInputSchema().optional().nullable()),
    reluctance: myzod.number().optional().nullable(),
    rental: myzod.lazy(() => ScooterRentalPreferencesInputSchema().optional().nullable()),
    speed: myzod.number().optional().nullable()
  })
}

export function ScooterRentalPreferencesInputSchema(): myzod.Type<ScooterRentalPreferencesInput> {
  return myzod.object({
    allowedNetworks: myzod.array(myzod.string()).optional().nullable(),
    bannedNetworks: myzod.array(myzod.string()).optional().nullable(),
    destinationScooterPolicy: myzod.lazy(() => DestinationScooterPolicyInputSchema().optional().nullable())
  })
}

export function StopSchema(): myzod.Type<Stop> {
  return myzod.object({
    __typename: myzod.literal('Stop').optional(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    cluster: ClusterSchema().optional().nullable(),
    code: myzod.string().optional().nullable(),
    desc: myzod.string().optional().nullable(),
    direction: myzod.string().optional().nullable(),
    geometries: StopGeometriesSchema().optional().nullable(),
    gtfsId: myzod.string(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    locationType: LocationTypeSchema.optional().nullable(),
    lon: myzod.number().optional().nullable(),
    name: myzod.string(),
    parentStation: StopSchema().optional().nullable(),
    patterns: myzod.array(PatternSchema().nullable()).optional().nullable(),
    platformCode: myzod.string().optional().nullable(),
    routes: myzod.array(RouteSchema()).optional().nullable(),
    stopTimesForPattern: myzod.array(StoptimeSchema().nullable()).optional().nullable(),
    stops: myzod.array(StopSchema().nullable()).optional().nullable(),
    stoptimesForPatterns: myzod.array(StoptimesInPatternSchema().nullable()).optional().nullable(),
    stoptimesForServiceDate: myzod.array(StoptimesInPatternSchema().nullable()).optional().nullable(),
    stoptimesWithoutPatterns: myzod.array(StoptimeSchema().nullable()).optional().nullable(),
    timezone: myzod.string().optional().nullable(),
    transfers: myzod.array(StopAtDistanceSchema().nullable()).optional().nullable(),
    url: myzod.string().optional().nullable(),
    vehicleMode: ModeSchema.optional().nullable(),
    vehicleType: myzod.number().optional().nullable(),
    wheelchairBoarding: WheelchairBoardingSchema.optional().nullable(),
    zoneId: myzod.string().optional().nullable()
  })
}

export function StopAlertsArgsSchema(): myzod.Type<StopAlertsArgs> {
  return myzod.object({
    types: myzod.array(StopAlertTypeSchema.nullable()).optional().nullable()
  })
}

export function StopDescArgsSchema(): myzod.Type<StopDescArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function StopNameArgsSchema(): myzod.Type<StopNameArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function StopStopTimesForPatternArgsSchema(): myzod.Type<StopStopTimesForPatternArgs> {
  return myzod.object({
    id: myzod.string(),
    numberOfDepartures: myzod.number().default(2).optional().nullable(),
    omitCanceled: myzod.boolean().default(true).optional().nullable(),
    omitNonPickups: myzod.boolean().default(false).optional().nullable(),
    startTime: myzod.number().default(0).optional().nullable(),
    timeRange: myzod.number().default(86400).optional().nullable()
  })
}

export function StopStoptimesForPatternsArgsSchema(): myzod.Type<StopStoptimesForPatternsArgs> {
  return myzod.object({
    numberOfDepartures: myzod.number().default(5).optional().nullable(),
    omitCanceled: myzod.boolean().default(true).optional().nullable(),
    omitNonPickups: myzod.boolean().default(false).optional().nullable(),
    startTime: myzod.number().default(0).optional().nullable(),
    timeRange: myzod.number().default(86400).optional().nullable()
  })
}

export function StopStoptimesForServiceDateArgsSchema(): myzod.Type<StopStoptimesForServiceDateArgs> {
  return myzod.object({
    date: myzod.string().optional().nullable(),
    omitCanceled: myzod.boolean().default(false).optional().nullable(),
    omitNonPickups: myzod.boolean().default(false).optional().nullable()
  })
}

export function StopStoptimesWithoutPatternsArgsSchema(): myzod.Type<StopStoptimesWithoutPatternsArgs> {
  return myzod.object({
    numberOfDepartures: myzod.number().default(5).optional().nullable(),
    omitCanceled: myzod.boolean().default(true).optional().nullable(),
    omitNonPickups: myzod.boolean().default(false).optional().nullable(),
    startTime: myzod.number().default(0).optional().nullable(),
    timeRange: myzod.number().default(86400).optional().nullable()
  })
}

export function StopTransfersArgsSchema(): myzod.Type<StopTransfersArgs> {
  return myzod.object({
    maxDistance: myzod.number().optional().nullable()
  })
}

export function StopUrlArgsSchema(): myzod.Type<StopUrlArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function StopGeometriesSchema(): myzod.Type<StopGeometries> {
  return myzod.object({
    __typename: myzod.literal('StopGeometries').optional(),
    geoJson: definedNonNullAnySchema.optional().nullable(),
    googleEncoded: myzod.array(GeometrySchema().nullable()).optional().nullable()
  })
}

export function StopOnRouteSchema(): myzod.Type<StopOnRoute> {
  return myzod.object({
    __typename: myzod.literal('StopOnRoute').optional(),
    route: RouteSchema(),
    stop: StopSchema()
  })
}

export function StopOnTripSchema(): myzod.Type<StopOnTrip> {
  return myzod.object({
    __typename: myzod.literal('StopOnTrip').optional(),
    stop: StopSchema(),
    trip: TripSchema()
  })
}

export function StopPositionSchema() {
  return myzod.union([PositionAtStopSchema(), PositionBetweenStopsSchema()])
}

export function StopRelationshipSchema(): myzod.Type<StopRelationship> {
  return myzod.object({
    __typename: myzod.literal('StopRelationship').optional(),
    status: VehicleStopStatusSchema,
    stop: StopSchema()
  })
}

export function StoptimeSchema(): myzod.Type<Stoptime> {
  return myzod.object({
    __typename: myzod.literal('Stoptime').optional(),
    arrivalDelay: myzod.number().optional().nullable(),
    departureDelay: myzod.number().optional().nullable(),
    dropoffType: PickupDropoffTypeSchema.optional().nullable(),
    headsign: myzod.string().optional().nullable(),
    pickupType: PickupDropoffTypeSchema.optional().nullable(),
    realtime: myzod.boolean().optional().nullable(),
    realtimeArrival: myzod.number().optional().nullable(),
    realtimeDeparture: myzod.number().optional().nullable(),
    realtimeState: RealtimeStateSchema.optional().nullable(),
    scheduledArrival: myzod.number().optional().nullable(),
    scheduledDeparture: myzod.number().optional().nullable(),
    serviceDay: myzod.number().optional().nullable(),
    stop: StopSchema().optional().nullable(),
    stopPosition: myzod.number().optional().nullable(),
    timepoint: myzod.boolean().optional().nullable(),
    trip: TripSchema().optional().nullable()
  })
}

export function StoptimeHeadsignArgsSchema(): myzod.Type<StoptimeHeadsignArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function StoptimesInPatternSchema(): myzod.Type<StoptimesInPattern> {
  return myzod.object({
    __typename: myzod.literal('StoptimesInPattern').optional(),
    pattern: PatternSchema().optional().nullable(),
    stoptimes: myzod.array(StoptimeSchema().nullable()).optional().nullable()
  })
}

export function SystemNoticeSchema(): myzod.Type<SystemNotice> {
  return myzod.object({
    __typename: myzod.literal('SystemNotice').optional(),
    tag: myzod.string().optional().nullable(),
    text: myzod.string().optional().nullable()
  })
}

export function TicketTypeSchema(): myzod.Type<TicketType> {
  return myzod.object({
    __typename: myzod.literal('TicketType').optional(),
    currency: myzod.string().optional().nullable(),
    fareId: myzod.string(),
    id: myzod.string(),
    price: myzod.number().optional().nullable(),
    zones: myzod.array(myzod.string()).optional().nullable()
  })
}

export function TimetablePreferencesInputSchema(): myzod.Type<TimetablePreferencesInput> {
  return myzod.object({
    excludeRealTimeUpdates: myzod.boolean().optional().nullable(),
    includePlannedCancellations: myzod.boolean().optional().nullable(),
    includeRealTimeCancellations: myzod.boolean().optional().nullable()
  })
}

export function TransferPreferencesInputSchema(): myzod.Type<TransferPreferencesInput> {
  return myzod.object({
    cost: myzod.number().optional().nullable(),
    maximumAdditionalTransfers: myzod.number().optional().nullable(),
    maximumTransfers: myzod.number().optional().nullable(),
    slack: myzod.string().optional().nullable()
  })
}

export function TransitModePreferenceCostInputSchema(): myzod.Type<TransitModePreferenceCostInput> {
  return myzod.object({
    reluctance: myzod.number()
  })
}

export function TransitPreferencesInputSchema(): myzod.Type<TransitPreferencesInput> {
  return myzod.object({
    alight: myzod.lazy(() => AlightPreferencesInputSchema().optional().nullable()),
    board: myzod.lazy(() => BoardPreferencesInputSchema().optional().nullable()),
    timetable: myzod.lazy(() => TimetablePreferencesInputSchema().optional().nullable()),
    transfer: myzod.lazy(() => TransferPreferencesInputSchema().optional().nullable())
  })
}

export function TranslatedStringSchema(): myzod.Type<TranslatedString> {
  return myzod.object({
    __typename: myzod.literal('TranslatedString').optional(),
    language: myzod.string().optional().nullable(),
    text: myzod.string().optional().nullable()
  })
}

export function TransportModeSchema(): myzod.Type<TransportMode> {
  return myzod.object({
    mode: ModeSchema,
    qualifier: QualifierSchema.optional().nullable()
  })
}

export function TriangleCyclingFactorsInputSchema(): myzod.Type<TriangleCyclingFactorsInput> {
  return myzod.object({
    flatness: myzod.number(),
    safety: myzod.number(),
    time: myzod.number()
  })
}

export function TriangleScooterFactorsInputSchema(): myzod.Type<TriangleScooterFactorsInput> {
  return myzod.object({
    flatness: myzod.number(),
    safety: myzod.number(),
    time: myzod.number()
  })
}

export function TripSchema(): myzod.Type<Trip> {
  return myzod.object({
    __typename: myzod.literal('Trip').optional(),
    activeDates: myzod.array(myzod.string().nullable()).optional().nullable(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    arrivalStoptime: StoptimeSchema().optional().nullable(),
    bikesAllowed: BikesAllowedSchema.optional().nullable(),
    blockId: myzod.string().optional().nullable(),
    departureStoptime: StoptimeSchema().optional().nullable(),
    directionId: myzod.string().optional().nullable(),
    geometry: myzod.array(myzod.array(myzod.number().nullable()).optional().nullable()).optional().nullable(),
    gtfsId: myzod.string(),
    id: myzod.string(),
    occupancy: TripOccupancySchema().optional().nullable(),
    pattern: PatternSchema().optional().nullable(),
    route: RouteSchema(),
    routeShortName: myzod.string().optional().nullable(),
    semanticHash: myzod.string(),
    serviceId: myzod.string().optional().nullable(),
    shapeId: myzod.string().optional().nullable(),
    stops: myzod.array(StopSchema()),
    stoptimes: myzod.array(StoptimeSchema().nullable()).optional().nullable(),
    stoptimesForDate: myzod.array(StoptimeSchema().nullable()).optional().nullable(),
    tripGeometry: GeometrySchema().optional().nullable(),
    tripHeadsign: myzod.string().optional().nullable(),
    tripShortName: myzod.string().optional().nullable(),
    wheelchairAccessible: WheelchairBoardingSchema.optional().nullable()
  })
}

export function TripAlertsArgsSchema(): myzod.Type<TripAlertsArgs> {
  return myzod.object({
    types: myzod.array(TripAlertTypeSchema.nullable()).optional().nullable()
  })
}

export function TripArrivalStoptimeArgsSchema(): myzod.Type<TripArrivalStoptimeArgs> {
  return myzod.object({
    serviceDate: myzod.string().optional().nullable()
  })
}

export function TripDepartureStoptimeArgsSchema(): myzod.Type<TripDepartureStoptimeArgs> {
  return myzod.object({
    serviceDate: myzod.string().optional().nullable()
  })
}

export function TripStoptimesForDateArgsSchema(): myzod.Type<TripStoptimesForDateArgs> {
  return myzod.object({
    serviceDate: myzod.string().optional().nullable()
  })
}

export function TripTripHeadsignArgsSchema(): myzod.Type<TripTripHeadsignArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function TripOccupancySchema(): myzod.Type<TripOccupancy> {
  return myzod.object({
    __typename: myzod.literal('TripOccupancy').optional(),
    occupancyStatus: OccupancyStatusSchema.optional().nullable()
  })
}

export function UnknownSchema(): myzod.Type<Unknown> {
  return myzod.object({
    __typename: myzod.literal('Unknown').optional(),
    description: myzod.string().optional().nullable()
  })
}

export function VehicleParkingSchema(): myzod.Type<VehicleParking> {
  return myzod.object({
    __typename: myzod.literal('VehicleParking').optional(),
    anyCarPlaces: myzod.boolean().optional().nullable(),
    availability: VehicleParkingSpacesSchema().optional().nullable(),
    bicyclePlaces: myzod.boolean().optional().nullable(),
    capacity: VehicleParkingSpacesSchema().optional().nullable(),
    carPlaces: myzod.boolean().optional().nullable(),
    detailsUrl: myzod.string().optional().nullable(),
    id: myzod.string(),
    imageUrl: myzod.string().optional().nullable(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    name: myzod.string(),
    note: myzod.string().optional().nullable(),
    openingHours: OpeningHoursSchema().optional().nullable(),
    realtime: myzod.boolean().optional().nullable(),
    state: VehicleParkingStateSchema.optional().nullable(),
    tags: myzod.array(myzod.string().nullable()).optional().nullable(),
    vehicleParkingId: myzod.string().optional().nullable(),
    wheelchairAccessibleCarPlaces: myzod.boolean().optional().nullable()
  })
}

export function VehicleParkingNameArgsSchema(): myzod.Type<VehicleParkingNameArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function VehicleParkingNoteArgsSchema(): myzod.Type<VehicleParkingNoteArgs> {
  return myzod.object({
    language: myzod.string().optional().nullable()
  })
}

export function VehicleParkingInputSchema(): myzod.Type<VehicleParkingInput> {
  return myzod.object({
    filters: myzod.array(ParkingFilterSchema().nullable()).optional().nullable(),
    preferred: myzod.array(ParkingFilterSchema().nullable()).optional().nullable(),
    unpreferredCost: myzod.number().optional().nullable()
  })
}

export function VehicleParkingSpacesSchema(): myzod.Type<VehicleParkingSpaces> {
  return myzod.object({
    __typename: myzod.literal('VehicleParkingSpaces').optional(),
    bicycleSpaces: myzod.number().optional().nullable(),
    carSpaces: myzod.number().optional().nullable(),
    wheelchairAccessibleCarSpaces: myzod.number().optional().nullable()
  })
}

export function VehiclePositionSchema(): myzod.Type<VehiclePosition> {
  return myzod.object({
    __typename: myzod.literal('VehiclePosition').optional(),
    heading: myzod.number().optional().nullable(),
    label: myzod.string().optional().nullable(),
    lastUpdated: myzod.number().optional().nullable(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    speed: myzod.number().optional().nullable(),
    stopRelationship: StopRelationshipSchema().optional().nullable(),
    trip: TripSchema(),
    vehicleId: myzod.string().optional().nullable()
  })
}

export function VehicleRentalNetworkSchema(): myzod.Type<VehicleRentalNetwork> {
  return myzod.object({
    __typename: myzod.literal('VehicleRentalNetwork').optional(),
    networkId: myzod.string(),
    url: myzod.string().optional().nullable()
  })
}

export function VehicleRentalStationSchema(): myzod.Type<VehicleRentalStation> {
  return myzod.object({
    __typename: myzod.literal('VehicleRentalStation').optional(),
    allowDropoff: myzod.boolean().optional().nullable(),
    allowDropoffNow: myzod.boolean().optional().nullable(),
    allowOverloading: myzod.boolean().optional().nullable(),
    allowPickup: myzod.boolean().optional().nullable(),
    allowPickupNow: myzod.boolean().optional().nullable(),
    availableSpaces: RentalVehicleEntityCountsSchema().optional().nullable(),
    availableVehicles: RentalVehicleEntityCountsSchema().optional().nullable(),
    capacity: myzod.number().optional().nullable(),
    id: myzod.string(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    name: myzod.string(),
    network: myzod.string().optional().nullable(),
    operative: myzod.boolean().optional().nullable(),
    realtime: myzod.boolean().optional().nullable(),
    rentalNetwork: VehicleRentalNetworkSchema(),
    rentalUris: VehicleRentalUrisSchema().optional().nullable(),
    spacesAvailable: myzod.number().optional().nullable(),
    stationId: myzod.string().optional().nullable(),
    vehiclesAvailable: myzod.number().optional().nullable()
  })
}

export function VehicleRentalUrisSchema(): myzod.Type<VehicleRentalUris> {
  return myzod.object({
    __typename: myzod.literal('VehicleRentalUris').optional(),
    android: myzod.string().optional().nullable(),
    ios: myzod.string().optional().nullable(),
    web: myzod.string().optional().nullable()
  })
}

export function WalkPreferencesInputSchema(): myzod.Type<WalkPreferencesInput> {
  return myzod.object({
    boardCost: myzod.number().optional().nullable(),
    reluctance: myzod.number().optional().nullable(),
    safetyFactor: myzod.number().optional().nullable(),
    speed: myzod.number().optional().nullable()
  })
}

export function WheelchairPreferencesInputSchema(): myzod.Type<WheelchairPreferencesInput> {
  return myzod.object({
    enabled: myzod.boolean().optional().nullable()
  })
}

export function DebugOutputSchema(): myzod.Type<DebugOutput> {
  return myzod.object({
    __typename: myzod.literal('debugOutput').optional(),
    pathCalculationTime: myzod.number().optional().nullable(),
    precalculationTime: myzod.number().optional().nullable(),
    renderingTime: myzod.number().optional().nullable(),
    timedOut: myzod.boolean().optional().nullable(),
    totalTime: myzod.number().optional().nullable()
  })
}

export function ElevationProfileComponentSchema(): myzod.Type<ElevationProfileComponent> {
  return myzod.object({
    __typename: myzod.literal('elevationProfileComponent').optional(),
    distance: myzod.number().optional().nullable(),
    elevation: myzod.number().optional().nullable()
  })
}

export function FareSchema(): myzod.Type<Fare> {
  return myzod.object({
    __typename: myzod.literal('fare').optional(),
    cents: myzod.number().optional().nullable(),
    components: myzod.array(FareComponentSchema().nullable()).optional().nullable(),
    currency: myzod.string().optional().nullable(),
    type: myzod.string().optional().nullable()
  })
}

export function FareComponentSchema(): myzod.Type<FareComponent> {
  return myzod.object({
    __typename: myzod.literal('fareComponent').optional(),
    cents: myzod.number().optional().nullable(),
    currency: myzod.string().optional().nullable(),
    fareId: myzod.string().optional().nullable(),
    routes: myzod.array(RouteSchema().nullable()).optional().nullable()
  })
}

export function PlaceAtDistanceSchema(): myzod.Type<PlaceAtDistance> {
  return myzod.object({
    __typename: myzod.literal('placeAtDistance').optional(),
    distance: myzod.number().optional().nullable(),
    id: myzod.string(),
    place: PlaceInterfaceSchema().optional().nullable()
  })
}

export function PlaceAtDistanceConnectionSchema(): myzod.Type<PlaceAtDistanceConnection> {
  return myzod.object({
    __typename: myzod.literal('placeAtDistanceConnection').optional(),
    edges: myzod.array(PlaceAtDistanceEdgeSchema().nullable()).optional().nullable(),
    pageInfo: PageInfoSchema()
  })
}

export function PlaceAtDistanceEdgeSchema(): myzod.Type<PlaceAtDistanceEdge> {
  return myzod.object({
    __typename: myzod.literal('placeAtDistanceEdge').optional(),
    cursor: myzod.string(),
    node: PlaceAtDistanceSchema().optional().nullable()
  })
}

export function ServiceTimeRangeSchema(): myzod.Type<ServiceTimeRange> {
  return myzod.object({
    __typename: myzod.literal('serviceTimeRange').optional(),
    end: myzod.number().optional().nullable(),
    start: myzod.number().optional().nullable()
  })
}

export function StepSchema(): myzod.Type<Step> {
  return myzod.object({
    __typename: myzod.literal('step').optional(),
    absoluteDirection: AbsoluteDirectionSchema.optional().nullable(),
    alerts: myzod.array(AlertSchema().nullable()).optional().nullable(),
    area: myzod.boolean().optional().nullable(),
    bogusName: myzod.boolean().optional().nullable(),
    distance: myzod.number().optional().nullable(),
    elevationProfile: myzod.array(ElevationProfileComponentSchema().nullable()).optional().nullable(),
    exit: myzod.string().optional().nullable(),
    lat: myzod.number().optional().nullable(),
    lon: myzod.number().optional().nullable(),
    relativeDirection: RelativeDirectionSchema.optional().nullable(),
    stayOn: myzod.boolean().optional().nullable(),
    streetName: myzod.string().optional().nullable(),
    walkingBike: myzod.boolean().optional().nullable()
  })
}

export function StopAtDistanceSchema(): myzod.Type<StopAtDistance> {
  return myzod.object({
    __typename: myzod.literal('stopAtDistance').optional(),
    distance: myzod.number().optional().nullable(),
    id: myzod.string(),
    stop: StopSchema().optional().nullable()
  })
}

export function StopAtDistanceConnectionSchema(): myzod.Type<StopAtDistanceConnection> {
  return myzod.object({
    __typename: myzod.literal('stopAtDistanceConnection').optional(),
    edges: myzod.array(StopAtDistanceEdgeSchema().nullable()).optional().nullable(),
    pageInfo: PageInfoSchema()
  })
}

export function StopAtDistanceEdgeSchema(): myzod.Type<StopAtDistanceEdge> {
  return myzod.object({
    __typename: myzod.literal('stopAtDistanceEdge').optional(),
    cursor: myzod.string(),
    node: StopAtDistanceSchema().optional().nullable()
  })
}
