import axios from 'axios';

export const LOOKS_FETCH_REQUESTED = 'fetch_looks_request';
export const LOOKS_FETCH_SUCCEEDED = 'fetch_looks_succeeded';

export function fetchLooks() {
  return {
    type: LOOKS_FETCH_REQUESTED
  };
}
