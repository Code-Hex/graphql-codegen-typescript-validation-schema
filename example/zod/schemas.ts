import { z } from 'zod'
import { AbsoluteDirection, AccessibilityPreferencesInput, Agency, AgencyAlertsArgs, AgencyAlertType, Alert, AlertCauseType, AlertEffectType, AlertSeverityLevelType, AlightPreferencesInput, BicycleParkingPreferencesInput, BicyclePreferencesInput, BicycleRentalPreferencesInput, BicycleWalkPreferencesCostInput, BicycleWalkPreferencesInput, BikePark, BikeParkNameArgs, BikeRentalStation, BikeRentalStationUris, BikesAllowed, BoardPreferencesInput, BookingInfo, BookingTime, CarPark, CarParkNameArgs, CarParkingPreferencesInput, CarPreferencesInput, CarRentalPreferencesInput, Cluster, ContactInfo, Coordinate, Coordinates, Currency, CyclingOptimizationInput, CyclingOptimizationType, DefaultFareProduct, DepartureRow, DepartureRowStoptimesArgs, DestinationBicyclePolicyInput, DestinationScooterPolicyInput, Emissions, FareMedium, FareProduct, FareProductUse, Feed, FeedAlertsArgs, FeedAlertType, FeedPublisher, FilterPlaceType, FormFactor, Geometry, InputBanned, InputCoordinates, InputField, InputFilters, InputModeWeight, InputPreferred, InputTriangle, InputUnpreferred, Itinerary, ItineraryFilterDebugProfile, Leg, LegNextLegsArgs, LegTime, LocalDateRangeInput, LocalTimeSpan, LocalTimeSpanDate, LocationType, Mode, Money, Node, OccupancyStatus, OpeningHours, OpeningHoursDatesArgs, OptimizeType, PageInfo, ParkingFilter, ParkingFilterOperation, Pattern, PatternAlertsArgs, PatternTripsForDateArgs, PatternAlertType, PickupDropoffType, Place, PlaceInterface, Plan, PlanAccessMode, PlanConnection, PlanCoordinateInput, PlanDateTimeInput, PlanDirectMode, PlanEdge, PlanEgressMode, PlanItineraryFilterInput, PlanLabeledLocationInput, PlanLocationInput, PlanModesInput, PlanPageInfo, PlanPreferencesInput, PlanStopLocationInput, PlanStreetPreferencesInput, PlanTransferMode, PlanTransitModePreferenceInput, PlanTransitModesInput, PositionAtStop, PositionBetweenStops, PropulsionType, Qualifier, QueryType, QueryTypeAgencyArgs, QueryTypeAlertsArgs, QueryTypeBikeParkArgs, QueryTypeBikeRentalStationArgs, QueryTypeBikeRentalStationsArgs, QueryTypeCancelledTripTimesArgs, QueryTypeCarParkArgs, QueryTypeCarParksArgs, QueryTypeClusterArgs, QueryTypeDepartureRowArgs, QueryTypeFuzzyTripArgs, QueryTypeNearestArgs, QueryTypeNodeArgs, QueryTypePatternArgs, QueryTypePlanArgs, QueryTypePlanConnectionArgs, QueryTypeRentalVehicleArgs, QueryTypeRentalVehiclesArgs, QueryTypeRouteArgs, QueryTypeRoutesArgs, QueryTypeStationArgs, QueryTypeStationsArgs, QueryTypeStopArgs, QueryTypeStopsArgs, QueryTypeStopsByBboxArgs, QueryTypeStopsByRadiusArgs, QueryTypeTripArgs, QueryTypeTripsArgs, QueryTypeVehicleParkingArgs, QueryTypeVehicleParkingsArgs, QueryTypeVehicleRentalStationArgs, QueryTypeVehicleRentalStationsArgs, RealTimeEstimate, RealtimeState, RelativeDirection, RentalVehicle, RentalVehicleEntityCounts, RentalVehicleType, RentalVehicleTypeCount, RideHailingEstimate, RideHailingProvider, RiderCategory, Route, RouteAlertsArgs, RouteLongNameArgs, RoutePatternsArgs, RouteAlertType, RouteType, RoutingError, RoutingErrorCode, ScooterOptimizationInput, ScooterOptimizationType, ScooterPreferencesInput, ScooterRentalPreferencesInput, Stop, StopAlertsArgs, StopDescArgs, StopNameArgs, StopStopTimesForPatternArgs, StopStoptimesForPatternsArgs, StopStoptimesForServiceDateArgs, StopStoptimesWithoutPatternsArgs, StopTransfersArgs, StopUrlArgs, StopAlertType, StopGeometries, StopOnRoute, StopOnTrip, StopRelationship, Stoptime, StoptimeHeadsignArgs, StoptimesInPattern, SystemNotice, TicketType, TimetablePreferencesInput, TransferPreferencesInput, TransitMode, TransitModePreferenceCostInput, TransitPreferencesInput, TranslatedString, TransportMode, TriangleCyclingFactorsInput, TriangleScooterFactorsInput, Trip, TripAlertsArgs, TripArrivalStoptimeArgs, TripDepartureStoptimeArgs, TripStoptimesForDateArgs, TripTripHeadsignArgs, TripAlertType, TripOccupancy, Unknown, VehicleParking, VehicleParkingNameArgs, VehicleParkingNoteArgs, VehicleParkingInput, VehicleParkingSpaces, VehicleParkingState, VehiclePosition, VehicleRentalNetwork, VehicleRentalStation, VehicleRentalUris, VehicleStopStatus, VertexType, WalkPreferencesInput, WheelchairBoarding, WheelchairPreferencesInput, DebugOutput, ElevationProfileComponent, Fare, FareComponent, PlaceAtDistance, PlaceAtDistanceConnection, PlaceAtDistanceEdge, ServiceTimeRange, Step, StopAtDistance, StopAtDistanceConnection, StopAtDistanceEdge } from '../types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const AbsoluteDirectionSchema = z.nativeEnum(AbsoluteDirection);

export const AgencyAlertTypeSchema = z.nativeEnum(AgencyAlertType);

export const AlertCauseTypeSchema = z.nativeEnum(AlertCauseType);

export const AlertEffectTypeSchema = z.nativeEnum(AlertEffectType);

export const AlertSeverityLevelTypeSchema = z.nativeEnum(AlertSeverityLevelType);

export const BikesAllowedSchema = z.nativeEnum(BikesAllowed);

export const CyclingOptimizationTypeSchema = z.nativeEnum(CyclingOptimizationType);

export const FeedAlertTypeSchema = z.nativeEnum(FeedAlertType);

export const FilterPlaceTypeSchema = z.nativeEnum(FilterPlaceType);

export const FormFactorSchema = z.nativeEnum(FormFactor);

export const InputFieldSchema = z.nativeEnum(InputField);

export const ItineraryFilterDebugProfileSchema = z.nativeEnum(ItineraryFilterDebugProfile);

export const LocationTypeSchema = z.nativeEnum(LocationType);

export const ModeSchema = z.nativeEnum(Mode);

export const OccupancyStatusSchema = z.nativeEnum(OccupancyStatus);

export const OptimizeTypeSchema = z.nativeEnum(OptimizeType);

export const PatternAlertTypeSchema = z.nativeEnum(PatternAlertType);

export const PickupDropoffTypeSchema = z.nativeEnum(PickupDropoffType);

export const PlanAccessModeSchema = z.nativeEnum(PlanAccessMode);

export const PlanDirectModeSchema = z.nativeEnum(PlanDirectMode);

export const PlanEgressModeSchema = z.nativeEnum(PlanEgressMode);

export const PlanTransferModeSchema = z.nativeEnum(PlanTransferMode);

export const PropulsionTypeSchema = z.nativeEnum(PropulsionType);

export const QualifierSchema = z.nativeEnum(Qualifier);

export const RealtimeStateSchema = z.nativeEnum(RealtimeState);

export const RelativeDirectionSchema = z.nativeEnum(RelativeDirection);

export const RouteAlertTypeSchema = z.nativeEnum(RouteAlertType);

export const RoutingErrorCodeSchema = z.nativeEnum(RoutingErrorCode);

export const ScooterOptimizationTypeSchema = z.nativeEnum(ScooterOptimizationType);

export const StopAlertTypeSchema = z.nativeEnum(StopAlertType);

export const TransitModeSchema = z.nativeEnum(TransitMode);

export const TripAlertTypeSchema = z.nativeEnum(TripAlertType);

export const VehicleParkingStateSchema = z.nativeEnum(VehicleParkingState);

export const VehicleStopStatusSchema = z.nativeEnum(VehicleStopStatus);

export const VertexTypeSchema = z.nativeEnum(VertexType);

export const WheelchairBoardingSchema = z.nativeEnum(WheelchairBoarding);

export function AccessibilityPreferencesInputSchema(): z.ZodObject<Properties<AccessibilityPreferencesInput>> {
  return z.object({
    wheelchair: z.lazy(() => WheelchairPreferencesInputSchema().nullish())
  })
}

