// Mock Data for Invoice Intelligence

export const currentMetrics = {
  totalDocuments: 247,
  totalValue: "₹42.8L",
  totalValueRaw: 4284500,
  activeAlerts: 12,
  processingQueue: 4,
  accuracyRate: "99.4%",
  flaggedAmount: "₹2.45L",
  avgProcessingTime: "1.4s"
};

export const monthlyTrends = [
  { month: 'May', volume: 140, value: 24.2, discrepancies: 8 },
  { month: 'Jun', volume: 175, value: 31.0, discrepancies: 11 },
  { month: 'Jul', volume: 198, value: 35.5, discrepancies: 9 },
  { month: 'Aug', volume: 220, value: 38.2, discrepancies: 14 },
  { month: 'Sep', volume: 235, value: 39.8, discrepancies: 10 },
  { month: 'Oct', volume: 247, value: 42.8, discrepancies: 12 },
];

export const documentTypesData = [
  { name: 'Tax Invoices', value: 165, percentage: '67%' },
  { name: 'Purchase Orders', value: 48, percentage: '19%' },
  { name: 'Credit Notes', value: 22, percentage: '9%' },
  { name: 'Delivery Challans', value: 12, percentage: '5%' },
];

export const mockInvoices = [
  {
    id: 'INV-2847',
    vendor: 'Apex Tech Solutions Pvt Ltd',
    gstin: '27AABCA1234F1Z8',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-22',
    dueDate: '2026-11-21',
    poNumber: 'PO-99120',
    status: 'Discrepancy',
    statusSeverity: 'high',
    subtotal: 1600000,
    gstCalculated: 18000,
    gstCharged: 21000,
    total: 1888000,
    currency: '₹',
    confidenceScore: 98.2,
    fileType: 'PDF',
    fileSize: '1.8 MB',
    lineItems: [
      { id: 1, description: 'Industrial IoT Telemetry Hubs v3', hsn: '851762', qtyOrdered: 400, qtyInvoiced: 400, qtyReceived: 350, unitPrice: 3200, total: 1280000, hasDiscrepancy: true, note: '50 units short received on GRN-4421' },
      { id: 2, description: 'High-Gain Antenna Arrays 5.8GHz', hsn: '852910', qtyOrdered: 80, qtyInvoiced: 80, qtyReceived: 80, unitPrice: 4000, total: 320000, hasDiscrepancy: false },
    ],
    discrepancies: [
      {
        id: 'DISC-01',
        type: 'TAX_MISMATCH',
        title: 'GST Calculation Mismatch',
        severity: 'high',
        detail: 'Billed GST is ₹21,000, but 18% HSN rule expects ₹18,000. Overcharge of ₹3,000 detected.',
        field: 'gst',
        expected: '₹18,000',
        actual: '₹21,000'
      },
      {
        id: 'DISC-02',
        type: 'QUANTITY_SHORTAGE',
        title: 'GRN Quantity Discrepancy',
        severity: 'high',
        detail: 'Warehouse delivery receipt (GRN-4421) logged 350 units received vs 400 invoiced.',
        field: 'quantity',
        expected: '350 units received',
        actual: '400 units invoiced (50 short)'
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-22 14:22:10', action: 'Uploaded via SFTP automated intake pipeline' },
      { timestamp: '2026-10-22 14:22:12', action: 'OCR & LayoutLMv3 entity extraction completed' },
      { timestamp: '2026-10-22 14:22:13', action: '2 Discrepancies flagged by 3-Way Match Engine' },
    ]
  },
  {
    id: 'INV-2846',
    vendor: 'Zenith Global Hardware Corp',
    gstin: '07AAACZ1122D1ZP',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-21',
    dueDate: '2026-11-20',
    poNumber: 'PO-99118',
    status: 'Verified',
    statusSeverity: 'clean',
    subtotal: 650000,
    gstCalculated: 117000,
    gstCharged: 117000,
    total: 767000,
    currency: '₹',
    confidenceScore: 99.8,
    fileType: 'PDF',
    fileSize: '940 KB',
    lineItems: [
      { id: 1, description: 'Rackmount UPS Power Backups 3kVA', hsn: '850440', qtyOrdered: 10, qtyInvoiced: 10, qtyReceived: 10, unitPrice: 65000, total: 650000, hasDiscrepancy: false }
    ],
    discrepancies: [],
    auditTrail: [
      { timestamp: '2026-10-21 11:05:02', action: 'Direct manual upload by Rudra' },
      { timestamp: '2026-10-21 11:05:04', action: 'Automatic 3-way match succeeded against PO-99118' },
      { timestamp: '2026-10-21 11:05:04', action: 'Auto-approved for ERP posting' }
    ]
  },
  {
    id: 'INV-2845',
    vendor: 'Vanguard Industrial Supply',
    gstin: '33AABCV9988G1ZL',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-20',
    dueDate: '2026-11-19',
    poNumber: 'PO-99115',
    status: 'Flagged',
    statusSeverity: 'medium',
    subtotal: 312000,
    gstCalculated: 56160,
    gstCharged: 56160,
    total: 368160,
    currency: '₹',
    confidenceScore: 95.1,
    fileType: 'PNG',
    fileSize: '3.1 MB',
    lineItems: [
      { id: 1, description: 'Fiber Optic Patch Cords LC-LC 10m', hsn: '854470', qtyOrdered: 200, qtyInvoiced: 200, qtyReceived: 200, unitPrice: 1560, total: 312000, hasDiscrepancy: false }
    ],
    discrepancies: [
      {
        id: 'DISC-03',
        type: 'PRICE_VARIANCE',
        title: 'Unit Price Contract Variance',
        severity: 'medium',
        detail: 'PO agreed unit rate was ₹1,480 vs Billed rate ₹1,560 (+5.4%).',
        field: 'unitPrice',
        expected: '₹1,480 / unit',
        actual: '₹1,560 / unit'
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-20 18:30:11', action: 'Scanned image uploaded via Web UI' },
      { timestamp: '2026-10-20 18:30:14', action: 'Price variance detected by Contract Rate Validator' }
    ]
  },
  {
    id: 'INV-2844',
    vendor: 'Krypton Cyber Cloud Services',
    gstin: '29AABCK5544B1ZV',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-19',
    dueDate: '2026-11-03',
    poNumber: 'PO-99109',
    status: 'Verified',
    statusSeverity: 'clean',
    subtotal: 450000,
    gstCalculated: 81000,
    gstCharged: 81000,
    total: 531000,
    currency: '₹',
    confidenceScore: 99.9,
    fileType: 'PDF',
    fileSize: '410 KB',
    lineItems: [
      { id: 1, description: 'Dedicated AI Inference Nodes - Monthly Tier', hsn: '998313', qtyOrdered: 1, qtyInvoiced: 1, qtyReceived: 1, unitPrice: 450000, total: 450000, hasDiscrepancy: false }
    ],
    discrepancies: [],
    auditTrail: [
      { timestamp: '2026-10-19 09:12:00', action: 'API push from Krypton billing portal' },
      { timestamp: '2026-10-19 09:12:01', action: 'E-Invoice QR code cryptographically validated' }
    ]
  },
  {
    id: 'INV-2843',
    vendor: 'Titan Heavy Freight Logistics',
    gstin: '19AAACT7788P1ZR',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-18',
    dueDate: '2026-11-02',
    poNumber: 'PO-99098',
    status: 'Discrepancy',
    statusSeverity: 'high',
    subtotal: 185000,
    gstCalculated: 9250,
    gstCharged: 22200,
    total: 207200,
    currency: '₹',
    confidenceScore: 96.8,
    fileType: 'PDF',
    fileSize: '1.2 MB',
    lineItems: [
      { id: 1, description: 'Inter-State Multi-Axle Container Haulage', hsn: '996511', qtyOrdered: 2, qtyInvoiced: 2, qtyReceived: 2, unitPrice: 92500, total: 185000, hasDiscrepancy: true, note: 'RCM 5% applies instead of billed 12%' }
    ],
    discrepancies: [
      {
        id: 'DISC-04',
        type: 'RCM_TAX_ERROR',
        title: 'Incorrect Reverse Charge GST Slab',
        severity: 'high',
        detail: 'GTA road transport under GST notification 13/2017 falls under 5% RCM, billed at 12%. Potential compliance exposure of ₹12,950.',
        field: 'gst',
        expected: '₹9,250 (5% RCM)',
        actual: '₹22,200 (12% Forward)'
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-18 16:40:22', action: 'Uploaded by Accounts Payable team' },
      { timestamp: '2026-10-18 16:40:24', action: 'Tax rule exception triggered on HSN 996511' }
    ]
  },
  {
    id: 'INV-2842',
    vendor: 'OmniSecure Security Systems',
    gstin: '36AAACB4433R1ZS',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-17',
    dueDate: '2026-11-16',
    poNumber: 'PO-99092',
    status: 'Verified',
    statusSeverity: 'clean',
    subtotal: 280000,
    gstCalculated: 50400,
    gstCharged: 50400,
    total: 330400,
    currency: '₹',
    confidenceScore: 99.2,
    fileType: 'PDF',
    fileSize: '820 KB',
    lineItems: [
      { id: 1, description: 'Biometric Access Turnstiles IP65', hsn: '854370', qtyOrdered: 4, qtyInvoiced: 4, qtyReceived: 4, unitPrice: 70000, total: 280000, hasDiscrepancy: false }
    ],
    discrepancies: [],
    auditTrail: [
      { timestamp: '2026-10-17 10:14:15', action: 'Uploaded and processed' }
    ]
  },
  {
    id: 'INV-2841',
    vendor: 'Delta Precision Microchips',
    gstin: '24AAACD1199N1ZW',
    buyer: 'NeoMatrix Logistics Ltd',
    buyerGstin: '27XYZPA9876K1ZQ',
    date: '2026-10-16',
    dueDate: '2026-11-15',
    poNumber: 'PO-99085',
    status: 'Under Review',
    statusSeverity: 'medium',
    subtotal: 820000,
    gstCalculated: 147600,
    gstCharged: 147600,
    total: 967600,
    currency: '₹',
    confidenceScore: 93.4,
    fileType: 'JPG',
    fileSize: '4.2 MB',
    lineItems: [
      { id: 1, description: 'SoC Microcontroller Units ARM Cortex-M7', hsn: '854231', qtyOrdered: 1000, qtyInvoiced: 1000, qtyReceived: 1000, unitPrice: 820, total: 820000, hasDiscrepancy: false }
    ],
    discrepancies: [
      {
        id: 'DISC-05',
        type: 'DUPLICATE_CHECK',
        title: 'Potential Duplicate Invoice Sequence',
        severity: 'medium',
        detail: 'Invoice number pattern resembles previously submitted INV-2819 from same vendor on 2026-10-02.',
        field: 'invoiceNumber',
        expected: 'Unique IRN Hash',
        actual: 'Possible duplicate billing'
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-16 15:02:11', action: 'Uploaded via Mobile Scanner App' },
      { timestamp: '2026-10-16 15:02:13', action: 'Duplicate hash detector flagged for manual review' }
    ]
  }
];

export const reviewAlerts = [
  {
    id: 'ALERT-101',
    invoiceId: 'INV-2847',
    vendor: 'Apex Tech Solutions Pvt Ltd',
    type: 'QUANTITY DISCREPANCY',
    severity: 'high',
    title: 'Quantity Discrepancy: 50 units missing',
    metrics: {
      ordered: 400,
      invoiced: 400,
      received: 350,
      missing: 50
    },
    impact: '₹1,60,000 unverified goods',
    date: '2026-10-22',
    status: 'Pending Review'
  },
  {
    id: 'ALERT-102',
    invoiceId: 'INV-2847',
    vendor: 'Apex Tech Solutions Pvt Ltd',
    type: 'TAX CALCULATION',
    severity: 'high',
    title: 'GST Mismatch: ₹3,000 overcharge',
    metrics: {
      expectedGST: '₹18,000',
      chargedGST: '₹21,000',
      variance: '+₹3,000'
    },
    impact: 'Input Tax Credit loss exposure',
    date: '2026-10-22',
    status: 'Pending Review'
  },
  {
    id: 'ALERT-103',
    invoiceId: 'INV-2845',
    vendor: 'Vanguard Industrial Supply',
    type: 'PRICE VARIANCE',
    severity: 'medium',
    title: 'Contract Price Variance (+5.4%)',
    metrics: {
      poRate: '₹1,480',
      invoiceRate: '₹1,560',
      delta: '₹80 / unit'
    },
    impact: '₹16,000 price variance',
    date: '2026-10-20',
    status: 'Investigating'
  },
  {
    id: 'ALERT-104',
    invoiceId: 'INV-2843',
    vendor: 'Titan Heavy Freight Logistics',
    type: 'RCM COMPLIANCE',
    severity: 'high',
    title: 'Incorrect GST Slab (12% instead of 5% RCM)',
    metrics: {
      expectedRate: '5% RCM',
      billedRate: '12% Forward',
      difference: '₹12,950'
    },
    impact: 'GST audit risk',
    date: '2026-10-18',
    status: 'Pending Vendor Response'
  },
  {
    id: 'ALERT-105',
    invoiceId: 'INV-2841',
    vendor: 'Delta Precision Microchips',
    type: 'DUPLICATE WARNING',
    severity: 'medium',
    title: 'Potential Duplicate Invoice Sequence',
    metrics: {
      originalInv: 'INV-2819',
      currentInv: 'INV-2841',
      similarity: '94%'
    },
    impact: 'Potential double payment',
    date: '2026-10-16',
    status: 'Flagged'
  }
];

export const userProfile = {
  name: 'Rudra',
  email: 'rudra@neomatrix.corp',
  role: 'Chief Financial Officer & Risk Lead',
  company: 'NeoMatrix Logistics Ltd',
  tier: 'Enterprise AI Suite v4.2',
  avatarInitials: 'RD',
  notificationsEnabled: true,
  autoApproveVerified: true,
  varianceThreshold: 2.5
};
