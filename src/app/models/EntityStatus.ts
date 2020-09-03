export interface EntityState<T> {
  status: LoadingStatus;
  value: T;
  error?: string;
}

export interface EntityCollectionState<T> {
  status: CollectionLoadingStatus;
  values: T[];
  error?: string;
}

export enum LoadingStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Resolved = 'Resolved',
  ResolvedNotFound = 'ResolvedNotFound',
  Rejected = 'Rejected',
}

export enum CollectionLoadingStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Resolved = 'Resolved',
  ResolvedEmpty = 'ResolvedEmpty',
  Rejected = 'Rejected',
}