export function AgencySchema(): z.ZodObject<Properties<Agency>> {
  return z.object({
    __typename: z.literal('Agency').optional(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    fareUrl: z.string().nullish(),
    gtfsId: z.string(),
    id: z.string(),
    lang: z.string().nullish(),
    name: z.string(),
    phone: z.string().nullish(),
    routes: z.array(RouteSchema().nullable()).nullish(),
    timezone: z.string(),
    url: z.string()
  })
}

export function AgencyAlertsArgsSchema(): z.ZodObject<Properties<AgencyAlertsArgs>> {
  return z.object({
    types: z.array(AgencyAlertTypeSchema.nullable()).nullish()
  })
}

export function AlertSchema(): z.ZodObject<Properties<Alert>> {
  return z.object({
    __typename: z.literal('Alert').optional(),
    agency: AgencySchema().nullish(),
    alertCause: AlertCauseTypeSchema.nullish(),
    alertDescriptionText: z.string(),
    alertDescriptionTextTranslations: z.array(TranslatedStringSchema()),
    alertEffect: AlertEffectTypeSchema.nullish(),
    alertHash: z.number().nullish(),
    alertHeaderText: z.string().nullish(),
    alertHeaderTextTranslations: z.array(TranslatedStringSchema()),
    alertSeverityLevel: AlertSeverityLevelTypeSchema.nullish(),
    alertUrl: z.string().nullish(),
    alertUrlTranslations: z.array(TranslatedStringSchema()),
    effectiveEndDate: z.number().nullish(),
    effectiveStartDate: z.number().nullish(),
    entities: z.array(AlertEntitySchema().nullable()).nullish(),
    feed: z.string().nullish(),
    id: z.string(),
    patterns: z.array(PatternSchema().nullable()).nullish(),
    route: RouteSchema().nullish(),
    stop: StopSchema().nullish(),
    trip: TripSchema().nullish()
  })
}

export function AlertEntitySchema() {
  return z.union([AgencySchema(), PatternSchema(), RouteSchema(), RouteTypeSchema(), StopSchema(), StopOnRouteSchema(), StopOnTripSchema(), TripSchema(), UnknownSchema()])
}

export function AlightPreferencesInputSchema(): z.ZodObject<Properties<AlightPreferencesInput>> {
  return z.object({
    slack: z.string().nullish()
  })
}

export function BicycleParkingPreferencesInputSchema(): z.ZodObject<Properties<BicycleParkingPreferencesInput>> {
  return z.object({
    filters: z.array(ParkingFilterSchema()).nullish(),
    preferred: z.array(ParkingFilterSchema()).nullish(),
    unpreferredCost: z.number().nullish()
  })
}

export function BicyclePreferencesInputSchema(): z.ZodObject<Properties<BicyclePreferencesInput>> {
  return z.object({
    boardCost: z.number().nullish(),
    optimization: z.lazy(() => CyclingOptimizationInputSchema().nullish()),
    parking: z.lazy(() => BicycleParkingPreferencesInputSchema().nullish()),
    reluctance: z.number().nullish(),
    rental: z.lazy(() => BicycleRentalPreferencesInputSchema().nullish()),
    speed: z.number().nullish(),
    walk: z.lazy(() => BicycleWalkPreferencesInputSchema().nullish())
  })
}

export function BicycleRentalPreferencesInputSchema(): z.ZodObject<Properties<BicycleRentalPreferencesInput>> {
  return z.object({
    allowedNetworks: z.array(z.string()).nullish(),
    bannedNetworks: z.array(z.string()).nullish(),
    destinationBicyclePolicy: z.lazy(() => DestinationBicyclePolicyInputSchema().nullish())
  })
}

export function BicycleWalkPreferencesCostInputSchema(): z.ZodObject<Properties<BicycleWalkPreferencesCostInput>> {
  return z.object({
    mountDismountCost: z.number().nullish(),
    reluctance: z.number().nullish()
  })
}

export function BicycleWalkPreferencesInputSchema(): z.ZodObject<Properties<BicycleWalkPreferencesInput>> {
  return z.object({
    cost: z.lazy(() => BicycleWalkPreferencesCostInputSchema().nullish()),
    mountDismountTime: z.string().nullish(),
    speed: z.number().nullish()
  })
}

export function BikeParkSchema(): z.ZodObject<Properties<BikePark>> {
  return z.object({
    __typename: z.literal('BikePark').optional(),
    bikeParkId: z.string().nullish(),
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    name: z.string(),
    openingHours: OpeningHoursSchema().nullish(),
    realtime: z.boolean().nullish(),
    spacesAvailable: z.number().nullish(),
    tags: z.array(z.string().nullable()).nullish()
  })
}

export function BikeParkNameArgsSchema(): z.ZodObject<Properties<BikeParkNameArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function BikeRentalStationSchema(): z.ZodObject<Properties<BikeRentalStation>> {
  return z.object({
    __typename: z.literal('BikeRentalStation').optional(),
    allowDropoff: z.boolean().nullish(),
    allowDropoffNow: z.boolean().nullish(),
    allowOverloading: z.boolean().nullish(),
    allowPickup: z.boolean().nullish(),
    allowPickupNow: z.boolean().nullish(),
    bikesAvailable: z.number().nullish(),
    capacity: z.number().nullish(),
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    name: z.string(),
    networks: z.array(z.string().nullable()).nullish(),
    operative: z.boolean().nullish(),
    realtime: z.boolean().nullish(),
    rentalUris: BikeRentalStationUrisSchema().nullish(),
    spacesAvailable: z.number().nullish(),
    state: z.string().nullish(),
    stationId: z.string().nullish()
  })
}

export function BikeRentalStationUrisSchema(): z.ZodObject<Properties<BikeRentalStationUris>> {
  return z.object({
    __typename: z.literal('BikeRentalStationUris').optional(),
    android: z.string().nullish(),
    ios: z.string().nullish(),
    web: z.string().nullish()
  })
}

export function BoardPreferencesInputSchema(): z.ZodObject<Properties<BoardPreferencesInput>> {
  return z.object({
    slack: z.string().nullish(),
    waitReluctance: z.number().nullish()
  })
}

export function BookingInfoSchema(): z.ZodObject<Properties<BookingInfo>> {
  return z.object({
    __typename: z.literal('BookingInfo').optional(),
    contactInfo: ContactInfoSchema().nullish(),
    dropOffMessage: z.string().nullish(),
    earliestBookingTime: BookingTimeSchema().nullish(),
    latestBookingTime: BookingTimeSchema().nullish(),
    maximumBookingNoticeSeconds: z.number().nullish(),
    message: z.string().nullish(),
    minimumBookingNoticeSeconds: z.number().nullish(),
    pickupMessage: z.string().nullish()
  })
}

export function BookingTimeSchema(): z.ZodObject<Properties<BookingTime>> {
  return z.object({
    __typename: z.literal('BookingTime').optional(),
    daysPrior: z.number().nullish(),
    time: z.string().nullish()
  })
}

export function CarParkSchema(): z.ZodObject<Properties<CarPark>> {
  return z.object({
    __typename: z.literal('CarPark').optional(),
    carParkId: z.string().nullish(),
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    maxCapacity: z.number().nullish(),
    name: z.string(),
    openingHours: OpeningHoursSchema().nullish(),
    realtime: z.boolean().nullish(),
    spacesAvailable: z.number().nullish(),
    tags: z.array(z.string().nullable()).nullish()
  })
}

export function CarParkNameArgsSchema(): z.ZodObject<Properties<CarParkNameArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function CarParkingPreferencesInputSchema(): z.ZodObject<Properties<CarParkingPreferencesInput>> {
  return z.object({
    filters: z.array(ParkingFilterSchema()).nullish(),
    preferred: z.array(ParkingFilterSchema()).nullish(),
    unpreferredCost: z.number().nullish()
  })
}

export function CarPreferencesInputSchema(): z.ZodObject<Properties<CarPreferencesInput>> {
  return z.object({
    parking: z.lazy(() => CarParkingPreferencesInputSchema().nullish()),
    reluctance: z.number().nullish(),
    rental: z.lazy(() => CarRentalPreferencesInputSchema().nullish())
  })
}

export function CarRentalPreferencesInputSchema(): z.ZodObject<Properties<CarRentalPreferencesInput>> {
  return z.object({
    allowedNetworks: z.array(z.string()).nullish(),
    bannedNetworks: z.array(z.string()).nullish()
  })
}

export function ClusterSchema(): z.ZodObject<Properties<Cluster>> {
  return z.object({
    __typename: z.literal('Cluster').optional(),
    gtfsId: z.string(),
    id: z.string(),
    lat: z.number(),
    lon: z.number(),
    name: z.string(),
    stops: z.array(StopSchema()).nullish()
  })
}

export function ContactInfoSchema(): z.ZodObject<Properties<ContactInfo>> {
  return z.object({
    __typename: z.literal('ContactInfo').optional(),
    additionalDetails: z.string().nullish(),
    bookingUrl: z.string().nullish(),
    contactPerson: z.string().nullish(),
    eMail: z.string().nullish(),
    faxNumber: z.string().nullish(),
    infoUrl: z.string().nullish(),
    phoneNumber: z.string().nullish()
  })
}

export function CoordinateSchema(): z.ZodObject<Properties<Coordinate>> {
  return z.object({
    __typename: z.literal('Coordinate').optional(),
    latitude: z.number(),
    longitude: z.number()
  })
}

export function CoordinatesSchema(): z.ZodObject<Properties<Coordinates>> {
  return z.object({
    __typename: z.literal('Coordinates').optional(),
    lat: z.number().nullish(),
    lon: z.number().nullish()
  })
}

export function CurrencySchema(): z.ZodObject<Properties<Currency>> {
  return z.object({
    __typename: z.literal('Currency').optional(),
    code: z.string(),
    digits: z.number()
  })
}

export function CyclingOptimizationInputSchema(): z.ZodSchema<CyclingOptimizationInput> {
  return z.discriminatedUnion("__type", [
    z.object({
        __type: z.literal("triangle"),
        triangle: TriangleCyclingFactorsInputSchema()
      }),
  z.object({
        __type: z.literal("type"),
        type: CyclingOptimizationTypeSchema
      })
  ]);
}

export function DefaultFareProductSchema(): z.ZodObject<Properties<DefaultFareProduct>> {
  return z.object({
    __typename: z.literal('DefaultFareProduct').optional(),
    id: z.string(),
    medium: FareMediumSchema().nullish(),
    name: z.string(),
    price: MoneySchema(),
    riderCategory: RiderCategorySchema().nullish()
  })
}

export function DepartureRowSchema(): z.ZodObject<Properties<DepartureRow>> {
  return z.object({
    __typename: z.literal('DepartureRow').optional(),
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    pattern: PatternSchema().nullish(),
    stop: StopSchema().nullish(),
    stoptimes: z.array(StoptimeSchema().nullable()).nullish()
  })
}

export function DepartureRowStoptimesArgsSchema(): z.ZodObject<Properties<DepartureRowStoptimesArgs>> {
  return z.object({
    numberOfDepartures: z.number().default(1).nullish(),
    omitCanceled: z.boolean().default(true).nullish(),
    omitNonPickups: z.boolean().default(false).nullish(),
    startTime: z.number().default(0).nullish(),
    timeRange: z.number().default(86400).nullish()
  })
}

export function DestinationBicyclePolicyInputSchema(): z.ZodObject<Properties<DestinationBicyclePolicyInput>> {
  return z.object({
    allowKeeping: z.boolean().nullish(),
    keepingCost: z.number().nullish()
  })
}

export function DestinationScooterPolicyInputSchema(): z.ZodObject<Properties<DestinationScooterPolicyInput>> {
  return z.object({
    allowKeeping: z.boolean().nullish(),
    keepingCost: z.number().nullish()
  })
}

export function EmissionsSchema(): z.ZodObject<Properties<Emissions>> {
  return z.object({
    __typename: z.literal('Emissions').optional(),
    co2: z.number().nullish()
  })
}

export function FareMediumSchema(): z.ZodObject<Properties<FareMedium>> {
  return z.object({
    __typename: z.literal('FareMedium').optional(),
    id: z.string(),
    name: z.string().nullish()
  })
}

export function FareProductSchema(): z.ZodObject<Properties<FareProduct>> {
  return z.object({
    id: z.string(),
    medium: FareMediumSchema().nullish(),
    name: z.string(),
    riderCategory: RiderCategorySchema().nullish()
  })
}

export function FareProductUseSchema(): z.ZodObject<Properties<FareProductUse>> {
  return z.object({
    __typename: z.literal('FareProductUse').optional(),
    id: z.string(),
    product: FareProductSchema().nullish()
  })
}

export function FeedSchema(): z.ZodObject<Properties<Feed>> {
  return z.object({
    __typename: z.literal('Feed').optional(),
    agencies: z.array(AgencySchema().nullable()).nullish(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    feedId: z.string(),
    publisher: FeedPublisherSchema().nullish()
  })
}

export function FeedAlertsArgsSchema(): z.ZodObject<Properties<FeedAlertsArgs>> {
  return z.object({
    types: z.array(FeedAlertTypeSchema).nullish()
  })
}

export function FeedPublisherSchema(): z.ZodObject<Properties<FeedPublisher>> {
  return z.object({
    __typename: z.literal('FeedPublisher').optional(),
    name: z.string(),
    url: z.string()
  })
}

export function GeometrySchema(): z.ZodObject<Properties<Geometry>> {
  return z.object({
    __typename: z.literal('Geometry').optional(),
    length: z.number().nullish(),
    points: z.string().nullish()
  })
}

export function InputBannedSchema(): z.ZodObject<Properties<InputBanned>> {
  return z.object({
    agencies: z.string().nullish(),
    routes: z.string().nullish(),
    stops: z.string().nullish(),
    stopsHard: z.string().nullish(),
    trips: z.string().nullish()
  })
}

export function InputCoordinatesSchema(): z.ZodObject<Properties<InputCoordinates>> {
  return z.object({
    address: z.string().nullish(),
    lat: z.number(),
    locationSlack: z.number().nullish(),
    lon: z.number()
  })
}

export function InputFiltersSchema(): z.ZodObject<Properties<InputFilters>> {
  return z.object({
    bikeParks: z.array(z.string().nullable()).nullish(),
    bikeRentalStations: z.array(z.string().nullable()).nullish(),
    carParks: z.array(z.string().nullable()).nullish(),
    routes: z.array(z.string().nullable()).nullish(),
    stations: z.array(z.string().nullable()).nullish(),
    stops: z.array(z.string().nullable()).nullish()
  })
}

export function InputModeWeightSchema(): z.ZodObject<Properties<InputModeWeight>> {
  return z.object({
    AIRPLANE: z.number().nullish(),
    BUS: z.number().nullish(),
    CABLE_CAR: z.number().nullish(),
    FERRY: z.number().nullish(),
    FUNICULAR: z.number().nullish(),
    GONDOLA: z.number().nullish(),
    RAIL: z.number().nullish(),
    SUBWAY: z.number().nullish(),
    TRAM: z.number().nullish()
  })
}

export function InputPreferredSchema(): z.ZodObject<Properties<InputPreferred>> {
  return z.object({
    agencies: z.string().nullish(),
    otherThanPreferredRoutesPenalty: z.number().nullish(),
    routes: z.string().nullish()
  })
}

export function InputTriangleSchema(): z.ZodObject<Properties<InputTriangle>> {
  return z.object({
    safetyFactor: z.number().nullish(),
    slopeFactor: z.number().nullish(),
    timeFactor: z.number().nullish()
  })
}

export function InputUnpreferredSchema(): z.ZodObject<Properties<InputUnpreferred>> {
  return z.object({
    agencies: z.string().nullish(),
    routes: z.string().nullish(),
    unpreferredCost: z.string().nullish(),
    useUnpreferredRoutesPenalty: z.number().nullish()
  })
}

export function ItinerarySchema(): z.ZodObject<Properties<Itinerary>> {
  return z.object({
    __typename: z.literal('Itinerary').optional(),
    accessibilityScore: z.number().nullish(),
    arrivedAtDestinationWithRentedBicycle: z.boolean().nullish(),
    duration: z.number().nullish(),
    elevationGained: z.number().nullish(),
    elevationLost: z.number().nullish(),
    emissionsPerPerson: EmissionsSchema().nullish(),
    end: z.string().nullish(),
    endTime: z.number().nullish(),
    fares: z.array(FareSchema().nullable()).nullish(),
    generalizedCost: z.number().nullish(),
    legs: z.array(LegSchema().nullable()),
    numberOfTransfers: z.number(),
    start: z.string().nullish(),
    startTime: z.number().nullish(),
    systemNotices: z.array(SystemNoticeSchema().nullable()),
    waitingTime: z.number().nullish(),
    walkDistance: z.number().nullish(),
    walkTime: z.number().nullish()
  })
}

export function LegSchema(): z.ZodObject<Properties<Leg>> {
  return z.object({
    __typename: z.literal('Leg').optional(),
    accessibilityScore: z.number().nullish(),
    agency: AgencySchema().nullish(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    arrivalDelay: z.number().nullish(),
    departureDelay: z.number().nullish(),
    distance: z.number().nullish(),
    dropOffBookingInfo: BookingInfoSchema().nullish(),
    dropoffType: PickupDropoffTypeSchema.nullish(),
    duration: z.number().nullish(),
    end: LegTimeSchema(),
    endTime: z.number().nullish(),
    fareProducts: z.array(FareProductUseSchema().nullable()).nullish(),
    from: PlaceSchema(),
    generalizedCost: z.number().nullish(),
    headsign: z.string().nullish(),
    interlineWithPreviousLeg: z.boolean().nullish(),
    intermediatePlace: z.boolean().nullish(),
    intermediatePlaces: z.array(PlaceSchema().nullable()).nullish(),
    intermediateStops: z.array(StopSchema().nullable()).nullish(),
    legGeometry: GeometrySchema().nullish(),
    mode: ModeSchema.nullish(),
    nextLegs: z.array(LegSchema()).nullish(),
    pickupBookingInfo: BookingInfoSchema().nullish(),
    pickupType: PickupDropoffTypeSchema.nullish(),
    realTime: z.boolean().nullish(),
    realtimeState: RealtimeStateSchema.nullish(),
    rentedBike: z.boolean().nullish(),
    rideHailingEstimate: RideHailingEstimateSchema().nullish(),
    route: RouteSchema().nullish(),
    serviceDate: z.string().nullish(),
    start: LegTimeSchema(),
    startTime: z.number().nullish(),
    steps: z.array(StepSchema().nullable()).nullish(),
    to: PlaceSchema(),
    transitLeg: z.boolean().nullish(),
    trip: TripSchema().nullish(),
    walkingBike: z.boolean().nullish()
  })
}

export function LegNextLegsArgsSchema(): z.ZodObject<Properties<LegNextLegsArgs>> {
  return z.object({
    destinationModesWithParentStation: z.array(TransitModeSchema).nullish(),
    numberOfLegs: z.number(),
    originModesWithParentStation: z.array(TransitModeSchema).nullish()
  })
}

export function LegTimeSchema(): z.ZodObject<Properties<LegTime>> {
  return z.object({
    __typename: z.literal('LegTime').optional(),
    estimated: RealTimeEstimateSchema().nullish(),
    scheduledTime: z.string()
  })
}

export function LocalDateRangeInputSchema(): z.ZodObject<Properties<LocalDateRangeInput>> {
  return z.object({
    end: z.string().nullish(),
    start: z.string().nullish()
  })
}

export function LocalTimeSpanSchema(): z.ZodObject<Properties<LocalTimeSpan>> {
  return z.object({
    __typename: z.literal('LocalTimeSpan').optional(),
    from: z.number(),
    to: z.number()
  })
}

export function LocalTimeSpanDateSchema(): z.ZodObject<Properties<LocalTimeSpanDate>> {
  return z.object({
    __typename: z.literal('LocalTimeSpanDate').optional(),
    date: z.string(),
    timeSpans: z.array(LocalTimeSpanSchema().nullable()).nullish()
  })
}

export function MoneySchema(): z.ZodObject<Properties<Money>> {
  return z.object({
    __typename: z.literal('Money').optional(),
    amount: z.number(),
    currency: CurrencySchema()
  })
}

export function NodeSchema(): z.ZodObject<Properties<Node>> {
  return z.object({
    id: z.string()
  })
}

export function OpeningHoursSchema(): z.ZodObject<Properties<OpeningHours>> {
  return z.object({
    __typename: z.literal('OpeningHours').optional(),
    dates: z.array(LocalTimeSpanDateSchema().nullable()).nullish(),
    osm: z.string().nullish()
  })
}

export function OpeningHoursDatesArgsSchema(): z.ZodObject<Properties<OpeningHoursDatesArgs>> {
  return z.object({
    dates: z.array(z.string())
  })
}

export function PageInfoSchema(): z.ZodObject<Properties<PageInfo>> {
  return z.object({
    __typename: z.literal('PageInfo').optional(),
    endCursor: z.string().nullish(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
    startCursor: z.string().nullish()
  })
}

export function ParkingFilterSchema(): z.ZodObject<Properties<ParkingFilter>> {
  return z.object({
    not: z.array(ParkingFilterOperationSchema()).nullish(),
    select: z.array(ParkingFilterOperationSchema()).nullish()
  })
}

export function ParkingFilterOperationSchema(): z.ZodObject<Properties<ParkingFilterOperation>> {
  return z.object({
    tags: z.array(z.string().nullable()).nullish()
  })
}

export function PatternSchema(): z.ZodObject<Properties<Pattern>> {
  return z.object({
    __typename: z.literal('Pattern').optional(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    code: z.string(),
    directionId: z.number().nullish(),
    geometry: z.array(CoordinatesSchema().nullable()).nullish(),
    headsign: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
    originalTripPattern: PatternSchema().nullish(),
    patternGeometry: GeometrySchema().nullish(),
    route: RouteSchema(),
    semanticHash: z.string().nullish(),
    stops: z.array(StopSchema()).nullish(),
    trips: z.array(TripSchema()).nullish(),
    tripsForDate: z.array(TripSchema()).nullish(),
    vehiclePositions: z.array(VehiclePositionSchema()).nullish()
  })
}

export function PatternAlertsArgsSchema(): z.ZodObject<Properties<PatternAlertsArgs>> {
  return z.object({
    types: z.array(PatternAlertTypeSchema.nullable()).nullish()
  })
}

export function PatternTripsForDateArgsSchema(): z.ZodObject<Properties<PatternTripsForDateArgs>> {
  return z.object({
    serviceDate: z.string().nullish()
  })
}

export function PlaceSchema(): z.ZodObject<Properties<Place>> {
  return z.object({
    __typename: z.literal('Place').optional(),
    arrival: LegTimeSchema().nullish(),
    arrivalTime: z.number(),
    bikePark: BikeParkSchema().nullish(),
    bikeRentalStation: BikeRentalStationSchema().nullish(),
    carPark: CarParkSchema().nullish(),
    departure: LegTimeSchema().nullish(),
    departureTime: z.number(),
    lat: z.number(),
    lon: z.number(),
    name: z.string().nullish(),
    rentalVehicle: RentalVehicleSchema().nullish(),
    stop: StopSchema().nullish(),
    stopPosition: StopPositionSchema().nullish(),
    vehicleParking: VehicleParkingSchema().nullish(),
    vehicleRentalStation: VehicleRentalStationSchema().nullish(),
    vertexType: VertexTypeSchema.nullish()
  })
}

export function PlaceInterfaceSchema(): z.ZodObject<Properties<PlaceInterface>> {
  return z.object({
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish()
  })
}

export function PlanSchema(): z.ZodObject<Properties<Plan>> {
  return z.object({
    __typename: z.literal('Plan').optional(),
    date: z.number().nullish(),
    debugOutput: DebugOutputSchema(),
    from: PlaceSchema(),
    itineraries: z.array(ItinerarySchema().nullable()),
    messageEnums: z.array(z.string().nullable()),
    messageStrings: z.array(z.string().nullable()),
    nextDateTime: z.number().nullish(),
    nextPageCursor: z.string().nullish(),
    prevDateTime: z.number().nullish(),
    previousPageCursor: z.string().nullish(),
    routingErrors: z.array(RoutingErrorSchema()),
    searchWindowUsed: z.number().nullish(),
    to: PlaceSchema()
  })
}

export function PlanConnectionSchema(): z.ZodObject<Properties<PlanConnection>> {
  return z.object({
    __typename: z.literal('PlanConnection').optional(),
    edges: z.array(PlanEdgeSchema().nullable()).nullish(),
    pageInfo: PlanPageInfoSchema(),
    routingErrors: z.array(RoutingErrorSchema()),
    searchDateTime: z.string().nullish()
  })
}

export function PlanCoordinateInputSchema(): z.ZodObject<Properties<PlanCoordinateInput>> {
  return z.object({
    latitude: z.number(),
    longitude: z.number()
  })
}

export function PlanDateTimeInputSchema(): z.ZodSchema<PlanDateTimeInput> {
  return z.discriminatedUnion("__type", [
    z.object({
        __type: z.literal("earliestDeparture"),
        earliestDeparture: z.string()
      }),
  z.object({
        __type: z.literal("latestArrival"),
        latestArrival: z.string()
      })
  ]);
}

export function PlanEdgeSchema(): z.ZodObject<Properties<PlanEdge>> {
  return z.object({
    __typename: z.literal('PlanEdge').optional(),
    cursor: z.string(),
    node: ItinerarySchema()
  })
}

export function PlanItineraryFilterInputSchema(): z.ZodObject<Properties<PlanItineraryFilterInput>> {
  return z.object({
    groupSimilarityKeepOne: z.number().default(0.85).nullish(),
    groupSimilarityKeepThree: z.number().default(0.68).nullish(),
    groupedOtherThanSameLegsMaxCostMultiplier: z.number().default(2).nullish(),
    itineraryFilterDebugProfile: ItineraryFilterDebugProfileSchema.default("OFF").nullish()
  })
}

export function PlanLabeledLocationInputSchema(): z.ZodObject<Properties<PlanLabeledLocationInput>> {
  return z.object({
    label: z.string().nullish(),
    location: z.lazy(() => PlanLocationInputSchema())
  })
}

export function PlanLocationInputSchema(): z.ZodSchema<PlanLocationInput> {
  return z.discriminatedUnion("__type", [
    z.object({
        __type: z.literal("coordinate"),
        coordinate: PlanCoordinateInputSchema()
      }),
  z.object({
        __type: z.literal("stopLocation"),
        stopLocation: PlanStopLocationInputSchema()
      })
  ]);
}

export function PlanModesInputSchema(): z.ZodObject<Properties<PlanModesInput>> {
  return z.object({
    direct: z.array(PlanDirectModeSchema).nullish(),
    directOnly: z.boolean().default(false).nullish(),
    transit: z.lazy(() => PlanTransitModesInputSchema().nullish()),
    transitOnly: z.boolean().default(false).nullish()
  })
}

export function PlanPageInfoSchema(): z.ZodObject<Properties<PlanPageInfo>> {
  return z.object({
    __typename: z.literal('PlanPageInfo').optional(),
    endCursor: z.string().nullish(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
    searchWindowUsed: z.string().nullish(),
    startCursor: z.string().nullish()
  })
}

export function PlanPreferencesInputSchema(): z.ZodObject<Properties<PlanPreferencesInput>> {
  return z.object({
    accessibility: z.lazy(() => AccessibilityPreferencesInputSchema().nullish()),
    street: z.lazy(() => PlanStreetPreferencesInputSchema().nullish()),
    transit: z.lazy(() => TransitPreferencesInputSchema().nullish())
  })
}

export function PlanStopLocationInputSchema(): z.ZodObject<Properties<PlanStopLocationInput>> {
  return z.object({
    stopLocationId: z.string()
  })
}

export function PlanStreetPreferencesInputSchema(): z.ZodObject<Properties<PlanStreetPreferencesInput>> {
  return z.object({
    bicycle: z.lazy(() => BicyclePreferencesInputSchema().nullish()),
    car: z.lazy(() => CarPreferencesInputSchema().nullish()),
    scooter: z.lazy(() => ScooterPreferencesInputSchema().nullish()),
    walk: z.lazy(() => WalkPreferencesInputSchema().nullish())
  })
}

export function PlanTransitModePreferenceInputSchema(): z.ZodObject<Properties<PlanTransitModePreferenceInput>> {
  return z.object({
    cost: z.lazy(() => TransitModePreferenceCostInputSchema().nullish()),
    mode: TransitModeSchema
  })
}

export function PlanTransitModesInputSchema(): z.ZodObject<Properties<PlanTransitModesInput>> {
  return z.object({
    access: z.array(PlanAccessModeSchema).nullish(),
    egress: z.array(PlanEgressModeSchema).nullish(),
    transfer: z.array(PlanTransferModeSchema).nullish(),
    transit: z.array(z.lazy(() => PlanTransitModePreferenceInputSchema())).nullish()
  })
}

export function PositionAtStopSchema(): z.ZodObject<Properties<PositionAtStop>> {
  return z.object({
    __typename: z.literal('PositionAtStop').optional(),
    position: z.number().nullish()
  })
}

export function PositionBetweenStopsSchema(): z.ZodObject<Properties<PositionBetweenStops>> {
  return z.object({
    __typename: z.literal('PositionBetweenStops').optional(),
    nextPosition: z.number().nullish(),
    previousPosition: z.number().nullish()
  })
}

export function QueryTypeSchema(): z.ZodObject<Properties<QueryType>> {
  return z.object({
    __typename: z.literal('QueryType').optional(),
    agencies: z.array(AgencySchema().nullable()).nullish(),
    agency: AgencySchema().nullish(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    bikePark: BikeParkSchema().nullish(),
    bikeParks: z.array(BikeParkSchema().nullable()).nullish(),
    bikeRentalStation: BikeRentalStationSchema().nullish(),
    bikeRentalStations: z.array(BikeRentalStationSchema().nullable()).nullish(),
    cancelledTripTimes: z.array(StoptimeSchema().nullable()).nullish(),
    carPark: CarParkSchema().nullish(),
    carParks: z.array(CarParkSchema().nullable()).nullish(),
    cluster: ClusterSchema().nullish(),
    clusters: z.array(ClusterSchema().nullable()).nullish(),
    departureRow: DepartureRowSchema().nullish(),
    feeds: z.array(FeedSchema().nullable()).nullish(),
    fuzzyTrip: TripSchema().nullish(),
    nearest: PlaceAtDistanceConnectionSchema().nullish(),
    node: NodeSchema().nullish(),
    pattern: PatternSchema().nullish(),
    patterns: z.array(PatternSchema().nullable()).nullish(),
    plan: PlanSchema().nullish(),
    planConnection: PlanConnectionSchema().nullish(),
    rentalVehicle: RentalVehicleSchema().nullish(),
    rentalVehicles: z.array(RentalVehicleSchema().nullable()).nullish(),
    route: RouteSchema().nullish(),
    routes: z.array(RouteSchema().nullable()).nullish(),
    serviceTimeRange: ServiceTimeRangeSchema().nullish(),
    station: StopSchema().nullish(),
    stations: z.array(StopSchema().nullable()).nullish(),
    stop: StopSchema().nullish(),
    stops: z.array(StopSchema().nullable()).nullish(),
    stopsByBbox: z.array(StopSchema().nullable()).nullish(),
    stopsByRadius: StopAtDistanceConnectionSchema().nullish(),
    ticketTypes: z.array(TicketTypeSchema().nullable()).nullish(),
    trip: TripSchema().nullish(),
    trips: z.array(TripSchema().nullable()).nullish(),
    vehicleParking: VehicleParkingSchema().nullish(),
    vehicleParkings: z.array(VehicleParkingSchema().nullable()).nullish(),
    vehicleRentalStation: VehicleRentalStationSchema().nullish(),
    vehicleRentalStations: z.array(VehicleRentalStationSchema().nullable()).nullish(),
    viewer: QueryTypeSchema().nullish()
  })
}

export function QueryTypeAgencyArgsSchema(): z.ZodObject<Properties<QueryTypeAgencyArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeAlertsArgsSchema(): z.ZodObject<Properties<QueryTypeAlertsArgs>> {
  return z.object({
    cause: z.array(AlertCauseTypeSchema).nullish(),
    effect: z.array(AlertEffectTypeSchema).nullish(),
    feeds: z.array(z.string()).nullish(),
    route: z.array(z.string()).nullish(),
    severityLevel: z.array(AlertSeverityLevelTypeSchema).nullish(),
    stop: z.array(z.string()).nullish()
  })
}

export function QueryTypeBikeParkArgsSchema(): z.ZodObject<Properties<QueryTypeBikeParkArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeBikeRentalStationArgsSchema(): z.ZodObject<Properties<QueryTypeBikeRentalStationArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeBikeRentalStationsArgsSchema(): z.ZodObject<Properties<QueryTypeBikeRentalStationsArgs>> {
  return z.object({
    ids: z.array(z.string().nullable()).nullish()
  })
}

export function QueryTypeCancelledTripTimesArgsSchema(): z.ZodObject<Properties<QueryTypeCancelledTripTimesArgs>> {
  return z.object({
    feeds: z.array(z.string().nullable()).nullish(),
    maxArrivalTime: z.number().nullish(),
    maxDate: z.string().nullish(),
    maxDepartureTime: z.number().nullish(),
    minArrivalTime: z.number().nullish(),
    minDate: z.string().nullish(),
    minDepartureTime: z.number().nullish(),
    patterns: z.array(z.string().nullable()).nullish(),
    routes: z.array(z.string().nullable()).nullish(),
    trips: z.array(z.string().nullable()).nullish()
  })
}

export function QueryTypeCarParkArgsSchema(): z.ZodObject<Properties<QueryTypeCarParkArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeCarParksArgsSchema(): z.ZodObject<Properties<QueryTypeCarParksArgs>> {
  return z.object({
    ids: z.array(z.string().nullable()).nullish()
  })
}

export function QueryTypeClusterArgsSchema(): z.ZodObject<Properties<QueryTypeClusterArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeDepartureRowArgsSchema(): z.ZodObject<Properties<QueryTypeDepartureRowArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeFuzzyTripArgsSchema(): z.ZodObject<Properties<QueryTypeFuzzyTripArgs>> {
  return z.object({
    date: z.string(),
    direction: z.number().default(-1).nullish(),
    route: z.string(),
    time: z.number()
  })
}

export function QueryTypeNearestArgsSchema(): z.ZodObject<Properties<QueryTypeNearestArgs>> {
  return z.object({
    after: z.string().nullish(),
    before: z.string().nullish(),
    filterByIds: z.lazy(() => InputFiltersSchema().nullish()),
    filterByModes: z.array(ModeSchema.nullable()).nullish(),
    filterByNetwork: z.array(z.string()).nullish(),
    filterByPlaceTypes: z.array(FilterPlaceTypeSchema.nullable()).nullish(),
    first: z.number().nullish(),
    last: z.number().nullish(),
    lat: z.number(),
    lon: z.number(),
    maxDistance: z.number().default(2000).nullish(),
    maxResults: z.number().default(20).nullish()
  })
}

export function QueryTypeNodeArgsSchema(): z.ZodObject<Properties<QueryTypeNodeArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypePatternArgsSchema(): z.ZodObject<Properties<QueryTypePatternArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypePlanArgsSchema(): z.ZodObject<Properties<QueryTypePlanArgs>> {
  return z.object({
    alightSlack: z.number().nullish(),
    allowBikeRental: z.boolean().nullish(),
    allowKeepingRentedBicycleAtDestination: z.boolean().nullish(),
    allowedBikeRentalNetworks: z.array(z.string().nullable()).nullish(),
    allowedTicketTypes: z.array(z.string().nullable()).nullish(),
    allowedVehicleRentalNetworks: z.array(z.string().nullable()).nullish(),
    arriveBy: z.boolean().nullish(),
    banned: z.lazy(() => InputBannedSchema().nullish()),
    bannedVehicleRentalNetworks: z.array(z.string().nullable()).nullish(),
    batch: z.boolean().nullish(),
    bikeBoardCost: z.number().nullish(),
    bikeReluctance: z.number().nullish(),
    bikeSpeed: z.number().nullish(),
    bikeSwitchCost: z.number().nullish(),
    bikeSwitchTime: z.number().nullish(),
    bikeWalkingReluctance: z.number().nullish(),
    boardSlack: z.number().nullish(),
    carParkCarLegWeight: z.number().nullish(),
    carReluctance: z.number().nullish(),
    claimInitialWait: z.number().nullish(),
    compactLegsByReversedSearch: z.boolean().nullish(),
    date: z.string().nullish(),
    debugItineraryFilter: z.boolean().nullish(),
    disableRemainingWeightHeuristic: z.boolean().nullish(),
    from: z.lazy(() => InputCoordinatesSchema().nullish()),
    fromPlace: z.string().nullish(),
    heuristicStepsPerMainStep: z.number().nullish(),
    ignoreRealtimeUpdates: z.boolean().nullish(),
    intermediatePlaces: z.array(z.lazy(() => InputCoordinatesSchema().nullable())).nullish(),
    itineraryFiltering: z.number().nullish(),
    keepingRentedBicycleAtDestinationCost: z.number().nullish(),
    locale: z.string().nullish(),
    maxPreTransitTime: z.number().nullish(),
    maxTransfers: z.number().nullish(),
    maxWalkDistance: z.number().nullish(),
    minTransferTime: z.number().nullish(),
    modeWeight: z.lazy(() => InputModeWeightSchema().nullish()),
    nonpreferredTransferPenalty: z.number().nullish(),
    numItineraries: z.number().default(3).nullish(),
    omitCanceled: z.boolean().default(true).nullish(),
    optimize: OptimizeTypeSchema.nullish(),
    pageCursor: z.string().nullish(),
    parking: z.lazy(() => VehicleParkingInputSchema().nullish()),
    preferred: z.lazy(() => InputPreferredSchema().nullish()),
    reverseOptimizeOnTheFly: z.boolean().nullish(),
    searchWindow: z.number().nullish(),
    startTransitStopId: z.string().nullish(),
    startTransitTripId: z.string().nullish(),
    time: z.string().nullish(),
    to: z.lazy(() => InputCoordinatesSchema().nullish()),
    toPlace: z.string().nullish(),
    transferPenalty: z.number().nullish(),
    transportModes: z.array(TransportModeSchema().nullable()).nullish(),
    triangle: z.lazy(() => InputTriangleSchema().nullish()),
    unpreferred: z.lazy(() => InputUnpreferredSchema().nullish()),
    waitAtBeginningFactor: z.number().nullish(),
    waitReluctance: z.number().nullish(),
    walkBoardCost: z.number().nullish(),
    walkOnStreetReluctance: z.number().nullish(),
    walkReluctance: z.number().nullish(),
    walkSafetyFactor: z.number().nullish(),
    walkSpeed: z.number().nullish(),
    wheelchair: z.boolean().nullish()
  })
}

export function QueryTypePlanConnectionArgsSchema(): z.ZodObject<Properties<QueryTypePlanConnectionArgs>> {
  return z.object({
    after: z.string().nullish(),
    before: z.string().nullish(),
    dateTime: z.lazy(() => PlanDateTimeInputSchema().nullish()),
    destination: z.lazy(() => PlanLabeledLocationInputSchema()),
    first: z.number().nullish(),
    itineraryFilter: z.lazy(() => PlanItineraryFilterInputSchema().nullish()),
    last: z.number().nullish(),
    locale: z.string().nullish(),
    modes: z.lazy(() => PlanModesInputSchema().nullish()),
    origin: z.lazy(() => PlanLabeledLocationInputSchema()),
    preferences: z.lazy(() => PlanPreferencesInputSchema().nullish()),
    searchWindow: z.string().nullish()
  })
}

export function QueryTypeRentalVehicleArgsSchema(): z.ZodObject<Properties<QueryTypeRentalVehicleArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeRentalVehiclesArgsSchema(): z.ZodObject<Properties<QueryTypeRentalVehiclesArgs>> {
  return z.object({
    formFactors: z.array(FormFactorSchema.nullable()).nullish(),
    ids: z.array(z.string().nullable()).nullish()
  })
}

export function QueryTypeRouteArgsSchema(): z.ZodObject<Properties<QueryTypeRouteArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeRoutesArgsSchema(): z.ZodObject<Properties<QueryTypeRoutesArgs>> {
  return z.object({
    feeds: z.array(z.string().nullable()).nullish(),
    ids: z.array(z.string().nullable()).nullish(),
    name: z.string().nullish(),
    serviceDates: z.lazy(() => LocalDateRangeInputSchema().nullish()),
    transportModes: z.array(ModeSchema.nullable()).nullish()
  })
}

export function QueryTypeStationArgsSchema(): z.ZodObject<Properties<QueryTypeStationArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeStationsArgsSchema(): z.ZodObject<Properties<QueryTypeStationsArgs>> {
  return z.object({
    ids: z.array(z.string().nullable()).nullish(),
    name: z.string().nullish()
  })
}

export function QueryTypeStopArgsSchema(): z.ZodObject<Properties<QueryTypeStopArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeStopsArgsSchema(): z.ZodObject<Properties<QueryTypeStopsArgs>> {
  return z.object({
    ids: z.array(z.string().nullable()).nullish(),
    name: z.string().nullish()
  })
}

export function QueryTypeStopsByBboxArgsSchema(): z.ZodObject<Properties<QueryTypeStopsByBboxArgs>> {
  return z.object({
    feeds: z.array(z.string()).nullish(),
    maxLat: z.number(),
    maxLon: z.number(),
    minLat: z.number(),
    minLon: z.number()
  })
}

export function QueryTypeStopsByRadiusArgsSchema(): z.ZodObject<Properties<QueryTypeStopsByRadiusArgs>> {
  return z.object({
    after: z.string().nullish(),
    before: z.string().nullish(),
    feeds: z.array(z.string()).nullish(),
    first: z.number().nullish(),
    last: z.number().nullish(),
    lat: z.number(),
    lon: z.number(),
    radius: z.number()
  })
}

export function QueryTypeTripArgsSchema(): z.ZodObject<Properties<QueryTypeTripArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeTripsArgsSchema(): z.ZodObject<Properties<QueryTypeTripsArgs>> {
  return z.object({
    feeds: z.array(z.string().nullable()).nullish()
  })
}

export function QueryTypeVehicleParkingArgsSchema(): z.ZodObject<Properties<QueryTypeVehicleParkingArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeVehicleParkingsArgsSchema(): z.ZodObject<Properties<QueryTypeVehicleParkingsArgs>> {
  return z.object({
    ids: z.array(z.string().nullable()).nullish()
  })
}

export function QueryTypeVehicleRentalStationArgsSchema(): z.ZodObject<Properties<QueryTypeVehicleRentalStationArgs>> {
  return z.object({
    id: z.string()
  })
}

export function QueryTypeVehicleRentalStationsArgsSchema(): z.ZodObject<Properties<QueryTypeVehicleRentalStationsArgs>> {
  return z.object({
    ids: z.array(z.string().nullable()).nullish()
  })
}

export function RealTimeEstimateSchema(): z.ZodObject<Properties<RealTimeEstimate>> {
  return z.object({
    __typename: z.literal('RealTimeEstimate').optional(),
    delay: z.string(),
    time: z.string()
  })
}

export function RentalVehicleSchema(): z.ZodObject<Properties<RentalVehicle>> {
  return z.object({
    __typename: z.literal('RentalVehicle').optional(),
    allowPickupNow: z.boolean().nullish(),
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    name: z.string(),
    network: z.string().nullish(),
    operative: z.boolean().nullish(),
    rentalNetwork: VehicleRentalNetworkSchema(),
    rentalUris: VehicleRentalUrisSchema().nullish(),
    vehicleId: z.string().nullish(),
    vehicleType: RentalVehicleTypeSchema().nullish()
  })
}

export function RentalVehicleEntityCountsSchema(): z.ZodObject<Properties<RentalVehicleEntityCounts>> {
  return z.object({
    __typename: z.literal('RentalVehicleEntityCounts').optional(),
    byType: z.array(RentalVehicleTypeCountSchema()),
    total: z.number()
  })
}

export function RentalVehicleTypeSchema(): z.ZodObject<Properties<RentalVehicleType>> {
  return z.object({
    __typename: z.literal('RentalVehicleType').optional(),
    formFactor: FormFactorSchema.nullish(),
    propulsionType: PropulsionTypeSchema.nullish()
  })
}

export function RentalVehicleTypeCountSchema(): z.ZodObject<Properties<RentalVehicleTypeCount>> {
  return z.object({
    __typename: z.literal('RentalVehicleTypeCount').optional(),
    count: z.number(),
    vehicleType: RentalVehicleTypeSchema()
  })
}

export function RideHailingEstimateSchema(): z.ZodObject<Properties<RideHailingEstimate>> {
  return z.object({
    __typename: z.literal('RideHailingEstimate').optional(),
    arrival: z.string(),
    maxPrice: MoneySchema(),
    minPrice: MoneySchema(),
    productName: z.string().nullish(),
    provider: RideHailingProviderSchema()
  })
}

export function RideHailingProviderSchema(): z.ZodObject<Properties<RideHailingProvider>> {
  return z.object({
    __typename: z.literal('RideHailingProvider').optional(),
    id: z.string()
  })
}

export function RiderCategorySchema(): z.ZodObject<Properties<RiderCategory>> {
  return z.object({
    __typename: z.literal('RiderCategory').optional(),
    id: z.string(),
    name: z.string().nullish()
  })
}

export function RouteSchema(): z.ZodObject<Properties<Route>> {
  return z.object({
    __typename: z.literal('Route').optional(),
    agency: AgencySchema().nullish(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    bikesAllowed: BikesAllowedSchema.nullish(),
    color: z.string().nullish(),
    desc: z.string().nullish(),
    gtfsId: z.string(),
    id: z.string(),
    longName: z.string().nullish(),
    mode: TransitModeSchema.nullish(),
    patterns: z.array(PatternSchema().nullable()).nullish(),
    shortName: z.string().nullish(),
    sortOrder: z.number().nullish(),
    stops: z.array(StopSchema().nullable()).nullish(),
    textColor: z.string().nullish(),
    trips: z.array(TripSchema().nullable()).nullish(),
    type: z.number().nullish(),
    url: z.string().nullish()
  })
}

export function RouteAlertsArgsSchema(): z.ZodObject<Properties<RouteAlertsArgs>> {
  return z.object({
    types: z.array(RouteAlertTypeSchema.nullable()).nullish()
  })
}

export function RouteLongNameArgsSchema(): z.ZodObject<Properties<RouteLongNameArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function RoutePatternsArgsSchema(): z.ZodObject<Properties<RoutePatternsArgs>> {
  return z.object({
    serviceDates: z.lazy(() => LocalDateRangeInputSchema().nullish())
  })
}

export function RouteTypeSchema(): z.ZodObject<Properties<RouteType>> {
  return z.object({
    __typename: z.literal('RouteType').optional(),
    agency: AgencySchema().nullish(),
    routeType: z.number(),
    routes: z.array(RouteSchema().nullable()).nullish()
  })
}

export function RoutingErrorSchema(): z.ZodObject<Properties<RoutingError>> {
  return z.object({
    __typename: z.literal('RoutingError').optional(),
    code: RoutingErrorCodeSchema,
    description: z.string(),
    inputField: z.lazy(() => InputFieldSchema.nullish())
  })
}

export function ScooterOptimizationInputSchema(): z.ZodSchema<ScooterOptimizationInput> {
  return z.discriminatedUnion("__type", [
    z.object({
        __type: z.literal("triangle"),
        triangle: TriangleScooterFactorsInputSchema()
      }),
  z.object({
        __type: z.literal("type"),
        type: ScooterOptimizationTypeSchema
      })
  ]);
}

export function ScooterPreferencesInputSchema(): z.ZodObject<Properties<ScooterPreferencesInput>> {
  return z.object({
    optimization: z.lazy(() => ScooterOptimizationInputSchema().nullish()),
    reluctance: z.number().nullish(),
    rental: z.lazy(() => ScooterRentalPreferencesInputSchema().nullish()),
    speed: z.number().nullish()
  })
}

export function ScooterRentalPreferencesInputSchema(): z.ZodObject<Properties<ScooterRentalPreferencesInput>> {
  return z.object({
    allowedNetworks: z.array(z.string()).nullish(),
    bannedNetworks: z.array(z.string()).nullish(),
    destinationScooterPolicy: z.lazy(() => DestinationScooterPolicyInputSchema().nullish())
  })
}

export function StopSchema(): z.ZodObject<Properties<Stop>> {
  return z.object({
    __typename: z.literal('Stop').optional(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    cluster: ClusterSchema().nullish(),
    code: z.string().nullish(),
    desc: z.string().nullish(),
    direction: z.string().nullish(),
    geometries: StopGeometriesSchema().nullish(),
    gtfsId: z.string(),
    id: z.string(),
    lat: z.number().nullish(),
    locationType: LocationTypeSchema.nullish(),
    lon: z.number().nullish(),
    name: z.string(),
    parentStation: StopSchema().nullish(),
    patterns: z.array(PatternSchema().nullable()).nullish(),
    platformCode: z.string().nullish(),
    routes: z.array(RouteSchema()).nullish(),
    stopTimesForPattern: z.array(StoptimeSchema().nullable()).nullish(),
    stops: z.array(StopSchema().nullable()).nullish(),
    stoptimesForPatterns: z.array(StoptimesInPatternSchema().nullable()).nullish(),
    stoptimesForServiceDate: z.array(StoptimesInPatternSchema().nullable()).nullish(),
    stoptimesWithoutPatterns: z.array(StoptimeSchema().nullable()).nullish(),
    timezone: z.string().nullish(),
    transfers: z.array(StopAtDistanceSchema().nullable()).nullish(),
    url: z.string().nullish(),
    vehicleMode: ModeSchema.nullish(),
    vehicleType: z.number().nullish(),
    wheelchairBoarding: WheelchairBoardingSchema.nullish(),
    zoneId: z.string().nullish()
  })
}

export function StopAlertsArgsSchema(): z.ZodObject<Properties<StopAlertsArgs>> {
  return z.object({
    types: z.array(StopAlertTypeSchema.nullable()).nullish()
  })
}

export function StopDescArgsSchema(): z.ZodObject<Properties<StopDescArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function StopNameArgsSchema(): z.ZodObject<Properties<StopNameArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function StopStopTimesForPatternArgsSchema(): z.ZodObject<Properties<StopStopTimesForPatternArgs>> {
  return z.object({
    id: z.string(),
    numberOfDepartures: z.number().default(2).nullish(),
    omitCanceled: z.boolean().default(true).nullish(),
    omitNonPickups: z.boolean().default(false).nullish(),
    startTime: z.number().default(0).nullish(),
    timeRange: z.number().default(86400).nullish()
  })
}

export function StopStoptimesForPatternsArgsSchema(): z.ZodObject<Properties<StopStoptimesForPatternsArgs>> {
  return z.object({
    numberOfDepartures: z.number().default(5).nullish(),
    omitCanceled: z.boolean().default(true).nullish(),
    omitNonPickups: z.boolean().default(false).nullish(),
    startTime: z.number().default(0).nullish(),
    timeRange: z.number().default(86400).nullish()
  })
}

export function StopStoptimesForServiceDateArgsSchema(): z.ZodObject<Properties<StopStoptimesForServiceDateArgs>> {
  return z.object({
    date: z.string().nullish(),
    omitCanceled: z.boolean().default(false).nullish(),
    omitNonPickups: z.boolean().default(false).nullish()
  })
}

export function StopStoptimesWithoutPatternsArgsSchema(): z.ZodObject<Properties<StopStoptimesWithoutPatternsArgs>> {
  return z.object({
    numberOfDepartures: z.number().default(5).nullish(),
    omitCanceled: z.boolean().default(true).nullish(),
    omitNonPickups: z.boolean().default(false).nullish(),
    startTime: z.number().default(0).nullish(),
    timeRange: z.number().default(86400).nullish()
  })
}

export function StopTransfersArgsSchema(): z.ZodObject<Properties<StopTransfersArgs>> {
  return z.object({
    maxDistance: z.number().nullish()
  })
}

export function StopUrlArgsSchema(): z.ZodObject<Properties<StopUrlArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function StopGeometriesSchema(): z.ZodObject<Properties<StopGeometries>> {
  return z.object({
    __typename: z.literal('StopGeometries').optional(),
    geoJson: definedNonNullAnySchema.nullish(),
    googleEncoded: z.array(GeometrySchema().nullable()).nullish()
  })
}

export function StopOnRouteSchema(): z.ZodObject<Properties<StopOnRoute>> {
  return z.object({
    __typename: z.literal('StopOnRoute').optional(),
    route: RouteSchema(),
    stop: StopSchema()
  })
}

export function StopOnTripSchema(): z.ZodObject<Properties<StopOnTrip>> {
  return z.object({
    __typename: z.literal('StopOnTrip').optional(),
    stop: StopSchema(),
    trip: TripSchema()
  })
}

export function StopPositionSchema() {
  return z.union([PositionAtStopSchema(), PositionBetweenStopsSchema()])
}

export function StopRelationshipSchema(): z.ZodObject<Properties<StopRelationship>> {
  return z.object({
    __typename: z.literal('StopRelationship').optional(),
    status: VehicleStopStatusSchema,
    stop: StopSchema()
  })
}

export function StoptimeSchema(): z.ZodObject<Properties<Stoptime>> {
  return z.object({
    __typename: z.literal('Stoptime').optional(),
    arrivalDelay: z.number().nullish(),
    departureDelay: z.number().nullish(),
    dropoffType: PickupDropoffTypeSchema.nullish(),
    headsign: z.string().nullish(),
    pickupType: PickupDropoffTypeSchema.nullish(),
    realtime: z.boolean().nullish(),
    realtimeArrival: z.number().nullish(),
    realtimeDeparture: z.number().nullish(),
    realtimeState: RealtimeStateSchema.nullish(),
    scheduledArrival: z.number().nullish(),
    scheduledDeparture: z.number().nullish(),
    serviceDay: z.number().nullish(),
    stop: StopSchema().nullish(),
    stopPosition: z.number().nullish(),
    timepoint: z.boolean().nullish(),
    trip: TripSchema().nullish()
  })
}

export function StoptimeHeadsignArgsSchema(): z.ZodObject<Properties<StoptimeHeadsignArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function StoptimesInPatternSchema(): z.ZodObject<Properties<StoptimesInPattern>> {
  return z.object({
    __typename: z.literal('StoptimesInPattern').optional(),
    pattern: PatternSchema().nullish(),
    stoptimes: z.array(StoptimeSchema().nullable()).nullish()
  })
}

export function SystemNoticeSchema(): z.ZodObject<Properties<SystemNotice>> {
  return z.object({
    __typename: z.literal('SystemNotice').optional(),
    tag: z.string().nullish(),
    text: z.string().nullish()
  })
}

export function TicketTypeSchema(): z.ZodObject<Properties<TicketType>> {
  return z.object({
    __typename: z.literal('TicketType').optional(),
    currency: z.string().nullish(),
    fareId: z.string(),
    id: z.string(),
    price: z.number().nullish(),
    zones: z.array(z.string()).nullish()
  })
}

export function TimetablePreferencesInputSchema(): z.ZodObject<Properties<TimetablePreferencesInput>> {
  return z.object({
    excludeRealTimeUpdates: z.boolean().nullish(),
    includePlannedCancellations: z.boolean().nullish(),
    includeRealTimeCancellations: z.boolean().nullish()
  })
}

export function TransferPreferencesInputSchema(): z.ZodObject<Properties<TransferPreferencesInput>> {
  return z.object({
    cost: z.number().nullish(),
    maximumAdditionalTransfers: z.number().nullish(),
    maximumTransfers: z.number().nullish(),
    slack: z.string().nullish()
  })
}

export function TransitModePreferenceCostInputSchema(): z.ZodObject<Properties<TransitModePreferenceCostInput>> {
  return z.object({
    reluctance: z.number()
  })
}

export function TransitPreferencesInputSchema(): z.ZodObject<Properties<TransitPreferencesInput>> {
  return z.object({
    alight: z.lazy(() => AlightPreferencesInputSchema().nullish()),
    board: z.lazy(() => BoardPreferencesInputSchema().nullish()),
    timetable: z.lazy(() => TimetablePreferencesInputSchema().nullish()),
    transfer: z.lazy(() => TransferPreferencesInputSchema().nullish())
  })
}

export function TranslatedStringSchema(): z.ZodObject<Properties<TranslatedString>> {
  return z.object({
    __typename: z.literal('TranslatedString').optional(),
    language: z.string().nullish(),
    text: z.string().nullish()
  })
}

export function TransportModeSchema(): z.ZodObject<Properties<TransportMode>> {
  return z.object({
    mode: ModeSchema,
    qualifier: QualifierSchema.nullish()
  })
}

export function TriangleCyclingFactorsInputSchema(): z.ZodObject<Properties<TriangleCyclingFactorsInput>> {
  return z.object({
    flatness: z.number(),
    safety: z.number(),
    time: z.number()
  })
}

export function TriangleScooterFactorsInputSchema(): z.ZodObject<Properties<TriangleScooterFactorsInput>> {
  return z.object({
    flatness: z.number(),
    safety: z.number(),
    time: z.number()
  })
}

export function TripSchema(): z.ZodObject<Properties<Trip>> {
  return z.object({
    __typename: z.literal('Trip').optional(),
    activeDates: z.array(z.string().nullable()).nullish(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    arrivalStoptime: StoptimeSchema().nullish(),
    bikesAllowed: BikesAllowedSchema.nullish(),
    blockId: z.string().nullish(),
    departureStoptime: StoptimeSchema().nullish(),
    directionId: z.string().nullish(),
    geometry: z.array(z.array(z.number().nullable()).nullish()).nullish(),
    gtfsId: z.string(),
    id: z.string(),
    occupancy: TripOccupancySchema().nullish(),
    pattern: PatternSchema().nullish(),
    route: RouteSchema(),
    routeShortName: z.string().nullish(),
    semanticHash: z.string(),
    serviceId: z.string().nullish(),
    shapeId: z.string().nullish(),
    stops: z.array(StopSchema()),
    stoptimes: z.array(StoptimeSchema().nullable()).nullish(),
    stoptimesForDate: z.array(StoptimeSchema().nullable()).nullish(),
    tripGeometry: GeometrySchema().nullish(),
    tripHeadsign: z.string().nullish(),
    tripShortName: z.string().nullish(),
    wheelchairAccessible: WheelchairBoardingSchema.nullish()
  })
}

export function TripAlertsArgsSchema(): z.ZodObject<Properties<TripAlertsArgs>> {
  return z.object({
    types: z.array(TripAlertTypeSchema.nullable()).nullish()
  })
}

export function TripArrivalStoptimeArgsSchema(): z.ZodObject<Properties<TripArrivalStoptimeArgs>> {
  return z.object({
    serviceDate: z.string().nullish()
  })
}

export function TripDepartureStoptimeArgsSchema(): z.ZodObject<Properties<TripDepartureStoptimeArgs>> {
  return z.object({
    serviceDate: z.string().nullish()
  })
}

export function TripStoptimesForDateArgsSchema(): z.ZodObject<Properties<TripStoptimesForDateArgs>> {
  return z.object({
    serviceDate: z.string().nullish()
  })
}

export function TripTripHeadsignArgsSchema(): z.ZodObject<Properties<TripTripHeadsignArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function TripOccupancySchema(): z.ZodObject<Properties<TripOccupancy>> {
  return z.object({
    __typename: z.literal('TripOccupancy').optional(),
    occupancyStatus: OccupancyStatusSchema.nullish()
  })
}

export function UnknownSchema(): z.ZodObject<Properties<Unknown>> {
  return z.object({
    __typename: z.literal('Unknown').optional(),
    description: z.string().nullish()
  })
}

export function VehicleParkingSchema(): z.ZodObject<Properties<VehicleParking>> {
  return z.object({
    __typename: z.literal('VehicleParking').optional(),
    anyCarPlaces: z.boolean().nullish(),
    availability: VehicleParkingSpacesSchema().nullish(),
    bicyclePlaces: z.boolean().nullish(),
    capacity: VehicleParkingSpacesSchema().nullish(),
    carPlaces: z.boolean().nullish(),
    detailsUrl: z.string().nullish(),
    id: z.string(),
    imageUrl: z.string().nullish(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    name: z.string(),
    note: z.string().nullish(),
    openingHours: OpeningHoursSchema().nullish(),
    realtime: z.boolean().nullish(),
    state: VehicleParkingStateSchema.nullish(),
    tags: z.array(z.string().nullable()).nullish(),
    vehicleParkingId: z.string().nullish(),
    wheelchairAccessibleCarPlaces: z.boolean().nullish()
  })
}

export function VehicleParkingNameArgsSchema(): z.ZodObject<Properties<VehicleParkingNameArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function VehicleParkingNoteArgsSchema(): z.ZodObject<Properties<VehicleParkingNoteArgs>> {
  return z.object({
    language: z.string().nullish()
  })
}

export function VehicleParkingInputSchema(): z.ZodObject<Properties<VehicleParkingInput>> {
  return z.object({
    filters: z.array(ParkingFilterSchema().nullable()).nullish(),
    preferred: z.array(ParkingFilterSchema().nullable()).nullish(),
    unpreferredCost: z.number().nullish()
  })
}

export function VehicleParkingSpacesSchema(): z.ZodObject<Properties<VehicleParkingSpaces>> {
  return z.object({
    __typename: z.literal('VehicleParkingSpaces').optional(),
    bicycleSpaces: z.number().nullish(),
    carSpaces: z.number().nullish(),
    wheelchairAccessibleCarSpaces: z.number().nullish()
  })
}

export function VehiclePositionSchema(): z.ZodObject<Properties<VehiclePosition>> {
  return z.object({
    __typename: z.literal('VehiclePosition').optional(),
    heading: z.number().nullish(),
    label: z.string().nullish(),
    lastUpdated: z.number().nullish(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    speed: z.number().nullish(),
    stopRelationship: StopRelationshipSchema().nullish(),
    trip: TripSchema(),
    vehicleId: z.string().nullish()
  })
}

export function VehicleRentalNetworkSchema(): z.ZodObject<Properties<VehicleRentalNetwork>> {
  return z.object({
    __typename: z.literal('VehicleRentalNetwork').optional(),
    networkId: z.string(),
    url: z.string().nullish()
  })
}

export function VehicleRentalStationSchema(): z.ZodObject<Properties<VehicleRentalStation>> {
  return z.object({
    __typename: z.literal('VehicleRentalStation').optional(),
    allowDropoff: z.boolean().nullish(),
    allowDropoffNow: z.boolean().nullish(),
    allowOverloading: z.boolean().nullish(),
    allowPickup: z.boolean().nullish(),
    allowPickupNow: z.boolean().nullish(),
    availableSpaces: RentalVehicleEntityCountsSchema().nullish(),
    availableVehicles: RentalVehicleEntityCountsSchema().nullish(),
    capacity: z.number().nullish(),
    id: z.string(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    name: z.string(),
    network: z.string().nullish(),
    operative: z.boolean().nullish(),
    realtime: z.boolean().nullish(),
    rentalNetwork: VehicleRentalNetworkSchema(),
    rentalUris: VehicleRentalUrisSchema().nullish(),
    spacesAvailable: z.number().nullish(),
    stationId: z.string().nullish(),
    vehiclesAvailable: z.number().nullish()
  })
}

export function VehicleRentalUrisSchema(): z.ZodObject<Properties<VehicleRentalUris>> {
  return z.object({
    __typename: z.literal('VehicleRentalUris').optional(),
    android: z.string().nullish(),
    ios: z.string().nullish(),
    web: z.string().nullish()
  })
}

export function WalkPreferencesInputSchema(): z.ZodObject<Properties<WalkPreferencesInput>> {
  return z.object({
    boardCost: z.number().nullish(),
    reluctance: z.number().nullish(),
    safetyFactor: z.number().nullish(),
    speed: z.number().nullish()
  })
}

export function WheelchairPreferencesInputSchema(): z.ZodObject<Properties<WheelchairPreferencesInput>> {
  return z.object({
    enabled: z.boolean().nullish()
  })
}

export function DebugOutputSchema(): z.ZodObject<Properties<DebugOutput>> {
  return z.object({
    __typename: z.literal('debugOutput').optional(),
    pathCalculationTime: z.number().nullish(),
    precalculationTime: z.number().nullish(),
    renderingTime: z.number().nullish(),
    timedOut: z.boolean().nullish(),
    totalTime: z.number().nullish()
  })
}

export function ElevationProfileComponentSchema(): z.ZodObject<Properties<ElevationProfileComponent>> {
  return z.object({
    __typename: z.literal('elevationProfileComponent').optional(),
    distance: z.number().nullish(),
    elevation: z.number().nullish()
  })
}

export function FareSchema(): z.ZodObject<Properties<Fare>> {
  return z.object({
    __typename: z.literal('fare').optional(),
    cents: z.number().nullish(),
    components: z.array(FareComponentSchema().nullable()).nullish(),
    currency: z.string().nullish(),
    type: z.string().nullish()
  })
}

export function FareComponentSchema(): z.ZodObject<Properties<FareComponent>> {
  return z.object({
    __typename: z.literal('fareComponent').optional(),
    cents: z.number().nullish(),
    currency: z.string().nullish(),
    fareId: z.string().nullish(),
    routes: z.array(RouteSchema().nullable()).nullish()
  })
}

export function PlaceAtDistanceSchema(): z.ZodObject<Properties<PlaceAtDistance>> {
  return z.object({
    __typename: z.literal('placeAtDistance').optional(),
    distance: z.number().nullish(),
    id: z.string(),
    place: PlaceInterfaceSchema().nullish()
  })
}

export function PlaceAtDistanceConnectionSchema(): z.ZodObject<Properties<PlaceAtDistanceConnection>> {
  return z.object({
    __typename: z.literal('placeAtDistanceConnection').optional(),
    edges: z.array(PlaceAtDistanceEdgeSchema().nullable()).nullish(),
    pageInfo: PageInfoSchema()
  })
}

export function PlaceAtDistanceEdgeSchema(): z.ZodObject<Properties<PlaceAtDistanceEdge>> {
  return z.object({
    __typename: z.literal('placeAtDistanceEdge').optional(),
    cursor: z.string(),
    node: PlaceAtDistanceSchema().nullish()
  })
}

export function ServiceTimeRangeSchema(): z.ZodObject<Properties<ServiceTimeRange>> {
  return z.object({
    __typename: z.literal('serviceTimeRange').optional(),
    end: z.number().nullish(),
    start: z.number().nullish()
  })
}

export function StepSchema(): z.ZodObject<Properties<Step>> {
  return z.object({
    __typename: z.literal('step').optional(),
    absoluteDirection: AbsoluteDirectionSchema.nullish(),
    alerts: z.array(AlertSchema().nullable()).nullish(),
    area: z.boolean().nullish(),
    bogusName: z.boolean().nullish(),
    distance: z.number().nullish(),
    elevationProfile: z.array(ElevationProfileComponentSchema().nullable()).nullish(),
    exit: z.string().nullish(),
    lat: z.number().nullish(),
    lon: z.number().nullish(),
    relativeDirection: RelativeDirectionSchema.nullish(),
    stayOn: z.boolean().nullish(),
    streetName: z.string().nullish(),
    walkingBike: z.boolean().nullish()
  })
}

export function StopAtDistanceSchema(): z.ZodObject<Properties<StopAtDistance>> {
  return z.object({
    __typename: z.literal('stopAtDistance').optional(),
    distance: z.number().nullish(),
    id: z.string(),
    stop: StopSchema().nullish()
  })
}

export function StopAtDistanceConnectionSchema(): z.ZodObject<Properties<StopAtDistanceConnection>> {
  return z.object({
    __typename: z.literal('stopAtDistanceConnection').optional(),
    edges: z.array(StopAtDistanceEdgeSchema().nullable()).nullish(),
    pageInfo: PageInfoSchema()
  })
}

export function StopAtDistanceEdgeSchema(): z.ZodObject<Properties<StopAtDistanceEdge>> {
  return z.object({
    __typename: z.literal('stopAtDistanceEdge').optional(),
    cursor: z.string(),
    node: StopAtDistanceSchema().nullish()
  })
}
