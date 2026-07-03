/**
 * Client-side scenario data matching server definitions.
 * Used for rendering scenarios and validating decisions locally.
 */

export const RESOURCES = {
  AMBULANCE: 'Ambulance',
  FIRE_TRUCK: 'Fire Truck',
  POLICE: 'Police Unit',
  MEDICAL: 'Medical Team',
  RESCUE: 'Rescue Team',
};

export const ALL_RESOURCES = Object.values(RESOURCES);

export const RESOURCE_ICONS = {
  'Ambulance': '🚑',
  'Fire Truck': '🚒',
  'Police Unit': '🚔',
  'Medical Team': '🏥',
  'Rescue Team': '🚁',
};

export const PRIORITIES = {
  low: { label: 'Low', color: 'green' },
  medium: { label: 'Medium', color: 'orange' },
  high: { label: 'High', color: 'gold' },
  critical: { label: 'Critical', color: 'red' },
};

export const MODULE_INFO = {
  1: {
    title: 'Baseline Assessment',
    description: 'Establish your baseline decision-making under normal conditions.',
    icon: '📋',
    color: '#1B3A5C',
  },
  2: {
    title: 'Stress Induction',
    description: 'Handle multiple emergencies with limited time and resources.',
    icon: '⚡',
    color: '#DC3545',
  },
  3: {
    title: 'Failure & Recovery',
    description: 'Recover from setbacks and equipment failures.',
    icon: '🔄',
    color: '#FFC107',
  },
  4: {
    title: 'Adaptive Challenge',
    description: 'Adapt to dynamically changing emergency situations.',
    icon: '🎯',
    color: '#17A2B8',
  },
};

export const MODULE_1_SCENARIOS = [
  {
    id: 'm1_s1',
    title: 'Minor Road Accident',
    description: 'A two-vehicle fender bender on Highway 12. No serious injuries reported. One driver complains of neck pain. Traffic is partially blocked.',
    priority: 'low',
    timeLimit: 30,
    requiredResources: ['Ambulance'],
  },
  {
    id: 'm1_s2',
    title: 'Kitchen Fire',
    description: 'A small kitchen fire reported at 24 Oak Street. The family has evacuated. Smoke is visible from the first floor window. No injuries reported yet.',
    priority: 'medium',
    timeLimit: 25,
    requiredResources: ['Fire Truck'],
  },
  {
    id: 'm1_s3',
    title: 'Elderly Person Collapsed',
    description: 'An elderly person has collapsed at Central Park. Bystanders report the person is conscious but disoriented. No visible injuries.',
    priority: 'medium',
    timeLimit: 25,
    requiredResources: ['Medical Team'],
  },
  {
    id: 'm1_s4',
    title: 'Suspicious Package',
    description: 'An unattended bag has been found outside the Metro Station. Security guards have cordoned off the area. Pedestrians need to be redirected.',
    priority: 'low',
    timeLimit: 30,
    requiredResources: ['Police Unit'],
  },
];

export const MODULE_2_SCENARIOS = [
  {
    id: 'm2_s1',
    title: 'Multi-Vehicle Pileup',
    description: 'A 5-car pileup on the expressway. At least 3 people trapped. Fuel leak detected. Traffic completely blocked in both directions.',
    priority: 'critical',
    timeLimit: 15,
    requiredResources: ['Ambulance', 'Fire Truck'],
    misinformation: '⚠️ UNCONFIRMED: Reports suggest an explosion at the scene.',
  },
  {
    id: 'm2_s2',
    title: 'Chemical Spill at Factory',
    description: 'A chemical container has ruptured at Westside Industrial Complex. Workers reporting difficulty breathing. Wind carrying fumes toward residential area.',
    priority: 'critical',
    timeLimit: 12,
    requiredResources: ['Fire Truck', 'Medical Team'],
    resourceLimitation: '⚠️ Only 1 Fire Truck available in the district.',
  },
  {
    id: 'm2_s3',
    title: 'School Bus Accident',
    description: 'A school bus has overturned near Pine Valley School. 15 children on board. Some children are crying, teachers requesting immediate help.',
    priority: 'critical',
    timeLimit: 12,
    requiredResources: ['Ambulance', 'Medical Team'],
    misinformation: '⚠️ UNVERIFIED: Rumor that the bus driver was intoxicated.',
  },
  {
    id: 'm2_s4',
    title: 'Gas Leak in Apartment',
    description: 'Strong smell of gas reported by multiple residents in Sunrise Apartments, Block C. Building has 50 units. No evacuation started yet.',
    priority: 'high',
    timeLimit: 15,
    requiredResources: ['Fire Truck', 'Police Unit'],
    resourceLimitation: '⚠️ Police Unit is delayed — 10 min ETA.',
  },
  {
    id: 'm2_s5',
    title: 'Heart Attack at Mall',
    description: 'A 55-year-old man has collapsed at City Center Mall. Shoppers are panicking. Mall security has cleared the area but has no medical training.',
    priority: 'high',
    timeLimit: 10,
    requiredResources: ['Medical Team'],
  },
];

