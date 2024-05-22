import { useContext } from 'react';
import { PerformanceGroupConfigContext } from './PerformanceGroupConfigContext.context';

export const usePerformanceGroupConfigContext = () => {
  const performanceGroupConfigContext = useContext(PerformanceGroupConfigContext)

  if(performanceGroupConfigContext === null) {
    throw new Error('Component is not wrapped by PerformanceGroupConfigContext. Consider using PerformanceGroupConfigContextManager')
  }

  return performanceGroupConfigContext;
}