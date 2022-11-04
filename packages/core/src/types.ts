import Route from './Route'
import { GeneratedRoutes } from './routes'
import { Default, Wildcard } from './symbols'
import { AxiosResponse, Canceler, CancelToken } from 'axios'
import { IsEmptyObject } from 'type-fest'

// Router
export type RouterOptions<TComponent> = {
  initialPage: Page
  resolveComponentModule?: ComponentModuleResolver<TComponent>
  fragments?: Record<
    string,
    {
      stacked?: boolean
    }
  >
}

export type ComponentModuleResolver<TComponent> = (
  component: PageComponent,
) => Promise<TComponent>

export type RouterLocation = {
  url: string
  href: string
  host: string
  hostname: string
  origin: string
  pathname: string
  port: string
  protocol: string
  search: string
  hash: string
  state?: string | undefined
}

// Pages
export type PageDefaults = Record<string, any>

export type PageErrors = Record<string, string>

export type PageErrorBag = Record<string, PageErrors>

export interface PageProperties {
  [key: string]: unknown
}

export type PageRememberedState = Record<string, unknown> | undefined

export type PageFragmentProperties = Record<string, any>

export type PageComponent = {
  path: string
  url: string
}

export type PageFragment = {
  component: PageComponent
  properties: PageFragmentProperties
  rawRoute: RawRoute
  location: RouterLocation
  defaults: PageDefaults
  parameters: Record<string, RouteParameter>
}

export type PageFragments = Record<string, PageFragment | PageFragment[] | null>

export interface Page {
  visit: Visit
  csrf: string | null
  fragments: PageFragments
  properties: PageProperties & {
    errors: PageErrors & PageErrorBag
  }
  rawRoute: RawRoute
  location: RouterLocation
  defaults: PageDefaults
  parameters: Record<string, RouteParameter>
  version: string | null
  layout: string | null
  timestamp: number
  obsolete: boolean
  scrollRegions: Array<{ top: number; left: number }>
  rememberedState: PageRememberedState
}

// Events
export type EventsMap = {
  before: {
    parameters: [Visit]
    details: {
      visit: Visit
    }
    result: boolean | void
  }

  start: {
    parameters: [Visit]
    details: {
      visit: Visit
    }
    result: void
  }

  progress: {
    parameters: [Visit, VisitProgress | undefined]
    details: {
      visit: Visit
      progress: VisitProgress | undefined
    }
    result: void
  }

  finish: {
    parameters: [Visit]
    details: {
      visit: Visit
    }
    result: void
  }

  cancel: {
    parameters: [Visit]
    details: {
      visit: Visit
    }
    result: void
  }

  navigate: {
    parameters: [Page, Page[], number, boolean]
    details: {
      visit: Visit
      page: Page
      pages: Page[]
      pageIndex: number
      replace: boolean
    }
    result: void
  }

  success: {
    parameters: [Visit, Page]
    details: {
      visit: Visit
      page: Page
    }
    result: void
  }

  error: {
    parameters: [Visit, PageErrors]
    details: {
      visit: Visit
      errors: PageErrors
    }
    result: void
  }

  invalid: {
    parameters: [Visit, AxiosResponse]
    details: {
      visit: Visit
      response: AxiosResponse
    }
    result: boolean | void
  }

  exception: {
    parameters: [Visit, Error]
    details: {
      visit: Visit
      exception: Error
    }
    result: boolean | void
  }
}

export type EventNames = keyof EventsMap

export type Events = {
  [Name in EventNames]: Event<Name>
}

export type Event<TEventName extends EventNames> = CustomEvent<
  Readonly<EventDetails<TEventName>>
>

export type EventListeners = {
  [Name in EventNames]: EventListener<Name>[]
}

export type EventParameters<TEventName extends EventNames> =
  EventsMap[TEventName]['parameters']

export type EventResult<TEventName extends EventNames> =
  EventsMap[TEventName]['result']

export type EventDetails<TEventName extends EventNames> =
  EventsMap[TEventName]['details']

export type EventTrigger<TEventName extends EventNames> = (
  ...params: EventParameters<TEventName>
) => CustomEvent<EventDetails<TEventName>>

export type EventListener<TEventName extends EventNames> = (
  event: Event<TEventName>,
) => void // EventResult<TEventName>

// Visits
export type FormDataConvertible =
  | Array<FormDataConvertible>
  | Blob
  | FormDataEntryValue
  | Date
  | boolean
  | number
  | null

