import * as yup from 'yup'
import { AbsoluteDirection, AccessibilityPreferencesInput, Agency, AgencyAlertsArgs, AgencyAlertType, Alert, AlertCauseType, AlertEffectType, AlertEntity, AlertSeverityLevelType, AlightPreferencesInput, BicycleParkingPreferencesInput, BicyclePreferencesInput, BicycleRentalPreferencesInput, BicycleWalkPreferencesCostInput, BicycleWalkPreferencesInput, BikePark, BikeParkNameArgs, BikeRentalStation, BikeRentalStationUris, BikesAllowed, BoardPreferencesInput, BookingInfo, BookingTime, CarPark, CarParkNameArgs, CarParkingPreferencesInput, CarPreferencesInput, CarRentalPreferencesInput, Cluster, ContactInfo, Coordinate, Coordinates, Currency, CyclingOptimizationInput, CyclingOptimizationType, DefaultFareProduct, DepartureRow, DepartureRowStoptimesArgs, DestinationBicyclePolicyInput, DestinationScooterPolicyInput, Emissions, FareMedium, FareProduct, FareProductUse, Feed, FeedAlertsArgs, FeedAlertType, FeedPublisher, FilterPlaceType, FormFactor, Geometry, InputBanned, InputCoordinates, InputField, InputFilters, InputModeWeight, InputPreferred, InputTriangle, InputUnpreferred, Itinerary, ItineraryFilterDebugProfile, Leg, LegNextLegsArgs, LegTime, LocalDateRangeInput, LocalTimeSpan, LocalTimeSpanDate, LocationType, Mode, Money, Node, OccupancyStatus, OpeningHours, OpeningHoursDatesArgs, OptimizeType, PageInfo, ParkingFilter, ParkingFilterOperation, Pattern, PatternAlertsArgs, PatternTripsForDateArgs, PatternAlertType, PickupDropoffType, Place, PlaceInterface, Plan, PlanAccessMode, PlanConnection, PlanCoordinateInput, PlanDateTimeInput, PlanDirectMode, PlanEdge, PlanEgressMode, PlanItineraryFilterInput, PlanLabeledLocationInput, PlanLocationInput, PlanModesInput, PlanPageInfo, PlanPreferencesInput, PlanStopLocationInput, PlanStreetPreferencesInput, PlanTransferMode, PlanTransitModePreferenceInput, PlanTransitModesInput, PositionAtStop, PositionBetweenStops, PropulsionType, Qualifier, QueryType, QueryTypeAgencyArgs, QueryTypeAlertsArgs, QueryTypeBikeParkArgs, QueryTypeBikeRentalStationArgs, QueryTypeBikeRentalStationsArgs, QueryTypeCancelledTripTimesArgs, QueryTypeCarParkArgs, QueryTypeCarParksArgs, QueryTypeClusterArgs, QueryTypeDepartureRowArgs, QueryTypeFuzzyTripArgs, QueryTypeNearestArgs, QueryTypeNodeArgs, QueryTypePatternArgs, QueryTypePlanArgs, QueryTypePlanConnectionArgs, QueryTypeRentalVehicleArgs, QueryTypeRentalVehiclesArgs, QueryTypeRouteArgs, QueryTypeRoutesArgs, QueryTypeStationArgs, QueryTypeStationsArgs, QueryTypeStopArgs, QueryTypeStopsArgs, QueryTypeStopsByBboxArgs, QueryTypeStopsByRadiusArgs, QueryTypeTripArgs, QueryTypeTripsArgs, QueryTypeVehicleParkingArgs, QueryTypeVehicleParkingsArgs, QueryTypeVehicleRentalStationArgs, QueryTypeVehicleRentalStationsArgs, RealTimeEstimate, RealtimeState, RelativeDirection, RentalVehicle, RentalVehicleEntityCounts, RentalVehicleType, RentalVehicleTypeCount, RideHailingEstimate, RideHailingProvider, RiderCategory, Route, RouteAlertsArgs, RouteLongNameArgs, RoutePatternsArgs, RouteAlertType, RouteType, RoutingError, RoutingErrorCode, ScooterOptimizationInput, ScooterOptimizationType, ScooterPreferencesInput, ScooterRentalPreferencesInput, Stop, StopAlertsArgs, StopDescArgs, StopNameArgs, StopStopTimesForPatternArgs, StopStoptimesForPatternsArgs, StopStoptimesForServiceDateArgs, StopStoptimesWithoutPatternsArgs, StopTransfersArgs, StopUrlArgs, StopAlertType, StopGeometries, StopOnRoute, StopOnTrip, StopPosition, StopRelationship, Stoptime, StoptimeHeadsignArgs, StoptimesInPattern, SystemNotice, TicketType, TimetablePreferencesInput, TransferPreferencesInput, TransitMode, TransitModePreferenceCostInput, TransitPreferencesInput, TranslatedString, TransportMode, TriangleCyclingFactorsInput, TriangleScooterFactorsInput, Trip, TripAlertsArgs, TripArrivalStoptimeArgs, TripDepartureStoptimeArgs, TripStoptimesForDateArgs, TripTripHeadsignArgs, TripAlertType, TripOccupancy, Unknown, VehicleParking, VehicleParkingNameArgs, VehicleParkingNoteArgs, VehicleParkingInput, VehicleParkingSpaces, VehicleParkingState, VehiclePosition, VehicleRentalNetwork, VehicleRentalStation, VehicleRentalUris, VehicleStopStatus, VertexType, WalkPreferencesInput, WheelchairBoarding, WheelchairPreferencesInput, DebugOutput, ElevationProfileComponent, Fare, FareComponent, PlaceAtDistance, PlaceAtDistanceConnection, PlaceAtDistanceEdge, ServiceTimeRange, Step, StopAtDistance, StopAtDistanceConnection, StopAtDistanceEdge } from '../types'

export const AbsoluteDirectionSchema = yup.string<AbsoluteDirection>().oneOf(Object.values(AbsoluteDirection)).defined();

export const AgencyAlertTypeSchema = yup.string<AgencyAlertType>().oneOf(Object.values(AgencyAlertType)).defined();

export const AlertCauseTypeSchema = yup.string<AlertCauseType>().oneOf(Object.values(AlertCauseType)).defined();

export const AlertEffectTypeSchema = yup.string<AlertEffectType>().oneOf(Object.values(AlertEffectType)).defined();

export const AlertSeverityLevelTypeSchema = yup.string<AlertSeverityLevelType>().oneOf(Object.values(AlertSeverityLevelType)).defined();

export const BikesAllowedSchema = yup.string<BikesAllowed>().oneOf(Object.values(BikesAllowed)).defined();

export const CyclingOptimizationTypeSchema = yup.string<CyclingOptimizationType>().oneOf(Object.values(CyclingOptimizationType)).defined();

export const FeedAlertTypeSchema = yup.string<FeedAlertType>().oneOf(Object.values(FeedAlertType)).defined();

export const FilterPlaceTypeSchema = yup.string<FilterPlaceType>().oneOf(Object.values(FilterPlaceType)).defined();

export const FormFactorSchema = yup.string<FormFactor>().oneOf(Object.values(FormFactor)).defined();

export const InputFieldSchema = yup.string<InputField>().oneOf(Object.values(InputField)).defined();

export const ItineraryFilterDebugProfileSchema = yup.string<ItineraryFilterDebugProfile>().oneOf(Object.values(ItineraryFilterDebugProfile)).defined();

export const LocationTypeSchema = yup.string<LocationType>().oneOf(Object.values(LocationType)).defined();

export const ModeSchema = yup.string<Mode>().oneOf(Object.values(Mode)).defined();

export const OccupancyStatusSchema = yup.string<OccupancyStatus>().oneOf(Object.values(OccupancyStatus)).defined();

export const OptimizeTypeSchema = yup.string<OptimizeType>().oneOf(Object.values(OptimizeType)).defined();

export const PatternAlertTypeSchema = yup.string<PatternAlertType>().oneOf(Object.values(PatternAlertType)).defined();

export const PickupDropoffTypeSchema = yup.string<PickupDropoffType>().oneOf(Object.values(PickupDropoffType)).defined();

export const PlanAccessModeSchema = yup.string<PlanAccessMode>().oneOf(Object.values(PlanAccessMode)).defined();

export const PlanDirectModeSchema = yup.string<PlanDirectMode>().oneOf(Object.values(PlanDirectMode)).defined();

export const PlanEgressModeSchema = yup.string<PlanEgressMode>().oneOf(Object.values(PlanEgressMode)).defined();

export const PlanTransferModeSchema = yup.string<PlanTransferMode>().oneOf(Object.values(PlanTransferMode)).defined();

export const PropulsionTypeSchema = yup.string<PropulsionType>().oneOf(Object.values(PropulsionType)).defined();

export const QualifierSchema = yup.string<Qualifier>().oneOf(Object.values(Qualifier)).defined();

export const RealtimeStateSchema = yup.string<RealtimeState>().oneOf(Object.values(RealtimeState)).defined();

export const RelativeDirectionSchema = yup.string<RelativeDirection>().oneOf(Object.values(RelativeDirection)).defined();

export const RouteAlertTypeSchema = yup.string<RouteAlertType>().oneOf(Object.values(RouteAlertType)).defined();

export const RoutingErrorCodeSchema = yup.string<RoutingErrorCode>().oneOf(Object.values(RoutingErrorCode)).defined();

export const ScooterOptimizationTypeSchema = yup.string<ScooterOptimizationType>().oneOf(Object.values(ScooterOptimizationType)).defined();

export const StopAlertTypeSchema = yup.string<StopAlertType>().oneOf(Object.values(StopAlertType)).defined();

export const TransitModeSchema = yup.string<TransitMode>().oneOf(Object.values(TransitMode)).defined();

export const TripAlertTypeSchema = yup.string<TripAlertType>().oneOf(Object.values(TripAlertType)).defined();

export const VehicleParkingStateSchema = yup.string<VehicleParkingState>().oneOf(Object.values(VehicleParkingState)).defined();

export const VehicleStopStatusSchema = yup.string<VehicleStopStatus>().oneOf(Object.values(VehicleStopStatus)).defined();

export const VertexTypeSchema = yup.string<VertexType>().oneOf(Object.values(VertexType)).defined();

export const WheelchairBoardingSchema = yup.string<WheelchairBoarding>().oneOf(Object.values(WheelchairBoarding)).defined();

function union<T extends {}>(...schemas: ReadonlyArray<yup.Schema<T>>): yup.MixedSchema<T> {
  return yup.mixed<T>().test({
    test: (value) => schemas.some((schema) => schema.isValidSync(value))
  }).defined()
}

export function AccessibilityPreferencesInputSchema(): yup.ObjectSchema<AccessibilityPreferencesInput> {
  return yup.object({
    wheelchair: yup.lazy(() => WheelchairPreferencesInputSchema()).optional()
  })
}

export function AgencySchema(): yup.ObjectSchema<Agency> {
  return yup.object({
    __typename: yup.string<'Agency'>().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    fareUrl: yup.string().defined().nullable().optional(),
    gtfsId: yup.string().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    lang: yup.string().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    phone: yup.string().defined().nullable().optional(),
    routes: yup.array(RouteSchema().nullable()).defined().nullable().optional(),
    timezone: yup.string().defined().nonNullable(),
    url: yup.string().defined().nonNullable()
  })
}

