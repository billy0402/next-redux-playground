enum ApiStatus {
  idle = 'idle',
  loading = 'loading',
  failed = 'failed',
}

const toApiStatus = (status: ApiStatus) => ({
  loading: status === ApiStatus.loading,
  success: status === ApiStatus.idle,
  error: status === ApiStatus.failed,
});

export { ApiStatus, toApiStatus };
