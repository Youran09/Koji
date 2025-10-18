import { format, formatDistance, formatRelative } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy');
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true });
};

export const formatWeight = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tons`;
  }
  return `${kg.toFixed(1)} kg`;
};

export const formatCO2 = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t CO₂`;
  }
  return `${kg.toFixed(1)}kg CO₂`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatCurrency = (amount: number, currency = 'DKK'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calculateDaysAgo = (date: Date | string): number => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    inoculation: 'bg-yellow-100 text-yellow-800',
    fermentation: 'bg-blue-100 text-blue-800',
    aging: 'bg-orange-100 text-orange-800',
    ready: 'bg-green-100 text-green-800',
    sold: 'bg-gray-100 text-gray-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};