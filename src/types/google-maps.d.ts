/**
 * Google Maps API Type Definitions
 * 
 * Type definitions for Google Maps JavaScript API
 * Used for location search functionality in map widget
 */

declare global {
    interface Window {
        google?: {
            maps: {
                places: {
                    AutocompleteService: new () => google.maps.places.AutocompleteService
                    PlacesService: new (element: HTMLElement) => google.maps.places.PlacesService
                }
            }
        }
    }
}

declare namespace google {
    namespace maps {
        namespace places {
            interface AutocompleteService {
                getPlacePredictions(
                    request: AutocompletionRequest,
                    callback: (
                        predictions: AutocompletePrediction[] | null,
                        status: PlacesServiceStatus
                    ) => void
                ): void
            }

            interface PlacesService {
                getDetails(
                    request: PlaceDetailsRequest,
                    callback: (place: PlaceResult | null, status: PlacesServiceStatus) => void
                ): void
            }

            interface AutocompletionRequest {
                input: string
                types?: string[]
                componentRestrictions?: {
                    country?: string | string[]
                }
            }

            interface AutocompletePrediction {
                place_id: string
                description: string
                structured_formatting: {
                    main_text: string
                    secondary_text: string
                }
            }

            interface PlaceDetailsRequest {
                placeId: string
                fields?: string[]
            }

            interface PlaceResult {
                place_id?: string
                name?: string
                formatted_address?: string
                geometry?: {
                    location: {
                        lat: () => number
                        lng: () => number
                    }
                }
            }

            type PlacesServiceStatus =
                | 'OK'
                | 'ZERO_RESULTS'
                | 'OVER_QUERY_LIMIT'
                | 'REQUEST_DENIED'
                | 'INVALID_REQUEST'
        }
    }
}

export {}
