import { createContext } from 'react';
import { PerformanceGroupConfigContextProps } from './PerformanceGroupConfigContext.types';

export const PerformanceGroupConfigContext = createContext<PerformanceGroupConfigContextProps | null>(null)