export const MODULE_3_SCENARIOS = [
  {
    id: 'm3_s1',
    title: 'Building Collapse — Rescue Blocked',
    description: 'A 3-story residential building has partially collapsed after heavy rains. Survivors are trapped under debris.',
    priority: 'critical',
    timeLimit: 20,
    requiredResources: ['Rescue Team', 'Medical Team'],
    forcedFailure: '❌ EQUIPMENT FAILURE: Rescue Team hydraulic tools are non-functional. Retry with alternative approach.',
    retryAllowed: true,
  },
  {
    id: 'm3_s2',
    title: 'Flood Evacuation — No Boats',
    description: 'Flash flooding in Riverside Colony. Water level rising rapidly. 30 families need evacuation.',
    priority: 'critical',
    timeLimit: 18,
    requiredResources: ['Rescue Team', 'Police Unit'],
    forcedFailure: '❌ RESOURCE SHORTAGE: Primary rescue boats are deployed elsewhere. Alternative ground evacuation required.',
    retryAllowed: true,
  },
  {
    id: 'm3_s3',
    title: 'Highway Fire — Wrong Intel',
    description: 'A tanker fire on National Highway 8. Initial reports said it was a diesel tanker, but it is actually carrying LPG.',
    priority: 'critical',
    timeLimit: 15,
    requiredResources: ['Fire Truck', 'Police Unit'],
    forcedFailure: '❌ WRONG INTEL: The tanker contents were misidentified. Your first response was based on incorrect information. Reassess now.',
    retryAllowed: true,
  },
  {
    id: 'm3_s4',
    title: 'Mass Casualty — Ambulance Shortage',
    description: 'An explosion at a fireworks factory. 20+ casualties reported. Only 2 ambulances are available in the entire district.',
    priority: 'critical',
    timeLimit: 15,
    requiredResources: ['Ambulance', 'Medical Team', 'Fire Truck'],
    forcedFailure: '❌ AMBULANCE SHORTAGE: Only 1 ambulance arrived. 2nd ambulance broke down en route.',
    retryAllowed: true,
    timePenalty: 5,
  },
];

export const MODULE_4_SCENARIOS = [
  {
    id: 'm4_s1',
    title: 'Earthquake Aftermath',
    description: 'A 5.2 magnitude earthquake has struck the city. Multiple reports coming in: collapsed structures, gas leaks, injured people.',
    priority: 'critical',
    timeLimit: 20,
    requiredResources: ['Rescue Team', 'Medical Team'],
    dynamicEvent: {
      message: '🔴 PRIORITY CHANGE: A hospital has reported structural damage. Patients need immediate evacuation. Redirect Rescue Team.',
      newRequiredResources: ['Rescue Team', 'Ambulance'],
    },
  },
  {
    id: 'm4_s2',
    title: 'Stadium Stampede',
    description: 'Panic at City Stadium during a concert. Thousands rushing to exits. Reports of people being trampled.',
    priority: 'critical',
    timeLimit: 15,
    requiredResources: ['Police Unit', 'Medical Team'],
    dynamicEvent: {
      message: '🔴 UPDATE: A fire has broken out in the stadium\'s food court. Fire Truck now needed urgently.',
      newRequiredResources: ['Police Unit', 'Medical Team', 'Fire Truck'],
    },
  },
  {
    id: 'm4_s3',
    title: 'Train Derailment',
    description: 'A passenger train has derailed near Green Valley station. 200 passengers on board. Some coaches are tilted. Power lines nearby may be live.',
    priority: 'critical',
    timeLimit: 18,
    requiredResources: ['Rescue Team', 'Ambulance', 'Medical Team'],
    dynamicEvent: {
      message: '🔴 ALERT: Fuel leak detected from the locomotive. Risk of fire. Fire Truck required immediately.',
      newRequiredResources: ['Rescue Team', 'Ambulance', 'Medical Team', 'Fire Truck'],
    },
  },
  {
    id: 'm4_s4',
    title: 'Hostage Situation Escalation',
    description: 'An armed individual has taken 5 hostages in a downtown bank. Negotiator is on scene. Situation is tense but stable.',
    priority: 'high',
    timeLimit: 20,
    requiredResources: ['Police Unit'],
    dynamicEvent: {
      message: '🔴 ESCALATION: Shots fired inside the bank. One hostage reportedly injured. Medical Team needed immediately.',
      newRequiredResources: ['Police Unit', 'Medical Team', 'Ambulance'],
    },
  },
  {
    id: 'm4_s5',
    title: 'Industrial Fire with Toxic Smoke',
    description: 'Fire at Petrochemical Plant Section B. Thick black smoke spreading over nearby neighborhoods.',
    priority: 'critical',
    timeLimit: 15,
    requiredResources: ['Fire Truck', 'Police Unit'],
    dynamicEvent: {
      message: '🔴 WIND SHIFT: Toxic smoke now heading toward a school 500m away. Evacuation needed. Add Rescue Team.',
      newRequiredResources: ['Fire Truck', 'Police Unit', 'Rescue Team'],
    },
  },
];

export const ALL_SCENARIOS = {
  1: MODULE_1_SCENARIOS,
  2: MODULE_2_SCENARIOS,
  3: MODULE_3_SCENARIOS,
  4: MODULE_4_SCENARIOS,
};
