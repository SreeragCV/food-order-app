import { createContext, useState } from "react";

export const ErrorContext = createContext({
  error: '',
  fetchingError: () => {},
  updatingError: () => {},
  closeError: () => {},
});

export default function ErrorContextProvider({ children }) {
  const [error, setError] = useState('');

  function fetchingError() {
    setError('fetching error');
  }

  function updatingError(){
    setError('updating error')
  }

  function closeError(){
    setError('')
  }


  const errorValue = {
    error,
    fetchingError,
    updatingError,
    closeError
  };

  return <ErrorContext.Provider value={errorValue}>{children}</ErrorContext.Provider>;
}
