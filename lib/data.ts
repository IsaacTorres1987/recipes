export interface Component {
  id: string
  componentType: string
  spanLength: string
  conditionScore: number
  verificationStatus: "Verified" | "Pending" | "Unverified"
  owner: string
  availability: string
  geometry: {
    length: string
    height: string
    width: string
    weight: string
    crossSection: string
  }
  material: {
    concreteClass: string
    exposureClass: string
    prestressing: string
    reinforcement: string
    coverThickness: string
  }
  condition: {
    web: { description: string; score: number }
    flange: { description: string; score: number }
    anchorage: { description: string; score: number }
    overall: { score: number; label: string }
  }
  structural: {
    designLoad: string
    residualCapacity: string
    bendingCapacity: string
  }
  verification: {
    status: string
    hash: string
    verifier: string
    timestamp: string
  }
  decision: {
    recommendation: string
    application: string
    riskLevel: string
  }
}

export const components: Component[] = [
  {
    id: "DEMO-GIRDER-NEW",
    componentType: "Precast Concrete Girder",
    spanLength: "21.5 m",
    conditionScore: 2,
    verificationStatus: "Pending",
    owner: "Province of North Holland",
    availability: "Under Review",
    geometry: {
      length: "21.5 m",
      height: "1.20 m",
      width: "0.70 m",
      weight: "28,500 kg",
      crossSection: "Precast I-Girder"
    },
    material: {
      concreteClass: "C40/50",
      exposureClass: "XC4",
      prestressing: "10 tendons",
      reinforcement: "B500B",
      coverThickness: "42 mm"
    },
    condition: {
      web: { description: "minor cracking", score: 2 },
      flange: { description: "no significant damage", score: 1 },
      anchorage: { description: "local corrosion", score: 2 },
      overall: { score: 2, label: "Good" }
    },
    structural: {
      designLoad: "Eurocode LM1",
      residualCapacity: "pending verification",
      bendingCapacity: "preliminary estimate available"
    },
    verification: {
      status: "PENDING",
      hash: "Not yet generated",
      verifier: "Awaiting review",
      timestamp: "Submitted today"
    },
    decision: {
      recommendation: "Pending assessment",
      application: "To be determined",
      riskLevel: "Pending verification"
    }
  },
  {
    id: "DEMO-GIRDER-01",
    componentType: "Precast Concrete Girder",
    spanLength: "24.5 m",
    conditionScore: 3,
    verificationStatus: "Verified",
    owner: "Province of North Holland",
    availability: "Available",
    geometry: {
      length: "24.5 m",
      height: "1.35 m",
      width: "0.75 m",
      weight: "32,000 kg",
      crossSection: "I-Girder"
    },
    material: {
      concreteClass: "C45/55",
      exposureClass: "XC4 / XD3",
      prestressing: "12 tendons",
      reinforcement: "B500B",
      coverThickness: "45 mm"
    },
    condition: {
      web: { description: "cracking", score: 3 },
      flange: { description: "spalling", score: 2 },
      anchorage: { description: "corrosion", score: 3 },
      overall: { score: 3, label: "Reasonable" }
    },
    structural: {
      designLoad: "Eurocode LM1",
      residualCapacity: "verified",
      bendingCapacity: "5850 kNm"
    },
    verification: {
      status: "VERIFIED",
      hash: "0x9F34A7B8E19C...",
      verifier: "InfraInspect BV",
      timestamp: "12 March 2026"
    },
    decision: {
      recommendation: "Reuse feasible",
      application: "municipal bridge replacement (20–30 m span)",
      riskLevel: "Low – verified inspection and recalculation"
    }
  },
  {
    id: "DEMO-BEAM-02",
    componentType: "Prestressed Box Beam",
    spanLength: "18.0 m",
    conditionScore: 2,
    verificationStatus: "Verified",
    owner: "City of Amsterdam",
    availability: "Available",
    geometry: {
      length: "18.0 m",
      height: "0.95 m",
      width: "1.20 m",
      weight: "22,500 kg",
      crossSection: "Box"
    },
    material: {
      concreteClass: "C40/50",
      exposureClass: "XC3 / XD2",
      prestressing: "8 tendons",
      reinforcement: "B500B",
      coverThickness: "40 mm"
    },
    condition: {
      web: { description: "minor cracks", score: 2 },
      flange: { description: "good", score: 1 },
      anchorage: { description: "minor staining", score: 2 },
      overall: { score: 2, label: "Good" }
    },
    structural: {
      designLoad: "Eurocode LM1",
      residualCapacity: "verified",
      bendingCapacity: "4200 kNm"
    },
    verification: {
      status: "VERIFIED",
      hash: "0x8A21C3D4F5B6...",
      verifier: "InfraInspect BV",
      timestamp: "28 February 2026"
    },
    decision: {
      recommendation: "Reuse recommended",
      application: "pedestrian bridge or light traffic (15–20 m span)",
      riskLevel: "Very Low – excellent condition"
    }
  },
  {
    id: "DEMO-SLAB-03",
    componentType: "Reinforced Concrete Slab",
    spanLength: "12.0 m",
    conditionScore: 4,
    verificationStatus: "Pending",
    owner: "Province of Utrecht",
    availability: "Under Assessment",
    geometry: {
      length: "12.0 m",
      height: "0.45 m",
      width: "2.50 m",
      weight: "18,000 kg",
      crossSection: "Solid Slab"
    },
    material: {
      concreteClass: "C35/45",
      exposureClass: "XC4 / XD1",
      prestressing: "None",
      reinforcement: "B500B",
      coverThickness: "35 mm"
    },
    condition: {
      web: { description: "significant cracking", score: 4 },
      flange: { description: "spalling present", score: 3 },
      anchorage: { description: "exposed rebar", score: 4 },
      overall: { score: 4, label: "Moderate" }
    },
    structural: {
      designLoad: "Eurocode LM2",
      residualCapacity: "pending",
      bendingCapacity: "1850 kNm"
    },
    verification: {
      status: "PENDING",
      hash: "0x3B47D8E2A1C9...",
      verifier: "Awaiting assignment",
      timestamp: "Pending"
    },
    decision: {
      recommendation: "Further assessment required",
      application: "potential secondary structure use",
      riskLevel: "Medium – requires detailed inspection"
    }
  },
  {
    id: "DEMO-COLUMN-04",
    componentType: "Precast Concrete Column",
    spanLength: "8.5 m",
    conditionScore: 2,
    verificationStatus: "Verified",
    owner: "Municipality of Rotterdam",
    availability: "Available",
    geometry: {
      length: "8.5 m",
      height: "0.60 m",
      width: "0.60 m",
      weight: "7,800 kg",
      crossSection: "Square"
    },
    material: {
      concreteClass: "C50/60",
      exposureClass: "XC2",
      prestressing: "None",
      reinforcement: "B500B",
      coverThickness: "50 mm"
    },
    condition: {
      web: { description: "good", score: 2 },
      flange: { description: "minor surface wear", score: 2 },
      anchorage: { description: "good", score: 1 },
      overall: { score: 2, label: "Good" }
    },
    structural: {
      designLoad: "Eurocode Column Design",
      residualCapacity: "verified",
      bendingCapacity: "N/A"
    },
    verification: {
      status: "VERIFIED",
      hash: "0x7C58E9F3B2A4...",
      verifier: "StructCheck NL",
      timestamp: "5 March 2026"
    },
    decision: {
      recommendation: "Reuse recommended",
      application: "building structure support",
      riskLevel: "Low – verified structural integrity"
    }
  },
  {
    id: "DEMO-GIRDER-05",
    componentType: "Steel Plate Girder",
    spanLength: "32.0 m",
    conditionScore: 3,
    verificationStatus: "Unverified",
    owner: "Rijkswaterstaat",
    availability: "Pending Removal",
    geometry: {
      length: "32.0 m",
      height: "1.80 m",
      width: "0.45 m",
      weight: "28,500 kg",
      crossSection: "I-Profile"
    },
    material: {
      concreteClass: "N/A (Steel S355)",
      exposureClass: "C3 (ISO 12944)",
      prestressing: "N/A",
      reinforcement: "N/A",
      coverThickness: "N/A"
    },
    condition: {
      web: { description: "surface corrosion", score: 3 },
      flange: { description: "minor pitting", score: 3 },
      anchorage: { description: "connection plates worn", score: 3 },
      overall: { score: 3, label: "Reasonable" }
    },
    structural: {
      designLoad: "Eurocode LM1",
      residualCapacity: "unverified",
      bendingCapacity: "8500 kNm (estimated)"
    },
    verification: {
      status: "UNVERIFIED",
      hash: "—",
      verifier: "Not assigned",
      timestamp: "—"
    },
    decision: {
      recommendation: "Verification required",
      application: "potential heavy traffic bridge (25–35 m span)",
      riskLevel: "Unknown – requires inspection"
    }
  }
]

export const verificationRecords = [
  {
    componentId: "DEMO-GIRDER-01",
    status: "VERIFIED",
    hash: "0x9F34A7B8E19C",
    verifier: "InfraInspect BV",
    timestamp: "12 March 2026"
  },
  {
    componentId: "DEMO-BEAM-02",
    status: "VERIFIED",
    hash: "0x8A21C3D4F5B6",
    verifier: "InfraInspect BV",
    timestamp: "28 February 2026"
  },
  {
    componentId: "DEMO-COLUMN-04",
    status: "VERIFIED",
    hash: "0x7C58E9F3B2A4",
    verifier: "StructCheck NL",
    timestamp: "5 March 2026"
  },
  {
    componentId: "DEMO-SLAB-03",
    status: "PENDING",
    hash: "0x3B47D8E2A1C9",
    verifier: "Awaiting assignment",
    timestamp: "Pending"
  }
]

export const dashboardStats = {
  totalComponents: 124,
  verifiedComponents: 92,
  averageConditionScore: 3.2,
  reuseCandidates: 18
}
