/**
 * Service Mapping Utility for Frontend
 * Maps sub-services to main services for consistent assignment display
 */

export const MAIN_SERVICES = [
  'Water Testing',
  'Food Testing',
  'Environmental Testing',
  'Shelf-Life Study',
  'Others'
];

export const SERVICE_MAPPINGS: Record<string, string> = {
  // Water Testing sub-services
  'Drinking Water Testing': 'Water Testing',
  'FSSAI Compliance Water Testing': 'Water Testing',
  'Swimming Pool Water Testing': 'Water Testing',
  'Drinking Water': 'Water Testing',
  'FSSAI Compliance Water': 'Water Testing',
  'Swimming Pool Water': 'Water Testing',
  
  // Environmental Testing sub-services
  'ETP Water Testing': 'Environmental Testing',
  'STP Water Testing': 'Environmental Testing',
  'Ambient Air': 'Environmental Testing',
  'Stack Emission': 'Environmental Testing',
  'Workplace Monitoring': 'Environmental Testing',
  'IAQ [Indoor Air Quality]': 'Environmental Testing',
  'Noise Testing': 'Environmental Testing',
  'Illumination': 'Environmental Testing',
  'ETP Water': 'Environmental Testing',
  'STP Water': 'Environmental Testing',
  'IAQ': 'Environmental Testing',
  
  // Food Testing sub-services (all food categories)
  'Dairy products and analogues': 'Food Testing',
  'Fats and oils, and fat emulsions': 'Food Testing',
  'Edible ices, including sherbet and sorbet': 'Food Testing',
  'Fruits, vegetables, seaweeds, nuts, and seeds': 'Food Testing',
  'Confectionery': 'Food Testing',
  'Cereals, grains, roots, tubers, pulses, and legumes': 'Food Testing',
  'Bakery products': 'Food Testing',
  'Meat and meat products including poultry': 'Food Testing',
  'Fish and fish products, including molluscs, crustaceans, and echinoderms': 'Food Testing',
  'Eggs and egg products': 'Food Testing',
  'Sweeteners, including honey': 'Food Testing',
  'Salts, spices, soups, sauces, salads, and protein products': 'Food Testing',
  'Foodstuffs for particular nutritional uses': 'Food Testing',
  'Beverages, excluding dairy products': 'Food Testing',
  'Ready-to-eat savouries': 'Food Testing',
  'Substances added to food': 'Food Testing',
  'Standardised Food Product': 'Food Testing',
  'Indian Sweets and Snacks': 'Food Testing',
  'Hemp Seeds and Seed Products': 'Food Testing',
  'Dairy': 'Food Testing',
  'Fats and oils': 'Food Testing',
  'Edible ices': 'Food Testing',
  'Fruits': 'Food Testing',
  'Cereals': 'Food Testing',
  'Bakery': 'Food Testing',
  'Meat': 'Food Testing',
  'Fish': 'Food Testing',
  'Eggs': 'Food Testing',
  'Sweeteners': 'Food Testing',
  'Salts': 'Food Testing',
  'Foodstuffs': 'Food Testing',
  'Beverages': 'Food Testing',
  'Ready-to-eat': 'Food Testing',
  'Substances added': 'Food Testing',
  'Standardised Food': 'Food Testing',
  'Indian Sweets': 'Food Testing',
  'Hemp Seeds': 'Food Testing'
};

/**
 * Maps a service name to its main service category
 */
export function mapToMainService(serviceName: string): string {
  if (!serviceName) return 'Others';
  
  // If it's already a main service, return as is
  if (MAIN_SERVICES.includes(serviceName)) {
    return serviceName;
  }
  
  // Check for exact match in mappings
  if (SERVICE_MAPPINGS[serviceName]) {
    return SERVICE_MAPPINGS[serviceName];
  }
  
  // Check for partial matches (case-insensitive)
  const serviceLower = serviceName.toLowerCase();
  for (const [subService, mainService] of Object.entries(SERVICE_MAPPINGS)) {
    if (serviceLower.includes(subService.toLowerCase()) || subService.toLowerCase().includes(serviceLower)) {
      return mainService;
    }
  }
  
  // Default to Others for unrecognized services
  return 'Others';
}

/**
 * Gets the display name for a service (maps sub-services to main services)
 */
export function getServiceDisplayName(serviceName: string): string {
  return mapToMainService(serviceName);
}

/**
 * Gets all main services
 */
export function getMainServices(): string[] {
  return [...MAIN_SERVICES];
}

/**
 * Gets all sub-services for a main service
 */
export function getSubServices(mainService: string): string[] {
  return Object.entries(SERVICE_MAPPINGS)
    .filter(([, main]) => main === mainService)
    .map(([sub]) => sub);
}

/**
 * Service to Sub-service mapping for dropdowns
 */
export const SERVICE_SUBSERVICE_MAP: Record<string, string[]> = {
  'Water Testing': [
    'Drinking Water Testing',
    'FSSAI Compliance Water Testing',
    'Swimming Pool Water Testing',
    'Drinking Water',
    'FSSAI Compliance Water',
    'Swimming Pool Water'
  ],
  'Environmental Testing': [
    'ETP Water Testing',
    'STP Water Testing',
    'Ambient Air',
    'Stack Emission',
    'Workplace Monitoring',
    'IAQ [Indoor Air Quality]',
    'Noise Testing',
    'Illumination',
    'ETP Water',
    'STP Water',
    'IAQ'
  ],
  'Food Testing': [
    'Dairy products and analogues',
    'Fats and oils, and fat emulsions',
    'Edible ices, including sherbet and sorbet',
    'Fruits, vegetables, seaweeds, nuts, and seeds',
    'Confectionery',
    'Cereals, grains, roots, tubers, pulses, and legumes',
    'Bakery products',
    'Meat and meat products including poultry',
    'Fish and fish products, including molluscs, crustaceans, and echinoderms',
    'Eggs and egg products',
    'Sweeteners, including honey',
    'Salts, spices, soups, sauces, salads, and protein products',
    'Foodstuffs for particular nutritional uses',
    'Beverages, excluding dairy products',
    'Ready-to-eat savouries',
    'Substances added to food',
    'Standardised Food Product',
    'Indian Sweets and Snacks',
    'Hemp Seeds and Seed Products',
    'Dairy',
    'Fats and oils',
    'Edible ices',
    'Fruits',
    'Cereals',
    'Bakery',
    'Meat',
    'Fish',
    'Eggs',
    'Sweeteners',
    'Salts',
    'Foodstuffs',
    'Beverages',
    'Ready-to-eat',
    'Substances added',
    'Standardised Food',
    'Indian Sweets',
    'Hemp Seeds'
  ],
  'Shelf-Life Study': [
    'Accelerated Shelf-Life Study',
    'Real-Time Shelf-Life Study',
    'Microbial Shelf-Life Study',
    'Sensory Shelf-Life Study'
  ],
  'Others': []
};

/**
 * Validates if a service name is a valid main service
 */
export function isValidMainService(serviceName: string): boolean {
  return MAIN_SERVICES.includes(serviceName);
}