export function AgencyAlertsArgsSchema(): yup.ObjectSchema<AgencyAlertsArgs> {
  return yup.object({
    types: yup.array(AgencyAlertTypeSchema.nullable()).defined().nullable().optional()
  })
}

export function AlertSchema(): yup.ObjectSchema<Alert> {
  return yup.object({
    __typename: yup.string<'Alert'>().optional(),
    agency: AgencySchema().nullable().optional(),
    alertCause: AlertCauseTypeSchema.nullable().optional(),
    alertDescriptionText: yup.string().defined().nonNullable(),
    alertDescriptionTextTranslations: yup.array(TranslatedStringSchema().nonNullable()).defined(),
    alertEffect: AlertEffectTypeSchema.nullable().optional(),
    alertHash: yup.number().defined().nullable().optional(),
    alertHeaderText: yup.string().defined().nullable().optional(),
    alertHeaderTextTranslations: yup.array(TranslatedStringSchema().nonNullable()).defined(),
    alertSeverityLevel: AlertSeverityLevelTypeSchema.nullable().optional(),
    alertUrl: yup.string().defined().nullable().optional(),
    alertUrlTranslations: yup.array(TranslatedStringSchema().nonNullable()).defined(),
    effectiveEndDate: yup.number().defined().nullable().optional(),
    effectiveStartDate: yup.number().defined().nullable().optional(),
    entities: yup.array(AlertEntitySchema().nullable()).defined().nullable().optional(),
    feed: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    patterns: yup.array(PatternSchema().nullable()).defined().nullable().optional(),
    route: RouteSchema().nullable().optional(),
    stop: StopSchema().nullable().optional(),
    trip: TripSchema().nullable().optional()
  })
}

export function AlertEntitySchema(): yup.MixedSchema<AlertEntity> {
  return union<AlertEntity>(AgencySchema(), PatternSchema(), RouteSchema(), RouteTypeSchema(), StopSchema(), StopOnRouteSchema(), StopOnTripSchema(), TripSchema(), UnknownSchema())
}

export function AlightPreferencesInputSchema(): yup.ObjectSchema<AlightPreferencesInput> {
  return yup.object({
    slack: yup.string().defined().nullable().optional()
  })
}

export function BicycleParkingPreferencesInputSchema(): yup.ObjectSchema<BicycleParkingPreferencesInput> {
  return yup.object({
    filters: yup.array(ParkingFilterSchema().nonNullable()).defined().nullable().optional(),
    preferred: yup.array(ParkingFilterSchema().nonNullable()).defined().nullable().optional(),
    unpreferredCost: yup.number().defined().nullable().optional()
  })
}

export function BicyclePreferencesInputSchema(): yup.ObjectSchema<BicyclePreferencesInput> {
  return yup.object({
    boardCost: yup.number().defined().nullable().optional(),
    optimization: yup.lazy(() => CyclingOptimizationInputSchema()).optional(),
    parking: yup.lazy(() => BicycleParkingPreferencesInputSchema()).optional(),
    reluctance: yup.number().defined().nullable().optional(),
    rental: yup.lazy(() => BicycleRentalPreferencesInputSchema()).optional(),
    speed: yup.number().defined().nullable().optional(),
    walk: yup.lazy(() => BicycleWalkPreferencesInputSchema()).optional()
  })
}

export function BicycleRentalPreferencesInputSchema(): yup.ObjectSchema<BicycleRentalPreferencesInput> {
  return yup.object({
    allowedNetworks: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    bannedNetworks: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    destinationBicyclePolicy: yup.lazy(() => DestinationBicyclePolicyInputSchema()).optional()
  })
}

export function BicycleWalkPreferencesCostInputSchema(): yup.ObjectSchema<BicycleWalkPreferencesCostInput> {
  return yup.object({
    mountDismountCost: yup.number().defined().nullable().optional(),
    reluctance: yup.number().defined().nullable().optional()
  })
}

export function BicycleWalkPreferencesInputSchema(): yup.ObjectSchema<BicycleWalkPreferencesInput> {
  return yup.object({
    cost: yup.lazy(() => BicycleWalkPreferencesCostInputSchema()).optional(),
    mountDismountTime: yup.string().defined().nullable().optional(),
    speed: yup.number().defined().nullable().optional()
  })
}