export type VisitData = Record<string, FormDataConvertible> | FormData

export type VisitCancelToken = {
  token?: CancelToken
  cancel: Canceler
}

export type VisitPreserveStateOption =
  | boolean
  | string
  | ((page: Page) => boolean)

export type VisitProgress = {
  loaded: number
  total?: number
  progress?: number
  bytes: number
  rate?: number
  estimated?: number
  upload?: boolean
  download?: boolean
}

export type LocationVisit = {
  preserveScroll: boolean
}

export type VisitOptions = Partial<{
  method: RawRouteMethod
  data: VisitData
  replace: boolean
  preserveScroll: VisitPreserveStateOption
  preserveState: VisitPreserveStateOption
  properties: Array<string>
  headers: Record<string, string>
  errorBag: string | null
  forceFormData: boolean
  queryStringArrayFormat: QueryStringArrayFormat
  onBefore: EventListener<'before'>
  onStart: EventListener<'start'>
  onProgress: EventListener<'progress'>
  onFinish: EventListener<'finish'>
  onCancel: EventListener<'cancel'>
  onSuccess: EventListener<'success'>
  onError: EventListener<'error'>
  onInvalid: EventListener<'invalid'>
  onException: EventListener<'exception'>
}>

export type Visit = {
  id: VisitId
  method: RouteMethod
  data: VisitData
  replace: boolean
  preserveScroll: VisitPreserveStateOption
  preserveState: VisitPreserveStateOption
  properties: Array<string>
  headers: Record<string, string>
  errorBag: string | null
  forceFormData: boolean
  queryStringArrayFormat: QueryStringArrayFormat
  location: RouterLocation
  completed: boolean
  cancelled: boolean
  interrupted: boolean
  cancelToken?: VisitCancelToken
  cancel?: () => void
  interrupt?: () => void
  onBefore?: EventListener<'before'>
  onStart?: EventListener<'start'>
  onProgress?: EventListener<'progress'>
  onFinish?: EventListener<'finish'>
  onCancel?: EventListener<'cancel'>
  onSuccess?: EventListener<'success'>
  onError?: EventListener<'error'>
  onInvalid?: EventListener<'invalid'>
  onException?: EventListener<'exception'>
}

export type VisitId = string

export type Component = unknown

// Routes
export type Routes = GeneratedRoutes & {}

export enum RouteMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export type RouteName = keyof Routes

export type Routable<TRouteName extends RouteName = RouteName> =
  | URL
  | string
  | Route<TRouteName>

export interface BindableRouteParameter {
  id: number | string
}

export type RouteParameter =
  // | BindableRouteParameter
  string | number | boolean | Record<string, any> | undefined | null

/*export type RouteParameters<TParamValue = RouteParameter> = {
  [key: string]: TParamValue
}*/

export type RouteParameters<TRouteName extends RouteName> =
  Routes[TRouteName] extends {
    bindings: any
  }
    ? IsEmptyObject<Routes[TRouteName]['bindings']> extends true
      ? Record<never, never>
      : Record<keyof Routes[TRouteName]['bindings'], RouteParameter>
    : Record<never, never>

export type RouteBindings = Record<string, string | null>

export type RouteWheres = Record<string, string | null>

export type RouteDefaults = Record<string, RouteParameter>

export type RawRouteParameters<TRouteName extends RouteName = RouteName> =
  Routes[TRouteName] extends {
    bindings: any
  }
    ? IsEmptyObject<Routes[TRouteName]['bindings']> extends true
      ? Record<never, never>
      : Record<
          keyof Routes[TRouteName]['bindings'],
          RouteParameter | typeof Default | typeof Wildcard
        >
    : Record<never, never>

export type RawRouteMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE'

export type RawRoute<TName extends RouteName = RouteName> = {
  name: TName
  uri: string
  methods: RawRouteMethod[]
  method?: RawRouteMethod
  domain?: string
  bindings?: RouteBindings
  parameters?: RouteParameters<TName>
  wheres?: RouteWheres
  components?: PageComponent[]
}

export type RawRoutes = Record<string, RawRoute>

export enum QueryStringArrayFormat {
  Indices = 'indices',
  Brackets = 'brackets',
}

// Rendered
export interface RenderedApp {
  id: string
  modules: Set<string>
  headTags: string
  htmlAttributes: string
  bodyAttributes: string
  bodyTags: string
  appHTML: string
}