export function BikeParkSchema(): yup.ObjectSchema<BikePark> {
  return yup.object({
    __typename: yup.string<'BikePark'>().optional(),
    bikeParkId: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    openingHours: OpeningHoursSchema().nullable().optional(),
    realtime: yup.boolean().defined().nullable().optional(),
    spacesAvailable: yup.number().defined().nullable().optional(),
    tags: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function BikeParkNameArgsSchema(): yup.ObjectSchema<BikeParkNameArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function BikeRentalStationSchema(): yup.ObjectSchema<BikeRentalStation> {
  return yup.object({
    __typename: yup.string<'BikeRentalStation'>().optional(),
    allowDropoff: yup.boolean().defined().nullable().optional(),
    allowDropoffNow: yup.boolean().defined().nullable().optional(),
    allowOverloading: yup.boolean().defined().nullable().optional(),
    allowPickup: yup.boolean().defined().nullable().optional(),
    allowPickupNow: yup.boolean().defined().nullable().optional(),
    bikesAvailable: yup.number().defined().nullable().optional(),
    capacity: yup.number().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    networks: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    operative: yup.boolean().defined().nullable().optional(),
    realtime: yup.boolean().defined().nullable().optional(),
    rentalUris: BikeRentalStationUrisSchema().nullable().optional(),
    spacesAvailable: yup.number().defined().nullable().optional(),
    state: yup.string().defined().nullable().optional(),
    stationId: yup.string().defined().nullable().optional()
  })
}

export function BikeRentalStationUrisSchema(): yup.ObjectSchema<BikeRentalStationUris> {
  return yup.object({
    __typename: yup.string<'BikeRentalStationUris'>().optional(),
    android: yup.string().defined().nullable().optional(),
    ios: yup.string().defined().nullable().optional(),
    web: yup.string().defined().nullable().optional()
  })
}

export function BoardPreferencesInputSchema(): yup.ObjectSchema<BoardPreferencesInput> {
  return yup.object({
    slack: yup.string().defined().nullable().optional(),
    waitReluctance: yup.number().defined().nullable().optional()
  })
}

export function BookingInfoSchema(): yup.ObjectSchema<BookingInfo> {
  return yup.object({
    __typename: yup.string<'BookingInfo'>().optional(),
    contactInfo: ContactInfoSchema().nullable().optional(),
    dropOffMessage: yup.string().defined().nullable().optional(),
    earliestBookingTime: BookingTimeSchema().nullable().optional(),
    latestBookingTime: BookingTimeSchema().nullable().optional(),
    maximumBookingNoticeSeconds: yup.number().defined().nullable().optional(),
    message: yup.string().defined().nullable().optional(),
    minimumBookingNoticeSeconds: yup.number().defined().nullable().optional(),
    pickupMessage: yup.string().defined().nullable().optional()
  })
}

export function BookingTimeSchema(): yup.ObjectSchema<BookingTime> {
  return yup.object({
    __typename: yup.string<'BookingTime'>().optional(),
    daysPrior: yup.number().defined().nullable().optional(),
    time: yup.string().defined().nullable().optional()
  })
}

export function CarParkSchema(): yup.ObjectSchema<CarPark> {
  return yup.object({
    __typename: yup.string<'CarPark'>().optional(),
    carParkId: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    maxCapacity: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    openingHours: OpeningHoursSchema().nullable().optional(),
    realtime: yup.boolean().defined().nullable().optional(),
    spacesAvailable: yup.number().defined().nullable().optional(),
    tags: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function CarParkNameArgsSchema(): yup.ObjectSchema<CarParkNameArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function CarParkingPreferencesInputSchema(): yup.ObjectSchema<CarParkingPreferencesInput> {
  return yup.object({
    filters: yup.array(ParkingFilterSchema().nonNullable()).defined().nullable().optional(),
    preferred: yup.array(ParkingFilterSchema().nonNullable()).defined().nullable().optional(),
    unpreferredCost: yup.number().defined().nullable().optional()
  })
}

export function CarPreferencesInputSchema(): yup.ObjectSchema<CarPreferencesInput> {
  return yup.object({
    parking: yup.lazy(() => CarParkingPreferencesInputSchema()).optional(),
    reluctance: yup.number().defined().nullable().optional(),
    rental: yup.lazy(() => CarRentalPreferencesInputSchema()).optional()
  })
}

export function CarRentalPreferencesInputSchema(): yup.ObjectSchema<CarRentalPreferencesInput> {
  return yup.object({
    allowedNetworks: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    bannedNetworks: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional()
  })
}

export function ClusterSchema(): yup.ObjectSchema<Cluster> {
  return yup.object({
    __typename: yup.string<'Cluster'>().optional(),
    gtfsId: yup.string().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nonNullable(),
    lon: yup.number().defined().nonNullable(),
    name: yup.string().defined().nonNullable(),
    stops: yup.array(StopSchema().nonNullable()).defined().nullable().optional()
  })
}

export function ContactInfoSchema(): yup.ObjectSchema<ContactInfo> {
  return yup.object({
    __typename: yup.string<'ContactInfo'>().optional(),
    additionalDetails: yup.string().defined().nullable().optional(),
    bookingUrl: yup.string().defined().nullable().optional(),
    contactPerson: yup.string().defined().nullable().optional(),
    eMail: yup.string().defined().nullable().optional(),
    faxNumber: yup.string().defined().nullable().optional(),
    infoUrl: yup.string().defined().nullable().optional(),
    phoneNumber: yup.string().defined().nullable().optional()
  })
}

export function CoordinateSchema(): yup.ObjectSchema<Coordinate> {
  return yup.object({
    __typename: yup.string<'Coordinate'>().optional(),
    latitude: yup.number().defined().nonNullable(),
    longitude: yup.number().defined().nonNullable()
  })
}

export function CoordinatesSchema(): yup.ObjectSchema<Coordinates> {
  return yup.object({
    __typename: yup.string<'Coordinates'>().optional(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional()
  })
}

export function CurrencySchema(): yup.ObjectSchema<Currency> {
  return yup.object({
    __typename: yup.string<'Currency'>().optional(),
    code: yup.string().defined().nonNullable(),
    digits: yup.number().defined().nonNullable()
  })
}

export function CyclingOptimizationInputSchema(): yup.ObjectSchema<CyclingOptimizationInput> {
  return yup.object({
    triangle: yup.lazy(() => TriangleCyclingFactorsInputSchema()).optional(),
    type: CyclingOptimizationTypeSchema.nullable().optional()
  })
}

export function DefaultFareProductSchema(): yup.ObjectSchema<DefaultFareProduct> {
  return yup.object({
    __typename: yup.string<'DefaultFareProduct'>().optional(),
    id: yup.string().defined().nonNullable(),
    medium: FareMediumSchema().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    price: MoneySchema().nonNullable(),
    riderCategory: RiderCategorySchema().nullable().optional()
  })
}

export function DepartureRowSchema(): yup.ObjectSchema<DepartureRow> {
  return yup.object({
    __typename: yup.string<'DepartureRow'>().optional(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    pattern: PatternSchema().nullable().optional(),
    stop: StopSchema().nullable().optional(),
    stoptimes: yup.array(StoptimeSchema().nullable()).defined().nullable().optional()
  })
}

export function DepartureRowStoptimesArgsSchema(): yup.ObjectSchema<DepartureRowStoptimesArgs> {
  return yup.object({
    numberOfDepartures: yup.number().defined().nullable().default(1).optional(),
    omitCanceled: yup.boolean().defined().nullable().default(true).optional(),
    omitNonPickups: yup.boolean().defined().nullable().default(false).optional(),
    startTime: yup.number().defined().nullable().default(0).optional(),
    timeRange: yup.number().defined().nullable().default(86400).optional()
  })
}

export function DestinationBicyclePolicyInputSchema(): yup.ObjectSchema<DestinationBicyclePolicyInput> {
  return yup.object({
    allowKeeping: yup.boolean().defined().nullable().optional(),
    keepingCost: yup.number().defined().nullable().optional()
  })
}

export function DestinationScooterPolicyInputSchema(): yup.ObjectSchema<DestinationScooterPolicyInput> {
  return yup.object({
    allowKeeping: yup.boolean().defined().nullable().optional(),
    keepingCost: yup.number().defined().nullable().optional()
  })
}

export function EmissionsSchema(): yup.ObjectSchema<Emissions> {
  return yup.object({
    __typename: yup.string<'Emissions'>().optional(),
    co2: yup.number().defined().nullable().optional()
  })
}

export function FareMediumSchema(): yup.ObjectSchema<FareMedium> {
  return yup.object({
    __typename: yup.string<'FareMedium'>().optional(),
    id: yup.string().defined().nonNullable(),
    name: yup.string().defined().nullable().optional()
  })
}

export function FareProductSchema(): yup.ObjectSchema<FareProduct> {
  return yup.object({
    id: yup.string().defined().nonNullable(),
    medium: FareMediumSchema().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    riderCategory: RiderCategorySchema().nullable().optional()
  })
}

export function FareProductUseSchema(): yup.ObjectSchema<FareProductUse> {
  return yup.object({
    __typename: yup.string<'FareProductUse'>().optional(),
    id: yup.string().defined().nonNullable(),
    product: FareProductSchema().nullable().optional()
  })
}

export function FeedSchema(): yup.ObjectSchema<Feed> {
  return yup.object({
    __typename: yup.string<'Feed'>().optional(),
    agencies: yup.array(AgencySchema().nullable()).defined().nullable().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    feedId: yup.string().defined().nonNullable(),
    publisher: FeedPublisherSchema().nullable().optional()
  })
}

export function FeedAlertsArgsSchema(): yup.ObjectSchema<FeedAlertsArgs> {
  return yup.object({
    types: yup.array(FeedAlertTypeSchema.nonNullable()).defined().nullable().optional()
  })
}

export function FeedPublisherSchema(): yup.ObjectSchema<FeedPublisher> {
  return yup.object({
    __typename: yup.string<'FeedPublisher'>().optional(),
    name: yup.string().defined().nonNullable(),
    url: yup.string().defined().nonNullable()
  })
}

export function GeometrySchema(): yup.ObjectSchema<Geometry> {
  return yup.object({
    __typename: yup.string<'Geometry'>().optional(),
    length: yup.number().defined().nullable().optional(),
    points: yup.string().defined().nullable().optional()
  })
}

export function InputBannedSchema(): yup.ObjectSchema<InputBanned> {
  return yup.object({
    agencies: yup.string().defined().nullable().optional(),
    routes: yup.string().defined().nullable().optional(),
    stops: yup.string().defined().nullable().optional(),
    stopsHard: yup.string().defined().nullable().optional(),
    trips: yup.string().defined().nullable().optional()
  })
}

export function InputCoordinatesSchema(): yup.ObjectSchema<InputCoordinates> {
  return yup.object({
    address: yup.string().defined().nullable().optional(),
    lat: yup.number().defined().nonNullable(),
    locationSlack: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nonNullable()
  })
}

export function InputFiltersSchema(): yup.ObjectSchema<InputFilters> {
  return yup.object({
    bikeParks: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    bikeRentalStations: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    carParks: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    routes: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    stations: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    stops: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function InputModeWeightSchema(): yup.ObjectSchema<InputModeWeight> {
  return yup.object({
    AIRPLANE: yup.number().defined().nullable().optional(),
    BUS: yup.number().defined().nullable().optional(),
    CABLE_CAR: yup.number().defined().nullable().optional(),
    FERRY: yup.number().defined().nullable().optional(),
    FUNICULAR: yup.number().defined().nullable().optional(),
    GONDOLA: yup.number().defined().nullable().optional(),
    RAIL: yup.number().defined().nullable().optional(),
    SUBWAY: yup.number().defined().nullable().optional(),
    TRAM: yup.number().defined().nullable().optional()
  })
}

export function InputPreferredSchema(): yup.ObjectSchema<InputPreferred> {
  return yup.object({
    agencies: yup.string().defined().nullable().optional(),
    otherThanPreferredRoutesPenalty: yup.number().defined().nullable().optional(),
    routes: yup.string().defined().nullable().optional()
  })
}

export function InputTriangleSchema(): yup.ObjectSchema<InputTriangle> {
  return yup.object({
    safetyFactor: yup.number().defined().nullable().optional(),
    slopeFactor: yup.number().defined().nullable().optional(),
    timeFactor: yup.number().defined().nullable().optional()
  })
}

export function InputUnpreferredSchema(): yup.ObjectSchema<InputUnpreferred> {
  return yup.object({
    agencies: yup.string().defined().nullable().optional(),
    routes: yup.string().defined().nullable().optional(),
    unpreferredCost: yup.string().defined().nullable().optional(),
    useUnpreferredRoutesPenalty: yup.number().defined().nullable().optional()
  })
}

export function ItinerarySchema(): yup.ObjectSchema<Itinerary> {
  return yup.object({
    __typename: yup.string<'Itinerary'>().optional(),
    accessibilityScore: yup.number().defined().nullable().optional(),
    arrivedAtDestinationWithRentedBicycle: yup.boolean().defined().nullable().optional(),
    duration: yup.number().defined().nullable().optional(),
    elevationGained: yup.number().defined().nullable().optional(),
    elevationLost: yup.number().defined().nullable().optional(),
    emissionsPerPerson: EmissionsSchema().nullable().optional(),
    end: yup.string().defined().nullable().optional(),
    endTime: yup.number().defined().nullable().optional(),
    fares: yup.array(FareSchema().nullable()).defined().nullable().optional(),
    generalizedCost: yup.number().defined().nullable().optional(),
    legs: yup.array(LegSchema().nullable()).defined(),
    numberOfTransfers: yup.number().defined().nonNullable(),
    start: yup.string().defined().nullable().optional(),
    startTime: yup.number().defined().nullable().optional(),
    systemNotices: yup.array(SystemNoticeSchema().nullable()).defined(),
    waitingTime: yup.number().defined().nullable().optional(),
    walkDistance: yup.number().defined().nullable().optional(),
    walkTime: yup.number().defined().nullable().optional()
  })
}

export function LegSchema(): yup.ObjectSchema<Leg> {
  return yup.object({
    __typename: yup.string<'Leg'>().optional(),
    accessibilityScore: yup.number().defined().nullable().optional(),
    agency: AgencySchema().nullable().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    arrivalDelay: yup.number().defined().nullable().optional(),
    departureDelay: yup.number().defined().nullable().optional(),
    distance: yup.number().defined().nullable().optional(),
    dropOffBookingInfo: BookingInfoSchema().nullable().optional(),
    dropoffType: PickupDropoffTypeSchema.nullable().optional(),
    duration: yup.number().defined().nullable().optional(),
    end: LegTimeSchema().nonNullable(),
    endTime: yup.number().defined().nullable().optional(),
    fareProducts: yup.array(FareProductUseSchema().nullable()).defined().nullable().optional(),
    from: PlaceSchema().nonNullable(),
    generalizedCost: yup.number().defined().nullable().optional(),
    headsign: yup.string().defined().nullable().optional(),
    interlineWithPreviousLeg: yup.boolean().defined().nullable().optional(),
    intermediatePlace: yup.boolean().defined().nullable().optional(),
    intermediatePlaces: yup.array(PlaceSchema().nullable()).defined().nullable().optional(),
    intermediateStops: yup.array(StopSchema().nullable()).defined().nullable().optional(),
    legGeometry: GeometrySchema().nullable().optional(),
    mode: ModeSchema.nullable().optional(),
    nextLegs: yup.array(LegSchema().nonNullable()).defined().nullable().optional(),
    pickupBookingInfo: BookingInfoSchema().nullable().optional(),
    pickupType: PickupDropoffTypeSchema.nullable().optional(),
    realTime: yup.boolean().defined().nullable().optional(),
    realtimeState: RealtimeStateSchema.nullable().optional(),
    rentedBike: yup.boolean().defined().nullable().optional(),
    rideHailingEstimate: RideHailingEstimateSchema().nullable().optional(),
    route: RouteSchema().nullable().optional(),
    serviceDate: yup.string().defined().nullable().optional(),
    start: LegTimeSchema().nonNullable(),
    startTime: yup.number().defined().nullable().optional(),
    steps: yup.array(StepSchema().nullable()).defined().nullable().optional(),
    to: PlaceSchema().nonNullable(),
    transitLeg: yup.boolean().defined().nullable().optional(),
    trip: TripSchema().nullable().optional(),
    walkingBike: yup.boolean().defined().nullable().optional()
  })
}

export function LegNextLegsArgsSchema(): yup.ObjectSchema<LegNextLegsArgs> {
  return yup.object({
    destinationModesWithParentStation: yup.array(TransitModeSchema.nonNullable()).defined().nullable().optional(),
    numberOfLegs: yup.number().defined().nonNullable(),
    originModesWithParentStation: yup.array(TransitModeSchema.nonNullable()).defined().nullable().optional()
  })
}

export function LegTimeSchema(): yup.ObjectSchema<LegTime> {
  return yup.object({
    __typename: yup.string<'LegTime'>().optional(),
    estimated: RealTimeEstimateSchema().nullable().optional(),
    scheduledTime: yup.string().defined().nonNullable()
  })
}

export function LocalDateRangeInputSchema(): yup.ObjectSchema<LocalDateRangeInput> {
  return yup.object({
    end: yup.string().defined().nullable().optional(),
    start: yup.string().defined().nullable().optional()
  })
}

export function LocalTimeSpanSchema(): yup.ObjectSchema<LocalTimeSpan> {
  return yup.object({
    __typename: yup.string<'LocalTimeSpan'>().optional(),
    from: yup.number().defined().nonNullable(),
    to: yup.number().defined().nonNullable()
  })
}

export function LocalTimeSpanDateSchema(): yup.ObjectSchema<LocalTimeSpanDate> {
  return yup.object({
    __typename: yup.string<'LocalTimeSpanDate'>().optional(),
    date: yup.string().defined().nonNullable(),
    timeSpans: yup.array(LocalTimeSpanSchema().nullable()).defined().nullable().optional()
  })
}

export function MoneySchema(): yup.ObjectSchema<Money> {
  return yup.object({
    __typename: yup.string<'Money'>().optional(),
    amount: yup.number().defined().nonNullable(),
    currency: CurrencySchema().nonNullable()
  })
}

export function NodeSchema(): yup.ObjectSchema<Node> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function OpeningHoursSchema(): yup.ObjectSchema<OpeningHours> {
  return yup.object({
    __typename: yup.string<'OpeningHours'>().optional(),
    dates: yup.array(LocalTimeSpanDateSchema().nullable()).defined().nullable().optional(),
    osm: yup.string().defined().nullable().optional()
  })
}

export function OpeningHoursDatesArgsSchema(): yup.ObjectSchema<OpeningHoursDatesArgs> {
  return yup.object({
    dates: yup.array(yup.string().defined().nonNullable()).defined()
  })
}

export function PageInfoSchema(): yup.ObjectSchema<PageInfo> {
  return yup.object({
    __typename: yup.string<'PageInfo'>().optional(),
    endCursor: yup.string().defined().nullable().optional(),
    hasNextPage: yup.boolean().defined().nonNullable(),
    hasPreviousPage: yup.boolean().defined().nonNullable(),
    startCursor: yup.string().defined().nullable().optional()
  })
}

export function ParkingFilterSchema(): yup.ObjectSchema<ParkingFilter> {
  return yup.object({
    not: yup.array(ParkingFilterOperationSchema().nonNullable()).defined().nullable().optional(),
    select: yup.array(ParkingFilterOperationSchema().nonNullable()).defined().nullable().optional()
  })
}

export function ParkingFilterOperationSchema(): yup.ObjectSchema<ParkingFilterOperation> {
  return yup.object({
    tags: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function PatternSchema(): yup.ObjectSchema<Pattern> {
  return yup.object({
    __typename: yup.string<'Pattern'>().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    code: yup.string().defined().nonNullable(),
    directionId: yup.number().defined().nullable().optional(),
    geometry: yup.array(CoordinatesSchema().nullable()).defined().nullable().optional(),
    headsign: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    name: yup.string().defined().nullable().optional(),
    originalTripPattern: PatternSchema().nullable().optional(),
    patternGeometry: GeometrySchema().nullable().optional(),
    route: RouteSchema().nonNullable(),
    semanticHash: yup.string().defined().nullable().optional(),
    stops: yup.array(StopSchema().nonNullable()).defined().nullable().optional(),
    trips: yup.array(TripSchema().nonNullable()).defined().nullable().optional(),
    tripsForDate: yup.array(TripSchema().nonNullable()).defined().nullable().optional(),
    vehiclePositions: yup.array(VehiclePositionSchema().nonNullable()).defined().nullable().optional()
  })
}

export function PatternAlertsArgsSchema(): yup.ObjectSchema<PatternAlertsArgs> {
  return yup.object({
    types: yup.array(PatternAlertTypeSchema.nullable()).defined().nullable().optional()
  })
}

export function PatternTripsForDateArgsSchema(): yup.ObjectSchema<PatternTripsForDateArgs> {
  return yup.object({
    serviceDate: yup.string().defined().nullable().optional()
  })
}

export function PlaceSchema(): yup.ObjectSchema<Place> {
  return yup.object({
    __typename: yup.string<'Place'>().optional(),
    arrival: LegTimeSchema().nullable().optional(),
    arrivalTime: yup.number().defined().nonNullable(),
    bikePark: BikeParkSchema().nullable().optional(),
    bikeRentalStation: BikeRentalStationSchema().nullable().optional(),
    carPark: CarParkSchema().nullable().optional(),
    departure: LegTimeSchema().nullable().optional(),
    departureTime: yup.number().defined().nonNullable(),
    lat: yup.number().defined().nonNullable(),
    lon: yup.number().defined().nonNullable(),
    name: yup.string().defined().nullable().optional(),
    rentalVehicle: RentalVehicleSchema().nullable().optional(),
    stop: StopSchema().nullable().optional(),
    stopPosition: StopPositionSchema().nullable().optional(),
    vehicleParking: VehicleParkingSchema().nullable().optional(),
    vehicleRentalStation: VehicleRentalStationSchema().nullable().optional(),
    vertexType: VertexTypeSchema.nullable().optional()
  })
}

export function PlaceInterfaceSchema(): yup.ObjectSchema<PlaceInterface> {
  return yup.object({
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional()
  })
}

export function PlanSchema(): yup.ObjectSchema<Plan> {
  return yup.object({
    __typename: yup.string<'Plan'>().optional(),
    date: yup.number().defined().nullable().optional(),
    debugOutput: DebugOutputSchema().nonNullable(),
    from: PlaceSchema().nonNullable(),
    itineraries: yup.array(ItinerarySchema().nullable()).defined(),
    messageEnums: yup.array(yup.string().defined().nullable()).defined(),
    messageStrings: yup.array(yup.string().defined().nullable()).defined(),
    nextDateTime: yup.number().defined().nullable().optional(),
    nextPageCursor: yup.string().defined().nullable().optional(),
    prevDateTime: yup.number().defined().nullable().optional(),
    previousPageCursor: yup.string().defined().nullable().optional(),
    routingErrors: yup.array(RoutingErrorSchema().nonNullable()).defined(),
    searchWindowUsed: yup.number().defined().nullable().optional(),
    to: PlaceSchema().nonNullable()
  })
}

export function PlanConnectionSchema(): yup.ObjectSchema<PlanConnection> {
  return yup.object({
    __typename: yup.string<'PlanConnection'>().optional(),
    edges: yup.array(PlanEdgeSchema().nullable()).defined().nullable().optional(),
    pageInfo: PlanPageInfoSchema().nonNullable(),
    routingErrors: yup.array(RoutingErrorSchema().nonNullable()).defined(),
    searchDateTime: yup.string().defined().nullable().optional()
  })
}

export function PlanCoordinateInputSchema(): yup.ObjectSchema<PlanCoordinateInput> {
  return yup.object({
    latitude: yup.number().defined().nonNullable(),
    longitude: yup.number().defined().nonNullable()
  })
}

export function PlanDateTimeInputSchema(): yup.ObjectSchema<PlanDateTimeInput> {
  return yup.object({
    earliestDeparture: yup.string().defined().nullable().optional(),
    latestArrival: yup.string().defined().nullable().optional()
  })
}

export function PlanEdgeSchema(): yup.ObjectSchema<PlanEdge> {
  return yup.object({
    __typename: yup.string<'PlanEdge'>().optional(),
    cursor: yup.string().defined().nonNullable(),
    node: ItinerarySchema().nonNullable()
  })
}

export function PlanItineraryFilterInputSchema(): yup.ObjectSchema<PlanItineraryFilterInput> {
  return yup.object({
    groupSimilarityKeepOne: yup.number().defined().nullable().default(0.85).optional(),
    groupSimilarityKeepThree: yup.number().defined().nullable().default(0.68).optional(),
    groupedOtherThanSameLegsMaxCostMultiplier: yup.number().defined().nullable().default(2).optional(),
    itineraryFilterDebugProfile: ItineraryFilterDebugProfileSchema.nullable().default("OFF").optional()
  })
}

export function PlanLabeledLocationInputSchema(): yup.ObjectSchema<PlanLabeledLocationInput> {
  return yup.object({
    label: yup.string().defined().nullable().optional(),
    location: yup.lazy(() => PlanLocationInputSchema().nonNullable())
  })
}

export function PlanLocationInputSchema(): yup.ObjectSchema<PlanLocationInput> {
  return yup.object({
    coordinate: yup.lazy(() => PlanCoordinateInputSchema()).optional(),
    stopLocation: yup.lazy(() => PlanStopLocationInputSchema()).optional()
  })
}

export function PlanModesInputSchema(): yup.ObjectSchema<PlanModesInput> {
  return yup.object({
    direct: yup.array(PlanDirectModeSchema.nonNullable()).defined().nullable().optional(),
    directOnly: yup.boolean().defined().nullable().default(false).optional(),
    transit: yup.lazy(() => PlanTransitModesInputSchema()).optional(),
    transitOnly: yup.boolean().defined().nullable().default(false).optional()
  })
}

export function PlanPageInfoSchema(): yup.ObjectSchema<PlanPageInfo> {
  return yup.object({
    __typename: yup.string<'PlanPageInfo'>().optional(),
    endCursor: yup.string().defined().nullable().optional(),
    hasNextPage: yup.boolean().defined().nonNullable(),
    hasPreviousPage: yup.boolean().defined().nonNullable(),
    searchWindowUsed: yup.string().defined().nullable().optional(),
    startCursor: yup.string().defined().nullable().optional()
  })
}

export function PlanPreferencesInputSchema(): yup.ObjectSchema<PlanPreferencesInput> {
  return yup.object({
    accessibility: yup.lazy(() => AccessibilityPreferencesInputSchema()).optional(),
    street: yup.lazy(() => PlanStreetPreferencesInputSchema()).optional(),
    transit: yup.lazy(() => TransitPreferencesInputSchema()).optional()
  })
}

export function PlanStopLocationInputSchema(): yup.ObjectSchema<PlanStopLocationInput> {
  return yup.object({
    stopLocationId: yup.string().defined().nonNullable()
  })
}

export function PlanStreetPreferencesInputSchema(): yup.ObjectSchema<PlanStreetPreferencesInput> {
  return yup.object({
    bicycle: yup.lazy(() => BicyclePreferencesInputSchema()).optional(),
    car: yup.lazy(() => CarPreferencesInputSchema()).optional(),
    scooter: yup.lazy(() => ScooterPreferencesInputSchema()).optional(),
    walk: yup.lazy(() => WalkPreferencesInputSchema()).optional()
  })
}

export function PlanTransitModePreferenceInputSchema(): yup.ObjectSchema<PlanTransitModePreferenceInput> {
  return yup.object({
    cost: yup.lazy(() => TransitModePreferenceCostInputSchema()).optional(),
    mode: TransitModeSchema.nonNullable()
  })
}

export function PlanTransitModesInputSchema(): yup.ObjectSchema<PlanTransitModesInput> {
  return yup.object({
    access: yup.array(PlanAccessModeSchema.nonNullable()).defined().nullable().optional(),
    egress: yup.array(PlanEgressModeSchema.nonNullable()).defined().nullable().optional(),
    transfer: yup.array(PlanTransferModeSchema.nonNullable()).defined().nullable().optional(),
    transit: yup.array(yup.lazy(() => PlanTransitModePreferenceInputSchema().nonNullable())).defined().nullable().optional()
  })
}

export function PositionAtStopSchema(): yup.ObjectSchema<PositionAtStop> {
  return yup.object({
    __typename: yup.string<'PositionAtStop'>().optional(),
    position: yup.number().defined().nullable().optional()
  })
}

export function PositionBetweenStopsSchema(): yup.ObjectSchema<PositionBetweenStops> {
  return yup.object({
    __typename: yup.string<'PositionBetweenStops'>().optional(),
    nextPosition: yup.number().defined().nullable().optional(),
    previousPosition: yup.number().defined().nullable().optional()
  })
}

export function QueryTypeSchema(): yup.ObjectSchema<QueryType> {
  return yup.object({
    __typename: yup.string<'QueryType'>().optional(),
    agencies: yup.array(AgencySchema().nullable()).defined().nullable().optional(),
    agency: AgencySchema().nullable().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    bikePark: BikeParkSchema().nullable().optional(),
    bikeParks: yup.array(BikeParkSchema().nullable()).defined().nullable().optional(),
    bikeRentalStation: BikeRentalStationSchema().nullable().optional(),
    bikeRentalStations: yup.array(BikeRentalStationSchema().nullable()).defined().nullable().optional(),
    cancelledTripTimes: yup.array(StoptimeSchema().nullable()).defined().nullable().optional(),
    carPark: CarParkSchema().nullable().optional(),
    carParks: yup.array(CarParkSchema().nullable()).defined().nullable().optional(),
    cluster: ClusterSchema().nullable().optional(),
    clusters: yup.array(ClusterSchema().nullable()).defined().nullable().optional(),
    departureRow: DepartureRowSchema().nullable().optional(),
    feeds: yup.array(FeedSchema().nullable()).defined().nullable().optional(),
    fuzzyTrip: TripSchema().nullable().optional(),
    nearest: PlaceAtDistanceConnectionSchema().nullable().optional(),
    node: NodeSchema().nullable().optional(),
    pattern: PatternSchema().nullable().optional(),
    patterns: yup.array(PatternSchema().nullable()).defined().nullable().optional(),
    plan: PlanSchema().nullable().optional(),
    planConnection: PlanConnectionSchema().nullable().optional(),
    rentalVehicle: RentalVehicleSchema().nullable().optional(),
    rentalVehicles: yup.array(RentalVehicleSchema().nullable()).defined().nullable().optional(),
    route: RouteSchema().nullable().optional(),
    routes: yup.array(RouteSchema().nullable()).defined().nullable().optional(),
    serviceTimeRange: ServiceTimeRangeSchema().nullable().optional(),
    station: StopSchema().nullable().optional(),
    stations: yup.array(StopSchema().nullable()).defined().nullable().optional(),
    stop: StopSchema().nullable().optional(),
    stops: yup.array(StopSchema().nullable()).defined().nullable().optional(),
    stopsByBbox: yup.array(StopSchema().nullable()).defined().nullable().optional(),
    stopsByRadius: StopAtDistanceConnectionSchema().nullable().optional(),
    ticketTypes: yup.array(TicketTypeSchema().nullable()).defined().nullable().optional(),
    trip: TripSchema().nullable().optional(),
    trips: yup.array(TripSchema().nullable()).defined().nullable().optional(),
    vehicleParking: VehicleParkingSchema().nullable().optional(),
    vehicleParkings: yup.array(VehicleParkingSchema().nullable()).defined().nullable().optional(),
    vehicleRentalStation: VehicleRentalStationSchema().nullable().optional(),
    vehicleRentalStations: yup.array(VehicleRentalStationSchema().nullable()).defined().nullable().optional(),
    viewer: QueryTypeSchema().nullable().optional()
  })
}

export function QueryTypeAgencyArgsSchema(): yup.ObjectSchema<QueryTypeAgencyArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeAlertsArgsSchema(): yup.ObjectSchema<QueryTypeAlertsArgs> {
  return yup.object({
    cause: yup.array(AlertCauseTypeSchema.nonNullable()).defined().nullable().optional(),
    effect: yup.array(AlertEffectTypeSchema.nonNullable()).defined().nullable().optional(),
    feeds: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    route: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    severityLevel: yup.array(AlertSeverityLevelTypeSchema.nonNullable()).defined().nullable().optional(),
    stop: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional()
  })
}

export function QueryTypeBikeParkArgsSchema(): yup.ObjectSchema<QueryTypeBikeParkArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeBikeRentalStationArgsSchema(): yup.ObjectSchema<QueryTypeBikeRentalStationArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeBikeRentalStationsArgsSchema(): yup.ObjectSchema<QueryTypeBikeRentalStationsArgs> {
  return yup.object({
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function QueryTypeCancelledTripTimesArgsSchema(): yup.ObjectSchema<QueryTypeCancelledTripTimesArgs> {
  return yup.object({
    feeds: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    maxArrivalTime: yup.number().defined().nullable().optional(),
    maxDate: yup.string().defined().nullable().optional(),
    maxDepartureTime: yup.number().defined().nullable().optional(),
    minArrivalTime: yup.number().defined().nullable().optional(),
    minDate: yup.string().defined().nullable().optional(),
    minDepartureTime: yup.number().defined().nullable().optional(),
    patterns: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    routes: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    trips: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function QueryTypeCarParkArgsSchema(): yup.ObjectSchema<QueryTypeCarParkArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeCarParksArgsSchema(): yup.ObjectSchema<QueryTypeCarParksArgs> {
  return yup.object({
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function QueryTypeClusterArgsSchema(): yup.ObjectSchema<QueryTypeClusterArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeDepartureRowArgsSchema(): yup.ObjectSchema<QueryTypeDepartureRowArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeFuzzyTripArgsSchema(): yup.ObjectSchema<QueryTypeFuzzyTripArgs> {
  return yup.object({
    date: yup.string().defined().nonNullable(),
    direction: yup.number().defined().nullable().default(-1).optional(),
    route: yup.string().defined().nonNullable(),
    time: yup.number().defined().nonNullable()
  })
}

export function QueryTypeNearestArgsSchema(): yup.ObjectSchema<QueryTypeNearestArgs> {
  return yup.object({
    after: yup.string().defined().nullable().optional(),
    before: yup.string().defined().nullable().optional(),
    filterByIds: yup.lazy(() => InputFiltersSchema()).optional(),
    filterByModes: yup.array(ModeSchema.nullable()).defined().nullable().optional(),
    filterByNetwork: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    filterByPlaceTypes: yup.array(FilterPlaceTypeSchema.nullable()).defined().nullable().optional(),
    first: yup.number().defined().nullable().optional(),
    last: yup.number().defined().nullable().optional(),
    lat: yup.number().defined().nonNullable(),
    lon: yup.number().defined().nonNullable(),
    maxDistance: yup.number().defined().nullable().default(2000).optional(),
    maxResults: yup.number().defined().nullable().default(20).optional()
  })
}

export function QueryTypeNodeArgsSchema(): yup.ObjectSchema<QueryTypeNodeArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypePatternArgsSchema(): yup.ObjectSchema<QueryTypePatternArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypePlanArgsSchema(): yup.ObjectSchema<QueryTypePlanArgs> {
  return yup.object({
    alightSlack: yup.number().defined().nullable().optional(),
    allowBikeRental: yup.boolean().defined().nullable().optional(),
    allowKeepingRentedBicycleAtDestination: yup.boolean().defined().nullable().optional(),
    allowedBikeRentalNetworks: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    allowedTicketTypes: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    allowedVehicleRentalNetworks: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    arriveBy: yup.boolean().defined().nullable().optional(),
    banned: yup.lazy(() => InputBannedSchema()).optional(),
    bannedVehicleRentalNetworks: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    batch: yup.boolean().defined().nullable().optional(),
    bikeBoardCost: yup.number().defined().nullable().optional(),
    bikeReluctance: yup.number().defined().nullable().optional(),
    bikeSpeed: yup.number().defined().nullable().optional(),
    bikeSwitchCost: yup.number().defined().nullable().optional(),
    bikeSwitchTime: yup.number().defined().nullable().optional(),
    bikeWalkingReluctance: yup.number().defined().nullable().optional(),
    boardSlack: yup.number().defined().nullable().optional(),
    carParkCarLegWeight: yup.number().defined().nullable().optional(),
    carReluctance: yup.number().defined().nullable().optional(),
    claimInitialWait: yup.number().defined().nullable().optional(),
    compactLegsByReversedSearch: yup.boolean().defined().nullable().optional(),
    date: yup.string().defined().nullable().optional(),
    debugItineraryFilter: yup.boolean().defined().nullable().optional(),
    disableRemainingWeightHeuristic: yup.boolean().defined().nullable().optional(),
    from: yup.lazy(() => InputCoordinatesSchema()).optional(),
    fromPlace: yup.string().defined().nullable().optional(),
    heuristicStepsPerMainStep: yup.number().defined().nullable().optional(),
    ignoreRealtimeUpdates: yup.boolean().defined().nullable().optional(),
    intermediatePlaces: yup.array(yup.lazy(() => InputCoordinatesSchema())).defined().nullable().optional(),
    itineraryFiltering: yup.number().defined().nullable().optional(),
    keepingRentedBicycleAtDestinationCost: yup.number().defined().nullable().optional(),
    locale: yup.string().defined().nullable().optional(),
    maxPreTransitTime: yup.number().defined().nullable().optional(),
    maxTransfers: yup.number().defined().nullable().optional(),
    maxWalkDistance: yup.number().defined().nullable().optional(),
    minTransferTime: yup.number().defined().nullable().optional(),
    modeWeight: yup.lazy(() => InputModeWeightSchema()).optional(),
    nonpreferredTransferPenalty: yup.number().defined().nullable().optional(),
    numItineraries: yup.number().defined().nullable().default(3).optional(),
    omitCanceled: yup.boolean().defined().nullable().default(true).optional(),
    optimize: OptimizeTypeSchema.nullable().optional(),
    pageCursor: yup.string().defined().nullable().optional(),
    parking: yup.lazy(() => VehicleParkingInputSchema()).optional(),
    preferred: yup.lazy(() => InputPreferredSchema()).optional(),
    reverseOptimizeOnTheFly: yup.boolean().defined().nullable().optional(),
    searchWindow: yup.number().defined().nullable().optional(),
    startTransitStopId: yup.string().defined().nullable().optional(),
    startTransitTripId: yup.string().defined().nullable().optional(),
    time: yup.string().defined().nullable().optional(),
    to: yup.lazy(() => InputCoordinatesSchema()).optional(),
    toPlace: yup.string().defined().nullable().optional(),
    transferPenalty: yup.number().defined().nullable().optional(),
    transportModes: yup.array(TransportModeSchema()).defined().nullable().optional(),
    triangle: yup.lazy(() => InputTriangleSchema()).optional(),
    unpreferred: yup.lazy(() => InputUnpreferredSchema()).optional(),
    waitAtBeginningFactor: yup.number().defined().nullable().optional(),
    waitReluctance: yup.number().defined().nullable().optional(),
    walkBoardCost: yup.number().defined().nullable().optional(),
    walkOnStreetReluctance: yup.number().defined().nullable().optional(),
    walkReluctance: yup.number().defined().nullable().optional(),
    walkSafetyFactor: yup.number().defined().nullable().optional(),
    walkSpeed: yup.number().defined().nullable().optional(),
    wheelchair: yup.boolean().defined().nullable().optional()
  })
}

export function QueryTypePlanConnectionArgsSchema(): yup.ObjectSchema<QueryTypePlanConnectionArgs> {
  return yup.object({
    after: yup.string().defined().nullable().optional(),
    before: yup.string().defined().nullable().optional(),
    dateTime: yup.lazy(() => PlanDateTimeInputSchema()).optional(),
    destination: yup.lazy(() => PlanLabeledLocationInputSchema().nonNullable()),
    first: yup.number().defined().nullable().optional(),
    itineraryFilter: yup.lazy(() => PlanItineraryFilterInputSchema()).optional(),
    last: yup.number().defined().nullable().optional(),
    locale: yup.string().defined().nullable().optional(),
    modes: yup.lazy(() => PlanModesInputSchema()).optional(),
    origin: yup.lazy(() => PlanLabeledLocationInputSchema().nonNullable()),
    preferences: yup.lazy(() => PlanPreferencesInputSchema()).optional(),
    searchWindow: yup.string().defined().nullable().optional()
  })
}

export function QueryTypeRentalVehicleArgsSchema(): yup.ObjectSchema<QueryTypeRentalVehicleArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeRentalVehiclesArgsSchema(): yup.ObjectSchema<QueryTypeRentalVehiclesArgs> {
  return yup.object({
    formFactors: yup.array(FormFactorSchema.nullable()).defined().nullable().optional(),
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function QueryTypeRouteArgsSchema(): yup.ObjectSchema<QueryTypeRouteArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeRoutesArgsSchema(): yup.ObjectSchema<QueryTypeRoutesArgs> {
  return yup.object({
    feeds: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    name: yup.string().defined().nullable().optional(),
    serviceDates: yup.lazy(() => LocalDateRangeInputSchema()).optional(),
    transportModes: yup.array(ModeSchema.nullable()).defined().nullable().optional()
  })
}

export function QueryTypeStationArgsSchema(): yup.ObjectSchema<QueryTypeStationArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeStationsArgsSchema(): yup.ObjectSchema<QueryTypeStationsArgs> {
  return yup.object({
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    name: yup.string().defined().nullable().optional()
  })
}

export function QueryTypeStopArgsSchema(): yup.ObjectSchema<QueryTypeStopArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeStopsArgsSchema(): yup.ObjectSchema<QueryTypeStopsArgs> {
  return yup.object({
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    name: yup.string().defined().nullable().optional()
  })
}

export function QueryTypeStopsByBboxArgsSchema(): yup.ObjectSchema<QueryTypeStopsByBboxArgs> {
  return yup.object({
    feeds: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    maxLat: yup.number().defined().nonNullable(),
    maxLon: yup.number().defined().nonNullable(),
    minLat: yup.number().defined().nonNullable(),
    minLon: yup.number().defined().nonNullable()
  })
}

export function QueryTypeStopsByRadiusArgsSchema(): yup.ObjectSchema<QueryTypeStopsByRadiusArgs> {
  return yup.object({
    after: yup.string().defined().nullable().optional(),
    before: yup.string().defined().nullable().optional(),
    feeds: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    first: yup.number().defined().nullable().optional(),
    last: yup.number().defined().nullable().optional(),
    lat: yup.number().defined().nonNullable(),
    lon: yup.number().defined().nonNullable(),
    radius: yup.number().defined().nonNullable()
  })
}

export function QueryTypeTripArgsSchema(): yup.ObjectSchema<QueryTypeTripArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeTripsArgsSchema(): yup.ObjectSchema<QueryTypeTripsArgs> {
  return yup.object({
    feeds: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function QueryTypeVehicleParkingArgsSchema(): yup.ObjectSchema<QueryTypeVehicleParkingArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeVehicleParkingsArgsSchema(): yup.ObjectSchema<QueryTypeVehicleParkingsArgs> {
  return yup.object({
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function QueryTypeVehicleRentalStationArgsSchema(): yup.ObjectSchema<QueryTypeVehicleRentalStationArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable()
  })
}

export function QueryTypeVehicleRentalStationsArgsSchema(): yup.ObjectSchema<QueryTypeVehicleRentalStationsArgs> {
  return yup.object({
    ids: yup.array(yup.string().defined().nullable()).defined().nullable().optional()
  })
}

export function RealTimeEstimateSchema(): yup.ObjectSchema<RealTimeEstimate> {
  return yup.object({
    __typename: yup.string<'RealTimeEstimate'>().optional(),
    delay: yup.string().defined().nonNullable(),
    time: yup.string().defined().nonNullable()
  })
}

export function RentalVehicleSchema(): yup.ObjectSchema<RentalVehicle> {
  return yup.object({
    __typename: yup.string<'RentalVehicle'>().optional(),
    allowPickupNow: yup.boolean().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    network: yup.string().defined().nullable().optional(),
    operative: yup.boolean().defined().nullable().optional(),
    rentalNetwork: VehicleRentalNetworkSchema().nonNullable(),
    rentalUris: VehicleRentalUrisSchema().nullable().optional(),
    vehicleId: yup.string().defined().nullable().optional(),
    vehicleType: RentalVehicleTypeSchema().nullable().optional()
  })
}

export function RentalVehicleEntityCountsSchema(): yup.ObjectSchema<RentalVehicleEntityCounts> {
  return yup.object({
    __typename: yup.string<'RentalVehicleEntityCounts'>().optional(),
    byType: yup.array(RentalVehicleTypeCountSchema().nonNullable()).defined(),
    total: yup.number().defined().nonNullable()
  })
}

export function RentalVehicleTypeSchema(): yup.ObjectSchema<RentalVehicleType> {
  return yup.object({
    __typename: yup.string<'RentalVehicleType'>().optional(),
    formFactor: FormFactorSchema.nullable().optional(),
    propulsionType: PropulsionTypeSchema.nullable().optional()
  })
}

export function RentalVehicleTypeCountSchema(): yup.ObjectSchema<RentalVehicleTypeCount> {
  return yup.object({
    __typename: yup.string<'RentalVehicleTypeCount'>().optional(),
    count: yup.number().defined().nonNullable(),
    vehicleType: RentalVehicleTypeSchema().nonNullable()
  })
}

export function RideHailingEstimateSchema(): yup.ObjectSchema<RideHailingEstimate> {
  return yup.object({
    __typename: yup.string<'RideHailingEstimate'>().optional(),
    arrival: yup.string().defined().nonNullable(),
    maxPrice: MoneySchema().nonNullable(),
    minPrice: MoneySchema().nonNullable(),
    productName: yup.string().defined().nullable().optional(),
    provider: RideHailingProviderSchema().nonNullable()
  })
}

export function RideHailingProviderSchema(): yup.ObjectSchema<RideHailingProvider> {
  return yup.object({
    __typename: yup.string<'RideHailingProvider'>().optional(),
    id: yup.string().defined().nonNullable()
  })
}

export function RiderCategorySchema(): yup.ObjectSchema<RiderCategory> {
  return yup.object({
    __typename: yup.string<'RiderCategory'>().optional(),
    id: yup.string().defined().nonNullable(),
    name: yup.string().defined().nullable().optional()
  })
}

export function RouteSchema(): yup.ObjectSchema<Route> {
  return yup.object({
    __typename: yup.string<'Route'>().optional(),
    agency: AgencySchema().nullable().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    bikesAllowed: BikesAllowedSchema.nullable().optional(),
    color: yup.string().defined().nullable().optional(),
    desc: yup.string().defined().nullable().optional(),
    gtfsId: yup.string().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    longName: yup.string().defined().nullable().optional(),
    mode: TransitModeSchema.nullable().optional(),
    patterns: yup.array(PatternSchema().nullable()).defined().nullable().optional(),
    shortName: yup.string().defined().nullable().optional(),
    sortOrder: yup.number().defined().nullable().optional(),
    stops: yup.array(StopSchema().nullable()).defined().nullable().optional(),
    textColor: yup.string().defined().nullable().optional(),
    trips: yup.array(TripSchema().nullable()).defined().nullable().optional(),
    type: yup.number().defined().nullable().optional(),
    url: yup.string().defined().nullable().optional()
  })
}

export function RouteAlertsArgsSchema(): yup.ObjectSchema<RouteAlertsArgs> {
  return yup.object({
    types: yup.array(RouteAlertTypeSchema.nullable()).defined().nullable().optional()
  })
}

export function RouteLongNameArgsSchema(): yup.ObjectSchema<RouteLongNameArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function RoutePatternsArgsSchema(): yup.ObjectSchema<RoutePatternsArgs> {
  return yup.object({
    serviceDates: yup.lazy(() => LocalDateRangeInputSchema()).optional()
  })
}

export function RouteTypeSchema(): yup.ObjectSchema<RouteType> {
  return yup.object({
    __typename: yup.string<'RouteType'>().optional(),
    agency: AgencySchema().nullable().optional(),
    routeType: yup.number().defined().nonNullable(),
    routes: yup.array(RouteSchema().nullable()).defined().nullable().optional()
  })
}

export function RoutingErrorSchema(): yup.ObjectSchema<RoutingError> {
  return yup.object({
    __typename: yup.string<'RoutingError'>().optional(),
    code: RoutingErrorCodeSchema.nonNullable(),
    description: yup.string().defined().nonNullable(),
    inputField: yup.lazy(() => InputFieldSchema.nullable()).optional()
  })
}

export function ScooterOptimizationInputSchema(): yup.ObjectSchema<ScooterOptimizationInput> {
  return yup.object({
    triangle: yup.lazy(() => TriangleScooterFactorsInputSchema()).optional(),
    type: ScooterOptimizationTypeSchema.nullable().optional()
  })
}

export function ScooterPreferencesInputSchema(): yup.ObjectSchema<ScooterPreferencesInput> {
  return yup.object({
    optimization: yup.lazy(() => ScooterOptimizationInputSchema()).optional(),
    reluctance: yup.number().defined().nullable().optional(),
    rental: yup.lazy(() => ScooterRentalPreferencesInputSchema()).optional(),
    speed: yup.number().defined().nullable().optional()
  })
}

export function ScooterRentalPreferencesInputSchema(): yup.ObjectSchema<ScooterRentalPreferencesInput> {
  return yup.object({
    allowedNetworks: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    bannedNetworks: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    destinationScooterPolicy: yup.lazy(() => DestinationScooterPolicyInputSchema()).optional()
  })
}

export function StopSchema(): yup.ObjectSchema<Stop> {
  return yup.object({
    __typename: yup.string<'Stop'>().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    cluster: ClusterSchema().nullable().optional(),
    code: yup.string().defined().nullable().optional(),
    desc: yup.string().defined().nullable().optional(),
    direction: yup.string().defined().nullable().optional(),
    geometries: StopGeometriesSchema().nullable().optional(),
    gtfsId: yup.string().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    locationType: LocationTypeSchema.nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    parentStation: StopSchema().nullable().optional(),
    patterns: yup.array(PatternSchema().nullable()).defined().nullable().optional(),
    platformCode: yup.string().defined().nullable().optional(),
    routes: yup.array(RouteSchema().nonNullable()).defined().nullable().optional(),
    stopTimesForPattern: yup.array(StoptimeSchema().nullable()).defined().nullable().optional(),
    stops: yup.array(StopSchema().nullable()).defined().nullable().optional(),
    stoptimesForPatterns: yup.array(StoptimesInPatternSchema().nullable()).defined().nullable().optional(),
    stoptimesForServiceDate: yup.array(StoptimesInPatternSchema().nullable()).defined().nullable().optional(),
    stoptimesWithoutPatterns: yup.array(StoptimeSchema().nullable()).defined().nullable().optional(),
    timezone: yup.string().defined().nullable().optional(),
    transfers: yup.array(StopAtDistanceSchema().nullable()).defined().nullable().optional(),
    url: yup.string().defined().nullable().optional(),
    vehicleMode: ModeSchema.nullable().optional(),
    vehicleType: yup.number().defined().nullable().optional(),
    wheelchairBoarding: WheelchairBoardingSchema.nullable().optional(),
    zoneId: yup.string().defined().nullable().optional()
  })
}

export function StopAlertsArgsSchema(): yup.ObjectSchema<StopAlertsArgs> {
  return yup.object({
    types: yup.array(StopAlertTypeSchema.nullable()).defined().nullable().optional()
  })
}

export function StopDescArgsSchema(): yup.ObjectSchema<StopDescArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function StopNameArgsSchema(): yup.ObjectSchema<StopNameArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function StopStopTimesForPatternArgsSchema(): yup.ObjectSchema<StopStopTimesForPatternArgs> {
  return yup.object({
    id: yup.string().defined().nonNullable(),
    numberOfDepartures: yup.number().defined().nullable().default(2).optional(),
    omitCanceled: yup.boolean().defined().nullable().default(true).optional(),
    omitNonPickups: yup.boolean().defined().nullable().default(false).optional(),
    startTime: yup.number().defined().nullable().default(0).optional(),
    timeRange: yup.number().defined().nullable().default(86400).optional()
  })
}

export function StopStoptimesForPatternsArgsSchema(): yup.ObjectSchema<StopStoptimesForPatternsArgs> {
  return yup.object({
    numberOfDepartures: yup.number().defined().nullable().default(5).optional(),
    omitCanceled: yup.boolean().defined().nullable().default(true).optional(),
    omitNonPickups: yup.boolean().defined().nullable().default(false).optional(),
    startTime: yup.number().defined().nullable().default(0).optional(),
    timeRange: yup.number().defined().nullable().default(86400).optional()
  })
}

export function StopStoptimesForServiceDateArgsSchema(): yup.ObjectSchema<StopStoptimesForServiceDateArgs> {
  return yup.object({
    date: yup.string().defined().nullable().optional(),
    omitCanceled: yup.boolean().defined().nullable().default(false).optional(),
    omitNonPickups: yup.boolean().defined().nullable().default(false).optional()
  })
}

export function StopStoptimesWithoutPatternsArgsSchema(): yup.ObjectSchema<StopStoptimesWithoutPatternsArgs> {
  return yup.object({
    numberOfDepartures: yup.number().defined().nullable().default(5).optional(),
    omitCanceled: yup.boolean().defined().nullable().default(true).optional(),
    omitNonPickups: yup.boolean().defined().nullable().default(false).optional(),
    startTime: yup.number().defined().nullable().default(0).optional(),
    timeRange: yup.number().defined().nullable().default(86400).optional()
  })
}

export function StopTransfersArgsSchema(): yup.ObjectSchema<StopTransfersArgs> {
  return yup.object({
    maxDistance: yup.number().defined().nullable().optional()
  })
}

export function StopUrlArgsSchema(): yup.ObjectSchema<StopUrlArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function StopGeometriesSchema(): yup.ObjectSchema<StopGeometries> {
  return yup.object({
    __typename: yup.string<'StopGeometries'>().optional(),
    geoJson: yup.mixed().nullable().optional(),
    googleEncoded: yup.array(GeometrySchema().nullable()).defined().nullable().optional()
  })
}

export function StopOnRouteSchema(): yup.ObjectSchema<StopOnRoute> {
  return yup.object({
    __typename: yup.string<'StopOnRoute'>().optional(),
    route: RouteSchema().nonNullable(),
    stop: StopSchema().nonNullable()
  })
}

export function StopOnTripSchema(): yup.ObjectSchema<StopOnTrip> {
  return yup.object({
    __typename: yup.string<'StopOnTrip'>().optional(),
    stop: StopSchema().nonNullable(),
    trip: TripSchema().nonNullable()
  })
}

export function StopPositionSchema(): yup.MixedSchema<StopPosition> {
  return union<StopPosition>(PositionAtStopSchema(), PositionBetweenStopsSchema())
}

export function StopRelationshipSchema(): yup.ObjectSchema<StopRelationship> {
  return yup.object({
    __typename: yup.string<'StopRelationship'>().optional(),
    status: VehicleStopStatusSchema.nonNullable(),
    stop: StopSchema().nonNullable()
  })
}

export function StoptimeSchema(): yup.ObjectSchema<Stoptime> {
  return yup.object({
    __typename: yup.string<'Stoptime'>().optional(),
    arrivalDelay: yup.number().defined().nullable().optional(),
    departureDelay: yup.number().defined().nullable().optional(),
    dropoffType: PickupDropoffTypeSchema.nullable().optional(),
    headsign: yup.string().defined().nullable().optional(),
    pickupType: PickupDropoffTypeSchema.nullable().optional(),
    realtime: yup.boolean().defined().nullable().optional(),
    realtimeArrival: yup.number().defined().nullable().optional(),
    realtimeDeparture: yup.number().defined().nullable().optional(),
    realtimeState: RealtimeStateSchema.nullable().optional(),
    scheduledArrival: yup.number().defined().nullable().optional(),
    scheduledDeparture: yup.number().defined().nullable().optional(),
    serviceDay: yup.number().defined().nullable().optional(),
    stop: StopSchema().nullable().optional(),
    stopPosition: yup.number().defined().nullable().optional(),
    timepoint: yup.boolean().defined().nullable().optional(),
    trip: TripSchema().nullable().optional()
  })
}

export function StoptimeHeadsignArgsSchema(): yup.ObjectSchema<StoptimeHeadsignArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function StoptimesInPatternSchema(): yup.ObjectSchema<StoptimesInPattern> {
  return yup.object({
    __typename: yup.string<'StoptimesInPattern'>().optional(),
    pattern: PatternSchema().nullable().optional(),
    stoptimes: yup.array(StoptimeSchema().nullable()).defined().nullable().optional()
  })
}

export function SystemNoticeSchema(): yup.ObjectSchema<SystemNotice> {
  return yup.object({
    __typename: yup.string<'SystemNotice'>().optional(),
    tag: yup.string().defined().nullable().optional(),
    text: yup.string().defined().nullable().optional()
  })
}

export function TicketTypeSchema(): yup.ObjectSchema<TicketType> {
  return yup.object({
    __typename: yup.string<'TicketType'>().optional(),
    currency: yup.string().defined().nullable().optional(),
    fareId: yup.string().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    price: yup.number().defined().nullable().optional(),
    zones: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional()
  })
}

export function TimetablePreferencesInputSchema(): yup.ObjectSchema<TimetablePreferencesInput> {
  return yup.object({
    excludeRealTimeUpdates: yup.boolean().defined().nullable().optional(),
    includePlannedCancellations: yup.boolean().defined().nullable().optional(),
    includeRealTimeCancellations: yup.boolean().defined().nullable().optional()
  })
}

export function TransferPreferencesInputSchema(): yup.ObjectSchema<TransferPreferencesInput> {
  return yup.object({
    cost: yup.number().defined().nullable().optional(),
    maximumAdditionalTransfers: yup.number().defined().nullable().optional(),
    maximumTransfers: yup.number().defined().nullable().optional(),
    slack: yup.string().defined().nullable().optional()
  })
}

export function TransitModePreferenceCostInputSchema(): yup.ObjectSchema<TransitModePreferenceCostInput> {
  return yup.object({
    reluctance: yup.number().defined().nonNullable()
  })
}

export function TransitPreferencesInputSchema(): yup.ObjectSchema<TransitPreferencesInput> {
  return yup.object({
    alight: yup.lazy(() => AlightPreferencesInputSchema()).optional(),
    board: yup.lazy(() => BoardPreferencesInputSchema()).optional(),
    timetable: yup.lazy(() => TimetablePreferencesInputSchema()).optional(),
    transfer: yup.lazy(() => TransferPreferencesInputSchema()).optional()
  })
}

export function TranslatedStringSchema(): yup.ObjectSchema<TranslatedString> {
  return yup.object({
    __typename: yup.string<'TranslatedString'>().optional(),
    language: yup.string().defined().nullable().optional(),
    text: yup.string().defined().nullable().optional()
  })
}

export function TransportModeSchema(): yup.ObjectSchema<TransportMode> {
  return yup.object({
    mode: ModeSchema.nonNullable(),
    qualifier: QualifierSchema.nullable().optional()
  })
}

export function TriangleCyclingFactorsInputSchema(): yup.ObjectSchema<TriangleCyclingFactorsInput> {
  return yup.object({
    flatness: yup.number().defined().nonNullable(),
    safety: yup.number().defined().nonNullable(),
    time: yup.number().defined().nonNullable()
  })
}

export function TriangleScooterFactorsInputSchema(): yup.ObjectSchema<TriangleScooterFactorsInput> {
  return yup.object({
    flatness: yup.number().defined().nonNullable(),
    safety: yup.number().defined().nonNullable(),
    time: yup.number().defined().nonNullable()
  })
}

export function TripSchema(): yup.ObjectSchema<Trip> {
  return yup.object({
    __typename: yup.string<'Trip'>().optional(),
    activeDates: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    arrivalStoptime: StoptimeSchema().nullable().optional(),
    bikesAllowed: BikesAllowedSchema.nullable().optional(),
    blockId: yup.string().defined().nullable().optional(),
    departureStoptime: StoptimeSchema().nullable().optional(),
    directionId: yup.string().defined().nullable().optional(),
    geometry: yup.array(yup.array(yup.number().defined().nullable()).defined().nullable()).defined().nullable().optional(),
    gtfsId: yup.string().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    occupancy: TripOccupancySchema().nullable().optional(),
    pattern: PatternSchema().nullable().optional(),
    route: RouteSchema().nonNullable(),
    routeShortName: yup.string().defined().nullable().optional(),
    semanticHash: yup.string().defined().nonNullable(),
    serviceId: yup.string().defined().nullable().optional(),
    shapeId: yup.string().defined().nullable().optional(),
    stops: yup.array(StopSchema().nonNullable()).defined(),
    stoptimes: yup.array(StoptimeSchema().nullable()).defined().nullable().optional(),
    stoptimesForDate: yup.array(StoptimeSchema().nullable()).defined().nullable().optional(),
    tripGeometry: GeometrySchema().nullable().optional(),
    tripHeadsign: yup.string().defined().nullable().optional(),
    tripShortName: yup.string().defined().nullable().optional(),
    wheelchairAccessible: WheelchairBoardingSchema.nullable().optional()
  })
}

export function TripAlertsArgsSchema(): yup.ObjectSchema<TripAlertsArgs> {
  return yup.object({
    types: yup.array(TripAlertTypeSchema.nullable()).defined().nullable().optional()
  })
}

export function TripArrivalStoptimeArgsSchema(): yup.ObjectSchema<TripArrivalStoptimeArgs> {
  return yup.object({
    serviceDate: yup.string().defined().nullable().optional()
  })
}

export function TripDepartureStoptimeArgsSchema(): yup.ObjectSchema<TripDepartureStoptimeArgs> {
  return yup.object({
    serviceDate: yup.string().defined().nullable().optional()
  })
}

export function TripStoptimesForDateArgsSchema(): yup.ObjectSchema<TripStoptimesForDateArgs> {
  return yup.object({
    serviceDate: yup.string().defined().nullable().optional()
  })
}

export function TripTripHeadsignArgsSchema(): yup.ObjectSchema<TripTripHeadsignArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function TripOccupancySchema(): yup.ObjectSchema<TripOccupancy> {
  return yup.object({
    __typename: yup.string<'TripOccupancy'>().optional(),
    occupancyStatus: OccupancyStatusSchema.nullable().optional()
  })
}

export function UnknownSchema(): yup.ObjectSchema<Unknown> {
  return yup.object({
    __typename: yup.string<'Unknown'>().optional(),
    description: yup.string().defined().nullable().optional()
  })
}

export function VehicleParkingSchema(): yup.ObjectSchema<VehicleParking> {
  return yup.object({
    __typename: yup.string<'VehicleParking'>().optional(),
    anyCarPlaces: yup.boolean().defined().nullable().optional(),
    availability: VehicleParkingSpacesSchema().nullable().optional(),
    bicyclePlaces: yup.boolean().defined().nullable().optional(),
    capacity: VehicleParkingSpacesSchema().nullable().optional(),
    carPlaces: yup.boolean().defined().nullable().optional(),
    detailsUrl: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    imageUrl: yup.string().defined().nullable().optional(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    note: yup.string().defined().nullable().optional(),
    openingHours: OpeningHoursSchema().nullable().optional(),
    realtime: yup.boolean().defined().nullable().optional(),
    state: VehicleParkingStateSchema.nullable().optional(),
    tags: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    vehicleParkingId: yup.string().defined().nullable().optional(),
    wheelchairAccessibleCarPlaces: yup.boolean().defined().nullable().optional()
  })
}

export function VehicleParkingNameArgsSchema(): yup.ObjectSchema<VehicleParkingNameArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function VehicleParkingNoteArgsSchema(): yup.ObjectSchema<VehicleParkingNoteArgs> {
  return yup.object({
    language: yup.string().defined().nullable().optional()
  })
}

export function VehicleParkingInputSchema(): yup.ObjectSchema<VehicleParkingInput> {
  return yup.object({
    filters: yup.array(ParkingFilterSchema()).defined().nullable().optional(),
    preferred: yup.array(ParkingFilterSchema()).defined().nullable().optional(),
    unpreferredCost: yup.number().defined().nullable().optional()
  })
}

export function VehicleParkingSpacesSchema(): yup.ObjectSchema<VehicleParkingSpaces> {
  return yup.object({
    __typename: yup.string<'VehicleParkingSpaces'>().optional(),
    bicycleSpaces: yup.number().defined().nullable().optional(),
    carSpaces: yup.number().defined().nullable().optional(),
    wheelchairAccessibleCarSpaces: yup.number().defined().nullable().optional()
  })
}

export function VehiclePositionSchema(): yup.ObjectSchema<VehiclePosition> {
  return yup.object({
    __typename: yup.string<'VehiclePosition'>().optional(),
    heading: yup.number().defined().nullable().optional(),
    label: yup.string().defined().nullable().optional(),
    lastUpdated: yup.number().defined().nullable().optional(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    speed: yup.number().defined().nullable().optional(),
    stopRelationship: StopRelationshipSchema().nullable().optional(),
    trip: TripSchema().nonNullable(),
    vehicleId: yup.string().defined().nullable().optional()
  })
}

export function VehicleRentalNetworkSchema(): yup.ObjectSchema<VehicleRentalNetwork> {
  return yup.object({
    __typename: yup.string<'VehicleRentalNetwork'>().optional(),
    networkId: yup.string().defined().nonNullable(),
    url: yup.string().defined().nullable().optional()
  })
}

export function VehicleRentalStationSchema(): yup.ObjectSchema<VehicleRentalStation> {
  return yup.object({
    __typename: yup.string<'VehicleRentalStation'>().optional(),
    allowDropoff: yup.boolean().defined().nullable().optional(),
    allowDropoffNow: yup.boolean().defined().nullable().optional(),
    allowOverloading: yup.boolean().defined().nullable().optional(),
    allowPickup: yup.boolean().defined().nullable().optional(),
    allowPickupNow: yup.boolean().defined().nullable().optional(),
    availableSpaces: RentalVehicleEntityCountsSchema().nullable().optional(),
    availableVehicles: RentalVehicleEntityCountsSchema().nullable().optional(),
    capacity: yup.number().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    name: yup.string().defined().nonNullable(),
    network: yup.string().defined().nullable().optional(),
    operative: yup.boolean().defined().nullable().optional(),
    realtime: yup.boolean().defined().nullable().optional(),
    rentalNetwork: VehicleRentalNetworkSchema().nonNullable(),
    rentalUris: VehicleRentalUrisSchema().nullable().optional(),
    spacesAvailable: yup.number().defined().nullable().optional(),
    stationId: yup.string().defined().nullable().optional(),
    vehiclesAvailable: yup.number().defined().nullable().optional()
  })
}

export function VehicleRentalUrisSchema(): yup.ObjectSchema<VehicleRentalUris> {
  return yup.object({
    __typename: yup.string<'VehicleRentalUris'>().optional(),
    android: yup.string().defined().nullable().optional(),
    ios: yup.string().defined().nullable().optional(),
    web: yup.string().defined().nullable().optional()
  })
}

export function WalkPreferencesInputSchema(): yup.ObjectSchema<WalkPreferencesInput> {
  return yup.object({
    boardCost: yup.number().defined().nullable().optional(),
    reluctance: yup.number().defined().nullable().optional(),
    safetyFactor: yup.number().defined().nullable().optional(),
    speed: yup.number().defined().nullable().optional()
  })
}

export function WheelchairPreferencesInputSchema(): yup.ObjectSchema<WheelchairPreferencesInput> {
  return yup.object({
    enabled: yup.boolean().defined().nullable().optional()
  })
}

export function DebugOutputSchema(): yup.ObjectSchema<DebugOutput> {
  return yup.object({
    __typename: yup.string<'debugOutput'>().optional(),
    pathCalculationTime: yup.number().defined().nullable().optional(),
    precalculationTime: yup.number().defined().nullable().optional(),
    renderingTime: yup.number().defined().nullable().optional(),
    timedOut: yup.boolean().defined().nullable().optional(),
    totalTime: yup.number().defined().nullable().optional()
  })
}

export function ElevationProfileComponentSchema(): yup.ObjectSchema<ElevationProfileComponent> {
  return yup.object({
    __typename: yup.string<'elevationProfileComponent'>().optional(),
    distance: yup.number().defined().nullable().optional(),
    elevation: yup.number().defined().nullable().optional()
  })
}

export function FareSchema(): yup.ObjectSchema<Fare> {
  return yup.object({
    __typename: yup.string<'fare'>().optional(),
    cents: yup.number().defined().nullable().optional(),
    components: yup.array(FareComponentSchema().nullable()).defined().nullable().optional(),
    currency: yup.string().defined().nullable().optional(),
    type: yup.string().defined().nullable().optional()
  })
}

export function FareComponentSchema(): yup.ObjectSchema<FareComponent> {
  return yup.object({
    __typename: yup.string<'fareComponent'>().optional(),
    cents: yup.number().defined().nullable().optional(),
    currency: yup.string().defined().nullable().optional(),
    fareId: yup.string().defined().nullable().optional(),
    routes: yup.array(RouteSchema().nullable()).defined().nullable().optional()
  })
}

export function PlaceAtDistanceSchema(): yup.ObjectSchema<PlaceAtDistance> {
  return yup.object({
    __typename: yup.string<'placeAtDistance'>().optional(),
    distance: yup.number().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    place: PlaceInterfaceSchema().nullable().optional()
  })
}

export function PlaceAtDistanceConnectionSchema(): yup.ObjectSchema<PlaceAtDistanceConnection> {
  return yup.object({
    __typename: yup.string<'placeAtDistanceConnection'>().optional(),
    edges: yup.array(PlaceAtDistanceEdgeSchema().nullable()).defined().nullable().optional(),
    pageInfo: PageInfoSchema().nonNullable()
  })
}

export function PlaceAtDistanceEdgeSchema(): yup.ObjectSchema<PlaceAtDistanceEdge> {
  return yup.object({
    __typename: yup.string<'placeAtDistanceEdge'>().optional(),
    cursor: yup.string().defined().nonNullable(),
    node: PlaceAtDistanceSchema().nullable().optional()
  })
}

export function ServiceTimeRangeSchema(): yup.ObjectSchema<ServiceTimeRange> {
  return yup.object({
    __typename: yup.string<'serviceTimeRange'>().optional(),
    end: yup.number().defined().nullable().optional(),
    start: yup.number().defined().nullable().optional()
  })
}

export function StepSchema(): yup.ObjectSchema<Step> {
  return yup.object({
    __typename: yup.string<'step'>().optional(),
    absoluteDirection: AbsoluteDirectionSchema.nullable().optional(),
    alerts: yup.array(AlertSchema().nullable()).defined().nullable().optional(),
    area: yup.boolean().defined().nullable().optional(),
    bogusName: yup.boolean().defined().nullable().optional(),
    distance: yup.number().defined().nullable().optional(),
    elevationProfile: yup.array(ElevationProfileComponentSchema().nullable()).defined().nullable().optional(),
    exit: yup.string().defined().nullable().optional(),
    lat: yup.number().defined().nullable().optional(),
    lon: yup.number().defined().nullable().optional(),
    relativeDirection: RelativeDirectionSchema.nullable().optional(),
    stayOn: yup.boolean().defined().nullable().optional(),
    streetName: yup.string().defined().nullable().optional(),
    walkingBike: yup.boolean().defined().nullable().optional()
  })
}

export function StopAtDistanceSchema(): yup.ObjectSchema<StopAtDistance> {
  return yup.object({
    __typename: yup.string<'stopAtDistance'>().optional(),
    distance: yup.number().defined().nullable().optional(),
    id: yup.string().defined().nonNullable(),
    stop: StopSchema().nullable().optional()
  })
}

export function StopAtDistanceConnectionSchema(): yup.ObjectSchema<StopAtDistanceConnection> {
  return yup.object({
    __typename: yup.string<'stopAtDistanceConnection'>().optional(),
    edges: yup.array(StopAtDistanceEdgeSchema().nullable()).defined().nullable().optional(),
    pageInfo: PageInfoSchema().nonNullable()
  })
}

export function StopAtDistanceEdgeSchema(): yup.ObjectSchema<StopAtDistanceEdge> {
  return yup.object({
    __typename: yup.string<'stopAtDistanceEdge'>().optional(),
    cursor: yup.string().defined().nonNullable(),
    node: StopAtDistanceSchema().nullable().optional()
  })
}
